import type {
  Language,
  TranslationKeys,
} from '../types/i18n'

export const translations: Record<
  Language,
  TranslationKeys
> = {
  en: {
    appName: 'NeuroClawAlike',
    newConversation: 'New conversation',
    conversations: 'Conversations',
    searchConversations: 'Search conversations...',
    skills: 'Skills',
    searchSkills: 'Search skills...',
    noSkillsFound: 'No skills found.',
    startConversation: 'Start a conversation',
    askAgent: 'Ask the NeuroClaw agent to perform a task.',
    selectedSkill: 'Selected skill:',
    usingSkill: 'Using skill:',
    messagePlaceholder: 'Message NeuroClawAlike...',
    backendNotice:
      'NeuroClawAlike frontend prototype · Backend connection will be added later',
    agentExecution: 'Agent execution',
    understandRequest: 'Understand request',
    understandRequestDescription:
      'Analyzing the user request and determining the required operation.',
    selectSkill: 'Select skill',
    determiningSkill:
      'Determining which agent capability should handle the request.',
    executeTask: 'Execute task',
    runningOperation: 'Running the required operation.',
    returnResult: 'Return result',
    preparingResult:
      'Preparing the final result for the conversation.',
    planning: 'planning',
    running: 'running',
    completed: 'completed',
    failed: 'failed',
    today: 'Today',
    yesterday: 'Yesterday',
    justNow: 'Just now',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    closeSidebar: 'Close sidebar',
    openSidebar: 'Open sidebar',
    clearSearch: 'Clear search',
    sendMessage: 'Send message',
    processingWithSkill: 'Processing with {{skill}}',
    processingRequest: 'Processing request',
    runningWithSkill: 'Running the {{skill}} skill.',
    loadingSkills: 'Loading skills...',
    errorMessage: 'Something went wrong while processing your request.',
  },

  zh: {
    appName: 'NeuroClawAlike',
    newConversation: '新建对话',
    conversations: '对话',
    searchConversations: '搜索对话...',
    skills: '技能',
    searchSkills: '搜索技能...',
    noSkillsFound: '未找到技能。',
    startConversation: '开始对话',
    askAgent: '让 NeuroClaw 智能代理执行任务。',
    selectedSkill: '已选择技能：',
    usingSkill: '正在使用技能：',
    messagePlaceholder: '向 NeuroClawAlike 发送消息...',
    backendNotice:
      'NeuroClawAlike 前端原型 · 后端连接将在后续添加',
    agentExecution: '智能代理执行',
    understandRequest: '理解请求',
    understandRequestDescription:
      '正在分析用户请求并确定所需操作。',
    selectSkill: '选择技能',
    determiningSkill:
      '正在确定应该处理该请求的智能代理能力。',
    executeTask: '执行任务',
    runningOperation: '正在执行所需操作。',
    returnResult: '返回结果',
    preparingResult:
      '正在准备对话的最终结果。',
    planning: '规划中',
    running: '执行中',
    completed: '已完成',
    failed: '失败',
    today: '今天',
    yesterday: '昨天',
    justNow: '刚刚',
    switchToLight: '切换到浅色模式',
    switchToDark: '切换到深色模式',
    closeSidebar: '关闭侧边栏',
    openSidebar: '打开侧边栏',
    clearSearch: '清除搜索',
    sendMessage: '发送消息',
    processingWithSkill: '正在使用 {{skill}} 处理',
    processingRequest: '正在处理请求',
    runningWithSkill: '正在执行 {{skill}} 技能。',
    loadingSkills: '正在加载技能...',
    errorMessage: '处理您的请求时出错。',
  },
}

export function getTranslations(
  language: Language,
): TranslationKeys {
  return translations[language]
}