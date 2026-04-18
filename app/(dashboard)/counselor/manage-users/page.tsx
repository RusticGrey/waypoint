'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ux } from '@/lib/ux';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

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
    <div className={ux.layout.page}>
      <div className={ux.layout.header}>
        <h1 className={ux.text.heading}>Manage Users</h1>
        <p className={ux.text.body}>Create and manage organization staff and student accounts.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card variant="pop">
          <CardContent className="pt-6">
            <p className={ux.text.accent}>Total Students</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{students.length}</p>
          </CardContent>
        </Card>
        <Card variant="pop">
          <CardContent className="pt-6">
            <p className={ux.text.accent}>Counselors</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{counselorUsers.length}</p>
          </CardContent>
        </Card>
        <Card variant="pop" className={ux.card.highlight}>
          <CardContent className="pt-6">
            <p className={ux.text.accent}>Unassigned</p>
            <p className="text-3xl font-black text-brand-600 mt-1">
              {students.filter(s => !s.student?.counselorId).length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 mb-10">
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

      <div className="space-y-12">
        {/* Counselors Table */}
        <section className="space-y-4">
          <h2 className={ux.text.accent}>Counselor Directory</h2>
          <Card variant="base">
            <CardHeader>
              <CardTitle className={ux.text.subheading}>Organization Staff ({counselorUsers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {counselorUsers.length > 0 ? (
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-surface-soft">
                      <tr>
                        <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Name</th>
                        <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Email</th>
                        <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Students</th>
                        <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Joined</th>
                        <th className="px-6 py-4 text-right text-[10px] font-black text-slate-500 uppercase tracking-widest">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                      {counselorUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-surface-soft transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">
                            {user.firstName} {user.lastName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <Badge variant="brand">{students.filter(s => s.student?.counselorId === user.id).length}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold">
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="text-red-600 hover:text-red-800 transition-colors uppercase text-xs tracking-tight"
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
                <p className="text-slate-400 text-center py-12 italic">No counselors registered yet.</p>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Students Table */}
        <section className="space-y-4">
          <h2 className={ux.text.accent}>Student Caseload</h2>
          <Card variant="base">
            <CardHeader>
              <CardTitle className={ux.text.subheading}>All Enrolled Students ({students.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {students.length > 0 ? (
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-surface-soft">
                      <tr>
                        <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Name</th>
                        <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Email</th>
                        <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Assigned Counselor</th>
                        <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Joined</th>
                        <th className="px-6 py-4 text-right text-[10px] font-black text-slate-500 uppercase tracking-widest">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                      {students.map((user) => (
                        <tr key={user.id} className="hover:bg-surface-soft transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">
                            {user.firstName} {user.lastName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <select
                              value={user.student?.counselorId || ''}
                              onChange={(e) => assignCounselor(user.id, e.target.value)}
                              className={cn(ux.form.input, "text-xs py-1 px-3 h-8 w-auto bg-white border-slate-200")}
                            >
                              <option value="">Unassigned</option>
                              {counselors.map((assoc) => (
                                <option key={assoc.id} value={assoc.id}>
                                  {assoc.firstName} {assoc.lastName}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold">
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="text-red-600 hover:text-red-800 transition-colors uppercase text-xs tracking-tight"
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
                <p className="text-slate-400 text-center py-12 italic">No students registered yet.</p>
              )}
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Create User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-brand-100" variant="base">
            <CardHeader className="border-b border-slate-100 pb-6 mb-8">
              <CardTitle className="text-2xl">
                Create {modalType === 'counselor' ? 'Counselor' : 'Student'}
              </CardTitle>
            </CardHeader>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={ux.form.label}>First Name</label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    className={ux.form.input}
                    placeholder="Jane"
                  />
                </div>
                <div className="space-y-2">
                  <label className={ux.form.label}>Last Name</label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                    className={ux.form.input}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className={ux.form.label}>Email Address</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className={ux.form.input}
                  placeholder="jane.doe@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className={ux.form.label}>Temporary Password</label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className={ux.form.input}
                  placeholder="Minimum 8 characters"
                />
              </div>

              {modalType === 'student' && (
                <div className="pt-4 border-t border-slate-100 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={ux.form.label}>Current Grade</label>
                      <select
                        value={formData.currentGrade}
                        onChange={(e) => setFormData({ ...formData, currentGrade: e.target.value })}
                        className={cn(ux.form.input, "bg-white")}
                      >
                        <option value="ninth">9th Grade</option>
                        <option value="tenth">10th Grade</option>
                        <option value="eleventh">11th Grade</option>
                        <option value="twelfth">12th Grade</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className={ux.form.label}>Graduation Year</label>
                      <Input
                        type="number"
                        value={formData.graduationYear}
                        onChange={(e) => setFormData({ ...formData, graduationYear: parseInt(e.target.value) })}
                        required
                        className={ux.form.input}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={ux.form.label}>Assign to Counselor</label>
                    <select
                      value={formData.counselorId}
                      onChange={(e) => setFormData({ ...formData, counselorId: e.target.value })}
                      className={cn(ux.form.input, "bg-white")}
                    >
                      <option value="">Assign later</option>
                      {counselors.map((assoc) => (
                        <option key={assoc.id} value={assoc.id}>
                          {assoc.firstName} {assoc.lastName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100">
                <Button type="submit" className="flex-1 order-1 sm:order-2">
                  Create Account
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowModal(false)}
                  variant="outline"
                  className="flex-1 order-2 sm:order-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
