import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';

import { AppProviders } from './providers/AppProviders';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
