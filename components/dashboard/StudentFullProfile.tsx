'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';

interface StudentFullProfileProps {
  student: any; // Using any for simplicity given the complex relation structure, ideally typed
  analysis: any;
}

export default function StudentFullProfile({ student, analysis }: StudentFullProfileProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'academics', label: 'Academics' },
    { id: 'extracurriculars', label: 'Extracurriculars' },
    { id: 'personal', label: 'Personal' },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Profile Strength (Passed from parent mostly, but we can re-render basics or leave it out if parent handles) */}
          {/* Parent handles the main Profile Strength card. We'll focus on summary data here. */}
          
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* Goals */}
            <Card>
              <CardHeader>
                <CardTitle>Current Goals</CardTitle>
              </CardHeader>
              <CardContent>
                {student.goals && student.goals.length > 0 ? (
                  <ul className="space-y-3">
                    {student.goals.map((goal: any) => (
                      <li key={goal.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`mt-1 w-2 h-2 rounded-full ${
                          goal.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'
                        }`} />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{goal.targetValue} {goal.category}</p>
                          <p className="text-xs text-gray-500">
                            Status: {goal.status.replace('_', ' ')}
                            {goal.deadline && ` • Due: ${new Date(goal.deadline).toLocaleDateString()}`}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No active goals set.</p>
                )}
              </CardContent>
            </Card>

            {/* Target Colleges Summary */}
            <Card>
              <CardHeader>
                <CardTitle>College List</CardTitle>
              </CardHeader>
              <CardContent>
                {student.targetColleges && student.targetColleges.length > 0 ? (
                  <div className="space-y-4">
                    {['Reach', 'Match', 'Safety'].map((category) => {
                      const colleges = student.targetColleges.filter((tc: any) => tc.targetCategory === category);
                      if (colleges.length === 0) return null;
                      return (
                        <div key={category}>
                          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">{category}</h4>
                          <ul className="space-y-1">
                            {colleges.map((tc: any) => (
                              <li key={tc.id} className="text-sm text-gray-900">
                                {tc.college.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No target colleges added.</p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Meetings</CardTitle>
              </CardHeader>
              <CardContent>
                {student.meetings && student.meetings.length > 0 ? (
                  <div className="space-y-3">
                    {student.meetings.map((meeting) => (
                      <div key={meeting.id} className="border-b pb-3 last:border-0">
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(meeting.meetingDate).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="text-xs text-gray-600">
                          {meeting.meetingType.replace('_', ' ')}
                          {meeting.user && ` with ${meeting.user.firstName} ${meeting.user.lastName}`}
                        </p>
                        {meeting.notes && (
                          <p className="text-xs text-gray-700 mt-1">{meeting.notes.substring(0, 100)}...</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No meetings logged yet</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Academics Tab */}
      {activeTab === 'academics' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Academic Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Curriculum</dt>
                  <dd className="mt-1 text-sm text-gray-900">{student.academicProfile?.curriculumType || 'Not set'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Grading System</dt>
                  <dd className="mt-1 text-sm text-gray-900">{student.academicProfile?.gradingSystemType?.replace(/_/g, ' ') || 'Not set'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Current GPA/Score</dt>
                  <dd className="mt-1 text-sm text-gray-900">{student.academicProfile?.currentGpa || 'Not set'}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Scores</CardTitle>
            </CardHeader>
            <CardContent>
              {student.testScores && student.testScores.length > 0 ? (
                <div className="space-y-4">
                  {student.testScores.map((score: any) => (
                    <div key={score.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-900">{score.testType}</span>
                        <span className="text-gray-500 text-sm">{new Date(score.testDate).toLocaleDateString()}</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <span className="font-semibold">Composite: {score.compositeScore}</span>
                        {score.mathScore && <span className="ml-3">Math: {score.mathScore}</span>}
                        {score.englishScore && <span className="ml-3">English: {score.englishScore}</span>}
                        {score.readingWritingScore && <span className="ml-3">RW: {score.readingWritingScore}</span>}
                        {score.scienceScore && <span className="ml-3">Science: {score.scienceScore}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No test scores recorded.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transcripts ({student.transcripts?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              {student.transcripts && student.transcripts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade Level</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {student.transcripts.map((t: any) => (
                        <tr key={t.id}>
                          <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{t.courseName}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 capitalize">{t.gradeLevel}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{t.semester.replace('_', ' ')}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{t.gradeValue}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{t.honorsLevel.replace('_', ' ')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No transcripts added.</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Extracurriculars Tab */}
      {activeTab === 'extracurriculars' && (
        <div className="space-y-6">
          {/* Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Activities ({student.activities?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              {student.activities && student.activities.length > 0 ? (
                <div className="space-y-4">
                  {student.activities.map((activity: any) => (
                    <div key={activity.id} className="p-4 border rounded-lg bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900">{activity.activityName}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {activity.category.replace(/_/g, ' ')} • {activity.role || 'Member'}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {activity.hoursPerWeek}h/wk • {activity.weeksPerYear}wks/yr
                          </p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                          {activity.gradeLevel} Grade
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-700">{activity.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No activities added.</p>
              )}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements ({student.achievements?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              {student.achievements && student.achievements.length > 0 ? (
                <div className="space-y-4">
                  {student.achievements.map((achievement: any) => (
                    <div key={achievement.id} className="p-4 border rounded-lg bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {achievement.achievementType.replace(/_/g, ' ')}
                            {achievement.organization && ` • ${achievement.organization}`}
                          </p>
                          {achievement.dateAchieved && (
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(achievement.dateAchieved).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded capitalize mb-1">
                            {achievement.gradeLevel} Grade
                          </span>
                          {achievement.recognitionLevel && (
                            <div className="text-xs text-gray-500 capitalize">
                              {achievement.recognitionLevel.replace(/_/g, ' ')} Level
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-700">{achievement.description}</p>
                      {achievement.verifiableLink && (
                        <a 
                          href={achievement.verifiableLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-xs text-blue-600 hover:underline"
                        >
                          View Verification
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No achievements added.</p>
              )}
            </CardContent>
          </Card>

          {/* Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Projects ({student.projectExperiences?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              {student.projectExperiences && student.projectExperiences.length > 0 ? (
                <div className="space-y-4">
                  {student.projectExperiences.map((project: any) => (
                    <div key={project.id} className="p-4 border rounded-lg bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900">{project.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {project.experienceType.replace(/_/g, ' ')}
                            {project.organization && ` • ${project.organization}`}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(project.startDate).toLocaleDateString()} - {project.isOngoing ? 'Present' : project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-700">{project.description}</p>
                      {project.projectLink && (
                        <a 
                          href={project.projectLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-xs text-blue-600 hover:underline"
                        >
                          View Project
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No projects added.</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Personal Tab */}
      {activeTab === 'personal' && (
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.user.firstName} {student.user.lastName}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.user.email}</dd>
              </div>
              
              <div className="border-t border-gray-100 col-span-full my-2"></div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Preferred Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.personalProfile?.preferredName || '-'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Current Grade</dt>
                <dd className="mt-1 text-sm text-gray-900 capitalize">{student.currentGrade || '-'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Graduation Year</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.graduationYear || '-'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.personalProfile?.phone || '-'}</dd>
              </div>
              
              <div className="border-t border-gray-100 col-span-full my-2"></div>
              
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">School</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.personalProfile?.currentSchool || '-'}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">School Location</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.personalProfile?.schoolLocation || '-'}</dd>
              </div>

              <div className="border-t border-gray-100 col-span-full my-2"></div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Parent Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.personalProfile?.parentName || '-'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Parent Phone</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.personalProfile?.parentPhone || '-'}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Parent Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.personalProfile?.parentEmail || '-'}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
