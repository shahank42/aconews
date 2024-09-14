"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import NewsCard from "@/components/news-card";
import { useQuery } from "@tanstack/react-query";
import type { PaginatedArticles } from "@/lib/types";
import { useState } from "react";
import { cn } from "@/lib/utils";

const fetchArticles = async (page: number) => {
  const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/news`;
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_BACKEND_URL is not defined');
  }

  const params = new URLSearchParams({
    category: "general",
    country: "us",
    language: "en",
    page: page.toString(),
    pageSize: "3",
  });

  try {
    const res = await fetch(`${baseUrl}?${params}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    if (!data || !Array.isArray(data.articles)) {
      throw new Error('Invalid data format received from the server');
    }
    return data as PaginatedArticles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw new Error('Failed to fetch articles. Please try again later.');
  }
}

export default function NewsFeed() {
  const [currentPage, setCurrentPage] = useState(1);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['articles', currentPage],
    queryFn: () => fetchArticles(currentPage),
  })

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const totalPages = Math.ceil(data.totalArticles / data.pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {data.articles.map((article) => (
        <NewsCard key={article.title} article={article} />
      ))}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              className={cn("cursor-pointer", {
                'pointer-events-none opacity-50': currentPage === 1,
              })}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={`page-${index + 1}`}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className={cn("cursor-pointer", {
                'pointer-events-none opacity-50': currentPage === totalPages,
              })}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
