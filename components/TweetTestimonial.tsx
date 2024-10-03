import { NeonGradientCard } from "@/components/ui/neon-gradient-card"

interface TweetTestimonialProps {
  quote: string
  author: string
  username: string
}

export function TweetTestimonial({ quote, author, username }: TweetTestimonialProps) {
  return (
    <NeonGradientCard
      className="w-80 h-48" // Increased height from h-40 to h-48
      borderSize={2}
      borderRadius={12}
      neonColors={{ firstColor: "#1DA1F2", secondColor: "#14171A" }}
    >
      <div className="flex flex-col p-4 h-full">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 mr-3"></div>
          <div>
            <p className="font-bold text-white text-sm">{author}</p>
            <p className="text-gray-400 text-xs">@{username}</p>
          </div>
        </div>
        <p className="text-white text-sm overflow-hidden">{quote}</p>
      </div>
    </NeonGradientCard>
  )
}