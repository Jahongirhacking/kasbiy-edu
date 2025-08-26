import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Building, Calendar, Mail, MapPin, Phone, Users } from "lucide-react"

export function CentersPage() {
  const assessmentCenters = [
    {
      id: 1,
      name: "Tashkent Assessment Center for IT Qualifications",
      location: {
        region: "Tashkent",
        address: "IT Park, Amir Temur avenue 108"
      },
      qualifications: ["Software Development", "Network Administration", "Database Management", "Cybersecurity"],
      contact: {
        phone: "+998 71 300 0101",
        email: "tashkent.it@assessment.uz"
      },
      procedures: [
        "Online application submission",
        "Document verification",
        "Practical skills assessment",
        "Oral examination",
        "Certificate issuance"
      ],
      capacity: 200,
      operatingHours: "Monday-Friday: 9:00-18:00",
      bookingInfo: "Online booking available 24/7"
    },
    {
      id: 2,
      name: "Samarkand Tourism Assessment Center",
      location: {
        region: "Samarkand",
        address: "Registan square, Tourism complex"
      },
      qualifications: ["Tour Guide", "Hotel Management", "Restaurant Service", "Travel Agency Operations"],
      contact: {
        phone: "+998 66 301 0202",
        email: "samarkand.tourism@assessment.uz"
      },
      procedures: [
        "Application and fee payment",
        "Language proficiency test",
        "Cultural knowledge assessment",
        "Practical demonstration",
        "Certification ceremony"
      ],
      capacity: 150,
      operatingHours: "Monday-Saturday: 8:00-17:00",
      bookingInfo: "Advance booking required (2 weeks)"
    },
    {
      id: 3,
      name: "Bukhara Craft Skills Assessment Center",
      location: {
        region: "Bukhara",
        address: "Historic center, Artisan quarter"
      },
      qualifications: ["Traditional Crafts", "Textile Production", "Metalworking", "Woodworking"],
      contact: {
        phone: "+998 65 302 0303",
        email: "bukhara.crafts@assessment.uz"
      },
      procedures: [
        "Portfolio submission",
        "Skills demonstration",
        "Quality assessment",
        "Master craftsman evaluation",
        "Certificate award"
      ],
      capacity: 100,
      operatingHours: "Monday-Friday: 9:00-16:00",
      bookingInfo: "Seasonal scheduling available"
    },
    {
      id: 4,
      name: "Andijan Engineering Assessment Center",
      location: {
        region: "Andijan",
        address: "Industrial zone, Technical college campus"
      },
      qualifications: ["Mechanical Engineering", "Electrical Engineering", "Civil Engineering", "Automotive Technology"],
      contact: {
        phone: "+998 74 303 0404",
        email: "andijan.engineering@assessment.uz"
      },
      procedures: [
        "Technical documentation review",
        "Theoretical examination",
        "Practical project assessment",
        "Safety compliance check",
        "Professional certification"
      ],
      capacity: 180,
      operatingHours: "Monday-Friday: 8:30-17:30",
      bookingInfo: "Monthly assessment cycles"
    },
    {
      id: 5,
      name: "Fergana Agricultural Assessment Center",
      location: {
        region: "Fergana",
        address: "Agricultural institute, Research campus"
      },
      qualifications: ["Agricultural Technology", "Food Processing", "Veterinary Services", "Agricultural Management"],
      contact: {
        phone: "+998 73 304 0505",
        email: "fergana.agriculture@assessment.uz"
      },
      procedures: [
        "Field experience verification",
        "Technical knowledge test",
        "Practical skills evaluation",
        "Equipment operation assessment",
        "Certification issuance"
      ],
      capacity: 120,
      operatingHours: "Monday-Friday: 8:00-17:00",
      bookingInfo: "Seasonal assessments (Spring/Fall)"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold flex items-center justify-center">
          <Building className="mr-3 h-8 w-8 text-blue-600" />
          Assessment Centers
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Find qualification assessment centers across Uzbekistan for professional certification and skills validation
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
          <CardContent className="pt-6">
            <Building className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h3 className="text-3xl font-bold text-blue-900 mb-2">{assessmentCenters.length}</h3>
            <p className="text-blue-700">Assessment Centers</p>
          </CardContent>
        </Card>
        <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
          <CardContent className="pt-6">
            <Award className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <h3 className="text-3xl font-bold text-green-900 mb-2">25+</h3>
            <p className="text-green-700">Qualification Types</p>
          </CardContent>
        </Card>
        <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
          <CardContent className="pt-6">
            <Users className="h-12 w-12 mx-auto mb-4 text-purple-600" />
            <h3 className="text-3xl font-bold text-purple-900 mb-2">750</h3>
            <p className="text-purple-700">Monthly Capacity</p>
          </CardContent>
        </Card>
      </div>

      {/* Centers List */}
      <div className="grid grid-cols-1 gap-8">
        {assessmentCenters.map((center) => (
          <Card key={center.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl text-blue-600 mb-2">{center.name}</CardTitle>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {center.location.address}, {center.location.region}
                  </div>
                </div>
                <Badge variant="secondary">
                  <Users className="h-4 w-4 mr-1" />
                  {center.capacity} capacity
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Award className="h-4 w-4 mr-2 text-yellow-600" />
                      Available Qualifications
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {center.qualifications.map((qualification, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {qualification}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-green-600" />
                        <span className="text-muted-foreground">{center.contact.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-purple-600" />
                        <span className="text-muted-foreground">{center.contact.email}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                      Operating Hours
                    </h4>
                    <p className="text-sm text-muted-foreground">{center.operatingHours}</p>
                    <p className="text-sm text-muted-foreground mt-1">{center.bookingInfo}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Assessment Procedures</h4>
                  <ol className="space-y-2">
                    {center.procedures.map((procedure, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </span>
                        {procedure}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="border-t pt-4 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Region:</span> {center.location.region}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Get Directions
                  </Button>
                  <Button size="sm">
                    Book Assessment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}