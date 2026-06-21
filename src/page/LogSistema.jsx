import React from "react";
import { Container, Table, Button, Badge } from "react-bootstrap";
import { useNotification } from "../context/NotificationContext";

const variantBadge = {
  success: "success",
  danger: "danger",
  warning: "warning",
  info: "info",
  light: "secondary"
};

const LogSistema = () => {
  const { logs, clearLogs } = useNotification();

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-start mb-4 gap-3">
        <div>
          <h2>Registro del sistema</h2>
          <p className="text-muted">Aquí se guardan los eventos generados por las notificaciones del sistema.</p>
        </div>
        <Button variant="outline-danger" onClick={clearLogs} disabled={logs.length === 0}>
          Limpiar registro
        </Button>
      </div>

      <div className="table-responsive shadow-sm rounded bg-white">
        <Table striped bordered hover className="mb-0 align-middle">
          <thead className="table-dark">
            <tr>
              <th>Fecha</th>
              <th>Mensaje</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.id}>
                  <td>{new Date(log.time).toLocaleString()}</td>
                  <td>{log.message}</td>
                  <td>
                    <Badge bg={variantBadge[log.variant] || "secondary"}>
                      {log.variant}
                    </Badge>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-muted">
                  No hay eventos en el registro del sistema.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default LogSistema;
