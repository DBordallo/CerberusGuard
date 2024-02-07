import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import routes from './router/routes';

createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <RouterProvider router={routes} />
  </React.Fragment>
);
