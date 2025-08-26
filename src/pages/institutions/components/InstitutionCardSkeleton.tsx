import { Card, CardContent, CardHeader } from "@/components/ui/card"

const InstitutionCardSkeleton = () => {
    return (
        <Card className="animate-pulse">
            <CardHeader>
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
            </CardContent>
        </Card>
    )
}

export default InstitutionCardSkeleton