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

export const mockArticles = [
  {
    id: 1,
    title:
      "SpaceX Successfully Launches Starship, Marking New Era in Space Exploration",
    excerpt:
      "In a historic moment for space travel, SpaceX's Starship completed its first successful orbital flight, paving the way for future Mars missions.",
    category: "Technology",
    source: "Space News",
    date: "2023-05-15",
    image:
      "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=500&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Global Climate Summit Reaches Landmark Agreement",
    excerpt:
      "World leaders at the COP28 climate conference have agreed on ambitious new targets to reduce carbon emissions and combat climate change.",
    category: "Environment",
    source: "World News Network",
    date: "2023-05-14",
    image:
      "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=500&h=300&fit=crop",
  },
  {
    id: 3,
    title:
      "Breakthrough in Quantum Computing Promises to Revolutionize Data Processing",
    excerpt:
      "Scientists have achieved a major milestone in quantum computing, demonstrating a quantum processor that outperforms traditional supercomputers.",
    category: "Science",
    source: "Tech Insider",
    date: "2023-05-13",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Global Economic Forum Addresses Post-Pandemic Recovery Strategies",
    excerpt:
      "Economic leaders gather to discuss innovative approaches to boost global economic growth and address inequalities exacerbated by the pandemic.",
    category: "Economy",
    source: "Financial Times",
    date: "2023-05-12",
    image:
      "https://images.unsplash.com/photo-1607944024060-0450380ddd33?w=500&h=300&fit=crop",
  },
];

export default function NewsFeed() {
  return (
    <div className="flex flex-col gap-6 p-4">
      {mockArticles.map((article) => (
        <NewsCard key={article.id} article={article} />
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
