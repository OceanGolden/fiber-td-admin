import '@unocss/reset/tailwind-compat.css';
import 'tdesign-react/es/style/index.css';
import 'virtual:uno.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
