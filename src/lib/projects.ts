import type { Project, ProjectStatus } from '../types'

export type StatusFilter = ProjectStatus | 'all'

export function filterProjectsByStatus(
  projects: Project[],
  status: StatusFilter,
): Project[] {
  if (status === 'all') return [...projects]
  return projects.filter((p) => p.status === status)
}

export function countActiveProjects(projects: Project[]): number {
  return projects.filter((p) => p.status === 'active').length
}

/** Clamp and round a progress value to a whole percentage 0–100. */
export function normalizeProgress(progress: number): number {
  if (Number.isNaN(progress) || !Number.isFinite(progress)) return 0
  return Math.min(100, Math.max(0, Math.round(progress)))
}

export function averageProgress(projects: Project[]): number {
  if (projects.length === 0) return 0
  const total = projects.reduce((sum, p) => sum + normalizeProgress(p.progress), 0)
  return normalizeProgress(total / projects.length)
}

export function projectsNearComplete(
  projects: Project[],
  threshold = 80,
): Project[] {
  return projects.filter((p) => normalizeProgress(p.progress) >= threshold)
}

export function sortProjectsByProgress(projects: Project[]): Project[] {
  return [...projects].sort(
    (a, b) => normalizeProgress(b.progress) - normalizeProgress(a.progress),
  )
}

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  active: 'Active',
  paused: 'Paused',
  completed: 'Completed',
  planning: 'Planning',
}
