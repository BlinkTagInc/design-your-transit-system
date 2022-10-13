import { Fragment } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import settings from '../data/settings.js'
import { colors, breakpoints } from '../data/theme.js'

const Header = () => {
  const router = useRouter()
  const { locale, locales } = router

  const oppositeLocale =
    locales.length > 1 ? locales.find((l) => l !== locale) : null

  return (
    <div>
      <div className="flex items-center mx-3 my-2 md:m-0">
        <div className="logo my-0 md:my-2 mr-4 shrink-0">
          <Image
            src="/images/logo.png"
            width="90"
            height="90"
            alt={settings.text[locale].logoAlt}
          />
        </div>
        <h1
          className="title"
          dangerouslySetInnerHTML={{
            __html: settings.text[locale].headerTitle,
          }}
        />
      </div>

      <div className="stripe"></div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-10">
        <div className="md:col-span-7">
          <div
            className="py-5 px-8"
            dangerouslySetInnerHTML={{
              __html: settings.text[locale].introText,
            }}
          />
          <div className="bg-dark rounded-md text-white py-5 px-5 md:px-8 mx-3 md:mx-0 mb-5">
            <h3 className="mb-2">{settings.text[locale].howItWorksTitle}</h3>
            <div
              className="pl-8"
              dangerouslySetInnerHTML={{
                __html: settings.text[locale].howItWorksContent,
              }}
            />
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="pb-10 md:py-5 px-8 md:py-5">
            <h3 className="mb-2">
              {settings.text[locale].benefitCategoriesSectionTitle}{' '}
            </h3>
            <dl className="benefits-list">
              {settings.benefitCategories.map((benefitCategory, idx) => (
                <Fragment key={idx}>
                  <dt>{benefitCategory.text[locale].title}</dt>
                  <dd>{benefitCategory.text[locale].description}</dd>
                </Fragment>
              ))}
            </dl>
          </div>

          <Link href="/" locale={oppositeLocale}>
            <a className="btn btn-light btn-block mx-3 md:mx-0 mb-8 md:mb-0">
              {settings.text[locale].translationContent}
            </a>
          </Link>
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
}

export default Header
