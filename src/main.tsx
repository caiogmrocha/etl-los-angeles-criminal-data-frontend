import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router"
import './index.css'
import { DashboardPage } from './pages/Dashboard/index.tsx'

const router = createBrowserRouter([
  {
    path: '/reports/criminal-data',
    element: <DashboardPage />,
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
