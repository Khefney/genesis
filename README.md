# DevPulse

<p align="center">
  <img src="public/favicon.svg" alt="DevPulse logo" width="64" height="64" />
</p>

<p align="center"><strong>DevPulse</strong> — a polished fictional developer productivity dashboard.</p>

<p align="center">Track sample project progress, daily development activity, streaks, and historical snapshots — all from local JSON.</p>

---

## Screenshots

> Placeholder: add a dashboard screenshot after you deploy or run locally.
>
> Suggested capture: the full desktop view showing stats, project cards, weekly chart, and activity timeline.

```text
┌──────────────────────────────────────────────────────────────┐
│  DevPulse                                                     │
│  [ Active projects ] [ Daily activity ] [ Streak ] [ Days ]   │
│  Project cards …………………   Weekly chart · Recent timeline      │
└──────────────────────────────────────────────────────────────┘
```

## Features

- **Dashboard overview** — active projects, daily activity, current streak, and total tracked days
- **Project progress** — fictional workstreams (Atlas API, Nova Dashboard, Orbit CLI, Prism Analytics) with status filtering
- **Recent activity timeline** — commits, reviews, deploys, and more
- **Weekly activity chart** — seven-day task rhythm from sample events
- **Daily snapshots** — append-only UTC history under `data/daily-snapshots.json` for a genuine activity log (not contribution farming)
- **Responsive layout** — works on desktop and mobile
- **Dark developer-tool aesthetic** — calm teal accents, Outfit + IBM Plex Mono, subtle motion

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4
- Vitest
- GitHub Actions (CI, daily snapshots, Pages deploy)

## Install

```bash
npm install
```

## Local development

```bash
npm run dev
```

Open the printed local URL (default Vite port unless overridden).

Useful scripts:

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview the production build |
| `npm run typecheck` | TypeScript project build check |
| `npm test` | Run Vitest unit tests |
| `npm run snapshot` | Generate today's UTC daily snapshot if missing |

## Testing

```bash
npm test
```

Coverage focuses on meaningful logic:

- streak calculation from snapshot history
- duplicate-date prevention in snapshot generation
- project progress normalization / averages / filtering

## GitHub Actions

### CI (`.github/workflows/ci.yml`)

On push/PR: install, typecheck, test, and build.

### Daily snapshot (`.github/workflows/daily-snapshot.yml`)

Runs once per day (cron) and on `workflow_dispatch`:

1. Install dependencies
2. Run `npm run snapshot`
3. Commit `data/daily-snapshots.json` only when it changed
4. Push to the default branch with message `chore(data): generate daily snapshot`

The script never writes a second row for the same UTC date.

### Pages (`.github/workflows/pages.yml`)

Builds the site and deploys `dist/` to GitHub Pages. Vite uses `base: './'` so asset paths work for project Pages sites without hardcoding a repository name.

## Deployment (GitHub Pages)

1. Push to `main` (or run the Pages workflow manually)
2. In the repository settings, set Pages source to **GitHub Actions**
3. After the workflow succeeds, open the Pages URL

For local verification of the production bundle:

```bash
npm run build && npm run preview
```

## Project structure

```text
data/
  projects.json
  activity.json
  daily-snapshots.json
scripts/
  generate-daily-snapshot.ts
src/
  components/
    ActivityChart.tsx
    ActivityTimeline.tsx
    Header.tsx
    ProjectCard.tsx
    ProjectGrid.tsx
    StatCard.tsx
  lib/
    activity.ts
    projects.ts
    streak.ts
  types/
    index.ts
  App.tsx
  main.tsx
  index.css
.github/workflows/
  ci.yml
  daily-snapshot.yml
  pages.yml
```

## Sample data note

All projects and events are fictional. Daily snapshots are a historical activity feature for the demo dashboard—useful for streaks and trends—not a mechanism for farming contributions.

## License

MIT
