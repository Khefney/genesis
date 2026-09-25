import type { DailySnapshot } from '../types'

/** Returns YYYY-MM-DD for a Date in UTC. */
export function toUtcDateString(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10)
}

/** Parse YYYY-MM-DD as a UTC midnight Date. */
export function parseUtcDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

/**
 * Current streak: consecutive calendar days ending on the latest snapshot
 * (or on `asOf` if provided) with no gaps.
 */
export function calculateCurrentStreak(
  snapshots: DailySnapshot[],
  asOf?: string,
): number {
  if (snapshots.length === 0) return 0

  const dates = new Set(snapshots.map((s) => s.date))
  const sorted = [...dates].sort()
  const end = asOf ?? sorted[sorted.length - 1]

  if (!dates.has(end)) return 0

  let streak = 0
  let cursor = parseUtcDate(end)

  while (true) {
    const key = toUtcDateString(cursor)
    if (!dates.has(key)) break
    streak += 1
    cursor = new Date(cursor.getTime() - 24 * 60 * 60 * 1000)
  }

  return streak
}

export function getTotalTrackedDays(snapshots: DailySnapshot[]): number {
  if (snapshots.length === 0) return 0
  const latest = [...snapshots].sort((a, b) => a.date.localeCompare(b.date)).at(-1)
  return latest?.trackedDays ?? snapshots.length
}
