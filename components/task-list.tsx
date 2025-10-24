"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react"
import type { Task } from "@/lib/types"

interface TaskListProps {
  tasks: Task[]
  onExecute: (taskId: string) => void
}

export function TaskList({ tasks, onExecute }: TaskListProps) {
  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "running":
        return <Loader2 className="h-4 w-4 animate-spin" />
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />
      case "failed":
        return <XCircle className="h-4 w-4" />
    }
  }

  const getStatusVariant = (status: Task["status"]) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "running":
        return "default"
      case "completed":
        return "outline"
      case "failed":
        return "destructive"
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Task Queue</h2>
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No tasks scheduled</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-2 min-w-[120px]">
                  {getStatusIcon(task.status)}
                  <Badge variant={getStatusVariant(task.status)}>{task.status}</Badge>
                </div>

                <div className="flex-1">
                  <div className="font-semibold font-mono">{task.name}</div>
                  <div className="text-sm text-muted-foreground">Schedule: {task.schedule}</div>
                </div>

                <div className="text-sm text-muted-foreground font-mono">
                  {task.executionTime ? `${task.executionTime}ms` : "—"}
                </div>

                <div className="text-sm text-muted-foreground">{new Date(task.createdAt).toLocaleTimeString()}</div>
              </div>

              {task.status === "pending" && (
                <Button size="sm" variant="outline" onClick={() => onExecute(task.id)} className="gap-2">
                  <Play className="h-3 w-3" />
                  Execute
                </Button>
              )}
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
