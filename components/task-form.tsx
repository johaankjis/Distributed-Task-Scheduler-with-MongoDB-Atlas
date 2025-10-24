"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface TaskFormProps {
  onSubmit: (data: { name: string; schedule: string; payload: string }) => void
  onCancel: () => void
}

export function TaskForm({ onSubmit, onCancel }: TaskFormProps) {
  const [name, setName] = useState("")
  const [schedule, setSchedule] = useState("*/5 * * * *")
  const [payload, setPayload] = useState("{}")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, schedule, payload })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Create New Task</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Task Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="data-sync-job"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="schedule">Schedule (Cron)</Label>
          <Input
            id="schedule"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            placeholder="*/5 * * * *"
            className="font-mono"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="payload">Payload (JSON)</Label>
        <Textarea
          id="payload"
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          placeholder='{"key": "value"}'
          className="font-mono"
          rows={4}
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Create Task</Button>
      </div>
    </form>
  )
}
