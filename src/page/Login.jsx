import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { AdminContext } from "../context/AdminContext";
import adminService from "../services/adminService";
import { useNotification } from "../context/NotificationContext";

const Login = () => {
  const { login } = useContext(AdminContext);
  const { notify } = useNotification();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.trim() === "" || password.trim() === "") {
      setError("Debe completar el email y la contraseña.");
      return;
    }

    const adminExiste = adminService.obtenerAdmins().find(
      (admin) =>
        admin.user.toLowerCase() === user.trim().toLowerCase() &&
        admin.password === password
    );

    if (!adminExiste) {
      setError("Email o contraseña incorrectos.");
      return;
    }

    login(adminExiste);
    notify(`Se inició sesión como ${adminExiste.nombre}`);
    navigate("/dashboard");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "26rem" }}>
        <Card.Body>
          <Card.Title>Ingreso del Administrador</Card.Title>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Ej: gustavososa@gmail.com"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contraseña"
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Ingresar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;