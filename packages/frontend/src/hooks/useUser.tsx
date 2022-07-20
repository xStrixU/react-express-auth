import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createSession, deleteSession } from '../services/session.service';
import { createUser, getAuthenticatedUser } from '../services/user.service';

import type { UserDto } from '@react-express-auth/common';

export const USER_QUERY_KEY = ['user'];

export const useUser = () => {
  const queryClient = useQueryClient();
  const { data: user, ...rest } = useQuery(
    USER_QUERY_KEY,
    async () => {
      try {
        return await getAuthenticatedUser();
      } catch (err) {
        return null;
      }
    },
    {
      staleTime: Infinity,
      retry: false,
    }
  );

  const setUser = (user: UserDto | null) => {
    queryClient.setQueryData(USER_QUERY_KEY, user);
  };

  const registerMutation = useMutation(createUser);

  const loginMutation = useMutation(createSession, {
    onSuccess: setUser,
  });

  const logoutMutation = useMutation(deleteSession, {
    onSuccess: () => {
      setUser(null);
    },
  });

  return { user, registerMutation, loginMutation, logoutMutation, ...rest };
};
