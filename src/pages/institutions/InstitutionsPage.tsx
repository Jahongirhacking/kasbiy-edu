import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { usePagination } from "@/hooks/usePagination"
import { InstitutionCard } from "@/pages/institutions/components/InstitutionCard"
import { useGetInstitutionsQuery } from "@/services/institutions/index"
import { Flex, Input, Pagination } from 'antd'
import { Grid, List, MapPin } from "lucide-react"
import { useState } from "react"
import DesktopFilter from "./components/DesktopFilter"
import InstitutionCardSkeleton from "./components/InstitutionCardSkeleton"
import MobileFilter from "./components/MobileFilter"
import './style.scss'

export const InstitutionsPage = () => {
  const { pagination, setPagination } = usePagination();
  const { data: institutionsData, isFetching: isInstitutionsFetching } = useGetInstitutionsQuery({ ...pagination });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleSearch = (search: string) => {
    setPagination({ page: 0, size: pagination?.size, search });
  }

  return (
    <div className="institutions-page container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Ta'lim Muassasalari</h1>
        <p className="text-muted-foreground">
          O'zbekiston bo'yicha {institutionsData?.page?.totalElements} ta ta'lim muassasalari haqida ma'lumotlar bor
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filters */}
        <DesktopFilter />

        {/* Main Content */}
        <div className="flex-1">
          {/* Controls */}
          <div className="controls flex items-center justify-between mb-4 gap-8">
            <div className="flex items-center space-x-4 gap-4 w-full">
              {/* Mobile Filter Button */}
              <MobileFilter />

              <Input.Search
                className="hidden sm:block"
                placeholder="Qidirish"
                onSearch={handleSearch}
                enterButton
              />
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Input.Search
            className="sm:hidden"
            placeholder="Qidirish"
            onSearch={handleSearch}
            enterButton
            style={{ margin: '0 auto 18px' }}
          />

          {/* Results */}
          {isInstitutionsFetching ? (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {[...Array(6)].map((_, i) => (<InstitutionCardSkeleton key={i} />))}
            </div>
          ) : institutionsData?.content?.length ? (
            <Flex vertical gap={32}>
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {institutionsData?.content.map((institution) => (
                  <InstitutionCard key={institution?.id} institution={institution} />
                ))}
              </div>
              <Pagination
                align="center"
                total={institutionsData?.page?.totalElements}
                showTotal={(total) => `Jami: ${total} ta`}
                pageSize={pagination?.size}
                current={pagination?.page}
                onChange={(page, size) => {
                  setPagination({ page, size, search: pagination?.search });
                }}
              />
            </Flex>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Bunday ta'lim muassasalari yo'q</h3>
                <p className="text-muted-foreground">
                  Boshqa ta'lim muassasalarini qidirib ko'ring
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}