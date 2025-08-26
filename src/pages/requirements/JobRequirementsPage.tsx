import { getJobRequirements, JobRequirement } from "@/api/jobs"
import { JobCard } from "@/components/JobCard"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/useToast"
import { Award, Briefcase, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"

export function JobRequirementsPage() {
  const [searchParams] = useSearchParams()
  const [jobs, setJobs] = useState<JobRequirement[]>([])
  const [filteredJobs, setFilteredJobs] = useState<JobRequirement[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [nqfFilter, setNqfFilter] = useState('all-levels')
  const [sortBy, setSortBy] = useState('title')
  const { toast } = useToast()
  const { t } = useTranslation()

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        console.log('Fetching job requirements')
        const response = await getJobRequirements(undefined, t) as { jobs: JobRequirement[] }
        setJobs(response.jobs)
        setFilteredJobs(response.jobs)
      } catch (error) {
        console.error('Error fetching job requirements:', error)
        toast({
          title: "Error",
          description: "Failed to load job requirements. Please try again.",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [toast, t])

  useEffect(() => {
    let filtered = [...jobs]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.requiredSkills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Apply NQF level filter
    if (nqfFilter && nqfFilter !== 'all-levels') {
      filtered = filtered.filter(job => job.nqfLevel.toString() === nqfFilter)
    }

    // Apply sorting
    switch (sortBy) {
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'nqfLevel':
        filtered.sort((a, b) => b.nqfLevel - a.nqfLevel)
        break
      case 'experience':
        filtered.sort((a, b) => b.experienceYears - a.experienceYears)
        break
    }

    setFilteredJobs(filtered)
  }, [jobs, searchQuery, nqfFilter, sortBy])

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold flex items-center justify-center">
          <Briefcase className="mr-3 h-8 w-8 text-blue-600" />
          Job Requirements
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore occupation requirements, qualifications, and career pathways in Uzbekistan's vocational education system
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search job requirements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
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
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Sort by Title</SelectItem>
                <SelectItem value="nqfLevel">Sort by NQF Level</SelectItem>
                <SelectItem value="experience">Sort by Experience</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {filteredJobs.length} Job Requirements Found
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
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No job requirements found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Popular Skills Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-6 w-6 text-purple-600" />
            Most In-Demand Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              'Programming', 'Project Management', 'Quality Control', 'CAD Software',
              'Customer Service', 'Foreign Languages', 'Technical Documentation',
              'Problem Solving', 'Team Collaboration', 'Database Management'
            ].map((skill, index) => (
              <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-purple-100">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}