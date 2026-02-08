'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MentorCard } from '@/components/mentors/mentor-card'
import { MentorFilter } from '@/components/mentors/mentor-filter'
import { getFilteredMentors } from '@/lib/mock-data'

export default function MentorsPage() {
  const [filters, setFilters] = useState({ search: '', category: 'all' })

  // 목 데이터에서 필터링된 멘토 목록 가져오기
  const mentors = getFilteredMentors(filters)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">전문가 멘토 찾기</h1>
        <p className="text-xl text-gray-600">
          다양한 분야의 전문가와 함께 성장하세요
        </p>
      </div>

      {/* 검색 및 필터 */}
      <MentorFilter onFilter={setFilters} />

      {/* 멘토 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors && mentors.length > 0 ? (
          mentors.map((mentor) => <MentorCard key={mentor.id} mentor={mentor} />)
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">
              검색 결과가 없습니다.
            </p>
            <Link href="/signup" className="inline-block mt-4">
              <Button>첫 번째 멘토가 되어보세요</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
