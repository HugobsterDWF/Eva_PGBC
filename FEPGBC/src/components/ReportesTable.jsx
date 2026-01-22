export default function ReportesTable({ reportes }) {
  if (!reportes.length) {
    return <p style={{ opacity: 0.7 }}>No hay reportes generados.</p>;
  }

  return (
    <table className="reportes-table">
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Archivo</th>
          <th>Registros</th>
          <th>Generado por</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {reportes.map(r => (
          <tr key={r.Id}>
            <td>{r.Tipo}</td>
            <td>{r.NombreArchivo}</td>
            <td>{r.TotalRegistros}</td>
            <td>{r.GeneradoPor || "-"}</td>
            <td>{new Date(r.FechaGeneracion).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
