import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, FileText, Mail, MapPin, Phone, Users } from "lucide-react"

export function CouncilsPage() {
  const republicCouncils = [
    {
      id: 1,
      name: "Republic Council for Professional Qualifications",
      type: "Republic",
      responsibilities: ["National qualification standards", "Quality assurance", "International cooperation"],
      activities: ["Developed 50+ professional standards", "Conducted 12 sector reviews", "Established international partnerships"],
      contact: {
        address: "Tashkent, Yunusabad district, Amir Temur avenue 108",
        phone: "+998 71 202 0101",
        email: "info@qualifications.uz"
      },
      meetingSchedule: "Monthly, first Tuesday"
    }
  ]

  const sectoralCouncils = [
    {
      id: 1,
      name: "IT Sector Qualification Council",
      sector: "Information Technology",
      responsibilities: ["IT qualification standards", "Skills assessment", "Industry liaison"],
      activities: ["Updated software development standards", "Launched coding bootcamp certification", "Partnership with tech companies"],
      contact: {
        address: "Tashkent, IT Park",
        phone: "+998 71 203 0202",
        email: "it@qualifications.uz"
      },
      meetingSchedule: "Bi-monthly"
    },
    {
      id: 2,
      name: "Engineering Sector Council",
      sector: "Engineering",
      responsibilities: ["Engineering standards", "Professional certification", "Academic partnerships"],
      activities: ["Revised mechanical engineering standards", "Established assessment centers", "International accreditation"],
      contact: {
        address: "Tashkent, Chilanzar district",
        phone: "+998 71 204 0303",
        email: "engineering@qualifications.uz"
      },
      meetingSchedule: "Quarterly"
    },
    {
      id: 3,
      name: "Tourism & Hospitality Council",
      sector: "Tourism",
      responsibilities: ["Tourism qualification standards", "Service quality assessment", "Training coordination"],
      activities: ["Developed tourism guide standards", "Launched hospitality certification", "Regional training programs"],
      contact: {
        address: "Samarkand, Central district",
        phone: "+998 66 205 0404",
        email: "tourism@qualifications.uz"
      },
      meetingSchedule: "Bi-monthly"
    }
  ]

  const regionalCouncils = [
    {
      id: 1,
      name: "Tashkent Regional Qualification Council",
      region: "Tashkent",
      responsibilities: ["Regional implementation", "Local partnerships", "Skills gap analysis"],
      activities: ["Conducted regional skills survey", "Established 5 assessment centers", "Trained 200+ assessors"],
      contact: {
        address: "Tashkent city, Shaykhantakhur district",
        phone: "+998 71 206 0505",
        email: "tashkent@qualifications.uz"
      },
      meetingSchedule: "Monthly"
    },
    {
      id: 2,
      name: "Samarkand Regional Council",
      region: "Samarkand",
      responsibilities: ["Regional coordination", "Tourism focus", "Heritage skills"],
      activities: ["Tourism skills development", "Cultural heritage training", "Artisan certification programs"],
      contact: {
        address: "Samarkand, Registan square area",
        phone: "+998 66 207 0606",
        email: "samarkand@qualifications.uz"
      },
      meetingSchedule: "Monthly"
    },
    {
      id: 3,
      name: "Bukhara Regional Council",
      region: "Bukhara",
      responsibilities: ["Craft skills preservation", "Regional development", "SME support"],
      activities: ["Traditional craft standards", "Small business training", "Export quality certification"],
      contact: {
        address: "Bukhara, Historic center",
        phone: "+998 65 208 0707",
        email: "bukhara@qualifications.uz"
      },
      meetingSchedule: "Bi-monthly"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold flex items-center justify-center">
          <Users className="mr-3 h-8 w-8 text-blue-600" />
          Qualification Councils
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore the structure and activities of qualification councils at republic, sectoral, and regional levels
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="republic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="republic">Republic Councils</TabsTrigger>
          <TabsTrigger value="sectoral">Sectoral Councils</TabsTrigger>
          <TabsTrigger value="regional">Regional Councils</TabsTrigger>
        </TabsList>

        <TabsContent value="republic" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {republicCouncils.map((council) => (
              <Card key={council.id} className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-blue-600">{council.name}</CardTitle>
                      <Badge variant="default" className="mt-2">{council.type} Level</Badge>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {council.meetingSchedule}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-purple-600" />
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {council.responsibilities.map((responsibility, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Users className="h-4 w-4 mr-2 text-green-600" />
                        Recent Activities
                      </h4>
                      <ul className="space-y-2">
                        {council.activities.map((activity, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Contact Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 text-blue-600 mt-0.5" />
                        <span className="text-muted-foreground">{council.contact.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-green-600" />
                        <span className="text-muted-foreground">{council.contact.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-purple-600" />
                        <span className="text-muted-foreground">{council.contact.email}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sectoral" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {sectoralCouncils.map((council) => (
              <Card key={council.id} className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-purple-600">{council.name}</CardTitle>
                      <Badge variant="secondary" className="mt-2">{council.sector}</Badge>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {council.meetingSchedule}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-purple-600" />
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {council.responsibilities.map((responsibility, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Users className="h-4 w-4 mr-2 text-green-600" />
                        Recent Activities
                      </h4>
                      <ul className="space-y-2">
                        {council.activities.map((activity, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Contact Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 text-blue-600 mt-0.5" />
                        <span className="text-muted-foreground">{council.contact.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-green-600" />
                        <span className="text-muted-foreground">{council.contact.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-purple-600" />
                        <span className="text-muted-foreground">{council.contact.email}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="regional" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {regionalCouncils.map((council) => (
              <Card key={council.id} className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-teal-600">{council.name}</CardTitle>
                      <Badge variant="outline" className="mt-2">{council.region} Region</Badge>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {council.meetingSchedule}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-purple-600" />
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {council.responsibilities.map((responsibility, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Users className="h-4 w-4 mr-2 text-green-600" />
                        Recent Activities
                      </h4>
                      <ul className="space-y-2">
                        {council.activities.map((activity, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Contact Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 text-blue-600 mt-0.5" />
                        <span className="text-muted-foreground">{council.contact.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-green-600" />
                        <span className="text-muted-foreground">{council.contact.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-purple-600" />
                        <span className="text-muted-foreground">{council.contact.email}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}