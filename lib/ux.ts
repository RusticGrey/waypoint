/**
 * Global UX Theme configuration for Engage platform.
 * Formalizes shared styles for cards, buttons, and typography.
 * Uses semantic tokens defined in tailwind.config.ts.
 */

export const ux = {
  // Page Backgrounds
  bg: {
    main: "bg-surface-soft", // Changed from bg-surface to bg-surface-soft for default background
    surface: "bg-white",
    muted: "bg-surface-muted",
    brand: "bg-brand-50",
  },

  // Card Styles
  card: {
    base: "bg-white border border-slate-200 rounded-2xl transition-all duration-200 shadow-sm", // Increased rounding
    interactive: "hover:shadow-xl hover:border-brand-300 active:scale-[0.99] hover:-translate-y-0.5",
    pop: "bg-white shadow-md border border-slate-200 relative overflow-hidden rounded-2xl",
    highlight: "before:absolute before:top-0 before:left-0 before:w-1.5 before:h-full before:bg-brand-600 shadow-lg border-brand-100/50",
    ribbon: "after:absolute after:top-0 after:right-0 after:w-20 after:h-20 after:bg-brand-50/50 after:rounded-bl-full after:-mr-10 after:-mt-10 after:-z-0",
  },

  // Typography
  text: {
    heading: "text-4xl text-slate-900 font-black tracking-tight", // Standardize 4xl for main headers
    subheading: "text-xl text-slate-700 font-bold", // Standardize xl for subheaders
    body: "text-slate-600 font-medium",
    muted: "text-slate-400 font-medium",
    brand: "text-brand-600 font-bold",
    accent: "text-brand-600 font-black uppercase tracking-widest text-[10px]", // Consistent ALL CAPS for labels/accents
  },

  // Interactive Elements
  button: {
    primary: "px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-200 active:scale-95 disabled:opacity-50",
    secondary: "px-6 py-2.5 bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50",
    outline: "px-6 py-2.5 border-2 border-brand-200 hover:border-brand-300 hover:bg-brand-50/50 text-brand-700 font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50",
    ghost: "px-4 py-2 text-brand-600 hover:bg-brand-50 font-bold rounded-lg transition-all active:scale-95",
  },

  // Status Badges
  badge: {
    success: "bg-green-50 text-green-700 border border-green-200 font-bold uppercase tracking-wider text-[10px] rounded-full px-2.5 py-0.5",
    warning: "bg-yellow-50 text-yellow-700 border border-yellow-200 font-bold uppercase tracking-wider text-[10px] rounded-full px-2.5 py-0.5",
    error: "bg-red-50 text-red-700 border border-red-200 font-bold uppercase tracking-wider text-[10px] rounded-full px-2.5 py-0.5",
    neutral: "bg-slate-50 text-slate-500 border border-slate-200 font-bold uppercase tracking-wider text-[10px] rounded-full px-2.5 py-0.5",
    brand: "bg-brand-50 text-brand-700 border border-brand-100 font-bold uppercase tracking-wider text-[10px] rounded-full px-2.5 py-0.5",
  },

  // Form Elements
  form: {
    input: "w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all outline-none bg-surface-soft/50",
    label: "block text-xs font-black uppercase tracking-widest text-slate-500 mb-2",
    error: "text-xs text-red-600 mt-1.5 font-bold",
  },

  // Layout Containers
  layout: {
    page: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10",
    section: "bg-white p-8 rounded-2xl shadow-sm border border-slate-100",
    header: "mb-10 space-y-2",
  }
};
