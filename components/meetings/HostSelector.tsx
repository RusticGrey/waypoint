'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { CalendarView } from '@/components/meetings/CalendarView';

interface Host {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
}

export function HostSelector({ onSelect }: { onSelect: (hostId: string) => void }) {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [selectedHostId, setSelectedHostId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHosts() {
      try {
        // Fetch all coordinators and counselors available to this student
        const res = await fetch('/api/student/hosts');
        const data = await res.json();
        // Filter to get unique hosts (coordinators and counselors)
        const hostList = Array.isArray(data) ? data : [];
        setHosts(hostList);
        if (hostList.length > 0) {
          // Default to first host
          setSelectedHostId(hostList[0].id);
          onSelect(hostList[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch hosts:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchHosts();
  }, [onSelect]);

  const handleHostChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedHostId(id);
    onSelect(id);
  };

  if (loading) return <div>Loading available counselors...</div>;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Select Counselor or Coordinator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Counselor / Coordinator</label>
            <Select value={selectedHostId} onChange={handleHostChange}>
              {hosts.map((host) => (
                <option key={host.id} value={host.id}>
                  {host.firstName} {host.lastName} ({host.role === 'counselor' ? 'Lead Counselor' : 'Coordinator'})
                </option>
              ))}
            </Select>
          </div>
          <div className="text-xs text-gray-400 italic pb-3">
            Selecting a person will show their real-time availability below.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
