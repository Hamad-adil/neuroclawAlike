export type AgentResponse = {
  content: string
  delay: number
}

export async function sendMessageToMockAgent(
  message: string,
): Promise<AgentResponse> {
  const normalizedMessage = message.toLowerCase()

  let content =
    "I received your request. The NeuroClaw backend is not connected yet, so this is a simulated agent response."

  if (normalizedMessage.includes('hello') || normalizedMessage.includes('hi')) {
    content =
      'Hello! I am NeuroClawAlike. The frontend is working correctly, and I am ready to connect to the real agent backend.'
  } else if (
    normalizedMessage.includes('dicom') ||
    normalizedMessage.includes('medical image')
  ) {
    content =
      'I can handle DICOM analysis workflows. Once the backend is connected, this conversation can trigger the appropriate analysis skill and return the results here.'
  } else if (
    normalizedMessage.includes('image') ||
    normalizedMessage.includes('process')
  ) {
    content =
      'I can simulate an image-processing task. The future backend can send execution steps, progress updates, logs, and generated files to this interface.'
  } else if (
    normalizedMessage.includes('task') ||
    normalizedMessage.includes('execute')
  ) {
    content =
      'Task received. A real NeuroClaw agent could now create an execution plan, run tools or skills, report progress, and return the final result.'
  }

  await new Promise((resolve) => {
    setTimeout(resolve, 1200)
  })

  return {
    content,
    delay: 1200,
  }
}