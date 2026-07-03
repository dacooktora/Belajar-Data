import { Skeleton } from '@/components/ui/Skeleton';

export default function MonthLoading() {
  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <Skeleton variant="text" width="400px" height="36px" />
            <Skeleton variant="text" width="300px" height="24px" className="mt-2" />
            <div className="flex gap-2 mt-3">
              <Skeleton variant="rect" width="80px" height="24px" className="rounded-full" />
              <Skeleton variant="rect" width="80px" height="24px" className="rounded-full" />
            </div>
          </div>
          <Skeleton variant="rect" width="100px" height="48px" className="rounded-lg" />
        </div>

        <Skeleton variant="rect" width="100%" height="80px" className="rounded-xl mt-6" />

        <div className="flex gap-2 mt-6">
          <Skeleton variant="rect" width="120px" height="40px" className="rounded-lg" />
          <Skeleton variant="rect" width="120px" height="40px" className="rounded-lg" />
          <Skeleton variant="rect" width="120px" height="40px" className="rounded-lg" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} variant="card" height="120px" className="rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
