"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import NewsCard from "@/components/news-card";
import { useQuery } from "@tanstack/react-query";
import type { Article } from "@/lib/types";

const fetchArticles = async () => {
  const res = await fetch("/api/news?category=general&country=us&language=en&max=10");
  const data = await res.json();
  return data as Article[];
}

export default function NewsFeed() {
  const { isPending, isError, data: articles, error } = useQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles,
  })

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-6 p-4">
      {articles.map((article) => (
        <NewsCard key={article.title} article={article} />
      ))}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
