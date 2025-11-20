import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, LogOut, TrendingUp, Clock, Target, Sparkles, Heart, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { useAuthStore } from '../../stores/authStore';
import { connectionsApi, type StudentConnection } from '../../api/connections';
import nevoLogo from '../../assets/nevo-logo.png';

export function ParentDashboard() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'guidance'>('overview');
  const [childData, setChildData] = useState<StudentConnection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChildData = async () => {
      try {
        setIsLoading(true);
        // For now, we'll need to get the child ID from the user or connections
        // This is a placeholder - you may need to adjust based on your API
        if (currentUser?.id) {
          // Assuming we can get child data from parent endpoint
          // You may need to adjust this based on your actual API structure
          const children = await connectionsApi.getConnections();
          if (children.length > 0 && children[0].id) {
            const data = await connectionsApi.getChildData(children[0].id);
            setChildData(data);
          }
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load child data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChildData();
  }, [currentUser]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Expanded mock data for 12 children
  const children: StudentConnection[] = [
    { id: '1', name: 'Amara Johnson', email: '', profile: 'Visual Learner', progress: 78, lessonsCompleted: 12, totalLessons: 15, lastActive: '2 hours ago' },
    { id: '2', name: 'David Okafor', email: '', profile: 'Auditory Learner', progress: 65, lessonsCompleted: 10, totalLessons: 16, lastActive: '1 day ago' },
    { id: '3', name: 'Fatima Bello', email: '', profile: 'Kinesthetic Learner', progress: 82, lessonsCompleted: 14, totalLessons: 17, lastActive: '3 hours ago' },
    { id: '4', name: 'Chinedu Eze', email: '', profile: 'Logical Learner', progress: 90, lessonsCompleted: 16, totalLessons: 18, lastActive: '30 min ago' },
    { id: '5', name: 'Ngozi Umeh', email: '', profile: 'Social Learner', progress: 55, lessonsCompleted: 8, totalLessons: 15, lastActive: '2 days ago' },
    { id: '6', name: 'Samuel Adeyemi', email: '', profile: 'Solitary Learner', progress: 70, lessonsCompleted: 11, totalLessons: 15, lastActive: '5 hours ago' },
    { id: '7', name: 'Aisha Musa', email: '', profile: 'Verbal Learner', progress: 60, lessonsCompleted: 9, totalLessons: 14, lastActive: '1 hour ago' },
    { id: '8', name: 'Emeka Obi', email: '', profile: 'Musical Learner', progress: 88, lessonsCompleted: 15, totalLessons: 16, lastActive: '10 min ago' },
    { id: '9', name: 'Blessing Ojo', email: '', profile: 'Naturalistic Learner', progress: 73, lessonsCompleted: 12, totalLessons: 15, lastActive: '4 hours ago' },
    { id: '10', name: 'Tunde Bakare', email: '', profile: 'Intrapersonal Learner', progress: 80, lessonsCompleted: 13, totalLessons: 15, lastActive: 'Yesterday' },
    { id: '11', name: 'Kemi Adebayo', email: '', profile: 'Visual Learner', progress: 77, lessonsCompleted: 12, totalLessons: 15, lastActive: '3 days ago' },
    { id: '12', name: 'Ifeanyi Nwosu', email: '', profile: 'Logical Learner', progress: 85, lessonsCompleted: 14, totalLessons: 16, lastActive: '6 hours ago' },
  ];

  // Pick first child for demo (could randomize or allow selection)
  const displayData: StudentConnection = childData || children[0];

  // Expanded recent lessons for demo
  const recentLessons = [
    { id: '1', title: 'Introduction to Fractions', subject: 'Mathematics', completed: true, date: '2 days ago', score: 92 },
    { id: '2', title: 'The Water Cycle', subject: 'Science', completed: true, date: '3 days ago', score: 88 },
    { id: '3', title: 'Parts of Speech', subject: 'English', completed: false, date: 'In progress', score: null },
    { id: '4', title: 'Decimals & Percentages', subject: 'Mathematics', completed: true, date: '5 days ago', score: 95 },
    { id: '5', title: 'Plant Life Cycles', subject: 'Science', completed: true, date: '6 days ago', score: 90 },
    { id: '6', title: 'Reading Comprehension: Stories', subject: 'English', completed: true, date: '1 week ago', score: 87 },
    { id: '7', title: 'Geometry Basics', subject: 'Mathematics', completed: false, date: 'In progress', score: null },
    { id: '8', title: 'Weather & Climate', subject: 'Science', completed: true, date: '8 days ago', score: 85 },
    { id: '9', title: 'Writing Persuasive Essays', subject: 'English', completed: true, date: '9 days ago', score: 91 },
    { id: '10', title: 'Multiplication Mastery', subject: 'Mathematics', completed: true, date: '10 days ago', score: 89 },
    { id: '11', title: 'Human Body Systems', subject: 'Science', completed: false, date: 'In progress', score: null },
    { id: '12', title: 'Vocabulary Builder', subject: 'English', completed: true, date: '12 days ago', score: 93 },
  ];

  // Expanded strengths and focus areas
  const strengths = [
    'Consistent daily practice',
    'Strong visual comprehension',
    'Excellent retention rate',
    'Self-motivated learner',
    'Quick adaptation to new topics',
    'Active participation in class',
    'Positive attitude towards challenges',
    'Collaborates well with peers',
    'Creative problem solver',
    'Shows leadership in group work',
    'Enjoys hands-on activities',
    'Reads ahead of lessons',
  ];
  const focusAreas = [
    'Continue with visual examples',
    'Encourage breaks every 20 min',
    'Celebrate small wins',
    'Practice word problems in math',
    'Review science concepts weekly',
    'Improve essay writing structure',
    'Ask more questions during lessons',
    'Try group study sessions',
    'Use flashcards for vocabulary',
    'Set short-term learning goals',
    'Balance study and play time',
    'Track progress with charts',
  ];

  // Expanded achievements
  const achievements = [
    { icon: <Trophy className="w-9 h-9 text-[#FBBF24]" />, title: '7 Day Streak', desc: 'Consistent learner' },
    { icon: <Target className="w-9 h-9 text-[#10B981]" />, title: 'Fast Learner', desc: '3 lessons in a day' },
    { icon: <Sparkles className="w-9 h-9 text-[#4F46E5]" />, title: 'Quick Start', desc: 'Completed assessment' },
    { icon: <CheckCircle className="w-9 h-9 text-[#059669]" />, title: 'Math Whiz', desc: 'Top score in fractions' },
    { icon: <Heart className="w-9 h-9 text-[#EA580C]" />, title: 'Science Star', desc: 'Excellent in experiments' },
    { icon: <TrendingUp className="w-9 h-9 text-[#059669]" />, title: 'Progress Champ', desc: 'Improved by 20% this month' },
    { icon: <Clock className="w-9 h-9 text-[#6B7280]" />, title: 'Early Bird', desc: 'Best performance in mornings' },
    { icon: <Sparkles className="w-9 h-9 text-[#4F46E5]" />, title: 'Creative Writer', desc: 'Great essays in English' },
    { icon: <Trophy className="w-9 h-9 text-[#FBBF24]" />, title: 'Team Player', desc: 'Helped classmates succeed' },
    { icon: <CheckCircle className="w-9 h-9 text-[#059669]" />, title: 'Quiz Master', desc: 'High scores in quizzes' },
    { icon: <Heart className="w-9 h-9 text-[#EA580C]" />, title: 'Kindness Award', desc: 'Supportive to peers' },
    { icon: <TrendingUp className="w-9 h-9 text-[#059669]" />, title: 'Growth Mindset', desc: 'Never gives up!' },
  ];

  // Expanded progress by subject
  const subjectProgress = [
    { subject: 'Mathematics', percent: 75 },
    { subject: 'English', percent: 60 },
    { subject: 'Science', percent: 85 },
    { subject: 'Social Studies', percent: 70 },
    { subject: 'Art', percent: 90 },
    { subject: 'ICT', percent: 65 },
    { subject: 'Physical Education', percent: 80 },
    { subject: 'Music', percent: 88 },
    { subject: 'French', percent: 55 },
    { subject: 'Home Economics', percent: 78 },
    { subject: 'Civic Education', percent: 82 },
    { subject: 'Health Science', percent: 74 },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#4F46E5] animate-spin mx-auto mb-4" />
          <p className="text-[#6B7280]">Loading dashboard...</p>
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
            <div className="flex items-center gap-3">
              <img src={nevoLogo} alt="Nevo" className="w-8 h-8" />
              <span className="font-poppins text-[#111827] text-2xl font-bold">Nevo</span>
              <span className="px-2 py-1 bg-[#FFF7ED] text-[#EA580C] rounded-md text-sm">Parent</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'overview' ? 'text-[#4F46E5]' : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'progress' ? 'text-[#4F46E5]' : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                Progress & Achievements
              </button>
              <button
                onClick={() => setActiveTab('guidance')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'guidance' ? 'text-[#4F46E5]' : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                AI Guidance
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
        <div className="mb-12">
          <h1 className="mb-2">Welcome, {currentUser?.fullName?.split(' ')[0] || 'Parent'}!</h1>
          <p className="text-[#6B7280] text-lg">Track {displayData.name}'s learning journey</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="p-8 border border-[#E5E7EB] rounded-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-xl bg-[#F3F4F6] flex items-center justify-center text-[#4F46E5] text-3xl font-bold">
                    {displayData.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="mb-2">{displayData.name}</h2>
                    <span className="px-3 py-1 bg-[#F3F4F6] text-[#6B7280] rounded-full text-sm">{displayData.profile || 'Student'}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E5E7EB]">
                  <div>
                    <p className="text-[#6B7280] mb-1">Lessons</p>
                    <p className="text-3xl font-bold text-[#111827]">
                      {displayData.lessonsCompleted}/{displayData.totalLessons}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#6B7280] mb-1">Streak</p>
                    <p className="text-3xl font-bold text-[#111827]">7 days</p>
                  </div>
                  <div>
                    <p className="text-[#6B7280] mb-1">Total XP</p>
                    <p className="text-3xl font-bold text-[#111827]">215</p>
                  </div>
                </div>
              </div>

              <div className="p-8 border border-[#E5E7EB] rounded-2xl">
                <h2 className="mb-6">Overall Progress</h2>
                <div className="mb-6">
                  <div className="flex justify-between mb-3">
                    <span className="text-[#6B7280]">Learning Journey</span>
                    <span className="text-[#111827]">{displayData.progress}%</span>
                  </div>
                  <Progress value={displayData.progress} className="h-3" />
                </div>
                <p className="text-[#6B7280] leading-relaxed">
                  {displayData.name} is doing great! They've completed {displayData.lessonsCompleted} lessons.
                </p>
              </div>

              <div className="p-8 border border-[#E5E7EB] rounded-2xl">
                <h2 className="mb-6">Recent Lessons</h2>
                <div className="space-y-4">
                  {recentLessons.map((lesson) => (
                    <div key={lesson.id} className="p-6 border border-[#E5E7EB] rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="inline-block px-3 py-1 bg-[#F3F4F6] text-[#6B7280] rounded-full text-sm">
                              {lesson.subject}
                            </span>
                            {lesson.completed && (
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#ECFDF5] text-[#059669] rounded-full text-sm">
                                <CheckCircle className="w-3 h-3" />
                                Completed
                              </span>
                            )}
                          </div>
                          <h3 className="mb-2">{lesson.title}</h3>
                          <div className="flex items-center gap-4">
                            <span className="text-[#6B7280] text-sm flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {lesson.date}
                            </span>
                            {lesson.score && (
                              <span className="text-[#059669] text-sm">
                                Score: {lesson.score}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 border border-[#D1FAE5] bg-[#F0FDF4] rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-5 h-5 text-[#059669]" />
                  <h3>Key Strengths</h3>
                </div>
                <ul className="text-[#6B7280] space-y-2">
                  {strengths.map((strength, index) => (
                    <li key={index}>• {strength}</li>
                  ))}
                </ul>
              </div>

              <div className="p-6 border border-[#FED7AA] bg-[#FFF7ED] rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-[#EA580C]" />
                  <h3>Focus Areas</h3>
                </div>
                <ul className="text-[#6B7280] space-y-2">
                  {focusAreas.map((area, index) => (
                    <li key={index}>• {area}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Progress & Achievements Tab */}
        {activeTab === 'progress' && (
          <div className="max-w-4xl">
            <div className="p-8 border border-[#E5E7EB] rounded-2xl mb-8">
              <h2 className="mb-8">Achievements & Milestones</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-xl border-2 border-[#FBBF24] flex items-center justify-center">
                      {achievement.icon}
                    </div>
                    <h3 className="mb-2">{achievement.title}</h3>
                    <p className="text-[#6B7280] text-sm">{achievement.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 border border-[#E5E7EB] rounded-2xl">
              <h2 className="mb-8">Progress by Subject</h2>
              <div className="space-y-6">
                {subjectProgress.map((subject, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-3">
                      <span className="text-[#111827]">{subject.subject}</span>
                      <span className="text-[#6B7280]">{subject.percent}%</span>
                    </div>
                    <Progress value={subject.percent} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Guidance Tab */}
        {activeTab === 'guidance' && (
          <div className="max-w-4xl space-y-6">
            <div className="p-8 border border-[#E0E7FF] bg-[#F5F7FF] rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl border-2 border-[#4F46E5] flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-[#4F46E5]" />
                </div>
                <div>
                  <h2 className="mb-3">Personalized Guidance for {displayData.name}</h2>
                  <p className="text-[#6B7280] leading-relaxed mb-4">
                    Based on {displayData.name}'s learning profile as a {displayData.profile || 'Student'}, here are some recommendations to support their learning journey:
                  </p>
                  <ul className="space-y-3 text-[#6B7280]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#4F46E5] mt-1">•</span>
                      <span>Use diagrams, charts, and visual aids when explaining concepts at home</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#4F46E5] mt-1">•</span>
                      <span>Encourage them to draw or sketch ideas while learning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#4F46E5] mt-1">•</span>
                      <span>Watch educational videos together to reinforce lessons</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-8 border border-[#D1FAE5] bg-[#F0FDF4] rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl border-2 border-[#059669] flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-[#059669]" />
                </div>
                <div>
                  <h2 className="mb-3">Optimal Learning Times</h2>
                  <p className="text-[#6B7280] leading-relaxed">
                    Based on recent activity patterns, {displayData.name} performs best during morning sessions (9-11 AM) and early afternoon (2-4 PM).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
