'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ux } from '@/lib/ux';
import { cn } from '@/lib/utils';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  student?: {
    counselorId: string | null;
  };
}

interface Counselor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'counselor' | 'student'>('student');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'student',
    currentGrade: 'eleventh',
    graduationYear: new Date().getFullYear() + 2,
    counselorId: '',
  });

  useEffect(() => {
    fetchUsers();
    fetchCounselors();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch('/api/counselor/users');
    const data = await res.json();
    setUsers(data.users || []);
  };

  const fetchCounselors = async () => {
    const res = await fetch('/api/counselor/counselors');
    const data = await res.json();
    setCounselors(data.counselors || []);
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
        counselorId: '',
      });
      fetchUsers();
      fetchCounselors();
    } else {
      const data = await res.json();
      alert(data.error || 'Failed to create user');
    }
  };

  const assignCounselor = async (studentId: string, counselorId: string) => {
    await fetch('/api/counselor/assign-counselor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId: studentId, counselorId: counselorId }),
    });
    fetchUsers();
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    await fetch(`/api/counselor/users?id=${userId}`, {
      method: 'DELETE',
    });
    fetchUsers();
    fetchCounselors();
  };

  const students = users.filter(u => u.role === 'student');
  const counselorUsers = users.filter(u => u.role === 'counselor');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
        <p className="text-gray-600 mt-1">Create and manage counselors and students</p>
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
            <p className="text-sm text-gray-600">Counselors</p>
            <p className="text-3xl font-bold text-gray-900">{counselorUsers.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Unassigned Students</p>
            <p className="text-3xl font-bold text-yellow-600">
              {students.filter(s => !s.student?.counselorId).length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 mb-6">
        <Button
          onClick={() => {
            setModalType('counselor');
            setFormData({ ...formData, role: 'counselor' });
            setShowModal(true);
          }}
        >
          + Add Counselor
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

      {/* Counselors Table */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Counselors ({counselorUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {counselorUsers.length > 0 ? (
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
                  {counselorUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {students.filter(s => s.student?.counselorId === user.id).length}
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
            <p className="text-gray-500 text-center py-8">No counselors yet</p>
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
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Counselor</th>
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
                          value={user.student?.counselorId || ''}
                          onChange={(e) => assignCounselor(user.id, e.target.value)}
                          className="text-sm px-2 py-1 border rounded text-gray-900"
                        >
                          <option value="">Unassigned</option>
                          {counselors.map((assoc) => (
                            <option key={assoc.id} value={assoc.id}>
                              {assoc.firstName} {assoc.lastName}
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
              Create {modalType === 'counselor' ? 'Counselor' : 'Student'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className={cn("block text-xs uppercase tracking-wider font-bold text-slate-500")}>
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    className="bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className={cn("block text-xs uppercase tracking-wider font-bold text-slate-500")}>
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                    className="bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className={cn("block text-xs uppercase tracking-wider font-bold text-slate-500")}>
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className={cn("block text-xs uppercase tracking-wider font-bold text-slate-500")}>
                  Password <span className="text-red-500">*</span>
                </label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                />
              </div>

              {modalType === 'student' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className={cn("block text-xs uppercase tracking-wider font-bold text-slate-500")}>
                        Current Grade <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.currentGrade}
                        onChange={(e) => setFormData({ ...formData, currentGrade: e.target.value })}
                        className="w-full h-10 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      >
                        <option value="ninth">9th Grade</option>
                        <option value="tenth">10th Grade</option>
                        <option value="eleventh">11th Grade</option>
                        <option value="twelfth">12th Grade</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className={cn("block text-xs uppercase tracking-wider font-bold text-slate-500")}>
                        Graduation Year <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="number"
                        value={formData.graduationYear}
                        onChange={(e) => setFormData({ ...formData, graduationYear: parseInt(e.target.value) })}
                        required
                        className="bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className={cn("block text-xs uppercase tracking-wider font-bold text-slate-500")}>
                      Assign to Counselor
                    </label>
                    <select
                      value={formData.counselorId}
                      onChange={(e) => setFormData({ ...formData, counselorId: e.target.value })}
                      className="w-full h-10 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    >
                      <option value="">Assign later</option>
                      {counselors.map((assoc) => (
                        <option key={assoc.id} value={assoc.id}>
                          {assoc.firstName} {assoc.lastName}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  Create {modalType === 'counselor' ? 'Counselor' : 'Student'}
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
