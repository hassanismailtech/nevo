import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, BookOpen, Trophy, UserPlus, Settings, Menu } from 'lucide-react';
import { Button } from './button';

export function MobileNavbar({ role = 'student' }: { role?: 'student' | 'teacher' }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const studentLinks = [
    { label: 'Home', icon: <Home />, to: '/student/dashboard' },
    { label: 'Lessons', icon: <BookOpen />, to: '/student/dashboard?tab=all' },
    { label: 'Achievements', icon: <Trophy />, to: '/student/dashboard?tab=progress' },
    { label: 'Connections', icon: <UserPlus />, to: '/student/connections' },
    { label: 'Settings', icon: <Settings />, to: '/student/dashboard?tab=settings' },
  ];

  const teacherLinks = [
    { label: 'Home', icon: <Home />, to: '/teacher/dashboard' },
    { label: 'Upload', icon: <BookOpen />, to: '/teacher/dashboard?tab=upload' },
    { label: 'Insights', icon: <Trophy />, to: '/teacher/dashboard?tab=insights' },
    { label: 'Students', icon: <UserPlus />, to: '/teacher/dashboard?tab=students' },
    { label: 'Settings', icon: <Settings />, to: '/teacher/dashboard?tab=settings' },
  ];

  const links = role === 'teacher' ? teacherLinks : studentLinks;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="flex justify-between items-center px-4 py-2">
        <Button variant="ghost" onClick={() => setOpen(!open)}>
          <Menu className="w-6 h-6" />
        </Button>
        {open && (
          <div className="absolute bottom-14 left-0 right-0 bg-white shadow-lg rounded-t-2xl p-4 flex flex-col gap-2">
            {links.map((link) => (
              <Button
                key={link.label}
                variant="ghost"
                className="flex items-center gap-2 w-full justify-start text-[#4F46E5]"
                onClick={() => {
                  setOpen(false);
                  navigate(link.to);
                }}
              >
                {link.icon}
                {link.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
