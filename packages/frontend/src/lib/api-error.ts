import axios from 'axios';

import type { AxiosError } from 'axios';
import type { ApiError } from '@react-express-auth/common';

import type { OneRequired } from '../types';

export const isApiError = (
  err: unknown
): err is OneRequired<AxiosError<ApiError>, 'response'> => {
  if (axios.isAxiosError(err) && err.response) {
    const { data } = err.response;

    return !!(
      typeof data === 'object' &&
      data &&
      'status' in data &&
      'message' in data
    );
  }

  return false;
};
