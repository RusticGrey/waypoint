'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, Send, Loader2, Database, 
  MessageSquare, User, Bot, AlertCircle,
  GraduationCap, FileJson, CheckCircle2, X, Trash2
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface CollegeKnowledgeChatProps {
  isOpen?: boolean;
  onClose?: () => void;
  isFloating?: boolean;
}

export function CollegeKnowledgeChat({ isOpen, onClose, isFloating = false }: CollegeKnowledgeChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  
  // Query History Recall
  const [queryHistory, setQueryHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState(-1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [modelUsed, setModelUsed] = useState<string>('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "What is the early decision deadline for CMU?",
    "Compare acceptance rates for Business vs CS",
    "Show me the SAT math 75th percentile",
    "What makes the culture unique at MIT?",
  ];

  const categories = [
    { id: 'all', label: 'General', icon: Sparkles },
    { id: 'institutional_identity', label: 'Identity', icon: GraduationCap },
    { id: 'rankings_comprehensive', label: 'Rankings', icon: FileJson },
    { id: 'admissions_engine', label: 'Admissions', icon: CheckCircle2 },
    { id: 'financial_profile', label: 'Financial', icon: Database },
  ];

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: `Hello! I am Beacon AI. I can answer questions about any college using verified data from across the Knowledge Repository. What would you like to know?`,
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    // Update query history
    setQueryHistory(prev => {
      const filtered = prev.filter(q => q !== input);
      return [input, ...filtered].slice(0, 50); // Keep last 50 unique queries
    });
    setHistoryPointer(-1);

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/counselor/colleges/knowledge-chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            query: userMessage.content,
            category: activeCategory !== 'all' ? activeCategory : undefined,
            history: messages.map(m => ({ role: m.role, content: m.content })) // Send all history for agentic continuity
        }),
      });

      if (!response.ok) throw new Error('Failed to get response from assistant');

      const data = await response.json();
      if (data.modelUsed) setModelUsed(data.modelUsed);
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.answer,
        timestamp: new Date()
      }]);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
      console.error("[Chat UI Error]", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (text: string) => {
    setInput(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (queryHistory.length > 0 && historyPointer < queryHistory.length - 1) {
        const nextPointer = historyPointer + 1;
        setHistoryPointer(nextPointer);
        setInput(queryHistory[nextPointer]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer > 0) {
        const nextPointer = historyPointer - 1;
        setHistoryPointer(nextPointer);
        setInput(queryHistory[nextPointer]);
      } else if (historyPointer === 0) {
        setHistoryPointer(-1);
        setInput('');
      }
    }
  };

  // Listen for Escape key
  useEffect(() => {
    if (isFloating && isOpen) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose?.();
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isFloating, isOpen, onClose]);

  if (isFloating && !isOpen) return null;

  return (
    <>
      {/* Immersive Backdrop for Focus Mode */}
      {isFloating && isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[90] animate-in fade-in duration-500"
          onClick={onClose}
        />
      )}

      <div className={cn(
          "flex flex-col bg-white transition-all duration-500 ease-in-out z-[100]",
          isFloating 
            ? "fixed top-8 right-8 bottom-8 left-8 md:left-24 rounded-[48px] shadow-[0_0_100px_rgba(0,0,0,0.3)] animate-in zoom-in-95 duration-500" 
            : "rounded-[40px] h-[800px] shadow-2xl shadow-slate-200/50 border-none overflow-hidden"
      )}>
        <Card className="border-none shadow-none flex-1 flex flex-col rounded-none overflow-hidden">
        <CardHeader className="bg-slate-900 text-white p-8 pb-10 border-none shrink-0 relative">
          {isFloating && (
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all group/close active:scale-90 z-[110]"
              title="Close Assistant (Esc)"
            >
              <X className="w-6 h-6 text-white group-hover/close:rotate-90 transition-transform stroke-[3px]" />
            </button>
          )}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-500 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-500/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-black uppercase tracking-tight">Beacon AI</CardTitle>
              <div className="flex items-center gap-3 mt-1">
                <Badge className="bg-green-500/20 text-green-400 border-none text-[8px] font-black uppercase tracking-widest px-2">Online</Badge>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1 border-l border-white/10 pl-3">
                  <Database className="w-2.5 h-2.5" /> Verified Repo
                </span>
                {modelUsed && (
                  <span className="text-[9px] text-brand-400 font-black uppercase tracking-widest flex items-center gap-1 border-l border-white/10 pl-3">
                    <Sparkles className="w-2.5 h-2.5" /> {modelUsed}
                  </span>
                )}
              </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!isFloating && (
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setMessages([]);
                    setModelUsed('');
                  }}
                  className="h-10 text-[10px] uppercase font-black tracking-widest text-slate-500 hover:text-red-400 hover:bg-white/5"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Chat
                </Button>
              )}
              <MessageSquare className="w-8 h-8 text-slate-700 opacity-50" />
            </div>
          </div>

          {/* Category Quick-Filters */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
             {categories.map((cat) => (
               <button
                 key={cat.id}
                 onClick={() => setActiveCategory(cat.id)}
                 className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border",
                    activeCategory === cat.id
                      ? "bg-white text-slate-900 border-white shadow-lg"
                      : "bg-transparent text-slate-400 border-white/10 hover:border-white/20 hover:text-slate-200"
                 )}
               >
                 <cat.icon className="w-3 h-3" />
                 {cat.label}
               </button>
             ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0 flex flex-col relative bg-slate-50/30">
        {/* Chat Canvas */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar scroll-smooth"
        >
          {messages.map((msg, idx) => (
            <div 
              key={idx}
              className={cn(
                "flex items-start gap-4 max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                msg.role === 'user' ? "bg-slate-900 text-white" : "bg-white border border-slate-100 text-brand-600"
              )}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              
              <div className="space-y-2">
                <div className={cn(
                  "p-5 rounded-[24px] shadow-sm leading-relaxed text-sm font-medium prose prose-slate max-w-none prose-p:leading-relaxed prose-sm prose-strong:text-brand-600 prose-ul:my-2 prose-li:my-0.5",
                  msg.role === 'user' 
                    ? "bg-slate-900 text-white rounded-tr-none prose-invert prose-strong:text-brand-300" 
                    : "bg-white border border-slate-100 text-slate-800 rounded-tl-none"
                )}>
                  {msg.role === 'assistant' ? (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  ) : (
                    msg.content
                  )}
                </div>
                <p className={cn(
                  "text-[8px] font-black uppercase tracking-widest text-slate-400 px-1",
                  msg.role === 'user' ? "text-right" : "text-left"
                )}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex items-start gap-4 mr-auto animate-pulse">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-brand-600">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
              <div className="bg-white border border-slate-100 p-5 rounded-[24px] rounded-tl-none shadow-sm">
                <div className="flex gap-1.5 items-center">
                   <div className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce" />
                   <div className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce delay-75" />
                   <div className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce delay-150" />
                   <span className="ml-2 text-[9px] font-black uppercase tracking-widest text-slate-400">Analyzing Repository Data...</span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-in shake duration-500">
              <AlertCircle className="w-5 h-5" />
              <p className="text-[10px] font-black uppercase tracking-tight">{error}</p>
            </div>
          )}
        </div>

        {/* Suggested Queries */}
        {!loading && messages.length < 3 && (
          <div className="px-8 pb-4 flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionClick(s)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-500 hover:border-brand-500 hover:text-brand-600 transition-all hover:shadow-sm active:scale-95"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-8 bg-white border-t border-slate-100 shrink-0">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-slate-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask anything about this institution... (↑ for history)"
                className="h-16 bg-slate-50/50 border-slate-100 rounded-2xl px-6 text-sm font-bold text-slate-900 focus:ring-brand-500 focus:border-brand-500 transition-all"
              />
              <Button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="h-16 w-16 bg-slate-900 hover:bg-black rounded-2xl shadow-xl shadow-slate-900/20 transition-all active:scale-[0.9] flex items-center justify-center group"
              >
                <Send className="w-6 h-6 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </div>
          </div>
          <p className="text-[8px] text-center mt-4 font-black text-slate-300 uppercase tracking-[0.2em]">
            Beacon AI • Institutional Intelligence Engine
          </p>
        </div>
      </CardContent>
    </Card>
    </div>
    </>
  );
}
