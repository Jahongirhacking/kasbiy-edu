import { IInstitution } from "@/api/institutions/type"
import { Flex } from "antd"
import { ExternalLink, MapPin, Users } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"

export function InstitutionCard({ institution }: { institution: IInstitution }) {
  const { t } = useTranslation()

  return (
    <Card className="group transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-md">
      <Flex vertical gap={12} justify="space-between" style={{ height: '100%' }}>
        <Flex vertical gap={6}>
          <CardHeader className="pb-3">
            {/* {institution && (
          <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
            <img
              src={institution.image}
              alt={institution.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )} */}
            <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {institution?.nameUz}
            </CardTitle>
            <Badge variant="secondary" className="w-fit">
              {institution?.type ?? "Noma'lum"}
            </Badge>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2 text-blue-500" />
              {institution?.district}, {institution?.neighborhood}
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-2 text-green-500" />
              {t('common.capacity')}: {institution?.power ? (`${institution?.power} ${t('institutions.students')}`) : "Noma'lum"}
            </div>
          </CardContent>
        </Flex>

        <CardFooter>
          <Link to={`/institutions/${institution?.id}`} className="w-full">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              {t('common.viewProfile')}
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </CardFooter>
      </Flex>
    </Card>
  )
}