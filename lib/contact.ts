export function validateContact(value: unknown) {
  if (!value || typeof value !== 'object') return null
  const data = value as Record<string, unknown>
  if (typeof data.name !== 'string' || typeof data.email !== 'string' || typeof data.message !== 'string') return null
  const name = data.name.trim()
  const email = data.email.trim()
  const message = data.message.trim()
  if (!name || name.length > 100 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10 || message.length > 5000 || data.privacy !== true) return null
  return { name, email, message }
}
