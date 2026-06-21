import React, { useContext } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

const Error404 = () => {
    const navigate = useNavigate();
    const { admin, logout } = useContext(AdminContext);

    const handleSalir = () => {
        if (admin) {
            navigate("/dashboard", { replace: true });
        } else {
            logout();
            navigate("/login", { replace: true });
        }
    };

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: "80vh" }}>
            <h1 className="display-1 fw-bold text-danger">404</h1>
            <h2 className="mb-3">¡Epa! Página no encontrada</h2>
            <p className="text-muted mb-4 max-width-500">
                La ruta a la que estás intentando acceder no existe o fue movida. 
                Verificá que esté bien escrita o volvé al panel principal.
            </p>
            <Button variant="primary" size="lg" onClick={handleSalir}>
                Salir
            </Button>
        </Container>
    );
};

export default Error404;