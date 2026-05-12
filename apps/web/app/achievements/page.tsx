import { AppLayout } from '../../components/ui/AppLayout';

const badges = [
  { icon: '🔥', name: 'First Session', desc: 'Completed your first AI chat', earned: true },
  { icon: '🧠', name: 'Quiz Master', desc: 'Scored 100% on a quiz', earned: true },
  { icon: '📝', name: 'Note Taker', desc: 'Created 10 notes', earned: false },
  { icon: '📄', name: 'PDF Reader', desc: 'Analysed 5 PDFs with AI', earned: false },
  { icon: '⚡', name: 'Speed Learner', desc: 'Completed 5 sessions in one day', earned: true },
  { icon: '🌟', name: 'All-Rounder', desc: 'Used every feature of the app', earned: false },
];

const levelProgress = 68;

export default function AchievementsPage() {
  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-1">Achievements</h1>
      <p className="text-slate-400 mb-8">Your XP, levels, and badges.</p>

      <div className="max-w-2xl mb-8">
        <div className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-2xl p-6 flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
            7
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold">Level 7 — Curious Learner</p>
            <p className="text-white/70 text-sm mb-2">1,340 XP total · 160 XP to next level</p>
            <div className="w-full bg-white/20 rounded-full h-2.5">
              <div
                className="bg-white h-2.5 rounded-full transition-all"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Badges</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {badges.map((b) => (
          <div
            key={b.name}
            className={`rounded-xl p-5 border flex flex-col items-center text-center gap-2 transition-opacity ${
              b.earned
                ? 'bg-slate-800 border-purple-600'
                : 'bg-slate-900 border-slate-700 opacity-40'
            }`}
          >
            <span className="text-3xl">{b.icon}</span>
            <p className="font-semibold text-sm">{b.name}</p>
            <p className="text-slate-400 text-xs">{b.desc}</p>
            {!b.earned && <span className="text-xs text-slate-500 mt-1">Locked 🔒</span>}
          </div>
        ))}
      </div>
    </AppLayout>
  );
}