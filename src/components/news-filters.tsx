import React, { useCallback, useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from 'next/navigation'

const categories = {
  'General': 'general',
  'Business': 'business',
  'Entertainment': 'entertainment',
  'Health': 'health',
  'Science': 'science',
  'Sports': 'sports',
  'Technology': 'technology'
}

const languages = {
  Arabic: 'ar',
  Chinese: 'zh',
  Dutch: 'nl',
  English: 'en',
  French: 'fr',
  German: 'de',
  Greek: 'el',
  Hebrew: 'he',
  Hindi: 'hi',
  Italian: 'it',
  Japanese: 'ja',
  Malayalam: 'ml',
  Marathi: 'mr',
  Norwegian: 'no',
  Portuguese: 'pt',
  Romanian: 'ro',
  Russian: 'ru',
  Spanish: 'es',
  Swedish: 'sv',
  Tamil: 'ta',
  Telugu: 'te',
  Ukrainian: 'uk'
}

const countries = {
  Australia: 'au',
  Brazil: 'br',
  Canada: 'ca',
  China: 'cn',
  Egypt: 'eg',
  France: 'fr',
  Germany: 'de',
  Greece: 'gr',
  'Hong Kong': 'hk',
  India: 'in',
  Ireland: 'ie',
  Israel: 'il',
  Italy: 'it',
  Japan: 'jp',
  Netherlands: 'nl',
  Norway: 'no',
  Pakistan: 'pk',
  Peru: 'pe',
  Philippines: 'ph',
  Portugal: 'pt',
  Romania: 'ro',
  'Russian Federation': 'ru',
  Singapore: 'sg',
  Spain: 'es',
  Sweden: 'se',
  Switzerland: 'ch',
  Taiwan: 'tw',
  Ukraine: 'ua',
  'United Kingdom': 'gb',
  'United States': 'us'
}

const newsFilterFormSchema = z.object({
  category: z.string().optional(),
  language: z.string().optional(),
  country: z.string().optional(),
})

export type NewsFilterFormValues = z.infer<typeof newsFilterFormSchema>

export default function NewsFilters() {
  const router = useRouter()
  const urlSearchParams = useSearchParams()

  const form = useForm<NewsFilterFormValues>({
    resolver: zodResolver(newsFilterFormSchema),
    defaultValues: {
      category: urlSearchParams.get('category') || "",
      language: urlSearchParams.get('language') || "",
      country: urlSearchParams.get('country') || "",
    },
  })

  const [isFilterChanged, setIsFilterChanged] = useState(false)

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      const initialValues = {
        category: urlSearchParams.get('category') || "",
        language: urlSearchParams.get('language') || "",
        country: urlSearchParams.get('country') || "",
      }
      const hasChanged = Object.keys(initialValues).some(
        (key) => value[key as keyof NewsFilterFormValues] !== initialValues[key as keyof NewsFilterFormValues]
      )
      setIsFilterChanged(hasChanged)
    })
    return () => subscription.unsubscribe()
  }, [form, urlSearchParams])

  function onSubmit(data: NewsFilterFormValues) {
    setIsFilterChanged(false)
    const params = new URLSearchParams()

    for (const [key, value] of Object.entries(data)) {
      if (value !== "") {
        params.set(key, value)
      }
    }

    const queryString = params.toString()
    console.log("Query string:", queryString)

    router.push(`/?${queryString}`)
  }

  function resetField(fieldName: keyof NewsFilterFormValues) {
    form.setValue(fieldName, "")
    form.trigger(fieldName)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="py-1.5">Category</FormLabel>
                  {field.value && (
                    <Button type="button" variant="destructive" onClick={() => resetField("category")} className="h-6 px-2 text-sm">Reset</Button>
                  )}
                </div>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="py-1.5">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(categories).map(([label, value]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="py-1.5">Country</FormLabel>
                  {field.value && (
                    <Button type="button" variant="destructive" onClick={() => resetField("country")} className="h-6 px-2 text-sm">Reset</Button>
                  )}
                </div>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="py-1.5">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(countries).map(([label, value]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="py-1.5">Language</FormLabel>
                  {field.value && (
                    <Button type="button" variant="destructive" onClick={() => resetField("language")} className="h-6 px-2 text-sm">Reset</Button>
                  )}
                </div>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(languages).map(([label, value]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={!isFilterChanged}>Apply Filter</Button>
        </div>
      </form>
    </Form>
  )
}