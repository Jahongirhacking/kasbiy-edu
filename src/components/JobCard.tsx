import { AlertTriangle, Award, Briefcase, Clock, DollarSign, Eye } from "lucide-react"
import { useState } from "react"
import { JobRequirement } from "../api/jobs"
import { JobDetailModal } from "./JobDetailModal"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface JobCardProps {
  job: JobRequirement
}

export function JobCard({ job }: JobCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
            {job.title}
          </CardTitle>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="w-fit">
              NQF Level {job.nqfLevel}
            </Badge>
            {job.salaryRange && (
              <div className="flex items-center text-green-600 text-sm font-medium">
                <DollarSign className="h-4 w-4 mr-1" />
                {(job.salaryRange.min / 1000000).toFixed(1)}M - {(job.salaryRange.max / 1000000).toFixed(1)}M {job.salaryRange.currency}
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {job.description}
          </p>

          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2 text-green-500" />
            {job.experienceYears} years experience required
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Required Skills:</h4>
            <div className="flex flex-wrap gap-1">
              {job.requiredSkills.slice(0, 4).map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {job.requiredSkills.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{job.requiredSkills.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          {job.certificates.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center">
                <Award className="h-4 w-4 mr-1 text-yellow-500" />
                Required Certificates:
              </h4>
              <div className="flex flex-wrap gap-1">
                {job.certificates.slice(0, 2).map((cert, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {cert}
                  </Badge>
                ))}
                {job.certificates.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{job.certificates.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {job.healthRestrictions && job.healthRestrictions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center text-orange-600">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Health Requirements:
              </h4>
              <div className="text-xs text-muted-foreground">
                {job.healthRestrictions.slice(0, 1).map((restriction, index) => (
                  <div key={index} className="flex items-start">
                    <span className="w-1 h-1 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {restriction}
                  </div>
                ))}
                {job.healthRestrictions.length > 1 && (
                  <div className="text-orange-600 font-medium">
                    +{job.healthRestrictions.length - 1} more requirements
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="border-t pt-3">
            <Button
              onClick={() => setShowDetails(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Detailed Requirements
            </Button>
          </div>
        </CardContent>
      </Card>

      <JobDetailModal
        job={job}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  )
}