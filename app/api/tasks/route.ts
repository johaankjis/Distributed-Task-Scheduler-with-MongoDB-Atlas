import { NextResponse } from "next/server"
import { taskStore } from "@/lib/task-store"

export async function GET() {
  const tasks = taskStore.getAll()
  return NextResponse.json({ tasks })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, schedule, payload } = body

    if (!name || !schedule) {
      return NextResponse.json({ error: "Name and schedule are required" }, { status: 400 })
    }

    const task = taskStore.create({
      name,
      schedule,
      payload: payload || "{}",
    })

    return NextResponse.json({ task }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  }
}
