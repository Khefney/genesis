import { describe, expect, it } from 'vitest'
import {
  averageProgress,
  filterProjectsByStatus,
  normalizeProgress,
  projectsNearComplete,
} from './projects'
import type { Project } from '../types'

const project = (overrides: Partial<Project>): Project => ({
  id: 'sample',
  name: 'Sample',
  description: 'Sample project',
  category: 'Backend',
  status: 'active',
  progress: 50,
  createdAt: '2026-01-01',
  updatedAt: '2026-01-02',
  ...overrides,
})

describe('normalizeProgress', () => {
  it('clamps values into 0–100 and rounds', () => {
    expect(normalizeProgress(72.4)).toBe(72)
    expect(normalizeProgress(-5)).toBe(0)
    expect(normalizeProgress(140)).toBe(100)
    expect(normalizeProgress(Number.NaN)).toBe(0)
  })
})

describe('averageProgress', () => {
  it('averages project progress percentages', () => {
    const projects = [
      project({ id: 'a', progress: 40 }),
      project({ id: 'b', progress: 60 }),
      project({ id: 'c', progress: 80 }),
    ]
    expect(averageProgress(projects)).toBe(60)
  })

  it('returns 0 for an empty list', () => {
    expect(averageProgress([])).toBe(0)
  })
})

describe('filterProjectsByStatus', () => {
  it('filters by status and supports all', () => {
    const projects = [
      project({ id: 'atlas-api', name: 'Atlas API', status: 'active' }),
      project({ id: 'prism', name: 'Prism Analytics', status: 'paused' }),
    ]
    expect(filterProjectsByStatus(projects, 'paused')).toHaveLength(1)
    expect(filterProjectsByStatus(projects, 'all')).toHaveLength(2)
  })
})

describe('projectsNearComplete', () => {
  it('returns projects at or above the threshold', () => {
    const projects = [
      project({ id: 'orbit-cli', progress: 84 }),
      project({ id: 'nova', progress: 58 }),
    ]
    expect(projectsNearComplete(projects, 80).map((p) => p.id)).toEqual(['orbit-cli'])
  })
})
