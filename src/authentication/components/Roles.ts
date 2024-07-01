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
  Unauthenticated
}

const RoleNames = {
  [Role.Owner]: 'בעלים',
  [Role.Admin]: 'מנהל',
  [Role.Student]: 'תלמיד',
  [Role.Pending]: 'ממתין לאישור',
  [Role.PreEnrollment]: 'מועמד',
  [Role.Rejected]: 'נדחה',
  [Role.Unauthenticated]: 'לא מאומת'
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

export default Role;
export { ALLOW_AUTHED_ROLES, RoleNames, AuthorizationStatus };
