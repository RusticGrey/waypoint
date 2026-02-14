'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  student?: {
    coordinatorId: string | null;
  };
}

interface Coordinator {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [coordinators, setCoordinators] = useState<Coordinator[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'coordinator' | 'student'>('student');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'student',
    currentGrade: 'eleventh',
    graduationYear: new Date().getFullYear() + 2,
    coordinatorId: '',
  });

  useEffect(() => {
    fetchUsers();
    fetchCoordinators();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch('/api/counselor/users');
    const data = await res.json();
    setUsers(data.users || []);
  };

  const fetchCoordinators = async () => {
    const res = await fetch('/api/counselor/coordinators');
    const data = await res.json();
    setCoordinators(data.coordinators || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/counselor/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setShowModal(false);
      setFormData({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        role: 'student',
        currentGrade: 'eleventh',
        graduationYear: new Date().getFullYear() + 2,
        coordinatorId: '',
      });
      fetchUsers();
      fetchCoordinators();
    } else {
      const data = await res.json();
      alert(data.error || 'Failed to create user');
    }
  };

  const assignCoordinator = async (studentId: string, coordinatorId: string) => {
    await fetch('/api/counselor/assign-coordinator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId: studentId, coordinatorId: coordinatorId }),
    });
    fetchUsers();
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    await fetch(`/api/counselor/users?id=${userId}`, {
      method: 'DELETE',
    });
    fetchUsers();
    fetchCoordinators();
  };

  const students = users.filter(u => u.role === 'student');
  const coordinatorUsers = users.filter(u => u.role === 'coordinator');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
        <p className="text-gray-600 mt-1">Create and manage coordinators and students</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Total Students</p>
            <p className="text-3xl font-bold text-gray-900">{students.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Coordinators</p>
            <p className="text-3xl font-bold text-gray-900">{coordinatorUsers.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Unassigned Students</p>
            <p className="text-3xl font-bold text-yellow-600">
              {students.filter(s => !s.student?.coordinatorId).length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 mb-6">
        <Button
          onClick={() => {
            setModalType('coordinator');
            setFormData({ ...formData, role: 'coordinator' });
            setShowModal(true);
          }}
        >
          + Add Coordinator
        </Button>
        <Button
          onClick={() => {
            setModalType('student');
            setFormData({ ...formData, role: 'student' });
            setShowModal(true);
          }}
          variant="outline"
        >
          + Add Student
        </Button>
      </div>

      {/* Coordinators Table */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Coordinators ({coordinatorUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {coordinatorUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {coordinatorUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {students.filter(s => s.student?.coordinatorId === user.id).length}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No coordinators yet</p>
          )}
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Students ({students.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {students.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Coordinator</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {students.map((user) => (
                    <tr key={user.id}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                      <td className="px-4 py-3 text-sm">
                        <select
                          value={user.student?.coordinatorId || ''}
                          onChange={(e) => assignCoordinator(user.id, e.target.value)}
                          className="text-sm px-2 py-1 border rounded text-gray-900"
                        >
                          <option value="">Unassigned</option>
                          {coordinators.map((coord) => (
                            <option key={coord.id} value={coord.id}>
                              {coord.firstName} {coord.lastName}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No students yet</p>
          )}
        </CardContent>
      </Card>

      {/* Create User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Create {modalType === 'coordinator' ? 'Coordinator' : 'Student'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name *"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
                <Input
                  label="Last Name *"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>

              <Input
                label="Email *"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <Input
                label="Password *"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />

              {modalType === 'student' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1">
                        Current Grade *
                      </label>
                      <select
                        value={formData.currentGrade}
                        onChange={(e) => setFormData({ ...formData, currentGrade: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                      >
                        <option value="ninth">9th Grade</option>
                        <option value="tenth">10th Grade</option>
                        <option value="eleventh">11th Grade</option>
                        <option value="twelfth">12th Grade</option>
                      </select>
                    </div>

                    <Input
                      label="Graduation Year *"
                      type="number"
                      value={formData.graduationYear}
                      onChange={(e) => setFormData({ ...formData, graduationYear: parseInt(e.target.value) })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Assign to Coordinator (optional)
                    </label>
                    <select
                      value={formData.coordinatorId}
                      onChange={(e) => setFormData({ ...formData, coordinatorId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    >
                      <option value="">Assign later</option>
                      {coordinators.map((coord) => (
                        <option key={coord.id} value={coord.id}>
                          {coord.firstName} {coord.lastName}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  Create {modalType === 'coordinator' ? 'Coordinator' : 'Student'}
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowModal(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
