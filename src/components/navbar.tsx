import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 flex justify-center border-b bg-background">
      <div className="flex flex-col items-center justify-between w-full px-4 py-4 md:flex-row max-w-7xl">
        <h1 className="mb-4 text-2xl font-bold md:mb-0">AcoNews</h1>
        <div className="flex items-center w-full space-x-2 md:w-auto">
          <Input
            type="search"
            placeholder="Search news..."
            className="flex-grow md:flex-grow-0 md:w-[300px]"
          />
          <Button size="icon" className="flex-shrink-0">
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}