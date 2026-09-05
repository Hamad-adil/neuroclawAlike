import type { Language } from '../types/i18n'

export type SkillDisplayTranslation = {
  name: string
  description: string
  category: string
  capabilities: string[]
}

export type SkillDisplayTranslations = {
  [skillId: string]: {
    en: SkillDisplayTranslation
    zh: SkillDisplayTranslation
  }
}

export const skillDisplayTranslations: SkillDisplayTranslations = {
  'dicom-analysis': {
    en: {
      name: 'DICOM Analysis',
      description: 'Analyze and inspect DICOM medical imaging data.',
      category: 'Medical Imaging',
      capabilities: [
        'DICOM metadata extraction',
        'Medical image inspection',
        'Image analysis',
        'Report preparation',
      ],
    },
    zh: {
      name: 'DICOM 分析',
      description: '分析和检查 DICOM 医学影像数据。',
      category: '医学影像',
      capabilities: [
        'DICOM 元数据提取',
        '医学影像检查',
        '图像分析',
        '报告准备',
      ],
    },
  },
  'image-processing': {
    en: {
      name: 'Image Processing',
      description: 'Process, transform, and analyze image files.',
      category: 'Image',
      capabilities: [
        'Image transformation',
        'Image enhancement',
        'Format conversion',
        'Image analysis',
      ],
    },
    zh: {
      name: '图像处理',
      description: '处理、转换和分析图像文件。',
      category: '图像',
      capabilities: [
        '图像变换',
        '图像增强',
        '格式转换',
        '图像分析',
      ],
    },
  },
  'data-analysis': {
    en: {
      name: 'Data Analysis',
      description: 'Analyze datasets and generate useful insights.',
      category: 'Data',
      capabilities: [
        'Dataset inspection',
        'Statistical analysis',
        'Data processing',
        'Result summarization',
      ],
    },
    zh: {
      name: '数据分析',
      description: '分析数据集并生成有用的见解。',
      category: '数据',
      capabilities: [
        '数据集检查',
        '统计分析',
        '数据处理',
        '结果汇总',
      ],
    },
  },
  'file-analysis': {
    en: {
      name: 'File Analysis',
      description: 'Inspect and analyze uploaded files.',
      category: 'Files',
      capabilities: [
        'File inspection',
        'Content extraction',
        'Document analysis',
        'Structured results',
      ],
    },
    zh: {
      name: '文件分析',
      description: '检查和分析上传的文件。',
      category: '文件',
      capabilities: [
        '文件检查',
        '内容提取',
        '文档分析',
        '结构化结果',
      ],
    },
  },
}

export function getSkillDisplayTranslation(
  language: Language,
  skillId: string,
): SkillDisplayTranslation | undefined {
  return skillDisplayTranslations[skillId]?.[language]
}
