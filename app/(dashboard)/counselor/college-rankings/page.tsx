'use client';

import { useState, useEffect } from 'react';
import { ux } from '@/lib/ux';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Loader2, Search, CheckCircle2, ShieldAlert, 
  Sparkles, Database, Check, ExternalLink,
  Upload, MessageSquare, Globe
} from 'lucide-react';
import Link from 'next/link';
import { CollegeDocumentUpload } from '@/components/admin/rankings/CollegeDocumentUpload';
import { CollegeChatInterface } from '@/components/admin/rankings/CollegeChatInterface';
import { TemplateManager } from '@/components/admin/rankings/TemplateManager';

export default function RankingsManager() {
  const [colleges, setColleges] = useState<any[]>([]);
  const [majors, setMajors] = useState<any[]>([]);
  const [selectedCollege, setSelectedCollege] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
  const [hasCredentials, setHasCredentials] = useState<boolean | null>(null);
  
  const availableFields = [
    { id: 'rankings', label: 'College Rankings' },
    { id: 'acceptanceRate', label: 'Acceptance Rate' },
    { id: 'costOfAttendance', label: 'Cost of Attendance' },
    { id: 'admissionsData', label: 'SAT/ACT & GPA' }
  ];
  
  const [proposal, setProposal] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [approving, setApproving] = useState(false);
  const [showMappingForm, setShowMappingForm] = useState(false);
  const [manualUrl, setManualUrl] = useState('');
  const [mappingSubmitting, setMappingSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'scrape' | 'upload' | 'chat' | 'templates'>('scrape');

  useEffect(() => {
    // Determine upcoming academic year
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear = currentYear + 1;
    setAcademicYear(`${currentYear}-${nextYear}`);

    // Fetch colleges
    fetch('/api/colleges')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.colleges)) setColleges(data.colleges);
      })
      .catch(() => setColleges([]));

    // Fetch majors
    fetch('/api/admin/majors')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMajors(data);
      })
      .catch(() => setMajors([]));

    // Check credentials status
    fetch('/api/admin/ranking-source-credentials')
      .then(res => res.json())
      .then(data => {
        const usNews = data.find((d: any) => d.sourceName === 'us_news');
        setHasCredentials(!!(usNews?.hasEmail && usNews?.hasPassword));
      })
      .catch(() => setHasCredentials(false));
  }, []);

  const toggleMajor = (name: string) => {
    setSelectedMajors(prev => 
      prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
    );
  };

  const handleScrape = async () => {
    setLoading(true);
    setProposal(null);
    setShowMappingForm(false);
    try {
      const res = await fetch('/api/admin/college-rankings/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collegeId: selectedCollege,
          sourceName: 'us_news',
          academicYear,
          fields: ['rankings', 'acceptanceRate', 'costOfAttendance', 'admissionsData'],
          majors: selectedMajors,
        }),
      });
      const data = await res.json();
      if (res.status === 500 && data.error && data.error.includes('No mapping found')) {
        setShowMappingForm(true);
        throw new Error(data.error);
      }
      if (data.error) throw new Error(data.error);
      setProposal(data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMapping = async () => {
    setMappingSubmitting(true);
    try {
      const res = await fetch('/api/admin/college-config/mapping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collegeId: selectedCollege,
          sourceName: 'us_news',
          profileUrl: manualUrl,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      alert('Mapping saved! You can now try scraping again.');
      setShowMappingForm(false);
      setManualUrl('');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setMappingSubmitting(false);
    }
  };

  const handleApprove = async () => {
    setApproving(true);
    try {
      const res = await fetch('/api/admin/college-rankings/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposal }),
      });
      if (res.ok) {
        setProposal(null);
        alert('Data successfully committed to the database.');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setApproving(false);
    }
  };

  return (
    <div className={ux.layout.page}>
      <div className={ux.layout.header}>
        <h1 className={ux.text.heading}>College Knowledge Center</h1>
        <p className={ux.text.body}>Manage college data via AI-powered scraping, document uploads, and interactive knowledge chat.</p>
      </div>

      {/* Modern Tab Switcher */}
      <div className="flex p-1 bg-slate-100/50 rounded-2xl mb-8 w-fit border border-slate-200 shadow-inner">
        {[
          { id: 'scrape', label: 'Selective Scrape', icon: Globe },
          { id: 'upload', label: 'Document Repository', icon: Upload },
          { id: 'templates', label: 'Template Management', icon: Database },
          { id: 'chat', label: 'Knowledge Chat', icon: MessageSquare },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
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

      {activeTab === 'scrape' && (
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Search Control */}
        <div className="lg:col-span-4 space-y-6">
          <Card className={ux.card.base}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-brand-600" />
                <CardTitle className={ux.text.subheading}>Configuration</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className={ux.form.label}>College</label>
                  <select 
                    className={ux.form.input}
                    value={selectedCollege}
                    onChange={(e) => setSelectedCollege(e.target.value)}
                  >
                    <option value="">Choose a college...</option>
                    {colleges.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className={ux.form.label}>Academic Year</label>
                  <select 
                    className={ux.form.input}
                    value={academicYear} 
                    onChange={(e) => setAcademicYear(e.target.value)}
                  >
                    <option value="2023-2024">2023-2024</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2025-2026">2025-2026</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className={ux.form.label}>Scrape Targets</label>
                  <div className="grid grid-cols-1 gap-2">
                    {availableFields.map(field => (
                      <div key={field.id} className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-600">
                        <Check className="w-3 h-3 text-green-600" />
                        {field.label}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className={ux.form.label}>College Majors of Interest</label>
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1 bg-slate-50/50 rounded-xl border border-slate-100">
                    {majors.length > 0 ? majors.map(major => (
                      <button
                        key={major.id}
                        onClick={() => toggleMajor(major.name)}
                        className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all",
                          selectedMajors.includes(major.name)
                            ? "bg-brand-600 border-brand-600 text-white shadow-md"
                            : "bg-white border-slate-200 text-slate-400 hover:border-brand-300 shadow-sm"
                        )}
                      >
                        {major.name}
                      </button>
                    )) : (
                      <span className="text-[10px] text-slate-400 p-2 italic">Loading majors...</span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Select specific majors to fetch subject-area rankings.</p>
                </div>

                <div className="space-y-2">
                  <label className={ux.form.label}>Source Adapter</label>
                  <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <Badge variant="brand">US News</Badge>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Phase 1 Default</span>
                  </div>
                  {hasCredentials === false && (
                    <div className="flex flex-col gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl mt-2">
                      <div className="flex items-start gap-2">
                        <ShieldAlert className="w-4 h-4 text-amber-600 mt-0.5" />
                        <p className="text-xs text-amber-800 leading-snug font-medium">
                          <strong>Anonymous Mode Active</strong>: You haven't provided premium US News credentials yet. Scraping will only yield publicly visible data.
                        </p>
                      </div>
                      <Link href="/settings">
                        <Button variant="outline" className="w-full bg-white border-amber-200 text-amber-700 hover:bg-amber-100 hover:text-amber-800 h-8 text-[10px] uppercase font-black tracking-widest px-2">
                          <ExternalLink className="w-3 h-3 mr-2" />
                          Add Premium Credentials
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <Button 
                className="w-full py-6 text-sm" 
                onClick={handleScrape} 
                disabled={loading || !selectedCollege || showMappingForm}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Extracting Data...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Start Selective Scrape
                  </span>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results / Proposal View */}
        <div className="lg:col-span-8">
          {showMappingForm && (
            <Card className={cn(ux.card.base, "border-yellow-200 bg-yellow-50/30")}>
              <CardHeader>
                <div className="flex items-center gap-2 text-yellow-700">
                  <ShieldAlert className="w-5 h-5" />
                  <CardTitle className={ux.text.subheading}>Source Mapping Required</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className={ux.text.body}>
                  We couldn't find a US News profile URL for this college. Please provide it manually to enable scraping.
                </p>
                <div className="space-y-2">
                  <label className={ux.form.label}>US News Profile URL</label>
                  <Input 
                    placeholder="https://www.usnews.com/best-colleges/..." 
                    value={manualUrl}
                    onChange={(e) => setManualUrl(e.target.value)}
                    className="bg-white"
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setShowMappingForm(false)}>Cancel</Button>
                  <Button 
                    className="flex-1" 
                    onClick={handleSaveMapping}
                    disabled={mappingSubmitting || !manualUrl}
                  >
                    {mappingSubmitting ? 'Saving...' : 'Save Mapping & Resolve'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {!proposal && !loading && !showMappingForm && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl bg-white/50 text-center p-12">
               <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mb-4">
                  <Database className="w-8 h-8 text-brand-400" />
               </div>
               <h3 className={ux.text.subheading}>Ready to Scrape</h3>
               <p className={cn(ux.text.body, "max-w-xs mx-auto mt-2")}>
                 Configure your targets on the left and start the AI-powered extraction process.
               </p>
            </div>
          )}

          {loading && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-100 shadow-sm p-12 text-center">
               <div className="relative w-20 h-20 mb-6">
                  <div className="absolute inset-0 bg-brand-100 rounded-full animate-ping opacity-25"></div>
                  <div className="relative w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center">
                     <Sparkles className="w-10 h-10 text-brand-600 animate-pulse" />
                  </div>
               </div>
               <h3 className={ux.text.subheading}>AI Extraction in Progress</h3>
               <p className={cn(ux.text.body, "mt-2")}>
                 Gemini 3.1 Flash is parsing the rendered profile to extract structured data...
               </p>
            </div>
          )}

          {proposal && (
            <Card className={cn(ux.card.base, "border-brand-200 shadow-xl overflow-hidden")}>
              <div className="bg-brand-600 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-black uppercase tracking-widest text-xs">AI Extraction Result</span>
                </div>
                <Badge variant="brand" className="bg-brand-500 text-white border-transparent">
                  Model: {proposal.modelUsed}
                </Badge>
              </div>
              <CardContent className="p-8 space-y-8">
                <div className="grid gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">Confidence Score</h4>
                      <p className="text-2xl font-black text-slate-900">{(proposal.confidence * 100).toFixed(1)}%</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Proposed Data Payload</h4>
                    <div className="bg-slate-950 rounded-2xl p-6 overflow-hidden">
                      <pre className="text-brand-300 text-xs font-mono overflow-auto max-h-[300px]">
                        {JSON.stringify(proposal.proposedData, null, 2)}
                      </pre>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {proposal.fieldsFound.map((f: string) => (
                      <Badge key={f} variant="success" className="lowercase">+{f}</Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    onClick={() => setProposal(null)}
                    disabled={approving}
                  >
                    Discard
                  </Button>
                  <Button 
                    className="flex-[2] py-6" 
                    onClick={handleApprove}
                    disabled={approving}
                  >
                    {approving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Approve & Commit to Database
                      </span>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      )}

      {activeTab === 'upload' && (
        <CollegeDocumentUpload colleges={colleges} />
      )}

      {activeTab === 'templates' && (
        <TemplateManager />
      )}

      {activeTab === 'chat' && (
        <CollegeChatInterface colleges={colleges} />
      )}
    </div>
  );
}
