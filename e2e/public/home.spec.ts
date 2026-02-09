import { test, expect } from '@playwright/test'
import { expectPublicHeader, expectFooter } from '../helpers/assertions'

/**
 * Home Page E2E Tests
 *
 * 랜딩 페이지 (/):
 * - Hero Section
 * - How It Works (3단계)
 * - Impact Stats (AnimatedCounter)
 * - Featured Mentors (3개)
 * - FAQ Preview (4개)
 *
 * Total: ~9 tests
 */

test.describe('Home Page', () => {
  test('should display hero section with main heading and CTAs', async ({
    page
  }) => {
    await page.goto('/')

    // Header & Footer
    await expectPublicHeader(page)
    await expectFooter(page)

    // Hero heading
    await expect(
      page.getByRole('heading', { name: /재능으로 섬기고, 도움받으며 기부하세요/i })
    ).toBeVisible()

    // Hero subtext
    await expect(
      page.getByText(/전문가 멘토링을 받고 결제한 모든 금액/i)
    ).toBeVisible()

    // CTA buttons
    await expect(page.getByRole('link', { name: '멘토 찾기' }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: '멘토 되기' }).first()).toBeVisible()
  })

  test('should navigate to /mentors when clicking "멘토 찾기"', async ({
    page
  }) => {
    await page.goto('/')

    // Hero section의 "멘토 찾기" 버튼 클릭 (first()로 Hero CTA 선택)
    await page.getByRole('link', { name: '멘토 찾기' }).first().click()

    // URL 확인
    await expect(page).toHaveURL('/mentors')
  })

  test('should navigate to /signup when clicking "멘토 되기"', async ({
    page
  }) => {
    await page.goto('/')

    // Hero section의 "멘토 되기" 버튼 클릭
    await page.getByRole('link', { name: '멘토 되기' }).first().click()

    // URL 확인
    await expect(page).toHaveURL('/signup')
  })

  test('should display "How It Works" section with 3 steps', async ({
    page
  }) => {
    await page.goto('/')

    // Section heading
    await expect(
      page.getByRole('heading', { name: /어떻게 진행되나요\?/i })
    ).toBeVisible()

    // 3단계 확인 (숫자는 span, 제목은 h3)
    await expect(page.getByText('1').first()).toBeVisible()
    await expect(page.getByRole('heading', { name: '멘토 찾기', exact: true })).toBeVisible()

    await expect(page.getByText('2').first()).toBeVisible()
    await expect(page.getByRole('heading', { name: '세션 예약', exact: true })).toBeVisible()

    await expect(page.getByText('3').first()).toBeVisible()
    await expect(page.getByRole('heading', { name: '기부 참여', exact: true })).toBeVisible()
  })

  test('should display impact statistics with AnimatedCounter', async ({
    page
  }) => {
    await page.goto('/')

    // 임팩트 섹션으로 스크롤 (AnimatedCounter는 IntersectionObserver 사용)
    const impactHeading = page.getByRole('heading', { name: /우리의 임팩트/i })
    await impactHeading.scrollIntoViewIfNeeded()

    // Section heading 확인
    await expect(impactHeading).toBeVisible()

    // 통계 레이블 확인
    await expect(page.getByText(/총 기부금/i)).toBeVisible()
    await expect(page.getByText(/활동 중인 멘토/i)).toBeVisible()
    await expect(page.getByText(/도움받은 멘티/i)).toBeVisible()

    // AnimatedCounter 최종 값 확인
    // mockImpactStats 값: totalDonatedUsd=15750, totalMentors=6, totalMentees=42
    // AnimatedCounter는 IntersectionObserver로 화면에 보일 때 애니메이션 시작
    // Intl.NumberFormat으로 포맷: 15,750

    // 애니메이션 완료 대기 (3초 duration + 여유)
    await page.waitForTimeout(3500)

    // 임팩트 섹션 내에서 검색
    const impactSection = page.locator('section', { has: page.getByText('우리의 임팩트') })

    // 최종 값 확인
    await expect(impactSection.getByText(/15.*750/i)).toBeVisible()
    await expect(impactSection.getByText(/^6$/)).toBeVisible()
    await expect(impactSection.getByText(/^42$/)).toBeVisible()

    // "임팩트 리포트 보기" 버튼
    await expect(
      page.getByRole('link', { name: /임팩트 리포트 보기/i })
    ).toBeVisible()
  })

  test('should display featured mentors section with 3 cards', async ({
    page
  }) => {
    await page.goto('/')

    // Section heading
    await expect(
      page.getByRole('heading', { name: /전문가 멘토를 만나보세요/i })
    ).toBeVisible()

    // 멘토 카드 확인 (mock 데이터의 첫 3명: 김성민, 박지영, 이준호)
    await expect(page.getByText(/김성민/i).first()).toBeVisible()
    await expect(page.getByText(/박지영/i).first()).toBeVisible()
    await expect(page.getByText(/이준호/i).first()).toBeVisible()

    // "모든 멘토 보기" 버튼
    await expect(
      page.getByRole('link', { name: /모든 멘토 보기/i })
    ).toBeVisible()
  })

  test('should navigate to /mentors when clicking "모든 멘토 보기"', async ({
    page
  }) => {
    await page.goto('/')

    // "모든 멘토 보기" 버튼 클릭
    await page.getByRole('link', { name: /모든 멘토 보기/i }).click()

    // URL 확인
    await expect(page).toHaveURL('/mentors')
  })

  test('should display FAQ preview section with 4 items', async ({ page }) => {
    await page.goto('/')

    // Section heading
    await expect(
      page.getByRole('heading', { name: /자주 묻는 질문/i }).first()
    ).toBeVisible()

    // FAQ 아코디언 확인 (첫 4개 항목, details 태그)
    const faqItems = page.locator('details').locator('visible=true')
    await expect(faqItems).toHaveCount(4)

    // 첫 번째 FAQ 확장 테스트
    const firstFaq = faqItems.first()
    const summary = firstFaq.locator('summary')

    // 초기: 닫혀있음
    await expect(firstFaq).not.toHaveAttribute('open')

    // 클릭하여 열기
    await summary.click()
    await expect(firstFaq).toHaveAttribute('open', '')

    // 다시 클릭하여 닫기
    await summary.click()
    await expect(firstFaq).not.toHaveAttribute('open')
  })

  test('should navigate to /impact when clicking "임팩트 리포트 보기"', async ({
    page
  }) => {
    await page.goto('/')

    // "임팩트 리포트 보기" 버튼 클릭
    await page.getByRole('link', { name: /임팩트 리포트 보기/i }).click()

    // URL 확인
    await expect(page).toHaveURL('/impact')
  })
})
