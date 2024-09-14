import React from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import type { mockArticles } from './news-feed'

export default function NewsCard({ article }: { article: typeof mockArticles[0] }) {
  return (
    <Card key={article.id} className="overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3">
          <img
            src={article.image}
            alt={article.title}
            className="object-cover w-full h-48 md:h-full"
          />
        </div>
        <div className="flex flex-col p-6 md:w-2/3">
          <CardHeader className="flex flex-col p-0">
            <Badge className="self-start mb-2">{article.category}</Badge>
            <h3 className="mb-2 text-xl font-bold">{article.title}</h3>
          </CardHeader>
          <CardContent className="flex flex-col flex-grow p-0">
            <p className="mb-4 text-muted-foreground">{article.excerpt}</p>
            <div className="flex items-center mb-4 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              <time dateTime={article.date}>{article.date}</time>
              <span className="mx-2">•</span>
              <span>{article.source}</span>
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
