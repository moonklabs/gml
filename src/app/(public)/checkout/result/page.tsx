'use client'

import Link from 'next/link'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const statusMap: Record<string, { title: string; description: string; tone: string }> = {
  paid: {
    title: '결제가 완료되었습니다',
    description: '기부 영수증이 발급되었고 멘토에게 세션 알림이 전달되었습니다.',
    tone: 'text-green-700 bg-green-50 border-green-200',
  },
  failed: {
    title: '결제에 실패했습니다',
    description: '카드 인증 또는 결제 네트워크 문제로 실패했습니다. 다시 시도해 주세요.',
    tone: 'text-red-700 bg-red-50 border-red-200',
  },
  refunded: {
    title: '결제가 환불 처리되었습니다',
    description: '기부 기록은 환불 상태로 전환되며 영수증에는 환불 이력이 표시됩니다.',
    tone: 'text-orange-700 bg-orange-50 border-orange-200',
  },
  cancelled: {
    title: '결제를 취소했습니다',
    description: '결제가 완료되지 않아 기부금이 생성되지 않았습니다.',
    tone: 'text-gray-700 bg-gray-50 border-gray-200',
  },
}

function CheckoutResultContent() {
  const searchParams = useSearchParams()
  const status = searchParams.get('status') || 'cancelled'
  const mentorId = searchParams.get('mentorId') || 'mentor-1'
  const ui = statusMap[status] || statusMap.cancelled

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{ui.title}</CardTitle>
          <CardDescription>결제 상태: <code>{status}</code></CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`border rounded-md p-4 text-sm ${ui.tone}`}>
            {ui.description}
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <p>결제 ID: <code>{searchParams.get('pi') || 'pi-mock'}</code></p>
            <p>정책 확정 필요: 환불 정책, 세금 공제 문구, 영수증 문구 최종 확정</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Link href="/receipts"><Button>영수증 확인</Button></Link>
        <Link href={`/checkout?mentorId=${mentorId}`}><Button variant="outline">결제 다시 시뮬레이션</Button></Link>
        <Link href={`/mentors/${mentorId}`}><Button variant="ghost">멘토 상세로 돌아가기</Button></Link>
      </div>
    </div>
  )
}

export default function CheckoutResultPage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto px-4 py-12">로딩 중...</div>}>
      <CheckoutResultContent />
    </Suspense>
  )
}
