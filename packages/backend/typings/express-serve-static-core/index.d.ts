import 'express-serve-static-core';

import type { User, UserRole, UserRoleName } from '@prisma/client';

declare module 'express-serve-static-core' {
  export interface AuthData {
    user: User & { roles: UserRole[] };
    roles: UserRoleName[];
  }

  export interface Request {
    authData: AuthData;
  }
}
