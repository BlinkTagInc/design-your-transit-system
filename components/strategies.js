/* global window, fetch */
import React, { useState } from 'react'
import Dashboard from './dashboard'
import Modal from 'react-modal'
import settings from '../data/settings'
import Sticky from 'react-sticky-el'
import strategies from '../data/strategies'
import Strategy from './strategy'
import { breakpoints } from './theme'

Modal.setAppElement('body')

const Strategies = ({ language }) => {
  const getTotalBenefits = selectedStrategies => {
    return strategies.reduce((memo, strategy) => {
      if (selectedStrategies[strategy.key]) {
        for (const category of settings.benefitCategories) {
          if (!memo[category.key] === undefined) {
            memo[category.key] = 0
          }

          memo[category.key] += strategy.benefits[category.key]
        }
      }

      return memo
    }, {})
  }

  const [selectedStrategies, setSelectedStrategies] = useState({})
  const [modalSettings, setModalSettings] = useState({
    show: false,
    buttons: ''
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
        title: settings.text[language].modalExceededTitle,
        content:  settings.text[language].modalExceededContent,
        buttons: getModalButtons(['close'])
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
    if (settings.postSurveyURL) {
      setSubmitting(false)
      setModalSettings({
        ...modalSettings,
        buttons: []
      })

      window.location.assign(`${settings.postSurveyURL[language]}?c=${response.id}`)
    } else {
      const modalButtons = (
        <div dangerouslySetInnerHTML={{ __html: settings.text[language].modalPostSubmitButtons }} />
      )

      setSubmitting(false)
      setModalSettings({
        show: true,
        title: settings.text[language].modalPostSubmitTitle,
        content: settings.text[language].modalPostSubmitContent,
        buttons: modalButtons
      })
    }
  }

  const handleError = error => {
    setSubmitting(false)

    console.error(error)
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
        title: settings.text[language].modalNoneTitle,
        content: settings.text[language].modalNoneContent,
        buttons: getModalButtons(['close'])
      })
    } else if (totalCost < settings.maxCost) {
      setModalSettings({
        show: true,
        title: settings.text[language].modalLeftoverTitle,
        content: settings.text[language].modalLeftoverContent,
        buttons: getModalButtons(['goback', 'continue'])
      })
    } else if (totalCost > settings.maxCost) {
      setModalSettings({
        show: true,
        title: settings.text[language].modalExceededTitle,
        content: settings.text[language].modalExceededContent,
        buttons: getModalButtons(['close'])
      })
    } else if (totalCost === settings.maxCost) {
      showSubmitModal()
    }
  }

  const showSubmitModal = () => {
    setModalSettings({
      show: true,
      title: settings.text[language].modalSubmitTitle,
      content: settings.text[language].modalSubmitContent,
      buttons: getModalButtons(['goback', 'submit'])
    })
  }

  const postData = () => {
    setSubmitting(true)

    const form = { language: language, ...selectedStrategies }

    if (settings.saveResponses !== false) {
      fetch('/api/save-survey', {
        method: 'post',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json()
          }
    
          throw new Error('Unable to save response')
        })
        .then(handleResponse)
        .catch(handleError)
    } else {
      handleResponse({
        id: Date.now()
      })
    }
  }

  const getTotalCost = selectedStrategies => {
    return strategies.reduce((cost, strategy) => {
      if (selectedStrategies[strategy.key]) {
        cost += strategy.cost
      }

      return cost
    }, 0)
  }

  const validateBudget = totalCost => {
    return totalCost <= settings.maxCost
  }

  let previousCategoryTitle
  const getCategoryTitle = (strategy, language) => {
    if (strategy.text[language].category === previousCategoryTitle) {
      return ''
    }

    previousCategoryTitle = strategy.text[language].category

    return (
      <h3 className="text-xl mt-3 mb-2 mx-3">{ strategy.text[language].category }</h3>
    )
  }

  const getModalButtons = buttonKeys => {
    const modalButtons = {
      close: (
        <button className="btn btn-secondary" type="button" onClick={ closeModal } key="close">
          { settings.text[language].modalCloseButton }
        </button>
      ),
      goback: (
        <button className="btn btn-secondary" type="button" onClick={ closeModal } key="goback">
          { settings.text[language].modalGoBackButton }
        </button>
      ),
      continue: (
        <button className="btn btn-primary" key="continue" onClick={ showSubmitModal }>
          { settings.text[language].modalContinueButton }
        </button>
      ),
      submit: (
        <button className="btn btn-primary" key="submit" onClick={ postData }>
          { settings.text[language].modalSubmitButton }
        </button>
      )
    }

    return buttonKeys.map(key => modalButtons[key])
  }

  return (
    <div role="main">
      <Sticky stickyStyle={{ zIndex: '2' }}>
        <Dashboard
          language={language}
          totalCost={totalCost}
          totalBenefits={totalBenefits}
          budgetIsValid={budgetIsValid}
        />
      </Sticky>
      <form onSubmit={submit}>
        {strategies.map(strategy => (
          <div key={strategy.key}>
            {getCategoryTitle(strategy, language)}
            <Strategy
              strategy={strategy}
              language={language}
              selected={Boolean(selectedStrategies[strategy.key])}
              toggleSelected={toggleSelected}
            />
          </div>
        ))}

        <div className="my-5">
          <button
            className="btn-bottom btn-light"
            onClick={reset}
          >{ settings.text[language].resetTitle }</button>
          <input
            className="btn-bottom btn-dark"
            type="submit"
            value={`${settings.text[language].submitTitle}`}
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

        <div className="modal-footer py-4 px-3 border-t border-gray-500 flex justify-end">
          { modalSettings.buttons }
        </div>
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
