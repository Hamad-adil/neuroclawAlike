import { create } from 'zustand'

export type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export type Conversation = {
  id: string
  title: string
  updatedAt: string
  messages: Message[]
}

type ConversationStore = {
  conversations: Conversation[]
  activeConversationId: string | null
  selectConversation: (id: string) => void
  createConversation: () => void
  addMessage: (
    conversationId: string,
    message: Omit<Message, 'id' | 'timestamp'>,
  ) => void
}

const initialConversations: Conversation[] = [
  {
    id: 'conversation-1',
    title: 'Welcome to NeuroClawAlike',
    updatedAt: 'Today',
    messages: [
      {
        id: 'message-1',
        role: 'assistant',
        content:
          'Welcome to NeuroClawAlike. How can I help you today?',
        timestamp: '10:30 AM',
      },
    ],
  },
  {
    id: 'conversation-2',
    title: 'DICOM image analysis',
    updatedAt: 'Today',
    messages: [
      {
        id: 'message-2',
        role: 'user',
        content: 'Analyze these DICOM files.',
        timestamp: '9:45 AM',
      },
      {
        id: 'message-3',
        role: 'assistant',
        content:
          'I can help analyze the DICOM files once they are provided.',
        timestamp: '9:46 AM',
      },
    ],
  },
  {
    id: 'conversation-3',
    title: 'Image processing task',
    updatedAt: 'Yesterday',
    messages: [
      {
        id: 'message-4',
        role: 'user',
        content: 'Prepare an image processing workflow.',
        timestamp: 'Yesterday',
      },
      {
        id: 'message-5',
        role: 'assistant',
        content:
          'I can prepare the workflow and organize the required processing steps.',
        timestamp: 'Yesterday',
      },
    ],
  },
]

export const useConversationStore = create<ConversationStore>((set) => ({
  conversations: initialConversations,
  activeConversationId: 'conversation-1',

  selectConversation: (id) =>
    set({
      activeConversationId: id,
    }),

  createConversation: () => {
    const id = `conversation-${Date.now()}`

    const newConversation: Conversation = {
      id,
      title: 'New conversation',
      updatedAt: 'Just now',
      messages: [],
    }

    set((state) => ({
      conversations: [newConversation, ...state.conversations],
      activeConversationId: id,
    }))
  },

  addMessage: (conversationId, message) =>
    set((state) => ({
      conversations: state.conversations.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              messages: [
                ...conversation.messages,
                {
                  ...message,
                  id: `message-${Date.now()}`,
                  timestamp: new Date().toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: '2-digit',
                  }),
                },
              ],
              updatedAt: 'Just now',
            }
          : conversation,
      ),
    })),
}))