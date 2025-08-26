import { Link } from "react-router-dom"
import { GraduationCap } from "lucide-react"
import { useTranslation } from "react-i18next"

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EduPortal UZ
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('home.subtitle')}
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">{t('footer.quickLinks')}</h4>
            <div className="space-y-2 text-sm">
              <Link to="/institutions" className="block text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.institutions')}
              </Link>
              <Link to="/job-requirements" className="block text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.jobRequirements')}
              </Link>
              <Link to="/map" className="block text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.map')}
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">{t('footer.resources')}</h4>
            <div className="space-y-2 text-sm">
              <Link to="/programs" className="block text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.programs')}
              </Link>
              <Link to="/certificates" className="block text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.certificates')}
              </Link>
              <Link to="/classifiers" className="block text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.classifiers')}
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">{t('footer.support')}</h4>
            <div className="space-y-2 text-sm">
              <Link to="/about" className="block text-muted-foreground hover:text-foreground transition-colors">
                {t('footer.aboutUs')}
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                {t('footer.contact')}
              </Link>
              <Link to="/public-offer" className="block text-muted-foreground hover:text-foreground transition-colors">
                {t('footer.publicOffer')}
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 EduPortal UZ. {t('footer.allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  )
}