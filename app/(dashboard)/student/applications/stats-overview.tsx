'use client';

import { Card, CardContent } from '@/components/ui/card';

interface Application {
  id: string;
  targetCategory: string;
  applicationStatus: string;
}

interface StatsProps {
  applications: Application[];
}

export default function StatsOverview({ applications }: StatsProps) {
  const stats = {
    total: applications.length,
    safety: applications.filter(a => a.targetCategory === 'Safety').length,
    match: applications.filter(a => a.targetCategory === 'Match').length,
    reach: applications.filter(a => a.targetCategory === 'Reach').length,
    submitted: applications.filter(a => a.applicationStatus === 'Submitted' || a.applicationStatus === 'Under_Review').length,
    inProgress: applications.filter(a => a.applicationStatus === 'In_Progress').length,
    notStarted: applications.filter(a => a.applicationStatus === 'Not_Started').length,
    accepted: applications.filter(a => a.applicationStatus === 'Accepted').length,
    rejected: applications.filter(a => a.applicationStatus === 'Rejected').length,
    waitlisted: applications.filter(a => a.applicationStatus === 'Waitlisted').length,
    pending: applications.filter(a => ['Submitted', 'Under_Review', 'Deferred'].includes(a.applicationStatus)).length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
            <p className="text-sm text-gray-600 mt-1">Total Applications</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">By Category</div>
            <div className="flex justify-center gap-2 text-xs">
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded">{stats.safety} Safety</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">{stats.match} Match</span>
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded">{stats.reach} Reach</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">By Status</div>
            <div className="space-y-1 text-xs">
              <div>{stats.submitted} Submitted</div>
              <div>{stats.inProgress} In Progress</div>
              <div>{stats.notStarted} Not Started</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Decisions</div>
            <div className="space-y-1 text-xs">
              <div className="text-green-600">{stats.accepted} Accepted</div>
              <div className="text-red-600">{stats.rejected} Rejected</div>
              <div className="text-yellow-600">{stats.waitlisted} Waitlisted</div>
              <div className="text-gray-600">{stats.pending} Pending</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
