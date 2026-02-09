import type { Page } from '@playwright/test'

/**
 * Mock 역할 타입 (mock-auth.ts와 동일)
 */
export type MockRole = 'mentor' | 'mentee' | 'admin'

/**
 * localStorage에 mock 역할 설정
 *
 * @param page - Playwright Page 객체
 * @param role - 설정할 역할
 */
export async function setMockRole(page: Page, role: MockRole): Promise<void> {
  await page.evaluate((role) => {
    window.localStorage.setItem('gml_mock_role', role)
  }, role)
}

/**
 * Mock 역할을 설정하고 특정 URL로 이동
 *
 * localStorage 타이밍 이슈 방지를 위해 2단계 네비게이션:
 * 1. 홈으로 이동 (localStorage 초기화)
 * 2. 역할 설정
 * 3. 타겟 URL로 이동
 *
 * @param page - Playwright Page 객체
 * @param url - 이동할 URL
 * @param role - 설정할 역할
 */
export async function navigateWithRole(
  page: Page,
  url: string,
  role: MockRole
): Promise<void> {
  // Step 1: 홈으로 이동 (페이지 컨텍스트 초기화)
  await page.goto('/')

  // Step 2: 역할 설정
  await setMockRole(page, role)

  // Step 3: 타겟 URL로 이동
  await page.goto(url)
}

/**
 * localStorage에서 현재 mock 역할 가져오기
 *
 * @param page - Playwright Page 객체
 * @returns 현재 설정된 역할
 */
export async function getMockRole(page: Page): Promise<MockRole> {
  return await page.evaluate(() => {
    const role = window.localStorage.getItem('gml_mock_role')
    return (role || 'mentee') as MockRole
  })
}

/**
 * localStorage의 mock 역할 삭제
 *
 * @param page - Playwright Page 객체
 */
export async function clearMockRole(page: Page): Promise<void> {
  await page.evaluate(() => {
    window.localStorage.removeItem('gml_mock_role')
  })
}
