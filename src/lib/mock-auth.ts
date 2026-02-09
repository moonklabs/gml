import type { MockRole } from '@/lib/mock-data'

const MOCK_ROLE_KEY = 'gml_mock_role'

export function getStoredMockRole(): MockRole {
  if (typeof window === 'undefined') {
    return 'mentee'
  }

  const role = window.localStorage.getItem(MOCK_ROLE_KEY)
  if (role === 'mentor' || role === 'admin' || role === 'mentee') {
    return role
  }

  return 'mentee'
}

export function setStoredMockRole(role: MockRole): void {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(MOCK_ROLE_KEY, role)
}

export function clearStoredMockRole(): void {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(MOCK_ROLE_KEY)
}
