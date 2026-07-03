export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
        <p className="text-gray-500 dark:text-gray-400 animate-pulse-soft">
          Memuat...
        </p>
      </div>
    </div>
  );
}
