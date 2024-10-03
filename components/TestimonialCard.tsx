import { Card, CardContent } from "@/components/ui/card"

interface TestimonialCardProps {
  quote: string
  author: string
}

export function TestimonialCard({ quote, author }: TestimonialCardProps) {
  return (
    <Card className="bg-[hsl(240,10%,3.9%)] border-[hsl(240,3.7%,15.9%)]">
      <CardContent className="p-6">
        <p className="mb-4 text-[hsl(0,0%,98%)]">{quote}</p>
        <div className="flex items-center">
          <span className="ml-2 text-sm text-[hsl(240,5%,64.9%)]">- {author}</span>
        </div>
      </CardContent>
    </Card>
  )
}