'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      // Redirect based on role
      if (session.user.role === 'student') {
        router.push('/student');
      } else if (session.user.role === 'coordinator') {
        router.push('/coordinator');
      } else if (session.user.role === 'counselor') {
        router.push('/counselor');
      }
    }
  }, [status, session, router]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If authenticated, the useEffect will handle the redirect
  if (status === 'authenticated') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  // Landing page for unauthenticated users
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Waypoint</span>
          </div>
          <Link
            href="/login"
            className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Empower Your Students
            <br />
            <span className="text-blue-600">Transform Your Counseling Practice</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Waypoint Student Portal is the comprehensive platform designed to enhance counselor efficiency and help students succeed in college admissions. Manage applications, track progress, and provide expert guidance—all in one place.
          </p>
          <Link
            href="/login"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Analytics Dashboard Preview */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 mb-20 text-white">
          <h2 className="text-3xl font-bold mb-8">Analytics at a Glance</h2>
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-blue-100 text-sm mb-2">Total Students</p>
              <p className="text-4xl font-bold">247</p>
              <p className="text-blue-200 text-xs mt-2">↑ 12% from last month</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-blue-100 text-sm mb-2">Profiles Completed</p>
              <p className="text-4xl font-bold">189</p>
              <p className="text-blue-200 text-xs mt-2">76% completion rate</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-blue-100 text-sm mb-2">Avg Profile Strength</p>
              <p className="text-4xl font-bold\">78%</p>              
              <p className="text-blue-200 text-xs mt-2">↑ 5% improvement</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-blue-100 text-sm mb-2">Applications Tracked</p>
              <p className="text-4xl font-bold">1,024</p>
              <p className="text-blue-200 text-xs mt-2">Across 156 colleges</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-blue-100 text-sm mb-4 font-semibold">Profile Status Distribution</p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Complete (90-100%)</span>
                    <span>124 students</span>
                  </div>
                  <div className="w-full bg-blue-900 bg-opacity-50 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{width: '52%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>In Progress (50-89%)</span>
                    <span>87 students</span>
                  </div>
                  <div className="w-full bg-blue-900 bg-opacity-50 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{width: '36%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Just Started (0-49%)</span>
                    <span>36 students</span>
                  </div>
                  <div className="w-full bg-blue-900 bg-opacity-50 rounded-full h-2">
                    <div className="bg-red-400 h-2 rounded-full" style={{width: '15%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-blue-100 text-sm mb-4 font-semibold">College Application Timeline</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Applied</span>
                  <span className="font-semibold">342</span>
                </div>
                <div className="flex justify-between">
                  <span>Under Review</span>
                  <span className="font-semibold">456</span>
                </div>
                <div className="flex justify-between">
                  <span>Accepted</span>
                  <span className="font-semibold">158</span>
                </div>
                <div className="flex justify-between">
                  <span>Waitlisted</span>
                  <span className="font-semibold">45</span>
                </div>
                <div className="flex justify-between">
                  <span>Rejected</span>
                  <span className="font-semibold">23</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Audience Section - Counselors */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-20">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              For Counselors: Enhance Your Efficiency
            </h2>
            <p className="text-gray-600 mb-8">
              Waypoint is built for school counselors who manage multiple students and want to scale their impact. Automate workflows, track all student progress, and make data-driven decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm0 0h6v-2a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Manage Multiple Students</h3>
              <p className="text-gray-700 text-sm">
                Centralized dashboard to monitor progress of all your students at a glance. Track completion rates and identify who needs attention.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Automated Workflows</h3>
              <p className="text-gray-700 text-sm">
                Streamline your counseling process with automated profile generation, status tracking, and progress reports.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Data-Driven Insights</h3>
              <p className="text-gray-700 text-sm">
                Get instant analytics on student progress, profile strengths, and readiness for college. Make informed decisions quickly.
              </p>
            </div>
          </div>
        </div>

        {/* Secondary Audience - Coordinators */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-8 mb-20 border border-indigo-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">For Coordinators: Support Students Effectively</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Meeting Management</h4>
                <p className="text-gray-700">Log meetings, track action items, and monitor student progress over time.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Application Tracking</h4>
                <p className="text-gray-700">Monitor college applications, deadlines, and decisions for all assigned students.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Profile Overrides</h4>
                <p className="text-gray-700">Provide expert guidance by overriding profile scores with personalized feedback.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Progress Analysis</h4>
                <p className="text-gray-700">Access detailed analytics to identify students needing additional support.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tertiary Audience - Students */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-8 mb-20 border border-green-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">For Students: Your College Success Partner</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Complete Your Profile</h4>
              <p className="text-gray-700 text-sm">Build a comprehensive profile with 7 easy steps. Showcase your academics, activities, and achievements.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Get Instant Feedback</h4>
              <p className="text-gray-700 text-sm">Receive AI-powered analysis of your profile strength and personalized recommendations for improvement.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Track Your Journey</h4>
              <p className="text-gray-700 text-sm">Manage applications, monitor deadlines, track test scores, and stay organized throughout your college journey.</p>
            </div>
          </div>
        </div>

        {/* Upcoming Features */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8 mb-20 border border-purple-200">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Coming Soon: Enhanced Features</h2>
            <p className="text-gray-600">
              We're continuously expanding Waypoint to make college counseling even more efficient and effective.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4 bg-white rounded-lg p-4">
              <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Schedule Management</h4>
                <p className="text-gray-700 text-sm">Students can self-book appointments on counselor and coordinator calendars. Automated reminders ensure no missed meetings.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white rounded-lg p-4">
              <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Meeting Notes Automation</h4>
                <p className="text-gray-700 text-sm">Automatic transcription and summarization of meeting notes via Zoom and Google Meet integration.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white rounded-lg p-4">
              <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Email Communication</h4>
                <p className="text-gray-700 text-sm">Send personalized messages to students directly from Waypoint. Built-in templates for common counseling communication.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white rounded-lg p-4">
              <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">PDF Reports & Progress Generation</h4>
                <p className="text-gray-700 text-sm">Generate professional PDF reports of student progress, profile analysis, and recommendations for colleges and families.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white rounded-lg p-4">
              <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.996 10-10.747S17.5 6.253 12 6.253z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Common App Prep & Tracking</h4>
                <p className="text-gray-700 text-sm">Guided Common App preparation with essay feedback, prompt tracking, and submission timeline management for all students.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white rounded-lg p-4">
              <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0m-9 5h.01M12 12h4.01M16 20H8a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">AI-Driven College Matching</h4>
                <p className="text-gray-700 text-sm">Intelligent algorithms identify target colleges based on student strengths, academic profile, and college requirements. Personalized recommendations for reach, match, and safety schools.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-lg shadow-lg p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Counseling Practice?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join school counselors who are enhancing their efficiency and helping more students succeed in college admissions.
          </p>
          <Link
            href="/login"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Login to Your Account
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold">W</span>
                </div>
                <span className="font-bold text-white">Waypoint</span>
              </div>
              <p className="text-sm">Empowering counselors to transform student futures.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">For Counselors</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Student Management</a></li>
                <li><a href="#" className="hover:text-white">Analytics & Insights</a></li>
                <li><a href="#" className="hover:text-white">Coordinator Oversight</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 Waypoint Student Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
