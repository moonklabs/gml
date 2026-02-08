import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { MentorProfile } from '@/lib/mock-data'

interface MentorCardProps {
  mentor: MentorProfile
}

export function MentorCard({ mentor }: MentorCardProps) {
  // profiles는 Join 쿼리 결과로 배열 또는 객체일 수 있음
  const profile = Array.isArray(mentor.profiles) ? mentor.profiles[0] : mentor.profiles

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-4 mb-4">
          {profile?.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={profile.full_name || '멘토'}
              width={64}
              height={64}
              className="rounded-full"
            />
          ) : (
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl text-blue-600">
                {profile?.full_name?.charAt(0) || 'M'}
              </span>
            </div>
          )}
          <div>
            <CardTitle>{profile?.full_name || '익명 멘토'}</CardTitle>
            <CardDescription>
              {mentor.job_title && mentor.company
                ? `${mentor.job_title} @ ${mentor.company}`
                : mentor.job_title || mentor.company || '전문가'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {mentor.bio || '멘토 소개가 준비 중입니다.'}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {mentor.location && <span>📍 {mentor.location}</span>}
          </div>
          <div className="text-lg font-semibold text-blue-600">
            ${mentor.session_price_usd}
          </div>
        </div>
        <Link href={`/mentors/${mentor.id}`} className="block mt-4">
          <Button className="w-full">상세보기</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
