import { useEffect, useState } from "react";
import axios from "../api/axios";
import ArticulosHeader from "./ArticulosHeader";
import ReportesPanel from "../components/ReportesPanel";
import "../styles/ArticulosTable.css";

const ArticulosTable = () => {
  const [articulos, setArticulos] = useState([]);
  const [filtro, setFiltro] = useState("");

  const cargarArticulos = async () => {
    const { data } = await axios.get("/articulos");
    setArticulos(data);
  };

  useEffect(() => {
    cargarArticulos();
  }, []);

  const handleChange = (id, campo, valor) => {
    setArticulos(prev =>
      prev.map(a =>
        a.Id === id ? { ...a, [campo]: valor } : a
      )
    );
  };

  const guardar = async (a) => {
    await axios.put(`/articulos/${a.Id}`, {
      nombre: a.Nombre,
      descripcion: a.Descripcion,
      precio: Number(a.Precio)
    });
    alert("✔ Guardado correctamente");
  };

  const borrar = async (id) => {
    if (!confirm("¿Eliminar producto?")) return;
    await axios.delete(`/articulos/${id}`);
    setArticulos(prev => prev.filter(a => a.Id !== id));
  };

  const filtrados = articulos.filter(a =>
    a.Nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    (a.Descripcion || "").toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="table-card">
      <h2>📦 Gestión de Productos</h2>

      <ArticulosHeader
        onCreated={cargarArticulos}
        onSearch={setFiltro}
      />
      <ReportesPanel />

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filtrados.map(a => (
              <tr key={a.Id}>
                <td>
                  <input
                    value={a.Nombre}
                    onChange={e => handleChange(a.Id, "Nombre", e.target.value)}
                  />
                </td>

                <td>
                  <input
                    value={a.Descripcion || ""}
                    onChange={e =>
                      handleChange(a.Id, "Descripcion", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    step="0.01"
                    value={a.Precio}
                    onChange={e =>
                      handleChange(a.Id, "Precio", e.target.value)
                    }
                  />
                </td>

                <td className="acciones">
                  <button className="guardar" onClick={() => guardar(a)}>
                    💾
                  </button>
                  <button className="borrar" onClick={() => borrar(a.Id)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArticulosTable;
