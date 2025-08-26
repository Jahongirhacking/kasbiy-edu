import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Award, Building, Calendar, Search } from "lucide-react"
import { useState } from "react"

export function CertificatesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [industryFilter, setIndustryFilter] = useState('')
  const [levelFilter, setLevelFilter] = useState('')

  const certificates = [
    {
      id: 1,
      name: "Microsoft Certified: Azure Developer Associate",
      organization: "Microsoft Corporation",
      category: "Information Technology",
      level: "Professional",
      validityPeriod: "3 years",
      applicableOccupations: ["Software Developer", "Cloud Developer", "DevOps Engineer"],
      description: "Validates skills in developing cloud applications and services on Microsoft Azure platform."
    },
    {
      id: 2,
      name: "Cisco Certified Network Associate (CCNA)",
      organization: "Cisco Systems",
      category: "Information Technology",
      level: "Associate",
      validityPeriod: "3 years",
      applicableOccupations: ["Network Administrator", "Network Engineer", "IT Support Specialist"],
      description: "Demonstrates knowledge of networking fundamentals, IP connectivity, and network security."
    },
    {
      id: 3,
      name: "AutoCAD Certified Professional",
      organization: "Autodesk",
      category: "Engineering",
      level: "Professional",
      validityPeriod: "2 years",
      applicableOccupations: ["CAD Designer", "Mechanical Engineer", "Architect"],
      description: "Certifies advanced skills in AutoCAD software for design and drafting."
    },
    {
      id: 4,
      name: "IATA Travel and Tourism Certificate",
      organization: "International Air Transport Association",
      category: "Tourism",
      level: "Foundation",
      validityPeriod: "Lifetime",
      applicableOccupations: ["Travel Agent", "Tourism Manager", "Tour Guide"],
      description: "Provides comprehensive knowledge of travel industry operations and regulations."
    },
    {
      id: 5,
      name: "Oracle Database Administrator Certified Professional",
      organization: "Oracle Corporation",
      category: "Information Technology",
      level: "Professional",
      validityPeriod: "Lifetime",
      applicableOccupations: ["Database Administrator", "Data Analyst", "System Administrator"],
      description: "Validates expertise in Oracle database administration and management."
    },
    {
      id: 6,
      name: "Project Management Professional (PMP)",
      organization: "Project Management Institute",
      category: "Management",
      level: "Professional",
      validityPeriod: "3 years",
      applicableOccupations: ["Project Manager", "Program Manager", "Team Lead"],
      description: "Demonstrates competency in leading and directing projects across industries."
    }
  ]

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = !searchQuery ||
      cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.applicableOccupations.some(occ => occ.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesIndustry = !industryFilter || cert.category === industryFilter
    const matchesLevel = !levelFilter || cert.level === levelFilter

    return matchesSearch && matchesIndustry && matchesLevel
  })

  const industries = [...new Set(certificates.map(c => c.category))]
  const levels = [...new Set(certificates.map(c => c.level))]

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Foundation': return 'bg-green-100 text-green-800'
      case 'Associate': return 'bg-blue-100 text-blue-800'
      case 'Professional': return 'bg-purple-100 text-purple-800'
      case 'Expert': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold flex items-center justify-center">
          <Award className="mr-3 h-8 w-8 text-yellow-600" />
          Professional Certificates
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore recognized international qualification certificates and professional certifications
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search certificates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-industries">All Industries</SelectItem>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-levels">All Levels</SelectItem>
                {levels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {filteredCertificates.length} Certificates Available
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCertificates.map((certificate) => (
            <Card key={certificate.id} className="hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg text-blue-600">{certificate.name}</CardTitle>
                    <div className="flex items-center text-muted-foreground">
                      <Building className="h-4 w-4 mr-2" />
                      {certificate.organization}
                    </div>
                  </div>
                  <Badge className={getLevelColor(certificate.level)}>
                    {certificate.level}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{certificate.description}</p>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2 text-orange-500" />
                  Valid for: {certificate.validityPeriod}
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-sm">Category:</h4>
                  <Badge variant="outline">{certificate.category}</Badge>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-sm">Applicable Occupations:</h4>
                  <div className="flex flex-wrap gap-1">
                    {certificate.applicableOccupations.map((occupation, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {occupation}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCertificates.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Award className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No certificates found</h3>
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