# Distributed Task Scheduler with MongoDB Atlas

A modern, real-time distributed task scheduling system built with Next.js 16, TypeScript, and designed for MongoDB Atlas integration. This application provides a comprehensive dashboard for managing scheduled tasks with visual monitoring and execution tracking.

## Features

- **🚀 Real-time Task Scheduling**: Create and manage tasks with cron-based scheduling
- **📊 Live System Metrics**: Monitor system health, latency, throughput, and active workers
- **⚡ Instant Task Execution**: Manually trigger pending tasks with one click
- **📈 Visual Analytics**: Interactive charts displaying latency history and performance metrics
- **🔄 Auto-refresh**: Dashboard updates every 3 seconds for real-time monitoring
- **🎨 Modern UI**: Clean, responsive interface built with Radix UI and Tailwind CSS
- **🌓 Dark Mode Support**: Built-in theme support with next-themes
- **📱 Mobile Responsive**: Fully responsive design that works on all devices

## Tech Stack

### Core Technologies
- **Framework**: [Next.js 16.0.0](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Runtime**: React 19.2.0

### UI Components
- **Component Library**: [Radix UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS 4.1.9](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Analytics**: Vercel Analytics

## Project Structure

```
.
├── app/
│   ├── api/                      # API routes
│   │   ├── metrics/
│   │   │   └── route.ts          # GET /api/metrics - System metrics endpoint
│   │   └── tasks/
│   │       ├── route.ts          # GET/POST /api/tasks - Task CRUD operations
│   │       └── [id]/execute/
│   │           └── route.ts      # POST /api/tasks/:id/execute - Task execution
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with metadata
│   └── page.tsx                  # Home page
│
├── components/
│   ├── ui/                       # Reusable UI components (Radix-based)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── tabs.tsx
│   │   └── ...                   # 50+ UI components
│   ├── task-dashboard.tsx        # Main dashboard component
│   ├── task-form.tsx             # Task creation form
│   ├── task-list.tsx             # Task queue display
│   ├── metrics-cards.tsx         # System metrics cards
│   ├── latency-chart.tsx         # Latency visualization
│   └── theme-provider.tsx        # Theme context provider
│
├── lib/
│   ├── types.ts                  # TypeScript type definitions
│   ├── task-store.ts             # In-memory task storage (MongoDB simulation)
│   ├── task-executor.ts          # Task execution logic with distributed locking
│   ├── metrics-generator.ts      # System metrics generation
│   └── utils.ts                  # Utility functions
│
├── hooks/                        # Custom React hooks
├── public/                       # Static assets
├── styles/                       # Additional styles
├── components.json               # UI components configuration
├── next.config.mjs               # Next.js configuration
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
└── postcss.config.mjs            # PostCSS configuration
```

## Architecture

### Data Flow

1. **Task Creation**: User submits task through `TaskForm` → API validates → Stored in `taskStore`
2. **Task Execution**: User clicks execute → API triggers `executeTask()` → Task status updated
3. **Real-time Updates**: Dashboard polls every 3 seconds → Fetches tasks and metrics → UI updates
4. **Metrics Generation**: System calculates metrics from task execution data

### Key Components

#### Task Store (`lib/task-store.ts`)
In-memory storage simulating MongoDB operations:
- `getAll()`: Retrieve all tasks
- `getById(id)`: Retrieve specific task
- `create(taskData)`: Create new task
- `update(id, updates)`: Update task properties
- `delete(id)`: Remove task

#### Task Executor (`lib/task-executor.ts`)
Simulates distributed task execution with:
- **Distributed Locking**: Prevents concurrent execution
- **Status Management**: pending → running → completed/failed
- **Execution Simulation**: Random latency (50-250ms)
- **Error Handling**: 10% simulated failure rate

#### Metrics Generator (`lib/metrics-generator.ts`)
Calculates system metrics:
- **Average Latency**: Mean execution time of completed tasks
- **Active Workers**: Simulated worker nodes (3-5)
- **Throughput**: Tasks per minute (40-60)
- **Health Score**: Overall system health (90-100%)
- **Latency History**: 20 data points for charting

## API Endpoints

### Tasks API

#### `GET /api/tasks`
Retrieve all tasks from the scheduler.

**Response:**
```json
{
  "tasks": [
    {
      "id": "1",
      "name": "data-sync-job",
      "schedule": "*/5 * * * *",
      "payload": "{\"source\": \"api\"}",
      "status": "completed",
      "createdAt": "2025-10-24T10:00:00.000Z",
      "executedAt": "2025-10-24T10:05:00.000Z",
      "executionTime": 87
    }
  ]
}
```

#### `POST /api/tasks`
Create a new scheduled task.

**Request Body:**
```json
{
  "name": "backup-job",
  "schedule": "0 2 * * *",
  "payload": "{\"retention\": 7}"
}
```

**Response:**
```json
{
  "task": {
    "id": "6",
    "name": "backup-job",
    "schedule": "0 2 * * *",
    "payload": "{\"retention\": 7}",
    "status": "pending",
    "createdAt": "2025-10-24T10:30:00.000Z"
  }
}
```

#### `POST /api/tasks/:id/execute`
Execute a pending task immediately.

**Response:**
```json
{
  "message": "Task execution started"
}
```

### Metrics API

#### `GET /api/metrics`
Retrieve current system metrics.

**Response:**
```json
{
  "avgLatency": 125,
  "activeWorkers": 4,
  "throughput": 52,
  "healthScore": 97,
  "latencyHistory": [
    { "timestamp": "10:30:00", "latency": 120 },
    { "timestamp": "10:30:10", "latency": 135 }
  ]
}
```

## Setup and Installation

### Prerequisites
- Node.js 18.x or higher
- pnpm (recommended) or npm

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/johaankjis/Distributed-Task-Scheduler-with-MongoDB-Atlas.git
cd Distributed-Task-Scheduler-with-MongoDB-Atlas
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Run the development server**
```bash
pnpm dev
# or
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
pnpm dev      # Start development server (default: http://localhost:3000)
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint for code quality
```

## Usage

### Creating a Task

1. Click the **"New Task"** button in the dashboard header
2. Fill in the task details:
   - **Task Name**: Unique identifier (e.g., "data-sync-job")
   - **Schedule**: Cron expression (e.g., "*/5 * * * *" for every 5 minutes)
   - **Payload**: JSON data for the task (e.g., `{"source": "api"}`)
3. Click **"Create Task"** to add it to the queue

### Executing a Task

1. Find a task with **"pending"** status in the Task Queue
2. Click the **"Execute"** button next to the task
3. Watch the status change: pending → running → completed/failed
4. View execution time and status in real-time

### Monitoring System Metrics

The dashboard displays four key metrics:
- **Avg Latency**: Average task execution time
- **Active Workers**: Number of distributed worker nodes
- **Tasks/Min**: Current throughput rate
- **System Health**: Overall system health percentage

The **Latency Chart** shows historical latency data over time for trend analysis.

## Task Status Flow

```
pending → running → completed
                 → failed
```

- **pending**: Task created, waiting for execution
- **running**: Task currently executing
- **completed**: Task finished successfully
- **failed**: Task encountered an error during execution

## Cron Schedule Examples

```
*/5 * * * *    # Every 5 minutes
0 9 * * *      # Daily at 9:00 AM
0 */6 * * *    # Every 6 hours
0 2 * * *      # Daily at 2:00 AM
0 0 * * 1      # Weekly on Monday at midnight
```

## Development

### Adding New Features

1. **New API Endpoint**: Add route in `app/api/[feature]/route.ts`
2. **New Component**: Create in `components/[feature].tsx`
3. **New Type**: Define in `lib/types.ts`
4. **New Utility**: Add to `lib/[utility].ts`

### Code Structure Guidelines

- Use TypeScript for type safety
- Follow React hooks best practices
- Keep components small and focused
- Use server components when possible
- Implement proper error handling

### Styling

This project uses:
- **Tailwind CSS** for utility-first styling
- **CSS Variables** for theme customization
- **Radix UI** for accessible components
- **Class Variance Authority** for component variants

## MongoDB Atlas Integration

While this demo uses in-memory storage, it's designed for MongoDB Atlas integration:

### Recommended Schema

```typescript
// MongoDB Collection: tasks
{
  _id: ObjectId,
  name: string,
  schedule: string,
  payload: object,
  status: "pending" | "running" | "completed" | "failed",
  createdAt: Date,
  executedAt?: Date,
  executionTime?: number,
  error?: string,
  locks: {
    workerId?: string,
    lockedAt?: Date
  }
}
```

### Integration Steps

1. Install MongoDB driver: `pnpm add mongodb`
2. Create connection utility in `lib/mongodb.ts`
3. Replace `taskStore` methods with MongoDB operations
4. Implement distributed locking using MongoDB transactions
5. Add proper error handling and retry logic

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Configure environment variables (if MongoDB is integrated)
4. Deploy

### Environment Variables (for MongoDB)

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
MONGODB_DB=task-scheduler
```

## Performance Considerations

- **Polling Interval**: Currently 3 seconds (adjust based on needs)
- **Task Execution**: Asynchronous fire-and-forget pattern
- **Metrics Calculation**: O(n) complexity based on task count
- **UI Updates**: React state batching for optimal rendering

## Future Enhancements

- [ ] Real MongoDB Atlas integration
- [ ] User authentication and authorization
- [ ] Task history and audit logs
- [ ] Advanced scheduling options (one-time, recurring, etc.)
- [ ] Task dependencies and workflows
- [ ] Email/webhook notifications
- [ ] Task priority queue
- [ ] Multi-tenant support
- [ ] Export/import task configurations
- [ ] Advanced filtering and search

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is available for educational and demonstration purposes.

## Support

For issues, questions, or contributions, please visit the [GitHub repository](https://github.com/johaankjis/Distributed-Task-Scheduler-with-MongoDB-Atlas).

---

Built with ❤️ using Next.js and TypeScript
