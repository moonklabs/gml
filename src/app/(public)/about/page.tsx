import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 페이지 헤더 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">GML 소개</h1>
        <p className="text-xl text-gray-600">
          Global Mission Light - 재능으로 섬기고, 도움받으며 기부하는 플랫폼
        </p>
      </div>

      {/* 미션 */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">우리의 미션</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 space-y-4">
            <p>
              GML(Global Mission Light)은 미국 텍사스에 소재한 <strong>501(c)(3) 비영리 법인</strong>으로,
              전문가의 재능기부 멘토링과 기독교 선교를 결합한 독특한 플랫폼입니다.
            </p>
            <p>
              우리는 세 가지 핵심 가치를 실현합니다:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>멘토</strong>: 자신의 전문성과 경험을 재능기부로 나누며 섬김의 삶을 실천합니다</li>
              <li><strong>멘티</strong>: 전문가 멘토링을 통해 성장하며 동시에 선교에 참여합니다</li>
              <li><strong>교회</strong>: 모든 세션 비용이 100% 기부금으로 전환되어 미자립/개척교회를 지원합니다</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 어떻게 동작하나요? */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">어떻게 동작하나요?</h2>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. 멘토는 재능기부로 섬깁니다</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              <p>
                다양한 분야의 전문가(소프트웨어 엔지니어, 경영 컨설턴트, 재무 전문가, 목회자 등)가
                자신의 시간과 전문성을 재능기부로 제공합니다. 멘토는 어떠한 금전적 보상도 받지 않으며,
                순수하게 섬김의 마음으로 멘토링을 진행합니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. 멘티는 세션 비용을 지불합니다</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              <p>
                멘티는 각 멘토가 설정한 세션 비용을 지불합니다. 이 금액은 멘토의 전문성과 시간의 가치를
                반영한 것이지만, <strong>멘토에게는 전달되지 않습니다</strong>.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. 모든 비용이 기부금으로 전환됩니다</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              <p>
                멘티가 지불한 세션 비용 <strong>100%</strong>가 한국의 미자립 교회 및 개척 교회를 지원하는
                기부금으로 전환됩니다. 결제 처리 수수료(Stripe 수수료)는 멘티가 추가로 부담하여,
                세션 비용 전액이 온전히 선교 목적으로 사용됩니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. 투명한 기부금 사용</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              <p>
                매월 임팩트 리포트를 통해 기부금 사용 내역을 투명하게 공개합니다.
                멘티에게는 IRS 공인 <strong>501(c)(3) 세금 공제용 기부 영수증</strong>이 발급됩니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 501(c)(3) 안내 */}
      <section className="mb-12">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl">501(c)(3) 비영리 법인</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 space-y-4">
            <p>
              GML은 미국 국세청(IRS)으로부터 <strong>501(c)(3)</strong> 인증을 받은 비영리 단체입니다.
            </p>
            <p>
              <strong>이는 다음을 의미합니다:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>모든 기부금은 세금 공제 대상입니다 (Tax-Deductible)</li>
              <li>GML은 영리 목적으로 운영되지 않으며, 모든 수입은 선교 목적으로만 사용됩니다</li>
              <li>투명한 재무 보고 의무가 있으며, 정기적으로 감사를 받습니다</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="text-center">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">GML과 함께하세요</h2>
          <p className="text-gray-700 mb-6">
            재능으로 섬기거나, 멘토링을 받으며 선교에 참여하세요
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/mentors">
              <Button size="lg">멘토 찾기</Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline">
                멘토 되기
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
