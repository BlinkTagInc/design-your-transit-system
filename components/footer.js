import { useRouter } from 'next/router'

import settings from '../data/settings.js'
import { colors } from '../data/theme.js'

const Footer = () => {
  const router = useRouter()
  const { locale } = router

  return (
    <>
      <footer className="flex flex-col md:flex-row justify-between p-3 md:p-5">
        <div
          className="max-w-xl"
          dangerouslySetInnerHTML={{ __html: settings.text[locale].footerAbout }}
        />
        <div dangerouslySetInnerHTML={{ __html: settings.text[locale].footerCopyright }} className="mt-3 md:mt-0 text-right" />
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
}

export default Footer
