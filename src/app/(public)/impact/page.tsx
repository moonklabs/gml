import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatedCounter } from '@/components/impact/animated-counter'
import {
  mockImpactStats,
  mockDonationRecipients,
  mockImpactReports,
  mockImpactTrend,
  mockImpactByCategory,
} from '@/lib/mock-data'

export default function ImpactPage() {
  const publishedReports = mockImpactReports.filter((report) => report.status === 'published')
  const maxTrend = Math.max(...mockImpactTrend.map((item) => item.amount_usd))
  const maxCategory = Math.max(...mockImpactByCategory.map((item) => item.sessions))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">우리의 임팩트</h1>
        <p className="text-xl text-gray-600">GML 플랫폼을 통해 만들어진 변화를 확인하세요</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardDescription>총 기부금</CardDescription>
            <CardTitle className="text-4xl text-blue-600">
              <AnimatedCounter value={mockImpactStats.totalDonatedUsd} prefix="$" duration={2500} />
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>활동 중인 멘토</CardDescription>
            <CardTitle className="text-4xl text-green-600">
              <AnimatedCounter value={mockImpactStats.totalMentors} duration={2000} />
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>도움받은 멘티</CardDescription>
            <CardTitle className="text-4xl text-purple-600">
              <AnimatedCounter value={mockImpactStats.totalMentees} duration={2000} />
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>진행된 세션</CardDescription>
            <CardTitle className="text-4xl text-orange-600">
              <AnimatedCounter value={mockImpactStats.totalSessions} duration={2000} />
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <section>
        <h2 className="text-3xl font-bold mb-6">월별 기부 추이 (목업 차트)</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-5 gap-3 items-end h-52">
              {mockImpactTrend.map((item) => (
                <div key={item.month} className="flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t bg-blue-500"
                    style={{ height: `${Math.max((item.amount_usd / maxTrend) * 180, 16)}px` }}
                  />
                  <div className="text-xs text-gray-500">{item.month.slice(5)}</div>
                  <div className="text-xs font-medium">${item.amount_usd.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">전문분야별 세션 분포 (목업 차트)</h2>
        <Card>
          <CardContent className="pt-6 space-y-3">
            {mockImpactByCategory.map((item) => (
              <div key={item.category} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.category}</span>
                  <span>{item.sessions}회</span>
                </div>
                <div className="h-3 rounded bg-gray-100 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500"
                    style={{ width: `${(item.sessions / maxCategory) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">기부금 수령 교회</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {mockDonationRecipients.map((recipient) => (
            <Card key={recipient.id}>
              <CardHeader>
                <CardTitle>{recipient.name}</CardTitle>
                <CardDescription>📍 {recipient.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{recipient.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">임팩트 리포트 아카이브</h2>
        <div className="space-y-4">
          {publishedReports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle>{report.title}</CardTitle>
                    <CardDescription>{report.report_period}</CardDescription>
                  </div>
                  <div className="text-blue-600 font-semibold">${report.total_donated_usd.toLocaleString()}</div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href={`/impact/${report.id}`}>
                  <span className="text-blue-600 hover:underline text-sm">리포트 상세 보기 →</span>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
