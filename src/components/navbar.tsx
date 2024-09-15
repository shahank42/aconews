import Link from "next/link";
import SearchForm from "./search-form";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 flex justify-center border-b bg-background">
      <div className="flex flex-col items-center justify-between w-full gap-1 px-4 py-2 md:py-4 md:flex-row">
        <Link href="/" className="text-2xl font-bold md:mb-0">AcoNews</Link>
        <SearchForm />
      </div>
    </header>
  )
}