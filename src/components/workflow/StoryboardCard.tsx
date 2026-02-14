import React from 'react';
import type { StoryboardFrame, ShotType, CameraMovement, TransitionType } from '../../types';

interface StoryboardCardProps {
  frame: StoryboardFrame;
  onEdit: (frame: StoryboardFrame) => void;
  onDelete: (id: string) => void;
  onDuplicate: (frame: StoryboardFrame) => void;
}

const SHOT_TYPE_LABELS: Record<ShotType, string> = {
  'wide': '全景',
  'medium': '中景',
  'close-up': '近景',
  'extreme-close-up': '特写',
  'over-shoulder': '过肩',
  'point-of-view': '主观视角',
  'aerial': '航拍',
};

const CAMERA_MOVEMENT_LABELS: Record<CameraMovement, string> = {
  'static': '固定',
  'pan-left': '左摇',
  'pan-right': '右摇',
  'tilt-up': '上仰',
  'tilt-down': '下俯',
  'zoom-in': '推镜头',
  'zoom-out': '拉镜头',
  'dolly-in': '前移',
  'dolly-out': '后移',
  'tracking': '跟拍',
  'crane': '升降',
};

const TRANSITION_LABELS: Record<TransitionType, string> = {
  'cut': '切',
  'fade': '淡入淡出',
  'dissolve': '叠化',
  'wipe': '划变',
  'zoom': '缩放',
  'slide': '滑动',
};

export const StoryboardCard: React.FC<StoryboardCardProps> = ({
  frame,
  onEdit,
  onDelete,
  onDuplicate,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-video bg-gray-100 flex items-center justify-center">
        {frame.imageUrl ? (
          <img 
            src={frame.imageUrl} 
            alt={frame.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400 text-center p-4">
            <div className="text-4xl mb-2">🎬</div>
            <div className="text-sm">镜头 {frame.frameNumber}</div>
          </div>
        )}
        <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
          #{frame.frameNumber}
        </div>
        <div className="absolute top-2 right-2 bg-primary/90 text-white px-2 py-1 rounded text-xs font-medium">
          {frame.duration}s
        </div>
      </div>
      
      <div className="p-4">
        <h4 className="font-heading font-semibold text-text mb-2 truncate">
          {frame.title || `镜头 ${frame.frameNumber}`}
        </h4>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {frame.description || '暂无描述'}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
            {SHOT_TYPE_LABELS[frame.shotType]}
          </span>
          <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
            {CAMERA_MOVEMENT_LABELS[frame.cameraMovement]}
          </span>
          <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">
            {TRANSITION_LABELS[frame.transition]}
          </span>
        </div>
        
        {frame.dialogue && (
          <div className="text-xs text-gray-500 mb-3 italic border-l-2 border-gray-200 pl-2">
            "{frame.dialogue}"
          </div>
        )}
        
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(frame)}
            className="flex-1 px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-lg hover:bg-primary/20 transition-colors cursor-pointer"
          >
            编辑
          </button>
          <button
            onClick={() => onDuplicate(frame)}
            className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            复制
          </button>
          <button
            onClick={() => onDelete(frame.id)}
            className="px-3 py-1.5 bg-red-50 text-red-600 text-sm rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  );
};
