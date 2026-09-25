interface HeaderProps {
  subtitle: string
}

export function Header({ subtitle }: HeaderProps) {
  return (
    <header className="fade-up relative border-b border-edge/80 pb-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div
              className="pulse-mark flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/10"
              aria-hidden
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 12h3l2.5-6 3 12L14 9l2 3h5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                />
              </svg>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                Developer pulse
              </p>
              <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                DevPulse
              </h1>
            </div>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">{subtitle}</p>
        </div>
        <div className="font-mono text-xs text-muted">
          Sample workspace · local JSON history
        </div>
      </div>
    </header>
  )
}
