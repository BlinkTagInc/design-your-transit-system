import Dashboard from './dashboard'
import Modal from 'react-modal'
import settings from '../data/settings'
import {StickyContainer, Sticky} from 'react-sticky'
import strategies from '../data/strategies'
import Strategy from './strategy'

export default class Strategies extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedStrategies: {},
      showModal: false,
      totalCost: 0,
      totalBenefits: this.getTotalBenefits({}),
      modalButtons: ''
    }

    this.toggleSelected = strategyKey => {
      this.state.selectedStrategies[strategyKey] = !this.state.selectedStrategies[strategyKey]
      const totalCost = this.getTotalCost(this.state.selectedStrategies)
      const totalBenefits = this.getTotalBenefits(this.state.selectedStrategies)
      const budgetIsValid = this.validateBudget(totalCost)

      this.setState({
        selectedStrategies: this.state.selectedStrategies,
        totalCost,
        totalBenefits,
        budgetIsValid
      })

      if (!budgetIsValid) {
        this.setState({
          showModal: true,
          modalTitle: settings.text[this.props.language].modalExceededTitle,
          modalContent: settings.text[this.props.language].modalExceededContent,
          modalButtons: this.getModalButtons(['close'])
        })
      }
    }

    this.reset = e => {
      e.preventDefault()

      this.setState({
        selectedStrategies: {},
        totalCost: 0,
        totalBenefits: this.getTotalBenefits({}),
        budgetIsValid: true
      })
    }

    this.handleResponse = response => {
      this.setState({
        submitting: false
      })

      if (settings.postSurveyURL) {
        window.location = `${settings.postSurveyURL[this.props.language]}?c=${response.id}`
      } else {
        const modalButtons = (
          <div dangerouslySetInnerHTML={{__html: settings.text[this.props.language].modalPostSubmitButtons}} />
        )
        this.setState({
          showModal: true,
          modalTitle: settings.text[this.props.language].modalPostSubmitTitle,
          modalContent: settings.text[this.props.language].modalPostSubmitContent,
          modalButtons
        })
      }
    }

    this.handleError = error => {
      this.setState({
        submitting: false
      })
      console.error(error)
    }

    this.closeModal = () => {
      this.setState({
        showModal: false
      })
    }

    this.submit = e => {
      e.preventDefault()

      if (this.state.totalCost === 0) {
        this.setState({
          showModal: true,
          modalTitle: settings.text[this.props.language].modalNoneTitle,
          modalContent: settings.text[this.props.language].modalNoneContent,
          modalButtons: this.getModalButtons(['close'])
        })
      } else if (this.state.totalCost < settings.maxCost) {
        this.setState({
          showModal: true,
          modalTitle: settings.text[this.props.language].modalLeftoverTitle,
          modalContent: settings.text[this.props.language].modalLeftoverContent,
          modalButtons: this.getModalButtons(['goback', 'continue'])
        })
      } else if (this.state.totalCost > settings.maxCost) {
        this.setState({
          showModal: true,
          modalTitle: settings.text[this.props.language].modalExceededTitle,
          modalContent: settings.text[this.props.language].modalExceededContent,
          modalButtons: this.getModalButtons(['close'])
        })
      } else if (this.state.totalCost === settings.maxCost) {
        this.showSubmitModal()
      }
    }

    this.showSubmitModal = () => {
      this.setState({
        showModal: true,
        modalTitle: settings.text[this.props.language].modalSubmitTitle,
        modalContent: settings.text[this.props.language].modalSubmitContent,
        modalButtons: this.getModalButtons(['goback', 'submit'])
      })
    }

    this.postData = () => {
      this.setState({
        submitting: true
      })

      const form = Object.assign({
        language: this.props.language
      }, this.state.selectedStrategies)

      fetch('/api/response', {
        method: 'post',
        body: JSON.stringify(form)
      })
      .then(response => response.json())
      .then(this.handleResponse)
      .catch(this.handleError)
    }
  }

  getTotalCost(selectedStrategies) {
    return strategies.reduce((cost, strategy) => {
      if (selectedStrategies[strategy.key]) {
        cost += strategy.cost
      }
      return cost
    }, 0)
  }

  getTotalBenefits(selectedStrategies) {
    return strategies.reduce((benefits, strategy) => {
      settings.benefitCategories.forEach(benefitCategory => {
        if (!benefits.hasOwnProperty(benefitCategory.key)) {
          benefits[benefitCategory.key] = 0
        }
      })
      if (selectedStrategies[strategy.key]) {
        settings.benefitCategories.forEach(benefitCategory => {
          benefits[benefitCategory.key] += strategy.benefits[benefitCategory.key]
        })
      }
      return benefits
    }, {})
  }

  validateBudget(totalCost) {
    return totalCost <= settings.maxCost
  }

  getCategoryTitle(strategy, language) {
    if (strategy.text[language].category === this.state.categoryTitle) {
      return ''
    }

    this.state.categoryTitle = strategy.text[language].category

    return (
      <div className="row section-title">
        <div className="col-md-12">
          <h3>{ strategy.text[language].category }</h3>
        </div>
      </div>
    )
  }

  getModalButtons(buttonKeys) {
    const modalButtons = {
      close: (
        <button className="btn btn-default" type="button" onClick={ this.closeModal } key="close">
          { settings.text[this.props.language].modalCloseButton }
        </button>
      ),
      goback: (
        <button className="btn btn-default" type="button" onClick={ this.closeModal } key="goback">
          { settings.text[this.props.language].modalGoBackButton }
        </button>
      ),
      continue: (
        <button className="btn btn-primary" key="continue" onClick={ this.showSubmitModal }>
          { settings.text[this.props.language].modalContinueButton }
        </button>
      ),
      submit: (
        <button className="btn btn-primary" key="submit" onClick={ this.postData }>
          { settings.text[this.props.language].modalSubmitButton }
        </button>
      )
    }

    return buttonKeys.map(key => modalButtons[key])
  }

  render() {
    const language = this.props.language

    return (
      <StickyContainer>
        <div className="row">
          <Sticky>
            <Dashboard
              language={language}
              totalCost={this.state.totalCost}
              totalBenefits={this.state.totalBenefits}
              budgetIsValid={this.state.budgetIsValid}
            />
          </Sticky>
        </div>
        <form onSubmit={this.submit}>
          {strategies.map(strategy => (
            <div key={strategy.key}>
              {this.getCategoryTitle(strategy, language)}
              <Strategy
                strategy={strategy}
                language={language}
                selected={Boolean(this.state.selectedStrategies[strategy.key])}
                toggleSelected={this.toggleSelected}
              />
            </div>
          ))}

          <div className="row bottom-buttons">
            <div className="col-md-12">
              <button
                className="btn-bottom btn-light"
                onClick={this.reset}
              >{ settings.text[language].resetTitle }</button>
              <input
                className="btn-bottom btn-dark"
                type="submit"
                value={`${settings.text[language].submitTitle}`}
                disabled={this.state.submitting}
              />
            </div>
          </div>
        </form>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="Modal"
          className="modal-container"
          style={{overlay: {zIndex: 2}}}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  className="close"
                  type="button"
                  onClick={ this.closeModal }
                  aria-label={settings.text[language].modalCloseButton}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title">{ this.state.modalTitle }</h4>
              </div>
              <div className="modal-body">
                <p dangerouslySetInnerHTML={{__html: this.state.modalContent}} />
              </div>
              <div className="modal-footer">
                { this.state.modalButtons }
              </div>
            </div>
          </div>
        </Modal>
        </StickyContainer>
    )
  }
}
