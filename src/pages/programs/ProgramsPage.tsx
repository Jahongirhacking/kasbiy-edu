import { getPrograms, Program } from "@/api/programs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/useToast"
import { Building, Clock, GraduationCap, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [specializationFilter, setSpecializationFilter] = useState('')
  const [nqfFilter, setNqfFilter] = useState('')
  const { toast } = useToast()
  const { t } = useTranslation()

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        console.log('Fetching programs')
        const response = await getPrograms(undefined, t) as { programs: Program[] }
        setPrograms(response.programs)
        setFilteredPrograms(response.programs)
      } catch (error) {
        console.error('Error fetching programs:', error)
        toast({
          title: "Error",
          description: "Failed to load programs. Please try again.",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPrograms()
  }, [toast, t])

  useEffect(() => {
    let filtered = [...programs]

    if (searchQuery) {
      filtered = filtered.filter(program =>
        program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.curriculum.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (specializationFilter) {
      filtered = filtered.filter(program => program.specialization === specializationFilter)
    }

    if (nqfFilter) {
      filtered = filtered.filter(program => program.nqfLevel.toString() === nqfFilter)
    }

    setFilteredPrograms(filtered)
  }, [programs, searchQuery, specializationFilter, nqfFilter])

  const specializations = [...new Set(programs.map(p => p.specialization))]

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold flex items-center justify-center">
          <GraduationCap className="mr-3 h-8 w-8 text-blue-600" />
          Educational Programs
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore comprehensive educational programs and curricula offered across Uzbekistan's vocational institutions
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-specializations">All Specializations</SelectItem>
                {specializations.map(spec => (
                  <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={nqfFilter} onValueChange={setNqfFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="NQF Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-levels">All Levels</SelectItem>
                <SelectItem value="4">Level 4</SelectItem>
                <SelectItem value="5">Level 5</SelectItem>
                <SelectItem value="6">Level 6</SelectItem>
                <SelectItem value="7">Level 7</SelectItem>
                <SelectItem value="8">Level 8</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {filteredPrograms.length} Programs Available
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
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
        ) : filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <Card key={program._id} className="hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-blue-600">{program.name}</CardTitle>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{program.specialization}</Badge>
                    <Badge variant="outline">NQF Level {program.nqfLevel}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2 text-green-500" />
                    Duration: {program.duration} years
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 text-sm">Core Subjects:</h4>
                    <div className="flex flex-wrap gap-1">
                      {program.curriculum.slice(0, 3).map((subject, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {program.curriculum.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{program.curriculum.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 text-sm flex items-center">
                      <Building className="h-4 w-4 mr-1 text-purple-500" />
                      Available at:
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {program.institutions.length} institution{program.institutions.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  {program.fees && (
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Contract Fee:</span>
                        <span className="font-medium">{(program.fees.contract / 1000000).toFixed(1)}M UZS</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Grant Places:</span>
                        <span className="font-medium text-green-600">{program.fees.grants}</span>
                      </div>
                    </div>
                  )}

                  <Button className="w-full" variant="outline">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <GraduationCap className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No programs found</h3>
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