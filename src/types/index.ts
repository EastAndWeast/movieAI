export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  currentPhase: ProjectPhase;
  phases: ProjectPhases;
}

export type ProjectPhase = 
  | 'planning' 
  | 'script' 
  | 'storyboard' 
  | 'assets' 
  | 'editing' 
  | 'export';

export interface ProjectPhases {
  planning: PlanningData;
  script: ScriptData;
  storyboard: StoryboardData;
  assets: AssetsData;
  editing: EditingData;
  export: ExportData;
}

export interface PlanningData {
  theme: string;
  targetAudience: string;
  duration: string;
  style: string;
  objectives: string[];
}

export interface ScriptData {
  outline: string;
  scenes: Scene[];
}

export interface Scene {
  id: string;
  number: number;
  title: string;
  description: string;
  dialogue: string;
  duration: string;
}

export interface StoryboardData {
  frames: StoryboardFrame[];
}

export type ShotType = 
  | 'wide' 
  | 'medium' 
  | 'close-up' 
  | 'extreme-close-up'
  | 'over-shoulder'
  | 'point-of-view'
  | 'aerial';

export type CameraMovement = 
  | 'static'
  | 'pan-left'
  | 'pan-right'
  | 'tilt-up'
  | 'tilt-down'
  | 'zoom-in'
  | 'zoom-out'
  | 'dolly-in'
  | 'dolly-out'
  | 'tracking'
  | 'crane';

export type TransitionType = 
  | 'cut'
  | 'fade'
  | 'dissolve'
  | 'wipe'
  | 'zoom'
  | 'slide';

export interface StoryboardFrame {
  id: string;
  sceneNumber: number;
  frameNumber: number;
  title: string;
  description: string;
  shotType: ShotType;
  cameraMovement: CameraMovement;
  duration: number;
  transition: TransitionType;
  dialogue: string;
  soundEffects: string;
  notes: string;
  imagePrompt: string;
  imageUrl?: string;
  referenceImageUrl?: string;
}

export interface AssetsData {
  images: Asset[];
  videos: Asset[];
  audios: Asset[];
}

export interface Asset {
  id: string;
  name: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  createdAt: string;
  tags: string[];
}

export interface EditingData {
  timeline: TimelineItem[];
}

export interface TimelineItem {
  id: string;
  type: 'video' | 'audio' | 'image';
  assetId: string;
  startTime: number;
  duration: number;
}

export interface ExportData {
  format: string;
  resolution: string;
  quality: string;
  outputUrl?: string;
}

export interface AITool {
  id: string;
  name: string;
  description: string;
  type: 'script' | 'image' | 'video' | 'audio';
  apiKey?: string;
  endpoint?: string;
}
