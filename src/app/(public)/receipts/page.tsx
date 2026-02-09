import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { mockReceipts } from '@/lib/mock-data'

export default function ReceiptsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">기부 영수증</h1>
        <p className="text-gray-600 mt-2">결제 완료 건의 영수증을 확인하고 재다운로드할 수 있습니다.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>영수증 목록</CardTitle>
          <CardDescription>Quid Pro Quo 문구 A/B 비교는 상세 페이지에서 확인하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="py-2">영수증 번호</th>
                  <th className="py-2">발급일</th>
                  <th className="py-2">금액</th>
                  <th className="py-2">상태</th>
                  <th className="py-2">작업</th>
                </tr>
              </thead>
              <tbody>
                {mockReceipts.map((receipt) => (
                  <tr key={receipt.id} className="border-b">
                    <td className="py-2 font-medium">{receipt.receipt_number}</td>
                    <td className="py-2">{receipt.issue_date}</td>
                    <td className="py-2">${receipt.amount_usd.toFixed(2)}</td>
                    <td className="py-2">
                      <span className="rounded-full bg-blue-50 text-blue-700 px-2 py-1 text-xs">{receipt.status}</span>
                    </td>
                    <td className="py-2">
                      <Link href={`/receipts/${receipt.id}`}>
                        <Button size="sm" variant="outline">상세 보기</Button>
                      </Link>
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
