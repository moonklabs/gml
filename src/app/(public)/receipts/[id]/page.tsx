'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getReceiptById } from '@/lib/mock-data'

function getStatement(mode: 'A' | 'B', fmv: number, taxDeductibleAmount: number) {
  if (mode === 'A') {
    return 'No goods or services were provided in exchange for this contribution.'
  }

  return `The estimated fair market value of services received is $${fmv.toFixed(2)}. Your tax-deductible amount is $${taxDeductibleAmount.toFixed(2)}.`
}

export default function ReceiptDetailPage() {
  const params = useParams<{ id: string }>()
  const [mode, setMode] = useState<'A' | 'B'>('A')
  const receipt = useMemo(() => getReceiptById(params.id), [params.id])

  if (!receipt) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Card>
          <CardHeader><CardTitle>영수증을 찾을 수 없습니다.</CardTitle></CardHeader>
          <CardContent>
            <Link href="/receipts"><Button>목록으로 돌아가기</Button></Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const statement = getStatement(mode, receipt.services_fmv_usd, receipt.tax_deductible_amount_usd)

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">영수증 상세</h1>
        <Link href="/receipts"><Button variant="ghost">목록으로</Button></Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{receipt.receipt_number}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between"><span>단체명</span><span>Global Mission Light</span></div>
          <div className="flex justify-between"><span>EIN</span><span>정책 확정 필요</span></div>
          <div className="flex justify-between"><span>501(c)(3) 승인일</span><span>정책 확정 필요</span></div>
          <div className="flex justify-between"><span>기부자</span><span>{receipt.donor_name} ({receipt.donor_email})</span></div>
          <div className="flex justify-between"><span>발급일</span><span>{receipt.issue_date}</span></div>
          <div className="flex justify-between font-semibold"><span>기부금액</span><span>${receipt.amount_usd.toFixed(2)}</span></div>

          <div className="pt-2">
            <p className="font-medium mb-2">Quid Pro Quo 문구 시뮬레이션</p>
            <div className="flex gap-2 mb-3">
              <Button size="sm" variant={mode === 'A' ? 'default' : 'outline'} onClick={() => setMode('A')}>Option A</Button>
              <Button size="sm" variant={mode === 'B' ? 'default' : 'outline'} onClick={() => setMode('B')}>Option B</Button>
            </div>
            <div className="rounded-md border bg-gray-50 p-3 text-gray-700">{statement}</div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button>PDF 재다운로드</Button>
            <Button variant="outline">이메일 재발송</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
