import { useEffect, useState } from 'react'
import { useSkillStore } from '../../stores/skillStore'
import { getSkills } from '../../services/skillService'
import { SkillCard } from './SkillCard'
import { SkillSearch } from './SkillSearch'
import { getTranslations } from '../../lib/i18n'
import { useLanguageStore } from '../../stores/languageStore'

export function SkillList() {
  const [search, setSearch] = useState('')
  const {
    skills,
    selectedSkillId,
    setSkills,
    selectSkill,
  } = useSkillStore()

  const language = useLanguageStore(
    (state) => state.language,
  )

  const t = getTranslations(language)

  useEffect(() => {
    let mounted = true

    getSkills().then((loadedSkills) => {
      if (mounted) {
        setSkills(loadedSkills)
      }
    })

    return () => {
      mounted = false
    }
  }, [setSkills])

  const filteredSkills = skills.filter((skill) => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return true
    }

    return (
      skill.name.toLowerCase().includes(query) ||
      skill.description.toLowerCase().includes(query) ||
      skill.category.toLowerCase().includes(query) ||
      skill.capabilities.some((capability) =>
        capability.toLowerCase().includes(query),
      )
    )
  })

  if (skills.length === 0) {
    return (
      <div className="px-2 py-3 text-xs text-zinc-400">
        {t.loadingSkills}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-2">
        <SkillSearch
          value={search}
          onChange={setSearch}
        />
      </div>

      {filteredSkills.length === 0 ? (
        <div className="px-2 py-3 text-xs text-zinc-400">
          {t.noSkillsFound}
        </div>
      ) : (
        <div className="space-y-1">
          {filteredSkills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              selected={skill.id === selectedSkillId}
              onSelect={() =>
                selectSkill(skill.id)
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}