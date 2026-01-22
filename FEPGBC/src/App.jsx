import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Articulos from './pages/ArticulosTable';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirección por defecto */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/ArticulosTable"
          element={
            <PrivateRoute>
              <Articulos/>
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
