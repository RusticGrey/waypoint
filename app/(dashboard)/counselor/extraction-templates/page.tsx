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
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  const [promptValue, setPromptValue] = useState('');
  const [saving, setSaving] = useState(false);
  
  // New template fields
  const [isCreating, setIsCreating] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    section: 'generic',
    sourceType: 'all',
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/counselor/extraction-templates');
      const data = await res.json();
      setTemplates(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (template: any) => {
    setIsCreating(false);
    setEditingTemplate(template);
    setPromptValue(template.promptTemplate);
  };

  const handleCreateNew = () => {
    setEditingTemplate(null);
    setIsCreating(true);
    setPromptValue('');
    setNewTemplate({
      name: '',
      section: 'generic',
      sourceType: 'all',
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = isCreating ? {
        ...newTemplate,
        promptTemplate: promptValue,
        outputSchema: {},
        fields: []
      } : {
        ...editingTemplate,
        promptTemplate: promptValue
      };

      const res = await fetch('/api/counselor/extraction-templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setEditingTemplate(null);
        setIsCreating(false);
        fetchTemplates();
      } else {
        throw new Error('Failed to save template');
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

  // Group templates by sourceType
  const grouped = templates.reduce((acc: any, t: any) => {
    const key = t.sourceType || 'all';
    if (!acc[key]) acc[key] = [];
    acc[key].push(t);
    return acc;
  }, {});

  return (
    <div className={ux.layout.page}>
      <div className={ux.layout.header}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={ux.text.heading}>Extraction Templates</h1>
            <p className={ux.text.body}>Manage global AI prompts used for institutional data extraction.</p>
          </div>
          <div className="flex items-center gap-4">
             <Button onClick={handleCreateNew} className="h-10 text-[11px] uppercase font-black px-6 bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-100 transition-all rounded-2xl">
               <Plus className="w-4 h-4 mr-2" /> Create Template
             </Button>
            <Badge variant="brand" className="h-7 px-4 rounded-full uppercase text-[10px] tracking-widest font-black">Global Config</Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Sidebar / List */}
        <div className="lg:col-span-4 space-y-6">
          {Object.keys(grouped).length > 0 ? Object.entries(grouped).map(([sourceType, sourceTemplates]: [string, any]) => (
            <Card key={sourceType} className={cn(ux.card.base, "border-slate-200 overflow-hidden shadow-sm")}>
              <CardHeader className="bg-slate-50 border-b border-slate-100 py-4 px-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center border border-slate-200 shadow-sm text-brand-600">
                    <Database className="w-4 h-4" />
                  </div>
                  <CardTitle className="text-[11px] font-black uppercase tracking-widest text-slate-900">
                    {sourceType} Source
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {sourceTemplates.map((t: any) => (
                    <button
                      key={t.id}
                      onClick={() => handleEdit(t)}
                      className={cn(
                        "w-full text-left p-5 hover:bg-slate-50 transition-all group flex items-center justify-between",
                        editingTemplate?.id === t.id && "bg-brand-50/50"
                      )}
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={cn(
                            "text-[11px] font-black uppercase tracking-tight transition-colors",
                            editingTemplate?.id === t.id ? "text-brand-700" : "text-slate-900 group-hover:text-brand-600"
                          )}>{t.name}</span>
                          {t.isActive && <Badge variant="success" className="text-[8px] h-3.5 px-1.5 py-0 rounded-sm font-black">Active</Badge>}
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                          <span className="flex items-center gap-1"><Settings2 className="w-3 h-3" /> {t.section}</span>
                          <span className="flex items-center gap-1"><History className="w-3 h-3" /> v{t.version}</span>
                        </div>
                      </div>
                      <ChevronRight className={cn(
                        "w-4 h-4 text-slate-300 group-hover:text-brand-400 transition-all transform",
                        editingTemplate?.id === t.id ? "translate-x-1 text-brand-600" : ""
                      )} />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )) : (
            <div className="p-16 text-center border-2 border-dashed border-slate-200 rounded-[32px] bg-white shadow-inner">
               <Database className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-relaxed">No active templates found in system</p>
              <Button variant="link" onClick={handleCreateNew} className="text-brand-600 mt-2 font-black uppercase text-[10px]">Initialize Library</Button>
            </div>
          )}
        </div>

        {/* Editor Area */}
        <div className="lg:col-span-8">
          {(editingTemplate || isCreating) ? (
            <Card className={cn(ux.card.base, "border-slate-200 shadow-xl overflow-hidden rounded-[32px]")}>
              <CardHeader className="bg-white border-b border-slate-100 py-7 px-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 shadow-sm border border-brand-100">
                      <Terminal className="w-6 h-6" />
                    </div>
                    <div>
                      {isCreating ? (
                         <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-900 italic">Initialize New Template</CardTitle>
                      ) : (
                         <>
                           <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-900">{editingTemplate.name}</CardTitle>
                           <div className="flex items-center gap-3 mt-1">
                              <Badge variant="neutral" className="text-[9px] h-4 uppercase rounded-sm px-1.5 font-black">v{editingTemplate.version}</Badge>
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Source Pipeline: {editingTemplate.sourceType}</span>
                           </div>
                         </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" onClick={() => { setEditingTemplate(null); setIsCreating(false); }} className="text-slate-500 hover:bg-slate-50 text-[10px] uppercase font-black h-10 px-5 rounded-xl">
                      Discard Changes
                    </Button>
                    <Button onClick={handleSave} disabled={saving} className="bg-brand-600 hover:bg-brand-700 text-white border-none shadow-lg shadow-brand-100 text-[10px] uppercase font-black h-10 px-6 rounded-xl transition-all">
                      {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" /> : <><Save className="w-3.5 h-3.5 mr-2" /> Commit Globally</>}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-slate-50/50 p-8 space-y-8">
                  {isCreating && (
                    <div className="grid grid-cols-3 gap-6 animate-in slide-in-from-top-2 duration-300">
                       <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Internal Template Name</label>
                         <input 
                           className="w-full h-11 bg-white border border-slate-200 rounded-xl px-4 text-xs font-bold text-slate-700 focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 outline-none transition-all shadow-sm"
                           value={newTemplate.name}
                           onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                           placeholder="e.g. US News Profile Extractor"
                         />
                       </div>
                       <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Data Source Identifier</label>
                         <input 
                           className="w-full h-11 bg-white border border-slate-200 rounded-xl px-4 text-xs font-bold text-slate-700 focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 outline-none transition-all shadow-sm"
                           value={newTemplate.sourceType}
                           onChange={(e) => setNewTemplate({...newTemplate, sourceType: e.target.value})}
                           placeholder="e.g. us_news"
                         />
                       </div>
                       <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Functional Section</label>
                         <select 
                           className="w-full h-11 bg-white border border-slate-200 rounded-xl px-4 text-xs font-bold text-slate-700 focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 outline-none transition-all shadow-sm appearance-none cursor-pointer"
                           value={newTemplate.section}
                           onChange={(e) => setNewTemplate({...newTemplate, section: e.target.value})}
                         >
                           <option value="generic">Generic Institutional</option>
                           <option value="admissions">Admissions & SAT</option>
                           <option value="finance">Financial Aid & COA</option>
                           <option value="academics">Programs & Rankings</option>
                         </select>
                       </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">AI Prompt Definition</span>
                      </div>
                      <Badge variant="brand" className="text-[8px] h-4 uppercase">System Level</Badge>
                    </div>
                    <Textarea 
                      value={promptValue}
                      onChange={(e) => setPromptValue(e.target.value)}
                      className="font-mono text-[11px] h-[450px] bg-white border border-slate-200 text-slate-700 focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 transition-all resize-none leading-relaxed p-7 rounded-[24px] shadow-sm overflow-y-auto custom-scrollbar"
                      placeholder="Define the LLM instructions for this source. Include formatting rules and expected JSON schema..."
                    />
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-white border border-slate-200 rounded-[24px] shadow-sm">
                    <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-900 font-black uppercase tracking-widest">Architectural Note</p>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed uppercase tracking-tight">
                        Updating a template triggers versioning. All NEW extractions for this source will use this definition. To update existing data, go to the individual college Knowledge Repository and trigger a re-extraction.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full min-h-[600px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[40px] bg-white shadow-inner text-center p-16">
               <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center mb-8 border border-slate-100 shadow-sm text-slate-200 group-hover:scale-105 transition-transform">
                  <Terminal className="w-10 h-10" />
               </div>
               <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-3">System Template Designer</h3>
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
