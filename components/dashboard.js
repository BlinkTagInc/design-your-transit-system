import React from 'react'
import classNames from 'classnames'
import settings from '../data/settings'
import strategies from '../data/strategies'
import { colors } from './theme'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meterHeight: 0,
      costMeterHeight: 0,
      benefitMeterHeights: settings.benefitCategories.reduce((totals, category) => {
        totals[category.key] = 0
        return totals
      }, {})
    }
  }

  getCostMeterHeight() {
    const { totalCost } = this.props;
    const { meterHeight } = this.state;
    return Math.min(1, totalCost / settings.maxCost) * meterHeight
  }

  getBenefitMeterHeights() {
    const { totalBenefits } = this.props;
    const { meterHeight } = this.state;
    const maxBenefits = strategies.reduce((benefits, strategy) => {
      settings.benefitCategories.forEach(benefitCategory => {
        if (!Object.prototype.hasOwnProperty.call(benefits, benefitCategory.key)) {
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

  render() {
    const { language } = this.props;
    const costMeterHeight = this.getCostMeterHeight();
    const benefitMeterHeights = this.getBenefitMeterHeights();

    return (
      <div className="dashboard">
        <div className="row" style={{ margin: 0 }}>
          <div className="col-md-5 offset-md-7">
            <div className="dashboard-titles pt-2">
              <div className="dashboard-title dashboard-title-benefit">{ settings.text[language].dashboardTitleBenefits }</div>
              <div className="dashboard-title dashboard-title-cost">{ settings.text[language].dashboardTitleCosts }</div>
            </div>
            <div className="dashboard-meters">
              {settings.benefitCategories.map(benefitCategory => (
                <div className="dashboard-container" id={benefitCategory.key} key={benefitCategory.key}>
                  <div className="dashboard-meter">
                    <div
                      className="dashboard-meter-bar"
                      style={{ height: `${benefitMeterHeights[benefitCategory.key]}px` }}></div>
                  </div>
                  <div className="dashboard-meter-title">{ benefitCategory.text[language].title }</div>
                </div>
              ))}

              <div className="dashboard-container">
                <div
                  className={classNames('dashboard-meter cost', { 'over-budget': !this.props.budgetIsValid }, this.getMeterHeightClass())}
                  ref="costMeter">
                  <div
                    className="dashboard-meter-bar"
                    style={{ height: `${costMeterHeight}px` }}></div>
                  <div className="dashboard-meter-value">{ this.props.totalCost > 0 ? `$${this.props.totalCost}` : '' }</div>
                </div>
                <div className="dashboard-meter-title">{ settings.text[language].totalCostTitle }</div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .dashboard {
            color: ${colors.dashboardText};
            background: ${colors.dashboard};
            overflow: hidden;
            text-align: center;
            margin-right: -15px;
            margin-left: -15px;

            .dashboard-titles {
              width: 246px;
              display: inline-block;

              .dashboard-title {
                font-weight: bold;
                font-size: 13px;
                margin: 0;

                &.dashboard-title-benefit {
                  margin-left: 3px;
                  float: left;
                }

                &.dashboard-title-cost {
                  float: right;
                }
              }
            }

            .dashboard-meters {
              padding-bottom: 8px;

              .dashboard-container {
                width: 60px;
                margin: 0 1px;
                display: inline-block;
                vertical-align: top;

                .dashboard-meter {
                  position: relative;
                  background: ${colors.dashboardMeterBackground};
                  border-radius: 2px;
                  width: 60px;
                  height: 50px;
                  margin: 5px 0;
                  overflow: hidden;

                  &.cost .dashboard-meter-bar {
                    background: ${colors.dashboardMeterCost};
                  }

                  &.over-budget .dashboard-meter-bar {
                    background: ${colors.dashboardMeterOverCost};
                  }

                  .dashboard-meter-bar {
                    background: ${colors.dashboardMeter};
                    width: 60px;
                    height: 0;
                    position: absolute;
                    bottom: 0;
                    transition: height 500ms ease;
                  }

                  .dashboard-meter-value {
                    color: ${colors.dashboardMeterTextDark};
                    text-align: center;
                    padding-top: 17px;
                    position: relative;
                    font-weight: bold;
                  }

                  &.half-full .dashboard-meter-value {
                    color: ${colors.dashboardMeterTextLight};
                    text-shadow: 0px 0px 2px ${colors.dashboardMeterTextLightShadow};
                  }
                }

                .dashboard-meter-title {
                  font-size: 10px;
                  text-align: center;
                }
              }
            }
          }

          @media (min-width: 345px) {
            .dashboard {
              .dashboard-titles {
                width: 268px;
              }
              .dashboard-meters {
                .dashboard-container {
                  margin: 0 4px;
                }
              }
            }
          }

          @media (min-width: 375px) {
            .dashboard {
              .dashboard-titles {
                width: 290px;

                .dashboard-title.dashboard-title-benefit {
                  margin-left: 6px;
                }
              }

              .dashboard-meters {
                .dashboard-container {
                  margin: 0 7px;

                  &:first-child {
                    margin-left: 0;
                  }

                  &:last-child {
                    margin-right: 0;
                  }
                }
              }
            }
          }
        `}</style>
      </div>
    )
  }
}
