"use client";

import NewsCard from "@/components/news-card";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { PaginatedArticles } from "@/lib/types";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { PaginationSection } from "./pagination-section";
import { fetchArticles } from "@/lib/fetchers";

export default function NewsFeed() {
  const [currentPage, setCurrentPage] = useState(1);

  const { isPending, isError, data, error, isPlaceholderData } = useQuery({
    queryKey: ['articles', currentPage],
    queryFn: () => fetchArticles(currentPage),
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

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= data.totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {data.articles.map((article) => (
        <NewsCard key={article.title} article={article} />
      ))}

      <PaginationSection
        currentPage={currentPage}
        totalPages={data.totalPages}
        onPageChange={handlePageChange}
        hasNextPage={data.hasNextPage}
        hasPreviousPage={data.hasPreviousPage}
        isPlaceholderData={isPlaceholderData}
      />
    </div>
  );
}
