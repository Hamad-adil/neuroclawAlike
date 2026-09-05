import type { Skill } from '../types/skill'

const mockSkills: Skill[] = [
  {
    id: 'dicom-analysis',
    name: 'DICOM Analysis',
    description: 'Analyze and inspect DICOM medical imaging data.',
    category: 'Medical Imaging',
    icon: 'scan',
    status: 'active',
    capabilities: [
      'DICOM metadata extraction',
      'Medical image inspection',
      'Image analysis',
      'Report preparation',
    ],
  },
  {
    id: 'image-processing',
    name: 'Image Processing',
    description: 'Process, transform, and analyze image files.',
    category: 'Image',
    icon: 'image',
    status: 'active',
    capabilities: [
      'Image transformation',
      'Image enhancement',
      'Format conversion',
      'Image analysis',
    ],
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    description: 'Analyze datasets and generate useful insights.',
    category: 'Data',
    icon: 'chart',
    status: 'active',
    capabilities: [
      'Dataset inspection',
      'Statistical analysis',
      'Data processing',
      'Result summarization',
    ],
  },
  {
    id: 'file-analysis',
    name: 'File Analysis',
    description: 'Inspect and analyze uploaded files.',
    category: 'Files',
    icon: 'file',
    status: 'active',
    capabilities: [
      'File inspection',
      'Content extraction',
      'Document analysis',
      'Structured results',
    ],
  },
]

export async function getSkills(): Promise<Skill[]> {
  await new Promise((resolve) => {
    setTimeout(resolve, 300)
  })

  return mockSkills
}