'use client';

import { AppLayout } from '../../components/ui/AppLayout';
import { useState } from 'react';

type Note = { id: number; title: string; body: string; date: string };

const initialNotes: Note[] = [
  { id: 1, title: 'Photosynthesis', body: 'Photosynthesis is the process by which green plants convert sunlight into glucose using CO₂ and water.', date: '2026-05-10' },
  { id: 2, title: 'Newton\'s Laws', body: '1st: An object at rest stays at rest. 2nd: F = ma. 3rd: Every action has an equal & opposite reaction.', date: '2026-05-11' },
];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [active, setActive] = useState<Note | null>(null);

  function addNote() {
    if (!title.trim() || !body.trim()) return;
    const note: Note = { id: Date.now(), title, body, date: new Date().toISOString().slice(0, 10) };
    setNotes((n) => [note, ...n]);
    setTitle('');
    setBody('');
    setActive(note);
  }

  function deleteNote(id: number) {
    setNotes((n) => n.filter((note) => note.id !== id));
    if (active?.id === id) setActive(null);
  }

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-1">Notes & Highlights</h1>
      <p className="text-slate-400 mb-6">Create notes and bookmark key concepts.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <p className="text-sm font-semibold mb-3 text-slate-300">New Note</p>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your note…"
              rows={3}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              onClick={addNote}
              className="w-full py-2 bg-purple-700 hover:bg-purple-600 rounded-lg text-sm font-semibold transition-colors"
            >
              + Add Note
            </button>
          </div>

          <div className="space-y-2">
            {notes.map((note) => (
              <button
                key={note.id}
                onClick={() => setActive(note)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${
                  active?.id === note.id
                    ? 'bg-purple-800 border-purple-600'
                    : 'bg-slate-800 border-slate-700 hover:border-slate-500'
                }`}
              >
                <p className="font-medium text-sm truncate">{note.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{note.date}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-800 rounded-xl border border-slate-700 p-6 min-h-[300px]">
          {active ? (
            <>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold">{active.title}</h2>
                  <p className="text-xs text-slate-400 mt-1">{active.date}</p>
                </div>
                <button
                  onClick={() => deleteNote(active.id)}
                  className="text-xs text-red-400 hover:text-red-300 border border-red-800 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
              <p className="text-slate-300 leading-relaxed">{active.body}</p>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 pt-16">
              <span className="text-4xl mb-3">📝</span>
              <p>Select a note to view it</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}