import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { TUTORIALS, type Tutorial } from '../data/tutorials';

export const Learning: React.FC = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = ['all', ...new Set(TUTORIALS.map((t) => t.category))];
  
  const filteredTutorials = selectedCategory === 'all'
    ? TUTORIALS
    : TUTORIALS.filter((t) => t.category === selectedCategory);
  
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
  };
  
  const difficultyLabels = {
    beginner: '入门',
    intermediate: '进阶',
    advanced: '高级',
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">← 返回首页</Button>
          </Link>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-text mb-4">
            📚 学习中心
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            从零基础开始，学习电影制作的完整知识体系
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category === 'all' ? '全部' : category}
            </button>
          ))}
        </div>
        
        {!selectedTutorial ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial) => (
              <Card 
                key={tutorial.id} 
                hoverable
                onClick={() => setSelectedTutorial(tutorial)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-heading font-semibold text-text">
                      {tutorial.title}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${difficultyColors[tutorial.difficulty]}`}>
                      {difficultyLabels[tutorial.difficulty]}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{tutorial.description}</p>
                  <div className="text-xs text-gray-400">
                    分类：{tutorial.category}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedTutorial(null)}
              className="mb-6"
            >
              ← 返回教程列表
            </Button>
            
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-text">
                      {selectedTutorial.title}
                    </h2>
                    <p className="text-gray-600 mt-2">{selectedTutorial.description}</p>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${difficultyColors[selectedTutorial.difficulty]}`}>
                    {difficultyLabels[selectedTutorial.difficulty]}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  分类：{selectedTutorial.category}
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-line text-gray-700">
                    {selectedTutorial.content}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
