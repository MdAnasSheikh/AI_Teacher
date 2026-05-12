export default function CallbackPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-slate-900/80 p-10 rounded shadow-md text-center">
        <h1 className="text-xl font-bold mb-4">Authenticating...</h1>
        <p className="mb-2 text-slate-400">Processing your login, please wait.</p>
      </div>
    </div>
  );
}