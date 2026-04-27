'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ux } from '@/lib/ux';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Loader2, GraduationCap, MapPin, Globe, 
  FileText, MessageSquare, Database, LayoutDashboard,
  Settings, Save, AlertCircle, CheckCircle2, ChevronLeft,
  RotateCcw, FileJson, Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { CollegeMetadataEditor } from '@/components/admin/rankings/CollegeMetadataEditor';
import { KnowledgeWorkflow } from '@/components/admin/rankings/KnowledgeWorkflow';
import { CollegeKnowledgeChat } from '@/components/admin/rankings/CollegeKnowledgeChat';

type Tab = 'overview' | 'documents';

export default function CollegeDetailPage() {
  const { collegeId } = useParams();
  const [college, setCollege] = useState<any>(null);
  const [rankingSources, setRankingSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [activeSubTab, setActiveSubTab] = useState<string>('');

  useEffect(() => {
    fetchCollege();
    fetchRankingSources();
  }, [collegeId]);

  const fetchRankingSources = async () => {
    try {
      const res = await fetch('/api/admin/rankings/sources');
      const data = await res.json();
      setRankingSources(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCollege = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/counselor/colleges/${collegeId}`);
      if (!res.ok) {
        setCollege(null);
        return;
      }
      const data = await res.json();
      if (data.error) {
        setCollege(null);
      } else {
        setCollege(data);
      }
    } catch (err) {
      console.error(err);
      setCollege(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-brand-600" />
      </div>
    );
  }

  if (!college || college.error) {
    return (
      <div className="p-20 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h1 className={ux.text.subheading}>{college?.error || 'College not found'}</h1>
        <Button onClick={() => window.history.back()} className="mt-4">Go Back</Button>
      </div>
    );
  }

  return (
    <div className={ux.layout.page}>
      <div className="mb-8">
        <Link 
          href="/counselor/colleges" 
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-600 mb-6 transition-colors"
        >
          <ChevronLeft className="w-3 h-3" />
          Back to Directory
        </Link>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-brand-600 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-brand-200">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h1 className={ux.text.heading}>{college.name}</h1>
              <Button 
                variant="ghost" 
                onClick={fetchCollege}
                className="h-8 text-[10px] uppercase font-black tracking-widest text-slate-400 hover:text-brand-600"
              >
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" /> : <RotateCcw className="w-3.5 h-3.5 mr-2" />}
                Refresh Data
              </Button>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-xs font-bold text-slate-500 uppercase tracking-tighter">
                <Globe className="w-3 h-3" />
                {college.country || 'United States'}
              </span>
              <span className="text-slate-300">•</span>
              <a href={college.website} target="_blank" className="flex items-center gap-1 text-xs font-bold text-brand-600 uppercase tracking-tighter hover:underline">
                <Globe className="w-3 h-3" />
                Official Site
              </a>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex p-1 bg-slate-100/50 rounded-2xl w-fit border border-slate-200 shadow-inner">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'documents', label: 'Knowledge Repository', icon: Database },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                activeTab === tab.id
                  ? "bg-white text-brand-600 shadow-md ring-1 ring-slate-200"
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-brand-600" : "text-slate-400")} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Institutional Intelligence Hub */}
          <Card className={ux.card.base}>
            <CardHeader className="border-b border-slate-50 pb-0">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-black text-slate-900 uppercase tracking-tight">Institutional Intelligence</CardTitle>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Verified Knowledge Repository Data</p>
                  </div>
                </div>
                <Badge variant="neutral" className="bg-brand-600 text-white font-black uppercase tracking-widest text-[9px] px-3 py-1 border-none">
                  Live Insights
                </Badge>
              </div>

              {/* Categorized Sub-Tabs */}
              {(() => {
                const groups = college.rankingData || [];
                if (groups.length === 0) return null;

                const categories = [
                  { id: 'institutional_identity', label: 'Identity', icon: GraduationCap },
                  { id: 'rankings_comprehensive', label: 'Rankings', icon: FileJson },
                  { id: 'admissions_engine', label: 'Admissions', icon: CheckCircle2 },
                  { id: 'financial_profile', label: 'Financial', icon: Database },
                  { id: 'supplementary_admissions_insights', label: 'Campus Life', icon: Sparkles },
                  { id: 'international_context', label: 'Global', icon: Globe },
                  { id: 'academic_roi_and_outcomes', label: 'Outcomes', icon: LayoutDashboard },
                ];

                // Set initial subtab if not set
                if (!activeSubTab) setActiveSubTab(categories[0].id);

                return (
                  <div className="flex gap-1 mb-[-1px]">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveSubTab(cat.id)}
                        className={cn(
                          "flex items-center gap-2 px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2",
                          activeSubTab === cat.id
                            ? "border-brand-600 text-brand-600 bg-brand-50/30"
                            : "border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                        )}
                      >
                        <cat.icon className="w-3.5 h-3.5" />
                        {cat.label}
                      </button>
                    ))}
                  </div>
                );
              })()}
            </CardHeader>
            <CardContent className="p-0">
              {(() => {
                const renderValue = (val: any, depth = 0): React.ReactNode => {
                  if (val === null || val === undefined) return <span className="text-slate-300 font-bold italic text-[10px]">N/A</span>;
                  
                  if (Array.isArray(val)) {
                    if (val.length === 0) return null;
                    return (
                      <div className="space-y-3 w-full">
                        {val.map((item, i) => (
                          <div key={i} className={cn(
                            "p-4 rounded-2xl border transition-all shadow-sm",
                            depth % 2 === 0 ? "bg-slate-50/30 border-slate-100" : "bg-white border-slate-100"
                          )}>
                            {renderValue(item, depth + 1)}
                          </div>
                        ))}
                      </div>
                    );
                  }
                  if (typeof val === 'object') {
                    return (
                      <div className="grid grid-cols-1 gap-4 w-full">
                        {Object.entries(val).map(([k, v]) => (
                          <div key={k} className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start pb-4 border-b border-slate-100/50 last:border-0 last:pb-0">
                            <span className="text-[9px] font-black uppercase text-slate-400 min-w-[140px] mt-1.5 tracking-[0.1em]">{k.replace(/_/g, ' ')}</span>
                            <div className="flex-1 w-full min-w-0">
                              {renderValue(v, depth + 1)}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  
                  // Primary value rendering
                  const isLarge = depth <= 1;
                  return (
                    <span className={cn(
                      "font-black tracking-tight break-words block sm:inline",
                      isLarge ? "text-slate-900 text-lg sm:text-xl" : "text-brand-700 text-sm"
                    )}>
                      {String(val)}
                    </span>
                  );
                };

                const rankingData = college.rankingData || [];
                
                if (rankingData.length === 0) {
                  return (
                    <div className="py-24 text-center">
                       <Database className="w-12 h-12 text-slate-100 mx-auto mb-4" />
                       <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">No Intelligence Data Found</h3>
                       <p className="text-[10px] text-slate-300 mt-2 max-w-[320px] mx-auto uppercase font-bold leading-relaxed">
                         The Knowledge Repository for this institution is empty. Upload and process documents in the next tab to generate insights.
                       </p>
                    </div>
                  );
                }

                // Filter data based on active sub-tab
                const filteredInsights = rankingData.flatMap((group: any) => {
                  const categoryData = group.rankings?.[activeSubTab];
                  if (!categoryData) return [];
                  return [{
                    data: categoryData,
                    source: group.rankingSource?.displayName,
                    year: group.academicYear
                  }];
                });

                if (filteredInsights.length === 0) {
                   return (
                    <div className="py-24 text-center">
                       <LayoutDashboard className="w-12 h-12 text-slate-100 mx-auto mb-4" />
                       <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">No Data for this Category</h3>
                       <p className="text-[10px] text-slate-300 mt-2 max-w-[320px] mx-auto uppercase font-bold leading-relaxed">
                         The selected category hasn't been extracted yet for this institution.
                       </p>
                    </div>
                  );
                }

                return (
                  <div className="p-6 md:p-10">
                    <div className="space-y-12">
                      {filteredInsights.map((insight: any, idx: number) => (
                        <div key={idx} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                          <div className="flex items-center gap-4 mb-6">
                             <div className="px-4 py-1.5 bg-slate-900 rounded-xl text-white font-black text-[9px] uppercase tracking-[0.2em] shadow-md">
                               {insight.source} • {insight.year}
                             </div>
                             <div className="h-px bg-slate-100 flex-1" />
                          </div>

                          <div className="bg-white rounded-[40px] border border-slate-100 p-8 md:p-12 shadow-sm transition-all hover:shadow-md">
                             {renderValue(insight.data)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>

          {/* Metadata Management */}
          <div className="mt-12 pt-8 border-t border-slate-100">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300 mb-8 ml-1">Configuration & Metadata</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <CollegeMetadataEditor college={college} onUpdate={fetchCollege} />
              </div>
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col justify-center">
                <div className="space-y-6 text-center lg:text-left">
                  <div>
                    <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-2">Data Quality Assurance</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      All insights displayed in the hub are derived via multimodal vision models and verified by counselor-level audits.
                    </p>
                  </div>
                  <div className="pt-4 flex items-center gap-4 justify-center lg:justify-start">
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-200 shadow-sm">
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                     </div>
                     <span className="text-[10px] font-black uppercase text-slate-400 tracking-tight">Verified Archive Status</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <KnowledgeWorkflow 
          colleges={[college]} 
          rankingSources={rankingSources}
          initialCollegeId={college.id}
          initialDocuments={college.documents || []}
        />
      )}

    </div>
  );
}
