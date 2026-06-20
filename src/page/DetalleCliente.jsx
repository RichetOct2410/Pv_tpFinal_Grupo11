import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import clienteService from "../services/clienteService";
import ComponenteLoader from "../components/commun/Loader";
import { AdminContext } from "../context/AdminContext";
import { useNotification } from "../context/NotificationContext";

const DetalleCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useContext(AdminContext);
  const { notify } = useNotification();

  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarCliente = async () => {
      try {
        setLoading(true);
        setError("");

        const datos = await clienteService.obtenerClientePorId(id);

        setCliente(datos);
      } catch (err) {
        setError(err.message || "No se pudo cargar el cliente.");
      } finally {
        setLoading(false);
      }
    };

    cargarCliente();
  }, [id]);

  const handleEliminar = async () => {
    try {
      await clienteService.eliminarCliente(id);

      notify("Cliente eliminado correctamente.", "danger");

      navigate("/clientes");
    } catch (err) {
      setError(err.message || "No se pudo eliminar el cliente.");
    }
  };

  if (loading) {
    return (
      <Container className="py-4">
        <ComponenteLoader />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          {error}
        </Alert>

        <Button variant="secondary" onClick={() => navigate("/clientes")}>
          Volver a la lista
        </Button>
      </Container>
    );
  }

  if (!cliente) {
    return (
      <Container className="py-4">
        <h2>Cliente no encontrado</h2>

        <Button variant="secondary" onClick={() => navigate("/clientes")}>
          Volver a la lista
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2>Detalle del Cliente</h2>
          <p className="text-muted">
            Información obtenida desde FakeStoreAPI.
          </p>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          <Row>
            <Col md={6}>
              <h5>Datos personales</h5>

              <p>
                <strong>Nombre:</strong> {cliente.name?.firstname} {cliente.name?.lastname}
              </p>

              <p>
                <strong>Email:</strong> {cliente.email}
              </p>

              <p>
                <strong>Teléfono:</strong> {cliente.phone}
              </p>

              <p>
                <strong>Username:</strong> {cliente.username}
              </p>

              <p>
                <strong>Password:</strong> {cliente.password}
              </p>
            </Col>

            <Col md={6}>
              <h5>Dirección</h5>

              <p>
                <strong>Calle:</strong> {cliente.address?.street}
              </p>

              <p>
                <strong>Número:</strong> {cliente.address?.number}
              </p>

              <p>
                <strong>Ciudad:</strong> {cliente.address?.city}
              </p>

              <p>
                <strong>Código postal:</strong> {cliente.address?.zipcode}
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="mt-4 d-flex gap-2 flex-wrap">
        <Button variant="secondary" onClick={() => navigate("/clientes")}>
          Volver a la lista
        </Button>

        {admin?.sector === "Gerencia" && (
          <Button variant="danger" onClick={handleEliminar}>
            Eliminar Cliente de la Base de Datos
          </Button>
        )}
      </div>
    </Container>
  );
};

export default DetalleCliente;