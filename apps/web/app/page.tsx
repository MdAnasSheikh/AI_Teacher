export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white">
      <div className="flex flex-col items-center gap-4 pt-24">
        <img src="/logo.svg" alt="Neural Learning Universe Logo" className="w-20 h-20 mb-6" />
        <h1 className="text-5xl font-bold tracking-tight mb-3">Neural Learning Universe</h1>
        <p className="text-lg text-slate-300 max-w-xl text-center mb-8">
          The future of AI-powered education.<br/>
          Immersive study, premium mentor, quiz, and PDF understanding — all in one beautifully animated app.
        </p>
        <a href="/dashboard" className="rounded bg-purple-700 px-6 py-3 text-white text-lg font-semibold hover:bg-purple-600 transition">Enter Dashboard</a>
      </div>
      <footer className="w-full text-center text-slate-400 p-6">
        &copy; {new Date().getFullYear()} Neural Learning Universe
      </footer>
    </main>
  );
}