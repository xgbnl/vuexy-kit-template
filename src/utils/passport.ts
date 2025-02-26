// Var
const ACCESS_TOKEN = 'access-token'

// Hooks
export function useAccessToken(): string {
  return localStorage.getItem(ACCESS_TOKEN) as string
}

export function hasAccessToken(): boolean {
  return localStorage.getItem(ACCESS_TOKEN) !== null
}

export function revokeAccessToken(): void {
  return localStorage.removeItem(ACCESS_TOKEN)
}

export function setToken(accessToken: string): void {
  localStorage.setItem(ACCESS_TOKEN, accessToken)
}
