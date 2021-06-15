/* global window, fetch, alert */
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-modal'
import Sticky from 'react-sticky-el'
import settings from '../data/settings.js'
import strategies from '../data/strategies.js'
import Dashboard from './dashboard.js'
import Strategy from './strategy.js'

Modal.setAppElement('body')

const Strategies = () => {
  const router = useRouter()
  const { locale } = router

  const getTotalBenefits = selectedStrategies => strategies.reduce((memo, strategy) => {
    if (selectedStrategies[strategy.key]) {
      for (const category of settings.benefitCategories) {
        memo[category.key] = (memo[category.key] || 0) + strategy.benefits[category.key]
      }
    }

    return memo
  }, {})

  const [selectedStrategies, setSelectedStrategies] = useState({})
  const [modalSettings, setModalSettings] = useState({
    show: false,
    buttons: null,
  })
  const [totalCost, setTotalCost] = useState(0)
  const [totalBenefits, setTotalBenefits] = useState(getTotalBenefits({}))
  const [budgetIsValid, setBudgetIsValid] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const toggleSelected = strategyKey => {
    selectedStrategies[strategyKey] = !selectedStrategies[strategyKey]
    const updatedTotalCost = getTotalCost(selectedStrategies)
    const updatedTotalBenefits = getTotalBenefits(selectedStrategies)
    const updatedBudgetIsValid = validateBudget(updatedTotalCost)

    setSelectedStrategies(selectedStrategies)
    setTotalCost(updatedTotalCost)
    setTotalBenefits(updatedTotalBenefits)
    setBudgetIsValid(updatedBudgetIsValid)

    if (!updatedBudgetIsValid) {
      setModalSettings({
        show: true,
        title: settings.text[locale].modalExceededTitle,
        content: settings.text[locale].modalExceededContent,
        buttons: ['close'],
      })
    }
  }

  const reset = event => {
    event.preventDefault()

    setSelectedStrategies({})
    setTotalCost(0)
    setTotalBenefits(getTotalBenefits({}))
    setBudgetIsValid(true)
  }

  const handleResponse = response => {
    setSubmitting(false)

    if (settings.postSurveyURL) {
      setModalSettings({
        ...modalSettings,
        buttons: null,
      })

      window.location.assign(`${settings.postSurveyURL[locale]}?c=${response.id}`)
    } else {
      setModalSettings({
        show: true,
        title: settings.text[locale].modalPostSubmitTitle,
        content: settings.text[locale].modalPostSubmitContent,
        buttons: null,
      })
    }
  }

  const handleError = error => {
    setSubmitting(false)

    console.error(error)
    /* eslint-disable-next-line no-alert */
    alert(error)
  }

  const closeModal = () => {
    setModalSettings({ show: false })
  }

  const submit = event => {
    event.preventDefault()

    if (totalCost === 0) {
      setModalSettings({
        show: true,
        title: settings.text[locale].modalNoneTitle,
        content: settings.text[locale].modalNoneContent,
        buttons: ['close'],
      })
    } else if (totalCost < settings.maxCost) {
      setModalSettings({
        show: true,
        title: settings.text[locale].modalLeftoverTitle,
        content: settings.text[locale].modalLeftoverContent,
        buttons: ['goback', 'continue'],
      })
    } else if (totalCost > settings.maxCost) {
      setModalSettings({
        show: true,
        title: settings.text[locale].modalExceededTitle,
        content: settings.text[locale].modalExceededContent,
        buttons: ['close'],
      })
    } else if (totalCost === settings.maxCost) {
      showSubmitModal()
    }
  }

  const showSubmitModal = () => {
    setModalSettings({
      show: true,
      title: settings.text[locale].modalSubmitTitle,
      content: settings.text[locale].modalSubmitContent,
      buttons: ['goback', 'submit'],
    })
  }

  const postData = async () => {
    setSubmitting(true)

    const form = { language: locale, ...selectedStrategies }

    if (settings.saveResponses === false) {
      handleResponse({
        id: Date.now(),
      })
    } else {
      try {
        const response = await fetch('/api/save-survey', {
          method: 'post',
          body: JSON.stringify(form),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Unable to save response')
        }

        const responseJson = await response.json()

        handleResponse(responseJson)
      } catch (error) {
        handleError(error)
      }
    }
  }

  const getTotalCost = selectedStrategies => strategies.reduce((cost, strategy) => {
    if (selectedStrategies[strategy.key]) {
      cost += strategy.cost
    }

    return cost
  }, 0)

  const validateBudget = totalCost => totalCost <= settings.maxCost

  let previousCategoryTitle
  const getCategoryTitle = (strategy, locale) => {
    if (strategy.text[locale].category === previousCategoryTitle) {
      return ''
    }

    previousCategoryTitle = strategy.text[locale].category

    return (
      <h3 className="text-xl mt-6 md:mt-3 mb-2 mx-3">{ strategy.text[locale].category }</h3>
    )
  }

  const getModalButtons = buttonKeys => {
    if (!buttonKeys || buttonKeys.length === 0) {
      return null
    }

    const modalButtons = {
      close: (
        <button className="btn btn-secondary" key="close" onClick={ closeModal } disabled={submitting}>
          { settings.text[locale].modalCloseButton }
        </button>
      ),
      goback: (
        <button className="btn btn-secondary" key="goback" onClick={ closeModal } disabled={submitting}>
          { settings.text[locale].modalGoBackButton }
        </button>
      ),
      continue: (
        <button className="btn btn-primary" key="continue" onClick={ showSubmitModal } disabled={submitting} >
          { settings.text[locale].modalContinueButton }
        </button>
      ),
      submit: (
        <button className="btn btn-primary" key="submit" onClick={ postData } disabled={submitting}>
          { settings.text[locale].modalSubmitButton }
        </button>
      ),
    }

    return buttonKeys.map(key => modalButtons[key])
  }

  return (
    <div>
      <Sticky stickyStyle={{ zIndex: '2' }}>
        <Dashboard
          locale={locale}
          totalCost={totalCost}
          totalBenefits={totalBenefits}
          budgetIsValid={budgetIsValid}
        />
      </Sticky>
      <form onSubmit={submit}>
        {strategies.map(strategy => (
          <div key={strategy.key}>
            {getCategoryTitle(strategy, locale)}
            <Strategy
              strategy={strategy}
              locale={locale}
              selected={Boolean(selectedStrategies[strategy.key])}
              toggleSelected={toggleSelected}
            />
          </div>
        ))}

        <div className="my-5 mx-4 md:mx-0">
          <button
            className="btn-bottom btn-light"
            onClick={reset}
            disabled={submitting}
          >{ settings.text[locale].resetTitle }</button>
          <input
            className="btn-bottom btn-dark"
            type="submit"
            value={`${settings.text[locale].submitTitle}`}
            disabled={submitting}
          />
        </div>
      </form>

      <Modal
        isOpen={modalSettings.show}
        onRequestClose={closeModal}
        contentLabel={modalSettings.title}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h3 className="py-4 px-3 border-b border-gray-500 text-2xl font-normal">{ modalSettings.title }</h3>
        <div className="pt-4 pb-5 px-3" dangerouslySetInnerHTML={{ __html: modalSettings.content }} />

        {modalSettings.buttons && <div className="modal-footer py-4 px-3 border-t border-gray-500 flex justify-end">
          { getModalButtons(modalSettings.buttons) }
        </div>}
      </Modal>

      <style jsx>{`
        .btn-bottom {
          text-align: center;
          width: 50%;
          height: 53px;
          font-size: 16px;
          font-weight: bold;
          line-height: 48px;
          cursor: pointer;
          border: none;
          border-radius: 0;
        }
      `}</style>

      <style jsx global>{`
        .modal-content {
          position: relative;
          max-width: 500px;
          margin: 1.75rem auto;
          background-color: #fff; 
          border: 1px solid rgba(0,0,0,.2);
          border-radius: .3rem;
          outline: 0;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 10;
        }

        .modal-footer .btn {
          margin-left: 10px;
        }
      `}</style>
    </div>
  )
}

export default Strategies
