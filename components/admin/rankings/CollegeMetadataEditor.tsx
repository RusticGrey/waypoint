'use client';

import { useState } from 'react';
import { ux } from '@/lib/ux';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Save, X, Loader2, CheckCircle2, 
  AlertCircle, Edit3, Settings
} from 'lucide-react';

interface CollegeMetadataEditorProps {
  college: any;
  onUpdate?: () => void;
}

export function CollegeMetadataEditor({ college, onUpdate }: CollegeMetadataEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: college.name,
    country: college.country || 'United States',
    website: college.website || '',
    aliases: college.aliases?.join(', ') || '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...formData,
        aliases: formData.aliases.split(',').map((s: string) => s.trim()).filter(Boolean)
      };

      const res = await fetch(`/api/counselor/colleges/${college.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsEditing(false);
        if (onUpdate) onUpdate();
      } else {
        throw new Error('Failed to update college info');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className={ux.card.base}>
      <CardHeader className="py-4 border-b border-slate-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-brand-600" />
            <CardTitle className={ux.text.subheading}>Metadata</CardTitle>
          </div>
          {!isEditing ? (
            <Button variant="ghost" onClick={() => setIsEditing(true)} className="h-8 text-[10px] uppercase font-black px-3">
              <Edit3 className="w-3 h-3 mr-1.5" /> Edit
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => setIsEditing(false)} className="h-8 text-[10px] uppercase font-black px-3">
                <X className="w-3 h-3 mr-1.5" /> Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving} className="h-8 text-[10px] uppercase font-black px-3">
                {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <><Save className="w-3 h-3 mr-1.5" /> Save</>}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {isEditing ? (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className={ux.form.label}>College Name</label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="h-9 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className={ux.form.label}>Country</label>
              <Input 
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                className="h-9 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className={ux.form.label}>Website</label>
              <Input 
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                className="h-9 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className={ux.form.label}>Aliases (comma separated)</label>
              <Input 
                value={formData.aliases}
                onChange={(e) => setFormData({...formData, aliases: e.target.value})}
                placeholder="e.g. CMU, Carnegie, Tartans"
                className="h-9 text-xs"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Database ID</p>
              <p className="text-xs font-mono text-slate-600">{college.id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Organization</p>
              <p className="text-xs font-bold text-slate-900">{college.organizationId}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Country</p>
              <p className="text-xs font-bold text-slate-900">{college.country || 'United States'}</p>
            </div>
            {college.aliases?.length > 0 && (
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Known Aliases</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {college.aliases.map((alias: string) => (
                    <Badge key={alias} variant="neutral" className="text-[9px] px-2 py-0">
                      {alias}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase mt-2">
            <AlertCircle className="w-3 h-3" />
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
