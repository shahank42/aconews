import MaxWidthWrapper from "@/components/max-width-wrapper";
import NewsFeed from "@/components/news-feed";
import Sidebar from "@/components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";


export default function Home() {
  return (
    <ScrollArea className="w-full h-full px-0">
      <NewsFeed />
    </ScrollArea>
  );
}
