import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { ServiceProvider } from './context/ServiceContext'
import { ClientProvider } from './context/ClientContext'
import { AppointmentProvider } from './context/AppointmentContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Services from './pages/Services'
import Clients from './pages/Clients'
import Appointments from './pages/Appointments'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ServiceProvider>
          <ClientProvider>
            <AppointmentProvider>
              <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/" element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="clients" element={<Clients />} />
                  <Route path="services" element={<Services />} />
                  <Route path="appointments" element={<Appointments />} />
                </Route>
              </Routes>
            </AppointmentProvider>
          </ClientProvider>
        </ServiceProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
