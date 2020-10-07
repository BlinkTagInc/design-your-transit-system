import { Fragment } from 'react'
import settings from '../data/settings'
import { colors, breakpoints } from './theme'

const Header = ({ language = 'en' }) => (
  <div role="header">
    <div className="flex items-center mx-3 my-2 md:m-0">
      <img className="logo my-0 md:my-2 mr-4" src="/images/logo.png" srcSet="/images/logo.png 1x, /images/logo@2x.png 2x" alt={ settings.text[language].logoAlt } />
      <h1 className="title" dangerouslySetInnerHTML={{ __html: settings.text[language].headerTitle }} />
    </div>

    <div className="stripe"></div>

    <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-10">
      <div className="md:col-span-7">
        <div className="py-5 px-8" dangerouslySetInnerHTML={{ __html: settings.text[language].introText }} />
        <div className="bg-dark rounded-md text-white py-5 px-5 md:px-8 mx-3 md:mx-0 mb-5">
          <h3 className="mb-2">{ settings.text[language].howItWorksTitle }</h3>
          <div className="pl-8" dangerouslySetInnerHTML={{ __html: settings.text[language].howItWorksContent }} />
        </div>
      </div>
      <div className="md:col-span-5">
        <div className="pb-10 md:py-5 px-8 md:py-5">
          <h3 className="mb-2">{ settings.text[language].benefitCategoriesSectionTitle} </h3>
          <dl className="benefits-list">
            {settings.benefitCategories.map((benefitCategory, idx) => (
              <Fragment key={idx}>
                <dt>{ benefitCategory.text[language].title }</dt>
                <dd>{ benefitCategory.text[language].description }</dd>
              </Fragment>
            ))}
          </dl>
        </div>

        <a href={ settings.text[language].translationUrl } className="btn btn-light btn-block mx-3 md:mx-0 mb-8 md:mb-0">{ settings.text[language].translationContent }</a>
      </div>
    </div>

    <style jsx>{`
      .logo {
        width: 50px;
        height: 50px;
      }

      .title {
        font-size: 22px;
      }

      .stripe {
        height: 7px;
        background: ${colors.headerStripe};
      }

      .benefits-list dt {
        font-weight: bold;
        font-size: 15px;
        margin-top: 8px;
      }

      .benefits-list dd {
        font-size: 13px;
        margin-left: 15px;
      }

      @media (min-width: ${breakpoints.large}) {
        .logo {
          width: 90px;
          height: 90px;
        }

        .title {
          font-size: 36px;
        }
      }
    `}</style>
  </div>
)

export default Header;
