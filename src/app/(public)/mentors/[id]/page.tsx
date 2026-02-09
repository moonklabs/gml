// import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getMentorById } from '@/lib/mock-data'

export default async function MentorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // const supabase = await createClient()
  const { id } = await params

  // 목 데이터에서 멘토 프로필 조회
  // TODO: Supabase 복구 시 아래 주석 해제
  // const { data: mentor } = await supabase
  //   .from('mentor_profiles')
  //   .select(`
  //     *,
  //     profiles:user_id (
  //       full_name,
  //       avatar_url
  //     ),
  //     mentor_specialties (
  //       specialties (
  //         name_ko,
  //         slug
  //       )
  //     )
  //   `)
  //   .eq('id', id)
  //   .eq('is_active', true)
  //   .eq('is_approved', true)
  //   .single()

  const mentor = getMentorById(id)

  if (!mentor) {
    notFound()
  }

  const profile = Array.isArray(mentor.profiles) ? mentor.profiles[0] : mentor.profiles
  const specialties = mentor.mentor_specialties || []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 프로필 헤더 */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-start gap-6">
            {profile?.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={profile.full_name || '멘토'}
                width={128}
                height={128}
                className="rounded-full"
              />
            ) : (
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-5xl text-blue-600">
                  {profile?.full_name?.charAt(0) || 'M'}
                </span>
              </div>
            )}
            <div className="flex-1">
              <CardTitle className="text-3xl mb-2">
                {profile?.full_name || '익명 멘토'}
              </CardTitle>
              {mentor.job_title && mentor.company && (
                <p className="text-xl text-gray-600 mb-2">
                  {mentor.job_title} @ {mentor.company}
                </p>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {mentor.location && <span>📍 {mentor.location}</span>}
                {mentor.linkedin_url && (
                  <a
                    href={mentor.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    LinkedIn →
                  </a>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 메인 콘텐츠 */}
        <div className="lg:col-span-2 space-y-8">
          {/* 소개 */}
          <Card>
            <CardHeader>
              <CardTitle>소개</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">
                {mentor.bio || '멘토 소개가 준비 중입니다.'}
              </p>
            </CardContent>
          </Card>

          {/* 전문분야 */}
          {specialties.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>전문분야</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {specialties.map((item, index) => {
                    const specialty = item.specialties
                    return (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {specialty?.name_ko}
                      </span>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 사이드바 - 세션 정보 */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>멘토링 세션</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">세션 시간</div>
                <div className="text-lg font-semibold">
                  {mentor.session_duration_minutes}분
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">세션 비용 (기부금)</div>
                <div className="text-2xl font-bold text-blue-600">
                  ${mentor.session_price_usd}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  * 결제 금액 전액이 미자립/개척교회 기부금으로 전환됩니다
                </p>
              </div>
              <Link href={`/checkout?mentorId=${mentor.id}`} className="block">
                <Button className="w-full" size="lg">
                  세션 예약 + 기부하기
                </Button>
              </Link>
              {mentor.calendar_url && (
                <a
                  href={mentor.calendar_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full" size="sm" variant="outline">
                    캘린더 링크 확인
                  </Button>
                </a>
              )}
              <p className="text-xs text-gray-500 text-center">
                예약 후 결제 페이지로 이동합니다
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 뒤로 가기 */}
      <div className="mt-8">
        <Link href="/mentors">
          <Button variant="ghost">← 멘토 목록으로</Button>
        </Link>
      </div>
    </div>
  )
}
