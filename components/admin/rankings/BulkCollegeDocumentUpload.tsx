'use client';

import { useState } from 'react';
import { ux } from '@/lib/ux';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Upload, FileText, CheckCircle2, AlertCircle, 
  Loader2, X, Info, Clock, Check, FileJson
} from 'lucide-react';

interface FileStatus {
  file: File;
  status: 'pending' | 'uploading' | 'success' | 'error';
  message?: string;
  extractedData?: any;
  documentId?: string;
}

interface BulkCollegeDocumentUploadProps {
  colleges: any[];
  initialCollegeId?: string;
  onComplete?: () => void;
}

export function BulkCollegeDocumentUpload({ colleges, initialCollegeId, onComplete }: BulkCollegeDocumentUploadProps) {
  const [selectedCollege, setSelectedCollege] = useState(initialCollegeId || '');
  const [selectedSource, setSelectedSource] = useState('us_news');
  const [selectedDocumentType, setSelectedDocumentType] = useState('html');
  const [files, setFiles] = useState<FileStatus[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        file,
        status: 'pending' as const
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFile = async (index: number) => {
    const fileStatus = files[index];
    if (!selectedCollege) return;

    setFiles(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], status: 'uploading' };
      return updated;
    });

    const formData = new FormData();
    formData.append('collegeId', selectedCollege);
    formData.append('section', 'generic'); 
    formData.append('file', fileStatus.file);
    formData.append('sourceType', selectedSource);
    formData.append('documentType', selectedDocumentType);

    try {
      const res = await fetch('/api/admin/college-documents/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setFiles(prev => {
          const updated = [...prev];
          updated[index] = { 
            ...updated[index], 
            status: 'success', 
            message: data.message,
            documentId: data.documentId,
            extractedData: data.extractedData // We'll need to make sure API returns this
          };
          return updated;
        });
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (err: any) {
      setFiles(prev => {
        const updated = [...prev];
        updated[index] = { ...updated[index], status: 'error', message: err.message };
        return updated;
      });
    }
  };

  const uploadAll = async () => {
    if (!selectedCollege || files.length === 0 || isUploading) return;
    setIsUploading(true);

    for (let i = 0; i < files.length; i++) {
      if (files[i].status === 'pending' || files[i].status === 'error') {
        await uploadFile(i);
      }
    }

    setIsUploading(false);
    if (onComplete) onComplete();
  };

  return (
    <div className="space-y-6">
      <Card className={ux.card.base}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-brand-600" />
              <CardTitle className={ux.text.subheading}>Bulk Document Upload</CardTitle>
            </div>
            <Badge variant="neutral" className="text-[10px] uppercase font-black tracking-widest">
              Generic Extraction Active
            </Badge>
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
                disabled={isUploading}
              >
                <option value="">Select a college for this batch...</option>
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
                disabled={isUploading}
              >
                <option value="us_news">US News</option>
                <option value="niche">Niche</option>
                <option value="common_app">Common App</option>
                <option value="institutional">Institutional (Generic)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className={ux.form.label}>Document Type</label>
              <select 
                className={ux.form.input}
                value={selectedDocumentType}
                onChange={(e) => setSelectedDocumentType(e.target.value)}
                disabled={isUploading}
              >
                <option value="html">HTML</option>
                <option value="true_pdf">True PDF (Text-extractable)</option>
                <option value="image_pdf">Image-based PDF (e.g. Chrome Save as PDF)</option>
                <option value="image">Image (PNG, JPG, etc.)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className={ux.form.label}>Add Documents</label>
            <div className={cn(
              "relative border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center gap-4 text-center overflow-hidden",
              "border-slate-200 hover:border-brand-200 bg-slate-50/50"
            )}>
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Click to add multiple files</p>
                <p className="text-xs text-slate-500">HTML, PDF, or Images (max 10MB each)</p>
              </div>
              <input 
                type="file" 
                multiple
                accept=".html,.htm,.pdf,.png,.jpg,.jpeg,.webp" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </div>
          </div>

          {files.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Queue ({files.length})</h4>
                <Button variant="ghost" onClick={() => setFiles([])} disabled={isUploading} className="h-6 text-[10px] text-slate-400">
                  Clear All
                </Button>
              </div>
              <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        f.status === 'success' ? "bg-green-50 text-green-600" :
                        f.status === 'error' ? "bg-red-50 text-red-600" :
                        f.status === 'uploading' ? "bg-brand-50 text-brand-600" : "bg-slate-50 text-slate-400"
                      )}>
                        {f.status === 'uploading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                      </div>
                      <div className="max-w-[200px]">
                        <p className="text-xs font-bold text-slate-900 truncate">{f.file.name}</p>
                        <p className="text-[10px] text-slate-500 font-medium">{(f.file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {f.status === 'success' && <Badge variant="success" className="text-[10px]">Uploaded</Badge>}
                      {f.status === 'error' && (
                        <div className="group relative">
                          <AlertCircle className="w-4 h-4 text-red-500 cursor-help" />
                          <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            {f.message}
                          </div>
                        </div>
                      )}
                      <Button 
                        variant="ghost" 
                        onClick={() => removeFile(i)} 
                        disabled={isUploading}
                        className="h-8 w-8 p-0 text-slate-400 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button 
            className="w-full py-6"
            onClick={uploadAll}
            disabled={isUploading || !selectedCollege || files.length === 0}
          >
            {isUploading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing Batch...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload {files.length} Files to Queue
              </span>
            )}
          </Button>

          <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-slate-700">
              <Info className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">Workflow:</span>
            </div>
            <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside font-medium leading-relaxed">
              <li>Select the target college and data source.</li>
              <li>Choose the <strong>correct Document Type</strong> (Very important for accurate AI processing).</li>
              <li>Upload files to the processing queue.</li>
              <li>Switch to the <strong>Document Repository</strong> tab to run batch AI extraction and review the results.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
