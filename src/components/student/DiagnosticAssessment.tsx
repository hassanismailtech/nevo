import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { useAuthStore } from '../../stores/authStore';
import { assessmentApi, type AssessmentQuestion } from '../../api/assessment';
import nevoLogo from '../../assets/nevo-logo.png';

export function DiagnosticAssessment() {
  const navigate = useNavigate();
  const { setAssessmentData } = useAuthStore();
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const fetchedQuestions = await assessmentApi.getQuestions();
        setQuestions(fetchedQuestions);
      } catch (err: any) {
        setError(err.message || 'Failed to load questions. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleNext = async () => {
    setAnswers({ ...answers, [currentQuestion]: selectedOption });
    
    if (currentQuestion < questions.length - 1) {
      setDirection(1);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(answers[currentQuestion + 1] || '');
    } else {
      // Submit assessment
      const allAnswers = { ...answers, [currentQuestion]: selectedOption };
      setIsSubmitting(true);
      setError(null);
      
      try {
        const assessmentAnswers = Object.entries(allAnswers).map(([questionId, answer]) => ({
          questionId: parseInt(questionId),
          answer,
        }));

        const result = await assessmentApi.submitAssessment({ answers: assessmentAnswers });
        setAssessmentData(result);
        navigate('/student/dashboard');
      } catch (err: any) {
        setError(err.message || 'Failed to submit assessment. Please try again.');
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1] || '');
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#4F46E5] animate-spin mx-auto mb-4" />
          <p className="text-[#6B7280]">Loading assessment questions...</p>
        </div>
      </div>
    );
  }

  if (error && questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-[#111827] mb-2">Error Loading Assessment</h2>
          <p className="text-[#6B7280] mb-6">{error}</p>
          <Button onClick={() => window.location.reload()} className="bg-[#4F46E5] text-white">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return null;
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <img src={nevoLogo} alt="Nevo" className="w-14 h-14" />
            <span className="font-poppins text-[#111827] text-3xl font-bold">Nevo</span>
          </div>
          <h1 className="mb-4 text-[#111827]">Let's Personalize Your Learning</h1>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
            Answer these questions to help us understand how you learn best. There are no right or wrong answers!
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-[#6B7280] font-medium text-sm">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-[#4F46E5] font-bold">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-200" />
        </motion.div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Question Card with Animation */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="card mb-8 p-10"
          >
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-[#4F46E5] to-[#10B981] rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl font-bold">{currentQuestion + 1}</span>
              </div>
              <h3 className="text-[#111827] flex-1 leading-relaxed">
                {currentQuestionData.question}
              </h3>
            </div>
            
            <div className="space-y-4">
              {currentQuestionData.options.map((option, index) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => handleOptionSelect(option.value)}
                  disabled={isSubmitting}
                  className={`w-full p-5 rounded-2xl border-2 transition-all text-left flex items-center gap-4 group disabled:opacity-50 ${
                    selectedOption === option.value
                      ? 'border-[#4F46E5] bg-gradient-to-r from-[#4F46E5]/10 to-[#10B981]/5 shadow-lg shadow-[#4F46E5]/10'
                      : 'border-gray-200 hover:border-[#4F46E5]/50 hover:bg-gray-50 hover:shadow-md'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all ${
                    selectedOption === option.value 
                      ? 'bg-gradient-to-br from-[#4F46E5] to-[#10B981] scale-110' 
                      : 'bg-gray-100 group-hover:bg-gray-200'
                  }`}>
                    {selectedOption === option.value ? '✓' : (option.icon || '○')}
                  </div>
                  <span className={`flex-1 text-lg transition-colors ${
                    selectedOption === option.value ? 'text-[#111827] font-semibold' : 'text-[#6B7280] font-medium'
                  }`}>
                    {option.label}
                  </span>
                  {selectedOption === option.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    >
                      <CheckCircle className="w-6 h-6 text-[#10B981]" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-between items-center"
        >
          <Button
            onClick={handleBack}
            disabled={currentQuestion === 0 || isSubmitting}
            variant="outline"
            className="px-8 py-6 text-base rounded-2xl border-2 disabled:opacity-40"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!selectedOption || isSubmitting}
            className="btn-primary px-8 py-6 text-base disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting...
              </>
            ) : currentQuestion === questions.length - 1 ? (
              'Complete Assessment'
            ) : (
              'Next Question'
            )}
            {!isSubmitting && <ChevronRight className="w-5 h-5 ml-2" />}
          </Button>
        </motion.div>

        {/* Encouraging message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-[#6B7280] italic">
            "Every answer helps us create the perfect learning experience for you! 🎯"
          </p>
        </motion.div>
      </div>
    </div>
  );
}
