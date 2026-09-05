import { create } from 'zustand'
import type { Skill } from '../types/skill'

type SkillStore = {
  skills: Skill[]
  selectedSkillId: string | null
  setSkills: (skills: Skill[]) => void
  selectSkill: (skillId: string | null) => void
}

export const useSkillStore = create<SkillStore>((set) => ({
  skills: [],
  selectedSkillId: null,

  setSkills: (skills) =>
    set({
      skills,
    }),

  selectSkill: (skillId) =>
    set({
      selectedSkillId: skillId,
    }),
}))