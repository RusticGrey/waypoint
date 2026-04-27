'use client';

import { useState, useRef, useEffect } from 'react';
import { ux } from '@/lib/ux';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  MessageSquare, Send, Loader2, Bot, User, 
  Sparkles, Trash2, Info
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface CollegeChatInterfaceProps {
  colleges: any[];
}

export function CollegeChatInterface({ colleges }: CollegeChatInterfaceProps) {
  const [selectedCollege, setSelectedCollege] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!selectedCollege || !input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('/api/counselor/college-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collegeId: selectedCollege,
          query: userMessage,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
      } else {
        throw new Error(data.error || 'Failed to get answer');
      }
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <Card className={cn(ux.card.base, "flex flex-col h-[600px] overflow-hidden")}>
      <CardHeader className="border-b border-slate-100 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-brand-600" />
            </div>
            <div>
              <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-900">Knowledge Chat</CardTitle>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Query the Knowledge Repository</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select 
              className={cn(ux.form.input, "h-9 py-1 text-xs w-48")}
              value={selectedCollege}
              onChange={(e) => {
                setSelectedCollege(e.target.value);
                clearChat();
              }}
            >
              <option value="">Select a college...</option>
              {colleges.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <Button variant="ghost" onClick={clearChat} className="h-9 w-9 p-0 text-slate-400 hover:text-red-500">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden p-0 flex flex-col bg-slate-50/30">
        {/* Chat area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-4"
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-brand-400" />
              </div>
              <div className="max-w-[240px]">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Assistant Ready</p>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">
                  Select a college and ask anything about its admissions, academics, or financial aid.
                </p>
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div 
                key={i} 
                className={cn(
                  "flex items-start gap-3 max-w-[85%]",
                  msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm",
                  msg.role === 'assistant' ? "bg-brand-600 text-white" : "bg-white text-slate-600"
                )}>
                  {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className={cn(
                  "p-4 rounded-2xl text-sm leading-relaxed",
                  msg.role === 'assistant' 
                    ? "bg-white border border-slate-100 text-slate-800 shadow-sm rounded-tl-none" 
                    : "bg-brand-600 text-white shadow-md rounded-tr-none"
                )}>
                  {msg.content}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex items-start gap-3 mr-auto max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
                <Loader2 className="w-4 h-4 animate-spin text-brand-600" />
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2"
          >
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={selectedCollege ? "Ask about this college..." : "Select a college first..."}
              disabled={!selectedCollege || loading}
              className="flex-1 h-12 bg-slate-50 border-transparent focus:bg-white focus:border-brand-300 transition-all rounded-xl"
            />
            <Button 
              type="submit" 
              disabled={!selectedCollege || !input.trim() || loading}
              className="w-12 h-12 p-0 flex items-center justify-center rounded-xl shadow-lg shadow-brand-200"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </Button>
          </form>
          {!selectedCollege && (
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-2 text-center">
              Please select a college from the dropdown to start chatting.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
