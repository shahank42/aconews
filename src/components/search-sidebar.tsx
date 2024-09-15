"use client";

import React, { useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import SearchFilters from './search-filters';

export default function SearchSidebar() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  return (
    <aside className="flex flex-col w-full py-3 md:py-6 md:w-64 border-b md:border-r border-border px-0 md:px-4">
      <div className="flex px-4 md:hidden">
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex sticky top-[88px] items-center justify-center w-full">
              <Menu className="w-4 h-4 mr-2" /> Filters Sidebar
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className="flex flex-col">
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Apply filters to refine your search.</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col py-4 space-y-4">
              <SearchFilters />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex-col hidden gap-y md:flex">
        <h2 className="text-xl font-semibold">Filters</h2>
        <SearchFilters />
      </div>
    </aside>
  )
}
