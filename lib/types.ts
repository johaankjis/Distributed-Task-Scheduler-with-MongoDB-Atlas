export interface Task {
  id: string
  name: string
  schedule: string
  payload: string
  status: "pending" | "running" | "completed" | "failed"
  createdAt: string
  executedAt?: string
  executionTime?: number
  error?: string
}

export interface SystemMetrics {
  avgLatency: number
  activeWorkers: number
  throughput: number
  healthScore: number
  latencyHistory: Array<{
    timestamp: string
    latency: number
  }>
}
