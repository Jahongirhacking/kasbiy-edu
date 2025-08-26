import { getVacancies, Vacancy } from "@/api/vacancies"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/useToast"
import { Briefcase, Clock, DollarSign, MapPin, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export function VacanciesPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [filteredVacancies, setFilteredVacancies] = useState<Vacancy[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const { toast } = useToast()
  const { t } = useTranslation()

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        console.log('Fetching vacancies')
        const response = await getVacancies(undefined, t) as { vacancies: Vacancy[] }
        setVacancies(response.vacancies)
        setFilteredVacancies(response.vacancies)
      } catch (error) {
        console.error('Error fetching vacancies:', error)
        toast({
          title: "Error",
          description: "Failed to load vacancies. Please try again.",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchVacancies()
  }, [toast, t])

  useEffect(() => {
    let filtered = [...vacancies]

    if (searchQuery) {
      filtered = filtered.filter(vacancy =>
        vacancy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vacancy.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vacancy.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (typeFilter) {
      filtered = filtered.filter(vacancy => vacancy.type === typeFilter)
    }

    if (locationFilter) {
      filtered = filtered.filter(vacancy => vacancy.location === locationFilter)
    }

    setFilteredVacancies(filtered)
  }, [vacancies, searchQuery, typeFilter, locationFilter])

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-green-100 text-green-800'
      case 'part-time': return 'bg-blue-100 text-blue-800'
      case 'contract': return 'bg-purple-100 text-purple-800'
      case 'internship': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatSalary = (salary: { min: number; max: number; currency: string }) => {
    return `${(salary.min / 1000000).toFixed(1)}M - ${(salary.max / 1000000).toFixed(1)}M ${salary.currency}`
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold flex items-center justify-center">
          <Briefcase className="mr-3 h-8 w-8 text-blue-600" />
          Job Vacancies
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Find current job openings and career opportunities from educational institutions and partner companies
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search vacancies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">All Types</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-locations">All Locations</SelectItem>
                <SelectItem value="Tashkent">Tashkent</SelectItem>
                <SelectItem value="Samarkand">Samarkand</SelectItem>
                <SelectItem value="Bukhara">Bukhara</SelectItem>
                <SelectItem value="Andijan">Andijan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {filteredVacancies.length} Vacancies Available
          </h2>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredVacancies.length > 0 ? (
          <div className="space-y-4">
            {filteredVacancies.map((vacancy) => (
              <Card key={vacancy._id} className="hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl text-blue-600">{vacancy.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-muted-foreground">
                        <span className="font-medium">{vacancy.company}</span>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {vacancy.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Posted {new Date(vacancy.postedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge className={getTypeColor(vacancy.type)}>
                        {vacancy.type.replace('-', ' ')}
                      </Badge>
                      {vacancy.salary && (
                        <div className="flex items-center text-green-600 font-medium">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {formatSalary(vacancy.salary)}
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {vacancy.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Required Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {vacancy.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Experience:</span> {vacancy.experience}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-muted-foreground">
                        Deadline: {new Date(vacancy.deadline).toLocaleDateString()}
                      </div>
                      <Button>
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No vacancies found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}