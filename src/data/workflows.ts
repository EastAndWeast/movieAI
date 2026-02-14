import type { ProjectPhase } from '../types';

export interface WorkflowStep {
  id: ProjectPhase;
  name: string;
  description: string;
  icon: string;
  completed: boolean;
  current: boolean;
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 'planning',
    name: '前期策划',
    description: '确定视频主题、目标受众、风格和时长',
    icon: '📋',
    completed: false,
    current: true,
  },
  {
    id: 'script',
    name: '剧本创作',
    description: '撰写故事大纲和详细脚本',
    icon: '✍️',
    completed: false,
    current: false,
  },
  {
    id: 'storyboard',
    name: '分镜设计',
    description: '创建分镜脚本和场景描述',
    icon: '🎨',
    completed: false,
    current: false,
  },
  {
    id: 'assets',
    name: '素材制作',
    description: '使用AI生成图像和视频素材',
    icon: '🎬',
    completed: false,
    current: false,
  },
  {
    id: 'editing',
    name: '后期制作',
    description: '剪辑、调色、添加音频和特效',
    icon: '✂️',
    completed: false,
    current: false,
  },
  {
    id: 'export',
    name: '导出发布',
    description: '导出视频并分享',
    icon: '📤',
    completed: false,
    current: false,
  },
];

export const PLANNING_CHECKLIST = [
  { id: 'theme', label: '确定视频主题', completed: false },
  { id: 'audience', label: '明确目标受众', completed: false },
  { id: 'duration', label: '设定视频时长', completed: false },
  { id: 'style', label: '选择视频风格', completed: false },
  { id: 'objectives', label: '列出制作目标', completed: false },
];

export const SCRIPT_TIPS = [
  '保持每一场景简洁明了',
  '明确角色和对话',
  '标注场景转换',
  '添加动作描述',
  '注明所需时长',
];

export const STORYBOARD_TIPS = [
  '每个镜头都要有明确的目的',
  '使用AI生成图像作为参考',
  '注明镜头运动',
  '标注持续时间',
  '添加转场说明',
];
