import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";

import adminService from "../services/adminService";
import clienteService from "../services/clienteService";
import ComponenteLoader from "../components/commun/Loader";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    admins: 0,
    gerencia: 0,
    soporte: 0,
    clientes: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const admins = adminService.obtenerAdmins();
        const clientes = await clienteService.obtenerClientes();

        const gerencia = admins.filter((admin) => admin.sector === "Gerencia").length;
        const soporte = admins.filter((admin) => admin.sector === "Soporte").length;

        setCounts({
          admins: admins.length,
          gerencia,
          soporte,
          clientes: clientes.length
        });
      } catch (err) {
        setError(err.message || "No se pudo cargar el dashboard.");
      } finally {
        setLoading(false);
      }
    };

    cargarDashboard();
  }, []);

  if (loading) {
    return <ComponenteLoader />;
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2>Dashboard</h2>
      <p className="text-muted">Bienvenido al panel de administración.</p>

      <Row className="mt-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Administradores</Card.Title>
              <Card.Text style={{ fontSize: "1.5rem" }}>{counts.admins}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Gerencia</Card.Title>
              <Card.Text style={{ fontSize: "1.5rem" }}>{counts.gerencia}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Soporte</Card.Title>
              <Card.Text style={{ fontSize: "1.5rem" }}>{counts.soporte}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Clientes</Card.Title>
              <Card.Text style={{ fontSize: "1.5rem" }}>{counts.clientes}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;