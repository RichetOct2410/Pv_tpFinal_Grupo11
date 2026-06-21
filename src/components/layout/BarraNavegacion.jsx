import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { Navbar, Container, Nav, Button, Modal } from "react-bootstrap";

const BarraNavegacion = () => {
	const { admin, logout } = useContext(AdminContext);
	const navigate = useNavigate();
	const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

	const abrirConfirmacion = () => setMostrarConfirmacion(true);
	const cerrarConfirmacion = () => setMostrarConfirmacion(false);

	const confirmarLogout = () => {
		logout();
		navigate("/login", { replace: true });
	};

	return (
		<>
			<Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
				<Container>
					<Navbar.Brand as={Link} to={admin ? "/dashboard" : "/login"}>
						Panel Clientes
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
							<Nav.Link as={Link} to="/clientes">Clientes</Nav.Link>						<Nav.Link as={Link} to="/logs">Log del sistema</Nav.Link>							<Nav.Link as={Link} to="/admins">Administradores</Nav.Link>
						</Nav>
						<Nav className="ms-auto align-items-center">
							{admin ? (
								<>
									<span className="text-white me-3">{admin.nombre} ({admin.sector})</span>
									<Button variant="outline-light" size="sm" onClick={abrirConfirmacion}>
										Cerrar Sesión
									</Button>
								</>
							) : null}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<Modal show={mostrarConfirmacion} onHide={cerrarConfirmacion} centered>
				<Modal.Header closeButton>
					<Modal.Title>Confirmar cierre de sesión</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>¿Seguro que quieres cerrar sesión?</p>
					<p className="text-muted">Perderás tu sesión actual y volverás a la pantalla de ingreso.</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={cerrarConfirmacion}>
						Cancelar
					</Button>
					<Button variant="danger" onClick={() => { confirmarLogout(); cerrarConfirmacion(); }}>
						Cerrar Sesión
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default BarraNavegacion;
