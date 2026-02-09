import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getImpactReportById } from '@/lib/mock-data'

export default async function ImpactReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const report = getImpactReportById(id)

  if (!report) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">{report.title}</h1>
          <p className="text-gray-600 mt-1">리포트 기간: {report.report_period}</p>
        </div>
        <Link href="/impact"><Button variant="ghost">목록으로</Button></Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>요약 지표</CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-4 gap-4 text-sm">
          <div><p className="text-gray-500">총 기부금</p><p className="text-xl font-bold text-blue-600">${report.total_donated_usd.toLocaleString()}</p></div>
          <div><p className="text-gray-500">멘토</p><p className="text-xl font-bold">{report.total_mentors}명</p></div>
          <div><p className="text-gray-500">멘티</p><p className="text-xl font-bold">{report.total_mentees}명</p></div>
          <div><p className="text-gray-500">세션</p><p className="text-xl font-bold">{report.total_sessions}회</p></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>상세 내용</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{report.content}</div>
        </CardContent>
      </Card>
    </div>
  )
}
