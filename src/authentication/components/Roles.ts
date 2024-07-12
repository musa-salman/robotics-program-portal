/**
 * Represents the different roles available for access control.
 */
enum Role {
  Owner = 1,
  Admin,
  Student,
  Pending,
  PreEnrollment,
  Rejected,
  deleted,
  Unauthenticated,
  default = Unauthenticated
}

const selectableRoles = [Role.Owner, Role.Admin];

const roleNames = {
  [Role.Owner]: 'בעלים',
  [Role.Admin]: 'מנהל',
  [Role.Student]: 'תלמיד',
  [Role.Pending]: 'ממתין לאישור',
  [Role.PreEnrollment]: 'מועמד',
  [Role.Rejected]: 'נדחה',
  [Role.deleted]: 'נמחק',
  [Role.Unauthenticated]: 'לא מאומת'
};

const roleColorsLevel: {
  [key: number]: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
} = {
  [Role.Owner]: 'primary',
  [Role.Admin]: 'secondary',
  [Role.Student]: 'success',
  [Role.Pending]: 'info',
  [Role.PreEnrollment]: 'warning',
  [Role.Rejected]: 'error',
  [Role.deleted]: 'default',
  [Role.Unauthenticated]: 'default'
};

/**
 * Represents the authorization status for a user.
 */
enum AuthorizationStatus {
  UnauthorizedAuthenticatedUser = 1,
  UnauthorizeUnauthenticatedUser,
  AuthorizedUser
}

/**
 * Array of roles that are allowed to access the authenticated routes.
 */
const ALLOW_AUTHED_ROLES = [Role.Owner, Role.Admin, Role.Student];

const SKIP_TO_ADMIN_ROLES = [Role.Pending, Role.PreEnrollment, Role.Rejected];

export { Role };
export type { AuthorizationStatus };
export { ALLOW_AUTHED_ROLES, SKIP_TO_ADMIN_ROLES, roleNames, selectableRoles, roleColorsLevel };
