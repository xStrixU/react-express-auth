import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { IndexPage } from './pages/IndexPage/IndexPage';
import { SignInPage } from './pages/EntryPages/SignInPage';
import { SignUpPage } from './pages/EntryPages/SignUpPage';

import { CenteredCircularProgress } from './components/CenteredCircularProgress';
import { PrivateRoute } from './components/PrivateRoute';

import {
  ADMIN_PATH,
  INDEX_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
} from './lib/paths';

const AdminPage = lazy(() => import('./pages/AdminPage'));

export const App = () => (
  <Suspense fallback={<CenteredCircularProgress />}>
    <Routes>
      <Route element={<PrivateRoute auth={false} redirectPath={INDEX_PATH} />}>
        <Route path={SIGN_IN_PATH} element={<SignInPage />} />
        <Route path={SIGN_UP_PATH} element={<SignUpPage />} />
      </Route>
      <Route element={<PrivateRoute redirectPath={SIGN_IN_PATH} />}>
        <Route path={INDEX_PATH} element={<IndexPage />} />
      </Route>
      <Route
        element={<PrivateRoute roles={['ADMIN']} redirectPath={INDEX_PATH} />}
      >
        <Route path={ADMIN_PATH} element={<AdminPage />} />
      </Route>
    </Routes>
  </Suspense>
);
