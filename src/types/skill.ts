export type SkillStatus = 'active' | 'inactive'

export type Skill = {
  id: string
  name: string
  description: string
  category: string
  icon: string
  status: SkillStatus
  capabilities: string[]
}