import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Input, Textarea } from '../ui/Input';
import type { StoryboardFrame, ShotType, CameraMovement, TransitionType } from '../../types';

interface StoryboardEditorProps {
  frame: StoryboardFrame | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (frame: StoryboardFrame) => void;
}

const SHOT_TYPES: { value: ShotType; label: string }[] = [
  { value: 'wide', label: '全景 (Wide Shot)' },
  { value: 'medium', label: '中景 (Medium Shot)' },
  { value: 'close-up', label: '近景 (Close-up)' },
  { value: 'extreme-close-up', label: '特写 (Extreme Close-up)' },
  { value: 'over-shoulder', label: '过肩镜头 (Over the Shoulder)' },
  { value: 'point-of-view', label: '主观视角 (POV)' },
  { value: 'aerial', label: '航拍 (Aerial)' },
];

const CAMERA_MOVEMENTS: { value: CameraMovement; label: string }[] = [
  { value: 'static', label: '固定 (Static)' },
  { value: 'pan-left', label: '左摇 (Pan Left)' },
  { value: 'pan-right', label: '右摇 (Pan Right)' },
  { value: 'tilt-up', label: '上仰 (Tilt Up)' },
  { value: 'tilt-down', label: '下俯 (Tilt Down)' },
  { value: 'zoom-in', label: '推镜头 (Zoom In)' },
  { value: 'zoom-out', label: '拉镜头 (Zoom Out)' },
  { value: 'dolly-in', label: '前移 (Dolly In)' },
  { value: 'dolly-out', label: '后移 (Dolly Out)' },
  { value: 'tracking', label: '跟拍 (Tracking)' },
  { value: 'crane', label: '升降 (Crane)' },
];

const TRANSITIONS: { value: TransitionType; label: string }[] = [
  { value: 'cut', label: '切 (Cut)' },
  { value: 'fade', label: '淡入淡出 (Fade)' },
  { value: 'dissolve', label: '叠化 (Dissolve)' },
  { value: 'wipe', label: '划变 (Wipe)' },
  { value: 'zoom', label: '缩放 (Zoom)' },
  { value: 'slide', label: '滑动 (Slide)' },
];

export const StoryboardEditor: React.FC<StoryboardEditorProps> = ({
  frame,
  isOpen,
  onClose,
  onSave,
}) => {
  const [editFrame, setEditFrame] = useState<StoryboardFrame | null>(null);
  
  useEffect(() => {
    if (frame) {
      setEditFrame({ ...frame });
    }
  }, [frame]);
  
  if (!isOpen || !editFrame) return null;
  
  const handleSave = () => {
    onSave(editFrame);
    onClose();
  };
  
  const generateImagePrompt = () => {
    const shotTypeText = SHOT_TYPES.find(s => s.value === editFrame.shotType)?.label.split(' ')[0] || '';
    const parts = [
      editFrame.description,
      shotTypeText,
      editFrame.notes,
      'cinematic lighting',
      'high quality',
      'film grain',
    ].filter(Boolean);
    
    setEditFrame({
      ...editFrame,
      imagePrompt: parts.join(', '),
    });
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-heading font-bold text-text">
            编辑分镜 #{editFrame.frameNumber}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input
                label="镜头标题"
                placeholder="给这个镜头起个名字"
                value={editFrame.title}
                onChange={(e) => setEditFrame({ ...editFrame, title: e.target.value })}
              />
              
              <Textarea
                label="画面描述"
                placeholder="描述这个镜头中发生的事情..."
                value={editFrame.description}
                onChange={(e) => setEditFrame({ ...editFrame, description: e.target.value })}
                rows={4}
              />
              
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">镜头类型</label>
                <select
                  value={editFrame.shotType}
                  onChange={(e) => setEditFrame({ ...editFrame, shotType: e.target.value as ShotType })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                >
                  {SHOT_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">摄像机运动</label>
                <select
                  value={editFrame.cameraMovement}
                  onChange={(e) => setEditFrame({ ...editFrame, cameraMovement: e.target.value as CameraMovement })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                >
                  {CAMERA_MOVEMENTS.map((movement) => (
                    <option key={movement.value} value={movement.value}>
                      {movement.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">时长（秒）</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={editFrame.duration}
                    onChange={(e) => setEditFrame({ ...editFrame, duration: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">转场</label>
                  <select
                    value={editFrame.transition}
                    onChange={(e) => setEditFrame({ ...editFrame, transition: e.target.value as TransitionType })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  >
                    {TRANSITIONS.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Textarea
                label="对白/旁白"
                placeholder="这个镜头中的对话或旁白..."
                value={editFrame.dialogue}
                onChange={(e) => setEditFrame({ ...editFrame, dialogue: e.target.value })}
                rows={3}
              />
              
              <Textarea
                label="音效"
                placeholder="背景音乐、环境音效等..."
                value={editFrame.soundEffects}
                onChange={(e) => setEditFrame({ ...editFrame, soundEffects: e.target.value })}
                rows={2}
              />
              
              <Textarea
                label="备注"
                placeholder="其他需要注意的细节..."
                value={editFrame.notes}
                onChange={(e) => setEditFrame({ ...editFrame, notes: e.target.value })}
                rows={2}
              />
              
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-text">AI图像提示词</label>
                  <button
                    onClick={generateImagePrompt}
                    className="text-xs text-primary hover:text-primary/80 cursor-pointer"
                  >
                    自动生成
                  </button>
                </div>
                <Textarea
                  placeholder="用于AI图像生成的提示词..."
                  value={editFrame.imagePrompt}
                  onChange={(e) => setEditFrame({ ...editFrame, imagePrompt: e.target.value })}
                  rows={4}
                />
              </div>
              
              <Input
                label="参考图片URL（可选）"
                placeholder="https://..."
                value={editFrame.referenceImageUrl || ''}
                onChange={(e) => setEditFrame({ ...editFrame, referenceImageUrl: e.target.value })}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button variant="primary" onClick={handleSave}>
              保存
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
