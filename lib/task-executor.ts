import { taskStore } from "./task-store"

// Simulates distributed task execution with locking
export async function executeTask(taskId: string): Promise<void> {
  const task = taskStore.getById(taskId)

  if (!task || task.status !== "pending") {
    throw new Error("Task not found or not in pending state")
  }

  // Simulate distributed lock acquisition
  taskStore.update(taskId, {
    status: "running",
    executedAt: new Date().toISOString(),
  })

  // Simulate task execution with random latency
  const executionTime = Math.floor(Math.random() * 200) + 50

  await new Promise((resolve) => setTimeout(resolve, executionTime))

  // Simulate 10% failure rate
  const shouldFail = Math.random() < 0.1

  if (shouldFail) {
    taskStore.update(taskId, {
      status: "failed",
      executionTime,
      error: "Simulated execution error",
    })
  } else {
    taskStore.update(taskId, {
      status: "completed",
      executionTime,
    })
  }
}
