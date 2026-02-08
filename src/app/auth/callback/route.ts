// import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  // const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  // Mock mode: Skip OAuth code exchange for frontend review
  // TODO: Uncomment when Supabase is restored
  // if (code) {
  //   const supabase = await createClient()
  //   await supabase.auth.exchangeCodeForSession(code)
  // }

  // OAuth 로그인 후 대시보드로 리다이렉트
  return NextResponse.redirect(`${origin}/profile`)
}
