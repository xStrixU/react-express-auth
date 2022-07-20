import { Navigate, Outlet } from 'react-router-dom';

import { useUser } from '../hooks/useUser';

import { CenteredCircularProgress } from './CenteredCircularProgress';

import type { UserRoleName } from '@prisma/client';

type PrivateRouteProps = Readonly<{
  auth?: boolean;
  roles?: UserRoleName[];
  redirectPath: string;
}>;

export const PrivateRoute = ({
  auth = true,
  roles = [],
  redirectPath,
}: PrivateRouteProps) => {
  const { isLoading, user } = useUser();

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  if (
    (!auth && user) ||
    (auth && !user) ||
    (user && !roles.every(role => user.roles.includes(role)))
  ) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
};
