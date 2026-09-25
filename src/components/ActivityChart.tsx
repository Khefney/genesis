import type { WeeklyDay } from '../types'

interface ActivityChartProps {
  days: WeeklyDay[]
}

export function ActivityChart({ days }: ActivityChartProps) {
  const max = Math.max(1, ...days.map((d) => d.tasks))

  return (
    <section
      className="fade-up rounded-2xl border border-edge bg-panel/70 p-5"
      aria-labelledby="weekly-heading"
      style={{ animationDelay: '80ms' }}
    >
      <div className="mb-6 flex items-end justify-between gap-3">
        <div>
          <h2 id="weekly-heading" className="font-display text-xl font-semibold text-ink">
            Weekly activity
          </h2>
          <p className="mt-1 text-sm text-muted">Tasks logged across the last seven UTC days.</p>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          Peak {max}
        </p>
      </div>

      <div className="flex h-44 items-end gap-2 sm:gap-3" role="img" aria-label="Weekly activity chart">
        {days.map((day, index) => {
          const height = Math.max(8, Math.round((day.tasks / max) * 100))
          return (
            <div key={day.date} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-36 w-full items-end justify-center">
                <div
                  className="chart-bar w-full max-w-10 rounded-t-md bg-gradient-to-t from-accent/30 via-accent/70 to-accent transition duration-300 hover:from-accent/50 hover:to-accent"
                  style={{
                    height: `${height}%`,
                    animationDelay: `${150 + index * 50}ms`,
                  }}
                  title={`${day.date}: ${day.tasks} tasks, ${day.commits} commits`}
                />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                {day.label}
              </span>
              <span className="font-mono text-[10px] tabular-nums text-ink/80">{day.tasks}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
