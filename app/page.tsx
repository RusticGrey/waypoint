'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
      <nav className="bg-white shadow-sm sticky top-0 z-50">
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
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Empower Your Students
            <br />
            <span className="text-blue-600">Transform Your Counseling Practice</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The comprehensive platform designed to enhance efficiency and help students succeed in college admissions.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/login"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
            >
              Learn More
            </a>
          </div>
        </div>

        <FeatureTabs />

        {/* Analytics Dashboard Preview */}
        <div className="mt-24 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 mb-20 text-white">
          <h2 className="text-3xl font-bold mb-8">Real Impact, Real-Time Analytics</h2>
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
              <p className="text-4xl font-bold">78%</p>              
              <p className="text-blue-200 text-xs mt-2">↑ 5% improvement</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-blue-100 text-sm mb-2">Applications Tracked</p>
              <p className="text-4xl font-bold">1,024</p>
              <p className="text-blue-200 text-xs mt-2">Across 156 colleges</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-900 rounded-2xl shadow-xl p-12 text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Counseling Practice?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join school counselors who are enhancing their efficiency and helping more students succeed in college admissions.
          </p>
          <Link
            href="/login"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your Account
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold">W</span>
                </div>
                <span className="font-bold text-gray-900">Waypoint</span>
              </div>
              <p className="text-sm text-gray-600">Empowering counselors to transform student futures.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Features</a></li>
                <li><a href="#" className="hover:text-blue-600">Roadmap</a></li>
                <li><a href="#" className="hover:text-blue-600">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-600">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600">About</a></li>
                <li><a href="#" className="hover:text-blue-600">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-600">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2026 Waypoint Student Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureTabs() {
  const [activeTab, setActiveTab] = useState<'features' | 'counselors' | 'coordinators' | 'students' | 'roadmap'>('features');

  return (
    <div id="features" className="scroll-mt-24">
      {/* Tabs Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <button
          onClick={() => setActiveTab('features')}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            activeTab === 'features'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          Core Features
        </button>
        <button
          onClick={() => setActiveTab('counselors')}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            activeTab === 'counselors'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          For Counselors
        </button>
        <button
          onClick={() => setActiveTab('coordinators')}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            activeTab === 'coordinators'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          For Coordinators
        </button>
        <button
          onClick={() => setActiveTab('students')}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            activeTab === 'students'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          For Students
        </button>
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            activeTab === 'roadmap'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white text-purple-600 hover:bg-purple-50 border border-purple-200'
          }`}
        >
          Future Roadmap
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 min-h-[600px] transition-all duration-300">
        
        {activeTab === 'features' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need for College Success</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                A comprehensive suite of tools designed to guide students from their first day to their final acceptance letter.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Seamless Onboarding</h3>
                    <p className="text-gray-600">Role-specific entry paths and a 7-step guided wizard to get everyone started on the right foot immediately.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Holistic Profile Building</h3>
                    <p className="text-gray-600">Go beyond grades with detailed tracking for extracurriculars, achievements, and project portfolios.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">App Prep & Tracking</h3>
                    <p className="text-gray-600">Smart college list building, deadline reminders, and status tracking from "Not Started" to "Accepted".</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Enhanced Coordination</h3>
                    <p className="text-gray-600">Bridge the gap between counselors, students, and coordinators with centralized communication and oversight.</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex items-center justify-center">
                 <div className="w-full h-full bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center space-x-4 border-b border-gray-100 pb-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">W</div>
                        <div>
                            <div className="font-bold text-gray-900">Waypoint Platform</div>
                            <div className="text-xs text-gray-500">All-in-one Solution</div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="h-2 bg-gray-100 rounded-full w-3/4"></div>
                        <div className="h-2 bg-gray-100 rounded-full w-1/2"></div>
                        <div className="h-32 bg-blue-50 rounded-lg mt-4 flex items-center justify-center text-blue-200">
                             <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'counselors' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="lg:w-1/2 space-y-6">
                    <h2 className="text-3xl font-bold text-gray-900">Command Center for Counselors</h2>
                    <p className="text-lg text-gray-600">
                      Get a bird's-eye view of your entire student cohort. Identify at-risk students, track application submission rates, and manage your counseling team effectively.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Real-time application status tracking
                      </li>
                      <li className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Automated flagging of missed deadlines
                      </li>
                      <li className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Coordinator performance oversight
                      </li>
                    </ul>
                </div>
                <div className="lg:w-1/2 w-full">
                     {/* Simplified Counselor Dashboard Mockup */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <div className="text-xs text-gray-500">Total Students</div>
                                <div className="text-xl font-bold text-gray-900">1,248</div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <div className="text-xs text-gray-500">Pending Reviews</div>
                                <div className="text-xl font-bold text-gray-900">15</div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <div className="text-sm font-bold text-gray-700 mb-3">Priority Attention</div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center"><div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>John Davis</div>
                                    <span className="text-red-500 text-xs">Missing Essay</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center"><div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>Alice Smith</div>
                                    <span className="text-yellow-600 text-xs">Low GPA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'coordinators' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="lg:w-1/2 space-y-6">
                    <h2 className="text-3xl font-bold text-gray-900">Efficiency for Coordinators</h2>
                    <p className="text-lg text-gray-600">
                       Streamline your daily workflow. Manage appointments, track student progress notes, and ensure no student falls through the cracks.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Integrated calendar & scheduling
                      </li>
                      <li className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Quick-access student profiles
                      </li>
                      <li className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Task management & reminders
                      </li>
                    </ul>
                </div>
                <div className="lg:w-1/2 w-full">
                     {/* Simplified Coordinator Dashboard Mockup */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <div className="flex gap-3 mb-4">
                            <div className="bg-white px-4 py-2 rounded-full text-xs font-bold text-indigo-600 border border-indigo-100">4 Meetings Today</div>
                            <div className="bg-white px-4 py-2 rounded-full text-xs font-bold text-pink-600 border border-pink-100">12 Pending Tasks</div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <div className="text-sm font-bold text-gray-700 mb-3">Schedule</div>
                            <div className="space-y-3">
                                <div className="flex gap-3 text-sm">
                                    <div className="font-bold text-gray-500 w-12">10:00</div>
                                    <div className="bg-indigo-50 text-indigo-900 px-2 py-1 rounded flex-1">Profile Review: Sarah</div>
                                </div>
                                <div className="flex gap-3 text-sm">
                                    <div className="font-bold text-gray-500 w-12">11:30</div>
                                    <div className="bg-gray-50 text-gray-900 px-2 py-1 rounded flex-1">Essay Brainstorming</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="lg:w-1/2 space-y-6">
                    <h2 className="text-3xl font-bold text-gray-900">Clarity for Students</h2>
                    <p className="text-lg text-gray-600">
                       Demystify the college application process. Students know exactly what to do next, when it's due, and where they stand with every application.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Personalized "Next Steps" checklist
                      </li>
                      <li className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Visual progress bars for all tasks
                      </li>
                      <li className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Centralized document management
                      </li>
                    </ul>
                </div>
                <div className="lg:w-1/2 w-full">
                     {/* Simplified Student Dashboard Mockup */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-4 text-white mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-sm">Overall Progress</span>
                                <span className="text-xs bg-white/20 px-2 py-0.5 rounded">On Track</span>
                            </div>
                            <div className="w-full bg-black/20 rounded-full h-2">
                                <div className="bg-green-400 h-2 rounded-full" style={{ width: '68%' }}></div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                            <div className="text-sm font-bold text-gray-700 mb-3">Upcoming Deadlines</div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Stanford Regular</span>
                                    <span className="text-red-600 font-bold">Jan 01</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Financial Aid</span>
                                    <span className="text-yellow-600 font-bold">Jan 15</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">The Future of Waypoint</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We're continuously building new features to make college counseling even more efficient and effective.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
               <div className="flex items-start space-x-4 bg-gray-50 rounded-lg p-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Schedule Management</h4>
                    <p className="text-gray-600 text-sm">Self-booking appointments and automated reminders.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-gray-50 rounded-lg p-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Meeting Notes AI</h4>
                    <p className="text-gray-600 text-sm">Automatic transcription and summarization of meetings.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-gray-50 rounded-lg p-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">In-App Messaging</h4>
                    <p className="text-gray-600 text-sm">Direct, secure communication between students and counselors.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-gray-50 rounded-lg p-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0m-9 5h.01M12 12h4.01M16 20H8a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">AI College Matching</h4>
                    <p className="text-gray-600 text-sm">Intelligent recommendations for reach, match, and safety schools.</p>
                  </div>
                </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
