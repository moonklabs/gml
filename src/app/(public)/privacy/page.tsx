import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">개인정보처리방침 (목업)</h1>
      <Card>
        <CardHeader>
          <CardTitle>개인정보 수집 및 처리</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-700">
          <p>수집 항목: 이름, 이메일, 프로필 정보, 결제 관련 최소 정보.</p>
          <p>처리 목적: 멘토링 연결, 기부 영수증 발급, 서비스 공지.</p>
          <p>해외 이전/보관 기간/삭제 요청 프로세스는 정책 확정 필요 항목입니다.</p>
          <span className="inline-block rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-xs text-yellow-800">
            정책 확정 필요
          </span>
        </CardContent>
      </Card>
    </div>
  )
}
