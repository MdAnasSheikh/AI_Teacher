import { AppLayout } from '../../components/ui/AppLayout';
import Link from 'next/link';

const stats = [
  { label: 'Sessions', value: '12', icon: '💬', color: 'from-purple-700 to-purple-900' },
  { label: 'Quizzes Taken', value: '8', icon: '🧠', color: 'from-blue-700 to-blue-900' },
  { label: 'Notes Created', value: '24', icon: '📝', color: 'from-teal-700 to-teal-900' },
  { label: 'XP Earned', value: '1,340', icon: '🏆', color: 'from-yellow-700 to-yellow-900' },
];

const quickLinks = [
  { href: '/chat', label: 'Start AI Chat', icon: '💬', desc: 'Ask your AI mentor anything' },
  { href: '/quiz', label: 'Take a Quiz', icon: '🧠', desc: 'Test your knowledge' },
  { href: '/notes', label: 'View Notes', icon: '📝', desc: 'Review your study notes' },
  { href: '/pdf', label: 'Upload PDF', icon: '📄', desc: 'Analyse study material with AI' },
];

export default function DashboardPage() {
  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
      <p className="text-slate-400 mb-8">Welcome back! Here's your learning summary.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`rounded-xl p-5 bg-gradient-to-br ${s.color} flex flex-col gap-2`}
          >
            <span className="text-2xl">{s.icon}</span>
            <span className="text-2xl font-bold">{s.value}</span>
            <span className="text-sm text-white/70">{s.label}</span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickLinks.map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="flex items-center gap-4 p-5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            <span className="text-3xl">{q.icon}</span>
            <div>
              <p className="font-semibold">{q.label}</p>
              <p className="text-sm text-slate-400">{q.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}