import type { Access, FieldAccess } from 'payload'

type Role = 'admin' | 'editor' | 'company-manager'

type SessionUser = {
  id: number | string
  role?: Role | null
  companies?: (number | string | { id: number | string })[] | null
} | null

const idOf = (v: number | string | { id: number | string }) =>
  typeof v === 'object' ? v.id : v

/** The companies a company-manager is allowed to touch. */
export const managedCompanyIds = (user: SessionUser): (number | string)[] =>
  (user?.companies ?? []).map(idOf)

export const isAdmin: Access = ({ req }) => (req.user as SessionUser)?.role === 'admin'

export const isAdminField: FieldAccess = ({ req }) => (req.user as SessionUser)?.role === 'admin'

/** Admins and editors can work across the whole group. */
export const isEditor: Access = ({ req }) => {
  const role = (req.user as SessionUser)?.role
  return role === 'admin' || role === 'editor'
}

/**
 * Public reads are limited to published records; signed-in staff see drafts too.
 * Returned as a query constraint rather than a boolean so listings stay filtered.
 */
export const publishedOrSignedIn: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}

/**
 * Editors get everything. A company-manager is scoped to their own companies —
 * `field` is the path that holds the company reference on this collection.
 */
export const scopedToCompany =
  (field: 'id' | 'company'): Access =>
  ({ req }) => {
    const user = req.user as SessionUser
    if (!user) return false
    if (user.role === 'admin' || user.role === 'editor') return true
    if (user.role === 'company-manager') {
      const ids = managedCompanyIds(user)
      if (ids.length === 0) return false
      return { [field]: { in: ids } }
    }
    return false
  }
