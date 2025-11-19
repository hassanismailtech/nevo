import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useAuthStore } from '../../stores/authStore';
import { assessmentApi } from '../../api/assessment';
import nevoLogo from '../../assets/nevo-logo.png';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();
    
    try {
      await login(formData.email, formData.password);
      
      // Check user role and route accordingly
      const authData = localStorage.getItem('nevo-auth-storage');
      if (authData) {
        const parsed = JSON.parse(authData);
        const role = parsed.state?.currentUser?.role;
        
        if (role === 'student') {
          // Check if assessment completed
          try {
            const assessmentResult = await assessmentApi.getResult();
            if (assessmentResult) {
              navigate('/student/dashboard');
            } else {
              navigate('/assessment');
            }
          } catch {
            navigate('/assessment');
          }
        } else if (role === 'teacher') {
          navigate('/teacher/dashboard');
        } else if (role === 'parent') {
          navigate('/parent/dashboard');
        }
      }
    } catch (err: any) {
      setLocalError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Image */}
      <div className="hidden lg:block relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1623035792727-61da15e1a383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZ2lybCUyMHN0dWRlbnQlMjBsZWFybmluZyUyMGhhcHB5fGVufDF8fHx8MTc2MzUyMjcyOXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Happy Nigerian girl learning"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/60 via-[#4F46E5]/50 to-[#6366F1]/40" />
        
        <div className="relative h-full flex flex-col justify-between p-12">
          <Link to="/" className="flex items-center gap-3 text-white">
            <img src={nevoLogo} alt="Nevo" className="w-12 h-12 brightness-0 invert" />
            <span className="font-poppins text-2xl font-bold">Nevo</span>
          </Link>
          
          <div className="space-y-6 max-w-md">
            <h1 className="text-white leading-tight">
              Welcome Back
            </h1>
            
            <p className="text-white/90 text-lg leading-relaxed">
              Continue your personalized learning journey. Your students are waiting for lessons that truly understand them.
            </p>
          </div>
          
          <div className="flex items-center gap-6 text-white/60 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Help</a>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-6 lg:p-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <Link to="/" className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <img src={nevoLogo} alt="Nevo" className="w-12 h-12" />
            <span className="font-poppins text-[#111827] text-2xl font-bold">Nevo</span>
          </Link>

          <div className="mb-10">
            <h2 className="mb-3 text-[#111827]">Welcome Back</h2>
            <p className="text-[#6B7280]">Login to continue your learning journey</p>
          </div>

          {displayError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{displayError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-[#111827]">Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-12 h-12 text-base rounded-xl border-2 border-gray-200 focus:border-[#4F46E5] bg-white"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-[#111827]">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-12 h-12 text-base rounded-xl border-2 border-gray-200 focus:border-[#4F46E5] bg-white"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#4F46E5] focus:ring-[#4F46E5]" />
                <span className="text-[#6B7280]">Remember me</span>
              </label>
              <a href="#" className="text-[#4F46E5] hover:underline font-semibold">
                Forgot password?
              </a>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#4F46E5] text-white h-12 text-base rounded-xl hover:bg-[#4338CA] transition-colors flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[#6B7280]">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#4F46E5] hover:underline font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
