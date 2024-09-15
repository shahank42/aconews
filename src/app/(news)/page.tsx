import NewsFeed from "@/components/news-feed";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewsFeed />
    </Suspense>
  );
}
