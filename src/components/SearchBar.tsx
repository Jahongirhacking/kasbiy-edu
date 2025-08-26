import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useTranslation } from "react-i18next"

interface SearchBarProps {
  onSearch: (query: string, filters: string[]) => void
  placeholder?: string
  showFilters?: boolean
}

export function SearchBar({ onSearch, placeholder, showFilters = true }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const { t } = useTranslation()

  const contentTypes = [
    { id: 'institution', label: t('nav.institutions') },
    { id: 'job', label: t('nav.jobRequirements') },
    { id: 'certificate', label: t('nav.certificates') },
    { id: 'classifier', label: t('nav.classifiers') },
    { id: 'program', label: t('nav.programs') }
  ]

  const handleSearch = () => {
    console.log('Searching with query:', query, 'filters:', selectedFilters)
    onSearch(query, selectedFilters)
  }

  const handleFilterChange = (filterId: string, checked: boolean) => {
    if (checked) {
      setSelectedFilters([...selectedFilters, filterId])
    } else {
      setSelectedFilters(selectedFilters.filter(f => f !== filterId))
    }
  }

  return (
    <div className="flex w-full max-w-4xl mx-auto space-x-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={placeholder || t('search.placeholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="pl-10 h-12 text-lg bg-white/80 backdrop-blur-sm border-2 focus:border-primary"
        />
      </div>

      {showFilters && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="lg" className="h-12 bg-white/80 backdrop-blur-sm">
              <Filter className="h-4 w-4 mr-2" />
              {t('common.filters')}
              {selectedFilters.length > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                  {selectedFilters.length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium">{t('nav.institutions')}</h4>
              <div className="space-y-2">
                {contentTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={type.id}
                      checked={selectedFilters.includes(type.id)}
                      onCheckedChange={(checked) => handleFilterChange(type.id, checked as boolean)}
                    />
                    <label htmlFor={type.id} className="text-sm font-medium">
                      {type.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}

      <Button onClick={handleSearch} size="lg" className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
        {t('common.search')}
      </Button>
    </div>
  )
}