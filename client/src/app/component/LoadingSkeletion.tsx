import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
    return (
      <div className="w-3/4">
        <div className="flex justify-between items-center mt-12 h-[500px] rounded-lg bg-customgreys-secondarybg">
          <div className="basis-1/2 px-16 mx-auto">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-4 w-96 mb-2" />
            <Skeleton className="h-4 w-72 mb-8" />
            <Skeleton className="w-40 h-10" />
          </div>
          <Skeleton className="basis-1/2 h-full rounded-r-lg" />
        </div>
  
        <div className="mx-auto py-12 mt-10">
          <Skeleton className="h-6 w-48 mb-4" />
          <Skeleton className="h-4 w-full max-w-2xl mb-8" />
  
          <div className="flex flex-wrap gap-4 mb-8">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <Skeleton className="w-24 h-6 rounded-full" key={index} />
            ))}
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((_, index) => (
              <Skeleton className="h-[300px] rounded-lg" key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default LoadingSkeleton