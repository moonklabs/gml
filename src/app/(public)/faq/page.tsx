import { mockFAQs } from '@/lib/mock-data'

export default function FAQPage() {
  // 카테고리별로 그룹화
  const categories = Array.from(new Set(mockFAQs.map((faq) => faq.category)))

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 페이지 헤더 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">자주 묻는 질문</h1>
        <p className="text-xl text-gray-600">
          GML 플랫폼 이용에 대한 궁금한 점을 확인하세요
        </p>
      </div>

      {/* 카테고리별 FAQ */}
      {categories.map((category) => {
        const categoryFAQs = mockFAQs.filter((faq) => faq.category === category)
        return (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">{category}</h2>
            <div className="space-y-4">
              {categoryFAQs.map((faq) => (
                <details
                  key={faq.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <summary className="font-semibold text-lg list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <svg
                      className="w-5 h-5 text-gray-400 transition-transform"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )
      })}

      {/* 추가 문의 안내 */}
      <section className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
        <h3 className="text-xl font-bold mb-2">더 궁금한 점이 있으신가요?</h3>
        <p className="text-gray-600 mb-4">
          위 FAQ에서 답을 찾지 못하셨다면, 이메일로 문의해 주세요.
        </p>
        <a
          href="mailto:support@globalmissionlight.org"
          className="text-blue-600 hover:underline font-semibold"
        >
          support@globalmissionlight.org
        </a>
      </section>
    </div>
  )
}
