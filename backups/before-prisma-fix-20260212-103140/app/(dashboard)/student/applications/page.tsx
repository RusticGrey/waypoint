'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ApplicationModal from './application-modal';
import StatsOverview from './stats-overview';
import DeadlineTracker from './deadline-tracker';

interface Application {
  id: string;
  college_id: string;
  target_category: string;
  application_status: string;
  application_deadline: string | null;
  decision_deadline: string | null;
  essay_status: string;
  supplements_status: string;
  recommendation_status: string;
  test_scores_sent: boolean;
  application_portal_link: string | null;
  notes: string | null;
  college: {
    id: string;
    name: string;
    location: string;
  };
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingApplication, setEditingApplication] = useState<Application | undefined>();

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, filter]);

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/student/applications');
      const data = await res.json();
      setApplications(data.applications || []);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = applications;

    if (filter === 'Safety') filtered = applications.filter(a => a.target_category === 'Safety');
    else if (filter === 'Match') filtered = applications.filter(a => a.target_category === 'Match');
    else if (filter === 'Reach') filtered = applications.filter(a => a.target_category === 'Reach');
    else if (filter === 'In Progress') filtered = applications.filter(a => a.application_status === 'In_Progress');
    else if (filter === 'Submitted') filtered = applications.filter(a => ['Submitted', 'Under_Review'].includes(a.application_status));
    else if (filter === 'Decisions') filtered = applications.filter(a => ['Accepted', 'Rejected', 'Waitlisted', 'Deferred'].includes(a.application_status));

    setFilteredApplications(filtered);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this application?')) return;

    try {
      const res = await fetch(`/api/student/applications/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete');

      await fetchApplications();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete application');
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      Safety: 'bg-green-100 text-green-800',
      Match: 'bg-yellow-100 text-yellow-800',
      Reach: 'bg-red-100 text-red-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      Not_Started: 'bg-gray-100 text-gray-800',
      In_Progress: 'bg-blue-100 text-blue-800',
      Submitted: 'bg-indigo-100 text-indigo-800',
      Under_Review: 'bg-purple-100 text-purple-800',
      Deferred: 'bg-yellow-100 text-yellow-800',
      Accepted: 'bg-green-100 text-green-800',
      Rejected: 'bg-red-100 text-red-800',
      Waitlisted: 'bg-orange-100 text-orange-800',
      Withdrawn: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const isDeadlineNear = (deadline: string | null) => {
    if (!deadline) return false;
    const date = new Date(deadline);
    const daysRemaining = Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return daysRemaining <= 7 && daysRemaining >= 0;
  };

  const isOverdue = (deadline: string | null) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gray-600 text-center py-12">Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">College Applications</h1>
        <p className="text-gray-600 mt-1">Track your application progress and deadlines</p>
      </div>

      <StatsOverview applications={applications} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>My Applications ({filteredApplications.length})</CardTitle>
                <Button onClick={() => {
                  setEditingApplication(undefined);
                  setShowModal(true);
                }}>
                  + Add Application
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filter Tabs */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {['All', 'Safety', 'Match', 'Reach', 'In Progress', 'Submitted', 'Decisions'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1 rounded text-sm whitespace-nowrap ${
                      filter === f
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Applications Table */}
              {filteredApplications.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">College</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">App Deadline</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredApplications.map((app) => (
                        <tr key={app.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="text-sm font-medium text-gray-900">{app.college.name}</div>
                            <div className="text-xs text-gray-500">{app.college.country}</div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 text-xs rounded ${getCategoryBadge(app.target_category)}`}>
                              {app.target_category}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 text-xs rounded ${getStatusBadge(app.application_status)}`}>
                              {app.application_status.replace(/_/g, ' ')}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {app.application_deadline ? (
                              <div className={`text-sm ${
                                isOverdue(app.application_deadline) ? 'text-red-600 font-medium' :
                                isDeadlineNear(app.application_deadline) ? 'text-yellow-600 font-medium' :
                                'text-gray-900'
                              }`}>
                                {isOverdue(app.application_deadline) && '⚠️ '}
                                {new Date(app.application_deadline).toLocaleDateString()}
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">No deadline</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingApplication(app);
                                  setShowModal(true);
                                }}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(app.id)}
                                className="text-red-600 hover:text-red-800 text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  {filter === 'All' 
                    ? 'No applications yet. Click "Add Application" to get started!'
                    : `No applications in "${filter}" category.`}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <DeadlineTracker applications={applications} />
        </div>
      </div>

      {showModal && (
        <ApplicationModal
          application={editingApplication}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            fetchApplications();
          }}
        />
      )}
    </div>
  );
}
