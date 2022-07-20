import { RequestHandler } from 'express';

import type { ParamsDictionary } from 'express-serve-static-core';

export type Handler<ReqBody = any, ResBody = any> = RequestHandler<
  ParamsDictionary,
  ResBody,
  ReqBody
>;
