export type ProjectStatus = 'active' | 'paused' | 'completed' | 'planning'

export interface Project {
  id: string
  name: string
  description: string
  category: string
  status: ProjectStatus
  progress: number
  createdAt: string
  updatedAt: string
}

export type ActivityType = 'commit' | 'pr' | 'review' | 'deploy' | 'docs' | 'refactor'

export interface ActivityEntry {
  id: string
  projectId: string
  type: ActivityType
  message: string
  timestamp: string
}

export interface DailySnapshot {
  date: string
  activeProjects: number
  completedTasks: number
  trackedDays: number
}

export interface WeeklyDay {
  date: string
  label: string
  commits: number
  tasks: number
}
