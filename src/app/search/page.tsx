import SearchFeed from "@/components/search-feed"
import { Suspense } from "react"

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchFeed />
    </Suspense>
  )
}
