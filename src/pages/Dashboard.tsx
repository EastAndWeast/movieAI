import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useProjectStore } from '../store/projectStore';

export const Dashboard: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  
  const { projects, createProject, setCurrentProject } = useProjectStore();
  
  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      createProject(newProjectName, newProjectDesc);
      setShowCreateModal(false);
      setNewProjectName('');
      setNewProjectDesc('');
    }
  };
  
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-text mb-4">
            🎬 Movie AI Studio
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            学习电影制作，与AI协作，创造属于你的视频作品
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card hoverable>
            <CardContent className="text-center p-8">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-xl font-heading font-semibold text-text mb-2">学习中心</h3>
              <p className="text-gray-600 mb-4">了解电影制作的基础知识</p>
              <Link to="/learning">
                <Button variant="primary">开始学习</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card hoverable>
            <CardContent className="text-center p-8">
              <div className="text-5xl mb-4">🎥</div>
              <h3 className="text-xl font-heading font-semibold text-text mb-2">创建项目</h3>
              <p className="text-gray-600 mb-4">开始你的第一个视频项目</p>
              <Button variant="cta" onClick={() => setShowCreateModal(true)}>
                新建项目
              </Button>
            </CardContent>
          </Card>
          
          <Card hoverable>
            <CardContent className="text-center p-8">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-xl font-heading font-semibold text-text mb-2">AI工具</h3>
              <p className="text-gray-600 mb-4">配置和使用AI工具</p>
              <Link to="/settings">
                <Button variant="secondary">工具设置</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        {projects.length > 0 && (
          <div>
            <h2 className="text-2xl font-heading font-bold text-text mb-6">你的项目</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} hoverable>
                  <CardHeader>
                    <h3 className="text-lg font-heading font-semibold text-text">{project.name}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{project.description || '暂无描述'}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>当前阶段：{project.currentPhase}</span>
                      <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <Link to={`/project/${project.id}`}>
                      <Button 
                        variant="primary" 
                        size="sm" 
                        className="w-full"
                        onClick={() => setCurrentProject(project.id)}
                      >
                        继续编辑
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <h3 className="text-xl font-heading font-semibold text-text">创建新项目</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="项目名称"
                  placeholder="给你的视频起个名字"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                />
                <Input
                  label="项目描述"
                  placeholder="简单描述一下这个视频"
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                />
                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowCreateModal(false)}
                  >
                    取消
                  </Button>
                  <Button 
                    variant="primary" 
                    className="flex-1"
                    onClick={handleCreateProject}
                  >
                    创建
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
