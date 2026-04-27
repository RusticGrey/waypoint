'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ux } from '@/lib/ux';
import { cn } from '@/lib/utils';
import { IntegrationSetupCard } from '@/components/meetings/IntegrationSetupCard';
import { HostAvailabilityView } from '@/components/meetings/HostAvailabilityView';
import { Key, Save, ShieldCheck } from 'lucide-react';

interface SettingsPageProps {
  user: any;
  student: any;
  counselorSettings: any;
}

export default function SettingsPage({ user, student, counselorSettings }: SettingsPageProps) {
  const { data: session, update } = useSession();
  const [activeTab, setActiveTab] = useState<'account' | 'meetings' | 'preferences'>('account');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    password: '',
    timezone: user.timezone || 'UTC',
    notificationsEnabled: student?.notificationsEnabled ?? true,
    defaultMeetingDuration: counselorSettings?.defaultMeetingDuration || 30,
    bufferTime: counselorSettings?.bufferTime || 15,
  });

  const [rankingCreds, setRankingCreds] = useState({
    sourceName: 'us_news',
    email: '',
    password: '',
  });
  const [credsLoading, setCredsLoading] = useState(false);
  const [credsSuccess, setCredsSuccess] = useState(false);

  useEffect(() => {
    if (activeTab === 'preferences' && user.role === 'counselor') {
       fetch('/api/admin/ranking-source-credentials')
         .then(res => res.json())
         .then(data => {
            const usNews = data.find((d: any) => d.sourceName === 'us_news');
            if (usNews) {
               setRankingCreds(prev => ({ ...prev, email: usNews.hasEmail ? '********' : '' }));
            }
         });
    }
  }, [activeTab, user.role]);

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredsLoading(true);
    setCredsSuccess(false);
    try {
      const res = await fetch('/api/admin/ranking-source-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rankingCreds),
      });
      if (res.ok) setCredsSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setCredsLoading(false);
    }
  };

  const setupRequired = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('reason') === 'setup_required';

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        if (formData.firstName !== user.firstName || formData.lastName !== user.lastName) {
          await update({ name: `${formData.firstName} ${formData.lastName}` });
        }
      }
    } catch (error) {
      console.error('Update failed', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'account', label: 'Account' },
    ...(user.role === 'counselor' ? [{ id: 'meetings', label: 'Meeting Setup' }, { id: 'preferences', label: 'Platform Settings' }] : []),
    ...(user.role === 'student' ? [{ id: 'preferences', label: 'Preferences' }] : []),
  ];

  return (
    <div className={ux.layout.page}>
      {setupRequired && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl mb-10 flex items-start gap-3 shadow-sm">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="font-bold">Integration Setup Required</p>
            <p className="text-sm mt-1">
              You must connect Google Calendar before managing meetings. Please go to the <strong>Meeting Setup</strong> tab to complete setup.
            </p>
          </div>
        </div>
      )}

      <div className={ux.layout.header}>
        <h1 className={ux.text.heading}>Settings</h1>
        <p className={ux.text.body}>Manage your personal information and application preferences.</p>
      </div>

      <div className="flex bg-surface-muted p-1.5 rounded-xl w-fit mb-10 overflow-x-auto no-scrollbar max-w-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              setSuccess(false);
            }}
            className={cn(
              "px-6 py-2.5 text-xs font-black uppercase tracking-widest rounded-lg transition-all whitespace-nowrap",
              activeTab === tab.id ? "bg-white shadow-sm text-brand-600" : "text-slate-400 hover:text-slate-600"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="max-w-4xl">
        {activeTab === 'account' && (
          <form onSubmit={handleUpdateSettings} className="space-y-8">
            <Card variant="base">
              <CardHeader>
                <CardTitle className={ux.text.subheading}>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={ux.form.label}>First Name</label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className={ux.form.input}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={ux.form.label}>Last Name</label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className={ux.form.input}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={ux.form.label}>Preferred Timezone</label>
                  <select
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                    className={cn(ux.form.input, "bg-white")}
                  >
                    <option value="UTC">UTC (Universal Time)</option>
                    <option value="America/New_York">Eastern Time (US & Canada)</option>
                    <option value="America/Chicago">Central Time (US & Canada)</option>
                    <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                    <option value="Asia/Kolkata">India Standard Time (IST)</option>
                    <option value="Asia/Dubai">Gulf Standard Time (GST)</option>
                  </select>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Your calendar invites will be adjusted to this timezone.</p>
                </div>

                <div className="space-y-2 pt-2">
                  <label className={ux.form.label}>Email Address</label>
                  <Input
                    value={user.email}
                    disabled
                    className={cn(ux.form.input, "opacity-50 cursor-not-allowed")}
                  />
                </div>
              </CardContent>
            </Card>

            <Card variant="base">
              <CardHeader>
                <CardTitle className={ux.text.subheading}>Security</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <label className={ux.form.label}>Change Password</label>
                  <Input
                    type="password"
                    placeholder="Enter new password to update"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={ux.form.input}
                  />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Leave blank if you don't want to change it.</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
              {success && <span className={ux.text.accent + " text-green-600"}>✓ Account Updated</span>}
            </div>
          </form>
        )}

        {activeTab === 'meetings' && user.role === 'counselor' && (
          <div className="space-y-12">
            <section className="space-y-6">
              <h2 className={ux.text.accent}>1. Meeting Integrations</h2>
              <IntegrationSetupCard 
                status={{
                  googleConnected: counselorSettings?.googleConnected || false,
                  zoomConnected: counselorSettings?.zoomConnected || false,
                  preferredConference: counselorSettings?.preferredConference || 'Zoom'
                }} 
                role="counselor" 
              />
            </section>

            <section className="space-y-6">
              <h2 className={ux.text.accent}>2. Meeting Defaults</h2>
              <Card variant="base">
                <CardContent className="pt-6">
                  <form onSubmit={handleUpdateSettings} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className={ux.form.label}>Default Duration (minutes)</label>
                        <Input
                          type="number"
                          value={formData.defaultMeetingDuration}
                          onChange={(e) => setFormData({ ...formData, defaultMeetingDuration: parseInt(e.target.value) })}
                          className={ux.form.input}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className={ux.form.label}>Buffer Time (minutes)</label>
                        <Input
                          type="number"
                          value={formData.bufferTime}
                          onChange={(e) => setFormData({ ...formData, bufferTime: parseInt(e.target.value) })}
                          className={ux.form.input}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Defaults'}
                      </Button>
                      {success && <span className={ux.text.accent + " text-green-600"}>✓ Defaults Updated</span>}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </section>

            <section className="space-y-6">
              <h2 className={ux.text.accent}>3. Weekly Availability</h2>
              <Card variant="base">
                <CardContent className="p-0">
                  <HostAvailabilityView />
                </CardContent>
              </Card>
            </section>
          </div>
        )}

        {activeTab === 'preferences' && user.role === 'counselor' && (
          <div className="space-y-8">
            <Card variant="base">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-brand-600" />
                  <CardTitle className={ux.text.subheading}>Ranking Source Credentials</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateCredentials} className="space-y-4">
                  <p className={ux.text.body}>Provide premium credentials for ranking sources to enable automated scraping.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className={ux.form.label}>Source</label>
                      <select className={ux.form.input} disabled>
                        <option>US News & World Report</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className={ux.form.label}>Email / Username</label>
                      <Input 
                        value={rankingCreds.email}
                        onChange={(e) => setRankingCreds({ ...rankingCreds, email: e.target.value })}
                        placeholder="premium@usnews.com"
                        className={ux.form.input}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className={ux.form.label}>Password</label>
                      <Input 
                        type="password"
                        value={rankingCreds.password}
                        onChange={(e) => setRankingCreds({ ...rankingCreds, password: e.target.value })}
                        placeholder="••••••••"
                        className={ux.form.input}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <Button type="submit" disabled={credsLoading || !rankingCreds.password}>
                      {credsLoading ? 'Saving...' : 'Update US News Credentials'}
                    </Button>
                    {credsSuccess && (
                      <span className="flex items-center gap-1 text-green-600 text-[10px] font-black uppercase tracking-widest">
                        <ShieldCheck className="w-3 h-3" />
                        Credentials Encrypted & Saved
                      </span>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'preferences' && user.role === 'student' && (
          <form onSubmit={handleUpdateSettings} className="space-y-8">
            <Card variant="base">
              <CardHeader>
                <CardTitle className={ux.text.subheading}>Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="notifications"
                    checked={formData.notificationsEnabled}
                    onChange={(e) => setFormData({ ...formData, notificationsEnabled: e.target.checked })}
                    className="w-5 h-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <label htmlFor="notifications" className="text-sm font-bold text-slate-700">Enable Email Notifications for Meeting Updates</label>
                </div>
              </CardContent>
            </Card>
            <div className="flex items-center gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Preferences'}
              </Button>
              {success && <span className={ux.text.accent + " text-green-600"}>✓ Preferences Updated</span>}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
