import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import { once } from 'node:events';

import { auth } from './auth/auth.middleware';
import { SESSION_COOKIE_NAME } from './shared/config/constants.config';
import { configureRoutes } from './shared/config/routes.config';
import { prisma } from './shared/lib/prisma';
import { errorHandler } from './shared/middlewares/error-handler.middleware';

(async () => {
  try {
    dotenv.config();

    await prisma.$connect();

    const app = express();
    const port = process.env.PORT || 3000;

    app.use(
      cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
      })
    );
    app.use(express.json());
    app.use(
      session({
        name: SESSION_COOKIE_NAME,
        secret: process.env.SESSION_SECRET || '',
        resave: false,
        saveUninitialized: false,
      })
    );
    app.use(configureRoutes());

    app.get('/api/data', auth(), (req, res) => {
      res.send('Data from API!');
    });

    app.use(errorHandler);

    await once(
      app.listen(port, () => {
        console.log(`Server listening on port :${port}`);
      }),
      'listening'
    );
  } catch (err) {
    console.error(`Error while bootstrapping application: ${err}`);

    prisma.$disconnect();
    process.exit(1);
  }
})();
