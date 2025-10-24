import type { Task } from "./types"

// In-memory task storage (simulating MongoDB)
const tasks: Task[] = [
  {
    id: "1",
    name: "data-sync-job",
    schedule: "*/5 * * * *",
    payload: '{"source": "api", "destination": "warehouse"}',
    status: "completed",
    createdAt: new Date(Date.now() - 300000).toISOString(),
    executedAt: new Date(Date.now() - 290000).toISOString(),
    executionTime: 87,
  },
  {
    id: "2",
    name: "email-notification",
    schedule: "0 9 * * *",
    payload: '{"template": "daily-digest", "recipients": ["users"]}',
    status: "pending",
    createdAt: new Date(Date.now() - 180000).toISOString(),
  },
  {
    id: "3",
    name: "cache-warmup",
    schedule: "*/10 * * * *",
    payload: '{"endpoints": ["/api/products", "/api/users"]}',
    status: "running",
    createdAt: new Date(Date.now() - 120000).toISOString(),
    executedAt: new Date(Date.now() - 5000).toISOString(),
  },
  {
    id: "4",
    name: "backup-database",
    schedule: "0 2 * * *",
    payload: '{"databases": ["main", "analytics"], "retention": 7}',
    status: "completed",
    createdAt: new Date(Date.now() - 600000).toISOString(),
    executedAt: new Date(Date.now() - 580000).toISOString(),
    executionTime: 234,
  },
  {
    id: "5",
    name: "cleanup-temp-files",
    schedule: "0 */6 * * *",
    payload: '{"path": "/tmp", "olderThan": "24h"}',
    status: "failed",
    createdAt: new Date(Date.now() - 400000).toISOString(),
    executedAt: new Date(Date.now() - 390000).toISOString(),
    executionTime: 12,
    error: "Permission denied",
  },
]

let taskIdCounter = 6

export const taskStore = {
  getAll: () => tasks,

  getById: (id: string) => tasks.find((task) => task.id === id),

  create: (taskData: Omit<Task, "id" | "status" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: (taskIdCounter++).toString(),
      status: "pending",
      createdAt: new Date().toISOString(),
    }
    tasks.push(newTask)
    return newTask
  },

  update: (id: string, updates: Partial<Task>) => {
    const index = tasks.findIndex((task) => task.id === id)
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updates }
      return tasks[index]
    }
    return null
  },

  delete: (id: string) => {
    const index = tasks.findIndex((task) => task.id === id)
    if (index !== -1) {
      tasks.splice(index, 1)
      return true
    }
    return false
  },
}
