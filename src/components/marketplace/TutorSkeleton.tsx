export default function TutorSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-surface animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="h-16 w-16 rounded-full bg-surface" />
        <div className="h-6 w-12 rounded-full bg-surface" />
      </div>

      <div className="flex-grow space-y-3">
        <div className="h-6 w-3/4 rounded bg-surface" />
        <div className="h-4 w-1/2 rounded bg-surface" />
        
        <div className="flex gap-2">
          <div className="h-4 w-16 rounded bg-surface" />
          <div className="h-4 w-16 rounded bg-surface" />
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-surface flex items-center justify-between">
        <div className="h-6 w-20 rounded bg-surface" />
        <div className="h-8 w-24 rounded bg-surface" />
      </div>
    </div>
  );
}
