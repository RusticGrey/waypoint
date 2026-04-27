'use client';

import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { featureFlags } from "@/lib/feature-flags";
import { Sparkles } from "lucide-react";
import { CollegeKnowledgeChat } from "@/components/admin/rankings/CollegeKnowledgeChat";

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

  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const navItems = role === 'counselor' ? [
    ...(featureFlags.navigation.dashboard ? [{ name: 'Dashboard', href: '/counselor' }] : []),
    ...(featureFlags.navigation.events ? [{ name: 'Events', href: '/counselor/events' }] : []),
    ...(featureFlags.navigation.meetings ? [{ name: 'Meetings', href: '/counselor/meetings' }] : []),
    ...(isAdmin && featureFlags.navigation.manageUsers ? [{ name: 'Users', href: '/counselor/manage-users' }] : []),
    ...(featureFlags.navigation.manageCourses ? [{ name: 'Courses', href: '/admin/subjects' }] : []),
    { name: 'Colleges', href: '/counselor/colleges' },
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
    <nav className="flex gap-0.5 h-full items-center relative">
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

      {role === 'counselor' && (
        <>
          <Link
            href="/counselor/assistant"
            className={cn(
              "group relative flex items-center gap-2 px-4 py-1.5 ml-2 rounded-xl transition-all shadow-lg active:scale-95",
              pathname === '/counselor/assistant' 
                ? "bg-brand-600 text-white shadow-brand-200" 
                : "bg-slate-900 text-white hover:bg-black shadow-slate-200"
            )}
          >
            <Sparkles className={cn("w-3.5 h-3.5 group-hover:animate-pulse", pathname === '/counselor/assistant' ? "text-white" : "text-brand-400")} />
            <span className="text-[10px] font-black uppercase tracking-widest">Beacon AI</span>
            
            {/* Jazzy Pixel Badge */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-500 border-2 border-white flex items-center justify-center">
                 <span className="text-[6px] font-black text-white leading-none">AI</span>
              </span>
            </span>
          </Link>
        </>
      )}
    </nav>
  );
}
