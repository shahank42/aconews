"use client";

import React, { useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import Filters from '@/components/filters'

export default function Sidebar() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  return (
    <aside className="flex flex-col w-full py-6 md:w-64">
      <div className="flex px-4 md:hidden">
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center justify-center">
              <Menu className="w-4 h-4 mr-2" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className="flex flex-col">
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Apply filters to refine your news feed.</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col py-4 space-y-4">
              <Filters />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex-col hidden space-y-4 md:flex">
        <h2 className="text-xl font-semibold">Filters</h2>
        <Filters />
      </div>
    </aside>
  )
}
