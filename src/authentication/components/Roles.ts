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

const roleNames = {
  [Role.Owner]: 'בעלים',
  [Role.Admin]: 'מנהל',
  [Role.Student]: 'תלמיד',
  [Role.Pending]: 'ממתין לאישור',
  [Role.PreEnrollment]: 'מועמד',
  [Role.Rejected]: 'נדחה',
  [Role.Unauthenticated]: 'לא מאומת'
};

const roleColors = {
  [Role.Owner]: {
    main: '#1B5E20', // Dark Green
    contrastText: '#FFFFFF' // White
  },
  [Role.Admin]: {
    main: '#0D47A1', // Dark Blue
    contrastText: '#FFFFFF' // White
  },
  [Role.Student]: {
    main: '#0288D1', // Light Blue
    contrastText: '#FFFFFF' // White
  },
  [Role.Pending]: {
    main: '#F57F17', // Orange
    contrastText: '#000000' // Black
  },
  [Role.PreEnrollment]: {
    main: '#FBC02D', // Yellow
    contrastText: '#000000' // Black
  },
  [Role.Rejected]: {
    main: '#D32F2F', // Red
    contrastText: '#FFFFFF' // White
  },
  [Role.Unauthenticated]: {
    main: '#9E9E9E', // Gray
    contrastText: '#000000' // Black
  }
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
export { ALLOW_AUTHED_ROLES, roleNames as RoleNames, roleColors as RoleColors, AuthorizationStatus };
