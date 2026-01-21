import { useState } from 'react';
import { login } from './auth.service';

export default function Login() {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = await login(form);
      localStorage.setItem('token', data.token);
      alert('Login exitoso');
    } catch (err) {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        name="username"
        placeholder="Usuario"
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={handleChange}
      />

      <button type="submit">Entrar</button>
    </form>
  );
}
