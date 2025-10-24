import { taskStore } from "./task-store"
import type { SystemMetrics } from "./types"

// Generate mock system metrics
export function generateMetrics(): SystemMetrics {
  const tasks = taskStore.getAll()
  const completedTasks = tasks.filter((t) => t.status === "completed" && t.executionTime)

  const avgLatency =
    completedTasks.length > 0
      ? Math.floor(completedTasks.reduce((sum, t) => sum + (t.executionTime || 0), 0) / completedTasks.length)
      : 0

  // Generate latency history (last 20 data points)
  const latencyHistory = Array.from({ length: 20 }, (_, i) => {
    const timestamp = new Date(Date.now() - (19 - i) * 10000).toLocaleTimeString()
    const latency = Math.floor(Math.random() * 100) + 50
    return { timestamp, latency }
  })

  return {
    avgLatency,
    activeWorkers: Math.floor(Math.random() * 3) + 3, // 3-5 workers
    throughput: Math.floor(Math.random() * 20) + 40, // 40-60 tasks/min
    healthScore: Math.floor(Math.random() * 10) + 90, // 90-100%
    latencyHistory,
  }
}
