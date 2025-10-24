import { NextResponse } from "next/server"
import { generateMetrics } from "@/lib/metrics-generator"

export async function GET() {
  const metrics = generateMetrics()
  return NextResponse.json(metrics)
}
