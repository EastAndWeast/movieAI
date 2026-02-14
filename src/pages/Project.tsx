import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Input, Textarea } from '../components/ui/Input';
import { WorkflowNav } from '../components/workflow/WorkflowNav';
import { StoryboardCard } from '../components/workflow/StoryboardCard';
import { StoryboardEditor } from '../components/workflow/StoryboardEditor';
import { AddFrameDialog } from '../components/workflow/AddFrameDialog';
import { useProjectStore } from '../store/projectStore';
import type { ProjectPhase, StoryboardFrame } from '../types';
import { PLANNING_CHECKLIST, SCRIPT_TIPS, STORYBOARD_TIPS } from '../data/workflows';

export const Project: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    setCurrentProject, 
    workflowSteps,
    updateProjectPhase,
    updatePhaseData,
    getCurrentProject
  } = useProjectStore();
  
  const [editingFrame, setEditingFrame] = useState<StoryboardFrame | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  useEffect(() => {
    if (id) {
      setCurrentProject(id);
    }
  }, [id, setCurrentProject]);
  
  const project = getCurrentProject();
  
  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold text-text mb-4">项目不存在</h2>
          <Link to="/">
            <Button>返回首页</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const handlePhaseChange = (phase: ProjectPhase) => {
    updateProjectPhase(phase);
  };
  
  const handleAddFrame = (frame: StoryboardFrame) => {
    const updatedFrames = [...project.phases.storyboard.frames, frame];
    updatePhaseData('storyboard', { frames: updatedFrames });
  };
  
  const handleEditFrame = (frame: StoryboardFrame) => {
    setEditingFrame(frame);
    setIsEditorOpen(true);
  };
  
  const handleSaveFrame = (frame: StoryboardFrame) => {
    const updatedFrames = project.phases.storyboard.frames.map(f => 
      f.id === frame.id ? frame : f
    );
    updatePhaseData('storyboard', { frames: updatedFrames });
    setEditingFrame(null);
  };
  
  const handleDeleteFrame = (id: string) => {
    const updatedFrames = project.phases.storyboard.frames.filter(f => f.id !== id);
    updatePhaseData('storyboard', { frames: updatedFrames });
  };
  
  const handleDuplicateFrame = (frame: StoryboardFrame) => {
    const newFrame: StoryboardFrame = {
      ...frame,
      id: Date.now().toString(),
      frameNumber: project.phases.storyboard.frames.length + 1,
    };
    const updatedFrames = [...project.phases.storyboard.frames, newFrame];
    updatePhaseData('storyboard', { frames: updatedFrames });
  };
  
  const handleMoveFrame = (index: number, direction: 'up' | 'down') => {
    const frames = [...project.phases.storyboard.frames];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= frames.length) return;
    
    [frames[index], frames[newIndex]] = [frames[newIndex], frames[index]];
    
    const reorderedFrames = frames.map((f, i) => ({ ...f, frameNumber: i + 1 }));
    updatePhaseData('storyboard', { frames: reorderedFrames });
  };
  
  const handleExportStoryboard = () => {
    const data = JSON.stringify(project.phases.storyboard, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name}_storyboard.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const renderPlanningPhase = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-xl font-heading font-semibold text-text">前期策划</h3>
          <p className="text-gray-600">回答以下问题，帮助你理清思路</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="视频主题"
            placeholder="这个视频要讲什么？"
            value={project.phases.planning.theme}
            onChange={(e) => updatePhaseData('planning', { theme: e.target.value })}
          />
          <Input
            label="目标受众"
            placeholder="谁会看这个视频？"
            value={project.phases.planning.targetAudience}
            onChange={(e) => updatePhaseData('planning', { targetAudience: e.target.value })}
          />
          <Input
            label="视频时长"
            placeholder="例如：1分钟、3分钟、5分钟"
            value={project.phases.planning.duration}
            onChange={(e) => updatePhaseData('planning', { duration: e.target.value })}
          />
          <Input
            label="视频风格"
            placeholder="例如：教育、娱乐、宣传、vlog"
            value={project.phases.planning.style}
            onChange={(e) => updatePhaseData('planning', { style: e.target.value })}
          />
          <Textarea
            label="制作目标"
            placeholder="你希望通过这个视频达到什么目标？"
            value={project.phases.planning.objectives.join('\n')}
            onChange={(e) => updatePhaseData('planning', { objectives: e.target.value.split('\n') })}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <h3 className="text-lg font-heading font-semibold text-text">检查清单</h3>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {PLANNING_CHECKLIST.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 rounded" />
                <span className="text-text">{item.label}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button variant="cta" onClick={() => handlePhaseChange('script')}>
          下一步：写剧本 →
        </Button>
      </div>
    </div>
  );
  
  const renderScriptPhase = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-xl font-heading font-semibold text-text">剧本创作</h3>
          <p className="text-gray-600">把你的故事写下来</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            label="故事大纲"
            placeholder="用几句话概括整个故事..."
            value={project.phases.script.outline}
            onChange={(e) => updatePhaseData('script', { outline: e.target.value })}
            rows={6}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <h3 className="text-lg font-heading font-semibold text-text">写作提示</h3>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-gray-600">
            {SCRIPT_TIPS.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">💡</span>
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => handlePhaseChange('planning')}>
          ← 上一步
        </Button>
        <Button variant="cta" onClick={() => handlePhaseChange('storyboard')}>
          下一步：分镜设计 →
        </Button>
      </div>
    </div>
  );
  
  const renderStoryboardPhase = () => {
    const frames = project.phases.storyboard.frames;
    const totalDuration = frames.reduce((sum, f) => sum + f.duration, 0);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-heading font-semibold text-text">分镜设计</h3>
            <p className="text-gray-600">
              共 {frames.length} 个镜头，总时长约 {totalDuration} 秒
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExportStoryboard}>
              导出
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsAddDialogOpen(true)}>
              + 添加分镜
            </Button>
          </div>
        </div>
        
        {frames.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-5xl mb-4">🎬</div>
              <h4 className="text-lg font-heading font-semibold text-text mb-2">
                还没有分镜
              </h4>
              <p className="text-gray-600 mb-4">点击"添加分镜"开始规划你的镜头</p>
              <Button variant="primary" onClick={() => setIsAddDialogOpen(true)}>
                + 添加第一个分镜
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {frames.map((frame, index) => (
              <div key={frame.id} className="relative">
                <StoryboardCard
                  frame={frame}
                  onEdit={handleEditFrame}
                  onDelete={handleDeleteFrame}
                  onDuplicate={handleDuplicateFrame}
                />
                <div className="absolute top-2 right-14 flex gap-1">
                  {index > 0 && (
                    <button
                      onClick={() => handleMoveFrame(index, 'up')}
                      className="w-6 h-6 bg-white/90 rounded shadow text-xs hover:bg-white cursor-pointer"
                      title="上移"
                    >
                      ↑
                    </button>
                  )}
                  {index < frames.length - 1 && (
                    <button
                      onClick={() => handleMoveFrame(index, 'down')}
                      className="w-6 h-6 bg-white/90 rounded shadow text-xs hover:bg-white cursor-pointer"
                      title="下移"
                    >
                      ↓
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <Card>
          <CardHeader>
            <h3 className="text-lg font-heading font-semibold text-text">设计提示</h3>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-600">
              {STORYBOARD_TIPS.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">💡</span>
                  {tip}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => handlePhaseChange('script')}>
            ← 上一步
          </Button>
          <Button variant="cta" onClick={() => handlePhaseChange('assets')}>
            下一步：素材制作 →
          </Button>
        </div>
        
        <StoryboardEditor
          frame={editingFrame}
          isOpen={isEditorOpen}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingFrame(null);
          }}
          onSave={handleSaveFrame}
        />
        
        <AddFrameDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onAdd={handleAddFrame}
          nextFrameNumber={frames.length + 1}
        />
      </div>
    );
  };
  
  const renderDefaultPhase = () => (
    <div className="space-y-6">
      <Card>
        <CardContent className="text-center py-12">
          <div className="text-5xl mb-4">🚧</div>
          <h3 className="text-xl font-heading font-semibold text-text mb-2">
            功能开发中
          </h3>
          <p className="text-gray-600">这个阶段的功能正在开发中，敬请期待！</p>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        {project.currentPhase !== 'planning' && (
          <Button variant="outline" onClick={() => {
            const phases: ProjectPhase[] = ['planning', 'script', 'storyboard', 'assets', 'editing', 'export'];
            const currentIndex = phases.indexOf(project.currentPhase);
            if (currentIndex > 0) {
              handlePhaseChange(phases[currentIndex - 1]);
            }
          }}>
            ← 上一步
          </Button>
        )}
      </div>
    </div>
  );
  
  const renderPhaseContent = () => {
    switch (project.currentPhase) {
      case 'planning':
        return renderPlanningPhase();
      case 'script':
        return renderScriptPhase();
      case 'storyboard':
        return renderStoryboardPhase();
      default:
        return renderDefaultPhase();
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="outline" size="sm">← 返回</Button>
              </Link>
              <div>
                <h1 className="text-2xl font-heading font-bold text-text">{project.name}</h1>
                <p className="text-sm text-gray-500">{project.description}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-6">
          <div className="w-72 flex-shrink-0">
            <WorkflowNav 
              steps={workflowSteps}
              currentStep={project.currentPhase}
              onStepClick={handlePhaseChange}
            />
          </div>
          
          <div className="flex-1">
            {renderPhaseContent()}
          </div>
        </div>
      </div>
    </div>
  );
};
