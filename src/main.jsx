import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './CSS/index.css'
import { AppRouter } from './router/AppRouter.jsx'
import { AdminProvider } from './context/AdminContext.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminProvider>
      <NotificationProvider>
        <RouterProvider router={AppRouter} />
      </NotificationProvider>
    </AdminProvider>
  </StrictMode>,
)
