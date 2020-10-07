import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import settings from '../data/settings'
import strategies from '../data/strategies'
import { colors } from './theme'

const Dashboard = ({ language, totalCost, totalBenefits, budgetIsValid }) => {
  const meterRef = useRef(null);
  const [meterHeight, setMeterHeight] = useState(0)

  const getCostMeterHeight = () => {
    return Math.min(1, totalCost / settings.maxCost) * meterHeight
  }

  const getBenefitMeterHeights = () => {
    const maxBenefits = strategies.reduce((memo, strategy) => {
      for (const category of settings.benefitCategories) {
        if (memo[category.key] === undefined) {
          memo[category.key] = 0
        }

        memo[category.key] += strategy.benefits[category.key]
      }
      return memo
    }, {})

    return settings.benefitCategories.reduce((memo, category) => {
      memo[category.key] = totalBenefits[category.key] / maxBenefits[category.key] * meterHeight
      return memo
    }, {})
  }

  const getMeterHeightClass = () => {
    if (totalCost / settings.maxCost > 0.44) {
      return 'half-full'
    }
  }

  useEffect(() => {
    setMeterHeight(meterRef.current.offsetHeight);
  }, [meterRef])

  const costMeterHeight = getCostMeterHeight();
  const benefitMeterHeights = getBenefitMeterHeights();

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
                className={classNames('dashboard-meter cost', { 'over-budget': !budgetIsValid }, getMeterHeightClass())}
                ref={meterRef}
              >
                <div
                  className="dashboard-meter-bar"
                  style={{ height: `${costMeterHeight}px` }}></div>
                <div className="dashboard-meter-value">{ totalCost > 0 ? `$${totalCost}` : '' }</div>
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
        }

        .dashboard .dashboard-titles {
          width: 246px;
          display: inline-block;
        }

        .dashboard .dashboard-titles .dashboard-title {
          font-weight: bold;
          font-size: 13px;
          margin: 0;
        }

        .dashboard .dashboard-titles .dashboard-title.dashboard-title-benefit {
          margin-left: 3px;
          float: left;
        }

        .dashboard .dashboard-titles .dashboard-title.dashboard-title-cost {
          float: right;
        }

        .dashboard .dashboard-meters {
          padding-bottom: 8px;
        }

        .dashboard .dashboard-meters .dashboard-container {
          width: 60px;
          margin: 0 1px;
          display: inline-block;
          vertical-align: top;
        }

        .dashboard .dashboard-meters .dashboard-meter {
          position: relative;
          background: ${colors.dashboardMeterBackground};
          border-radius: 2px;
          width: 60px;
          height: 50px;
          margin: 5px 0;
          overflow: hidden;
        }

        .dashboard .dashboard-meters  .dashboard-meter.cost .dashboard-meter-bar {
          background: ${colors.dashboardMeterCost};
        }

        .dashboard .dashboard-meters .dashboard-meter.over-budget .dashboard-meter-bar {
          background: ${colors.dashboardMeterOverCost};
        }

        .dashboard .dashboard-meters .dashboard-meter-bar {
          background: ${colors.dashboardMeter};
          width: 60px;
          height: 0;
          position: absolute;
          bottom: 0;
          transition: height 500ms ease;
        }

        .dashboard .dashboard-meters .dashboard-meter-value {
          color: ${colors.dashboardMeterTextDark};
          text-align: center;
          padding-top: 17px;
          position: relative;
          font-weight: bold;
        }

        .dashboard .dashboard-meters .dashboard-meter.half-full .dashboard-meter-value {
          color: ${colors.dashboardMeterTextLight};
          text-shadow: 0px 0px 2px ${colors.dashboardMeterTextLightShadow};
        }

        .dashboard .dashboard-meters .dashboard-meter-title {
          font-size: 10px;
          text-align: center;
        }

        @media (min-width: 345px) {
          .dashboard .dashboard-titles {
            width: 268px;
          }

          .dashboard .dashboard-meters .dashboard-container {
            margin: 0 4px;
          }
        }

        @media (min-width: 375px) {
          .dashboard .dashboard-titles {
            width: 290px;
          }

          .dashboard .dashboard-titles .dashboard-title.dashboard-title-benefit {
            margin-left: 6px;
          }

          .dashboard .dashboard-meters .dashboard-container {
            margin: 0 7px;
          }

          .dashboard .dashboard-meters .dashboard-container:first-child {
            margin-left: 0;
          }

          .dashboard .dashboard-meters .dashboard-container:last-child {
            margin-right: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default Dashboard
