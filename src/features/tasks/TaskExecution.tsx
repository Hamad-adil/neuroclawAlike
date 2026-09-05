import {
  Check,
  Circle,
  Loader2,
  X,
} from 'lucide-react'
import type { AgentTask, TaskStepStatus } from '../../types/agent'

type TaskExecutionProps = {
  task: AgentTask
}

function StepIcon({ status }: { status: TaskStepStatus }) {
  if (status === 'completed') {
    return (
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
        <Check className="h-3.5 w-3.5" />
      </div>
    )
  }

  if (status === 'running') {
    return (
      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white">
        <X className="h-3.5 w-3.5" />
      </div>
    )
  }

  return (
    <div className="flex h-6 w-6 items-center justify-center">
      <Circle className="h-4 w-4 text-zinc-300 dark:text-zinc-700" />
    </div>
  )
}

export function TaskExecution({
  task,
}: TaskExecutionProps) {
  return (
    <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">
            {task.title}
          </p>

          <p className="mt-1 text-xs text-zinc-400">
            Agent execution
          </p>
        </div>

        <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium capitalize text-zinc-500 dark:bg-zinc-900">
          {task.status}
        </span>
      </div>

      <div className="space-y-4">
        {task.steps.map((step, index) => (
          <div key={step.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <StepIcon status={step.status} />

              {index < task.steps.length - 1 && (
                <div className="mt-1 h-full min-h-5 w-px bg-zinc-200 dark:bg-zinc-800" />
              )}
            </div>

            <div className="min-w-0 pb-1">
              <p className="text-sm font-medium">
                {step.title}
              </p>

              <p className="mt-1 text-xs leading-5 text-zinc-400">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}