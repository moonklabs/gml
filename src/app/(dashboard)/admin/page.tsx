import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const cards = [
  { href: '/admin/mentors', title: '멘토 승인 콘솔', desc: '신청 목록 확인, 승인/반려 시뮬레이션' },
  { href: '/admin/donations', title: '결제/영수증 모니터링', desc: '결제 상태, 환불, 재발송 시뮬레이션' },
  { href: '/admin/recipients', title: '기부처 관리', desc: '기부처 CRUD 목업 화면' },
  { href: '/admin/reports', title: '임팩트 리포트 관리', desc: '초안/발행 상태 전환 시뮬레이션' },
]

export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">운영 콘솔</h1>
        <p className="text-gray-600 mt-2">운영자 기준 핵심 관리 기능을 목업으로 시뮬레이션합니다.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <Link href={card.href} key={card.href}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-blue-600 text-sm">바로가기 →</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
