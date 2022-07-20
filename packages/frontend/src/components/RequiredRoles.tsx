import type { UserRoleName } from '@prisma/client';
import type { ReactElement } from 'react';

import { useUser } from '../hooks/useUser';

type RequiredRolesProps = Readonly<{
  roles: UserRoleName[];
  children: ReactElement;
}>;

export const RequiredRoles = ({ roles, children }: RequiredRolesProps) => {
  const { user } = useUser();

  return user && roles.every(role => user.roles.includes(role))
    ? children
    : null;
};
