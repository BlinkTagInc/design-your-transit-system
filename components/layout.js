import Head from 'next/head'

import settings from '../data/settings'
import Strategies from './strategies'
import Header from './header'
import Footer from './footer'
import { colors } from './theme'

export default ({ children, language = 'en' }) => (
  <div>
    <Head>
      <title>{ settings.text[language].siteTitle }</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

      <link href="https://fonts.googleapis.com/css?family=Lato:400,700,900" rel="stylesheet" type="text/css" />
    </Head>
    <div className="container main-container">
      <Header language={language} />

      { children }

      <Strategies language={language} />

      <Footer language={language} />
    </div>

    <style jsx global>{`
      body {
        background: ${colors.background};
        font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        line-height: 1.2;
      }

      h1, h2, h3, h4 {
        font-weight: bold;
      }

      h2 {
        font-size: 22px;
      }

      h3 {
        font-size: 16px;
      }

      h4 {
        font-size: 14px;
      }

      a {
        color: ${colors.link};
      }

      a:hover {
        color: ${colors.linkHover};
      }

      .bottom-buttons {
        margin-top: 20px;
      }

      .btn-bottom {
        text-align: center;
        width: 50%;
        height: 53px;
        font-size: 16px;
        font-weight: bold;
        line-height: 48px;
        cursor: pointer;
        border: none;
        border-radius: 0;
      }

      .btn-light {
        background: ${colors.btnLight};
        color: ${colors.btnLightText};

        &:hover {
          background: ${colors.btnLightHover};
        }
      }

      .btn-dark {
        background: ${colors.btnDark};
        color: ${colors.btnDarkText};

        &:hover {
          background: ${colors.btnDarkHover};
        }

        &:disabled {
          color: ${colors.btnDarkDisabled};
        }
      }

      .bg-dark {
        background-color: ${colors.cardDark};
      }
    `}</style>

    <style jsx>{`
      .main-container {
        max-width: 960px;
      }
    `}</style>
  </div>
)
