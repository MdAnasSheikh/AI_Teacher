export default function LoginPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-slate-900/80 p-10 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Sign in</h1>
        <p className="mb-6 text-slate-400">(Supabase auth integration will be here)</p>
        <button className="w-full py-3 rounded bg-purple-700 hover:bg-purple-600 font-semibold">Login with Email</button>
        <button className="w-full py-3 rounded bg-slate-700 mt-4 hover:bg-slate-600 font-semibold">Login with Google</button>
        <button className="w-full py-3 rounded bg-slate-800 mt-4 hover:bg-slate-900 font-semibold">Login with GitHub</button>
      </div>
    </div>
  );
}