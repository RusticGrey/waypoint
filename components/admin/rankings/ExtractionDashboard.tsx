'use client';

import { useState, useEffect } from 'react';
import { ux } from '@/lib/ux';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Save, Loader2, AlertCircle, Terminal, History,
  Database, Sparkles, Plus, Settings2,
  Table, Edit3, Eye, Search, LayoutDashboard,
  ChevronDown, Globe, X
} from 'lucide-react';
import { BatchExtractionPanel } from './BatchExtractionPanel';
import { InsightDataEditor } from './InsightDataEditor';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface DataSource {
  id: string;
  name: string;
  displayName: string;
}

interface Prompt {
  id: string;
  dataSourceId: string;
  promptText: string;
  version: number;
  isActive: boolean;
  createdAt: string;
  dataSource?: DataSource;
}

export default function ExtractionDashboard() {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [activeDataSourceId, setActiveDataSourceId] = useState<string | null>(null);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [activePrompt, setActivePrompt] = useState<Prompt | null>(null);
  const [promptValue, setPromptValue] = useState('');
  const [academicYear, setAcademicYear] = useState('2024'); 
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'prompt' | 'engine' | 'explorer'>('prompt');

  // New Data Source Modal
  const [isAddSourceModalOpen, setIsAddSourceModalOpen] = useState(false);
  const [newSource, setNewSource] = useState({ name: '', displayName: '', baseUrl: '' });
  const [isCreatingSource, setIsCreatingSource] = useState(false);

  // For Data Explorer
  const [colleges, setColleges] = useState<any[]>([]);
  const [explorerLoading, setExplorerLoading] = useState(false);
  const [editingInsight, setEditingInsight] = useState<any>(null);

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/colleges/knowledge/sources');
      const data = await res.json();
      setDataSources(data);
      if (data.length > 0 && !activeDataSourceId) {
        setActiveDataSourceId(data[0].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeDataSourceId) {
      fetchPrompts(activeDataSourceId);
    }
  }, [activeDataSourceId]);

  useEffect(() => {
    if (activeDataSourceId) {
      if (activeTab === 'explorer') fetchExplorerData();
    }
  }, [activeDataSourceId, activeTab, academicYear]);

  const fetchPrompts = async (sourceId: string) => {
    try {
      const res = await fetch(`/api/admin/colleges/knowledge/prompts?dataSourceId=${sourceId}&history=true`, {
        cache: 'no-store',
        headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' }
      });
      const data = await res.json();
      const sourcePrompts = Array.isArray(data) ? data.filter((p: any) => p.dataSourceId === sourceId) : [];
      const sorted = [...sourcePrompts].sort((a: any, b: any) => b.version - a.version);
      setPrompts(sorted);
      const active = sourcePrompts.find((p: any) => p.isActive) || sorted[0];
      setActivePrompt(active || null);
      setPromptValue(active?.promptText || '');
    } catch (err) {
      console.error('Error fetching prompts:', err);
    }
  };

  const fetchExplorerData = async () => {
    setExplorerLoading(true);
    try {
      const res = await fetch(`/api/admin/colleges/knowledge/extraction-status?dataSourceId=${activeDataSourceId}&academicYear=${academicYear}`);
      if (res.ok) {
        const data = await res.json();
        setColleges(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setExplorerLoading(false);
    }
  };

  const handleSavePrompt = async () => {
    if (!activeDataSourceId) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/colleges/knowledge/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dataSourceId: activeDataSourceId,
          promptText: promptValue
        })
      });
      if (res.ok) {
        fetchPrompts(activeDataSourceId);
      } else {
        throw new Error('Failed to save prompt');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateSource = async () => {
    if (!newSource.name || !newSource.displayName) return;
    setIsCreatingSource(true);
    try {
      const res = await fetch('/api/admin/colleges/knowledge/sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSource)
      });
      if (res.ok) {
        const data = await res.json();
        setIsAddSourceModalOpen(false);
        setNewSource({ name: '', displayName: '', baseUrl: '' });
        fetchSources();
        setActiveDataSourceId(data.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCreatingSource(false);
    }
  };

  const handleEditInsight = async (college: any) => {
     try {
       const res = await fetch(`/api/admin/colleges/knowledge/query?collegeId=${college.collegeId}&dataSourceId=${activeDataSourceId}&academicYear=${college.academicYear}`);
       const data = await res.json();
       const insightData = data.rankings?.find((r: any) => r.academicYear === college.academicYear);
       if (insightData) {
         setEditingInsight({
           ...insightData,
           data: insightData.rankingDataJSON,
           college: { name: data.collegeName }
         });
       }
     } catch (err) {
       console.error(err);
     }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-brand-600" />
      </div>
    );
  }

  const selectedSource = dataSources.find(s => s.id === activeDataSourceId);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Unified Header & Context Bar */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex-shrink-0 z-10 shadow-sm">
        <div className="flex items-center justify-between gap-8 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-100">
                   <Database className="w-5 h-5" />
                </div>
                <div>
                   <h1 className="text-sm font-black uppercase tracking-widest text-slate-900">Extraction Dashboard</h1>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">AI Knowledge Base Management</p>
                </div>
             </div>

             <div className="h-8 w-px bg-slate-200" />

             {/* Data Pipeline Selector */}
             <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Pipeline:</span>
                <div className="relative min-w-[200px]">
                   <select 
                     value={activeDataSourceId || ''} 
                     onChange={(e) => setActiveDataSourceId(e.target.value)}
                     className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-4 text-xs font-black uppercase text-slate-700 outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 transition-all appearance-none cursor-pointer"
                   >
                     {dataSources.map(s => <option key={s.id} value={s.id}>{s.displayName}</option>)}
                   </select>
                   <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsAddSourceModalOpen(true)}
                  className="h-10 w-10 rounded-xl text-slate-400 hover:text-brand-600 hover:bg-brand-50"
                >
                  <Plus className="w-5 h-5" />
                </Button>
             </div>

             <div className="h-8 w-px bg-slate-200" />

             {/* Academic Year Selector */}
             <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Year:</span>
                <div className="relative min-w-[120px]">
                   <select 
                     value={academicYear}
                     onChange={(e) => setAcademicYear(e.target.value)}
                     className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl px-4 text-xs font-black uppercase text-slate-700 outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 transition-all appearance-none cursor-pointer"
                   >
                     <option value="2026">2026</option>
                     <option value="2025">2025</option>
                     <option value="2024">2024</option>
                     <option value="2023">2023</option>
                   </select>
                   <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
             </div>
          </div>

          {/* Tab Navigation (Inside Header) */}
          <div className="flex p-1 bg-slate-100/50 rounded-2xl border border-slate-100">
             {[
               { id: 'prompt', label: 'Prompt Config', icon: Terminal },
               { id: 'engine', label: 'Extraction Engine', icon: Settings2 },
               { id: 'explorer', label: 'Data Explorer', icon: Table }
             ].map(tab => (
               <button 
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={cn(
                   "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                   activeTab === tab.id ? "bg-white text-brand-700 shadow-sm border border-slate-200/50" : "text-slate-400 hover:text-slate-600"
                 )}
               >
                 <tab.icon className="w-3.5 h-3.5" /> {tab.label}
               </button>
             ))}
          </div>
        </div>
      </header>

      {/* Main Content Area - Expansive, Full-Width */}
      <main className="flex-1 overflow-hidden p-8 max-w-[1600px] mx-auto w-full">
        {activeDataSourceId ? (
          <div className="h-full flex flex-col overflow-hidden">
             {activeTab === 'prompt' && (
               <div className="h-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
                  <Card className="flex-1 border-slate-200 shadow-xl overflow-hidden rounded-[40px] flex flex-col border-none shadow-brand-100/50">
                     <CardHeader className="bg-white border-b border-slate-100 py-4 px-10 flex flex-row items-center justify-between flex-shrink-0">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-2 italic">
                           <Sparkles className="w-4 h-4 text-brand-500" /> Active Instructions
                        </CardTitle>
                        <div className="flex items-center gap-4">
                           <Badge variant="brand" className="text-[9px] h-6 px-3 rounded-full font-black uppercase tracking-widest">v{activePrompt?.version || 0} Live</Badge>
                           <Button onClick={handleSavePrompt} disabled={saving || !promptValue.trim()} className="bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-200 text-[10px] uppercase font-black h-9 px-8 rounded-full transition-all">
                              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" /> : <><Save className="w-3.5 h-3.5 mr-2" /> Save & Push v{ (activePrompt?.version || 0) + 1 }</>}
                           </Button>
                        </div>
                     </CardHeader>
                     <CardContent className="p-0 flex-1 flex flex-col overflow-hidden bg-white">
                        <div className="flex-1 flex flex-col overflow-hidden">
                           <Textarea
                              value={promptValue}
                              onChange={(e) => setPromptValue(e.target.value)}
                              className="font-mono text-[12px] flex-1 bg-white border-none text-slate-700 focus:ring-0 transition-all resize-none leading-relaxed p-10 overflow-y-auto custom-scrollbar"
                              placeholder="Define the AI extraction instructions for this pipeline..."
                           />
                           <div className="px-10 py-4 bg-amber-50/50 border-t border-amber-100 flex items-center gap-4 flex-shrink-0">
                              <AlertCircle className="w-4 h-4 text-amber-500" />
                              <p className="text-[10px] text-amber-700 font-bold uppercase tracking-tight">
                                 Saving a new prompt marks all existing {selectedSource?.displayName} records as <b>Stale</b> for {academicYear}.
                              </p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card className="h-64 border-slate-100 shadow-md overflow-hidden rounded-[32px] flex flex-col flex-shrink-0">
                     <CardHeader className="py-4 px-10 bg-slate-50/50 border-b border-slate-100 flex-shrink-0">
                        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                           <History className="w-3.5 h-3.5" /> Version History Audit Log
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="p-0 overflow-y-auto custom-scrollbar flex-1 bg-white">
                        <table className="w-full text-left">
                           <thead className="sticky top-0 bg-white z-10 border-b border-slate-50">
                              <tr>
                                 <th className="py-3 px-10 text-[9px] font-black uppercase text-slate-400 tracking-widest w-24">Version</th>
                                 <th className="py-3 px-10 text-[9px] font-black uppercase text-slate-400 tracking-widest text-center">Status</th>
                                 <th className="py-3 px-10 text-[9px] font-black uppercase text-slate-400 tracking-widest">Creation Timestamp</th>
                                 <th className="py-3 px-10 text-[9px] font-black uppercase text-slate-400 tracking-widest text-right">Action</th>
                              </tr>
                           </thead>
                           <tbody>
                              {prompts.length > 0 ? prompts.map(p => (
                                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                   <td className="py-4 px-10">
                                      <span className="text-xs font-black text-slate-900 uppercase">v{p.version}</span>
                                   </td>
                                   <td className="py-4 px-10 text-center">
                                      <Badge variant={p.isActive ? "success" : "neutral"} className="text-[8px] font-black uppercase h-5 px-2">
                                         {p.isActive ? "ACTIVE" : "ARCHIVED"}
                                      </Badge>
                                   </td>
                                   <td className="py-4 px-10 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                                      {new Date(p.createdAt).toLocaleString()}
                                   </td>
                                   <td className="py-4 px-10 text-right">
                                      <Button variant="ghost" size="sm" onClick={() => setPromptValue(p.promptText)} className="text-[9px] font-black uppercase h-8 rounded-xl text-brand-600 hover:bg-brand-50">
                                         <Eye className="w-3.5 h-3.5 mr-2" /> Load Instructions
                                      </Button>
                                   </td>
                                </tr>
                              )) : (
                                <tr>
                                   <td colSpan={4} className="py-12 text-center text-[10px] font-black text-slate-300 uppercase tracking-widest italic italic">No prompt history found</td>
                                </tr>
                              )}
                           </tbody>
                        </table>
                     </CardContent>
                  </Card>
               </div>
             )}

             {activeTab === 'engine' && (
                <div className="h-full animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
                   <BatchExtractionPanel dataSourceId={activeDataSourceId} academicYear={academicYear} />
                </div>
             )}

             {activeTab === 'explorer' && (
                <div className="h-full animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden flex flex-col gap-6">
                   <Card className="flex-1 border-slate-200 shadow-xl overflow-hidden rounded-[40px] flex flex-col border-none">
                      <CardHeader className="bg-white border-b border-slate-100 py-6 px-10 flex flex-row items-center justify-between flex-shrink-0">
                         <div>
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
                               <Table className="w-4 h-4 text-brand-600" /> Data Records
                            </CardTitle>
                            <p className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-tight">Inspect institutional payload for {academicYear}</p>
                         </div>
                         <div className="flex items-center gap-4">
                            <div className="relative">
                               <Search className="w-3.5 h-3.5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                               <input className="h-10 w-80 bg-slate-50 border border-slate-100 rounded-full pl-10 pr-6 text-[10px] font-bold text-slate-600 outline-none focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 transition-all shadow-inner" placeholder="SEARCH INSTITUTION..." />
                            </div>
                         </div>
                      </CardHeader>
                      <CardContent className="p-0 flex-1 overflow-y-auto custom-scrollbar bg-white">
                         <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                               <thead className="sticky top-0 bg-white z-10 border-b border-slate-50 shadow-sm shadow-slate-100/50">
                                  <tr className="bg-slate-50/20">
                                     <th className="py-4 px-10 text-[10px] font-black uppercase text-slate-400 tracking-widest">Institution Name</th>
                                     <th className="py-4 px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Status</th>
                                     <th className="py-4 px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Latest Extraction</th>
                                     <th className="py-4 px-10 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
                                  </tr>
                               </thead>
                               <tbody>
                                  {colleges.length > 0 ? colleges.filter(c => c.status !== 'missing').map((c) => (
                                    <tr key={`${c.collegeId}:::${c.academicYear}`} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                                       <td className="py-5 px-10">
                                          <span className="text-xs font-black text-slate-800 uppercase tracking-tight group-hover:text-brand-700 transition-colors">{c.collegeName}</span>
                                       </td>
                                       <td className="py-5 px-4 text-center">
                                          <Badge variant={c.status === 'approved' ? 'success' : 'warning'} className="text-[9px] font-black uppercase tracking-tighter px-3 h-6 rounded-full">{c.status}</Badge>
                                       </td>
                                       <td className="py-5 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                                          {new Date(c.lastExtracted).toLocaleString()}
                                       </td>
                                       <td className="py-5 px-10 text-right">
                                          <Button variant="ghost" size="sm" onClick={() => handleEditInsight(c)} className="text-[10px] font-black uppercase h-9 rounded-2xl text-brand-600 hover:bg-brand-50 border border-transparent hover:border-brand-200">
                                             <Edit3 className="w-4 h-4 mr-2" /> Manual Override
                                          </Button>
                                       </td>
                                    </tr>
                                  )) : (
                                    <tr>
                                       <td colSpan={4} className="py-32 text-center">
                                          {explorerLoading ? <Loader2 className="w-10 h-10 animate-spin mx-auto text-slate-200" /> : (
                                            <div className="space-y-3">
                                               <Database className="w-12 h-12 text-slate-100 mx-auto" />
                                               <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] italic">No approved records available for this cycle</p>
                                            </div>
                                          )}
                                       </td>
                                    </tr>
                                  )}
                               </tbody>
                            </table>
                         </div>
                      </CardContent>
                   </Card>
                </div>
             )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[64px] bg-white shadow-inner text-center p-20">
             <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center mb-8 border border-slate-100 shadow-sm text-slate-200 animate-bounce duration-3000">
                <LayoutDashboard className="w-10 h-10" />
             </div>
             <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-3 italic">Intelligence Hub</h3>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
               Select a data pipeline from the top menu to start managing AI instructions and institutional data.
             </p>
          </div>
        )}
      </main>

      {/* New Data Source Modal */}
      <Dialog open={isAddSourceModalOpen} onOpenChange={setIsAddSourceModalOpen}>
        <DialogContent className="max-w-md bg-white rounded-[32px] border-none shadow-2xl p-0 overflow-hidden">
          <DialogHeader className="p-8 bg-brand-600 text-white space-y-0">
             <DialogTitle className="text-xl font-black uppercase tracking-widest flex items-center gap-3 italic text-white">
                <Database className="w-6 h-6" /> New Intelligence Pipeline
             </DialogTitle>
             <DialogDescription className="text-brand-100 text-[10px] font-bold uppercase tracking-tight mt-2 opacity-80">
                Register a new external data source to begin AI-driven extraction.
             </DialogDescription>
          </DialogHeader>
          <div className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Internal Name (ID)</label>
                <Input 
                  placeholder="e.g. us-news, common-data-set" 
                  value={newSource.name}
                  onChange={(e) => setNewSource({...newSource, name: e.target.value})}
                  className="h-12 rounded-2xl bg-slate-50 border-slate-200 text-xs font-bold focus:ring-brand-500/10 focus:border-brand-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Display Label</label>
                <Input 
                  placeholder="e.g. US News & World Report" 
                  value={newSource.displayName}
                  onChange={(e) => setNewSource({...newSource, displayName: e.target.value})}
                  className="h-12 rounded-2xl bg-slate-50 border-slate-200 text-xs font-bold focus:ring-brand-500/10 focus:border-brand-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Base URL (Optional)</label>
                <Input 
                  placeholder="https://..." 
                  value={newSource.baseUrl}
                  onChange={(e) => setNewSource({...newSource, baseUrl: e.target.value})}
                  className="h-12 rounded-2xl bg-slate-50 border-slate-200 text-xs font-bold focus:ring-brand-500/10 focus:border-brand-500 transition-all"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
               <Button variant="ghost" onClick={() => setIsAddSourceModalOpen(false)} className="flex-1 h-12 rounded-2xl text-[10px] uppercase font-black text-slate-400">Cancel</Button>
               <Button onClick={handleCreateSource} disabled={isCreatingSource || !newSource.name || !newSource.displayName} className="flex-1 h-12 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-[10px] uppercase font-black shadow-lg shadow-brand-100 transition-all">
                  {isCreatingSource ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Register Pipeline'}
               </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Slide-out JSON Editor (Side Drawer) */}
      {editingInsight && (
        <div className="fixed inset-0 z-50 flex justify-end">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setEditingInsight(null)} />
           <div className="relative w-[800px] bg-white h-full shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col border-l border-slate-200">
              <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-white flex-shrink-0">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                       <LayoutDashboard className="w-6 h-6" />
                    </div>
                    <div>
                       <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest italic">Manual Record Override</h2>
                       <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-tight flex items-center gap-2">
                          <Globe className="w-3 h-3" /> {editingInsight.college.name} &bull; <Badge variant="brand" className="text-[8px] px-1.5 h-4 font-black">{editingInsight.academicYear}</Badge>
                       </p>
                    </div>
                 </div>
                 <Button variant="ghost" size="icon" onClick={() => setEditingInsight(null)} className="h-12 w-12 rounded-full hover:bg-slate-100 hover:rotate-90 transition-all duration-300">
                    <X className="w-6 h-6" />
                 </Button>
              </div>
              <div className="flex-1 overflow-hidden">
                <InsightDataEditor 
                  insight={editingInsight} 
                  onSave={(updatedInsight) => {
                    setEditingInsight(null);
                    fetchExplorerData();
                  }}
                  onCancel={() => setEditingInsight(null)}
                />
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
