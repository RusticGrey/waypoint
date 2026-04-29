"use client";

import React, { useRef, useState, useEffect } from "react";
import { UploadStepProps } from "./types";
import { Button } from "@/components/ui/button";
import { AlertCircle, Upload, File } from "lucide-react";

export const UploadStep: React.FC<UploadStepProps> = ({
  onUpload,
  colleges,
  dataSources,
  selectedCollege,
  setSelectedCollege,
  selectedSource,
  setSelectedSource,
  academicYear,
  setAcademicYear,
  loading,
  error,
}) => {

  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [documentType, setDocumentType] = useState<string>("true_pdf");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!selectedCollege || !selectedSource || !academicYear || files.length === 0) {
      return;
    }

    const documents = await Promise.all(
      files.map(async (file) => {
        let content = '';
        if (documentType === 'html' || documentType === 'txt') {
          content = await file.text();
        } else {
          // Store as base64 for binaries
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          content = buffer.toString('base64');
        }

        return {
          fileName: file.name,
          content: content,
          contentType: file.type || (documentType === 'true_pdf' ? 'application/pdf' : 'text/html'),
        };
      })
    );

    await onUpload(documents);
  };

  const isValid =
    selectedCollege &&
    selectedSource &&
    academicYear &&
    documentType &&
    files.length > 0;

  return (
    <div className="w-full space-y-4">
      {/* Step Header */}
      <div className="mb-4">
        <h2 className="text-xl font-black text-slate-900 tracking-tight mb-0.5">
          Upload New Source
        </h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Stage files for institutional analysis
        </p>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* College Selection - Hidden if only one college or already selected */}
        {colleges.length > 1 && (
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
              Target College
            </label>
            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 focus:ring-2 focus:ring-brand-500 outline-none transition-all font-bold text-slate-700"
            >
              <option value="">Select a college...</option>
              {colleges.map((college) => (
                <option key={college.id} value={college.id}>
                  {college.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Ranking Source Selection */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
            Ranking Source
          </label>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 focus:ring-2 focus:ring-brand-500 outline-none transition-all font-bold text-slate-700"
            >
              <option value="">Select a data source...</option>
              {dataSources
                .filter((s) => s.isActive)
                .map((source) => (
                  <option key={source.id} value={source.id}>
                    {source.displayName}
                  </option>
                ))}
            </select>
        </div>

        {/* Academic Year */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
            Academic Cycle
          </label>
          <select
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 focus:ring-2 focus:ring-brand-500 outline-none transition-all font-bold text-slate-700"
          >
            <option value="">Select academic year...</option>
            {(() => {
              const currentYear = new Date().getFullYear();
              const months = new Date().getMonth();
              // If we are past May, the "current" cycle is next year's start
              const startYear = months > 4 ? currentYear : currentYear - 1;
              
              const years = [];
              for (let i = 0; i < 4; i++) {
                const year = startYear - i;
                const yearString = `${year}-${year + 1}`;
                years.push(yearString);
              }
              return years.map(year => (
                <option key={year} value={year}>{year}</option>
              ));
            })()}
          </select>
        </div>

        {/* Document Type Selection */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
            Document Type
          </label>
          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 focus:ring-2 focus:ring-brand-500 outline-none transition-all font-bold text-slate-700"
          >
            <option value="true_pdf">Official PDF (Searchable)</option>
            <option value="image_pdf">Image-only PDF (Scanned)</option>
            <option value="html">HTML Web Page</option>
            <option value="image">Direct Image (PNG/JPG)</option>
            <option value="txt">Plain Text</option>
          </select>
        </div>
      </div>

      {/* File Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
          dragActive
            ? "border-brand-500 bg-brand-50"
            : "border-slate-200 bg-slate-50/30"
        }`}
      >
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 mx-auto mb-2">
           <Upload className={`w-5 h-5 ${dragActive ? 'text-brand-600' : 'text-slate-300'}`} />
        </div>
        <p className="text-slate-900 font-bold text-xs mb-0.5">
          {dragActive ? "Drop documents here" : "Drag and drop source files"}
        </p>
        <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-4">
          PDF, HTML, or Images supported
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleChange}
          className="hidden"
          disabled={loading}
          accept=".pdf,.html,.txt,image/*"
        />
        <Button
          variant="secondary"
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className="rounded-xl px-8 shadow-sm"
        >
          Browse Files
        </Button>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="border border-slate-100 rounded-2xl p-6 bg-slate-50/50 shadow-inner">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
            Staging Area ({files.length} items)
          </h3>
          <ul className="space-y-2 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between text-xs text-slate-600 p-3 bg-white border border-slate-100 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <File className="w-4 h-4 text-brand-600 shrink-0" />
                  <span className="font-bold uppercase tracking-tight break-all">{file.name}</span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-[10px] font-black uppercase text-red-400 hover:text-red-600 transition-colors"
                >
                  Discard
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex flex-col gap-4 mt-4">
        <Button
          onClick={handleSubmit}
          disabled={!isValid || loading}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-black uppercase tracking-widest text-xs py-6 rounded-2xl shadow-xl shadow-brand-100 transition-all active:scale-[0.98] disabled:opacity-30"
        >
          {loading ? "Processing Upload..." : "Finalize Upload & Return to Repository"}
        </Button>
      </div>
    </div>
  );
};
