import { useState } from "react";
import axios from "../api/axios";
import "../styles/ArticulosHeader.css";

export default function ArticulosHeader({ onCreated, onSearch }) {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const crear = async () => {
    if (!form.nombre || !form.precio) {
      alert("Nombre y precio son obligatorios");
      return;
    }

    await axios.post("/articulos", {
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: Number(form.precio)
    });

    setForm({ nombre: "", descripcion: "", precio: "" });
    onCreated();
  };

  return (
    <div className="header-card">
      <div className="nuevo-articulo">
        <input
          name="nombre"
          placeholder="Nombre del producto"
          value={form.nombre}
          onChange={handleChange}
        />

        <input
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />

        <input
          name="precio"
          type="number"
          step="0.01"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
        />

        <button onClick={crear}>➕ Agregar</button>
      </div>

      <input
        className="buscar"
        placeholder="🔍 Buscar producto..."
        onChange={e => onSearch(e.target.value)}
      />
    </div>
  );
}
