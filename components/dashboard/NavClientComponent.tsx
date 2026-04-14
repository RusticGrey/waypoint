'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { featureFlags } from "@/lib/feature-flags";

export function NavClientComponent({ role, isAdmin, studentPhase }: { role: string; isAdmin: boolean; studentPhase?: string }) {
  const pathname = usePathname();

  const navItems = role === 'counselor' ? [
    ...(featureFlags.navigation.dashboard ? [{ name: 'Dashboard', href: '/counselor' }] : []),
    ...(featureFlags.navigation.events ? [{ name: 'Event Management', href: '/counselor/events' }] : []),
    ...(featureFlags.navigation.meetings ? [{ name: 'Manage Meetings', href: '/counselor/meetings' }] : []),
    ...(isAdmin && featureFlags.navigation.manageUsers ? [{ name: 'Manage Users', href: '/counselor/manage-users' }] : []),
    ...(featureFlags.navigation.manageCourses ? [{ name: 'Manage Courses', href: '/admin/subjects' }] : []),
    ...(featureFlags.navigation.manageColleges ? [{ name: 'Manage Colleges', href: '/admin/colleges' }] : []),
  ] : [
    { name: 'Dashboard', href: '/student' },
    { name: 'Profile', href: '/student/profile' },
    ...(studentPhase !== 'Onboarding' ? [
      { name: 'Goals', href: '/student/goals' },
      { name: 'Test Scores', href: '/student/test-scores' },
      { name: 'History', href: '/student/history' },
      { name: 'Meetings', href: '/student/meetings' },
    ] : []),
    ...(studentPhase === 'College_Applications' ? [
      { name: 'Colleges', href: '/student/colleges' },
      { name: 'Applications', href: '/student/applications' },
      { name: 'Analysis', href: '/student/analysis' },
    ] : []),
  ];

  return (
    <nav className="flex gap-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium transition-colors",
            pathname.startsWith(item.href)
              ? "bg-blue-100 text-blue-700"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
