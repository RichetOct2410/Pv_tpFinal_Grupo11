import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Alert, Button } from "react-bootstrap";
import clienteService from "../services/clienteService";
import FormularioCliente from "../components/commun/FormularioCliente";
import { useNotification } from "../context/NotificationContext";
import { AdminContext } from "../context/AdminContext";

const ClienteFormPage = () => {
  const navigate = useNavigate();
  const { admin } = useContext(AdminContext);

  const [error, setError] = useState("");
  const [bloqueado, setBloqueado] = useState(false);

  const { notify } = useNotification();

  useEffect(() => {
    if (admin?.sector === "Soporte") {
      setError("No tienes permisos para crear clientes.");
      setBloqueado(true);
      setTimeout(() => navigate("/clientes"), 2000);
    }
  }, [admin, navigate]);

  const manejarSubmit = async (cliente) => {
    try {
      const nuevoCliente = {
        email: cliente.email,
        username: cliente.username,
        password: "123456",
        active: cliente.active,
        name: {
          firstname: cliente.nombre,
          lastname: ""
        },
        address: {
          city: cliente.direccion.ciudad,
          street: cliente.direccion.calle,
          number: 0,
          zipcode: cliente.direccion.codigoPostal
        },
        phone: cliente.telefono
      };

      const respuesta = await clienteService.agregarCliente(nuevoCliente);

      notify(`Cliente agregado correctamente. ID asignado: ${respuesta.id}`);

      navigate("/clientes");
    } catch (e) {
      setError("No se pudo guardar el cliente. Intente nuevamente.");
    }
  };

  if (bloqueado) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h2>Nuevo cliente</h2>
              <p className="text-muted mb-0">
                Completa el formulario para registrar un nuevo cliente.
              </p>
            </div>
            <Button variant="outline-secondary" onClick={() => navigate("/clientes")}>×</Button>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <FormularioCliente onSubmit={manejarSubmit} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ClienteFormPage;