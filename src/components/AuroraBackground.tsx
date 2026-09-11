export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-150 h-150 rounded-full bg-indigo-600/15 blur-[140px] animate-aurora-1" />

      <div className="absolute top-[30%] right-[-15%] w-137.5 h-137.5 rounded-full bg-purple-600/15 blur-[140px] animate-aurora-2" />

      <div className="absolute top-[65%] left-[10%] w-125 h-125 rounded-full bg-pink-600/10 blur-[150px] animate-aurora-3" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
    </div>
  );
}
