'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { mockPaymentIntents, mockReceipts, simulatePaymentTransition, type PaymentIntentMock, type PaymentStatus } from '@/lib/mock-data'

export default function AdminDonationsPage() {
  const [payments, setPayments] = useState<PaymentIntentMock[]>(mockPaymentIntents)
  const [lastAction, setLastAction] = useState('')

  const handleStatusChange = (id: string, status: PaymentStatus) => {
    setPayments((prev) =>
      prev.map((payment) => (payment.id === id ? simulatePaymentTransition(payment, status) : payment))
    )
    setLastAction(`${id} 상태를 ${status}로 변경했습니다.`)
  }

  const handleResend = (paymentId: string) => {
    const receipt = mockReceipts.find((item) => item.payment_intent_id === paymentId)
    if (receipt) {
      setLastAction(`${receipt.receipt_number} 영수증 재발송을 시뮬레이션했습니다.`)
      return
    }

    setLastAction(`${paymentId}는 발송 가능한 영수증이 없습니다.`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">결제/영수증 모니터링</h1>
        <p className="text-gray-600 mt-2">결제 상태 및 영수증 재발송 시나리오를 시뮬레이션합니다.</p>
      </div>

      {lastAction && <div className="rounded-md bg-blue-50 border border-blue-200 p-3 text-blue-700 text-sm">{lastAction}</div>}

      <Card>
        <CardHeader>
          <CardTitle>결제 상태</CardTitle>
          <CardDescription>성공/실패/환불 상태를 전환하며 운영 플로우를 검증합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b text-left">
                <tr>
                  <th className="py-2">결제 ID</th>
                  <th className="py-2">기부금</th>
                  <th className="py-2">수수료</th>
                  <th className="py-2">총액</th>
                  <th className="py-2">상태</th>
                  <th className="py-2">액션</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b align-top">
                    <td className="py-3 font-medium">{payment.id}</td>
                    <td className="py-3">${payment.amount_usd.toFixed(2)}</td>
                    <td className="py-3">${payment.processing_fee_usd.toFixed(2)}</td>
                    <td className="py-3">${payment.total_charged_usd.toFixed(2)}</td>
                    <td className="py-3"><span className="px-2 py-1 rounded-full bg-gray-100 text-xs">{payment.status}</span></td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" onClick={() => handleStatusChange(payment.id, 'paid')}>성공</Button>
                        <Button size="sm" variant="outline" onClick={() => handleStatusChange(payment.id, 'failed')}>실패</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleStatusChange(payment.id, 'refunded')}>환불</Button>
                        <Button size="sm" variant="secondary" onClick={() => handleResend(payment.id)}>영수증 재발송</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
