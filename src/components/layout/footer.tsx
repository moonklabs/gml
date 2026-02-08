import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold text-blue-600 mb-4">Global Mission Light</h3>
            <p className="text-gray-600 text-sm">
              재능으로 섬기고, 도움받으며 기부하세요.
              <br />
              모든 기부금은 한국의 미자립/개척교회를 지원합니다.
            </p>
            <p className="text-gray-500 text-xs mt-4">
              Global Mission Light는 501(c)(3) 비영리 단체입니다.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">서비스</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/mentors" className="hover:text-blue-600 transition">멘토 찾기</Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-blue-600 transition">임팩트</Link>
              </li>
              <li>
                <Link href="/receipts" className="hover:text-blue-600 transition">영수증</Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-blue-600 transition">멘토 되기</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">정책</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-blue-600 transition">소개</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-blue-600 transition">FAQ</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-600 transition">이용약관</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-600 transition">개인정보처리방침</Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-blue-600 transition">면책고지</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Global Mission Light. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
