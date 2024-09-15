import React from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import type { Article } from '@/lib/types'
import placeholderImage from "../../public/placeholder.svg"
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function NewsCard({ article }: { article: Article }) {
  return (
    <Card className="overflow-hidden rounded-3xl shadow-none hover:shadow-xl transition-all font-outfit">
      <div className="md:flex">
        <div className="md:w-1/3 p-2 md:p-5">
          <div className="h-64 relative">
            <Image
              src={placeholderImage}
              loader={() => article.image}
              alt={article.title}
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        </div>
        <div className="flex flex-col p-6 md:w-2/3">
          <CardHeader className="flex flex-col p-0">
            {/* <Badge className="self-start mb-2">{article.source.name}</Badge> */}
            <h3 className="mb-2 text-xl font-bold font-comfortaa">{article.title}</h3>
          </CardHeader>
          <CardContent className="flex flex-col flex-grow p-0">
            <p className="mb-4 text-muted-foreground">{article.content.slice(0, 100)}</p>
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
          </CardContent>
          <CardFooter className="p-0 mt-auto">
            <Link href={article.url} className={cn(buttonVariants({ variant: 'link', size: "lg" }), "flex items-center rounded-full shadow-none px-0 text-lg")}>
              Read More <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}
