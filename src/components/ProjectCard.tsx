import type { Project } from '../types'
import { STATUS_LABELS, normalizeProgress } from '../lib/projects'

interface ProjectCardProps {
  project: Project
  index?: number
}

const statusTone: Record<Project['status'], string> = {
  active: 'text-accent border-accent/30 bg-accent/10',
  paused: 'text-amber-300 border-amber-300/30 bg-amber-300/10',
  completed: 'text-sky-300 border-sky-300/30 bg-sky-300/10',
  planning: 'text-muted border-edge bg-panel',
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const progress = normalizeProgress(project.progress)

  return (
    <article
      className="project-card group flex h-full flex-col rounded-2xl border border-edge bg-panel/70 p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_18px_50px_-28px_rgba(45,212,191,0.55)]"
      style={{ animationDelay: `${120 + index * 60}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            {project.category}
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold text-ink">{project.name}</h3>
        </div>
        <span
          className={`shrink-0 rounded-md border px-2 py-1 font-mono text-[10px] uppercase tracking-wider ${statusTone[project.status]}`}
        >
          {STATUS_LABELS[project.status]}
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono uppercase tracking-[0.14em] text-muted">Progress</span>
          <span className="font-mono tabular-nums text-ink">{progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-ink/10">
          <div
            className="progress-bar h-full rounded-full bg-gradient-to-r from-accent/70 to-accent"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="font-mono text-[11px] text-muted">Updated {project.updatedAt}</p>
      </div>
    </article>
  )
}
