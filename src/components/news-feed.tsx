"use client";

import NewsCard from "@/components/news-card";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { PaginatedArticles } from "@/lib/types";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { PaginationSection } from "./pagination-section";
import { fetchArticles } from "@/lib/fetchers";
import { useSearchParams } from "next/navigation";
import type { FilterFormValues } from "./filters";

export default function NewsFeed() {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [pageSize, setPageSize] = useState(Number(searchParams.get('pageSize')) || 2);
  const [filters, setFilters] = useState<FilterFormValues>(
    {
      category: searchParams.get('category') || "",
      language: searchParams.get('language') || "",
      country: searchParams.get('country') || "",
    }
  );

  useEffect(() => {
    setPageSize(Number(searchParams.get('pageSize')) || 2);
    setCurrentPage(Number(searchParams.get('page')) || 1);
    setFilters({
      category: searchParams.get('category') || "",
      language: searchParams.get('language') || "",
      country: searchParams.get('country') || "",
    });
  }, [searchParams]);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['articles', currentPage, pageSize, filters],
    queryFn: () => fetchArticles(currentPage, pageSize, filters),
    placeholderData: keepPreviousData
  })

  if (isPending)
    return (
      <div className="flex flex-col gap-6 p-4">
        {Array.from({ length: 2 }, (_, i) => (
          <Skeleton key={`skeleton-${i + 1}`} className="h-64 w-full" />
        ))}
      </div>
    );

  if (isError) return <div className="flex flex-col gap-6 p-4">Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-6 p-4">
      {data.articles.map((article) => (
        <NewsCard key={article.title} article={article} />
      ))}

      <PaginationSection
        totalCount={data.totalPages * pageSize}
        page={currentPage}
        pageSize={pageSize}
        pageSizeSelectOptions={{
          pageSizeSearchParam: 'pageSize',
          pageSizeOptions: [2, 4, 6]
        }}
      />

    </div>
  );
}
