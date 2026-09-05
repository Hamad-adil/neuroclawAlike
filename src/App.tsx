import { useEffect, useState } from 'react'
import {
  Check,
  ChevronDown,
  ChevronUp,
  Menu,
  MessageSquare,
  Moon,
  Plus,
  Send,
  Sun,
  X,
} from 'lucide-react'

import { TaskExecution } from './features/tasks/TaskExecution'
import { ConversationSearch } from './features/conversations/ConversationSearch'
import { SkillList } from './features/skills/SkillList'
import { sendMessageToMockAgent } from './services/mockAgentService'
import { useConversationStore } from './stores/conversationStore'
import { useSkillStore } from './stores/skillStore'
import type { AgentTask } from './types/agent'

function App() {
  const {
    conversations,
    activeConversationId,
    selectConversation,
    createConversation,
    addMessage,
  } = useConversationStore()

  const {
    skills,
    selectedSkillId,
  } = useSkillStore()

  const selectedSkill = skills.find(
    (skill) => skill.id === selectedSkillId,
  )

  const [input, setInput] = useState('')
    const [conversationSearch, setConversationSearch] =
    useState('')
  const [isSending, setIsSending] = useState(false)
  const [activeTask, setActiveTask] =
    useState<AgentTask | null>(null)

  const [sidebarOpen, setSidebarOpen] =
    useState(true)

  const [skillsOpen, setSkillsOpen] =
    useState(true)

  const [darkMode, setDarkMode] =
    useState(false)
  const filteredConversations =
    conversations.filter((conversation) => {
      const query = conversationSearch
        .trim()
        .toLowerCase()

      if (!query) {
        return true
      }

      const matchesTitle =
        conversation.title
          .toLowerCase()
          .includes(query)

      const matchesMessages =
        conversation.messages.some((message) =>
          message.content
            .toLowerCase()
            .includes(query),
        )

      return matchesTitle || matchesMessages
    })
  const activeConversation =
    conversations.find(
      (conversation) =>
        conversation.id ===
        activeConversationId,
    )

  useEffect(() => {
    document.documentElement.classList.toggle(
      'dark',
      darkMode,
    )
  }, [darkMode])

  async function handleSend() {
    const trimmedInput = input.trim()

    if (
      !trimmedInput ||
      !activeConversationId ||
      isSending
    ) {
      return
    }

    setInput('')
    setIsSending(true)

    addMessage(activeConversationId, {
      role: 'user',
      content: trimmedInput,
    })

    const task: AgentTask = {
      id: `task-${Date.now()}`,
      title: selectedSkill
        ? `Processing with ${selectedSkill.name}`
        : 'Processing request',
      status: 'planning',
      steps: [
        {
          id: 'step-1',
          title: 'Understand request',
          description:
            'Analyzing the user request and determining the required operation.',
          status: 'completed',
        },
        {
          id: 'step-2',
          title: 'Select skill',
          description: selectedSkill
            ? `Selected skill: ${selectedSkill.name}`
            : 'Determining which agent capability should handle the request.',
          status: 'running',
        },
        {
          id: 'step-3',
          title: 'Execute task',
          description: selectedSkill
            ? `Running the ${selectedSkill.name} skill.`
            : 'Running the required operation.',
          status: 'pending',
        },
        {
          id: 'step-4',
          title: 'Return result',
          description:
            'Preparing the final result for the conversation.',
          status: 'pending',
        },
      ],
    }

    setActiveTask(task)

    setTimeout(() => {
      setActiveTask({
        ...task,
        status: 'running',
        steps: [
          {
            ...task.steps[0],
            status: 'completed',
          },
          {
            ...task.steps[1],
            status: 'completed',
          },
          {
            ...task.steps[2],
            status: 'running',
          },
          {
            ...task.steps[3],
            status: 'pending',
          },
        ],
      })
    }, 700)

    try {
      const response =
        await sendMessageToMockAgent(
          trimmedInput,
        )

      addMessage(activeConversationId, {
        role: 'assistant',
        content: response.content,
      })

      setActiveTask({
        ...task,
        status: 'completed',
        steps: [
          {
            ...task.steps[0],
            status: 'completed',
          },
          {
            ...task.steps[1],
            status: 'completed',
          },
          {
            ...task.steps[2],
            status: 'completed',
          },
          {
            ...task.steps[3],
            status: 'completed',
          },
        ],
      })

      setTimeout(() => {
        setActiveTask(null)
      }, 2500)
    } catch {
      addMessage(activeConversationId, {
        role: 'assistant',
        content:
          'Something went wrong while processing your request.',
      })

      setActiveTask({
        ...task,
        status: 'failed',
        steps: task.steps.map(
          (step, index) => ({
            ...step,
            status:
              index < 2
                ? 'completed'
                : index === 2
                  ? 'failed'
                  : 'pending',
          }),
        ),
      })
    } finally {
      setIsSending(false)
    }
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) {
    if (
      event.key === 'Enter' &&
      !event.shiftKey
    ) {
      event.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white text-zinc-900 dark:bg-[#09090b] dark:text-zinc-100">

      {/* SIDEBAR */}
      {sidebarOpen && (
        <aside className="flex w-72 shrink-0 flex-col border-r border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-[#111113]">

          {/* SIDEBAR HEADER */}
          <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800">

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg brand-button">
                <MessageSquare className="h-4 w-4" />
              </div>

              <span className="text-sm font-semibold">
                NeuroClawAlike
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                setSidebarOpen(false)
              }
              className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* NEW CONVERSATION */}
          <div className="p-3">
            <button
              type="button"
              onClick={createConversation}
              className="brand-button flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition"
            >
              <Plus className="h-4 w-4" />
              New conversation
            </button>
          </div>

          {/* CONVERSATIONS */}
          <div className="min-h-0 flex-1 overflow-y-auto px-3">
              <div className="px-1 pb-2">
  <ConversationSearch
    value={conversationSearch}
    onChange={setConversationSearch}
  />
</div>
            <p className="px-2 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Conversations
            </p>

            <div className="space-y-1">
              {filteredConversations.map(
                (conversation) => (
                  <button
                    key={conversation.id}
                    type="button"
                    onClick={() =>
                      selectConversation(
                        conversation.id,
                      )
                    }
                    className={`w-full rounded-xl px-3 py-2.5 text-left transition ${
                      conversation.id ===
                      activeConversationId
                        ? 'bg-zinc-200 dark:bg-zinc-800'
                        : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                    }`}
                  >
                    <p className="truncate text-sm font-medium">
                      {conversation.title}
                    </p>

                    <p className="mt-1 text-xs text-zinc-400">
                      {conversation.updatedAt}
                    </p>
                  </button>
                ),
              )}
            </div>
          </div>

          {/* SKILLS PANEL */}
          <div className="border-t border-zinc-200 dark:border-zinc-800">

            <button
              type="button"
              onClick={() =>
                setSkillsOpen(!skillsOpen)
              }
              className="flex w-full items-center justify-between px-4 py-3 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Skills
                </span>

                {skills.length > 0 && (
                  <span className="rounded-full bg-zinc-200 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 dark:bg-zinc-800">
                    {skills.length}
                  </span>
                )}
              </div>

              {skillsOpen ? (
                <ChevronDown className="h-4 w-4 text-zinc-400" />
              ) : (
                <ChevronUp className="h-4 w-4 text-zinc-400" />
              )}
            </button>

            {skillsOpen && (
              <div className="max-h-64 overflow-y-auto px-3 pb-3">
                <SkillList />
              </div>
            )}
          </div>

        </aside>
      )}

      {/* MAIN CONTENT */}
      <main className="flex min-w-0 flex-1 flex-col">

        {/* TOP HEADER */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-[#09090b]">

          <div className="flex min-w-0 items-center">

            {!sidebarOpen && (
              <button
                type="button"
                onClick={() =>
                  setSidebarOpen(true)
                }
                className="mr-3 rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
                aria-label="Open sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}

            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold">
                {activeConversation?.title ??
                  'New conversation'}
              </h1>

              {selectedSkill && (
                <p className="mt-0.5 truncate text-xs text-zinc-400">
                  Skill: {selectedSkill.name}
                </p>
              )}
            </div>
          </div>

          {/* DARK MODE SWITCH */}
          <button
            type="button"
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className={`group relative flex h-9 w-[68px] shrink-0 items-center rounded-full border p-1 transition-all duration-300 ${
  darkMode
    ? 'border-zinc-700 bg-[#18181b]'
    : 'border-zinc-200 bg-zinc-100'
}`}
            aria-label={
              darkMode
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
          >
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full shadow-sm transition-all duration-300 ${
                darkMode
  ? 'translate-x-7 bg-zinc-950 text-blue-400'
  : 'translate-x-0 bg-white text-blue-600'
              }`}
            >
              {darkMode ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </div>

            <span className="sr-only">
              Toggle dark mode
            </span>
          </button>

        </header>

        {/* CHAT CONTENT */}
        <div className="min-h-0 flex-1 overflow-y-auto">

          <div className="mx-auto w-full max-w-3xl px-4 py-8">

            {activeTask && (
              <TaskExecution
                task={activeTask}
              />
            )}

            {!activeConversation ||
            activeConversation.messages.length ===
              0 ? (
              <div className="flex min-h-[50vh] items-center justify-center">

                <div className="text-center">

                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900">
                    <MessageSquare className="h-6 w-6 text-zinc-500" />
                  </div>

                  <h2 className="text-xl font-semibold">
                    Start a conversation
                  </h2>

                  <p className="mt-2 text-sm text-zinc-400">
                    Ask the NeuroClaw agent to
                    perform a task.
                  </p>

                  {selectedSkill && (
                    <p className="mt-3 text-xs text-zinc-500">
                      Selected skill:{' '}
                      <span className="font-medium">
                        {selectedSkill.name}
                      </span>
                    </p>
                  )}

                </div>

              </div>
            ) : (
              <div className="space-y-6">

                {activeConversation.messages.map(
                  (message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === 'user'
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >

                     <div
  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
    message.role === 'user'
      ? 'brand-button'
      : 'bg-zinc-100 text-zinc-800 dark:bg-[#18181b] dark:text-zinc-200'
  }`}
>

                        <p className="whitespace-pre-wrap text-sm leading-6">
                          {message.content}
                        </p>

                        <p
                          className={`mt-2 text-[10px] ${
                            message.role === 'user'
                              ? 'text-zinc-400 dark:text-zinc-500'
                              : 'text-zinc-400'
                          }`}
                        >
                          {message.timestamp}
                        </p>

                      </div>

                    </div>
                  ),
                )}

                {isSending && (
                  <div className="flex justify-start">

                    <div className="rounded-2xl bg-zinc-100 px-4 py-3 dark:bg-[#18181b]">

                      <div className="flex items-center gap-1">

                        <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400" />

                        <span
                          className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"
                          style={{
                            animationDelay:
                              '120ms',
                          }}
                        />

                        <span
                          className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"
                          style={{
                            animationDelay:
                              '240ms',
                          }}
                        />

                      </div>

                    </div>

                  </div>
                )}

              </div>
            )}

          </div>

        </div>

        {/* MESSAGE INPUT */}
        <div className="border-t border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-[#09090b]">

          <div className="mx-auto max-w-3xl">

            {selectedSkill && (
              <div className="mb-2 flex items-center gap-2 text-xs text-zinc-400">

                <span>
                  Using skill:
                </span>

                <span className="rounded-full bg-zinc-100 px-2.5 py-1 font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
                  {selectedSkill.name}
                </span>

              </div>
            )}

            <div className="flex items-end gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-2 transition focus-within:border-blue-500 dark:border-zinc-800 dark:bg-[#18181b] dark:focus-within:border-blue-500">

              <textarea
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Message NeuroClawAlike..."
                rows={1}
                disabled={isSending}
                className="max-h-40 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-zinc-400 disabled:cursor-not-allowed"
              />

              <button
                type="button"
                onClick={handleSend}
                disabled={
                  !input.trim() ||
                  isSending
                }
                className="brand-button flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>

            </div>

            <p className="mt-2 text-center text-[10px] text-zinc-400">
              NeuroClawAlike frontend prototype · Backend
              connection will be added later
            </p>

          </div>

        </div>

      </main>
    </div>
  )
}

export default App