import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function Filters() {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="category" className="text-sm font-medium">Category</label>
        <Select>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="science">Science</SelectItem>
            <SelectItem value="environment">Environment</SelectItem>
            <SelectItem value="economy">Economy</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="country" className="text-sm font-medium">Country</label>
        <Select>
          <SelectTrigger id="country">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="language" className="text-sm font-medium">Language</label>
        <Select>
          <SelectTrigger id="language">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="de">German</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}