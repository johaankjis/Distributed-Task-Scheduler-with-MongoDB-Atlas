import { NextResponse } from "next/server"
import { executeTask } from "@/lib/task-executor"

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Execute task asynchronously (fire and forget)
    executeTask(id).catch((error) => {
      console.error(`Task ${id} execution failed:`, error)
    })

    return NextResponse.json({ message: "Task execution started" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to execute task" }, { status: 500 })
  }
}
