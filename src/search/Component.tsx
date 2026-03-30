'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchIcon } from 'lucide-react'

export const Search: React.FC = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [value, setValue] = useState(query)
  const router = useRouter()

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    // Prevent unneeded routing if the debounced value hasn't changed from the URL query
    if (debouncedValue !== query) {
      router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`)
    }
  }, [debouncedValue, query, router])

  return (
    <div>
      <form
        className="flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          if (value !== query) {
            router.push(`/search${value ? `?q=${value}` : ''}`)
          }
        }}
      >
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <div className="relative w-full">
          <Input
            id="search"
            onChange={(event) => {
              setValue(event.target.value)
            }}
            placeholder="Search..."
            value={value}
            className="pr-10"
          />
          <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 text-muted-foreground pointer-events-none" />
        </div>
        <Button type="submit">
          Search
        </Button>
      </form>
    </div>
  )
}
