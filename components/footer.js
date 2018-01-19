import settings from '../data/settings'
import {colors, breakpoints} from './theme'

export default ({language = 'en'}) => (
  <div>
    <footer className="row mt-3">
      <div
        className="col-md-9"
        dangerouslySetInnerHTML={{__html: settings.text[language].footerAbout}}
      />
      <div
        className="col-md-3 text-right"
        dangerouslySetInnerHTML={{__html: settings.text[language].footerCopyright}}
      />
    </footer>

    <style jsx>{`
      footer {
        padding: 10px;
        color: ${colors.footerText};
        background-color: ${colors.footerBackground};

        :global(a) {
          color: ${colors.footerText};

          &:hover {
            color: ${colors.footerTextHover};
          }
        }
      }

      @media (min-width: ${breakpoints.medium}) {
        footer {
          padding: 20px;
        }
      }
    `}</style>
  </div>
)
