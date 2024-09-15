"use client";

import NewsCard from "@/components/news-card";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PaginationSection } from "./pagination-section";
import { fetchArticles } from "@/lib/fetchers";
import { useSearchParams } from "next/navigation";
import type { NewsFilterFormValues } from "./news-filters";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle } from "lucide-react";

export default function NewsFeed() {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [pageSize, setPageSize] = useState(Number(searchParams.get('pageSize')) || 4);

  const [filters, setFilters] = useState<NewsFilterFormValues>(
    {
      category: searchParams.get('category') || "",
      language: searchParams.get('language') || "",
      country: searchParams.get('country') || "",
    }
  );

  useEffect(() => {
    setPageSize(Number(searchParams.get('pageSize')) || 4);
    setCurrentPage(Number(searchParams.get('page')) || 1);
    setFilters({
      category: searchParams.get('category') || "",
      language: searchParams.get('language') || "",
      country: searchParams.get('country') || "",
    });
  }, [searchParams]);

  const { isPending, isError, data } = useQuery({
    queryKey: ['articles', currentPage, pageSize, filters],
    queryFn: () => fetchArticles(currentPage, pageSize, filters),
  })

  return (
    <div className="flex flex-col w-full">
      <div className="py-2 px-4 border-b border-border">
        <h2 className="text-2xl font-semibold">Top Headlines</h2>
        {!isError ? (
          <p className="text-gray-400">
            {isPending
              ? "Loading..."
              : `Showing results ${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, data.totalItems)} of ${data.totalItems} results`}
          </p>
        ) : <></>}
      </div>

      {isError ? (
        <div className="h-[calc(100dvh-88px-61px-49px)] md:h-[calc(100dvh-68px-49px-1px)] flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-lg p-8 text-center">
            <div className="mb-6">
              <svg
                className="mx-auto h-24 w-24 text-destructive"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4">Oops! Something went wrong</h2>
            <p className="text-muted-foreground mb-6">
              We couldn&apos;t fetch the articles from the server. This might be due to a network issue or a problem on our end.
            </p>
            <div className="flex items-center justify-center space-x-2 mb-6">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <span className="text-sm text-destructive font-medium">Error: Failed to fetch articles</span>
            </div>
          </div>
        </div>
      ) : (
        <ScrollArea className="w-full h-[calc(100dvh-88px-61px-73px)] md:h-[calc(100dvh-68px-73px-1px)] px-4 py-0 flex flex-col gap-4">
          <div className="flex flex-col gap-4 my-6">
            {isPending ? (
              [...Array(pageSize)].map((_, index) => (
                <Skeleton key={`${index + 1}-skeleton`} className="w-full h-96 md:h-64" />
              ))
            ) : (
              data.articles.map((article) => (
                <NewsCard key={article.title} article={article} />
              ))
            )}
          </div>

          <PaginationSection
            totalCount={isPending ? 0 : data.totalPages * pageSize}
            page={currentPage}
            pageSize={pageSize}
            pageSizeSelectOptions={{
              pageSizeSearchParam: 'pageSize',
              pageSizeOptions: [2, 4, 6]
            }}
          />
        </ScrollArea>
      )}
    </div>
  );
}
