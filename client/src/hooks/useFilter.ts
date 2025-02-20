import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition } from "react";

function useFilter<T extends Record<string, any>>(defaultFilters: T) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition(); 
  const [filters, setFilters] = useState<T>(() => {
    const initialFilters = { ...defaultFilters };

    for (const [key, value] of searchParams.entries()) {
      initialFilters[key as keyof T] = value as T[keyof T];
    }

    return initialFilters;
  });

  const updateFilter = (key: keyof T, value: any) => {
    startTransition(() => {
      setFilters((prev) => {
        const newFilters = { ...prev, [key]: value };
        return newFilters;
      });
    });
  };

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, String(value));
    });

    router.push(`?${params.toString()}`);
  }, [filters, router]);

  const resetFilters = () => {
    setFilters(defaultFilters);
    router.push("");
  };

  return { filters, updateFilter, resetFilters, isPending };
}

export default useFilter;
