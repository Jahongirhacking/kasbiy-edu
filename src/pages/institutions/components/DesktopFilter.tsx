import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Filter } from "lucide-react"
import FilterPanel from "./FilterPanel"

const DesktopFilter = () => {
    return (
        <div className="hidden lg:block w-80">
            <Card className="sticky top-24 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Filter className="mr-2 h-5 w-5" />
                        Filterlar
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <FilterPanel />
                </CardContent>
            </Card>
        </div>
    )
}

export default DesktopFilter