'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Change {
  id: string;
  change_type: string;
  entity_type: string;
  action: string;
  description: string;
  created_at: string;
}

export default function ChangeHistoryPage() {
  const [changes, setChanges] = useState<Change[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchChanges();
  }, [filter]);

  const fetchChanges = async () => {
    const url = filter === 'all' 
      ? '/api/student/changelog'
      : `/api/student/changelog?type=${filter}`;
    
    const res = await fetch(url);
    const data = await res.json();
    setChanges(data.changes || []);
  };

  const getChangeIcon = (change_type: string) => {
    switch (change_type) {
      case 'New_Addition': return '➕';
      case 'Improvement': return '📈';
      case 'Milestone': return '🎯';
      case 'Goal_Progress': return '⏳';
      case 'Profile_Update': return '✏️';
      default: return '📝';
    }
  };

  const getChangeColor = (change_type: string) => {
    switch (change_type) {
      case 'New_Addition': return 'border-l-blue-500 bg-blue-50';
      case 'Improvement': return 'border-l-green-500 bg-green-50';
      case 'Milestone': return 'border-l-purple-500 bg-purple-50';
      case 'Goal_Progress': return 'border-l-yellow-500 bg-yellow-50';
      case 'Profile_Update': return 'border-l-gray-500 bg-gray-50';
      default: return 'border-l-gray-300 bg-gray-50';
    }
  };

  const groupChangesByDate = (changes: Change[]) => {
    const groups: { [key: string]: Change[] } = {};
    
    changes.forEach(change => {
      const date = new Date(change.created_at).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(change);
    });
    
    return groups;
  };

  const groupedChanges = groupChangesByDate(changes);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Profile History</h1>
        <p className="text-gray-600 mt-1">Track all changes and improvements to your profile</p>
      </div>

      {/* Filter Buttons */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              All Changes
            </button>
            <button
              onClick={() => setFilter('New_Addition')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'New_Addition'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              ➕ New Additions
            </button>
            <button
              onClick={() => setFilter('Milestone')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'Milestone'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              🎯 Milestones
            </button>
            <button
              onClick={() => setFilter('Goal_Progress')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'Goal_Progress'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              ⏳ Goal Progress
            </button>
            <button
              onClick={() => setFilter('Improvement')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'Improvement'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              📈 Improvements
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="space-y-6">
        {Object.entries(groupedChanges).length > 0 ? (
          Object.entries(groupedChanges).map(([date, dateChanges]) => (
            <div key={date}>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">{date}</h2>
              <div className="space-y-3">
                {dateChanges.map((change) => (
                  <div
                    key={change.id}
                    className={`border-l-4 pl-4 py-3 rounded-r-lg ${getChangeColor(change.change_type)}`}
                  >
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">{getChangeIcon(change.change_type)}</span>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{change.description}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-600">
                            {new Date(change.created_at).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit'
                            })}
                          </span>
                          <span className="text-xs px-2 py-1 bg-white rounded">
                            {change.change_type.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <Card>
            <CardContent className="py-12">
              <p className="text-gray-500 text-center">
                No changes yet. Start building your profile to see your history here!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
