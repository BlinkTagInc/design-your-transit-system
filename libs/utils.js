const _ = require('lodash');

const settings = require('./settings');

function getWeightClass(weight) {
  let name;
  if (weight === 0) {
    name = 'zero';
  } else if (weight === 1) {
    name = 'one';
  } else if (weight === 2) {
    name = 'two';
  } else if (weight === 3) {
    name = 'three';
  } else if (weight === 4) {
    name = 'four';
  } else if (weight === 5) {
    name = 'five';
  }
  return name;
}

function getBenefitByKey(key) {
  return _.find(settings.benefitCategories, benefitCategory => benefitCategory.key === key);
}

exports.formatStrategy = strategy => {
  strategy.benefits = _.map(strategy.benefits, (weight, key) => {
    return {
      key,
      weight,
      weightClass: getWeightClass(weight),
      text: getBenefitByKey(key).text
    };
  });
  return strategy;
};
