'use client';

import { useState } from 'react';
import { ux } from '@/lib/ux';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Upload, FileText, CheckCircle2, AlertCircle, 
  Loader2, X, Info
} from 'lucide-react';

interface CollegeDocumentUploadProps {
  colleges: any[];
  onUploadSuccess?: () => void;
}

const SECTIONS = [
  { id: 'overall', label: 'Overall Ranking' },
  { id: 'admissions', label: 'Admissions Stats' },
  { id: 'academics', label: 'Academic Info' },
  { id: 'finance', label: 'Financial Data' },
  { id: 'campus', label: 'Campus & Student Life' },
];

export function CollegeDocumentUpload({ colleges, onUploadSuccess }: CollegeDocumentUploadProps) {
  const [selectedCollege, setSelectedCollege] = useState('');
  const [selectedSource, setSelectedSource] = useState('us_news');
  const [selectedSection, setSelectedSection] = useState('overall');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedCollege || !file) return;

    setUploading(true);
    setStatus(null);

    const formData = new FormData();
    formData.append('collegeId', selectedCollege);
    formData.append('section', selectedSection);
    formData.append('file', file);
    formData.append('sourceType', selectedSource);

    try {
      const res = await fetch('/api/admin/college-documents/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ 
          type: 'success', 
          message: `Successfully uploaded and ${data.extractionStatus === 'extracted' ? 'processed' : 'preserved'} ${file.name}` 
        });
        setFile(null);
        if (onUploadSuccess) onUploadSuccess();
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className={ux.card.base}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-brand-600" />
            <CardTitle className={ux.text.subheading}>Upload College HTML</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <label className={ux.form.label}>Target College</label>
              <select 
                className={ux.form.input}
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
              >
                <option value="">Select a college...</option>
                {colleges.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className={ux.form.label}>Data Source</label>
              <select 
                className={ux.form.input}
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
              >
                <option value="us_news">US News</option>
                <option value="niche">Niche</option>
                <option value="common_app">Common App</option>
                <option value="institutional">Institutional (Generic)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className={ux.form.label}>Document Section</label>
              <select 
                className={ux.form.input}
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                {SECTIONS.map(s => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className={ux.form.label}>Institutional Document (HTML or PDF)</label>
            <div className={cn(
              "relative border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center gap-4 text-center overflow-hidden",
              file ? "border-brand-300 bg-brand-50/30" : "border-slate-200 hover:border-brand-200 bg-slate-50/50"
            )}>
              {file ? (
                <>
                  <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center text-brand-600">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="z-10">
                    <p className="text-sm font-bold text-slate-900">{file.name}</p>
                    <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <Button variant="ghost" onClick={() => setFile(null)} className="h-8 text-xs px-2 z-10">
                    <X className="w-3 h-3 mr-1" /> Remove
                  </Button>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Click to upload or drag & drop</p>
                    <p className="text-xs text-slate-500">HTML or PDF files (max 10MB)</p>
                  </div>
                  <input 
                    type="file" 
                    accept=".html,.htm,.pdf" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    onChange={handleFileChange}
                  />
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {status && (
              <div className={cn(
                "p-4 rounded-xl flex items-start gap-3 text-sm font-medium",
                status.type === 'success' ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"
              )}>
                {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                <p>{status.message}</p>
              </div>
            )}

            <Button 
              className="w-full py-6"
              onClick={handleUpload}
              disabled={uploading || !selectedCollege || !file}
            >
              {uploading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing with AI...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload & Extract Knowledge
                </span>
              )}
            </Button>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-slate-700">
              <Info className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">How to get HTML:</span>
            </div>
            <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside font-medium leading-relaxed">
              <li>Open the college profile on US News in your browser</li>
              <li>Navigate to a section (e.g., Admissions, Academics)</li>
              <li>Right-click anywhere and select "Save Page As..."</li>
              <li>Ensure "Webpage, HTML Only" is selected and save</li>
              <li>Upload that file here</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
