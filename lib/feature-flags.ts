import { BRAND_NAME, FULL_BRAND_NAME } from "./branding";

export const featureFlags = {
  // Whitelabeling
  branding: {
    name: BRAND_NAME,
    logoText: BRAND_NAME,
    fullTitle: FULL_BRAND_NAME,
  },

  // Main Counselor Features
  counselorDashboard: {
    studentsList: true,
    stats: true,
    quickLinks: {
      meetings: true,
      availability: true,
      profile: true,
    },
    eventManagement: true,
  },
  
  // Navigation
  navigation: {
    dashboard: true,
    events: true,
    meetings: true,
    manageUsers: true,
    manageCourses: true,
    manageColleges: true,
  },

  // Student Features (Remaining enabled for now unless specified)
  studentFeatures: true,
};

export type FeatureFlags = typeof featureFlags;
