"use client";

import React from "react";
import { SuccessStepProps } from "./types";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, FileCheck } from "lucide-react";
import Link from "next/link";

export const SuccessStep: React.FC<SuccessStepProps> = ({
  approvedCount,
  collegeName,
  academicYear,
  onNewWorkflow,
  approvedDocuments,
}) => {
  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Success Icon & Message */}
      <div className="text-center mb-12">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
          Data Published
        </h2>
        <p className="text-slate-500 font-medium">
          Institutional insights have been successfully verified and added to the repository.
        </p>
      </div>

      {/* Summary Box */}
      <div className="bg-white border border-slate-100 rounded-3xl p-8 mb-10 shadow-xl shadow-slate-200/50 space-y-4">
        <div className="flex items-center justify-between py-2 border-b border-slate-50">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target Institution</span>
          <span className="font-bold text-slate-900 text-lg">
            {collegeName}
          </span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-slate-50">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Academic Year
          </span>
          <span className="font-bold text-slate-700">
            {academicYear}
          </span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Approved Sources
          </span>
          <span className="px-4 py-1 bg-green-50 text-green-700 rounded-full font-black text-sm border border-green-100">
            {approvedCount} Documents
          </span>
        </div>
      </div>

      {/* Approved Documents List */}
      {approvedDocuments.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Approved Documents
          </h3>
          <ul className="space-y-2">
            {approvedDocuments.map((doc) => (
              <li
                key={doc.id}
                className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <FileCheck className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                  {doc.fileName}
                </span>
                <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                  {doc.academicYear}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Steps */}
      <div className="bg-slate-50/50 border border-slate-100 rounded-3xl p-8 mb-10">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
          Knowledge Base Propagation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-100 text-xs font-black text-brand-600">1</div>
            <p className="text-xs font-bold text-slate-600">Immediate availability for Counselor reference</p>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-100 text-xs font-black text-brand-600">2</div>
            <p className="text-xs font-bold text-slate-600">Enabled for Student-facing AI Chat citations</p>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-100 text-xs font-black text-brand-600">3</div>
            <p className="text-xs font-bold text-slate-600">Archived for longitudinal institutional analysis</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={onNewWorkflow}
          className="flex-[2] bg-brand-600 hover:bg-brand-700 text-white font-black uppercase tracking-widest text-xs py-6 rounded-2xl shadow-xl shadow-brand-100 transition-all active:scale-[0.98]"
        >
          <ArrowRight className="w-4 h-4 mr-2 stroke-[3px]" />
          Initiate New Process
        </Button>
        <Link href="/counselor/colleges" className="flex-1">
          <Button variant="outline" className="w-full border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-500 font-black uppercase tracking-widest text-xs py-6 rounded-2xl transition-all h-full">
            Back to Directory
          </Button>
        </Link>
      </div>
    </div>
  );
};
