// 简单的加密工具（使用Base64 + 简单混淆）
const SALT = 'personal-website-3min-salt-2024'

export const encryptCredentials = (username: string, password: string): string => {
  const combined = `${username}:${password}:${SALT}`
  return btoa(combined)
}

export const validateCredentials = (username: string, password: string): boolean => {
  // 预设的加密后的正确凭据
  const correctHash = 'M21pbjpjYW94aWFvMTIzITpwZXJzb25hbC13ZWJzaXRlLTNtaW4tc2FsdC0yMDI0'
  const inputHash = encryptCredentials(username, password)
  return inputHash === correctHash
}

export const getAdminUser = () => ({
  id: 'admin-3min',
  name: '3min',
  email: '3min@admin.com',
  role: 'admin' as const
})