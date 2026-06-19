import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import adminService from "../services/adminService";
import { AdminContext } from "../context/AdminContext";

const AdminFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin, login } = useContext(AdminContext);
  const [form, setForm] = useState({ nombre: "", user: "", password: "", sector: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const a = adminService.obtenerAdminPorId(id);
    if (!a) {
      setError("Administrador no encontrado.");
      return;
    }
    setForm({ nombre: a.nombre, user: a.user, password: a.password, sector: a.sector });
  }, [id]);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    try {

      adminService.actualizarAdmin(id, form, admin?.id);

      if (admin?.id === Number(id)) {
        const updated = adminService.obtenerAdminPorId(id);
        login(updated);
      }
      navigate("/admins");
    } catch (err) {
      setError(err.message || "No autorizado");
    }
  };

  return (
    <Container className="py-4">
      <Card>
        <Card.Body>
          <h2>Editar administrador</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control name="nombre" value={form.nombre} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="user" value={form.user} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" name="password" value={form.password} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sector</Form.Label>
              <Form.Select name="sector" value={form.sector} onChange={handleChange} required>
                <option value="">Seleccionar sector</option>
                <option value="Soporte">Soporte</option>
                <option value="Gerencia">Gerencia</option>
              </Form.Select>
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
