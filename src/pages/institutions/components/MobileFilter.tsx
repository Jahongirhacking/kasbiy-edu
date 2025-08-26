import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Filter } from "lucide-react"
import FilterPanel from "./FilterPanel"

const MobileFilter = () => {
    return (
        <Sheet>
            <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filterlar
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
                <div className="mt-8">
                    <FilterPanel />
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileFilter