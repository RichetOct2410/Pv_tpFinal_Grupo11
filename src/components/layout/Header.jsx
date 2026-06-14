import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

const Header = () => {
    const { admin, logout } = useContext(AdminContext);
    const navigate = useNavigate();

    const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
    };

    return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
        <Container>
        <Navbar.Brand as={Link} to={admin ? "/dashboard" : "/login"}>
            Panel Clientes
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
            {admin ? (
                <>
                <span className="text-white me-3">{admin.nombre} ({admin.sector})</span>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                    Cerrar Sesión
                </Button>
                </>
            ) : (
                <Nav.Link as={Link} to="/login">
                <Button variant="outline-light" size="sm">Ingresar</Button>
                </Nav.Link>
            )}
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    );
};

export default Header;
