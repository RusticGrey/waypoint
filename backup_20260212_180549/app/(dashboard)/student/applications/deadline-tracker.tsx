'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Application {
  id: string;
  application_deadline: string | null;
  decision_deadline: string | null;
  College: {
    name: string;
  };
}

interface DeadlineTrackerProps {
  applications: Application[];
}

export default function DeadlineTracker({ applications }: DeadlineTrackerProps) {
  const deadlines: Array<{
    College: string;
    type: string;
    date: Date;
    daysRemaining: number;
  }> = [];

  applications.forEach(app => {
    if (app.application_deadline) {
      const date = new Date(app.application_deadline);
      const daysRemaining = Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      deadlines.push({
        College: app.college.name,
        type: 'Application',
        date,
        daysRemaining,
      });
    }
    if (app.decision_deadline) {
      const date = new Date(app.decision_deadline);
      const daysRemaining = Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      deadlines.push({
        College: app.college.name,
        type: 'Decision',
        date,
        daysRemaining,
      });
    }
  });

  deadlines.sort((a, b) => a.date.getTime() - b.date.getTime());
  const upcoming = deadlines.filter(d => d.daysRemaining >= 0).slice(0, 5);

  const getColorClass = (days: number) => {
    if (days < 0) return 'text-red-600';
    if (days <= 7) return 'text-red-600';
    if (days <= 14) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        {upcoming.length > 0 ? (
          <div className="space-y-3">
            {upcoming.map((deadline, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-gray-900">{deadline.college}</p>
                  <p className="text-sm text-gray-600">{deadline.type} Deadline</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{deadline.date.toLocaleDateString()}</p>
                  <p className={`text-sm font-medium ${getColorClass(deadline.daysRemaining)}`}>
                    {deadline.daysRemaining < 0 
                      ? 'Overdue' 
                      : deadline.daysRemaining === 0 
                      ? 'Today!' 
                      : `${deadline.daysRemaining} days`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No upcoming deadlines</p>
        )}
      </CardContent>
    </Card>
  );
}
