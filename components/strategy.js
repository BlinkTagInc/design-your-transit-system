import React from 'react'
import classNames from 'classnames'
import settings from '../data/settings'
import { colors, breakpoints } from './theme'

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
    }

    if (settings.costStyle === 'dollar') {
      return new Array(strategy.cost + 1).join('$')
    }
  }

  render() {
    const { strategy } = this.props
    const { language } = this.props

    return (
      <div className={classNames('row', 'strategy', 'mb-1', { selected: this.props.selected })}>
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
              src={`/images/icons/${language}/${strategy.key}.png`}
              alt=""
              className="strategy-image"
              hidden={Boolean(this.props.selected)}
            />
            <img
              src={`/images/icons/${language}/${strategy.key}_inverse.png`}
              alt=""
              className="strategy-image"
              hidden={Boolean(!this.props.selected)}
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
                    {[...new Array(strategy.benefits[benefitCategory.key])].map((empty, idx) => (
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
        <style jsx>{`
          .strategy {
            .strategy-info {
              background: ${colors.strategy};
              margin-bottom: 0;
              font-weight: normal;
              cursor: pointer;
              display: block;
              min-height: 85px;
              padding: 5px 0;

              .strategy-input {
                float: left;
                margin: 31px 10px;
              }

              .strategy-image {
                width: 75px;
                height: 75px;
                float: left;
                margin-right: 10px;
              }

              .strategy-title {
                margin: 5px 10px 4px;
              }

              .strategy-description {
                padding: 0 10px 5px;
                font-size: 13px;
              }
            }

            .strategy-benefits {
              background: ${colors.strategy};
              height: 85px;
              padding: 5px 0;
              text-align: center;

              .benefit,
              .cost {
                width: 60px;
                margin: 5px 1px;
                height: 65px;
                display: inline-block;
                vertical-align: top;

                .benefit-title,
                .cost-title {
                  font-size: 10px;
                  text-align: center;
                  height: 28px;
                  vertical-align: bottom;
                }

                .benefit-bars-container {
                  height: 40px;
                  position: absolute;

                  .benefit-bars {
                    position: absolute;
                    bottom: 5px;
                    width: 60px;

                    .bar {
                      width: 100%;
                      height: 8px;
                      background: ${colors.strategyBar};
                      margin-bottom: 2px;
                    }
                  }
                }

                .cost-signs {
                  text-align: center;
                  font-weight: bold;
                  color: ${colors.strategyCostSigns};
                  font-size: 20px;
                }
              }
            }

            &.selected {
              .strategy-info {
                background: ${colors.strategySelected};
                color: ${colors.strategySelectedText};
              }

              .strategy-benefits {
                background: ${colors.strategySelected};
                color: ${colors.strategySelectedText};

                .cost {
                  .cost-signs {
                    color: ${colors.strategySelectedText};
                  }
                }
              }
            }
          }

          @media (min-width: 345px) {
            .strategy {
              .strategy-benefits {
                .benefit,
                .cost {
                  margin: 5px 4px;
                }
              }
            }
          }

          @media (min-width: 375px) {
            .strategy {
              .strategy-benefits {
                .benefit,
                .cost {
                  margin: 5px 7px;
                }
              }
            }
          }

          @media (min-width: ${breakpoints.medium}) {
            .strategy {
              background: ${colors.strategy};

              &.selected {
                background: ${colors.strategySelected};
              }

              .strategy-info {
                .strategy-input {
                  margin: 31px 10px 31px 5px;
                }
              }

              .strategy-benefits {

                .benefit,
                .cost {
                  margin: 5px 7px;

                  &:first-child {
                    margin-left: 0;
                  }

                  &:last-child {
                    margin-right: 0;
                  }
                }
              }

              .strategy-info {
                .strategy-title {
                  margin-left: 107px;
                }

                .strategy-description {
                  margin-left: 107px;
                }
              }
            }
          }
        `}</style>
      </div>
    )
  }
}
