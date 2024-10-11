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
    <NeonGradientCard neonColors={neonColors}>
      <div className="flex flex-col items-center h-full p-6 bg-gray-100 dark:bg-neutral-900">
        <Icon className="w-12 h-12 mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
        <p className="text-sm text-center flex-grow">{description}</p>
      </div>
    </NeonGradientCard>
  )
}