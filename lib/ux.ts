/**
 * Global UX Theme configuration for Engage platform.
 * Formalizes shared styles for cards, buttons, and typography.
 */

export const ux = {
  // Page Backgrounds
  bg: {
    main: "bg-white",
    soft: "bg-slate-50/50",
    muted: "bg-slate-100",
  },

  // Card Styles
  card: {
    base: "bg-white border-slate-200 transition-all duration-200",
    interactive: "hover:shadow-lg hover:border-blue-200 active:scale-[0.99]",
    pop: "shadow-md border-slate-200 relative overflow-hidden",
    highlight: "before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-blue-600",
    ribbon: "after:absolute after:top-0 after:right-0 after:w-20 after:h-20 after:bg-blue-50/50 after:rounded-bl-full after:-mr-10 after:-mt-10 after:-z-0",
  },

  // Typography
  text: {
    heading: "text-slate-900 font-black tracking-tight",
    subheading: "text-slate-700 font-bold",
    body: "text-slate-600 font-medium",
    muted: "text-slate-400 font-medium",
    accent: "text-blue-600 font-black uppercase tracking-widest text-[10px]",
  },

  // Status Badges
  badge: {
    success: "bg-green-50 text-green-700 border-green-200 font-bold uppercase tracking-wider text-[10px]",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-200 font-bold uppercase tracking-wider text-[10px]",
    error: "bg-red-50 text-red-700 border-red-200 font-bold uppercase tracking-wider text-[10px]",
    neutral: "bg-slate-50 text-slate-500 border-slate-200 font-bold uppercase tracking-wider text-[10px]",
  }
};
