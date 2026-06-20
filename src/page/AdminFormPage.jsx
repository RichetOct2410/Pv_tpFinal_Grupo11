import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import adminService from "../services/adminService";
import { AdminContext } from "../context/AdminContext";
import { useNotification } from "../context/NotificationContext";

const AdminFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin, login } = useContext(AdminContext);
  const [form, setForm] = useState({ nombre: "", user: "", password: "", sector: "" });
  const [error, setError] = useState("");
  const [erroresValidacion, setErroresValidacion] = useState({});
  const [bloqueado, setBloqueado] = useState(false);

  useEffect(() => {
    if (admin?.sector === "Soporte") {
      setError("No tienes permisos para editar administradores.");
      setBloqueado(true);
      setTimeout(() => navigate("/admins"), 2000);
      return;
    }

    const a = adminService.obtenerAdminPorId(id);
    if (!a) {
      setError("Administrador no encontrado.");
      return;
    }
    setForm({ nombre: a.nombre, user: a.user, password: a.password, sector: a.sector });
  }, [id, admin, navigate]);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const { notify } = useNotification();

  const validarEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!form.nombre || form.nombre.trim() === "") {
      nuevosErrores.nombre = "El nombre es requerido.";
    }

    if (!form.user || form.user.trim() === "") {
      nuevosErrores.user = "El email es requerido.";
    } else if (!validarEmail(form.user)) {
      nuevosErrores.user = "El email no es válido.";
    }

    if (!form.password || form.password.trim() === "") {
      nuevosErrores.password = "La contraseña es requerida.";
    }

    if (!form.sector || form.sector === "") {
      nuevosErrores.sector = "El sector es requerido.";
    }

    setErroresValidacion(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) {
      return;
    }

    try {
      adminService.actualizarAdmin(id, form, admin?.id);

      if (admin?.id === Number(id)) {
        const updated = adminService.obtenerAdminPorId(id);
        login(updated);
      }

      notify(`Se actualizó la cuenta del administrador ${form.nombre}`);
      navigate("/admins");
    } catch (err) {
      setError(err.message || "No autorizado");
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

  return (
    <Container className="py-4">
      <Card>
        <Card.Body>
          <h2>Editar administrador</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control name="nombre" value={form.nombre} onChange={handleChange} isInvalid={!!erroresValidacion.nombre} />
              {erroresValidacion.nombre && (
                <Form.Control.Feedback type="invalid" className="d-block">
                  {erroresValidacion.nombre}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name="user" value={form.user} onChange={handleChange} isInvalid={!!erroresValidacion.user} />
              {erroresValidacion.user && (
                <Form.Control.Feedback type="invalid" className="d-block">
                  {erroresValidacion.user}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control name="password" value={form.password} onChange={handleChange} isInvalid={!!erroresValidacion.password} />
              {erroresValidacion.password && (
                <Form.Control.Feedback type="invalid" className="d-block">
                  {erroresValidacion.password}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sector</Form.Label>
              <Form.Select name="sector" value={form.sector} onChange={handleChange} isInvalid={!!erroresValidacion.sector}>
                <option value="">Seleccionar sector</option>
                <option value="Soporte">Soporte</option>
                <option value="Gerencia">Gerencia</option>
              </Form.Select>
              {erroresValidacion.sector && (
                <Form.Control.Feedback type="invalid" className="d-block">
                  {erroresValidacion.sector}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <div className="d-flex gap-2">
              <Button type="submit" variant="primary">Guardar</Button>
              <Button variant="secondary" onClick={() => navigate(-1)}>Cancelar</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminFormPage;
