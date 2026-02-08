import { type NextRequest, NextResponse } from 'next/server'
// import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Mock mode: Skip Supabase session update for frontend review
  // TODO: Uncomment when Supabase is restored
  // return await updateSession(request)

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * 다음을 제외한 모든 요청 경로에 미들웨어 적용:
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘 파일)
     * - 이미지 확장자를 가진 public 폴더의 파일
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
