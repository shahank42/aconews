import React from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import type { Article } from '@/lib/types'
import placeholderImage from "../../public/placeholder.svg"

export default function NewsCard({ article }: { article: Article }) {
  return (
    <Card className="overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3 h-64 relative">
          <Image
            src={placeholderImage}
            loader={() => article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col p-6 md:w-2/3">
          <CardHeader className="flex flex-col p-0">
            {/* <Badge className="self-start mb-2">{article.source.name}</Badge> */}
            <h3 className="mb-2 text-xl font-bold">{article.title}</h3>
          </CardHeader>
          <CardContent className="flex flex-col flex-grow p-0">
            <p className="mb-4 text-muted-foreground">{article.content.slice(0, 100)}</p>
            <div className="flex items-center mb-4 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              <time dateTime={article.publishedAt}>{article.publishedAt}</time>
              <span className="mx-2">•</span>
              <span>{article.source.name}</span>
            </div>
          </CardContent>
          <CardFooter className="p-0 mt-auto">
            <Button variant="outline" className="flex items-center">
              Read More <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}
