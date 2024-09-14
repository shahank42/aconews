import MaxWidthWrapper from "@/components/max-width-wrapper";
import NewsFeed from "@/components/news-feed";
import Sidebar from "@/components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";


export default function Home() {
  return (
    <MaxWidthWrapper className="h-[calc(100dvh-117px)] md:h-[calc(100dvh-69px)] px-0 md:pr-0">
      <div className="flex flex-col h-full pr-0 md:gap-8 md:flex-row">
        <Sidebar />

        <ScrollArea className="w-full h-full px-0">
          <NewsFeed />
        </ScrollArea>
      </div>
    </MaxWidthWrapper>
  );
}
