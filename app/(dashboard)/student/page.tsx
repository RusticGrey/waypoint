'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface DashboardStats {
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
    Activity: number;
    Achievement: number;
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gray-600 text-center py-12">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's your college application overview.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{stats?.applicationStats.total || 0}</div>
              <p className="text-sm text-gray-600 mt-1">Applications</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{stats?.applicationStats.decisions.accepted || 0}</div>
              <p className="text-sm text-gray-600 mt-1">Acceptances</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{stats?.activeGoals || 0}</div>
              <p className="text-sm text-gray-600 mt-1">Active Goals</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{stats?.profileStats.activities || 0}</div>
              <p className="text-sm text-gray-600 mt-1">Activities</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            {stats && stats.upcomingDeadlines.length > 0 ? (
              <div className="space-y-3">
                {stats.upcomingDeadlines.map((deadline, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium text-gray-900">{deadline.college}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(deadline.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`text-sm font-medium ${getDeadlineColor(deadline.daysRemaining)}`}>
                      {deadline.daysRemaining === 0 ? 'Today!' : `${deadline.daysRemaining} days`}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming deadlines</p>
            )}
            <Link href="/student/applications" className="block mt-4 text-blue-600 hover:text-blue-700 text-sm text-center">
              View all applications →
            </Link>
          </CardContent>
        </Card>

        {/* Application Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Application Progress</CardTitle>
          </CardHeader>
          <CardContent>
            {stats && stats.applicationStats.total > 0 ? (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Submitted</span>
                    <span className="font-medium text-gray-900">
                      {stats.applicationStats.submitted}/{stats.applicationStats.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${(stats.applicationStats.submitted / stats.applicationStats.total) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">In Progress</span>
                    <span className="font-medium text-gray-900">
                      {stats.applicationStats.inProgress}/{stats.applicationStats.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(stats.applicationStats.inProgress / stats.applicationStats.total) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{stats.applicationStats.decisions.accepted}</div>
                      <div className="text-xs text-gray-600">Accepted</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">{stats.applicationStats.decisions.pending}</div>
                      <div className="text-xs text-gray-600">Pending</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 mb-4">No applications yet</p>
                <Link href="/student/applications" className="text-blue-600 hover:text-blue-700 text-sm">
                  Start your first application →
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/student/profile" className="block">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📝</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Edit Profile</h3>
                  <p className="text-sm text-gray-600">Update your information</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/student/applications" className="block">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🎓</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Applications</h3>
                  <p className="text-sm text-gray-600">Manage your applications</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/student/analysis" className="block">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Profile Analysis</h3>
                  <p className="text-sm text-gray-600">View your strengths</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
