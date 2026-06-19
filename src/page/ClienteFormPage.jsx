import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Alert } from "react-bootstrap";
import clienteService from "../services/clienteService";
import FormularioCliente from "../components/commun/FormularioCliente";

const ClienteFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);
  const [clienteInicial, setClienteInicial] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (esEdicion) {
      const cliente = clienteService.obtenerClientePorId(id);
      if (!cliente) {
        setError("Cliente no encontrado.");
      } else {
        setClienteInicial(cliente);
      }
    }
  }, [esEdicion, id]);

  const manejarSubmit = (cliente) => {
    try {
      if (esEdicion) {
        clienteService.actualizarCliente(id, cliente);
      } else {
        clienteService.agregarCliente(cliente);
      }
      navigate("/clientes");
    } catch (e) {
      setError("No se pudo guardar el cliente. Intente nuevamente.");
    }
  };

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
