import { describe, expect, it } from 'vitest'
import {
  calculateCurrentStreak,
  getTotalTrackedDays,
  toUtcDateString,
} from './streak'
import type { DailySnapshot } from '../types'

const snap = (
  date: string,
  trackedDays: number,
): DailySnapshot => ({
  date,
  activeProjects: 3,
  completedTasks: 4,
  trackedDays,
})

describe('calculateCurrentStreak', () => {
  it('returns 0 for an empty history', () => {
    expect(calculateCurrentStreak([])).toBe(0)
  })

  it('counts consecutive days ending on the latest snapshot', () => {
    const snapshots = [
      snap('2026-09-20', 1),
      snap('2026-09-21', 2),
      snap('2026-09-22', 3),
      snap('2026-09-23', 4),
    ]
    expect(calculateCurrentStreak(snapshots)).toBe(4)
  })

  it('breaks the streak when a day is missing', () => {
    const snapshots = [
      snap('2026-09-20', 1),
      snap('2026-09-21', 2),
      snap('2026-09-23', 3),
    ]
    expect(calculateCurrentStreak(snapshots)).toBe(1)
  })

  it('respects an explicit asOf date', () => {
    const snapshots = [
      snap('2026-09-20', 1),
      snap('2026-09-21', 2),
      snap('2026-09-22', 3),
    ]
    expect(calculateCurrentStreak(snapshots, '2026-09-21')).toBe(2)
    expect(calculateCurrentStreak(snapshots, '2026-09-24')).toBe(0)
  })
})

describe('getTotalTrackedDays', () => {
  it('reads trackedDays from the latest snapshot', () => {
    expect(
      getTotalTrackedDays([snap('2026-09-20', 10), snap('2026-09-21', 11)]),
    ).toBe(11)
  })

  it('returns 0 when there are no snapshots', () => {
    expect(getTotalTrackedDays([])).toBe(0)
  })
})

describe('toUtcDateString', () => {
  it('formats a UTC date as YYYY-MM-DD', () => {
    expect(toUtcDateString(new Date('2026-09-25T03:15:00Z'))).toBe('2026-09-25')
  })
})
