export const featureFlags = {
  // Whitelabeling
  branding: {
    name: 'Engage',
    logoText: 'Engage',
    fullTitle: 'Engage College Counselling',
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
