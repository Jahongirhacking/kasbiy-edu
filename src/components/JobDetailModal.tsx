import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "./ui/dialog"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Clock, 
  DollarSign, 
  AlertTriangle,
  Building,
  TrendingUp,
  Users,
  MapPin
} from "lucide-react"
import { JobRequirement } from "../api/jobs"
import { ScrollArea } from "./ui/scroll-area"

interface JobDetailModalProps {
  job: JobRequirement
  isOpen: boolean
  onClose: () => void
}

export function JobDetailModal({ job, isOpen, onClose }: JobDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600 flex items-center">
            <Briefcase className="h-6 w-6 mr-2" />
            {job.title}
          </DialogTitle>
          <DialogDescription className="text-base">
            {job.description}
          </DialogDescription>
          <div className="flex items-center space-x-4 mt-4">
            <Badge variant="secondary" className="text-sm">
              NQF Level {job.nqfLevel}
            </Badge>
            <div className="flex items-center text-green-600 font-medium">
              <Clock className="h-4 w-4 mr-1" />
              {job.experienceYears} years experience
            </div>
            {job.salaryRange && (
              <div className="flex items-center text-green-600 font-medium">
                <DollarSign className="h-4 w-4 mr-1" />
                {(job.salaryRange.min / 1000000).toFixed(1)}M - {(job.salaryRange.max / 1000000).toFixed(1)}M {job.salaryRange.currency}
              </div>
            )}
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <Tabs defaultValue="requirements" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="conditions">Conditions</TabsTrigger>
              <TabsTrigger value="career">Career Path</TabsTrigger>
              <TabsTrigger value="institutions">Institutions</TabsTrigger>
            </TabsList>

            <TabsContent value="requirements" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-blue-50/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center text-blue-700">
                      <GraduationCap className="h-5 w-5 mr-2" />
                      Educational Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {job.detailedRequirements.education.map((req, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center text-purple-700">
                      <Briefcase className="h-5 w-5 mr-2" />
                      Technical Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {job.detailedRequirements.technical.map((req, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-green-50/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center text-green-700">
                      <Users className="h-5 w-5 mr-2" />
                      Soft Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {job.detailedRequirements.soft.map((req, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center text-orange-700">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Physical Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {job.detailedRequirements.physical.map((req, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="certificates" className="space-y-6 mt-6">
              <Card className="bg-yellow-50/50">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center text-yellow-700">
                    <Award className="h-6 w-6 mr-2" />
                    Required Certificates & Qualifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3 text-yellow-800">Professional Certificates:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {job.certificates.map((cert, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg border border-yellow-200">
                          <div className="flex items-center">
                            <Award className="h-4 w-4 mr-2 text-yellow-600" />
                            <span className="font-medium">{cert}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Required for professional practice
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-yellow-800">Professional Standards:</h4>
                    <div className="bg-white p-4 rounded-lg border border-yellow-200">
                      <p className="font-medium">{job.professionalStandards}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Must comply with industry professional standards and regulations
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conditions" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-blue-50/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center text-blue-700">
                      <Building className="h-5 w-5 mr-2" />
                      Working Conditions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {job.workingConditions.map((condition, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {condition}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {job.healthRestrictions && job.healthRestrictions.length > 0 && (
                  <Card className="bg-red-50/50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center text-red-700">
                        <AlertTriangle className="h-5 w-5 mr-2" />
                        Health Restrictions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {job.healthRestrictions.map((restriction, index) => (
                          <li key={index} className="text-sm flex items-start">
                            <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {restriction}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>

              {job.salaryRange && (
                <Card className="bg-green-50/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center text-green-700">
                      <DollarSign className="h-5 w-5 mr-2" />
                      Salary Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-700 mb-2">
                        {(job.salaryRange.min / 1000000).toFixed(1)}M - {(job.salaryRange.max / 1000000).toFixed(1)}M {job.salaryRange.currency}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Monthly salary range based on experience and qualifications
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="career" className="space-y-6 mt-6">
              <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center text-purple-700">
                    <TrendingUp className="h-6 w-6 mr-2" />
                    Career Progression Path
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {job.careerProgression.map((step, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-purple-200">
                        <div className="flex items-start">
                          <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-purple-800">{step}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="institutions" className="space-y-6 mt-6">
              <Card className="bg-blue-50/50">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center text-blue-700">
                    <Building className="h-6 w-6 mr-2" />
                    Related Educational Institutions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    The following institutions offer programs that prepare students for this career:
                  </p>
                  <div className="space-y-3">
                    {job.relatedInstitutions.map((institutionId, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-blue-800">
                              Institution #{institutionId}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Offers relevant programs for this career path
                            </p>
                          </div>
                          <MapPin className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}