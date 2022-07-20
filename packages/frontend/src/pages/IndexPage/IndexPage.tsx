import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { UserDetails } from './UserDetails';

import { RequiredRoles } from '../../components/RequiredRoles';

import { useUser } from '../../hooks/useUser';
import { axiosWrapper } from '../../lib/axios';
import { ADMIN_PATH } from '../../lib/paths';

const getData = async () => {
  const { data } = await axiosWrapper.get<string>('/data');

  return data;
};

export const IndexPage = () => {
  const { user, logoutMutation } = useUser();
  const { data, refetch } = useQuery(['data'], getData, {
    enabled: false,
    retry: false,
  });

  if (!user) return null;

  return (
    <>
      <h1>Hello, you are logged in!</h1>
      <UserDetails user={user} />
      <button onClick={() => logoutMutation.mutate()}>Logout</button>
      <p>
        Click the button below to fetch data from API. If the response returns
        401 Unauthorized, you will be automatically logged out. You can force it
        for example by deleting a session cookie.
      </p>
      <p>Data: {data}</p>
      <button onClick={() => refetch()}>Fetch data</button>
      <RequiredRoles roles={['ADMIN']}>
        <p>
          <Link to={ADMIN_PATH}>Admin page</Link>
        </p>
      </RequiredRoles>
    </>
  );
};
