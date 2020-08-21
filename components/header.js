import { Fragment } from 'react'
import settings from '../data/settings'
import { colors, breakpoints } from './theme'

const Header = ({ language = 'en' }) => (
  <div role="header">
    <div className="header row">
      <div className="col-md-12">
        <img className="logo" src="/images/logo.png" srcSet="/images/logo.png 1x, /images/logo@2x.png 2x" alt={ settings.text[language].logoAlt } />
        <h1 className="title" dangerouslySetInnerHTML={{ __html: settings.text[language].headerTitle }} />
      </div>
    </div>

    <div className="stripe"></div>

    <div className="row mb-3">
      <div className="col-md-7">
        <div className="card bg-transparent border-0">
          <div className="card-body" dangerouslySetInnerHTML={{ __html: settings.text[language].introText }} />
        </div>
        <div className="card bg-dark text-white">
          <div className="card-body">
            <h3>{ settings.text[language].howItWorksTitle }</h3>
            <div className="pl-0" dangerouslySetInnerHTML={{ __html: settings.text[language].howItWorksContent }} />
          </div>
        </div>
      </div>
      <div className="col-md-5">
        <div className="card bg-transparent border-0">
          <div className="card-body">
            <h3>{ settings.text[language].benefitCategoriesSectionTitle} </h3>
            <dl className="benefits-list">
              {settings.benefitCategories.map((benefitCategory, idx) => (
                <Fragment key={idx}>
                  <dt>{ benefitCategory.text[language].title }</dt>
                  <dd>{ benefitCategory.text[language].description }</dd>
                </Fragment>
              ))}
            </dl>
          </div>
        </div>

        <a href={ settings.text[language].translationUrl } className="btn btn-light btn-block">{ settings.text[language].translationContent }</a>
      </div>
    </div>

    <style jsx>{`
      .header {
        padding: 0 15px 10px;

        .logo {
          float: left;
          width: 50px;
          height: 50px;
          margin: 5px 0;
        }

        .title {
          margin: 0;
          padding: 8px 0 0 60px;
          font-size: 22px;

          .subtitle {
            font-size: 17px;
            display: block;
          }
        }
      }

      .stripe {
        height: 7px;
        clear: both;
        background: ${colors.headerStripe};
      }

      .benefits-list {
        dt {
          font-size: 15px;
          margin-top: 8px;
        }

        dd {
          font-size: 13px;
          margin-left: 15px;
        }
      }

      @media (min-width: 375px) {
        header .title {
          padding-top: 5px;
          .subtitle {
            font-size: inherit;
            display: inline;
          }
        }
      }

      @media (min-width: 550px) {
        header {
          .title {
            padding: 19px 0 0 69px;
          }
        }
      }

      @media (min-width: ${breakpoints.large}) {
        .header {
          padding: 0;

          .logo {
            width: 90px;
            height: 90px;
          }

          .title {
            padding: 29px 0 0 120px;
            font-size: 36px;
            float: none;
          }
        }
      }
    `}</style>
  </div>
)

export default Header;
