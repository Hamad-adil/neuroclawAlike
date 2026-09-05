import { create } from 'zustand'
import type { Language } from '../types/i18n'

type LanguageStore = {
  language: Language
  setLanguage: (language: Language) => void
}

const savedLanguage =
  localStorage.getItem('neuroclaw-language') as
    | Language
    | null

export const useLanguageStore =
  create<LanguageStore>((set) => ({
    language: savedLanguage ?? 'en',

    setLanguage: (language) => {
      localStorage.setItem(
        'neuroclaw-language',
        language,
      )

      set({
        language,
      })
    },
  }))