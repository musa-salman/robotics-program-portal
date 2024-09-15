import Role from '../authentication/components/Roles';

/**
 * Represents a user in the system.
 */
export interface User {
  id: string;
  roles: Role[];
  email: string;
}
