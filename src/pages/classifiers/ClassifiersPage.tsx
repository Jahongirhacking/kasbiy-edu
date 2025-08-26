import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, BookOpen, Building, FileText, Search, Users } from "lucide-react"
import { useState } from "react"

export function ClassifiersPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const nqfLevels = [
    { level: 1, title: "Basic Skills", description: "Foundation level skills and knowledge" },
    { level: 2, title: "Elementary Skills", description: "Basic occupational skills" },
    { level: 3, title: "Intermediate Skills", description: "Skilled worker level" },
    { level: 4, title: "Advanced Skills", description: "Technician level qualifications" },
    { level: 5, title: "Higher Skills", description: "Higher technician and associate professional" },
    { level: 6, title: "Bachelor Level", description: "Bachelor's degree equivalent" },
    { level: 7, title: "Master Level", description: "Master's degree equivalent" },
    { level: 8, title: "Doctoral Level", description: "Doctoral degree equivalent" }
  ]

  const sqfFrameworks = [
    { id: 1, sector: "Information Technology", description: "IT and software development qualifications" },
    { id: 2, sector: "Manufacturing", description: "Industrial and manufacturing qualifications" },
    { id: 3, sector: "Tourism & Hospitality", description: "Tourism and hospitality service qualifications" },
    { id: 4, sector: "Healthcare", description: "Medical and healthcare qualifications" },
    { id: 5, sector: "Construction", description: "Building and construction qualifications" }
  ]

  const jobClassifications = [
    { code: "2511", title: "Systems Analysts", category: "Information Technology" },
    { code: "2512", title: "Software Developers", category: "Information Technology" },
    { code: "2521", title: "Database Designers", category: "Information Technology" },
    { code: "2141", title: "Industrial Engineers", category: "Engineering" },
    { code: "2142", title: "Civil Engineers", category: "Engineering" },
    { code: "3411", title: "Legal Professionals", category: "Legal Services" }
  ]

  const trainingDirections = [
    { code: "5140100", name: "Energy Engineering", field: "Engineering" },
    { code: "5140200", name: "Thermal Power Engineering", field: "Engineering" },
    { code: "5230100", name: "Economics", field: "Economics" },
    { code: "5230200", name: "Management", field: "Business" },
    { code: "5610100", name: "Information Systems", field: "Information Technology" }
  ]

  const occupationClassifications = [
    { code: "01", name: "Managers", description: "Chief executives, senior officials and legislators" },
    { code: "02", name: "Professionals", description: "Science and engineering professionals" },
    { code: "03", name: "Technicians", description: "Science and engineering associate professionals" },
    { code: "04", name: "Clerical Workers", description: "General and keyboard clerks" },
    { code: "05", name: "Service Workers", description: "Personal service workers" }
  ]

  const professionalStandards = [
    { id: 1, title: "Software Developer Standard", sector: "IT", status: "Active" },
    { id: 2, title: "Mechanical Engineer Standard", sector: "Engineering", status: "Active" },
    { id: 3, title: "Tourism Guide Standard", sector: "Tourism", status: "Draft" },
    { id: 4, title: "Accountant Standard", sector: "Finance", status: "Active" },
    { id: 5, title: "Teacher Standard", sector: "Education", status: "Under Review" }
  ]

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold flex items-center justify-center">
          <BookOpen className="mr-3 h-8 w-8 text-blue-600" />
          Classifiers
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore qualification frameworks, job classifications, and professional standards
        </p>
      </div>

      {/* Search */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search classifiers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="nqf" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="nqf">NQF</TabsTrigger>
          <TabsTrigger value="sqf">SQF</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="occupations">Occupations</TabsTrigger>
          <TabsTrigger value="standards">Standards</TabsTrigger>
        </TabsList>

        <TabsContent value="nqf" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-6 w-6 text-blue-600" />
                National Qualifications Framework (NQF)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {nqfLevels.map((level) => (
                  <Card key={level.level} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Level {level.level}</h3>
                        <Badge variant="outline">NQF {level.level}</Badge>
                      </div>
                      <h4 className="font-medium text-blue-600 mb-2">{level.title}</h4>
                      <p className="text-sm text-muted-foreground">{level.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sqf" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-6 w-6 text-purple-600" />
                Sectoral Qualification Frameworks (SQF)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sqfFrameworks.map((framework) => (
                  <Card key={framework.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-purple-600 mb-2">{framework.sector}</h3>
                          <p className="text-sm text-muted-foreground">{framework.description}</p>
                        </div>
                        <Badge variant="secondary">SQF</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-6 w-6 text-green-600" />
                Job Classifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobClassifications.map((job) => (
                    <TableRow key={job.code}>
                      <TableCell className="font-mono">{job.code}</TableCell>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{job.category}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-6 w-6 text-orange-600" />
                Training Directions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Direction Name</TableHead>
                    <TableHead>Field</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trainingDirections.map((direction) => (
                    <TableRow key={direction.code}>
                      <TableCell className="font-mono">{direction.code}</TableCell>
                      <TableCell className="font-medium">{direction.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{direction.field}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="occupations" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-6 w-6 text-teal-600" />
                Occupation Classifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {occupationClassifications.map((occupation) => (
                  <Card key={occupation.code} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline" className="font-mono">{occupation.code}</Badge>
                            <h3 className="font-semibold text-teal-600">{occupation.name}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{occupation.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="standards" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-6 w-6 text-red-600" />
                Professional Standards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Sector</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {professionalStandards.map((standard) => (
                    <TableRow key={standard.id}>
                      <TableCell className="font-medium">{standard.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{standard.sector}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={standard.status === 'Active' ? 'default' :
                            standard.status === 'Draft' ? 'secondary' : 'outline'}
                        >
                          {standard.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <button className="text-blue-600 hover:underline text-sm">
                          View Details
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}