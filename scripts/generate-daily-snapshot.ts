import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { DailySnapshot, Project } from '../src/types'
import { countActiveProjects } from '../src/lib/projects'
import { generateDailySnapshot } from '../src/lib/snapshot'
import { toUtcDateString } from '../src/lib/streak'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const snapshotsPath = join(root, 'data', 'daily-snapshots.json')
const projectsPath = join(root, 'data', 'projects.json')

export function runSnapshotJob(now: Date = new Date()) {
  const existing = JSON.parse(
    readFileSync(snapshotsPath, 'utf8'),
  ) as DailySnapshot[]
  const projects = JSON.parse(readFileSync(projectsPath, 'utf8')) as Project[]
  const date = toUtcDateString(now)

  const result = generateDailySnapshot(existing, {
    date,
    activeProjects: countActiveProjects(projects),
  })

  if (result.created) {
    writeFileSync(snapshotsPath, `${JSON.stringify(result.snapshots, null, 2)}\n`)
  }

  return result
}

const isDirectRun = process.argv[1]
  ? fileURLToPath(import.meta.url) === process.argv[1]
  : false

if (isDirectRun) {
  const result = runSnapshotJob()
  if (result.created) {
    console.log(
      `Created snapshot for ${result.date} (trackedDays=${result.snapshots.at(-1)?.trackedDays}, streak=${result.streak})`,
    )
  } else {
    console.log(`Skipped ${result.date}: ${result.reason}`)
  }
}
