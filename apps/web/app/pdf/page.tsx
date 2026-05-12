'use client';

import { AppLayout } from '../../components/ui/AppLayout';
import { useState } from 'react';

export default function PDFPage() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<string | null>(null);

  function handleFile(f: File | null) {
    if (f && f.type === 'application/pdf') {
      setFile(f.name);
    }
  }

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-1">PDF Uploader</h1>
      <p className="text-slate-400 mb-8">Upload study material and let AI explain it to you.</p>

      <div className="max-w-2xl mx-auto">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFile(e.dataTransfer.files?.[0] ?? null);
          }}
          className={`border-2 border-dashed rounded-2xl p-16 text-center transition-colors cursor-pointer ${
            dragging ? 'border-purple-500 bg-purple-900/20' : 'border-slate-600 hover:border-slate-500 bg-slate-800/50'
          }`}
        >
          <span className="text-5xl block mb-4">📄</span>
          {file ? (
            <>
              <p className="text-lg font-semibold text-green-400 mb-1">✅ {file}</p>
              <p className="text-slate-400 text-sm">File ready for AI analysis</p>
              <button
                onClick={() => setFile(null)}
                className="mt-4 text-xs text-slate-400 hover:text-white underline"
              >
                Remove
              </button>
            </>
          ) : (
            <>
              <p className="text-lg font-semibold mb-1">Drop your PDF here</p>
              <p className="text-slate-400 text-sm mb-4">or click to browse files</p>
              <label className="cursor-pointer px-5 py-2.5 bg-purple-700 hover:bg-purple-600 rounded-lg text-sm font-semibold transition-colors">
                Browse Files
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                />
              </label>
            </>
          )}
        </div>

        {file && (
          <div className="mt-6 bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h2 className="font-semibold mb-3">AI Analysis Options</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: '📋', label: 'Summarise', desc: 'Get a concise summary' },
                { icon: '❓', label: 'Q&A Mode', desc: 'Ask questions about the PDF' },
                { icon: '🧠', label: 'Generate Quiz', desc: 'Create a quiz from content' },
              ].map((opt) => (
                <button
                  key={opt.label}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-700 hover:bg-slate-600 border border-slate-600 transition-colors text-sm"
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <span className="font-semibold">{opt.label}</span>
                  <span className="text-slate-400 text-xs">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}