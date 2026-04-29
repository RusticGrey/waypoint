'use client';

import { useState, useEffect } from 'react';
import { ux } from '@/lib/ux';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  FileJson, Save, X, Loader2, CheckCircle2, 
  AlertCircle, Edit3, Terminal, History,
  Database, LayoutDashboard, Sparkles, ChevronRight,
  Plus, Settings2
} from 'lucide-react';

export default function ExtractionTemplatesPage() {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [dataSources, setDataSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPrompt, setEditingPrompt] = useState<any>(null);
  const [promptValue, setPromptValue] = useState('');
  const [saving, setSaving] = useState(false);
  
  const [isCreating, setIsCreating] = useState(false);
  const [newPrompt, setNewPrompt] = useState({
    dataSourceId: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [promptsRes, sourcesRes] = await Promise.all([
        fetch('/api/admin/colleges/knowledge/prompts'),
        fetch('/api/admin/colleges/knowledge/sources')
      ]);
      const promptsData = await promptsRes.json();
      const sourcesData = await sourcesRes.json();
      setPrompts(promptsData);
      setDataSources(sourcesData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (prompt: any) => {
    setIsCreating(false);
    setEditingPrompt(prompt);
    setPromptValue(prompt.promptText);
  };

  const handleCreateNew = () => {
    setEditingPrompt(null);
    setIsCreating(true);
    setPromptValue('');
    setNewPrompt({
      dataSourceId: '',
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        dataSourceId: isCreating ? newPrompt.dataSourceId : editingPrompt.dataSourceId,
        promptText: promptValue
      };

      const res = await fetch('/api/admin/colleges/knowledge/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setEditingPrompt(null);
        setIsCreating(false);
        fetchData();
      } else {
        throw new Error('Failed to save prompt');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-brand-600" />
      </div>
    );
  }

  return (
    <div className={ux.layout.page}>
      <div className={ux.layout.header}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={ux.text.heading}>Extraction Prompts</h1>
            <p className={ux.text.body}>Manage global AI prompts used for institutional data extraction per source.</p>
          </div>
          <div className="flex items-center gap-4">
             <Button onClick={handleCreateNew} className="h-10 text-[11px] uppercase font-black px-6 bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-100 transition-all rounded-2xl">
               <Plus className="w-4 h-4 mr-2" /> New Prompt
             </Button>
            <Badge variant="brand" className="h-7 px-4 rounded-full uppercase text-[10px] tracking-widest font-black">Global Config</Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Sidebar / List */}
        <div className="lg:col-span-4 space-y-4">
          {prompts.length > 0 ? prompts.map((p: any) => (
            <button
              key={p.id}
              onClick={() => handleEdit(p)}
              className={cn(
                "w-full text-left p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all group flex items-center justify-between",
                editingPrompt?.id === p.id && "ring-2 ring-brand-500 border-transparent shadow-brand-100"
              )}
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={cn(
                    "text-[11px] font-black uppercase tracking-tight transition-colors",
                    editingPrompt?.id === p.id ? "text-brand-700" : "text-slate-900 group-hover:text-brand-600"
                  )}>{p.dataSource?.displayName}</span>
                  {p.isActive && <Badge variant="success" className="text-[8px] h-3.5 px-1.5 py-0 rounded-sm font-black">Live</Badge>}
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  <span className="flex items-center gap-1"><History className="w-3 h-3" /> v{p.version}</span>
                </div>
              </div>
              <ChevronRight className={cn(
                "w-4 h-4 text-slate-300 group-hover:text-brand-400 transition-all transform",
                editingPrompt?.id === p.id ? "translate-x-1 text-brand-600" : ""
              )} />
            </button>
          )) : (
            <div className="p-16 text-center border-2 border-dashed border-slate-200 rounded-[32px] bg-white shadow-inner">
               <Database className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No prompts defined</p>
            </div>
          )}
        </div>

        {/* Editor Area */}
        <div className="lg:col-span-8">
          {(editingPrompt || isCreating) ? (
            <Card className={cn(ux.card.base, "border-slate-200 shadow-xl overflow-hidden rounded-[32px]")}>
              <CardHeader className="bg-white border-b border-slate-100 py-7 px-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 shadow-sm border border-brand-100">
                      <Terminal className="w-6 h-6" />
                    </div>
                    <div>
                      {isCreating ? (
                         <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-900 italic">Initialize Prompt</CardTitle>
                      ) : (
                         <>
                           <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-900">{editingPrompt.dataSource?.displayName}</CardTitle>
                           <div className="flex items-center gap-3 mt-1">
                              <Badge variant="neutral" className="text-[9px] h-4 uppercase rounded-sm px-1.5 font-black">v{editingPrompt.version}</Badge>
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Source: {editingPrompt.dataSourceId}</span>
                           </div>
                         </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" onClick={() => { setEditingPrompt(null); setIsCreating(false); }} className="text-slate-500 hover:bg-slate-50 text-[10px] uppercase font-black h-10 px-5 rounded-xl">
                      Discard
                    </Button>
                    <Button onClick={handleSave} disabled={saving || (isCreating && !newPrompt.dataSourceId) || !promptValue.trim()} className="bg-brand-600 hover:bg-brand-700 text-white border-none shadow-lg shadow-brand-100 text-[10px] uppercase font-black h-10 px-6 rounded-xl transition-all">
                      {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" /> : <><Save className="w-3.5 h-3.5 mr-2" /> Save & Activate</>}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-slate-50/50 p-8 space-y-8">
                  {isCreating && (
                    <div className="animate-in slide-in-from-top-2 duration-300">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Target Data Source</label>
                          <select 
                            className="w-full h-11 bg-white border border-slate-200 rounded-xl px-4 text-xs font-bold text-slate-700 focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 outline-none transition-all shadow-sm"
                            value={newPrompt.dataSourceId}
                            onChange={(e) => setNewPrompt({...newPrompt, dataSourceId: e.target.value})}
                          >
                            <option value="">Select a source pipeline...</option>
                            {dataSources.map(s => <option key={s.id} value={s.id}>{s.displayName}</option>)}
                          </select>
                       </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">LLM Prompt Definition</span>
                      </div>
                      <Badge variant="brand" className="text-[8px] h-4 uppercase">JSON Output Required</Badge>
                    </div>
                    <Textarea 
                      value={promptValue}
                      onChange={(e) => setPromptValue(e.target.value)}
                      className="font-mono text-[11px] h-[450px] bg-white border border-slate-200 text-slate-700 focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 transition-all resize-none leading-relaxed p-7 rounded-[24px] shadow-sm overflow-y-auto custom-scrollbar"
                      placeholder="Define the LLM instructions for this source. Ensure you specify the expected JSON structure..."
                    />
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-white border border-slate-200 rounded-[24px] shadow-sm">
                    <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-900 font-black uppercase tracking-widest">Version Control Note</p>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed uppercase tracking-tight">
                        Saving a new prompt automatically deactivates previous versions. Documents processed after this point will use the new instructions.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full min-h-[600px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[40px] bg-white shadow-inner text-center p-16">
               <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center mb-8 border border-slate-100 shadow-sm text-slate-200">
                  <Terminal className="w-10 h-10" />
               </div>
               <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-3">Prompt Designer</h3>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
                 Select a data source pipeline from the library on the left to configure its AI intelligence layer.
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
