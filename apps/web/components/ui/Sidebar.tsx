'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/chat', label: 'AI Mentor Chat', icon: '💬' },
  { href: '/quiz', label: 'Quiz Engine', icon: '🧠' },
  { href: '/notes', label: 'Notes', icon: '📝' },
  { href: '/pdf', label: 'PDF Uploader', icon: '📄' },
  { href: '/achievements', label: 'Achievements', icon: '🏆' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-slate-900 border-r border-slate-700 px-4 py-6 shrink-0">
      <Link href="/" className="flex items-center gap-3 mb-10 px-2">
        <img src="/logo.svg" alt="Logo" className="w-9 h-9" />
        <span className="text-lg font-bold text-white leading-tight">
          Neural<br />
          <span className="text-purple-400">Learning</span>
        </span>
      </Link>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-purple-700 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {user ? (
        <div className="mt-6 flex flex-col gap-2">
          <Link
            href="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
          >
            <div className="w-7 h-7 rounded-full bg-purple-700 flex items-center justify-center text-xs font-bold">
              {(user.email?.[0] ?? '?').toUpperCase()}
            </div>
            <span className="text-xs text-slate-300 truncate max-w-[130px]">{user.email}</span>
          </Link>
          <button
            onClick={logout}
            className="w-full px-3 py-2 rounded-lg bg-slate-800 hover:bg-red-900/40 text-slate-400 hover:text-red-300 text-xs font-medium transition text-left"
          >
            🚪 Sign out
          </button>
        </div>
      ) : (
        <div className="mt-6 px-3 py-3 rounded-lg bg-slate-800 text-xs text-slate-400">
          <p className="font-semibold text-slate-300 mb-1">Neural Learning Universe</p>
          <p>AI-powered education platform</p>
        </div>
      )}
    </aside>
  );
}
