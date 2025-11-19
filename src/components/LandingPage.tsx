import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Brain, 
  Users, 
  Sparkles, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Zap, 
  Heart, 
  Target,
  CheckCircle,
  Star,
  Clock,
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import heroImage from '../assets/hero-image.png';
import nevoLogo from '../assets/nevo-logo.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200"
      >
        <div className="container mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <img src={nevoLogo} alt="Nevo" className="w-9 h-9" />
              <span className="font-poppins text-[#111827] text-2xl font-bold">Nevo</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-[#6B7280] hover:text-[#111827] transition-colors px-5 py-2 font-medium">
                Login
              </Link>
              <Link to="/signup" className="bg-[#4F46E5] text-white rounded-xl px-6 py-2.5 font-semibold hover:bg-[#4338CA] transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-[#F0F4FF] rounded-full border border-[#4F46E5]/20">
                <div className="w-2 h-2 bg-[#4F46E5] rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-[#4F46E5]">AI-Powered Personalized Learning</span>
              </motion.div>

              <motion.h1 variants={itemVariants} className="leading-tight text-[#111827]">
                Learning That Adapts to Every Student
              </motion.h1>

              <motion.p variants={itemVariants} className="text-xl text-[#6B7280] leading-relaxed">
                Nevo uses AI to understand how each child learns best—then personalizes every lesson to match their unique needs, pace, and learning style.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <Link to="/signup" className="inline-flex items-center gap-2 bg-[#4F46E5] text-white rounded-xl px-8 py-4 font-semibold hover:bg-[#4338CA] transition-all shadow-lg shadow-[#4F46E5]/20">
                  Start Free Today
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="inline-flex items-center gap-2 border-2 border-[#E5E7EB] text-[#111827] rounded-xl px-8 py-4 font-semibold hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all">
                  See How It Works
                </button>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1658909835269-e76abd3ffb5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGNoaWxkJTIwc3R1ZGVudCUyMHBvcnRyYWl0JTIwc21pbGluZ3xlbnwxfHx8fDE3NjM1MjM1NzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Student"
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    />
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1760808574067-27ce83df8ed6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY2hpbGQlMjBoYXBweSUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzUyMzU3NHww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Student"
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    />
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1617056239820-8ce90ba48193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhbiUyMGNoaWxkJTIwc3R1ZGVudHxlbnwxfHx8MTc2MzUyMzU3NHww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Student"
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    />
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1651796694735-807cbbfc8454?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGtpZCUyMGxlYXJuaW5nJTIwaGFwcHl8ZW58MXx8fHwxNzYzNTIzNTc1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Student"
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    />
                  </div>
                  <p className="text-sm text-[#6B7280] ml-2">10,000+ students</p>
                </div>
                <div className="h-8 w-px bg-gray-200" />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />
                  ))}
                  <span className="text-sm text-[#6B7280] ml-2">4.9/5</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                <img
                  src={heroImage}
                  alt="African children learning with computers in classroom"
                  className="w-full h-auto"
                />
              </div>
              
              {/* Simple stat badges */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#10B981]/10 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#10B981]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#111827]">10k+ XP Earned</p>
                  <p className="text-xs text-[#6B7280]">This week</p>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#4F46E5]/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#4F46E5]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#111827]">98% Success</p>
                  <p className="text-xs text-[#6B7280]">Completion rate</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="py-20 lg:py-28 bg-[#F9FAFB]">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 text-[#111827]">Choose Your Path</h2>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              Whether you're a student, teacher, or parent—Nevo has something for you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                role: 'student',
                icon: BookOpen,
                title: "I'm a Student",
                desc: 'Start learning with lessons designed just for you. Get XP, earn badges, and learn at your own pace.',
                color: '#4F46E5',
                bgColor: '#F0F4FF'
              },
              {
                role: 'teacher',
                icon: Users,
                title: "I'm a Teacher",
                desc: 'Upload one lesson and AI personalizes it for every student. Track progress and get actionable insights.',
                color: '#10B981',
                bgColor: '#ECFDF5'
              },
              {
                role: 'parent',
                icon: Heart,
                title: "I'm a Parent",
                desc: 'See your child\'s progress, celebrate achievements, and get AI-powered tips for supporting them at home.',
                color: '#F97316',
                bgColor: '#FFF7ED'
              }
            ].map((item, index) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/signup?role=${item.role}`} className="group block">
                  <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-gray-300 transition-all h-full">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: item.bgColor }}>
                      <item.icon className="w-7 h-7" style={{ color: item.color }} />
                    </div>
                    <h3 className="mb-4 text-[#111827]">{item.title}</h3>
                    <p className="text-[#6B7280] leading-relaxed mb-6">
                      {item.desc}
                    </p>
                    <div className="flex items-center font-semibold group-hover:gap-3 gap-2 transition-all" style={{ color: item.color }}>
                      Get Started
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="mb-4 text-[#111827]">How Nevo Works</h2>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              Three simple steps to personalized learning
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { icon: Target, title: 'Quick Assessment', desc: 'Students answer 5 simple questions to help AI understand their unique learning style and needs.' },
              { icon: Sparkles, title: 'AI Personalization', desc: 'Our AI analyzes the responses and automatically adapts lessons to match each student\'s profile.' },
              { icon: TrendingUp, title: 'Learn & Grow', desc: 'Students engage with perfectly-paced lessons while teachers and parents track meaningful progress.' }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#F0F4FF] flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-[#4F46E5]" />
                </div>
                <h3 className="mb-4 text-[#111827]">{step.title}</h3>
                <p className="text-[#6B7280] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28 bg-[#F9FAFB]">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 text-[#111827]">Built for Every Learner</h2>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              Nevo is designed specifically for neurodivergent students, with features that make learning accessible, engaging, and effective for everyone
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { icon: Brain, title: 'Adaptive Content', desc: 'Lessons adjust in real-time based on understanding' },
              { icon: Award, title: 'Motivating Rewards', desc: 'XP, badges, and streaks keep students engaged' },
              { icon: BarChart3, title: 'Real-Time Insights', desc: 'Teachers and parents see actionable progress data' },
              { icon: Heart, title: 'Neurodivergent-Friendly', desc: 'Designed for ADHD, autism, dyslexia, and more' },
              { icon: Clock, title: 'Perfect Pacing', desc: 'Lessons adapt to each student\'s attention span' },
              { icon: CheckCircle, title: 'Step-by-Step', desc: 'Clear, structured guidance with no overwhelm' },
              { icon: Zap, title: 'Instant Feedback', desc: 'Students get immediate, encouraging responses' },
              { icon: Sparkles, title: 'AI Tutor', desc: 'Personalized tips and hints when students need help' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div className="bg-white rounded-2xl p-6 border border-gray-200 h-full hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-[#F0F4FF] flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-[#4F46E5]" />
                  </div>
                  <h4 className="mb-3 text-[#111827]">{feature.title}</h4>
                  <p className="text-[#6B7280] leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-[#4F46E5] relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-white mb-6">Ready to Transform Learning?</h2>
            <p className="text-white/90 text-xl mb-10 leading-relaxed">
              Join thousands of students, teachers, and parents using Nevo to create better learning experiences every day.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/signup" className="inline-flex items-center gap-2 bg-white text-[#4F46E5] rounded-xl px-8 py-4 font-semibold hover:bg-gray-50 transition-all shadow-xl">
                Start Free Today
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="inline-flex items-center gap-2 border-2 border-white text-white rounded-xl px-8 py-4 font-semibold hover:bg-white hover:text-[#4F46E5] transition-all">
                Watch Demo
              </button>
            </div>
            
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="flex items-center gap-3">
              <img src={nevoLogo} alt="Nevo" className="w-10 h-10" />
              <span className="font-poppins text-xl font-bold text-[#111827]">Nevo</span>
            </div>
            <p className="text-[#6B7280] max-w-md">
              Personalized learning for every student. Built for neurodivergent learners.
            </p>
            <div className="flex items-center gap-8 text-sm text-[#6B7280]">
              <a href="#" className="hover:text-[#111827] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#111827] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#111827] transition-colors">Contact Us</a>
            </div>
            <p className="text-[#9CA3AF] text-sm">
              © 2025 Nevo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

