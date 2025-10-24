import { Card } from "@/components/ui/card"
import { Activity, Zap, Server, TrendingUp } from "lucide-react"
import type { SystemMetrics } from "@/lib/types"

interface MetricsCardsProps {
  metrics: SystemMetrics
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  const cards = [
    {
      title: "Avg Latency",
      value: `${metrics.avgLatency}ms`,
      icon: Zap,
      description: "Task execution time",
      trend: metrics.avgLatency < 100 ? "good" : "warning",
    },
    {
      title: "Active Workers",
      value: metrics.activeWorkers.toString(),
      icon: Server,
      description: "Distributed nodes",
      trend: "good",
    },
    {
      title: "Tasks/Min",
      value: metrics.throughput.toString(),
      icon: TrendingUp,
      description: "Current throughput",
      trend: "good",
    },
    {
      title: "System Health",
      value: `${metrics.healthScore}%`,
      icon: Activity,
      description: "Overall status",
      trend: metrics.healthScore > 90 ? "good" : "warning",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <Card key={card.title} className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{card.title}</span>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold font-mono mb-1">{card.value}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{card.description}</span>
              <div className={`h-2 w-2 rounded-full ${card.trend === "good" ? "bg-green-500" : "bg-yellow-500"}`} />
            </div>
          </Card>
        )
      })}
    </div>
  )
}
