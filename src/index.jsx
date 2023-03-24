import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// imports de Redux
// import { Provider } from 'react-redux';

import App from './components/App';

// Importar las hojas de estilo
import 'bootstrap/dist/css/bootstrap.css';
import './styles/css/index.scss';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
