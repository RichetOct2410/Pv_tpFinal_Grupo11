import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { AdminContext } from "../context/AdminContext";
import admins from "../data/admins";

const Login = () => {
  const { login } = useContext(AdminContext);
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [sector, setSector] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nombre.trim() === "" || sector === "") {
      setError("Debe completar el nombre y seleccionar un sector.");
      return;
    }

    const adminExiste = admins.find(
      (admin) =>
        admin.nombre.toLowerCase() === nombre.trim().toLowerCase() &&
        admin.sector === sector
    );

    if (!adminExiste) {
      setError("Administrador no encontrado.");
      return;
    }


    login(adminExiste);
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
              <Form.Label>Nombre del Administrador</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Gustavo Sosa"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sector</Form.Label>
              <Form.Select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
              >
                <option value="">Seleccionar sector</option>
                <option value="Soporte">Soporte</option>
                <option value="Gerencia">Gerencia</option>
              </Form.Select>
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