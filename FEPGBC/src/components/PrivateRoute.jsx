import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from '../api/axios';

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        await axios.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setAuthorized(true);
      } catch (error) {
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  if (loading) return <p>Validando sesión...</p>;

  if (!authorized) return <Navigate to="/login" replace />;

  return children;
}
