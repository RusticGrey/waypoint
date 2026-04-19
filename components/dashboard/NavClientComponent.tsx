'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { featureFlags } from "@/lib/feature-flags";

export function NavClientComponent({
  role,
  isAdmin,
  studentPhase,
  profileCompletionPct = 0,
}: {
  role: string;
  isAdmin: boolean;
  studentPhase?: string;
  profileCompletionPct?: number;
}) {
  const pathname = usePathname();

  const isProfileBuilding = studentPhase === 'Profile_Building' || studentPhase === 'College_Applications';
  const isCollegeApps = studentPhase === 'College_Applications';

  const navItems = role === 'counselor' ? [
    ...(featureFlags.navigation.dashboard ? [{ name: 'Dashboard', href: '/counselor' }] : []),
    ...(featureFlags.navigation.events ? [{ name: 'Events', href: '/counselor/events' }] : []),
    ...(featureFlags.navigation.meetings ? [{ name: 'Meetings', href: '/counselor/meetings' }] : []),
    ...(isAdmin && featureFlags.navigation.manageUsers ? [{ name: 'Users', href: '/counselor/manage-users' }] : []),
    ...(featureFlags.navigation.manageCourses ? [{ name: 'Courses', href: '/admin/subjects' }] : []),
    ...(featureFlags.navigation.manageColleges ? [{ name: 'Colleges', href: '/admin/colleges' }] : []),
    { name: 'Docs', href: '/counselor/docs' },
  ] : [
    { name: 'Dashboard', href: '/student' },
    { name: 'Profile', href: '/student/profile' },
    { name: 'Test Scores', href: '/student/test-scores' },
    ...(isProfileBuilding ? [
      { name: 'Goals', href: '/student/goals' },
      { name: 'History', href: '/student/history' },
      { name: 'Meetings', href: '/student/meetings' },
    ] : []),
    ...(isCollegeApps ? [
      { name: 'Colleges', href: '/student/colleges' },
      { name: 'Applications', href: '/student/applications' },
      { name: 'Analysis', href: '/student/analysis' },
    ] : []),
  ];

  return (
    <nav className="flex gap-0.5 h-full items-center">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
            pathname === item.href || (item.href !== '/counselor' && pathname.startsWith(item.href))
              ? "bg-brand-50 text-brand-700"
              : "text-slate-400 hover:text-slate-900 hover:bg-surface-soft"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
