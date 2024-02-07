"use strict";

import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';

// Importar dinámicamente las rutas
const routesPromise = import('./router/routes');
routesPromise.then(module => {
  const routes = module.default;
  
  createRoot(document.getElementById('root')).render(
    React.createElement(React.Fragment, null,
      React.createElement(RouterProvider, { router: routes })
    )
  );
});
