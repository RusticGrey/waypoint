import { useState, useEffect } from 'react';

interface Enums {
  achievementTypes: string[];
  activityCategories: string[];
  projectTypes: string[];
  recognitionLevels: string[];
  gradeLevels: string[];
  curriculumTypes: string[];
  gradingSystemTypes: string[];
  honorsLevels: string[];
  semesterTypes: string[];
  goalTypes: string[];
  goalStatuses: string[];
  meetingTypes: string[];
  targetCategories: string[];
  applicationStatuses: string[];
}

export function useEnums() {
  const [enums, setEnums] = useState<Enums | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnums();
  }, []);

  const fetchEnums = async () => {
    try {
      const res = await fetch('/api/enums');
      const data = await res.json();
      setEnums(data);
    } catch (error) {
      console.error('Failed to fetch enums:', error);
    } finally {
      setLoading(false);
    }
  };

  return { enums, loading };
}
