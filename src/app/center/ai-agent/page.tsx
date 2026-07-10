'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Loader2, Trash2 } from "lucide-react";
import AIAgent from "@/lib/integrations/ai-agent";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AIAgentChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: 'Xin chào! Tôi là AI Assistant y tế. Tôi sẵn sàng giúp bạn phân tích dữ liệu bệnh nhân, trả lời câu hỏi y tế, hoặc cung cấp các gợi ý chuyên môn. Bạn có câu hỏi gì không?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const agentRef = useRef<AIAgent | null>(null);

  useEffect(() => {
    agentRef.current = new AIAgent();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      if (agentRef.current) {
        const response = await agentRef.current.chat(input);
        const assistantMessage: Message = {
          id: `msg-${Date.now()}-response`,
          role: 'assistant',
          content: response,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: `msg-${Date.now()}-error`,
        role: 'assistant',
        content: 'Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại sau.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: '0',
        role: 'assistant',
        content: 'Xin chào! Tôi là AI Assistant y tế. Lịch sử trò chuyện đã được xóa. Bạn có câu hỏi gì không?',
        timestamp: new Date(),
      },
    ]);
    if (agentRef.current) {
      agentRef.current.clearHistory();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Chatbot */}
      <Card className="lg:col-span-2 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>AI Medical Assistant</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearHistory}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Xóa lịch sử
          </Button>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {msg.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {msg.role === 'user' && (
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src="https://picsum.photos/seed/doctor/100/100" />
                    <AvatarFallback>BS</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-lg">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Nhập câu hỏi của bạn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={loading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="gap-2"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Gợi ý</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start text-left h-auto py-3 whitespace-normal"
            onClick={() => setInput('Phân tích dữ liệu bệnh nhân Nguyễn Văn A')}
          >
            <span className="text-sm">Phân tích dữ liệu bệnh nhân</span>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-left h-auto py-3 whitespace-normal"
            onClick={() => setInput('Bệnh tim mạch có những triệu chứng nào?')}
          >
            <span className="text-sm">Triệu chứng bệnh tim mạch</span>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-left h-auto py-3 whitespace-normal"
            onClick={() => setInput('Phác đồ điều trị bệnh tiểu đường type 2')}
          >
            <span className="text-sm">Phác đồ điều trị</span>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-left h-auto py-3 whitespace-normal"
            onClick={() => setInput('Xét nghiệm nào cần cho bệnh nhân đau ngực')}
          >
            <span className="text-sm">Gợi ý xét nghiệm</span>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-left h-auto py-3 whitespace-normal"
            onClick={() => setInput('Cảnh báo về bệnh đái tháo đường')}
          >
            <span className="text-sm">Cảnh báo y tế</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AIAgentPage() {
  return (
    <main className="space-y-6 h-[calc(100vh-120px)]">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Medical Assistant</h1>
        <p className="text-muted-foreground mt-1">Trợ lý AI hỗ trợ phân tích y tế và trả lời câu hỏi</p>
      </div>

      <div className="flex-1 overflow-hidden">
        <AIAgentChatbot />
      </div>
    </main>
  );
}
