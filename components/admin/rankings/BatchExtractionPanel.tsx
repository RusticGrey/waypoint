'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw, CheckCircle2, AlertTriangle, FileText, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

interface CollegeStatus {
  collegeId: string;
  collegeName: string;
  academicYear: string;
  docCount: number;
  lastExtracted: string | null;
  status: string;
  isStale: boolean;
  insightId: string | null;
  modelUsed: string | null;
}

export function BatchExtractionPanel({ dataSourceId, academicYear }: { dataSourceId: string, academicYear: string }) {
  const [colleges, setColleges] = useState<CollegeStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [processingIds, setProcessingIds] = useState<Record<string, boolean>>({});
  const [successIds, setSuccessIds] = useState<Record<string, boolean>>({});
  const [overallProcessing, setOverallProcessing] = useState(false);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/colleges/knowledge/extraction-status?dataSourceId=${dataSourceId}&academicYear=${academicYear}`);
      if (res.ok) {
        const data = await res.json();
        setColleges(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dataSourceId) {
      fetchStatus();
      setSelectedIds([]);
    }
  }, [dataSourceId, academicYear]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === colleges.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(colleges.map(c => `${c.collegeId}:::${c.academicYear}`));
    }
  };

  const runBatchExtraction = async () => {
    if (selectedIds.length === 0) return;
    setOverallProcessing(true);

    const CONCURRENCY = 5;
    const queue = [...selectedIds];
    
    const processItem = async (combinedId: string) => {
      const [collegeId, academicYear] = combinedId.split(':::');
      setProcessingIds(prev => ({ ...prev, [combinedId]: true }));
      
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 300000); // 5 min timeout

        const res = await fetch('/api/admin/colleges/knowledge/re-extract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ collegeId, dataSourceId, academicYear }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        
        if (res.ok) {
          const result = await res.json();

          // Trigger success flash
          setSuccessIds(prev => ({ ...prev, [combinedId]: true }));
          setTimeout(() => {
            setSuccessIds(prev => ({ ...prev, [combinedId]: false }));
          }, 3000);

          setColleges(prev => prev.map(c => 
            (`${c.collegeId}:::${c.academicYear}` === combinedId) 
              ? { 
                  ...c, 
                  lastExtracted: result.insight.extractedAt, 
                  status: result.insight.status, 
                  isStale: false,
                  insightId: result.insight.id,
                  modelUsed: result.insight.llmModelUsed
                } 
              : c
          ));
        } else {
          const error = await res.json();
          console.error(`Failed to extract ${combinedId}:`, error);
          alert(`Error extracting ${combinedId}: ${error.error}`);
        }
      } catch (err: any) {
        console.error(`Failed to extract ${combinedId}:`, err);
        if (err.name === 'AbortError') {
           alert(`Extraction for ${combinedId} timed out after 5 minutes.`);
        }
      } finally {
        setProcessingIds(prev => ({ ...prev, [combinedId]: false }));
      }
    };

    // Parallel processing with concurrency limit
    const workers = [];
    for (let i = 0; i < Math.min(CONCURRENCY, queue.length); i++) {
      workers.push((async () => {
        while (queue.length > 0) {
          const item = queue.shift();
          if (item) await processItem(item);
        }
      })());
    }

    await Promise.all(workers);
    setOverallProcessing(false);
    setSelectedIds([]);
  };

  if (loading && colleges.length === 0) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
      </div>
    );
  }

  return (
    <Card className="h-full border-slate-200 shadow-xl overflow-hidden rounded-[32px] flex flex-col">
      <CardHeader className="bg-white border-b border-slate-100 py-6 px-8 flex flex-row items-center justify-between flex-shrink-0">
        <div>
          <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
            <RefreshCw className={cn("w-4 h-4", overallProcessing && "animate-spin text-brand-600")} />
            Extraction Engine
          </CardTitle>
          <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-tight">
            Manage bulk re-extractions across {colleges.length} institutional data points
          </p>
        </div>
        <div className="flex items-center gap-4">
           {overallProcessing && (
             <div className="flex items-center gap-3 px-4 py-2 bg-brand-50 rounded-xl border border-brand-100 animate-in fade-in slide-in-from-right-4">
                <div className="w-32 h-1.5 bg-brand-200 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-brand-600 transition-all duration-500" 
                     style={{ width: `${((selectedIds.length === 0 ? 1 : selectedIds.length) / colleges.length) * 100}%` }} 
                   />
                </div>
                <span className="text-[9px] font-black text-brand-700 uppercase tracking-widest animate-pulse">Processing Batch...</span>
             </div>
           )}
           {selectedIds.length > 0 && (
             <Button 
               onClick={runBatchExtraction} 
               disabled={overallProcessing}
               className="bg-brand-600 hover:bg-brand-700 text-white border-none shadow-lg shadow-brand-100 text-[10px] uppercase font-black h-9 px-6 rounded-xl transition-all flex items-center gap-2"
             >
               {overallProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
               Run For {selectedIds.length} Selected
             </Button>
           )}
           <Button variant="outline" size="sm" onClick={fetchStatus} disabled={loading || overallProcessing} className="h-9 rounded-xl text-[10px] uppercase font-black">
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5 mr-1" />} Sync Status
           </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-y-auto custom-scrollbar min-h-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white z-10 border-b border-slate-100">
              <tr className="bg-slate-50/50">
                <th className="py-4 px-6 w-10">
                   <Checkbox 
                     checked={selectedIds.length === colleges.length && colleges.length > 0} 
                     onCheckedChange={toggleSelectAll}
                   />
                </th>
                <th className="py-4 px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">College</th>
                <th className="py-4 px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Year</th>
                <th className="py-4 px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Docs</th>
                <th className="py-4 px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                <th className="py-4 px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Last Extraction</th>
                <th className="py-4 px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Model</th>
              </tr>
            </thead>
            <tbody>
              {colleges.length > 0 ? colleges.map((c) => {
                const combinedId = `${c.collegeId}:::${c.academicYear}`;
                const isProcessing = processingIds[combinedId];
                const isSuccess = successIds[combinedId];
                return (
                  <tr key={combinedId} className={cn(
                    "border-b border-slate-50 hover:bg-slate-50/30 transition-all duration-500",
                    c.isStale && "bg-amber-50/20",
                    isSuccess && "bg-green-50 ring-2 ring-inset ring-green-500/20"
                  )}>
                    <td className="py-4 px-6">
                       <Checkbox 
                         checked={selectedIds.includes(combinedId)} 
                         onCheckedChange={() => toggleSelect(combinedId)}
                         disabled={isProcessing}
                       />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-800 uppercase tracking-tight">{c.collegeName}</span>
                        <span className="text-[9px] text-slate-400 font-bold">ID: {c.collegeId}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                       <Badge variant="neutral" className="text-[9px] font-black">{c.academicYear}</Badge>
                    </td>
                    <td className="py-4 px-4 text-center">
                       <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500">
                         <FileText className="w-3.5 h-3.5" /> {c.docCount}
                       </div>
                    </td>
                    <td className="py-4 px-4">
                       {isProcessing ? (
                         <Badge variant="brand" className="animate-pulse flex items-center gap-1 text-[9px] font-black h-5 px-2">
                           <Loader2 className="w-2.5 h-2.5 animate-spin" /> Extracting...
                         </Badge>
                       ) : c.isStale ? (
                         <Badge variant="warning" className="flex items-center gap-1 text-[9px] font-black h-5 px-2">
                           <AlertTriangle className="w-2.5 h-2.5" /> Stale (v-old)
                         </Badge>
                       ) : c.status === 'missing' ? (
                         <Badge variant="neutral" className="text-[9px] font-black h-5 px-2">Missing</Badge>
                       ) : (
                         <Badge variant="success" className="flex items-center gap-1 text-[9px] font-black h-5 px-2">
                           <CheckCircle2 className="w-2.5 h-2.5" /> Up-to-date
                         </Badge>
                       )}
                    </td>
                    <td className="py-4 px-4">
                       <span className="text-[10px] font-bold text-slate-500 uppercase">
                         {c.lastExtracted ? new Date(c.lastExtracted).toLocaleString() : 'Never'}
                       </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{c.modelUsed || '-'}</span>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <p className="text-xs font-black text-slate-300 uppercase tracking-widest">No colleges found with documents for this source</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
