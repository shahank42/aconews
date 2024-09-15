import MaxWidthWrapper from "@/components/max-width-wrapper";
import SearchSidebar from "@/components/search-sidebar";
import type { ReactNode } from "react";

export default function NewsLayout({ children }: { children: ReactNode }) {
  return (
    <MaxWidthWrapper className="h-[calc(100dvh-88px)] md:h-[calc(100dvh-69px)] px-0 md:px-0">
      <div className="flex flex-col h-full md:flex-row">
        <SearchSidebar />

        <main className="flex-1">
          {children}
        </main>
      </div>
    </MaxWidthWrapper>
  )
}
