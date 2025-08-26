import { Search, SortAsc } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { searchContent, SearchResult } from "../api/search"
import { SearchBar } from "../components/SearchBar"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { useToast } from "../hooks/useToast"

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState("relevance")
  const { toast } = useToast()

  const query = searchParams.get('q') || ''
  const types = searchParams.get('types')?.split(',').filter(Boolean) || []

  useEffect(() => {
    if (query) {
      handleSearch(query, types)
    }
  }, [query, types])

  const handleSearch = async (searchQuery: string, filters: string[]) => {
    if (!searchQuery.trim()) return

    setLoading(true)
    try {
      console.log('Performing search:', searchQuery, filters)
      const response = await searchContent(searchQuery, filters) as { results: SearchResult[], totalCount: number }
      setResults(response.results)

      // Update URL
      const params = new URLSearchParams()
      params.set('q', searchQuery)
      if (filters.length > 0) {
        params.set('types', filters.join(','))
      }
      setSearchParams(params)
    } catch (error) {
      console.error('Search error:', error)
      toast({
        title: "Search Error",
        description: "Failed to perform search. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = []
    }
    acc[result.type].push(result)
    return acc
  }, {} as Record<string, SearchResult[]>)

  const sortResults = (results: SearchResult[]) => {
    switch (sortBy) {
      case 'alphabetical':
        return [...results].sort((a, b) => a.title.localeCompare(b.title))
      case 'relevance':
      default:
        return [...results].sort((a, b) => b.relevance - a.relevance)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Search Header */}
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold">Search Results</h1>
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search for institutions, programs, jobs..."
        />
      </div>

      {/* Results Section */}
      {query && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Results for "{query}" {results.length > 0 && `(${results.length} found)`}
            </h2>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SortAsc className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Sort by Relevance</SelectItem>
                <SelectItem value="alphabetical">Sort Alphabetically</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : results.length > 0 ? (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all">All ({results.length})</TabsTrigger>
                <TabsTrigger value="institution">
                  Institutions ({groupedResults.institution?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="job">
                  Jobs ({groupedResults.job?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="program">
                  Programs ({groupedResults.program?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="certificate">
                  Certificates ({groupedResults.certificate?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="classifier">
                  Classifiers ({groupedResults.classifier?.length || 0})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {sortResults(results).map((result) => (
                  <SearchResultCard key={result._id} result={result} />
                ))}
              </TabsContent>

              {Object.entries(groupedResults).map(([type, typeResults]) => (
                <TabsContent key={type} value={type} className="space-y-4">
                  {sortResults(typeResults).map((result) => (
                    <SearchResultCard key={result._id} result={result} />
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          ) : query && !loading ? (
            <Card className="text-center py-12">
              <CardContent>
                <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters
                </p>
              </CardContent>
            </Card>
          ) : null}
        </div>
      )}
    </div>
  )
}

function SearchResultCard({ result }: { result: SearchResult }) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'institution': return 'bg-blue-100 text-blue-800'
      case 'job': return 'bg-green-100 text-green-800'
      case 'program': return 'bg-purple-100 text-purple-800'
      case 'certificate': return 'bg-yellow-100 text-yellow-800'
      case 'classifier': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Link to={result.url} className="hover:underline">
              <CardTitle className="text-lg text-blue-600 hover:text-blue-800">
                {result.title}
              </CardTitle>
            </Link>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
              {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            {Math.round(result.relevance * 100)}% match
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{result.description}</p>
      </CardContent>
    </Card>
  )
}