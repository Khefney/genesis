import type { ActivityEntry, Project, WeeklyDay } from '../types'
import { parseUtcDate, toUtcDateString } from './streak'

export function sortActivityNewestFirst(entries: ActivityEntry[]): ActivityEntry[] {
  return [...entries].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  )
}

export function activityForProject(
  entries: ActivityEntry[],
  projectId: string,
): ActivityEntry[] {
  return sortActivityNewestFirst(entries.filter((e) => e.projectId === projectId))
}

/** Build a 7-day weekly series ending on `endDate` (UTC YYYY-MM-DD). */
export function buildWeeklyActivity(
  entries: ActivityEntry[],
  endDate: string = toUtcDateString(),
): WeeklyDay[] {
  const end = parseUtcDate(endDate)
  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const days: WeeklyDay[] = []

  for (let i = 6; i >= 0; i -= 1) {
    const day = new Date(end.getTime() - i * 24 * 60 * 60 * 1000)
    const date = toUtcDateString(day)
    const dayEntries = entries.filter((e) => e.timestamp.slice(0, 10) === date)
    const commits = dayEntries.filter((e) => e.type === 'commit').length
    days.push({
      date,
      label: labels[day.getUTCDay()],
      commits,
      tasks: dayEntries.length,
    })
  }

  return days
}

export function formatRelativeTime(timestamp: string, now: Date = new Date()): string {
  const diffMs = now.getTime() - new Date(timestamp).getTime()
  const mins = Math.floor(diffMs / 60_000)
  if (mins < 60) return `${Math.max(mins, 0)}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return timestamp.slice(0, 10)
}

export function resolveProjectName(
  projects: Project[],
  projectId: string,
): string {
  return projects.find((p) => p.id === projectId)?.name ?? projectId
}
