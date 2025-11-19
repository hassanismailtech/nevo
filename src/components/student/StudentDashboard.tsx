import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, BookOpen, Trophy, Settings, LogOut, Sparkles, Clock, Target, TrendingUp, ArrowRight, UserPlus, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { AddConnections } from '../AddConnections';
import { useAuthStore } from '../../stores/authStore';
import { lessonsApi, type Lesson } from '../../api/lessons';
import { assessmentApi } from '../../api/assessment';
import nevoLogo from '../../assets/nevo-logo.png';

export function StudentDashboard() {
  const navigate = useNavigate();
  const { currentUser, assessmentData, logout, setAssessmentData } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'today' | 'all' | 'progress' | 'connections' | 'settings'>('today');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalXP, setTotalXP] = useState(215);
  const [streak, setStreak] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch lessons
        const fetchedLessons = await lessonsApi.getStudentLessons();
        setLessons(fetchedLessons);
        
        // Fetch assessment result if not in store
        if (!assessmentData) {
          try {
            const result = await assessmentApi.getResult();
            if (result) {
              setAssessmentData(result);
            }
          } catch {
            // No assessment found, that's okay
          }
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [assessmentData, setAssessmentData]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getProfileDescription = (profile: string) => {
    const profiles: Record<string, { title: string; description: string; color: string }> = {
      'adhd': { 
        title: 'Active Learner', 
        description: 'You learn best with interactive, bite-sized lessons and frequent breaks',
        color: '#F97316'
      },
      'autism': { 
        title: 'Structured Learner', 
        description: 'You excel with step-by-step instructions and clear, predictable patterns',
        color: '#3B82F6'
      },
      'dyslexia': { 
        title: 'Visual Learner', 
        description: 'You understand better with visual aids and short, clear text',
        color: '#10B981'
      },
      'visual-learner': { 
        title: 'Visual Learner', 
        description: 'You learn best through diagrams, charts, and visual examples',
        color: '#FBBF24'
      },
      'auditory-learner': { 
        title: 'Auditory Learner', 
        description: 'You understand better by listening and verbal explanations',
        color: '#8B5CF6'
      },
      'typical': { 
        title: 'Balanced Learner', 
        description: 'You learn well with a mix of different teaching methods',
        color: '#4F46E5'
      }
    };
    return profiles[profile] || profiles['typical'];
  };

  const profileInfo = assessmentData ? getProfileDescription(assessmentData.profile) : null;
  const featuredLesson = lessons.find(l => l.status === 'in-progress') || lessons[0];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#4F46E5] animate-spin mx-auto mb-4" />
          <p className="text-[#6B7280]">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={nevoLogo} alt="Nevo" className="w-8 h-8" />
              <span className="font-poppins text-[#111827] text-2xl font-bold">Nevo</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('today')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'today' ? 'text-[#4F46E5]' : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'all' ? 'text-[#4F46E5]' : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                All Lessons
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'progress' ? 'text-[#4F46E5]' : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                Progress
              </button>
              <button
                onClick={() => setActiveTab('connections')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'connections' ? 'text-[#4F46E5]' : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                My Team
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'settings' ? 'text-[#4F46E5]' : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                Settings
              </button>
              <div className="w-px h-6 bg-gray-200 mx-2" />
              <Button onClick={handleLogout} variant="ghost" size="sm" className="text-[#6B7280] hover:text-[#111827]">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="mb-2">Welcome back, {currentUser?.fullName?.split(' ')[0] || 'Student'}!</h1>
          <p className="text-[#6B7280] text-lg">Let's continue your learning journey</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Profile Card */}
            {profileInfo && (
              <div className="p-8 border border-[#E5E7EB] rounded-2xl">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-5 h-5 text-[#4F46E5]" />
                      <span className="text-[#6B7280]">Your Learning Profile</span>
                    </div>
                    <h3 className="mb-2">{profileInfo.title}</h3>
                    <p className="text-[#6B7280] leading-relaxed">{profileInfo.description}</p>
                  </div>
                  <div className="w-14 h-14 rounded-xl border-2 border-[#4F46E5] flex items-center justify-center ml-6">
                    <Brain className="w-7 h-7 text-[#4F46E5]" />
                  </div>
                </div>
              </div>
            )}

            {/* Today's Lesson */}
            {activeTab === 'today' && (
              <div>
                <h2 className="mb-6">Today's Featured Lesson</h2>
                {featuredLesson ? (
                  <>
                    <div className="p-8 border border-[#E5E7EB] rounded-2xl hover:border-[#4F46E5] transition-all">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <span className="inline-block px-3 py-1 bg-[#F3F4F6] text-[#6B7280] rounded-full text-sm mb-3">
                            {featuredLesson.subject}
                          </span>
                          <h3 className="mb-3">{featuredLesson.title}</h3>
                          <div className="flex items-center gap-6 text-[#6B7280]">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{featuredLesson.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Target className="w-4 h-4" />
                              <span>{featuredLesson.xp} XP</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex justify-between mb-2">
                          <span className="text-[#6B7280]">Progress</span>
                          <span className="text-[#111827]">
                            {featuredLesson.progress}%
                          </span>
                        </div>
                        <Progress value={featuredLesson.progress} className="h-2" />
                      </div>

                      <Button className="bg-[#4F46E5] text-white hover:bg-[#4338CA] h-12 px-6 rounded-xl" asChild>
                        <Link to={`/student/lesson/${featuredLesson.id}`}>
                          Continue Learning
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>

                    {/* AI Tutor Tip */}
                    <div className="mt-8 p-6 border border-[#E0E7FF] bg-gradient-to-br from-[#F5F7FF] to-[#EEF2FF] rounded-2xl">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#4F46E5] flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="mb-2">Personalized Tip</h3>
                          <p className="text-[#6B7280] leading-relaxed">
                            Based on your learning profile, try breaking this lesson into 3 sessions with short breaks in between. This will help you retain more information!
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-8 border border-[#E5E7EB] rounded-2xl text-center">
                    <p className="text-[#6B7280]">No lessons available yet. Check back soon!</p>
                  </div>
                )}
              </div>
            )}

            {/* All Lessons */}
            {activeTab === 'all' && (
              <div>
                <h2 className="mb-6">All Lessons</h2>
                {lessons.length > 0 ? (
                  <div className="space-y-4">
                    {lessons.map((lesson) => (
                      <div key={lesson.id} className="p-6 border border-[#E5E7EB] rounded-2xl hover:border-[#4F46E5] transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="inline-block px-3 py-1 bg-[#F3F4F6] text-[#6B7280] rounded-full text-sm">
                                {lesson.subject}
                              </span>
                              {lesson.status === 'completed' && (
                                <span className="inline-block px-3 py-1 bg-[#ECFDF5] text-[#059669] rounded-full text-sm">
                                  Completed
                                </span>
                              )}
                            </div>
                            <h3 className="mb-3">{lesson.title}</h3>
                            <div className="flex items-center gap-6 text-[#6B7280]">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{lesson.duration}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                <span>{lesson.xp} XP</span>
                              </div>
                            </div>
                            {lesson.progress > 0 && lesson.progress < 100 && (
                              <div className="mt-4 max-w-xs">
                                <Progress value={lesson.progress} className="h-2" />
                              </div>
                            )}
                          </div>
                          <Button 
                            className={lesson.status === 'completed' 
                              ? 'border border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F9FAFB]' 
                              : 'bg-[#4F46E5] text-white hover:bg-[#4338CA]'
                            }
                            asChild
                          >
                            <Link to={`/student/lesson/${lesson.id}`}>
                              {lesson.status === 'completed' ? 'Review' : 
                               lesson.status === 'in-progress' ? 'Continue' : 'Start'}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 border border-[#E5E7EB] rounded-2xl text-center">
                    <p className="text-[#6B7280]">No lessons available yet. Check back soon!</p>
                  </div>
                )}
              </div>
            )}

            {/* Progress Tab */}
            {activeTab === 'progress' && (
              <div>
                <h2 className="mb-6">Your Progress</h2>
                
                {/* Achievements */}
                <div className="p-8 border border-[#E5E7EB] rounded-2xl mb-8">
                  <h3 className="mb-6">Recent Achievements</h3>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-xl border-2 border-[#FBBF24] flex items-center justify-center">
                        <Trophy className="w-7 h-7 text-[#FBBF24]" />
                      </div>
                      <h3 className="mb-1">7 Day Streak</h3>
                      <p className="text-[#6B7280] text-sm">Keep it up!</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-xl border-2 border-[#10B981] flex items-center justify-center">
                        <Target className="w-7 h-7 text-[#10B981]" />
                      </div>
                      <h3 className="mb-1">Fast Learner</h3>
                      <p className="text-[#6B7280] text-sm">3 lessons in a day</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-xl border-2 border-[#4F46E5] flex items-center justify-center">
                        <Sparkles className="w-7 h-7 text-[#4F46E5]" />
                      </div>
                      <h3 className="mb-1">Quick Start</h3>
                      <p className="text-[#6B7280] text-sm">Completed assessment</p>
                    </div>
                  </div>
                </div>

                {/* Subject Progress */}
                <div className="p-8 border border-[#E5E7EB] rounded-2xl">
                  <h3 className="mb-6">Progress by Subject</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-3">
                        <span className="text-[#111827]">Mathematics</span>
                        <span className="text-[#6B7280]">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-3">
                        <span className="text-[#111827]">English</span>
                        <span className="text-[#6B7280]">60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-3">
                        <span className="text-[#111827]">Science</span>
                        <span className="text-[#6B7280]">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="mb-6">Settings</h2>
                <div className="p-8 border border-[#E5E7EB] rounded-2xl">
                  <h3 className="mb-6">Profile Information</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="text-[#6B7280] mb-2 block text-sm">
                        Full Name
                      </label>
                      <p className="text-[#111827]">{currentUser?.fullName}</p>
                    </div>
                    <div>
                      <label className="text-[#6B7280] mb-2 block text-sm">
                        Email
                      </label>
                      <p className="text-[#111827]">{currentUser?.email}</p>
                    </div>
                    <div>
                      <label className="text-[#6B7280] mb-2 block text-sm">
                        Learning Profile
                      </label>
                      <p className="text-[#111827]">{profileInfo?.title}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-[#E5E7EB]">
                    <Button className="border border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F9FAFB]">
                      Retake Assessment
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Connections Tab */}
            {activeTab === 'connections' && (
              <div>
                <AddConnections userRole="student" />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* XP Card */}
            <div className="p-6 border border-[#E5E7EB] rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3>Total XP</h3>
                <Trophy className="w-5 h-5 text-[#FBBF24]" />
              </div>
              <div className="mb-2">
                <span className="text-5xl font-bold text-[#111827]">{totalXP}</span>
              </div>
              <p className="text-[#6B7280]">
                +50 XP today
              </p>
            </div>

            {/* Streak Card */}
            <div className="p-6 border border-[#E5E7EB] rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3>Current Streak</h3>
                <TrendingUp className="w-5 h-5 text-[#10B981]" />
              </div>
              <div className="text-center py-4">
                <div className="text-[#10B981] mb-2 text-6xl font-bold">
                  {streak}
                </div>
                <p className="text-[#6B7280]">days in a row! 🔥</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-6 border border-[#E5E7EB] rounded-2xl">
              <h3 className="mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button 
                  onClick={() => setActiveTab('connections')}
                  className="w-full justify-start text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB]" 
                  variant="ghost"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Teacher/Parent
                </Button>
                <Button className="w-full justify-start text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB]" variant="ghost">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse All Lessons
                </Button>
                <Button className="w-full justify-start text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB]" variant="ghost">
                  <Trophy className="w-4 h-4 mr-2" />
                  View Achievements
                </Button>
                <Button 
                  onClick={() => setActiveTab('settings')}
                  className="w-full justify-start text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB]" 
                  variant="ghost"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
