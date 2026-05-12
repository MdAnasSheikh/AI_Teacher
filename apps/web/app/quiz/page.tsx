'use client';

import { AppLayout } from '../../components/ui/AppLayout';
import { useState } from 'react';

const sampleQuestions = [
  {
    q: 'What is the speed of light?',
    options: ['300,000 km/s', '150,000 km/s', '3,000 km/s', '30,000 km/s'],
    answer: 0,
  },
  {
    q: 'Which planet is closest to the Sun?',
    options: ['Venus', 'Earth', 'Mercury', 'Mars'],
    answer: 2,
  },
  {
    q: 'What is 7 × 8?',
    options: ['54', '56', '58', '64'],
    answer: 1,
  },
];

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  function choose(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === sampleQuestions[current].answer) setScore((s) => s + 1);
  }

  function next() {
    if (current + 1 >= sampleQuestions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  }

  function restart() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  const q = sampleQuestions[current];

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-1">Quiz Engine</h1>
      <p className="text-slate-400 mb-8">AI-generated adaptive quizzes to test your knowledge.</p>

      {finished ? (
        <div className="max-w-md mx-auto text-center bg-slate-800 rounded-2xl p-10 border border-slate-700">
          <span className="text-5xl mb-4 block">🎉</span>
          <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-slate-300 mb-6">
            You scored <span className="text-purple-400 font-bold">{score}</span> out of{' '}
            <span className="font-bold">{sampleQuestions.length}</span>
          </p>
          <button
            onClick={restart}
            className="px-6 py-2.5 bg-purple-700 hover:bg-purple-600 rounded-lg font-semibold transition-colors"
          >
            Retry Quiz
          </button>
        </div>
      ) : (
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between text-sm text-slate-400 mb-4">
            <span>Question {current + 1} of {sampleQuestions.length}</span>
            <span>Score: {score}</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 mb-6">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all"
              style={{ width: `${((current) / sampleQuestions.length) * 100}%` }}
            />
          </div>
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
            <p className="text-lg font-semibold">{q.q}</p>
          </div>
          <div className="grid grid-cols-1 gap-3 mb-6">
            {q.options.map((opt, idx) => {
              let style = 'bg-slate-800 border-slate-700 hover:border-purple-500 text-white';
              if (selected !== null) {
                if (idx === q.answer) style = 'bg-green-800 border-green-500 text-white';
                else if (idx === selected) style = 'bg-red-800 border-red-500 text-white';
                else style = 'bg-slate-800 border-slate-700 text-slate-400';
              }
              return (
                <button
                  key={idx}
                  onClick={() => choose(idx)}
                  className={`text-left px-5 py-3 rounded-xl border transition-colors ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {selected !== null && (
            <button
              onClick={next}
              className="w-full py-3 bg-purple-700 hover:bg-purple-600 rounded-xl font-semibold transition-colors"
            >
              {current + 1 === sampleQuestions.length ? 'See Results' : 'Next Question'}
            </button>
          )}
        </div>
      )}
    </AppLayout>
  );
}