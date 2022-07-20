import status from 'http-status';

import { HttpError } from './http.error';

export class UnauthorizedError extends HttpError {
  constructor(public body = String(status[status.UNAUTHORIZED])) {
    super(status.UNAUTHORIZED, body);
  }
}
