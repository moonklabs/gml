import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default async function MentorsPage() {
  const supabase = await createClient()

  // 승인된 활성 멘토 목록 조회
  const { data: mentors } = await supabase
    .from('mentor_profiles')
    .select(`
      *,
      profiles:user_id (
        full_name,
        avatar_url
      )
    `)
    .eq('is_active', true)
    .eq('is_approved', true)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">전문가 멘토 찾기</h1>
        <p className="text-xl text-gray-600">
          다양한 분야의 전문가와 함께 성장하세요
        </p>
      </div>

      {/* TODO: 검색 및 필터 추가 */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors && mentors.length > 0 ? (
          mentors.map((mentor) => {
            const profile = Array.isArray(mentor.profiles) ? mentor.profiles[0] : mentor.profiles

            return (
              <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
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
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">
              현재 활동 중인 멘토가 없습니다.
            </p>
            <Link href="/auth/signup" className="inline-block mt-4">
              <Button>첫 번째 멘토가 되어보세요</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
