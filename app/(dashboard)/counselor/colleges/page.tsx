'use client';

import { useState, useEffect } from 'react';
import { ux } from '@/lib/ux';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Plus, Search, GraduationCap, MapPin, 
  Globe, FileText, ChevronRight, Loader2,
  MessageSquare, LayoutGrid, CheckCircle2, Sparkles,
  Database, Settings2
} from 'lucide-react';
import Link from 'next/link';
import { CollegeKnowledgeChat } from '@/components/admin/rankings/CollegeKnowledgeChat';

export default function CollegeDirectory() {
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'directory'>('directory');
  const [activeCountry, setActiveCountry] = useState<string>('All');
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCollege, setNewCollege] = useState({ name: '', country: 'United States', website: '' });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const res = await fetch('/api/counselor/colleges');
      const data = await res.json();
      setColleges(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCollege = async () => {
    if (!newCollege.name) return;
    setAdding(true);
    try {
      const res = await fetch('/api/counselor/colleges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCollege),
      });
      if (res.ok) {
        setNewCollege({ name: '', country: 'United States', website: '' });
        setShowAddForm(false);
        fetchColleges();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  const countries = ['All', ...Array.from(new Set(colleges.map(c => c.country || 'Other')))].sort();

  const filteredColleges = colleges.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    if (activeCountry === 'All') return matchesSearch;
    return matchesSearch && (c.country === activeCountry);
  });

  return (
    <div className={ux.layout.page}>
      <div className={ux.layout.header}>
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h1 className={ux.text.heading}>College Hub</h1>
            <p className={ux.text.body}>Manage institutions and explore the AI knowledge base.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/counselor/extraction-templates">
              <Button variant="outline">
                <Settings2 className="w-4 h-4 mr-2" />
                Manage Prompts
              </Button>
            </Link>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="w-4 h-4 mr-2" />
              Add College
            </Button>
          </div>
        </div>
      </div>

      {showAddForm && (activeTab === 'directory') && (
        <Card className={cn(ux.card.base, "mb-8 bg-brand-50/30 border-brand-100")}>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className={ux.form.label}>College Name *</label>
                <Input 
                  value={newCollege.name} 
                  onChange={(e) => setNewCollege({...newCollege, name: e.target.value})}
                  placeholder="e.g. Stanford University"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className={ux.form.label}>Country</label>
                <Input 
                  value={newCollege.country} 
                  onChange={(e) => setNewCollege({...newCollege, country: e.target.value})}
                  placeholder="e.g. United States"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className={ux.form.label}>Website</label>
                <Input 
                  value={newCollege.website} 
                  onChange={(e) => setNewCollege({...newCollege, website: e.target.value})}
                  placeholder="e.g. https://stanford.edu"
                  className="bg-white"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="ghost" onClick={() => setShowAddForm(false)}>Cancel</Button>
              <Button onClick={handleAddCollege} disabled={adding || !newCollege.name}>
                {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Add'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'directory' && (
        <>
          <div className="mb-6 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search colleges by name or location..." 
              className="pl-11 h-12 bg-white rounded-2xl border-slate-200 shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="py-20 flex justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Country Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar scroll-smooth no-scrollbar">
                {countries.map(country => (
                  <button
                    key={country}
                    onClick={() => setActiveCountry(country)}
                    className={cn(
                      "px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2",
                      activeCountry === country
                        ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-200"
                        : "bg-white border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600"
                    )}
                  >
                    {country}
                    {activeCountry === country && <Badge className="ml-2 bg-white/20 text-white border-none text-[8px]">{filteredColleges.length}</Badge>}
                  </button>
                ))}
              </div>

              {/* Ultra-Compact Strip Grid */}
              <div className="grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {filteredColleges.map((college) => {
                  const hasIntelligence = college.insights?.length > 0;
                  const hasDocuments = college._count?.documents > 0;

                  return (
                    <Link key={college.id} href={`/counselor/colleges/${college.id}`}>
                      <Card className={cn(
                        "hover:border-brand-300 hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer group relative overflow-hidden border-2 border-slate-100/50 bg-white",
                        hasIntelligence && "border-l-4 border-l-green-500"
                      )}>
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0",
                                hasIntelligence ? "bg-green-50 text-green-600" : "bg-slate-50 text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600"
                              )}>
                                <GraduationCap className="w-5 h-5" />
                              </div>
                              <div className="min-w-0">
                                <h3 className="font-black text-slate-900 text-xs leading-tight group-hover:text-brand-700 transition-colors truncate">
                                  {college.name}
                                </h3>
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight truncate mt-0.5">
                                  {college.country || 'United States'}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 shrink-0">
                              <div className="flex gap-1">
                                {hasIntelligence && (
                                  <div className="w-6 h-6 rounded-lg bg-green-500 flex items-center justify-center text-white shadow-sm" title="Intelligence Enabled">
                                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[3px]" />
                                  </div>
                                )}
                                {hasDocuments && (
                                  <div className="w-6 h-6 rounded-lg bg-brand-500 flex items-center justify-center text-white shadow-sm" title="AI Insights Staged">
                                    <Sparkles className="w-3.5 h-3.5 fill-white" />
                                  </div>
                                )}
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>

              {filteredColleges.length === 0 && (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No colleges found</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
