import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, GraduationCap } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "./ui/button"
import { ThemeToggle } from "./ui/theme-toggle"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { t } = useTranslation()

  const navigationItems = [
    { name: t('nav.institutions'), href: "/institutions" },
    { name: t('nav.jobRequirements'), href: "/job-requirements" },
    { name: t('nav.map'), href: "/map" },
    { name: t('nav.vacancies'), href: "/vacancies" },
    { name: t('nav.programs'), href: "/programs" },
    { name: t('nav.classifiers'), href: "/classifiers" },
    { name: t('nav.certificates'), href: "/certificates" },
    { name: t('nav.councils'), href: "/councils" },
    { name: t('nav.centers'), href: "/centers" },
    { name: t('nav.schools'), href: "/schools" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            EduPortal UZ
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground ${
                location.pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          <ThemeToggle />

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground ${
                      location.pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}