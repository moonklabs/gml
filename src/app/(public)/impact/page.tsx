import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatedCounter } from '@/components/impact/animated-counter'
import {
  mockImpactStats,
  mockDonationRecipients,
  mockImpactReports,
} from '@/lib/mock-data'

export default function ImpactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 페이지 헤더 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">우리의 임팩트</h1>
        <p className="text-xl text-gray-600">
          GML 플랫폼을 통해 만들어진 변화를 확인하세요
        </p>
      </div>

      {/* 전체 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardDescription>총 기부금</CardDescription>
            <CardTitle className="text-4xl text-blue-600">
              <AnimatedCounter
                value={mockImpactStats.totalDonatedUsd}
                prefix="$"
                duration={2500}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              멘티가 결제한 세션 비용 전액이 기부금으로 전환되었습니다
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>활동 중인 멘토</CardDescription>
            <CardTitle className="text-4xl text-green-600">
              <AnimatedCounter value={mockImpactStats.totalMentors} duration={2000} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              재능기부로 섬기는 전문가 멘토 수
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>도움받은 멘티</CardDescription>
            <CardTitle className="text-4xl text-purple-600">
              <AnimatedCounter value={mockImpactStats.totalMentees} duration={2000} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              전문가 멘토링을 통해 성장한 멘티 수
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>진행된 세션</CardDescription>
            <CardTitle className="text-4xl text-orange-600">
              <AnimatedCounter value={mockImpactStats.totalSessions} duration={2000} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              총 멘토링 세션 수
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 기부처 소개 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">기부금 수령 교회</h2>
        <p className="text-gray-600 mb-8">
          GML을 통해 모인 기부금은 한국의 미자립/개척교회를 지원하는 데 사용됩니다.
        </p>
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

      {/* 임팩트 리포트 아카이브 */}
      <section>
        <h2 className="text-3xl font-bold mb-6">임팩트 리포트</h2>
        <p className="text-gray-600 mb-8">
          매월 발행되는 임팩트 리포트를 통해 투명하게 기부금 사용 내역을 확인하실 수 있습니다.
        </p>
        <div className="space-y-6">
          {mockImpactReports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{report.title}</CardTitle>
                    <CardDescription>{report.report_period}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">기부금 합계</div>
                    <div className="text-2xl font-bold text-blue-600">
                      ${report.total_donated_usd.toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-500">참여 멘토</div>
                    <div className="text-xl font-semibold">{report.total_mentors}명</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">도움받은 멘티</div>
                    <div className="text-xl font-semibold">{report.total_mentees}명</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">진행된 세션</div>
                    <div className="text-xl font-semibold">{report.total_sessions}회</div>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none">
                  {/* Markdown 렌더링은 추후 라이브러리 추가 시 개선 */}
                  <div className="whitespace-pre-wrap text-gray-700">{report.content}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
