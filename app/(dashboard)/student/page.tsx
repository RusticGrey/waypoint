'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { FeatureFlagGate } from '@/components/meetings/FeatureFlagGate';
import { ux } from '@/lib/ux';
import { cn } from '@/lib/utils';

interface DashboardStats {
  phase: string;
  curriculum?: string;
  otherCurriculumName?: string;
  upcomingDeadlines: Array<{
    College: string;
    deadline: string;
    daysRemaining: number;
  }>;
  applicationStats: {
    total: number;
    submitted: number;
    inProgress: number;
    notStarted: number;
    decisions: {
      accepted: number;
      rejected: number;
      waitlisted: number;
      pending: number;
    };
  };
  activeGoals: number;
  profileStats: {
    activities: number;
    achievements: number;
    projects: number;
  };
}

export default function StudentDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await fetch('/api/student/dashboard-stats');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDeadlineColor = (days: number) => {
    if (days <= 7) return 'text-red-600';
    if (days <= 14) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (loading) {
    return (
      <div className={ux.layout.page}>
        <p className="text-slate-400 text-center py-24 italic">Loading dashboard...</p>
      </div>
    );
  }

  const isProfileBuilding = stats?.phase === 'Profile_Building';
  const isCollegeApps = stats?.phase === 'College_Applications';

  return (
    <div className={ux.layout.page}>
      <div className={ux.layout.header}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className={ux.text.heading}>Dashboard</h1>
            <p className={ux.text.body}>
              {isProfileBuilding && "Focus on building your profile and exploring your interests."}
              {isCollegeApps && "Manage your college applications and track deadlines."}
            </p>
          </div>
          {stats?.curriculum && (
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">Curriculum</p>
              <p className="text-sm font-bold text-brand-600 uppercase tracking-tight">
                {stats.curriculum}
                {stats.curriculum === 'Other' && stats.otherCurriculumName && ` (${stats.otherCurriculumName})`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {isCollegeApps && (
          <>
            <Card variant="pop" className={ux.card.highlight}>
              <CardContent className="pt-6 text-center">
                <p className={ux.text.accent}>Applications</p>
                <p className="text-4xl font-black text-slate-900 mt-1">{stats?.applicationStats?.total || 0}</p>
              </CardContent>
            </Card>

            <Card variant="pop">
              <CardContent className="pt-6 text-center">
                <p className={ux.text.accent}>Accepted</p>
                <p className="text-4xl font-black text-green-600 mt-1">{stats?.applicationStats?.decisions?.accepted || 0}</p>
              </CardContent>
            </Card>
          </>
        )}

        <Card variant="pop" className={!isCollegeApps ? ux.card.highlight : ''}>
          <CardContent className="pt-6 text-center">
            <p className={ux.text.accent}>Active Goals</p>
            <p className="text-4xl font-black text-brand-600 mt-1">{stats?.activeGoals || 0}</p>
          </CardContent>
        </Card>

        <Card variant="pop">
          <CardContent className="pt-6 text-center">
            <p className={ux.text.accent}>Activities</p>
            <p className="text-4xl font-black text-slate-900 mt-1">{stats?.profileStats?.activities || 0}</p>
          </CardContent>
        </Card>

        {isProfileBuilding && (
          <>
             <Card variant="pop">
              <CardContent className="pt-6 text-center">
                <p className={ux.text.accent}>Projects</p>
                <p className="text-4xl font-black text-slate-900 mt-1">{stats?.profileStats?.projects || 0}</p>
              </CardContent>
            </Card>
             <Card variant="pop">
              <CardContent className="pt-6 text-center">
                <p className={ux.text.accent}>Achievements</p>
                <p className="text-4xl font-black text-slate-900 mt-1">{stats?.profileStats?.achievements || 0}</p>
              </CardContent>
            </Card>
          </>
        )}

        <FeatureFlagGate>
          <Card variant="pop">
            <CardContent className="pt-6 text-center">
              <p className={ux.text.accent}>Action Items</p>
              <p className="text-4xl font-black text-brand-600 mt-1">{(stats as any)?.meetingStats?.openActionItems || 0}</p>
            </CardContent>
          </Card>
        </FeatureFlagGate>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Upcoming Deadlines */}
        {isCollegeApps && (
          <Card variant="base">
            <CardHeader>
              <CardTitle className={ux.text.subheading}>Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              {stats && stats.upcomingDeadlines.length > 0 ? (
                <div className="space-y-4">
                  {stats.upcomingDeadlines.map((deadline, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-surface-soft rounded-2xl border border-slate-100">
                      <div>
                        <p className="font-bold text-slate-900">{deadline.College}</p>
                        <p className="text-xs text-slate-500 font-medium">
                          {new Date(deadline.deadline).toLocaleDateString(undefined, { dateStyle: 'long' })}
                        </p>
                      </div>
                      <Badge variant={deadline.daysRemaining <= 7 ? 'error' : 'warning'}>
                        {deadline.daysRemaining === 0 ? 'Today' : `${deadline.daysRemaining} days left`}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-center py-8 italic text-sm">No upcoming deadlines.</p>
              )}
              <Link href="/student/applications" className="block mt-6 text-brand-600 hover:underline text-xs font-black uppercase tracking-widest text-center">
                View All Applications &rarr;
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Application Progress */}
        {isCollegeApps && (
          <Card variant="base">
            <CardHeader>
              <CardTitle className={ux.text.subheading}>Application Progress</CardTitle>
            </CardHeader>
            <CardContent>
              {stats && stats.applicationStats.total > 0 ? (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-end text-xs font-black uppercase tracking-widest mb-2">
                      <span className="text-slate-500">Submitted</span>
                      <span className="text-slate-900">
                        {stats.applicationStats.submitted} / {stats.applicationStats.total}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div 
                        className="bg-green-500 h-2.5 rounded-full" 
                        style={{ width: `${(stats.applicationStats.submitted / stats.applicationStats.total) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-end text-xs font-black uppercase tracking-widest mb-2">
                      <span className="text-slate-500">In Progress</span>
                      <span className="text-slate-900">
                        {stats.applicationStats.inProgress} / {stats.applicationStats.total}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div 
                        className="bg-brand-500 h-2.5 rounded-full" 
                        style={{ width: `${(stats.applicationStats.inProgress / stats.applicationStats.total) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-green-50 rounded-2xl border border-green-100">
                        <div className="text-2xl font-black text-green-700">{stats.applicationStats.decisions.accepted}</div>
                        <div className="text-[10px] font-black text-green-600 uppercase tracking-widest">Accepted</div>
                      </div>
                      <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100">
                        <div className="text-2xl font-black text-amber-700">{stats.applicationStats.decisions.pending}</div>
                        <div className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Pending</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-slate-400 italic text-sm mb-6">No applications started yet.</p>
                  <Link href="/student/applications">
                    <button className={ux.button.primary}>Start Your First Application</button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(isCollegeApps || isProfileBuilding) && (
          <Link href="/student/meetings" className="block group">
            <Card variant="pop" className="group-hover:border-brand-300 transition-all h-full">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">🗓️</span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">Schedule Meetings</h3>
                  <p className="text-xs text-slate-500 mt-2">Connect with your counselor</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        {isCollegeApps && (
          <Link href="/student/applications" className="block group">
            <Card variant="pop" className="group-hover:border-brand-300 transition-all h-full">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">🎓</span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">Applications</h3>
                  <p className="text-xs text-slate-500 mt-2">Manage your submissions</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}
        
        {isProfileBuilding && (
          <Link href="/student/goals" className="block group">
            <Card variant="pop" className="group-hover:border-brand-300 transition-all h-full">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">Goals</h3>
                  <p className="text-xs text-slate-500 mt-2">Track your growth</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        {(isCollegeApps || isProfileBuilding) && (
          <Link href="/student/analysis" className="block group">
            <Card variant="pop" className="group-hover:border-brand-300 transition-all h-full">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">📊</span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">Analysis</h3>
                  <p className="text-xs text-slate-500 mt-2">View your profile strength</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        <Link href="/student/profile" className="block group">
          <Card variant="pop" className="group-hover:border-brand-300 transition-all h-full">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">👤</span>
                </div>
                <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">My Profile</h3>
                <p className="text-xs text-slate-500 mt-2">Manage your data</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
