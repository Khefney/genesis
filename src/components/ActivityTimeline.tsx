import type { ActivityEntry, Project } from '../types'
import { formatRelativeTime, resolveProjectName, sortActivityNewestFirst } from '../lib/activity'

interface ActivityTimelineProps {
  entries: ActivityEntry[]
  projects: Project[]
  now?: Date
}

const typeLabel: Record<ActivityEntry['type'], string> = {
  commit: 'Commit',
  pr: 'Pull request',
  review: 'Review',
  deploy: 'Deploy',
  docs: 'Docs',
  refactor: 'Refactor',
}

export function ActivityTimeline({ entries, projects, now }: ActivityTimelineProps) {
  const items = sortActivityNewestFirst(entries).slice(0, 8)

  return (
    <section
      className="fade-up rounded-2xl border border-edge bg-panel/70 p-5"
      aria-labelledby="timeline-heading"
      style={{ animationDelay: '140ms' }}
    >
      <div className="mb-5">
        <h2 id="timeline-heading" className="font-display text-xl font-semibold text-ink">
          Recent activity
        </h2>
        <p className="mt-1 text-sm text-muted">Latest events across fictional project streams.</p>
      </div>

      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-edge px-4 py-8 text-center text-sm text-muted">
          No activity recorded yet.
        </p>
      ) : (
        <ol className="space-y-0">
          {items.map((entry, index) => (
            <li key={entry.id} className="relative flex gap-4 pb-5 last:pb-0">
              {index < items.length - 1 ? (
                <span
                  className="absolute left-[7px] top-4 h-[calc(100%-8px)] w-px bg-edge"
                  aria-hidden
                />
              ) : null}
              <span className="relative mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border border-accent/50 bg-accent/20 shadow-[0_0_0_4px_rgba(45,212,191,0.08)]" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                    {typeLabel[entry.type]}
                  </span>
                  <span className="text-muted">·</span>
                  <span className="text-xs text-muted">
                    {resolveProjectName(projects, entry.projectId)}
                  </span>
                  <span className="ml-auto font-mono text-[11px] text-muted">
                    {formatRelativeTime(entry.timestamp, now)}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-snug text-ink">{entry.message}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
