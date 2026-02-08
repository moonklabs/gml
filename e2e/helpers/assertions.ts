import { expect, type Page } from '@playwright/test'

/**
 * 공통 검증 헬퍼 함수들
 *
 * Header, Footer, Sidebar 등 레이아웃 컴포넌트의 존재 여부를 검증합니다.
 */

/**
 * Public 페이지의 Header 검증
 *
 * - "GML" 로고 존재
 * - 네비게이션 링크들 (멘토 찾기, 임팩트, About 등)
 */
export async function expectPublicHeader(page: Page): Promise<void> {
  // GML 로고 (홈 링크)
  await expect(page.getByRole('link', { name: 'GML' })).toBeVisible()

  // 주요 네비게이션 링크 (Desktop만)
  // 모바일에서는 nav가 hidden md:flex로 숨겨져 있음
  const viewport = await page.viewportSize()
  const isDesktop = (viewport?.width ?? 0) >= 768

  if (isDesktop) {
    const nav = page.locator('header nav').first()
    await expect(nav).toBeVisible() // nav가 존재하는지 먼저 확인
    await expect(nav.getByRole('link', { name: '멘토 찾기' })).toBeVisible()
    await expect(nav.getByRole('link', { name: '임팩트' })).toBeVisible()
  }
}

/**
 * Footer 검증
 *
 * - "Global Mission Light" 텍스트
 * - "501(c)(3)" 비영리 법인 표시
 * - 주요 링크들 (About, FAQ, Terms 등)
 */
export async function expectFooter(page: Page): Promise<void> {
  // Footer 컨테이너
  const footer = page.locator('footer')
  await expect(footer).toBeVisible()

  // 비영리 법인 표시 (first()로 strict mode 방지)
  await expect(footer.getByText(/Global Mission Light/i).first()).toBeVisible()
  await expect(footer.getByText(/501\(c\)\(3\)/i).first()).toBeVisible()

  // 주요 링크 (일부만 검증, 실제 페이지 텍스트)
  await expect(footer.getByRole('link', { name: '소개' })).toBeVisible()
  await expect(footer.getByRole('link', { name: 'FAQ' })).toBeVisible()
}

/**
 * Dashboard Sidebar 검증
 *
 * - "프로필" 링크
 * - "세션 관리" 링크 (멘토인 경우)
 * - "멘토 대시보드" 링크 (멘토인 경우)
 *
 * Note: 모바일에서는 사이드바가 숨겨질 수 있음 (hidden md:block)
 */
export async function expectDashboardSidebar(
  page: Page,
  options?: {
    expectMentorLinks?: boolean
    expectAdminLinks?: boolean
  }
): Promise<void> {
  const viewport = await page.viewportSize()
  const isDesktop = (viewport?.width ?? 0) >= 768

  // 모바일에서는 사이드바가 숨겨질 수 있으므로 Desktop에서만 검증
  if (!isDesktop) {
    return
  }

  // 사이드바 컨테이너 (aside 또는 nav)
  const sidebar = page.locator('aside, nav').first()

  // 공통 링크
  await expect(sidebar.getByRole('link', { name: /프로필/i })).toBeVisible()

  // 멘토 전용 링크
  if (options?.expectMentorLinks) {
    await expect(sidebar.getByRole('link', { name: /세션/i })).toBeVisible()
    await expect(
      sidebar.getByRole('link', { name: /멘토 대시보드/i })
    ).toBeVisible()
  }

  // 관리자 전용 링크
  if (options?.expectAdminLinks) {
    await expect(
      sidebar.getByRole('link', { name: /운영 콘솔/i })
    ).toBeVisible()
  }
}

/**
 * 페이지 제목 검증
 *
 * @param page - Playwright Page 객체
 * @param title - 예상되는 페이지 제목 (정규식 또는 문자열)
 */
export async function expectPageTitle(
  page: Page,
  title: string | RegExp
): Promise<void> {
  await expect(page).toHaveTitle(title)
}

/**
 * 로딩 상태가 완료될 때까지 대기
 *
 * Suspense fallback이나 "로딩 중..." 텍스트가 사라질 때까지 대기
 */
export async function waitForLoading(page: Page): Promise<void> {
  // "로딩 중..." 텍스트가 있으면 사라질 때까지 대기
  const loadingText = page.getByText(/로딩 중/i)
  if (await loadingText.isVisible()) {
    await expect(loadingText).not.toBeVisible({ timeout: 10000 })
  }

  // Suspense fallback (div with "loading" role)
  const loadingSpinner = page.getByRole('status')
  if (await loadingSpinner.isVisible()) {
    await expect(loadingSpinner).not.toBeVisible({ timeout: 10000 })
  }
}
