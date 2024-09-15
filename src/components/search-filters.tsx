import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from 'next/navigation'

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


const searchFilterFormSchema = z.object({
  language: z.string().optional(),
  country: z.string().optional(),
})

export type SearchFilterFormValues = z.infer<typeof searchFilterFormSchema>

export default function SearchFilters() {
  const router = useRouter()
  const urlSearchParams = useSearchParams()

  const form = useForm<SearchFilterFormValues>({
    resolver: zodResolver(searchFilterFormSchema),
    defaultValues: {
      language: urlSearchParams.get('language') || "",
      country: urlSearchParams.get('country') || "",
    },
  })

  const [isFilterChanged, setIsFilterChanged] = useState(false)

  useEffect(() => {
    const subscription = form.watch((value) => {
      const initialValues = {
        language: urlSearchParams.get('language') || "",
        country: urlSearchParams.get('country') || "",
      }
      const hasChanged = Object.keys(initialValues).some(
        (key) => value[key as keyof SearchFilterFormValues] !== initialValues[key as keyof SearchFilterFormValues]
      )
      setIsFilterChanged(hasChanged)
    })
    return () => subscription.unsubscribe()
  }, [form, urlSearchParams])

  function onSubmit(data: SearchFilterFormValues) {
    setIsFilterChanged(false)
    const params = new URLSearchParams()
    const searchQuery = urlSearchParams.get('query') || ""

    params.set('query', searchQuery)

    for (const [key, value] of Object.entries(data)) {
      if (value !== "") {
        params.set(key, value)
      }
    }

    const queryString = params.toString()
    console.log("Query string:", queryString)

    router.push(`/search?${queryString}`)
  }

  function resetField(fieldName: keyof SearchFilterFormValues) {
    form.setValue(fieldName, "")
    form.trigger(fieldName)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
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