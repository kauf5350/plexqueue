import { NeonGradientCard } from "@/components/ui/neon-gradient-card"
import { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  Icon: LucideIcon
  title: string
  description: string
  neonColors: {
    firstColor: string
    secondColor: string
  }
}

export function FeatureCard({ Icon, title, description, neonColors }: FeatureCardProps) {
  return (
    <NeonGradientCard
      className="h-full"
      borderSize={2}
      borderRadius={12}
      neonColors={neonColors}
    >
      <div className="flex flex-col items-center h-full">
        <Icon className="w-12 h-12 mb-4 text-[hsl(0,0%,98%)]" />
        <h3 className="text-xl font-bold mb-2 text-[hsl(0,0%,98%)]">{title}</h3>
        <p className="text-center text-[hsl(240,5%,64.9%)]">{description}</p>
      </div>
    </NeonGradientCard>
  )
}