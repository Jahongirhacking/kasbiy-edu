import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Building, MapPin, School, TrendingUp, Users } from "lucide-react"
import { useState } from "react"

export function SchoolsPage() {
  const [regionFilter, setRegionFilter] = useState('')
  const [districtFilter, setDistrictFilter] = useState('')

  const schools = [
    {
      id: 1,
      name: "Tashkent Vocational School #15",
      region: "Tashkent",
      district: "Yunusabad",
      address: "Amir Temur avenue 45",
      programs: ["Computer Programming", "Web Development", "Digital Marketing"],
      partnerships: ["EPAM Uzbekistan", "IT Park", "Aloqa Bank"],
      equipment: ["Computer Lab (40 stations)", "Network Lab", "Multimedia Studio"],
      students: 450,
      capacity: 500,
      careerGuidance: {
        surveyResults: {
          interestedInIT: 75,
          interestedInBusiness: 45,
          interestedInArts: 30
        }
      }
    },
    {
      id: 2,
      name: "Samarkand Technical School #8",
      region: "Samarkand",
      district: "Central",
      address: "Registan street 12",
      programs: ["Tourism Management", "Hotel Service", "Restaurant Operations"],
      partnerships: ["Bakhtiyor Hotel", "Samarkand Tourism Board", "Orient Star Hotel"],
      equipment: ["Training Restaurant", "Hotel Room Simulator", "Language Lab"],
      students: 320,
      capacity: 400,
      careerGuidance: {
        surveyResults: {
          interestedInTourism: 80,
          interestedInHospitality: 65,
          interestedInLanguages: 55
        }
      }
    },
    {
      id: 3,
      name: "Bukhara Craft School #3",
      region: "Bukhara",
      district: "Historic Center",
      address: "Artisan quarter, Craft street 7",
      programs: ["Traditional Crafts", "Textile Design", "Metalworking"],
      partnerships: ["Bukhara Craft Association", "Export Development Agency", "UNESCO"],
      equipment: ["Traditional Looms", "Metalworking Shop", "Design Studio"],
      students: 180,
      capacity: 200,
      careerGuidance: {
        surveyResults: {
          interestedInCrafts: 90,
          interestedInDesign: 70,
          interestedInBusiness: 40
        }
      }
    },
    {
      id: 4,
      name: "Andijan Agricultural School #12",
      region: "Andijan",
      district: "Agricultural Zone",
      address: "Farming district, Green valley 25",
      programs: ["Agricultural Technology", "Food Processing", "Farm Management"],
      partnerships: ["Andijan Cotton Association", "Food Processing Plant", "Agricultural Bank"],
      equipment: ["Greenhouse Complex", "Food Lab", "Farm Equipment"],
      students: 280,
      capacity: 350,
      careerGuidance: {
        surveyResults: {
          interestedInAgriculture: 85,
          interestedInTechnology: 60,
          interestedInBusiness: 50
        }
      }
    },
    {
      id: 5,
      name: "Fergana Engineering School #6",
      region: "Fergana",
      district: "Industrial",
      address: "Factory district, Engineering street 18",
      programs: ["Mechanical Engineering", "Electrical Systems", "Industrial Automation"],
      partnerships: ["Fergana Oil Refinery", "UzAuto Motors", "Electrical Company"],
      equipment: ["Engineering Workshop", "Automation Lab", "CAD Center"],
      students: 380,
      capacity: 450,
      careerGuidance: {
        surveyResults: {
          interestedInEngineering: 88,
          interestedInTechnology: 75,
          interestedInManufacturing: 60
        }
      }
    }
  ]

  const regions = [...new Set(schools.map(s => s.region))]
  const districts = regionFilter ? [...new Set(schools.filter(s => s.region === regionFilter).map(s => s.district))] : []

  const filteredSchools = schools.filter(school => {
    const matchesRegion = !regionFilter || regionFilter === 'all-regions' || school.region === regionFilter
    const matchesDistrict = !districtFilter || districtFilter === 'all-districts' || school.district === districtFilter
    return matchesRegion && matchesDistrict
  })

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold flex items-center justify-center">
          <School className="mr-3 h-8 w-8 text-blue-600" />
          VET Schools
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          General education schools offering vocational training programs across Uzbekistan
        </p>
      </div>

      {/* Filters */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-regions">All regions</SelectItem>
                {regions.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={districtFilter} onValueChange={setDistrictFilter} disabled={!regionFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-districts">All districts</SelectItem>
                {districts.map(district => (
                  <SelectItem key={district} value={district}>{district}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
          <CardContent className="pt-6">
            <School className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h3 className="text-3xl font-bold text-blue-900 mb-2">{filteredSchools.length}</h3>
            <p className="text-blue-700">VET Schools</p>
          </CardContent>
        </Card>
        <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
          <CardContent className="pt-6">
            <Users className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <h3 className="text-3xl font-bold text-green-900 mb-2">
              {filteredSchools.reduce((sum, school) => sum + school.students, 0).toLocaleString()}
            </h3>
            <p className="text-green-700">Students</p>
          </CardContent>
        </Card>
        <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
          <CardContent className="pt-6">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-purple-600" />
            <h3 className="text-3xl font-bold text-purple-900 mb-2">
              {filteredSchools.reduce((sum, school) => sum + school.programs.length, 0)}
            </h3>
            <p className="text-purple-700">Programs</p>
          </CardContent>
        </Card>
        <Card className="text-center bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-lg">
          <CardContent className="pt-6">
            <Building className="h-12 w-12 mx-auto mb-4 text-orange-600" />
            <h3 className="text-3xl font-bold text-orange-900 mb-2">
              {filteredSchools.reduce((sum, school) => sum + school.partnerships.length, 0)}
            </h3>
            <p className="text-orange-700">Partnerships</p>
          </CardContent>
        </Card>
      </div>

      {/* Schools List */}
      <div className="grid grid-cols-1 gap-8">
        {filteredSchools.map((school) => (
          <Card key={school.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl text-blue-600 mb-2">{school.name}</CardTitle>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    {school.address}, {school.district}, {school.region}
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary">
                      <Users className="h-4 w-4 mr-1" />
                      {school.students}/{school.capacity} students
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      Capacity: {Math.round((school.students / school.capacity) * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-purple-600" />
                      Vocational Programs
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {school.programs.map((program, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Building className="h-4 w-4 mr-2 text-orange-600" />
                      Business Partnerships
                    </h4>
                    <div className="space-y-1">
                      {school.partnerships.map((partnership, index) => (
                        <div key={index} className="text-sm text-muted-foreground flex items-center">
                          <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                          {partnership}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3">Equipment & Facilities</h4>
                    <div className="space-y-1">
                      {school.equipment.map((item, index) => (
                        <div key={index} className="text-sm text-muted-foreground flex items-center">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                      Career Guidance Survey Results
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(school.careerGuidance.surveyResults).map(([interest, percentage]) => (
                        <div key={interest}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="capitalize">
                              {interest.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </span>
                            <span>{percentage}%</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Enrollment:</span> {school.students} students ({Math.round((school.students / school.capacity) * 100)}% capacity)
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:underline text-sm">
                      View Programs
                    </button>
                    <button className="text-blue-600 hover:underline text-sm">
                      Contact School
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSchools.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <School className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No schools found</h3>
            <p className="text-muted-foreground">
              Try adjusting your region or district filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}