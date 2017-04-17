import classNames from 'classnames'
import settings from '../data/settings'
import strategies from '../data/strategies'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meterHeight: 0,
      costMeterHeight: this.getCostMeterHeight(this.props.totalCost, 0),
      benefitMeterHeights: this.getBenefitMeterHeights(this.props.totalBenefits, 0)
    }
  }

  getCostMeterHeight(totalCost, meterHeight) {
    return Math.min(1, totalCost / settings.maxCost) * meterHeight
  }

  getBenefitMeterHeights(totalBenefits, meterHeight) {
    const maxBenefits = strategies.reduce((benefits, strategy) => {
      settings.benefitCategories.forEach(benefitCategory => {
        if (!benefits.hasOwnProperty(benefitCategory.key)) {
          benefits[benefitCategory.key] = 0
        }
        benefits[benefitCategory.key] += strategy.benefits[benefitCategory.key]
      })
      return benefits
    }, {})

    return settings.benefitCategories.reduce((totals, category) => {
      totals[category.key] = totalBenefits[category.key] / maxBenefits[category.key] * meterHeight
      return totals
    }, {})
  }

  getMeterHeightClass() {
    if (this.props.totalCost / settings.maxCost > 0.44) {
      return 'half-full'
    }
  }

  componentDidMount() {
    this.setState({
      meterHeight: this.refs.costMeter.clientHeight
    })
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      costMeterHeight: this.getCostMeterHeight(newProps.totalCost, this.state.meterHeight),
      benefitMeterHeights: this.getBenefitMeterHeights(newProps.totalBenefits, this.state.meterHeight)
    })
  }

  render() {
    const language = this.props.language
    return (
      <div className="dashboard">
        <div className="col-md-5 col-md-offset-7">
          <div className="dashboard-titles">
            <div className="dashboard-title dashboard-title-benefit">{ settings.text[language].dashboardTitleBenefits }</div>
            <div className="dashboard-title dashboard-title-cost">{ settings.text[language].dashboardTitleCosts }</div>
          </div>
          <div className="dashboard-meters">
            {settings.benefitCategories.map(benefitCategory => (
              <div className="dashboard-container" id={benefitCategory.key} key={benefitCategory.key}>
                <div className="dashboard-meter">
                  <div
                    className="dashboard-meter-bar"
                    style={{height: `${this.state.benefitMeterHeights[benefitCategory.key]}px`}}></div>
                </div>
                <div className="dashboard-meter-title">{ benefitCategory.text[language].title }</div>
              </div>
            ))}

            <div className="dashboard-container">
              <div
                className={classNames('dashboard-meter cost', {'over-budget': !this.props.budgetIsValid}, this.getMeterHeightClass())}
                ref="costMeter">
                <div
                  className="dashboard-meter-bar"
                  style={{height: `${this.state.costMeterHeight}px`}}></div>
                <div className="dashboard-meter-value">{ this.props.totalCost > 0 ? `$${this.props.totalCost}` : '' }</div>
              </div>
              <div className="dashboard-meter-title">{ settings.text[language].totalCostTitle }</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
