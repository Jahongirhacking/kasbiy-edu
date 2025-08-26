import { IInstitution } from "@/api/institutions/type"
import { LeafletMap } from "@/components/LeafletMap"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, Filter, MapPin, Search } from "lucide-react"
import { useEffect, useState } from "react"

export function MapPage() {
  const [institutions] = useState<IInstitution[]>([])
  const [filteredInstitutions, setFilteredInstitutions] = useState<IInstitution[]>([])
  const [loading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [regionFilter, setRegionFilter] = useState('all-regions')
  const [selectedInstitution, setSelectedInstitution] = useState<IInstitution | null>(null)

  const regions = [
    "Tashkent", "Samarkand", "Bukhara", "Andijan", "Fergana", "Namangan",
    "Kashkadarya", "Surkhandarya", "Khorezm", "Navoi", "Jizzakh", "Syrdarya", "Karakalpakstan"
  ]

  useEffect(() => {
    const filtered = [...institutions]

    // if (searchQuery) {
    //   filtered = filtered.filter(inst =>
    //     inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     inst.location.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     inst.programs.some(program => program.toLowerCase().includes(searchQuery.toLowerCase()))
    //   )
    // }

    // if (regionFilter && regionFilter !== '') {
    //   filtered = filtered.filter(inst => inst.location.region === regionFilter)
    // }

    setFilteredInstitutions(filtered)
  }, [institutions, searchQuery, regionFilter])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 flex items-center">
          <MapPin className="mr-3 h-8 w-8 text-blue-600" />
          Interactive Map
        </h1>
        <p className="text-muted-foreground">
          Explore educational institutions across Uzbekistan on our interactive map
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Container */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] bg-white/80 backdrop-blur-sm">
            <CardContent className="p-0 h-full">
              {loading ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 rounded-lg">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 mx-auto mb-4 text-blue-600 animate-pulse" />
                    <h3 className="text-xl font-semibold mb-2">Loading Map...</h3>
                    <p className="text-muted-foreground">Please wait while we load the institutions</p>
                  </div>
                </div>
              ) : (
                <LeafletMap
                  institutions={filteredInstitutions}
                  onInstitutionSelect={setSelectedInstitution}
                  selectedInstitution={selectedInstitution}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Filters */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="mr-2 h-5 w-5" />
                Filter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search institutions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-regions">All regions</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchQuery('')
                  setRegionFilter('')
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>

          {/* Institution List */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  Institutions
                </span>
                <Badge variant="secondary">{filteredInstitutions.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto space-y-3">
              {loading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : filteredInstitutions.length > 0 ? (
                filteredInstitutions.map((institution) => (
                  <div
                    key={institution?.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-accent ${selectedInstitution?.id === institution?.id ? 'bg-accent' : ''
                      }`}
                    onClick={() => setSelectedInstitution(institution)}
                  >
                    <h4 className="font-medium text-sm mb-1">{institution?.nameUz}</h4>
                    {/* <p className="text-xs text-muted-foreground mb-2">
                      {institution.location.district}, {institution.location.region}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {institution.capacity.toLocaleString()} capacity
                    </div> */}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No institutions found
                </p>
              )}
            </CardContent>
          </Card>

          {/* Selected Institution Details */}
          {selectedInstitution && (
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">{selectedInstitution?.nameUz}</CardTitle>
                <Badge variant="secondary">{selectedInstitution.type}</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {selectedInstitution?.address}
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Programs:</h4>
                  {/* <div className="flex flex-wrap gap-1">
                    {selectedInstitution.programs.slice(0, 3).map((program, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {program}
                      </Badge>
                    ))}
                  </div> */}
                </div>
                <Button className="w-full" size="sm">
                  View Full Profile
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}