import { Search, X } from 'lucide-react'
import { getTranslations } from '../../lib/i18n'
import { useLanguageStore } from '../../stores/languageStore'

type ConversationSearchProps = {
  value: string
  onChange: (value: string) => void
}

export function ConversationSearch({
  value,
  onChange,
}: ConversationSearchProps) {
      const language = useLanguageStore(
    (state) => state.language,
  )

  const t = getTranslations(language)
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />

      <input
        type="text"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={t.searchConversations}
        className="h-9 w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-8 text-xs outline-none transition focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-600"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-md text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          aria-label={t.clearSearch}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}