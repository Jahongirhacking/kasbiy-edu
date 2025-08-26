import { IInstitution } from "@/api/institutions/type"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MapPin, Phone, Users } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import ProfileSkeleton from "./components/ProfileSkeleton"

export function InstitutionProfilePage() {
  const [institution] = useState<IInstitution>();

  if (!institution) {
    return (
      <ProfileSkeleton />
    )
  }

  if (!institution) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Institution not found</h1>
        <Link to="/institutions">
          <Button>Back to Institutions</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Back Button */}
      <Link to="/institutions">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Institutions
        </Button>
      </Link>

      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">{institution?.nameUz}</CardTitle>
                  <Badge variant="secondary" className="mb-4">{institution.type}</Badge>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {institution?.address}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {institution?.phoneNumber}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            {/* {institution.image && (
              <CardContent>
                <img
                  src={institution.image}
                  alt={institution.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </CardContent>
            )} */}
          </Card>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h3 className="text-2xl font-bold text-blue-900">{institution?.power}</h3>
              <p className="text-blue-700">Total Capacity</p>
            </CardContent>
          </Card>

          {/* <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="text-2xl font-bold text-green-900">{institution?.statistics.employmentRate}%</h3>
              <p className="text-green-700">Employment Rate</p>
            </CardContent>
          </Card> */}

          {/* <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0">
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <h3 className="text-2xl font-bold text-purple-900">{institution.statistics.graduateCount.toLocaleString()}</h3>
              <p className="text-purple-700">Graduates</p>
            </CardContent>
          </Card> */}
        </div>
      </div>

      {/* Detailed Information */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="general">Sahifa 1</TabsTrigger>
          <TabsTrigger value="programs">Sahifa 2</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>General Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                Sahifa 1
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Available Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                Sahifa 2
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}