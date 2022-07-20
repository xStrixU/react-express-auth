import type { ApiError } from '@react-express-auth/common';
import type { ErrorRequestHandler, Response } from 'express';

export const errorHandler: ErrorRequestHandler = (
  err,
  req,
  res: Response<ApiError>,
  next
) => {
  const status = err.status || 500;
  const body = err.body || 'Something went wrong';

  res.status(status).json({
    status,
    message: body,
  });
};
