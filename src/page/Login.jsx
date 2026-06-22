import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, InputGroup } from "react-bootstrap";
import { AdminContext } from "../context/AdminContext";
import adminService from "../services/adminService";
import { useNotification } from "../context/NotificationContext";

const Login = () => {
  const { login } = useContext(AdminContext);
  const { notify } = useNotification();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [errores, setErrores] = useState({});

  const validarEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = {};
    if (user.trim() === "") {
      nuevosErrores.user = "Debe completar el email.";
    } else if (!validarEmail(user.trim())) {
      nuevosErrores.user = "El email no es válido.";
    }
    if (password.trim() === "") {
      nuevosErrores.password = "Debe completar la contraseña.";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    const adminExiste = adminService.obtenerAdmins().find(
      (admin) =>
        admin.user.toLowerCase() === user.trim().toLowerCase() &&
        admin.password === password
    );

    if (!adminExiste) {
      setErrores({ password: "Email o contraseña incorrectos." });
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

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={user}
                onChange={(e) => {
                  setUser(e.target.value);
                  setErrores((prev) => ({ ...prev, user: undefined }));
                }}
                placeholder="Ej: gustavososa@gmail.com"
                isInvalid={!!errores.user}
              />
              <Form.Control.Feedback type="invalid">
                {errores.user}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <InputGroup>
                <Form.Control
                  type={mostrarPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrores((prev) => ({ ...prev, password: undefined }));
                  }}
                  placeholder="Ingrese su contraseña"
                  isInvalid={!!errores.password}
                />
                <InputGroup.Text
                  as="button"
                  type="button"
                  onClick={() => setMostrarPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  title={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  style={{ cursor: "pointer", borderColor: "#ced4da", backgroundColor: "#f8f9fa" }}
                >
                  {mostrarPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8Z"/>
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" fill="#fff"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 16 16">
                      <path d="M1.668 8S3.333 4 8 4s6.332 4 6.332 4-1.665 4-6.332 4S1.668 8 1.668 8Z"/>
                      <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                    </svg>
                  )}
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  {errores.password}
                </Form.Control.Feedback>
              </InputGroup>
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