import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
	return (
		<footer className="bg-dark text-light py-4 mt-auto">
			<Container>
				<Row>
					<Col md={6} className="mb-2">
						<strong>Copyright / nombre del proyecto</strong>
						<div>© 2026 Panel de Control de Clientes — Grupo 11</div>
					</Col>
					<Col md={6} className="mb-2">
						<strong>Integrantes del grupo</strong>
						<div> Victor Efimov, Azamor Nicolás, Octavio Ricci, Luciana Cardozo.</div>
					</Col>
				</Row>
				<Row className="mt-3">
					<Col>
						<strong>Créditos de la API/materia</strong>
						<div>Datos provistos por FakeStoreAPI</div>
						<div>Trabajo Práctico — Programación Visual — UNJu</div>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
