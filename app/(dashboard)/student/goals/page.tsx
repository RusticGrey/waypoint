'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Goal {
  id: string;
  goalType: string;
  category: string;
  targetValue: string;
  currentValue?: string;
  deadline?: string;
  status: string;
  priority: number;
  notes?: string;
  createdAt: string;
}

const GOAL_TYPES = ['Academic', 'Testing', 'Activity', 'Achievement', 'Project', 'Other'];
const STATUSES = ['Not_Started', 'In_Progress', 'Completed', 'Deferred', 'Cancelled'];

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    goalType: 'Academic',
    category: '',
    targetValue: '',
    currentValue: '',
    deadline: '',
    priority: 5,
    notes: '',
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    const res = await fetch('/api/student/goals');
    const data = await res.json();
    setGoals(data.goals || []);
  };

  const addGoal = async () => {
    await fetch('/api/student/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    setShowAddModal(false);
    setFormData({
      goalType: 'Academic',
      category: '',
      targetValue: '',
      currentValue: '',
      deadline: '',
      priority: 5,
      notes: '',
    });
    fetchGoals();
  };

  const updateGoalStatus = async (id: string, status: string) => {
    await fetch('/api/student/goals', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    
    fetchGoals();
  };

  const deleteGoal = async (id: string) => {
    if (!confirm('Delete this goal?')) return;
    
    await fetch(`/api/student/goals?id=${id}`, {
      method: 'DELETE',
    });
    
    fetchGoals();
  };

  const activeGoals = goals.filter(g => g.status === 'Not_Started' || g.status === 'In_Progress');
  const completedGoals = goals.filter(g => g.status === 'Completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In_Progress': return 'bg-blue-100 text-blue-800';
      case 'Not_Started': return 'bg-gray-100 text-gray-800';
      case 'Deferred': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 8) return 'text-red-600';
    if (priority >= 5) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Goals</h1>
          <p className="text-gray-600 mt-1">Set and track goals to strengthen your college profile</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          + Add Goal
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Active Goals</p>
              <p className="text-4xl font-bold text-blue-600">{activeGoals.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-4xl font-bold text-green-600">{completedGoals.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Goals</p>
              <p className="text-4xl font-bold text-gray-900">{goals.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Goals */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Active Goals ({activeGoals.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {activeGoals.length > 0 ? (
            <div className="space-y-4">
              {activeGoals.map((goal) => (
                <div key={goal.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(goal.status)}`}>
                          {goal.status.replace('_', ' ')}
                        </span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                          {goal.goalType}
                        </span>
                        <span className={`text-xs font-bold ${getPriorityColor(goal.priority)}`}>
                          Priority: {goal.priority}/10
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-1">{goal.category}</h3>
                      <p className="text-sm text-gray-700 mb-2">
                        <span className="font-medium">Target:</span> {goal.targetValue}
                      </p>
                      
                      {goal.currentValue && (
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Current:</span> {goal.currentValue}
                        </p>
                      )}
                      
                      {goal.deadline && (
                        <p className="text-xs text-gray-500">
                          Deadline: {new Date(goal.deadline).toLocaleDateString()}
                        </p>
                      )}
                      
                      {goal.notes && (
                        <p className="text-sm text-gray-600 mt-2 italic">{goal.notes}</p>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <select
                        value={goal.status}
                        onChange={(e) => updateGoalStatus(goal.id, e.target.value)}
                        className="text-xs px-2 py-1 border rounded text-gray-900"
                      >
                        {STATUSES.map(s => (
                          <option key={s} value={s}>{s.replace('_', ' ')}</option>
                        ))}
                      </select>
                      
                      <button
                        onClick={() => deleteGoal(goal.id)}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No active goals. Click "+ Add Goal" to get started!</p>
          )}
        </CardContent>
      </Card>

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Completed Goals ({completedGoals.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completedGoals.map((goal) => (
                <div key={goal.id} className="border-l-4 border-green-500 pl-4 py-2 bg-green-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{goal.category}</h4>
                      <p className="text-sm text-gray-700">Target: {goal.targetValue}</p>
                    </div>
                    <span className="text-xs text-green-600 font-medium">✓ Completed</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Goal</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Goal Type *
                </label>
                <select
                  value={formData.goalType}
                  onChange={(e) => setFormData({ ...formData, goalType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                >
                  {GOAL_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <Input
                label="Category *"
                placeholder="e.g., GPA Improvement, Leadership Role, SAT Score"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />

              <Input
                label="Target Value *"
                placeholder="e.g., 3.9 GPA, Club President, 1500 SAT"
                value={formData.targetValue}
                onChange={(e) => setFormData({ ...formData, targetValue: e.target.value })}
              />

              <Input
                label="Current Value (optional)"
                placeholder="e.g., 3.7 GPA, Vice President"
                value={formData.currentValue}
                onChange={(e) => setFormData({ ...formData, currentValue: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Deadline (optional)"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Priority (1-10)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Notes (optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  placeholder="Add any additional details or action steps..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button
                onClick={addGoal}
                disabled={!formData.category || !formData.targetValue}
                className="flex-1"
              >
                Add Goal
              </Button>
              <Button
                onClick={() => {
                  setShowAddModal(false);
                  setFormData({
                    goalType: 'Academic',
                    category: '',
                    targetValue: '',
                    currentValue: '',
                    deadline: '',
                    priority: 5,
                    notes: '',
                  });
                }}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
