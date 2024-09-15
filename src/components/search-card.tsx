import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Clock } from 'lucide-react'
import type { Article } from '@/lib/types'
import Image from 'next/image'
import placeholderImage from "../../public/placeholder.svg"


export default function SearchCard({ article }: { article: Article }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="md:flex">
          <div className="md:w-1/3 h-48 relative">
            <Image
              src={placeholderImage}
              loader={() => article.image}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 flex flex-col justify-between md:w-2/3">
            <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
            {/* <p className="text-muted-foreground mb-4">{article.content.slice(0, 100)}...</p> */}
            <div className="flex items-center mb-4 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              <time dateTime={article.publishedAt}>{article.publishedAt}</time>
              <span className="mx-2">•</span>
              <span>{article.source.name}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
