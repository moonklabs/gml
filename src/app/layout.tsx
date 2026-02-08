import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GML - 크리스챤 기부 멘토링 플랫폼',
  description: '전문가 멘토링을 받고 기부에 참여하세요. 모든 기부금은 미자립/개척교회를 지원합니다.',
  keywords: ['멘토링', '기부', '크리스챤', '교회', 'nonprofit'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
