import { Globe } from 'lucide-react'
import { useLanguageStore } from '../stores/languageStore'

export function LanguageSelector() {
  const {
    language,
    setLanguage,
  } = useLanguageStore()

  return (
    <div className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-1 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <Globe className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />

      <select
        value={language}
        onChange={(event) =>
          setLanguage(
            event.target.value as 'en' | 'zh',
          )
        }
        className="h-7 cursor-pointer bg-transparent text-xs font-medium text-zinc-700 outline-none dark:text-zinc-200"
        aria-label="Language"
      >
        <option value="en" className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">English</option>
        <option value="zh" className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">中文</option>
      </select>
    </div>
  )
}