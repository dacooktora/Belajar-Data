import { Skeleton } from '@/components/ui/Skeleton';

export default function LearningLoading() {
  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <Skeleton variant="text" width="300px" height="32px" />
            <Skeleton variant="text" width="200px" height="20px" className="mt-2" />
          </div>
          <Skeleton variant="rect" width="120px" height="36px" className="rounded-full" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Skeleton variant="rect" width="100%" height="44px" className="rounded-lg" />
          <Skeleton variant="rect" width="160px" height="44px" className="rounded-lg" />
          <Skeleton variant="rect" width="160px" height="44px" className="rounded-lg" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} variant="card" height="200px" className="rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
