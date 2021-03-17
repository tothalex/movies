export const UserRoles = ['basic', 'premium'] as const
export type UserRole = typeof UserRoles[number]
