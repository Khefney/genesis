import { describe, expect, it } from 'vitest'
import { generateCompletedTasks, generateDailySnapshot } from './snapshot'
import type { DailySnapshot } from '../types'

const base: DailySnapshot[] = [
  {
    date: '2026-09-23',
    activeProjects: 3,
    completedTasks: 6,
    trackedDays: 37,
  },
  {
    date: '2026-09-24',
    activeProjects: 3,
    completedTasks: 7,
    trackedDays: 38,
  },
]

describe('generateDailySnapshot', () => {
  it('creates a new snapshot and increments tracked days', () => {
    const result = generateDailySnapshot(base, {
      date: '2026-09-25',
      activeProjects: 3,
    })

    expect(result.created).toBe(true)
    expect(result.snapshots).toHaveLength(3)
    expect(result.snapshots.at(-1)).toMatchObject({
      date: '2026-09-25',
      activeProjects: 3,
      trackedDays: 39,
    })
    expect(result.streak).toBe(3)
  })

  it('never generates duplicate dates', () => {
    const first = generateDailySnapshot(base, {
      date: '2026-09-24',
      activeProjects: 4,
    })
    expect(first.created).toBe(false)
    expect(first.reason).toMatch(/already exists/i)
    expect(first.snapshots).toHaveLength(2)

    const second = generateDailySnapshot(first.snapshots, {
      date: '2026-09-24',
      activeProjects: 9,
    })
    expect(second.created).toBe(false)
    expect(second.snapshots.filter((s) => s.date === '2026-09-24')).toHaveLength(1)
  })

  it('produces deterministic completed task counts per date', () => {
    expect(generateCompletedTasks('2026-09-25')).toBe(generateCompletedTasks('2026-09-25'))
    expect(generateCompletedTasks('2026-09-25')).toBeGreaterThanOrEqual(3)
    expect(generateCompletedTasks('2026-09-25')).toBeLessThanOrEqual(9)
  })
})
