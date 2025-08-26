import { IInstitution } from "@/api/institutions/type"
import { SearchBar } from "@/components/SearchBar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InstitutionCard } from "@/pages/institutions/components/InstitutionCard"
import { Award, Briefcase, GraduationCap, MapPin, Search, TrendingUp, Users } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Link, useNavigate } from "react-router-dom"

export function HomePage() {
  const [institutions] = useState<IInstitution[]>([])
  const [loading] = useState(true)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const popularJobs = [
    t('data.jobs.softwareDeveloper.title'),
    t('data.jobs.mechanicalEngineer.title'),
    t('data.jobs.tourismManager.title'),
    "Buxgalter",
    "Marketing mutaxassisi",
    "Qurilish muhandisi",
    "Grafik dizayner",
    "O'qituvchi"
  ]

  const faqItems = [
    {
      question: t('home.faqItems.question1'),
      answer: t('home.faqItems.answer1')
    },
    {
      question: t('home.faqItems.question2'),
      answer: t('home.faqItems.answer2')
    },
    {
      question: t('home.faqItems.question3'),
      answer: t('home.faqItems.answer3')
    },
    {
      question: t('home.faqItems.question4'),
      answer: t('home.faqItems.answer4')
    }
  ]

  const handleSearch = (query: string, filters: string[]) => {
    console.log('Homepage search:', query, filters)
    navigate(`/search?q=${encodeURIComponent(query)}&types=${filters.join(',')}`)
  }

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
            {t('home.title')}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            {t('home.subtitle')}
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
            <Link to="/institutions">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg">
                <GraduationCap className="mr-2 h-5 w-5" />
                {t('home.institutions')}
              </Button>
            </Link>
            <Link to="/map">
              <Button size="lg" variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 text-lg">
                <MapPin className="mr-2 h-5 w-5" />
                {t('home.interactiveMap')}
              </Button>
            </Link>
            <Link to="/job-requirements">
              <Button size="lg" variant="outline" className="border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-8 py-4 text-lg">
                <Briefcase className="mr-2 h-5 w-5" />
                {t('home.jobRequirements')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="px-4">
        <div className="container mx-auto">
          <Card className="bg-white/60 backdrop-blur-lg border-0 shadow-xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold flex items-center justify-center">
                <Search className="mr-2 h-6 w-6 text-blue-600" />
                {t('home.findYourPath')}
              </CardTitle>
              <p className="text-muted-foreground">
                {t('home.searchDescription')}
              </p>
            </CardHeader>
            <CardContent>
              <SearchBar
                onSearch={handleSearch}
                placeholder={t('home.searchPlaceholder')}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
              <CardContent className="pt-6">
                <GraduationCap className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-3xl font-bold text-blue-900 mb-2">150+</h3>
                <p className="text-blue-700">{t('home.stats.institutions')}</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-3xl font-bold text-purple-900 mb-2">50,000+</h3>
                <p className="text-purple-700">{t('home.stats.students')}</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-gradient-to-br from-teal-50 to-teal-100 border-0 shadow-lg">
              <CardContent className="pt-6">
                <Award className="h-12 w-12 mx-auto mb-4 text-teal-600" />
                <h3 className="text-3xl font-bold text-teal-900 mb-2">200+</h3>
                <p className="text-teal-700">{t('home.stats.programs')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recommended Institutions */}
      <section className="px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('home.recommendedInstitutions')}</h2>
            <p className="text-muted-foreground text-lg">
              {t('home.recommendedDescription')}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {institutions.map((institution) => (
                <InstitutionCard key={institution?.id} institution={institution} />
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link to="/institutions">
              <Button size="lg" variant="outline" className="border-2">
                {t('home.viewAllInstitutions')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Jobs */}
      <section className="px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
              <TrendingUp className="mr-2 h-8 w-8 text-orange-600" />
              {t('home.popularCareerPaths')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('home.popularDescription')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularJobs.map((job, index) => (
              <Link key={index} to={`/job-requirements?search=${encodeURIComponent(job)}`}>
                <Card className="hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <p className="font-medium text-sm">{job}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('home.faq')}</h2>
            <p className="text-muted-foreground text-lg">
              {t('home.faqDescription')}
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}