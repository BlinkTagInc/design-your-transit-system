import Head from 'next/head'
import settings from '../data/settings'
import stylesheet from '../styles/style.scss'
import Strategies from './strategies'

export default ({children, language = 'en'}) => (
  <div>
    <Head>
      <title>{ settings.text[language].siteTitle }</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" type="image/png" sizes="192x192" href="/static/favicon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />

      <link href="https://fonts.googleapis.com/css?family=Lato:400,700,900" rel="stylesheet" type="text/css" />
      <style dangerouslySetInnerHTML={{__html: stylesheet}} />
    </Head>
    <div className="container main-container">
      <header className="row">
        <div className="col-md-12">
          <img className="logo" src="/static/images/logo.png" srcSet="/static/images/logo.png 1x, /static/images/logo@2x.png 2x" alt={ settings.text[language].logoAlt } />
          <h1 className="title" dangerouslySetInnerHTML={{__html: settings.text[language].headerTitle}} />
        </div>
        <div className="stripe"></div>
      </header>

      <div className="row">
        <div className="col-md-7">
          <div className="panel panel-transparent">
            <div className="panel-body" dangerouslySetInnerHTML={{__html: settings.text[language].introText}} />
          </div>
          <div className="panel panel-dark">
            <div className="panel-body">
              <h3>{ settings.text[language].howItWorksTitle }</h3>
              <div className="how-it-works" dangerouslySetInnerHTML={{__html: settings.text[language].howItWorksContent}} />
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="panel panel-transparent">
            <div className="panel-body">
              <h3>{ settings.text[language].benefitCategoriesSectionTitle} </h3>
              <dl className="benefits-list">
                {settings.benefitCategories.map((benefitCategory, idx) => (
                  <span key={idx}>
                    <dt>{ benefitCategory.text[language].title }</dt>
                    <dd>{ benefitCategory.text[language].description }</dd>
                  </span>
                ))}
              </dl>
            </div>
          </div>

          <div className="panel panel-light translation-content">
            <a href={ settings.text[language].translationUrl }>{ settings.text[language].translationContent }</a>
          </div>
        </div>
      </div>

      { children }

      <Strategies language={language} />

      <footer className="row">
        <div
          className="col-md-9"
          dangerouslySetInnerHTML={{__html: settings.text[language].footerAbout}}
        />
        <div
          className="col-md-3 text-right"
          dangerouslySetInnerHTML={{__html: settings.text[language].footerCopyright}}
        />
      </footer>
    </div>
  </div>
)
