import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, ArrowRight, ArrowLeft, CheckCircle, Sparkles, Eye, Book, Target, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { useAuthStore } from '../../stores/authStore';
import { lessonsApi, type LessonContent } from '../../api/lessons';

export function LessonView() {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const { assessmentData } = useAuthStore();
  const [lesson, setLesson] = useState<LessonContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);

  useEffect(() => {
    // MOCK DATA: Replace API call with detailed, realistic mock lesson
    setIsLoading(true);
    setTimeout(() => {
      if (!lessonId) {
        setError('Lesson ID is required');
        setIsLoading(false);
        return;
      }
      // Voluminous, wordy lesson content
      setLesson({
        id: lessonId,
        title: 'Introduction to Fractions',
        subject: 'Mathematics',
        profile: 'adhd',
        xpReward: 50,
        slides: [
          {
            type: 'intro',
            title: 'Welcome to Fractions!',
            content: 'Fractions are a way to represent parts of a whole. In this lesson, you will learn what fractions are, how to read them, and how to use them in everyday life. Imagine sharing a pizza with friends—fractions help you figure out how much each person gets! Let’s dive in and explore the world of fractions together with fun examples and interactive activities.',
          },
          {
            type: 'visual',
            title: 'Visualizing Fractions',
            content: 'Look at the pizza below. If you cut it into 8 slices and eat 3, you have eaten 3/8 of the pizza. Visuals like this help you understand fractions better. Try drawing your own pizza and shade the slices you would eat!',
            visual: 'pizza-diagram.png',
          },
          {
            type: 'content',
            title: 'Reading Fractions',
            content: 'A fraction has two numbers: the top (numerator) and the bottom (denominator). The numerator tells you how many parts you have, and the denominator tells you how many parts make up the whole. For example, 3/4 means 3 out of 4 equal parts. Practice reading fractions with objects around you—books, pencils, or even pieces of fruit.',
          },
          {
            type: 'interactive',
            title: 'Quiz Time!',
            content: 'Which of these is the correct way to write "five out of eight" as a fraction?',
            question: {
              text: 'Choose the correct fraction:',
              options: ['5/8', '8/5', '3/8', '8/3'],
              correct: 0,
              explanation: '5/8 means five out of eight parts. The numerator is 5, the denominator is 8.',
            },
          },
          {
            type: 'summary',
            title: 'Summary & Next Steps',
            content: 'Great job! You now know what fractions are and how to read them. Next, you’ll learn how to add and subtract fractions in real-life scenarios. Remember, fractions are everywhere—from recipes to sports scores. Keep practicing and you’ll master them in no time!',
          },
          // Add 10+ more slides with detailed, wordy content, visuals, and quizzes
        ],
      });
      setIsLoading(false);
    }, 800);
  }, [lessonId]);

  // Get user profile from store
  const profile = assessmentData?.profile || 'visual-learner';
  const hasSlides = lesson?.slides && Array.isArray(lesson.slides) && lesson.slides.length > 0;
  const slide = hasSlides ? lesson.slides[currentSlide] : null;
  const progress = hasSlides ? ((currentSlide + 1) / lesson.slides.length) * 100 : 0;

  const handleNext = async () => {
    if (!lesson) return;

    if (currentSlide < lesson.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Lesson complete
      try {
        await lessonsApi.completeLesson(lesson.id, score);
        navigate('/student/dashboard');
      } catch (err: any) {
        setError(err.message || 'Failed to complete lesson');
      }
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null || !slide?.question) return;
    setShowFeedback(true);
    if (selectedAnswer === slide.question.correct) {
      setScore(score + 1);
      setXpEarned(xpEarned + 10);
    }
  };

  const getProfileIcon = () => {
    switch (profile) {
      case 'adhd': return <Target className="w-5 h-5" />;
      case 'visual-learner': return <Eye className="w-5 h-5" />;
      case 'autism': return <Book className="w-5 h-5" />;
      case 'dyslexia': return <Sparkles className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  const getProfileLabel = () => {
    const labels: Record<string, string> = {
      'adhd': 'Active Learner',
      'visual-learner': 'Visual Learner',
      'autism': 'Structured Learner',
      'dyslexia': 'Visual Learner',
      'typical': 'Balanced Learner'
    };
    return labels[profile] || 'Learner';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#4F46E5] animate-spin mx-auto mb-4" />
          <p className="text-[#6B7280]">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] to-white flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-[#111827] mb-2">Error Loading Lesson</h2>
          <p className="text-[#6B7280] mb-6">{error || 'Lesson not found'}</p>
          <Button onClick={() => navigate('/student/dashboard')} className="bg-[#4F46E5] text-white">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (!hasSlides) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] to-white flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <Book className="w-12 h-12 text-[#4F46E5] mx-auto mb-4" />
          <h2 className="text-[#111827] mb-2">No Slides Available</h2>
          <p className="text-[#6B7280] mb-6">This lesson does not have any slides yet.</p>
          <Button onClick={() => navigate('/student/dashboard')} className="bg-[#4F46E5] text-white">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/student/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-[#6B7280]" />
              </button>
              <div>
                <h2 className="text-[#111827]">{lesson.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-1 bg-[#F3F4F6] text-[#6B7280] rounded-md text-sm">
                    {lesson.subject}
                  </span>
                  <span className="px-2 py-1 bg-[#F0F4FF] text-[#4F46E5] rounded-md text-sm flex items-center gap-1">
                    {getProfileIcon()}
                    {getProfileLabel()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-[#6B7280]">Progress</p>
                <p className="font-semibold text-[#111827]">{currentSlide + 1}/{lesson.slides.length}</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12 shadow-sm"
            >
              {/* Break Suggestion */}
              {slide?.breakSuggestion && (
                <div className="mb-8 p-6 bg-gradient-to-r from-[#ECFDF5] to-[#D1FAE5] rounded-2xl border border-[#10B981]/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#10B981] rounded-xl flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-[#059669]">Time for a Break!</h3>
                  </div>
                </div>
              )}

              {/* Slide Title */}
              {slide?.title && (
                <h2 className="text-[#111827] mb-6">{slide.title}</h2>
              )}

              {/* Slide Content */}
              {slide && (
                <>
                  <div className="text-[#374151] text-lg leading-relaxed mb-8 whitespace-pre-line">
                    {slide.content}
                  </div>

                  {/* Visual Content */}
                  {slide.visual && (
                    <div className="mb-8 p-6 bg-[#F9FAFB] rounded-2xl border border-gray-200">
                      <pre className="text-2xl leading-loose font-mono text-center">
                        {slide.visual}
                      </pre>
                    </div>
                  )}

                  {/* Interactive Question */}
                  {slide.question && (
                    <div className="space-y-4">
                      <div className="p-6 bg-[#F0F4FF] rounded-2xl border border-[#4F46E5]/20 mb-6">
                        <p className="text-lg text-[#111827]">{slide.question.text}</p>
                      </div>

                      <div className="grid gap-3">
                        {slide.question.options.map((option, index) => (
                          <button title="Go to next slide"
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={showFeedback}
                            className={`p-4 rounded-xl border-2 text-left transition-all ${
                              selectedAnswer === index
                                ? showFeedback
                                  ? index === slide.question!.correct
                                    ? 'border-[#10B981] bg-[#ECFDF5]'
                                    : 'border-[#EF4444] bg-[#FEF2F2]'
                                  : 'border-[#4F46E5] bg-[#F0F4FF]'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                selectedAnswer === index
                                  ? showFeedback && index === slide.question!.correct
                                    ? 'border-[#10B981] bg-[#10B981]'
                                    : selectedAnswer === index
                                    ? 'border-[#4F46E5] bg-[#4F46E5]'
                                    : 'border-gray-300'
                                  : 'border-gray-300'
                              }`}>
                                {showFeedback && index === slide.question!.correct && (
                                  <CheckCircle className="w-4 h-4 text-white" />
                                )}
                              </div>
                              <span className="text-[#111827]">{option}</span>
                            </div>
                          </button>
                        ))}
                      </div>

                      {!showFeedback && selectedAnswer !== null && (
                        <Button
                          onClick={handleCheckAnswer}
                          className="w-full bg-[#4F46E5] text-white hover:bg-[#4338CA] h-12 rounded-xl mt-4"
                        >
                          Check Answer
                        </Button>
                      )}

                      {showFeedback && slide.question.explanation && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-6 rounded-2xl mt-6 ${
                            selectedAnswer === slide.question.correct
                              ? 'bg-[#ECFDF5] border border-[#10B981]/20'
                              : 'bg-[#FEF2F2] border border-[#EF4444]/20'
                          }`}
                        >
                          <p className={`${
                            selectedAnswer === slide.question.correct
                              ? 'text-[#059669]'
                              : 'text-[#DC2626]'
                          }`}>
                            {slide.question.explanation}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-100">
                    <Button
                      onClick={handlePrevious}
                      disabled={currentSlide === 0}
                      variant="ghost"
                      className="text-[#6B7280] hover:text-[#111827]"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>

                    <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <Target className="w-4 h-4 text-[#FBBF24]" />
                      <span>+{xpEarned} XP earned</span>
                    </div>

                    <Button
                      onClick={handleNext}
                      disabled={slide.question && !showFeedback}
                      className="bg-[#4F46E5] text-white hover:bg-[#4338CA]"
                    >
                      {currentSlide === lesson.slides.length - 1 ? 'Complete Lesson' : 'Next'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
