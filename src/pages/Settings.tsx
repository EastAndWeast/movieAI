import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

export const Settings: React.FC = () => {
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    banana: '',
    jimeng: '',
  });
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">← 返回首页</Button>
          </Link>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-text mb-4">
            ⚙️ 工具设置
          </h1>
          <p className="text-lg text-gray-600">
            配置AI工具的API密钥，开始你的创作之旅
          </p>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-heading font-semibold text-text">ChatGPT / OpenAI</h3>
              <p className="text-gray-600">用于生成脚本和分镜提示词</p>
            </CardHeader>
            <CardContent>
              <Input
                label="API Key"
                placeholder="sk-..."
                type="password"
                value={apiKeys.openai}
                onChange={(e) => setApiKeys({ ...apiKeys, openai: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-2">
                获取API Key：<a href="https://platform.openai.com/api-keys" className="text-primary hover:underline" target="_blank">platform.openai.com</a>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className="text-xl font-heading font-semibold text-text">Banana / 图像生成</h3>
              <p className="text-gray-600">用于生成场景图像</p>
            </CardHeader>
            <CardContent>
              <Input
                label="API Key"
                placeholder="输入API Key"
                type="password"
                value={apiKeys.banana}
                onChange={(e) => setApiKeys({ ...apiKeys, banana: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-2">
                配置你的图像生成工具API
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className="text-xl font-heading font-semibold text-text">即梦 Seeddance 2.0</h3>
              <p className="text-gray-600">用于生成动态视频</p>
            </CardHeader>
            <CardContent>
              <Input
                label="API Key / 配置"
                placeholder="输入配置信息"
                type="password"
                value={apiKeys.jimeng}
                onChange={(e) => setApiKeys({ ...apiKeys, jimeng: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-2">
                配置视频生成工具
              </p>
            </CardContent>
          </Card>
          
          <div className="flex justify-center">
            <Button variant="primary" size="lg">
              保存设置
            </Button>
          </div>
        </div>
        
        <Card className="mt-12">
          <CardHeader>
            <h3 className="text-xl font-heading font-semibold text-text">使用提示</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h4 className="font-semibold text-text">先学习，再实践</h4>
                  <p>建议先去学习中心了解基础知识，再开始创建项目</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <h4 className="font-semibold text-text">安全第一</h4>
                  <p>你的API密钥只保存在本地浏览器中，不会上传到任何服务器</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h4 className="font-semibold text-text">循序渐进</h4>
                  <p>不要追求完美，先完成第一个简单的视频，再逐步提升</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
