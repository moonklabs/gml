export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            재능으로 섬기고, 도움받으며 기부하세요
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            전문가 멘토링을 받고 결제한 모든 금액이 한국의 미자립/개척교회를 지원하는 기부금으로 전환됩니다.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/mentors"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              멘토 찾기
            </a>
            <a
              href="/auth/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition"
            >
              멘토 되기
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">어떻게 진행되나요?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">멘토 찾기</h3>
              <p className="text-gray-600">
                다양한 분야의 전문가 멘토를 검색하고 프로필을 확인하세요.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">세션 예약</h3>
              <p className="text-gray-600">
                원하는 멘토의 일정을 확인하고 세션을 예약하세요.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">기부 참여</h3>
              <p className="text-gray-600">
                결제 금액 전액이 미자립/개척교회를 지원하는 기부금으로 전환됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-blue-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">우리의 임팩트</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">$0</div>
              <div className="text-xl">총 기부금</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">0</div>
              <div className="text-xl">활동 중인 멘토</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">0</div>
              <div className="text-xl">도움받은 멘티</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p className="mb-2">
            Global Mission Light는 501(c)(3) 비영리 단체입니다.
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()} Global Mission Light. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
