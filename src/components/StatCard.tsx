import type { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  hint?: string
  icon?: ReactNode
  delayMs?: number
}

export function StatCard({ label, value, hint, icon, delayMs = 0 }: StatCardProps) {
  return (
    <article
      className="stat-card group relative overflow-hidden rounded-2xl border border-edge bg-panel/80 p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_12px_40px_-20px_rgba(45,212,191,0.45)]"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{label}</p>
          <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink tabular-nums">
            {value}
          </p>
          {hint ? <p className="mt-2 text-sm text-muted">{hint}</p> : null}
        </div>
        {icon ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-edge bg-ink/5 text-accent">
            {icon}
          </div>
        ) : null}
      </div>
    </article>
  )
}
