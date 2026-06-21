import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Alert, Modal } from "react-bootstrap";
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
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

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

  const abrirConfirmacion = () => setMostrarConfirmacion(true);
  const cerrarConfirmacion = () => setMostrarConfirmacion(false);

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

  const { username, password, address, name, email, phone } = cliente;
  const { street = "", number = "", city = "", zipcode = "" } = address || {};
  const { firstname = "", lastname = "" } = name || {};

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2>Detalle del Cliente</h2>
          <p className="text-muted"> Información obtenida desde FakeStoreAPI.</p>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Card.Body>
          <Row>
            <Col md={6} className="mb-4 mb-md-0">
              <h5 className="border-bottom pb-2 mb-3 text-secondary">Datos Personales</h5>
              <p><strong>Nombre:</strong> {firstname} {lastname}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Teléfono:</strong> {phone}</p>
              <p><strong>Usuario:</strong> {username}</p>
              <p><strong>Contraseña:</strong> {password}</p>
            </Col>

            <Col md={6}>
              <h5 className="border-bottom pb-2 mb-3 text-secondary">Dirección</h5>
              <p className="mb-2"><strong>Calle:</strong> {street}</p>
              <p className="mb-2"><strong>Número:</strong> {number}</p>
              <p className="mb-2"><strong>Ciudad:</strong> {city}</p>
              <p className="mb-2"><strong>Código Postal:</strong> {zipcode}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="mt-4 d-flex gap-2 flex-wrap">
        <Button variant="secondary" onClick={() => navigate("/clientes")}> Volver a la lista </Button>
        {admin?.sector === "Gerencia" && (
          <Button variant="danger" onClick={abrirConfirmacion}>
            Eliminar Cliente de la Base de Datos
          </Button>
        )}
      </div>

      <Modal show={mostrarConfirmacion} onHide={cerrarConfirmacion} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Seguro que quieres eliminar a <strong>{firstname} {lastname}</strong>?</p>
          <p className="text-muted mb-0">Esta acción no se puede deshacer.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarConfirmacion}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => { cerrarConfirmacion(); handleEliminar(); }}>
            Eliminar cliente
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DetalleCliente;