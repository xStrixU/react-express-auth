import status from 'http-status';

import { isApiError } from './api-error';

import { USER_QUERY_KEY } from '../hooks/useUser';
import { queryClient } from '../providers/AppProviders';

export const handleUnauthorized = (error: unknown) => {
  if (isApiError(error)) {
    const { data: errData } = error.response;

    if (errData.status === status.UNAUTHORIZED) {
      queryClient.setQueryData(USER_QUERY_KEY, null);
    }
  }
};
