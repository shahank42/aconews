import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Clock } from 'lucide-react'
import type { Article } from '@/lib/types'
import Image from 'next/image'
import placeholderImage from "../../public/placeholder.svg"
import Link from 'next/link'


export default function SearchCard({ article }: { article: Article }) {
  return (
    <Card className="overflow-hidden shadow-none hover:shadow-xl transition-all rounded-3xl">
      <CardContent className="p-0">
        <div className="md:flex">
          <div className="md:w-1/3 p-2 md:p-5">
            <div className="h-48 relative">
              <Image
                src={placeholderImage}
                loader={() => article.image}
                alt={article.title}
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
          <div className="p-6 flex flex-col justify-between md:w-2/3">
            <Link href={article.url} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold mb-2 hover:underline font-comfortaa">
              {article.title}
            </Link>
            {/* <p className="text-muted-foreground mb-4">{article.content.slice(0, 100)}...</p> */}
            <div className="flex items-center mb-4 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </time>
              <span className="mx-2">•</span>
              <span>{article.source.name}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
