import React from 'react';
import type { WorkflowStep, ProjectPhase } from '../../data/workflows';

interface WorkflowNavProps {
  steps: WorkflowStep[];
  currentStep: ProjectPhase;
  onStepClick: (step: ProjectPhase) => void;
}

export const WorkflowNav: React.FC<WorkflowNavProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <h3 className="text-lg font-heading font-semibold text-text mb-4">制作流程</h3>
      <div className="space-y-2">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => onStepClick(step.id)}
            className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
              step.current
                ? 'bg-primary/10 border-2 border-primary'
                : step.completed
                ? 'bg-green-50 border-2 border-green-200'
                : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step.current
                ? 'bg-primary text-white'
                : step.completed
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}>
              {step.completed ? '✓' : index + 1}
            </div>
            <div className="flex-1">
              <div className={`font-semibold ${step.current ? 'text-primary' : 'text-text'}`}>
                {step.name}
              </div>
              <div className="text-xs text-gray-500">{step.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
