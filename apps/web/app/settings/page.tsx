'use client';

import { AppLayout } from '../../components/ui/AppLayout';
import { useState } from 'react';

export default function SettingsPage() {
  const [name, setName] = useState('Student');
  const [email, setEmail] = useState('student@example.com');
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('English');
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-1">Settings</h1>
      <p className="text-slate-400 mb-8">Manage your preferences and account details.</p>

      <div className="max-w-lg space-y-6">
        <section className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h2 className="font-semibold mb-4 text-slate-200">Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Display Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>
        </section>

        <section className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h2 className="font-semibold mb-4 text-slate-200">Preferences</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                {['English', 'Spanish', 'French', 'German', 'Hindi', 'Arabic'].map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Push Notifications</p>
                <p className="text-xs text-slate-400">Receive study reminders and quiz alerts</p>
              </div>
              <button
                onClick={() => setNotifications((n) => !n)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  notifications ? 'bg-purple-600' : 'bg-slate-600'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    notifications ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        <button
          onClick={save}
          className={`w-full py-3 rounded-xl font-semibold transition-colors ${
            saved ? 'bg-green-700 text-white' : 'bg-purple-700 hover:bg-purple-600 text-white'
          }`}
        >
          {saved ? '✅ Saved!' : 'Save Changes'}
        </button>
      </div>
    </AppLayout>
  );
}