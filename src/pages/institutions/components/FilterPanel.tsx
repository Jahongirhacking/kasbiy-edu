import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";


const regions = [
    "Tashkent", "Samarkand", "Bukhara", "Andijan", "Fergana", "Namangan",
    "Kashkadarya", "Surkhandarya", "Khorezm", "Navoi", "Jizzakh", "Syrdarya", "Karakalpakstan"
]

const institution_type = [
    "Universitet", "Texnikum"
]

const FilterPanel = () => (
    <div className="space-y-6">
        <div>
            <h3 className="font-semibold mb-3">Viloyat</h3>
            <Select value={''} onValueChange={() => { }}>
                <SelectTrigger>
                    <SelectValue placeholder="All regions" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all-regions">Barcha viloyatlar</SelectItem>
                    {regions.map(region => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>

        <div>
            <h3 className="font-semibold mb-3">Sig'im</h3>
            <div className="px-2">
                <Slider
                    // value={0}
                    // onValueChange={() => { }}
                    max={20000}
                    min={0}
                    step={1000}
                    className="w-full"
                />
                {/* <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>{filters.capacityRange[0].toLocaleString()}</span>
                    <span>{filters.capacityRange[1].toLocaleString()}</span>
                </div> */}
            </div>
        </div>

        <div>
            <h3 className="font-semibold mb-3">Muassasa turi</h3>
            <div className="space-y-2">
                {institution_type.map(type => (
                    <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                            id={type}
                        // checked={filters.facilities.includes(type)}
                        // onCheckedChange={(checked) => handletypeChange(type, checked as boolean)}
                        />
                        <label htmlFor={type} className="text-sm">{type}</label>
                    </div>
                ))}
            </div>
        </div>

        {/* <Button onClick={applyFilters} className="w-full">
        Apply Filters
      </Button> */}
    </div>
)

export default FilterPanel;