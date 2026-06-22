import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Alert, InputGroup } from "react-bootstrap";

const FormularioCliente = ({ inicial, onSubmit }) => {
  const [cliente, setCliente] = useState({
    nombre: "",
    email: "",
    telefono: "",
    username: "",
    empresa: "",
    active: true,
    direccion: {
      calle: "",
      ciudad: "",
      codigoPostal: "",
    },
  });
  const [errores, setErrores] = useState({});
  const [mostrarErrores, setMostrarErrores] = useState(false);

  useEffect(() => {
    if (inicial) {
      setCliente(inicial);
    }
  }, [inicial]);

  const validarEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const soloNumeros = (valor) => {
    return valor.replace(/[^0-9]/g, "");
  };
  
  const soloLetras = (valor) => {
    // Permitir letras (incluye acentos) y espacios
    return valor.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "").replace(/\s{2,}/g, " ");
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!cliente.nombre || cliente.nombre.trim() === "") {
      nuevosErrores.nombre = "El nombre es requerido.";
    }

    if (!cliente.email || cliente.email.trim() === "") {
      nuevosErrores.email = "El email es requerido.";
    } else if (!validarEmail(cliente.email)) {
      nuevosErrores.email = "El email no es válido.";
    }

    if (!cliente.telefono || cliente.telefono.trim() === "") {
      nuevosErrores.telefono = "El teléfono es requerido.";
    }

    if (!cliente.username || cliente.username.trim() === "") {
      nuevosErrores.username = "El username es requerido.";
    }

    if (!cliente.empresa || cliente.empresa.trim() === "") {
      nuevosErrores.empresa = "La empresa es requerida.";
    }

    if (cliente.active === undefined || cliente.active === null) {
      nuevosErrores.active = "El estado es requerido.";
    }

    if (!cliente.direccion.calle || cliente.direccion.calle.trim() === "") {
      nuevosErrores.calle = "La calle es requerida.";
    }

    if (!cliente.direccion.ciudad || cliente.direccion.ciudad.trim() === "") {
      nuevosErrores.ciudad = "La ciudad es requerida.";
    }

    if (!cliente.direccion.codigoPostal || cliente.direccion.codigoPostal.trim() === "") {
      nuevosErrores.codigoPostal = "El código postal es requerido.";
    }

    setErrores(nuevosErrores);
    const tieneErrores = Object.keys(nuevosErrores).length > 0;
    setMostrarErrores(tieneErrores);
    return !tieneErrores;
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    let valorFinal = value;

    // Aplicar restricción de solo números para teléfono y código postal
    if (name === "telefono" || name === "direccion.codigoPostal") {
      valorFinal = soloNumeros(value);
    } else if (name === "nombre" || name === "direccion.ciudad") {
      // Aplicar restricción de solo letras para nombre y ciudad
      valorFinal = soloLetras(value);
    }

    if (name.startsWith("direccion.")) {
      const campo = name.split(".")[1];
      setCliente((prev) => ({
        ...prev,
        direccion: {
          ...prev.direccion,
          [campo]: valorFinal,
        },
      }));
    } else {
      setCliente((prev) => ({
        ...prev,
        [name]: valorFinal,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      onSubmit(cliente);
    }
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
              isInvalid={!!errores.nombre}
            />
            {errores.nombre && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errores.nombre}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              value={cliente.email}
              onChange={manejarCambio}
              placeholder="email@ejemplo.com"
              isInvalid={!!errores.email}
            />
            {errores.email && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errores.email}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
         <Form.Group controlId="formTelefono">
            <Form.Label>Teléfono</Form.Label>
            <InputGroup hasValidation>
    <InputGroup.Text className="bg-light border-end-0 text-muted fw-medium">+</InputGroup.Text>
            <Form.Control
              className="border-start-0 ps-1"
              name="telefono"
              value={cliente.telefono}
              onChange={manejarCambio}
              placeholder="54 9 ..."
              isInvalid={!!errores.telefono}
            />
            {errores.telefono && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errores.telefono}
              </Form.Control.Feedback>
            )}
          </InputGroup>
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
              isInvalid={!!errores.username}
            />
            {errores.username && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errores.username}
              </Form.Control.Feedback>
            )}
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
              isInvalid={!!errores.empresa}
            />
            {errores.empresa && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errores.empresa}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              name="active"
              value={cliente.active ? "true" : "false"}
              onChange={(e) => {
                const value = e.target.value === "true";
                setCliente((prev) => ({ ...prev, active: value }));
              }}
              isInvalid={!!errores.active}
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </Form.Select>
            {errores.active && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errores.active}
              </Form.Control.Feedback>
            )}
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
              isInvalid={!!errores.calle}
            />
            {errores.calle && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errores.calle}
              </Form.Control.Feedback>
            )}
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
              isInvalid={!!errores.ciudad}
            />
            {errores.ciudad && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errores.ciudad}
              </Form.Control.Feedback>
            )}
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
              isInvalid={!!errores.codigoPostal}
            />
            {errores.codigoPostal && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errores.codigoPostal}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit">Guardar cliente</Button>
    </Form>
  );
};

export default FormularioCliente;

