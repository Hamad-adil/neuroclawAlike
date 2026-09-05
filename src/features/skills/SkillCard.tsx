import {
  BarChart3,
  FileSearch,
  Image,
  Scan,
} from 'lucide-react'
import type { Skill } from '../../types/skill'
import { getSkillDisplayTranslation } from '../../lib/skillTranslations'
import { useLanguageStore } from '../../stores/languageStore'

type SkillCardProps = {
  skill: Skill
  selected: boolean
  onSelect: () => void
}

const icons = {
  scan: Scan,
  image: Image,
  chart: BarChart3,
  file: FileSearch,
}

export function SkillCard({
  skill,
  selected,
  onSelect,
}: SkillCardProps) {
  const language = useLanguageStore(
    (state) => state.language,
  )

  const display = getSkillDisplayTranslation(language, skill.id)
  const Icon = icons[skill.icon as keyof typeof icons] ?? FileSearch

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-xl border p-3 text-left transition ${
        selected
          ? 'border-zinc-400 bg-white shadow-sm dark:border-zinc-600 dark:bg-zinc-950'
          : 'border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
            selected
              ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
              : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'
          }`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm font-medium">
              {display?.name ?? skill.name}
            </p>

            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
          </div>

          <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-400">
            {display?.description ?? skill.description}
          </p>
        </div>
      </div>
    </button>
  )
}