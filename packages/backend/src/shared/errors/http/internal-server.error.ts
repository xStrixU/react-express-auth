import status from 'http-status';

import { HttpError } from './http.error';

export class InternalServerError extends HttpError {
  constructor(public body = String(status[status.INTERNAL_SERVER_ERROR])) {
    super(status.INTERNAL_SERVER_ERROR, body);
  }
}
