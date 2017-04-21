import classNames from 'classnames'
import settings from '../data/settings'

export default class Strategy extends React.Component {
  constructor(props) {
    super(props)

    this.toggleSelected = () => {
      this.props.toggleSelected(this.props.strategy.key)
    }
  }

  getCostSign(strategy) {
    if (settings.costStyle === 'numeric' || strategy.cost === 0) {
      return `$${strategy.cost}`
    } else if (settings.costStyle === 'dollar') {
      return new Array(strategy.cost + 1).join('$')
    }
  }

  render() {
    const strategy = this.props.strategy
    const language = this.props.language

    return (
      <div className={classNames('row', 'strategy', {selected: this.props.selected})}>
        <div className="col-md-7">
          <label className="strategy-info">
            <input
              className="strategy-input"
              type="checkbox"
              name={strategy.key}
              title={strategy.text[language].title}
              checked={this.props.selected}
              onChange={this.toggleSelected}
               />
            <img
              src={`static/images/icons/${language}/${strategy.key}.png`}
              alt=""
              className={classNames({hidden: Boolean(this.props.selected)}, 'strategy-image')}
            />
            <img
              src={`static/images/icons/${language}/${strategy.key}_inverse.png`}
              alt=""
              className={classNames({hidden: !this.props.selected}, 'strategy-image')}
            />
            <h4 className="strategy-title">{ strategy.text[language].title }</h4>
            <div className="strategy-description">{ strategy.text[language].description }</div>
          </label>
        </div>
        <div className="col-md-5">
          <div className="strategy-benefits">
            {settings.benefitCategories.map(benefitCategory => (
              <div className="benefit" key={benefitCategory.key}>
                <div className="benefit-title">{ benefitCategory.text[language].title }</div>
                <div className="benefit-bars-container">
                  <div className="benefit-bars">
                    {[...Array(strategy.benefits[benefitCategory.key])].map((empty, idx) => (
                      <div className="bar" key={idx} />
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="cost">
              <div className="cost-title">{ settings.text[language].costTitle }</div>
              <div className="cost-signs">{ this.getCostSign(strategy) }</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
