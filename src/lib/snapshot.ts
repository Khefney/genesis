import type { DailySnapshot } from '../types'
import { calculateCurrentStreak } from './streak'

export interface SnapshotGenerationResult {
  created: boolean
  date: string
  snapshots: DailySnapshot[]
  streak: number
  reason?: string
}

function hashDaySeed(date: string): number {
  let h = 0
  for (let i = 0; i < date.length; i += 1) {
    h = (h * 31 + date.charCodeAt(i)) >>> 0
  }
  return h
}

/** Deterministic fictional task count for a UTC date (3–9). */
export function generateCompletedTasks(date: string): number {
  return 3 + (hashDaySeed(date) % 7)
}

/**
 * Append a snapshot for `date` when missing. Never creates duplicate dates.
 * Updates `trackedDays` and returns the recomputed streak.
 */
export function generateDailySnapshot(
  existing: DailySnapshot[],
  options: {
    date: string
    activeProjects: number
  },
): SnapshotGenerationResult {
  const { date, activeProjects } = options
  const hasDate = existing.some((s) => s.date === date)

  if (hasDate) {
    const snapshots = [...existing].sort((a, b) => a.date.localeCompare(b.date))
    return {
      created: false,
      date,
      snapshots,
      streak: calculateCurrentStreak(snapshots, date),
      reason: 'Snapshot already exists for this date',
    }
  }

  const sorted = [...existing].sort((a, b) => a.date.localeCompare(b.date))
  const previousTracked = sorted.at(-1)?.trackedDays ?? 0
  const next: DailySnapshot = {
    date,
    activeProjects,
    completedTasks: generateCompletedTasks(date),
    trackedDays: previousTracked + 1,
  }

  const snapshots = [...sorted, next]
  return {
    created: true,
    date,
    snapshots,
    streak: calculateCurrentStreak(snapshots, date),
  }
}
