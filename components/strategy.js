import React from 'react'
import classNames from 'classnames'
import settings from '../data/settings'
import { colors, breakpoints } from './theme'

const Strategy = ({ language, strategy, selected, toggleSelected }) => {
  const getCostSign = () => {
    if (settings.costStyle === 'numeric' || strategy.cost === 0) {
      return `$${strategy.cost}`
    }

    if (settings.costStyle === 'dollar') {
      return new Array(strategy.cost + 1).join('$')
    }
  }

  return (
    <div className={classNames('row', 'strategy', 'mb-1', { selected: selected })}>
      <div className="col-md-7">
        <label className="strategy-info">
          <input
            className="strategy-input"
            type="checkbox"
            name={strategy.key}
            title={strategy.text[language].title}
            checked={selected}
            onChange={() => toggleSelected(strategy.key)}
          />
          <img
            src={`/images/icons/${language}/${strategy.key}.png`}
            alt=""
            className="strategy-image"
            hidden={Boolean(selected)}
          />
          <img
            src={`/images/icons/${language}/${strategy.key}_inverse.png`}
            alt=""
            className="strategy-image"
            hidden={Boolean(!selected)}
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
            <div className="cost-signs">{ getCostSign() }</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .strategy-info {
          background: ${colors.strategy};
          margin-bottom: 0;
          font-weight: normal;
          cursor: pointer;
          display: block;
          min-height: 85px;
          padding: 5px 0;
        }

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

        .strategy-benefits {
          background: ${colors.strategy};
          height: 85px;
          padding: 5px 0;
          text-align: center;
        }

        .strategy-benefits .benefit,
        .strategy-benefits .cost {
          width: 60px;
          margin: 5px 1px;
          height: 65px;
          display: inline-block;
          vertical-align: top;
        }

        .strategy-benefits .benefit-title,
        .strategy-benefits .cost-title {
          font-size: 10px;
          text-align: center;
          height: 28px;
          vertical-align: bottom;
        }

        .benefit-bars-container {
          height: 40px;
          position: absolute;
        }

        .benefit-bars {
          position: absolute;
          bottom: 5px;
          width: 60px;
        }

        .bar {
          width: 100%;
          height: 8px;
          background: ${colors.strategyBar};
          margin-bottom: 2px;
        }

        .cost-signs {
          text-align: center;
          font-weight: bold;
          color: ${colors.strategyCostSigns};
          font-size: 20px;
        }

        .strategy.selected .strategy-info {
          background: ${colors.strategySelected};
          color: ${colors.strategySelectedText};
        }

        .strategy.selected .strategy-benefits {
          background: ${colors.strategySelected};
          color: ${colors.strategySelectedText};
        }
        
        .strategy.selected .strategy-benefits .cost-signs {
          color: ${colors.strategySelectedText};
        }

        @media (min-width: 345px) {
          .strategy-benefits .benefit,
          .strategy-benefits .cost {
            margin: 5px 4px;
          }
        }

        @media (min-width: 375px) {
          .strategy-benefits .benefit,
          .strategy-benefits .cost {
            margin: 5px 7px;
          }
        }

        @media (min-width: ${breakpoints.medium}) {
          .strategy {
            background: ${colors.strategy};
          }

          .strategy.selected {
            background: ${colors.strategySelected};
          }

          .strategy-input {
            margin: 31px 10px 31px 5px;
          }

          .strategy-benefits .benefit,
          .strategy-benefits .cost {
            margin: 5px 7px;
          }

          .strategy-benefits .benefit:first-child,
          .strategy-benefits .cost:first-child {
            margin-left: 0;
          }

          .strategy-benefits .benefit:last-child,
          .strategy-benefits .cost:last-child 
            margin-right: 0;
          }


          .strategy-title {
            margin-left: 107px;
          }

          .strategy-description {
            margin-left: 107px;
          }
        }
      `}</style>
    </div>
  )
}

export default Strategy
