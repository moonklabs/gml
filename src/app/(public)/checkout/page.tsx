'use client'

import Link from 'next/link'
import { Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createPaymentIntentMock, getMentorById } from '@/lib/mock-data'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const mentorId = searchParams.get('mentorId') || 'mentor-1'
  const mentor = getMentorById(mentorId)

  const payment = useMemo(() => {
    if (!mentor) return null

    return createPaymentIntentMock({
      mentee_user_id: 'current-user-id',
      mentor_profile_id: mentor.id,
      amount_usd: mentor.session_price_usd,
    })
  }, [mentor])

  if (!mentor || !payment) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Card>
          <CardHeader>
            <CardTitle>잘못된 결제 요청입니다.</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/mentors">
              <Button>멘토 목록으로 돌아가기</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">결제 확인</h1>
        <p className="text-gray-600 mt-2">결제는 목업 시뮬레이션이며 실제 청구는 발생하지 않습니다.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>멘토링 세션 정보</CardTitle>
          <CardDescription>
            멘토: {mentor.profiles.full_name} · {mentor.job_title}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between"><span>세션 시간</span><span>{mentor.session_duration_minutes}분</span></div>
          <div className="flex justify-between"><span>세션 가격(기부금)</span><span>${payment.amount_usd.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>결제 수수료(멘티 부담)</span><span>${payment.processing_fee_usd.toFixed(2)}</span></div>
          <div className="border-t pt-3 flex justify-between text-lg font-semibold"><span>총 결제 금액</span><span>${payment.total_charged_usd.toFixed(2)}</span></div>
          <div className="rounded-md bg-yellow-50 border border-yellow-200 p-3 text-yellow-800 text-xs">
            정책 확정 필요: Quid Pro Quo 문구, 환불/공제 정책은 법률 검토 후 최종 반영됩니다.
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Link href={`/checkout/result?status=paid&mentorId=${mentor.id}&pi=${payment.id}`}>
          <Button className="w-full">결제 성공 시뮬레이션</Button>
        </Link>
        <Link href={`/checkout/result?status=failed&mentorId=${mentor.id}&pi=${payment.id}`}>
          <Button variant="outline" className="w-full">결제 실패 시뮬레이션</Button>
        </Link>
        <Link href={`/checkout/result?status=cancelled&mentorId=${mentor.id}&pi=${payment.id}`}>
          <Button variant="secondary" className="w-full">결제 취소 시뮬레이션</Button>
        </Link>
        <Link href={`/checkout/result?status=refunded&mentorId=${mentor.id}&pi=${payment.id}`}>
          <Button variant="destructive" className="w-full">환불 시뮬레이션</Button>
        </Link>
      </div>

      <div className="flex gap-2">
        <Link href={`/mentors/${mentor.id}`}>
          <Button variant="ghost">← 멘토 상세로</Button>
        </Link>
        <Link href="/receipts">
          <Button variant="link">영수증 목록 보기</Button>
        </Link>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto px-4 py-12">로딩 중...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
