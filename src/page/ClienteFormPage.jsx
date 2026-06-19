import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Alert } from "react-bootstrap";
import clienteService from "../services/clienteService";
import FormularioCliente from "../components/commun/FormularioCliente";
import { useNotification } from "../context/NotificationContext";
import { AdminContext } from "../context/AdminContext";

const ClienteFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useContext(AdminContext);
  const esEdicion = Boolean(id);
  const [clienteInicial, setClienteInicial] = useState(null);
  const [error, setError] = useState("");
  const [bloqueado, setBloqueado] = useState(false);

  useEffect(() => {
    if (admin?.sector === "Soporte" && esEdicion) {
      setError("No tienes permisos para editar clientes. Solo puedes verlos.");
      setBloqueado(true);
      setTimeout(() => navigate("/clientes"), 2000);
      return;
    }

    if (admin?.sector === "Soporte" && !esEdicion) {
      setError("No tienes permisos para crear clientes.");
      setBloqueado(true);
      setTimeout(() => navigate("/clientes"), 2000);
      return;
    }

    if (esEdicion) {
      const cliente = clienteService.obtenerClientePorId(id);
      if (!cliente) {
        setError("Cliente no encontrado.");
      } else {
        setClienteInicial(cliente);
      }
    }
  }, [esEdicion, id, admin, navigate]);

  const { notify } = useNotification();

  const manejarSubmit = (cliente) => {
    try {
      if (esEdicion) {
        clienteService.actualizarCliente(id, cliente);
      } else {
        clienteService.agregarCliente(cliente);
      }
      const hora = new Date().toLocaleTimeString();
      notify(`Se modificó la lista de clientes a las ${hora}`);
      navigate("/clientes");
    } catch (e) {
      setError("No se pudo guardar el cliente. Intente nuevamente.");
    }
  };

  if (bloqueado) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          {error}
        </Alert>
      </Container>
    );
  }

  if (esEdicion && !clienteInicial && !error) {
    return (
      <Container className="py-4">
        <p>Cargando datos del cliente...</p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <h2>{esEdicion ? "Editar cliente" : "Nuevo cliente"}</h2>
          <p className="text-muted">
            {esEdicion
              ? "Actualiza los datos del cliente registrado en el sistema."
              : "Completa el formulario para registrar un nuevo cliente."}
          </p>
          {error && <Alert variant="danger">{error}</Alert>}
          <FormularioCliente inicial={clienteInicial} onSubmit={manejarSubmit} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ClienteFormPage;
