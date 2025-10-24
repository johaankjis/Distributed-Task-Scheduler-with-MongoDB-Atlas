"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TaskList } from "@/components/task-list"
import { TaskForm } from "@/components/task-form"
import { MetricsCards } from "@/components/metrics-cards"
import { LatencyChart } from "@/components/latency-chart"
import { Activity, Plus } from "lucide-react"
import type { Task, SystemMetrics } from "@/lib/types"

export function TaskDashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks")
      const data = await response.json()
      setTasks(data.tasks)
    } catch (error) {
      console.error("Failed to fetch tasks:", error)
    }
  }

  // Fetch metrics
  const fetchMetrics = async () => {
    try {
      const response = await fetch("/api/metrics")
      const data = await response.json()
      setMetrics(data)
    } catch (error) {
      console.error("Failed to fetch metrics:", error)
    }
  }

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchTasks(), fetchMetrics()])
      setIsLoading(false)
    }
    loadData()
  }, [])

  // Poll for updates every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTasks()
      fetchMetrics()
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleCreateTask = async (taskData: { name: string; schedule: string; payload: string }) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      })

      if (response.ok) {
        await fetchTasks()
        setShowTaskForm(false)
      }
    } catch (error) {
      console.error("Failed to create task:", error)
    }
  }

  const handleExecuteTask = async (taskId: string) => {
    try {
      await fetch(`/api/tasks/${taskId}/execute`, { method: "POST" })
      await fetchTasks()
    } catch (error) {
      console.error("Failed to execute task:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Activity className="h-5 w-5 animate-spin" />
          <span className="font-mono">Loading scheduler...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Distributed Task Scheduler</h1>
          <p className="text-muted-foreground mt-1">MongoDB Atlas • High Availability • Low Latency</p>
        </div>
        <Button onClick={() => setShowTaskForm(!showTaskForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </div>

      {/* Task Form */}
      {showTaskForm && (
        <Card className="p-6">
          <TaskForm onSubmit={handleCreateTask} onCancel={() => setShowTaskForm(false)} />
        </Card>
      )}

      {/* Metrics */}
      {metrics && <MetricsCards metrics={metrics} />}

      {/* Latency Chart */}
      {metrics && <LatencyChart data={metrics.latencyHistory} />}

      {/* Task List */}
      <TaskList tasks={tasks} onExecute={handleExecuteTask} />
    </div>
  )
}
