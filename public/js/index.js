/* global window language */

import $ from 'jquery';
import _ from 'lodash';

window.jQuery = $;

require('bootstrap-sass');
require('jquery-sticky');

const settings = require('../../libs/settings');
const strategies = require('../../libs/strategies');

// Make dashboard sticky
$('#dashboard').sticky({zIndex: 1});

// Enable modals
$('.modal').modal({show: false});

// Calculate max benefit totals
const maxBenefits = getMaxBenefits();

$('.strategy-input').change(event => {
  $(event.target).parents('.strategy').toggleClass('selected', $(event.target).is(':checked'));
  validateBudget($(event.target).is(':checked'));
});

function getMaxBenefits() {
  return _.reduce(strategies, (memo, strategy) => {
    _.each(strategy.benefits, (weight, key) => {
      if (!memo[key]) {
        memo[key] = 0;
      }
      memo[key] += weight;
    });
    return memo;
  }, {});
}

function getTotalBudget() {
  const budget = {
    cost: 0
  };

  const checked = $('.strategy-input:checked');

  checked.each((idx, checkbox) => {
    const key = $(checkbox).attr('name');
    const strategy = _.find(strategies, strategy => strategy.key === key);

    _.each(strategy.benefits, (weight, key) => {
      if (!budget[key]) {
        budget[key] = 0;
      }

      budget[key] += weight;
    });

    budget.cost += strategy.cost;
  });

  return budget;
}

function validateBudget(displayWarnings) {
  const budget = getTotalBudget();
  const checked = $('.strategy-input:checked');

  if (checked.length > 0) {
    $.each(budget, (key, value) => {
      const meterContainerHeight = 50;
      const maxValue = key === 'cost' ? settings.maxCost : maxBenefits[key];
      const meterHeight = Math.min(value / maxValue * meterContainerHeight, meterContainerHeight);
      $(`#${key} .dashboard-meter-bar`).height(meterHeight);
      $(`#${key} .dashboard-meter`)
        .toggleClass('half-full', value / maxValue > 0.44)
        .toggleClass('over-budget', budget.cost > settings.maxCost);
    });

    $('#cost .dashboard-meter-value').html(`$${budget.cost}`);
  } else {
    $('#cost .dashboard-meter-value')
      .empty()
      .removeClass('over-budget');
    $('.dashboard-meter-bar').height(0);
  }

  if (budget.cost > settings.maxCost && displayWarnings) {
    $('#modal-exceeded').modal('show');
    return false;
  }

  return true;
}

function clearAll() {
  $('.strategy-input').prop('checked', false).trigger('change');
}

function submitValues(cb) {
  const form = {
    language
  };
  $('.strategy-input').each((idx, item) => {
    form[item.name] = $(item).is(':checked');
  });

  $.post('/api/response', form, cb);
}

$('#reset').click(() => {
  clearAll();
  validateBudget();
  return false;
});

$('#submit').click(event => {
  event.preventDefault();

  if ($('.strategy-input:checked').length === 0) {
    $('#modal-none').modal('show');
  } else if (validateBudget(true)) {
    const budget = getTotalBudget();
    if (budget.cost < settings.maxCost) {
      $('#modal-leftover').modal('show');
    } else {
      $('#modal-submit').modal('show');
    }
  }
});

$('#continueSubmit').click(() => {
  $('#modal-leftover').modal('hide');
  $('#modal-submit').modal('show');
});

$('#modal-submit .btn-primary').click(function () {
  $(this).attr('disabled', 'disabled');

  submitValues(body => {
    if (body.status === 'error') {
      console.error('error');
      return false;
    }

    if (settings.postSurveyURL) {
      window.location = `${settings.postSurveyURL[language]}?c=${body.id}`;
    } else {
      $('#modal-submit').modal('hide');
      $('#modal-post-submit').modal('show');
    }
  });
});
