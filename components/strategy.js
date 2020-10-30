import React from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import settings from '../data/settings'
import { colors, breakpoints } from '../data/theme'

const Strategy = ({ strategy, selected, toggleSelected }) => {
  const router = useRouter()
  const { locale } = router

  const getCostSign = () => {
    if (settings.costStyle === 'numeric' || strategy.cost === 0) {
      return `$${strategy.cost}`
    }

    if (settings.costStyle === 'dollar') {
      return new Array(strategy.cost + 1).join('$')
    }
  }

  return (
    <div className={classNames('md:flex', 'justify-between', 'strategy', 'mb-1', { selected })}>
      <label className="strategy-info flex-shrink flex pt-2 md:py-2">
        <input
          className="self-center mx-4 flex-shrink-0"
          type="checkbox"
          name={strategy.key}
          title={strategy.text[locale].title}
          checked={selected}
          onChange={() => toggleSelected(strategy.key)}
        />
        <div className="flex-shrink-0 mr-4">
          <img
            src={`/images/icons/${locale}/${strategy.key}.png`}
            alt=""
            className="strategy-image"
            hidden={Boolean(selected)}
          />
          <img
            src={`/images/icons/${locale}/${strategy.key}_inverse.png`}
            alt=""
            className="strategy-image"
            hidden={Boolean(!selected)}
          />
        </div>
        <div className="mr-4">
          <h4 className="strategy-title">{ strategy.text[locale].title }</h4>
          <div className="strategy-description">{ strategy.text[locale].description }</div>
        </div>
      </label>
      <div className="flex-shrink-0">
        <div className="strategy-benefits flex justify-center md:justify-end md:mr-3">
          {settings.benefitCategories.map(benefitCategory => (
            <div className="benefit" key={benefitCategory.key}>
              <div className="benefit-title">{ benefitCategory.text[locale].title }</div>
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
            <div className="cost-title">{ settings.text[locale].costTitle }</div>
            <div className="cost-signs">{ getCostSign() }</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .strategy {
          background: ${colors.strategy};
          cursor: pointer;
        }

        .strategy.selected {
          background: ${colors.strategySelected};
        }

        .strategy-info {
          cursor: pointer;
        }

        .strategy-image {
          width: 75px;
          height: 75px;
        }

        .strategy-description {
          font-size: 13px;
        }

        .strategy-benefits {
          height: 85px;
          padding: 5px 0;
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
          font-size: 11px;
          text-align: center;
          height: 28px;
          line-height: 1;
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
          color: ${colors.strategySelectedText};
        }

        .strategy.selected .strategy-benefits {
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
          .strategy-benefits .benefit,
          .strategy-benefits .cost {
            margin: 5px 7px;
          }

          .strategy-benefits .benefit:first-child,
          .strategy-benefits .cost:first-child {
            margin-left: 0;
          }

          .strategy-benefits .benefit:last-child,
          .strategy-benefits .cost:last-child {
            margin-right: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default Strategy
