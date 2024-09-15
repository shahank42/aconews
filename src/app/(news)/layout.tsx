import NewsSidebar from "@/components/news-sidebar";

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col md:flex-row md:h-[calc(100dvh-68px-1px)]">
      <NewsSidebar />

      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
