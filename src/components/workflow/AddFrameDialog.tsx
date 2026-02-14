import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input, Textarea } from '../ui/Input';
import type { StoryboardFrame, ShotType, CameraMovement, TransitionType } from '../../types';

interface AddFrameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (frame: StoryboardFrame) => void;
  nextFrameNumber: number;
}

const DEFAULT_FRAME: Omit<StoryboardFrame, 'id'> = {
  sceneNumber: 1,
  frameNumber: 1,
  title: '',
  description: '',
  shotType: 'medium',
  cameraMovement: 'static',
  duration: 3,
  transition: 'cut',
  dialogue: '',
  soundEffects: '',
  notes: '',
  imagePrompt: '',
};

export const AddFrameDialog: React.FC<AddFrameDialogProps> = ({
  isOpen,
  onClose,
  onAdd,
  nextFrameNumber,
}) => {
  const [newFrame, setNewFrame] = useState<Omit<StoryboardFrame, 'id'>>({
    ...DEFAULT_FRAME,
    frameNumber: nextFrameNumber,
  });
  
  if (!isOpen) return null;
  
  const handleAdd = () => {
    const frame: StoryboardFrame = {
      ...newFrame,
      id: Date.now().toString(),
    };
    onAdd(frame);
    setNewFrame({
      ...DEFAULT_FRAME,
      frameNumber: nextFrameNumber + 1,
    });
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-heading font-bold text-text">
            添加新分镜
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <Input
            label="镜头标题"
            placeholder="给这个镜头起个名字"
            value={newFrame.title}
            onChange={(e) => setNewFrame({ ...newFrame, title: e.target.value })}
          />
          
          <Textarea
            label="画面描述"
            placeholder="描述这个镜头中发生的事情..."
            value={newFrame.description}
            onChange={(e) => setNewFrame({ ...newFrame, description: e.target.value })}
            rows={3}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">镜头类型</label>
              <select
                value={newFrame.shotType}
                onChange={(e) => setNewFrame({ ...newFrame, shotType: e.target.value as ShotType })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              >
                <option value="wide">全景</option>
                <option value="medium">中景</option>
                <option value="close-up">近景</option>
                <option value="extreme-close-up">特写</option>
                <option value="over-shoulder">过肩</option>
                <option value="point-of-view">主观视角</option>
                <option value="aerial">航拍</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">摄像机运动</label>
              <select
                value={newFrame.cameraMovement}
                onChange={(e) => setNewFrame({ ...newFrame, cameraMovement: e.target.value as CameraMovement })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              >
                <option value="static">固定</option>
                <option value="pan-left">左摇</option>
                <option value="pan-right">右摇</option>
                <option value="tilt-up">上仰</option>
                <option value="tilt-down">下俯</option>
                <option value="zoom-in">推镜头</option>
                <option value="zoom-out">拉镜头</option>
                <option value="dolly-in">前移</option>
                <option value="dolly-out">后移</option>
                <option value="tracking">跟拍</option>
                <option value="crane">升降</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">时长（秒）</label>
              <input
                type="number"
                min="1"
                max="60"
                value={newFrame.duration}
                onChange={(e) => setNewFrame({ ...newFrame, duration: parseInt(e.target.value) || 3 })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">转场</label>
              <select
                value={newFrame.transition}
                onChange={(e) => setNewFrame({ ...newFrame, transition: e.target.value as TransitionType })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              >
                <option value="cut">切</option>
                <option value="fade">淡入淡出</option>
                <option value="dissolve">叠化</option>
                <option value="wipe">划变</option>
                <option value="zoom">缩放</option>
                <option value="slide">滑动</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button variant="primary" onClick={handleAdd}>
              添加分镜
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
