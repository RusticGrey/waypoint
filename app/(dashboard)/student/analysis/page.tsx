'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';

interface ProfileAnalysis {
  overall_score: number;
  category_scores: {
    academic: number;
    testing: number;
    Activity: number;
    leadership: number;
    Achievement: number;
    projects: number;
  };
  category_details: {
    academic: {
      gpa_score: number;
      course_rigor_score: number;
      course_breadth_score: number;
      total: number;
      max: number;
      details: string[];
    };
    testing: {
      sat_score: number;
      act_score: number;
      total: number;
      max: number;
      details: string[];
    };
    Activity: {
      quantity_score: number;
      commitment_score: number;
      diversity_score: number;
      total: number;
      max: number;
      details: string[];
    };
    leadership: {
      roles_score: number;
      achievements_score: number;
      total: number;
      max: number;
      details: string[];
    };
    Achievement: {
      quantity_score: number;
      recognition_score: number;
      total: number;
      max: number;
      details: string[];
    };
    projects: {
      quantity_score: number;
      quality_score: number;
      total: number;
      max: number;
      details: string[];
    };
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  college_readiness: string;
  override?: {
    is_overridden: boolean;
    override_score: number;
    override_reason: string;
    overridden_by: string;
    overridden_at: string;
  };
}

export default function AnalysisPage() {
  const [analysis, setAnalysis] = useState<ProfileAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const fetchAnalysis = async () => {
    try {
      const res = await fetch('/api/student/profile-analysis');
      const data = await res.json();
      setAnalysis(data);
    } catch (error) {
      console.error('Failed to fetch analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gray-600 text-center py-12">Analyzing your profile...</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-red-600 text-center py-12">Failed to load analysis</p>
      </div>
    );
  }

  const displayScore = analysis.override?.is_overridden 
    ? analysis.override.overrideScore 
    : analysis.overall_score;

  const getCategoryColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const categories = [
    { key: 'academic', name: 'Academic Performance', weight: '30%', icon: '📚' },
    { key: 'testing', name: 'Standardized Testing', weight: '20%', icon: '📝' },
    { key: 'activities', name: 'Extracurricular Activities', weight: '20%', icon: '⚽' },
    { key: 'leadership', name: 'Leadership Experience', weight: '10%', icon: '👑' },
    { key: 'achievements', name: 'Awards & Honors', weight: '10%', icon: '🏆' },
    { key: 'projects', name: 'Projects & Research', weight: '10%', icon: '🔬' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Profile Strength Analysis</h1>
        <p className="text-gray-600 mt-1">
          Detailed breakdown of your college application profile
        </p>
      </div>

      {/* Overall Score */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Overall Profile Strength</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 text-center">
              <div className={`text-7xl font-bold ${getScoreColor(displayScore)}`}>
                {displayScore}
              </div>
              <p className="text-sm text-gray-500 mt-1">out of 100</p>
              {analysis.override?.is_overridden && (
                <div className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Counselor Adjusted
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <ProgressBar percentage={displayScore} showLabel={false} />
              <p className="mt-3 text-base font-medium text-gray-900">
                College Readiness: <span className={
                  analysis.college_readiness === 'Highly Competitive' ? 'text-green-600' :
                  analysis.college_readiness === 'Competitive' ? 'text-blue-600' :
                  analysis.college_readiness === 'Developing' ? 'text-yellow-600' : 'text-red-600'
                }>{analysis.college_readiness}</span>
              </p>
              
              {analysis.override?.is_overridden && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">
                    Counselor Note: {analysis.override.overrideReason}
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    Adjusted by {analysis.override.overriddenBy} on {new Date(analysis.override.overriddenAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How Score is Calculated */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>How Your Score is Calculated</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 mb-4">
            Your overall score is a weighted average of 6 categories. Each category measures different aspects of your college application profile.
          </p>
          
          <div className="space-y-3">
            {categories.map((category) => {
              const score = analysis.category_scores[category.key as keyof typeof analysis.category_scores];
              const details = analysis.category_details[category.key as keyof typeof analysis.category_details];
              const isExpanded = expandedSection === category.key;
              
              return (
                <div key={category.key} className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedSection(isExpanded ? null : category.key)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-2xl">{category.icon}</span>
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{category.name}</p>
                        <p className="text-xs text-gray-500">Weight: {category.weight}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                          {score}
                        </div>
                        <div className="text-xs text-gray-500">
                          {details.total}/{details.max} points
                        </div>
                      </div>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="px-4 py-4 bg-gray-50 border-t">
                      <h4 className="font-semibold text-gray-900 mb-2">Score Breakdown:</h4>
                      <ul className="space-y-2">
                        {details.details.map((detail, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {score < 60 && (
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                          <p className="text-sm font-medium text-yellow-900">💡 How to Improve:</p>
                          <p className="text-sm text-yellow-800 mt-1">
                            {getImprovementTip(category.key)}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700">💪 Your Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            {analysis.strengths.length > 0 ? (
              <ul className="space-y-2">
                {analysis.strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-sm text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Keep building your profile!</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-yellow-700">📈 Areas to Improve</CardTitle>
          </CardHeader>
          <CardContent>
            {analysis.weaknesses.length > 0 ? (
              <ul className="space-y-2">
                {analysis.weaknesses.map((weakness, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-yellow-600 mr-2">→</span>
                    <span className="text-sm text-gray-700">{weakness}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Great work! Keep it up!</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>🎯 Personalized Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analysis.recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-blue-600 font-bold mr-3 flex-shrink-0">{idx + 1}.</span>
                <p className="text-sm text-gray-900">{rec}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getImprovementTip(category: string): string {
  const tips: Record<string, string> = {
    academic: "Focus on maintaining high grades and taking challenging courses like AP, IB, or Honors classes.",
    testing: "Consider taking SAT/ACT prep courses and aim for scores above 1400 (SAT) or 30 (ACT).",
    Activity: "Join more clubs or activities, commit to them long-term, and aim for variety across different areas.",
    leadership: "Take on leadership roles in your activities - become a club president, team captain, or project lead.",
    Achievement: "Participate in competitions, contests, and apply for awards at school, district, or state level.",
    projects: "Start independent research projects, internships, or create something meaningful in your area of interest.",
  };
  return tips[category] || "Focus on building this area of your profile.";
}
