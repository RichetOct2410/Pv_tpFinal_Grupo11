import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import adminService from "../services/adminService";
import { AdminContext } from "../context/AdminContext";

const Admins = () => {
  const navigate = useNavigate();
  const { admin } = useContext(AdminContext);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    setAdmins(adminService.obtenerAdmins());
  }, []);

  return (
    <Container className="py-4">
      <h2>Administradores</h2>
      <p className="text-muted">Lista de cuentas de administración (solo puedes editar tu propia cuenta)</p>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Sector</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.nombre}</td>
              <td>{a.user}</td>
              <td>{a.sector}</td>
              <td>
                {admin && admin.id === a.id ? (
                  <Button size="sm" variant="warning" onClick={() => navigate(`/admins/${a.id}/editar`)}>Editar</Button>
                ) : (
                  <Button size="sm" variant="secondary" disabled>Ver</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Admins;
