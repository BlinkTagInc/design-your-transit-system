import settings from '../data/settings'
import { colors } from './theme'

const Footer =({ language = 'en' }) => (
  <>
    <footer className="flex justify-between p-3 md:p-5">
      <div
        className="max-w-xl"
        dangerouslySetInnerHTML={{ __html: settings.text[language].footerAbout }}
      />
      <div dangerouslySetInnerHTML={{ __html: settings.text[language].footerCopyright }} />
    </footer>

    <style jsx global>{`
      footer {
        color: ${colors.footerText};
        background-color: ${colors.footerBackground};
      }

      footer a {
        color: ${colors.footerText};
      }
      
      footer a:hover {
        color: ${colors.footerTextHover};
      }
    `}</style>
  </>
)

export default Footer;
