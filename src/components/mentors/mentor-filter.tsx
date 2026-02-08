'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getCategories } from '@/lib/mock-data'

interface MentorFilterProps {
  onFilter: (filters: { search: string; category: string }) => void
}

export function MentorFilter({ onFilter }: MentorFilterProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const categories = getCategories()

  const handleFilterChange = (newSearch: string, newCategory: string) => {
    setSearch(newSearch)
    setCategory(newCategory)
    onFilter({ search: newSearch, category: newCategory })
  }

  return (
    <div className="mb-8 space-y-4">
      {/* 검색바 */}
      <div>
        <Input
          type="search"
          placeholder="멘토 이름, 회사, 키워드로 검색..."
          value={search}
          onChange={(e) => handleFilterChange(e.target.value, category)}
          className="max-w-md"
        />
      </div>

      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={category === 'all' ? 'default' : 'outline'}
          onClick={() => handleFilterChange(search, 'all')}
          size="sm"
        >
          전체
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={category === cat ? 'default' : 'outline'}
            onClick={() => handleFilterChange(search, cat)}
            size="sm"
          >
            {cat}
          </Button>
        ))}
      </div>
    </div>
  )
}
