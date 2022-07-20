import 'express-session';

declare module 'express-session' {
  export interface SessionData {
    login: string;
  }
}
