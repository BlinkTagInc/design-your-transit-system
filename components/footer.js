import settings from '../data/settings'
import { colors, breakpoints } from './theme'

const Footer =({ language = 'en' }) => (
  <>
    <footer className="row mt-3">
      <div
        className="col-md-6"
        dangerouslySetInnerHTML={{ __html: settings.text[language].footerAbout }}
      />
      <div
        className="col-md-3 offset-md-3 text-right"
        dangerouslySetInnerHTML={{ __html: settings.text[language].footerCopyright }}
      />
    </footer>

    <style jsx global>{`
      footer {
        padding: 10px;
        color: ${colors.footerText};
        background-color: ${colors.footerBackground};
      }

      footer a {
        color: ${colors.footerText};
      }
      
      footer a:hover {
        color: ${colors.footerTextHover};
      }

      @media (min-width: ${breakpoints.large}) {
        footer {
          padding: 20px;
        }
      }
    `}</style>
  </>
)

export default Footer;
