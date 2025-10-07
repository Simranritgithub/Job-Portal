import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import store from './Components/redux/store';
import { RouterProvider } from 'react-router-dom';
import appRouter from './App';   // 👈 import your router

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
      <Toaster />
    </Provider>
  </StrictMode>,
);
