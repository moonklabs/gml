import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">면책고지 (목업)</h1>
      <Card>
        <CardHeader>
          <CardTitle>면책 범위</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-700">
          <p>멘토링은 정보 제공 목적이며, 법률/세무/투자 판단의 최종 책임은 사용자에게 있습니다.</p>
          <p>기부처 및 기부금 배분 방식은 운영 정책에 따라 변경될 수 있습니다.</p>
          <p>세금 공제 가능 여부는 개인 상황과 최신 법령에 따라 달라질 수 있습니다.</p>
          <span className="inline-block rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-xs text-yellow-800">
            정책 확정 필요
          </span>
        </CardContent>
      </Card>
    </div>
  )
}
