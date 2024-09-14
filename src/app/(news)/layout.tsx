import MaxWidthWrapper from "@/components/max-width-wrapper";
import Sidebar from "@/components/sidebar";
import type { ReactNode } from "react";

export default function NewsLayout({ children }: { children: ReactNode }) {
  return (
    <MaxWidthWrapper className="h-[calc(100dvh-117px)] md:h-[calc(100dvh-69px)] px-0 md:pr-0">
      <div className="flex flex-col h-full pr-0 md:gap-8 md:flex-row">
        <Sidebar />

        {children}
      </div>
    </MaxWidthWrapper>
  )
}
