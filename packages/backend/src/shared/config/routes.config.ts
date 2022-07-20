import { Router } from 'express';

import * as sessionsRouter from '../../sessions/sessions.router';
import * as usersRouter from '../../users/users.router';

export const configureRoutes = () => {
  const appRouter = Router();

  [sessionsRouter, usersRouter].forEach(({ router, basePath }) => {
    appRouter.use(process.env.BASE_PATH + basePath, router);
  });

  return appRouter;
};
