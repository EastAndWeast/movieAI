import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Project, ProjectPhase, ProjectPhases } from '../types';
import type { WorkflowStep } from '../data/workflows';
import { WORKFLOW_STEPS } from '../data/workflows';

interface ProjectStore {
  projects: Project[];
  currentProjectId: string | null;
  workflowSteps: WorkflowStep[];
  
  createProject: (name: string, description: string) => Project;
  deleteProject: (id: string) => void;
  setCurrentProject: (id: string | null) => void;
  getCurrentProject: () => Project | null;
  
  updateProjectPhase: (phase: ProjectPhase) => void;
  updatePhaseData: <K extends keyof ProjectPhases>(phase: K, data: Partial<ProjectPhases[K]>) => void;
  
  updateWorkflowSteps: (project: Project) => void;
}

const createEmptyProject = (name: string, description: string): Project => {
  const id = Date.now().toString();
  return {
    id,
    name,
    description,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    currentPhase: 'planning',
    phases: {
      planning: {
        theme: '',
        targetAudience: '',
        duration: '',
        style: '',
        objectives: [],
      },
      script: {
        outline: '',
        scenes: [],
      },
      storyboard: {
        frames: [],
      },
      assets: {
        images: [],
        videos: [],
        audios: [],
      },
      editing: {
        timeline: [],
      },
      export: {
        format: 'mp4',
        resolution: '1920x1080',
        quality: 'high',
      },
    },
  };
};

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: [],
      currentProjectId: null,
      workflowSteps: WORKFLOW_STEPS,
      
      createProject: (name: string, description: string) => {
        const project = createEmptyProject(name, description);
        set((state) => ({
          projects: [...state.projects, project],
          currentProjectId: project.id,
        }));
        return project;
      },
      
      deleteProject: (id: string) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          currentProjectId: state.currentProjectId === id ? null : state.currentProjectId,
        }));
      },
      
      setCurrentProject: (id: string | null) => {
        set({ currentProjectId: id });
        if (id) {
          const project = get().projects.find((p) => p.id === id);
          if (project) {
            get().updateWorkflowSteps(project);
          }
        }
      },
      
      getCurrentProject: () => {
        const { projects, currentProjectId } = get();
        return projects.find((p) => p.id === currentProjectId) || null;
      },
      
      updateProjectPhase: (phase: ProjectPhase) => {
        const { currentProjectId, projects } = get();
        if (!currentProjectId) return;
        
        set((state) => ({
          projects: state.projects.map((p) => {
            if (p.id === currentProjectId) {
              const updated = { ...p, currentPhase: phase, updatedAt: new Date().toISOString() };
              get().updateWorkflowSteps(updated);
              return updated;
            }
            return p;
          }),
        }));
      },
      
      updatePhaseData: (phase, data) => {
        const { currentProjectId } = get();
        if (!currentProjectId) return;
        
        set((state) => ({
          projects: state.projects.map((p) => {
            if (p.id === currentProjectId) {
              return {
                ...p,
                updatedAt: new Date().toISOString(),
                phases: {
                  ...p.phases,
                  [phase]: {
                    ...p.phases[phase],
                    ...data,
                  },
                },
              };
            }
            return p;
          }),
        }));
      },
      
      updateWorkflowSteps: (project: Project) => {
        const phaseOrder: ProjectPhase[] = ['planning', 'script', 'storyboard', 'assets', 'editing', 'export'];
        const currentIndex = phaseOrder.indexOf(project.currentPhase);
        
        const steps = WORKFLOW_STEPS.map((step, index) => ({
          ...step,
          completed: index < currentIndex,
          current: index === currentIndex,
        }));
        
        set({ workflowSteps: steps });
      },
    }),
    {
      name: 'movie-ai-studio-projects',
    }
  )
);
