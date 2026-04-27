'use client';

import { CollegeKnowledgeChat } from "@/components/admin/rankings/CollegeKnowledgeChat";
import { ux } from "@/lib/ux";
import { Sparkles, MessageSquare } from "lucide-react";

export default function AssistantPage() {
  return (
    <div className={ux.layout.page}>
      <div className={ux.layout.header}>
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h1 className={ux.text.heading}>Beacon AI</h1>
            <p className={ux.text.body}>Your institutional intelligence partner for verified data insights.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200">
                <Sparkles className="w-6 h-6 text-brand-400" />
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <CollegeKnowledgeChat isFloating={false} />
      </div>
      
      <p className="text-[10px] text-center mt-12 font-black text-slate-300 uppercase tracking-[0.3em]">
        Institutional Intelligence • Grounded in Verified Data
      </p>
    </div>
  );
}
