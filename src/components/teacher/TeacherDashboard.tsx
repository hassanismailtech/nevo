import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Users, BarChart3, LogOut, BookOpen, CheckCircle, Clock, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { AddConnections } from '../AddConnections';
import { MobileNavbar } from '../ui/MobileNavbar';
import { useAuthStore } from '../../stores/authStore';
import { connectionsApi, type StudentConnection } from '../../api/connections';
import { lessonsApi } from '../../api/lessons';
import nevoLogo from '../../assets/nevo-logo.png';

export function TeacherDashboard() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'upload' | 'insights' | 'students'>('overview');
  const [students, setStudents] = useState<StudentConnection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonSubject, setLessonSubject] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [slides, setSlides] = useState([{ title: '', content: '' }]);
  const [uploading, setUploading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentConnection | null>(null);
  const [encouragements, setEncouragements] = useState<{[id: string]: string[]}>({});
  const [leaderboardTab, setLeaderboardTab] = useState(false);
  // --- Improved Student Details Modal State ---
  const [detailsTab, setDetailsTab] = useState<'progress' | 'lessons' | 'encouragements' | 'profile'>('progress');
  const [showEncModal, setShowEncModal] = useState(false);
  const [encMessage, setEncMessage] = useState('');
  const [encSuccess, setEncSuccess] = useState(false);

  useEffect(() => {
    // MOCK DATA: Replace API calls with detailed, realistic mock data
    if (activeTab === 'overview' || activeTab === 'insights' || activeTab === 'students') {
      setIsLoading(true);
      setTimeout(() => {
        let localStudents = localStorage.getItem('teacher_students');
        let studentsData = localStudents ? JSON.parse(localStudents) : [
          {
            id: 'stu-001',
            name: 'Amina Yusuf',
            email: 'amina.yusuf@school.edu',
            profile: 'Visual Learner, ADHD',
            progress: 92,
            lessonsCompleted: 18,
            totalLessons: 20,
            lastActive: '2025-11-19 14:32',
          },
          {
            id: 'stu-002',
            name: 'Chinedu Okafor',
            email: 'chinedu.okafor@school.edu',
            profile: 'Structured Learner, Autism',
            progress: 85,
            lessonsCompleted: 17,
            totalLessons: 20,
            lastActive: '2025-11-19 09:15',
          },
          {
            id: 'stu-003',
            name: 'Fatima Bello',
            email: 'fatima.bello@school.edu',
            profile: 'Auditory Learner',
            progress: 78,
            lessonsCompleted: 15,
            totalLessons: 20,
            lastActive: '2025-11-18 17:50',
          },
          {
            id: 'stu-004',
            name: 'Emeka Nwosu',
            email: 'emeka.nwosu@school.edu',
            profile: 'Kinesthetic Learner',
            progress: 60,
            lessonsCompleted: 12,
            totalLessons: 20,
            lastActive: '2025-11-18 12:10',
          },
          {
            id: 'stu-005',
            name: 'Ngozi Uche',
            email: 'ngozi.uche@school.edu',
            profile: 'Visual Learner',
            progress: 88,
            lessonsCompleted: 16,
            totalLessons: 20,
            lastActive: '2025-11-17 16:45',
          },
          {
            id: 'stu-006',
            name: 'Bola Adebayo',
            email: 'bola.adebayo@school.edu',
            profile: 'Auditory Learner, ADHD',
            progress: 75,
            lessonsCompleted: 14,
            totalLessons: 20,
            lastActive: '2025-11-17 10:20',
          },
          {
            id: 'stu-007',
            name: 'Ifeanyi Eze',
            email: 'ifeanyi.eze@school.edu',
            profile: 'Structured Learner',
            progress: 90,
            lessonsCompleted: 18,
            totalLessons: 20,
            lastActive: '2025-11-16 13:05',
          },
          {
            id: 'stu-008',
            name: 'Maryam Sani',
            email: 'maryam.sani@school.edu',
            profile: 'Kinesthetic Learner, Autism',
            progress: 82,
            lessonsCompleted: 15,
            totalLessons: 20,
            lastActive: '2025-11-16 08:30',
          },
          {
            id: 'stu-009',
            name: 'Samuel Johnson',
            email: 'samuel.johnson@school.edu',
            profile: 'Visual Learner',
            progress: 95,
            lessonsCompleted: 19,
            totalLessons: 20,
            lastActive: '2025-11-15 18:10',
          },
          {
            id: 'stu-010',
            name: 'Blessing Okoro',
            email: 'blessing.okoro@school.edu',
            profile: 'Auditory Learner',
            progress: 70,
            lessonsCompleted: 13,
            totalLessons: 20,
            lastActive: '2025-11-15 11:55',
          },
          {
            id: 'stu-011',
            name: 'Tunde Balogun',
            email: 'tunde.balogun@school.edu',
            profile: 'Structured Learner, ADHD',
            progress: 80,
            lessonsCompleted: 16,
            totalLessons: 20,
            lastActive: '2025-11-14 15:40',
          },
          {
            id: 'stu-012',
            name: 'Zainab Musa',
            email: 'zainab.musa@school.edu',
            profile: 'Kinesthetic Learner',
            progress: 77,
            lessonsCompleted: 14,
            totalLessons: 20,
            lastActive: '2025-11-14 09:25',
          },
        ];
        setStudents(studentsData);
        setIsLoading(false);
      }, 800);
    }
  }, [activeTab]);

  // Save students to localStorage on change
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('teacher_students', JSON.stringify(students));
    }
  }, [students]);

  // Load encouragements from localStorage
  useEffect(() => {
    const data = localStorage.getItem('student_encouragements');
    if (data) setEncouragements(JSON.parse(data));
  }, []);
  // Save encouragements to localStorage
  useEffect(() => {
    localStorage.setItem('student_encouragements', JSON.stringify(encouragements));
  }, [encouragements]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleUploadLesson = async () => {
    if (!lessonTitle || !lessonSubject || !lessonContent || slides.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      await lessonsApi.uploadLesson({
        title: lessonTitle,
        subject: lessonSubject,
        content: lessonContent,
        // @ts-ignore: slides is supported by backend
        slides: slides.filter(s => s.title && s.content),
      });
      setLessonTitle('');
      setLessonSubject('');
      setLessonContent('');
      setSlides([{ title: '', content: '' }]);
      alert('Lesson with slides uploaded and personalized for all students!');
    } catch (err: any) {
      setError(err.message || 'Failed to upload lesson');
    } finally {
      setUploading(false);
    }
  };

  // Handler to send encouragement (improved)
  const sendEncouragement = (studentId: string, message: string) => {
    setEncouragements(prev => {
      const updated = { ...prev };
      if (!updated[studentId]) updated[studentId] = [];
      updated[studentId].push(message);
      return updated;
    });
    setEncSuccess(true);
    setTimeout(() => setEncSuccess(false), 2000);
  };

  const downloadReport = () => {
    const csv = [
      'Name,Email,Profile,Progress,Lessons Completed,Total Lessons,Last Active',
      ...students.map(s => `${s.name},${s.email},${s.profile},${s.progress},${s.lessonsCompleted},${s.totalLessons},${s.lastActive}`)
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'class_report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const avgProgress = students.length > 0
    ? Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)
    : 0;

  const topStudents = [...students].sort((a, b) => b.progress - a.progress).slice(0, 5);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={nevoLogo} alt="Nevo" className="w-8 h-8" />
              <span className="font-poppins text-[#111827] text-2xl font-bold">Nevo</span>
              <span className="px-2 py-1 bg-[#ECFDF5] text-[#059669] rounded-md text-sm">Teacher</span>
            </div>
            
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('students')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === 'students' ? 'text-[#4F46E5]' : 'text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  Manage Students
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
          <h1 className="mb-2">Welcome, {currentUser?.name?.split(' ')[0] || 'Teacher'}!</h1>
          <p className="text-[#6B7280] text-lg">Manage your class and create personalized lessons</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Class Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-[#4F46E5] animate-spin" />
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="p-6 border border-[#E5E7EB] rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[#6B7280]">Total Students</h3>
                      <Users className="w-5 h-5 text-[#4F46E5]" />
                    </div>
                    <p className="text-4xl font-bold text-[#111827]">{students.length}</p>
                  </div>
                  <div className="p-6 border border-[#E5E7EB] rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[#6B7280]">Avg Progress</h3>
                      <BarChart3 className="w-5 h-5 text-[#10B981]" />
                    </div>
                    <p className="text-4xl font-bold text-[#111827]">{avgProgress}%</p>
                  </div>
                  <div className="p-6 border border-[#E5E7EB] rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[#6B7280]">Active Lessons</h3>
                      <BookOpen className="w-5 h-5 text-[#FBBF24]" />
                    </div>
                    <p className="text-4xl font-bold text-[#111827]">15</p>
                  </div>
                  <div className="p-6 border border-[#E5E7EB] rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[#6B7280]">Completion Rate</h3>
                      <CheckCircle className="w-5 h-5 text-[#F97316]" />
                    </div>
                    <p className="text-4xl font-bold text-[#111827]">73%</p>
                  </div>
                </div>

                <div className="p-8 border border-[#E5E7EB] rounded-2xl">
                  <h2 className="mb-8">Your Students</h2>
                  {students.length > 0 ? (
                    <div className="space-y-4">
                      {students.map((student) => (
                        <div key={student.id} className="p-6 border border-[#E5E7EB] rounded-xl hover:border-[#4F46E5] transition-all">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-[#F3F4F6] flex items-center justify-center text-[#4F46E5] font-bold">
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <h3>{student.name}</h3>
                                <p className="text-[#6B7280]">{student.profile || 'Student'}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-8">
                              <div className="text-center">
                                <p className="text-[#6B7280] text-sm mb-1">Lessons</p>
                                <p className="text-[#111827]">{student.lessonsCompleted}/{student.totalLessons}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-[#6B7280] text-sm mb-1">Last Active</p>
                                <p className="text-[#111827]">{student.lastActive}</p>
                              </div>
                              <div className="w-40">
                                <div className="flex justify-between mb-2">
                                  <span className="text-[#6B7280] text-sm">Progress</span>
                                  <span className="text-[#111827] text-sm">{student.progress}%</span>
                                </div>
                                <Progress value={student.progress} className="h-2" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-[#6B7280]">No students yet. Add students to get started!</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Upload Lesson Tab */}
        {activeTab === 'upload' && (
          <div className="max-w-3xl">
            <div className="p-8 border border-[#E5E7EB] rounded-2xl">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl border-2 border-[#4F46E5] flex items-center justify-center flex-shrink-0">
                  <Upload className="w-6 h-6 text-[#4F46E5]" />
                </div>
                <div>
                  <h2 className="mb-1">Upload New Lesson</h2>
                  <p className="text-[#6B7280]">AI will personalize this lesson for each student</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="lessonTitle" className="text-[#111827]">Lesson Title</Label>
                  <Input
                    id="lessonTitle"
                    placeholder="e.g., Introduction to Fractions"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    className="h-12 border-[#E5E7EB] rounded-xl"
                    disabled={uploading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-[#111827]">Subject</Label>
                  <select
                    id="subject"
                    title="Subject"
                    aria-label="Subject"
                    className="w-full h-12 px-4 rounded-xl border border-[#E5E7EB] bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent disabled:opacity-50"
                    value={lessonSubject}
                    onChange={(e) => setLessonSubject(e.target.value)}
                    disabled={uploading}
                  >
                    <option value="">Select subject</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="english">English</option>
                    <option value="science">Science</option>
                    <option value="history">History</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className="text-[#111827]">Lesson Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Enter the main lesson content here. The AI will adapt it to each student's learning profile..."
                    rows={10}
                    value={lessonContent}
                    onChange={(e) => setLessonContent(e.target.value)}
                    className="border-[#E5E7EB] rounded-xl"
                    disabled={uploading}
                  />
                </div>

                {/* Slides Input */}
                <div className="space-y-2">
                  <Label className="text-[#111827]">Slides</Label>
                  {slides.map((slide, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <Input
                        placeholder={`Slide ${idx + 1} Title`}
                        value={slide.title}
                        onChange={e => {
                          const newSlides = [...slides];
                          newSlides[idx].title = e.target.value;
                          setSlides(newSlides);
                        }}
                        className="w-1/3"
                        disabled={uploading}
                      />
                      <Textarea
                        placeholder={`Slide ${idx + 1} Content`}
                        value={slide.content}
                        onChange={e => {
                          const newSlides = [...slides];
                          newSlides[idx].content = e.target.value;
                          setSlides(newSlides);
                        }}
                        className="w-2/3"
                        disabled={uploading}
                      />
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setSlides(slides.filter((_, i) => i !== idx));
                        }}
                        disabled={slides.length === 1 || uploading}
                      >Remove</Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => setSlides([...slides, { title: '', content: '' }])}
                    disabled={uploading}
                  >Add Slide</Button>
                </div>

                <div className="p-6 border border-[#E0E7FF] bg-[#F5F7FF] rounded-2xl">
                  <h3 className="mb-3">How AI Personalization Works</h3>
                  <ul className="space-y-2 text-[#6B7280]">
                    <li>• Adjusts content length and complexity based on each student's profile</li>
                    <li>• Breaks lessons into appropriate segments for attention span</li>
                    <li>• Adds visual aids for visual learners, audio for auditory learners</li>
                    <li>• Provides step-by-step instructions for structured learners</li>
                    <li>• Suggests optimal pacing and break times</li>
                  </ul>
                </div>

                <Button
                  onClick={handleUploadLesson}
                  disabled={!lessonTitle || !lessonSubject || !lessonContent || slides.length === 0 || uploading}
                  className="w-full bg-[#4F46E5] text-white hover:bg-[#4338CA] h-12 rounded-xl disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      AI is Personalizing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload & Personalize Lesson
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Student Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-[#4F46E5] animate-spin" />
              </div>
            ) : (
              <div className="p-8 border border-[#E5E7EB] rounded-2xl">
                <h2 className="mb-8">Student Insights & Recommendations</h2>
                
                {students.length > 0 ? (
                  <div className="space-y-6">
                    {students.map((student) => (
                      <div key={student.id} className="p-6 border border-[#E5E7EB] rounded-xl">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#F3F4F6] flex items-center justify-center text-[#4F46E5] font-bold">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h3 className="mb-1">{student.name}</h3>
                              <span className="px-3 py-1 bg-[#F3F4F6] text-[#6B7280] rounded-full text-sm">{student.profile || 'Student'}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[#6B7280] text-sm mb-1">Overall Progress</p>
                            <p className="text-3xl font-bold text-[#111827]">{student.progress}%</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 border border-[#D1FAE5] bg-[#F0FDF4] rounded-xl">
                            <div className="flex items-center gap-2 mb-3">
                              <CheckCircle className="w-5 h-5 text-[#059669]" />
                              <h3>Strengths</h3>
                            </div>
                            <ul className="text-[#6B7280] space-y-2">
                              <li>• Consistent engagement</li>
                              <li>• Strong in visual content</li>
                              <li>• Quick lesson completion</li>
                            </ul>
                          </div>

                          <div className="p-4 border border-[#FED7AA] bg-[#FFF7ED] rounded-xl">
                            <div className="flex items-center gap-2 mb-3">
                              <AlertCircle className="w-5 h-5 text-[#EA580C]" />
                              <h3>Recommendations</h3>
                            </div>
                            <ul className="text-[#6B7280] space-y-2">
                              <li>• Add more interactive elements</li>
                              <li>• Consider shorter lesson segments</li>
                              <li>• Increase visual examples</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-[#6B7280]">No students yet. Add students to see insights!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Manage Students Tab */}
        {activeTab === 'students' && (
          <div className="space-y-8">
            <AddConnections userRole="teacher" />
            
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-[#4F46E5] animate-spin" />
              </div>
            ) : (
              <div className="p-8 border border-[#E5E7EB] rounded-2xl">
                <h2 className="mb-8">Your Students</h2>
                <Button onClick={downloadReport} className="mb-4 px-4 py-2 bg-[#4F46E5] text-white rounded-xl">
                  Download Class Report (CSV)
                </Button>
                {students.length > 0 ? (
                  <div className="space-y-4">
                    {students.map((student) => (
                      <div key={student.id} className="p-6 border border-[#E5E7EB] rounded-xl hover:border-[#4F46E5] transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#F3F4F6] flex items-center justify-center text-[#4F46E5] font-bold">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h3>{student.name}</h3>
                              <p className="text-[#6B7280]">{student.profile || 'Student'}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-8">
                            <div className="text-center">
                              <p className="text-[#6B7280] text-sm mb-1">Lessons</p>
                              <p className="text-[#111827]">{student.lessonsCompleted}/{student.totalLessons}</p>
                            </div>
                            <div className="w-40">
                              <div className="flex justify-between mb-2">
                                <span className="text-[#6B7280] text-sm">Progress</span>
                                <span className="text-[#111827] text-sm">{student.progress}%</span>
                              </div>
                              <Progress value={student.progress} className="h-2" />
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <button onClick={() => setSelectedStudent(student)} className="text-[#4F46E5] underline">View Details</button>
                          <button onClick={() => { setSelectedStudent(student); setShowEncModal(true); }} className="ml-2 text-[#059669] underline">Send Encouragement</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-[#6B7280]">No students yet. Add students to get started!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Leaderboard Tab */}
        {leaderboardTab && (
          <div className="p-8 border border-[#E5E7EB] rounded-2xl my-8">
            <h2 className="mb-6">Class Leaderboard</h2>
            <ol className="space-y-4">
              {topStudents.map((s, i) => (
                <li key={s.id} className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-[#4F46E5]">#{i+1}</span>
                  <span className="font-semibold">{s.name}</span>
                  <span className="ml-auto text-[#10B981]">{s.progress}%</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Student Details Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl max-w-2xl w-full relative shadow-xl">
              <button onClick={() => setSelectedStudent(null)} className="absolute top-2 right-2 text-[#6B7280]">Close</button>
              <h2 className="mb-4 text-2xl font-bold">{selectedStudent.name}'s Details</h2>
              <div className="flex gap-4 mb-6">
                <button onClick={() => setDetailsTab('progress')} className={`px-3 py-1 rounded ${detailsTab==='progress'?'bg-[#4F46E5] text-white':'bg-[#F3F4F6] text-[#4F46E5]'}`}>Progress</button>
                <button onClick={() => setDetailsTab('lessons')} className={`px-3 py-1 rounded ${detailsTab==='lessons'?'bg-[#4F46E5] text-white':'bg-[#F3F4F6] text-[#4F46E5]'}`}>Lessons</button>
                <button onClick={() => setDetailsTab('encouragements')} className={`px-3 py-1 rounded ${detailsTab==='encouragements'?'bg-[#4F46E5] text-white':'bg-[#F3F4F6] text-[#4F46E5]'}`}>Encouragements</button>
                <button onClick={() => setDetailsTab('profile')} className={`px-3 py-1 rounded ${detailsTab==='profile'?'bg-[#4F46E5] text-white':'bg-[#F3F4F6] text-[#4F46E5]'}`}>Profile</button>
              </div>
              {detailsTab === 'progress' && (
                <div>
                  <h3 className="mb-2 font-semibold">Progress Overview</h3>
                  <div className="mb-4">
                    <span className="text-[#4F46E5] font-bold text-3xl">{selectedStudent.progress}%</span> overall
                  </div>
                  <div className="mb-4">
                    <div className="h-4 bg-[#E5E7EB] rounded-full overflow-hidden">
                      <div className="h-4 bg-[#4F46E5]" style={{ width: `${selectedStudent.progress}%` }}></div>
                    </div>
                  </div>
                  <p className="text-[#6B7280]">{selectedStudent.name} has completed <b>{selectedStudent.lessonsCompleted}</b> out of <b>{selectedStudent.totalLessons}</b> lessons. Keep encouraging them to reach 100%!</p>
                </div>
              )}
              {detailsTab === 'lessons' && (
                <div>
                  <h3 className="mb-2 font-semibold">Lesson History</h3>
                  <ul className="list-disc ml-6">
                    {/* Replace with real or mock lesson data */}
                    <li>Introduction to Fractions - Completed</li>
                    <li>Geometry Basics - In Progress</li>
                    <li>Plant Life Cycles - Completed</li>
                    <li>Reading Comprehension - In Progress</li>
                    <li>Decimals & Percentages - Completed</li>
                  </ul>
                </div>
              )}
              {detailsTab === 'encouragements' && (
                <div>
                  <h3 className="mb-2 font-semibold">Encouragements</h3>
                  <ul className="list-disc ml-6 text-[#059669]">
                    {(encouragements[selectedStudent.id] || []).map((msg, idx) => (
                      <li key={idx}>{msg}</li>
                    ))}
                  </ul>
                  <button onClick={() => setShowEncModal(true)} className="mt-4 px-4 py-2 bg-[#4F46E5] text-white rounded">Send New Encouragement</button>
                </div>
              )}
              {detailsTab === 'profile' && (
                <div>
                  <h3 className="mb-2 font-semibold">Profile</h3>
                  <p><b>Name:</b> {selectedStudent.name}</p>
                  <p><b>Email:</b> {selectedStudent.email}</p>
                  <p><b>Profile:</b> {selectedStudent.profile}</p>
                  <p><b>Last Active:</b> {selectedStudent.lastActive}</p>
                </div>
              )}
            </div>
            {/* Encouragement Modal */}
            {showEncModal && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl max-w-md w-full relative">
                  <button onClick={() => setShowEncModal(false)} className="absolute top-2 right-2 text-[#6B7280]">Close</button>
                  <h3 className="mb-4 font-bold">Send Encouragement to {selectedStudent.name}</h3>
                  <textarea value={encMessage} onChange={e => setEncMessage(e.target.value)} className="w-full border rounded p-2 mb-4" rows={4} placeholder="Type your encouragement..." />
                  <button onClick={() => { sendEncouragement(selectedStudent.id, encMessage); setEncMessage(''); setShowEncModal(false); }} className="px-4 py-2 bg-[#059669] text-white rounded">Send</button>
                  {encSuccess && <div className="mt-2 text-[#059669]">Encouragement sent!</div>}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Mobile Navbar */}
      <MobileNavbar role="teacher" />
    </div>
  );
}
