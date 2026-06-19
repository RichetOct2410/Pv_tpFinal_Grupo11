import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const FormularioCliente = ({ inicial, onSubmit }) => {
  const [cliente, setCliente] = useState({
    nombre: "",
    email: "",
    telefono: "",
    username: "",
    empresa: "",
    direccion: {
      calle: "",
      ciudad: "",
      codigoPostal: "",
    },
  });

  useEffect(() => {
    if (inicial) {
      setCliente(inicial);
    }
  }, [inicial]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("direccion.")) {
      const campo = name.split(".")[1];
      setCliente((prev) => ({
        ...prev,
        direccion: {
          ...prev.direccion,
          [campo]: value,
        },
      }));
    } else {
      setCliente((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(cliente);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="nombre"
              value={cliente.nombre}
              onChange={manejarCambio}
              placeholder="Nombre completo"
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={cliente.email}
              onChange={manejarCambio}
              placeholder="email@ejemplo.com"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              name="telefono"
              value={cliente.telefono}
              onChange={manejarCambio}
              placeholder="+54 9 ..."
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              value={cliente.username}
              onChange={manejarCambio}
              placeholder="usuario"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Empresa</Form.Label>
            <Form.Control
              name="empresa"
              value={cliente.empresa}
              onChange={manejarCambio}
              placeholder="Nombre de la empresa"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Calle</Form.Label>
            <Form.Control
              name="direccion.calle"
              value={cliente.direccion.calle}
              onChange={manejarCambio}
              placeholder="Calle y número"
              required
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              name="direccion.ciudad"
              value={cliente.direccion.ciudad}
              onChange={manejarCambio}
              placeholder="Ciudad"
              required
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Código postal</Form.Label>
            <Form.Control
              name="direccion.codigoPostal"
              value={cliente.direccion.codigoPostal}
              onChange={manejarCambio}
              placeholder="Código postal"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit">Guardar cliente</Button>
    </Form>
  );
};

export default FormularioCliente;
