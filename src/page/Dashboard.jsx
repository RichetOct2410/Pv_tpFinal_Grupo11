import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import adminService from "../services/adminService";
import clienteService from "../services/clienteService";

const Dashboard = () => {
	const [counts, setCounts] = useState({ admins: 0, gerencia: 0, soporte: 0, normales: 0 });

	const refresh = () => {
		const admins = adminService.obtenerAdmins();
		const normales = clienteService.obtenerClientes();
		const gerencia = admins.filter(a => a.sector === "Gerencia").length;
		const soporte = admins.filter(a => a.sector === "Soporte").length;
		setCounts({ admins: admins.length, gerencia, soporte, normales: normales.length });
	};

	useEffect(() => {
		refresh();
		const id = setInterval(refresh, 1000);
		return () => clearInterval(id);
	}, []);

	return (
		<Container className="py-4">
			<h2>Dashboard</h2>
			<p className="text-muted">Bienvenido al panel de administración.</p>

			<Row className="mt-4">
				<Col md={3}>
					<Card className="text-center">
						<Card.Body>
							<Card.Title>Administradores</Card.Title>
							<Card.Text style={{fontSize: '1.5rem'}}>{counts.admins}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col md={3}>
					<Card className="text-center">
						<Card.Body>
							<Card.Title>Gerencia</Card.Title>
							<Card.Text style={{fontSize: '1.5rem'}}>{counts.gerencia}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col md={3}>
					<Card className="text-center">
						<Card.Body>
							<Card.Title>Soporte</Card.Title>
							<Card.Text style={{fontSize: '1.5rem'}}>{counts.soporte}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col md={3}>
					<Card className="text-center">
						<Card.Body>
							<Card.Title>Usuarios normales</Card.Title>
							<Card.Text style={{fontSize: '1.5rem'}}>{counts.normales}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Dashboard;
