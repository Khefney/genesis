import type { Project } from '../types'
import type { StatusFilter } from '../lib/projects'
import { filterProjectsByStatus } from '../lib/projects'
import { ProjectCard } from './ProjectCard'

interface ProjectGridProps {
  projects: Project[]
  filter: StatusFilter
  onFilterChange: (filter: StatusFilter) => void
}

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'completed', label: 'Completed' },
  { value: 'planning', label: 'Planning' },
]

export function ProjectGrid({ projects, filter, onFilterChange }: ProjectGridProps) {
  const visible = filterProjectsByStatus(projects, filter)

  return (
    <section className="space-y-5" aria-labelledby="projects-heading">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="projects-heading" className="font-display text-2xl font-semibold text-ink">
            Projects
          </h2>
          <p className="mt-1 text-sm text-muted">Fictional sample workstreams and progress.</p>
        </div>
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter projects by status"
        >
          {FILTERS.map((item) => {
            const active = filter === item.value
            return (
              <button
                key={item.value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onFilterChange(item.value)}
                className={`rounded-lg border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition ${
                  active
                    ? 'border-accent/50 bg-accent/15 text-accent'
                    : 'border-edge bg-panel/60 text-muted hover:border-accent/30 hover:text-ink'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-edge bg-panel/40 px-6 py-12 text-center">
          <p className="font-display text-lg text-ink">No projects in this status</p>
          <p className="mt-2 text-sm text-muted">Try another filter to see sample workstreams.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
          {visible.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
    </section>
  )
}
