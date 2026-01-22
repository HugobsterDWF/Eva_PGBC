import { useEffect, useState } from "react";
import axios from "../api/axios";
import ReportesTable from "./ReportesTable";
import "../styles/Reportes.css";

export default function ReportesPanel() {
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargarReportes = async () => {
    const { data } = await axios.get("/reportes/articulos");
    setReportes(data);
  };

  useEffect(() => {
    cargarReportes();
  }, []);

  const descargar = async (tipo) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `/reportes/articulos/${tipo}`,
        {},
        { responseType: "blob" }
      );

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `articulos.${tipo === "pdf" ? "pdf" : "xlsx"}`;
      a.click();

      cargarReportes();
    } catch (error) {
      alert("Error al generar reporte");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reportes-panel">
      <div className="reportes-actions">
        <button onClick={() => descargar("pdf")} disabled={loading}>
          📄 Generar PDF
        </button>

        <button onClick={() => descargar("excel")} disabled={loading}>
          📊 Generar Excel
        </button>
      </div>

      <ReportesTable reportes={reportes} />
    </div>
  );
}
