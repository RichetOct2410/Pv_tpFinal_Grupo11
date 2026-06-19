import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import clienteService from "../services/clienteService";

const DetalleCliente = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const cliente = clienteService.obtenerClientePorId(id);

    if (!cliente) {
        return (
            <Container className="py-4">
                <h2>Cliente no encontrado</h2>
                <p>No existe un cliente con el ID solicitado.</p>
                <Button variant="secondary" onClick={() => navigate("/clientes")}>Volver a la lista</Button>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <Row className="mb-4">
                <Col>
                    <h2>Detalle del Cliente</h2>
                    <p className="text-muted">Información registrada en el sistema local.</p>
                </Col>
            </Row>

            <Card>
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <h5>Datos personales</h5>
                            <p><strong>Nombre:</strong> {cliente.nombre}</p>
                            <p><strong>Email:</strong> {cliente.email}</p>
                            <p><strong>Teléfono:</strong> {cliente.telefono}</p>
                            <p><strong>Username:</strong> {cliente.username}</p>
                            <p><strong>Empresa:</strong> {cliente.empresa}</p>
                        </Col>
                        <Col md={6}>
                            <h5>Dirección</h5>
                            <p><strong>Calle:</strong> {cliente.direccion.calle}</p>
                            <p><strong>Ciudad:</strong> {cliente.direccion.ciudad}</p>
                            <p><strong>Código postal:</strong> {cliente.direccion.codigoPostal}</p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <div className="mt-4 d-flex gap-2 flex-wrap">
                <Button variant="secondary" onClick={() => navigate("/clientes")}>Volver a la lista</Button>
                <Button variant="warning" onClick={() => navigate(`/clientes/${cliente.id}/editar`)}>Editar Cliente</Button>
            </div>
        </Container>
    );
};

export default DetalleCliente;
