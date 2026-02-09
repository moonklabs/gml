import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">이용약관 (목업)</h1>
      <Card>
        <CardHeader>
          <CardTitle>서비스 이용 조건</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-700">
          <p>본 문서는 MVP 목업용입니다. 법률 자문 후 정식 약관으로 교체됩니다.</p>
          <p>멘토는 재능기부로 참여하며, 멘티 결제 금액은 기부금 전환 정책을 따릅니다.</p>
          <p>환불/분쟁/준거법 조항은 정책 확정 필요 항목입니다.</p>
          <span className="inline-block rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-xs text-yellow-800">
            정책 확정 필요
          </span>
        </CardContent>
      </Card>
    </div>
  )
}
