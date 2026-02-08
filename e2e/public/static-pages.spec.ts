import { test, expect } from '@playwright/test'
import { expectPublicHeader, expectFooter } from '../helpers/assertions'

/**
 * Static Pages E2E Tests
 *
 * 정적 페이지 5개:
 * - /about: GML 소개
 * - /faq: 자주 묻는 질문
 * - /terms: 이용약관
 * - /privacy: 개인정보처리방침
 * - /disclaimer: 면책조항
 *
 * Total: ~12 tests
 */

test.describe('About Page', () => {
  test('should display about page with mission and 501(c)(3) info', async ({
    page
  }) => {
    await page.goto('/about')

    // Header & Footer
    await expectPublicHeader(page)
    await expectFooter(page)

    // Page title (공통 title 사용 중)
    await expect(page).toHaveTitle(/GML/)

    // Main heading
    await expect(
      page.getByRole('heading', { name: /GML 소개/i })
    ).toBeVisible()

    // Key sections (first()로 strict mode 방지)
    await expect(page.getByText(/우리의 미션/i).first()).toBeVisible()
    await expect(page.getByText(/501\(c\)\(3\)/i).first()).toBeVisible()
  })

  test('should display mission statement', async ({ page }) => {
    await page.goto('/about')

    // Mission 섹션 확인
    const missionSection = page.locator('text=우리의 미션').locator('..')
    await expect(missionSection).toBeVisible()
  })

  test('should display organization info', async ({ page }) => {
    await page.goto('/about')

    // 비영리 법인 정보 (실제 페이지 텍스트, first()로 strict mode 방지)
    await expect(page.getByText(/미국 텍사스에 소재한/i)).toBeVisible()
    await expect(page.getByText(/비영리 법인/i).first()).toBeVisible()
  })
})

test.describe('FAQ Page', () => {
  test('should display FAQ page with categories', async ({ page }) => {
    await page.goto('/faq')

    // Header & Footer
    await expectPublicHeader(page)
    await expectFooter(page)

    // Page title (공통 title 사용 중)
    await expect(page).toHaveTitle(/GML/)

    // Main heading (h1만 선택)
    await expect(page.locator('h1').getByText(/자주 묻는 질문/i)).toBeVisible()
  })

  test('should display FAQ categories', async ({ page }) => {
    await page.goto('/faq')

    // 카테고리별 섹션 확인 (mock 데이터의 실제 카테고리)
    await expect(
      page.getByRole('heading', { name: '일반', exact: true })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: '결제', exact: true })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: '멘토', exact: true })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: '기부', exact: true })
    ).toBeVisible()
  })

  test('should expand and collapse FAQ items', async ({ page }) => {
    await page.goto('/faq')

    // 첫 번째 FAQ 항목 찾기 (details 엘리먼트)
    const firstFaqItem = page.locator('details').first()
    await expect(firstFaqItem).toBeVisible()

    // 초기 상태: 닫혀있음
    const summary = firstFaqItem.locator('summary')
    await expect(summary).toBeVisible()

    // 클릭하여 열기
    await summary.click()

    // 내용이 보이는지 확인 (open 속성)
    await expect(firstFaqItem).toHaveAttribute('open', '')

    // 다시 클릭하여 닫기
    await summary.click()

    // 닫힌 상태 확인
    await expect(firstFaqItem).not.toHaveAttribute('open')
  })
})

test.describe('Terms of Service Page', () => {
  test('should display terms page', async ({ page }) => {
    await page.goto('/terms')

    // Header & Footer
    await expectPublicHeader(page)
    await expectFooter(page)

    // Page title (공통 title 사용 중)
    await expect(page).toHaveTitle(/GML/)

    // Main heading (h1만 선택)
    await expect(page.locator('h1').getByText(/이용약관/i)).toBeVisible()

    // "정책 확정 필요" 뱃지
    await expect(page.getByText(/정책 확정 필요/i).first()).toBeVisible()
  })

  test('should display policy pending notice', async ({ page }) => {
    await page.goto('/terms')

    // 목업 안내 및 정책 준비 메시지 (실제 페이지 텍스트)
    await expect(page.getByText(/MVP 목업용입니다/i)).toBeVisible()
    await expect(page.getByText(/정책 확정 필요/i).first()).toBeVisible()
  })
})

test.describe('Privacy Policy Page', () => {
  test('should display privacy policy page', async ({ page }) => {
    await page.goto('/privacy')

    // Header & Footer
    await expectPublicHeader(page)
    await expectFooter(page)

    // Page title (공통 title 사용 중)
    await expect(page).toHaveTitle(/GML/)

    // Main heading (h1만 선택)
    await expect(
      page.locator('h1').getByText(/개인정보처리방침/i)
    ).toBeVisible()

    // "정책 확정 필요" 뱃지
    await expect(page.getByText(/정책 확정 필요/i).first()).toBeVisible()
  })

  test('should display policy pending notice', async ({ page }) => {
    await page.goto('/privacy')

    // 수집 항목 및 목적 (실제 페이지 텍스트)
    await expect(page.getByText(/수집 항목:/i)).toBeVisible()
    await expect(page.getByText(/정책 확정 필요/i).first()).toBeVisible()
  })
})

test.describe('Disclaimer Page', () => {
  test('should display disclaimer page', async ({ page }) => {
    await page.goto('/disclaimer')

    // Header & Footer
    await expectPublicHeader(page)
    await expectFooter(page)

    // Page title (공통 title 사용 중)
    await expect(page).toHaveTitle(/GML/)

    // Main heading (h1만 선택)
    await expect(page.locator('h1').getByText(/면책고지/i)).toBeVisible()

    // "정책 확정 필요" 뱃지
    await expect(page.getByText(/정책 확정 필요/i).first()).toBeVisible()
  })

  test('should display policy pending notice', async ({ page }) => {
    await page.goto('/disclaimer')

    // 면책 범위 안내 (실제 페이지 텍스트)
    await expect(page.getByText(/멘토링은 정보 제공 목적/i)).toBeVisible()
    await expect(page.getByText(/정책 확정 필요/i).first()).toBeVisible()
  })
})
