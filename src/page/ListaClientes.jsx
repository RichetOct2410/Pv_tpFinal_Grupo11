import React, { useState, useEffect } from "react";
import { Table, Form, FormControl, InputGroup, Alert, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ComponenteLoader from "../components/commun/Loader";
const ListaClientes = () => {
    const navigate = useNavigate();

    const [clientes, setClientes] = useState([]);       
    const [loading, setLoading] = useState(true);       
    const [error, setError] = useState(null);           
    const [busqueda, setBusqueda] = useState("");       

    useEffect(() => {
        const obtenerClientesAPI = async () => {
            try {
                setLoading(true); 
                // Limpia errores anteriores antes de una nueva consulta
                setError(null);
                const respuesta = await fetch("https://fakestoreapi.com/users");
                if (!respuesta.ok) {
                    throw new Error("No se pudo conectar con el servidor de clientes.");
                }
                const datos = await respuesta.json();
                // Guarda los clientes obtenidos en el estado
                setClientes(datos); 
            } catch (err) {
                setError(err.message || "Ocurrió un error inesperado.");
            } finally {
                setLoading(false); 
            }
        };

        obtenerClientesAPI();
    }, []);
    
    // Filtra clientes por apellido o ciudad según el texto ingresado
    const clientesFiltrados = clientes.filter((cliente) => {
        const apellido = cliente.name?.lastname?.toLowerCase() || "";
        const ciudad = cliente.address?.city?.toLowerCase() || "";
        const textoBusqueda = busqueda.toLowerCase().trim();
        return apellido.includes(textoBusqueda) || ciudad.includes(textoBusqueda);
    });

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
                <ComponenteLoader />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">
                    <Alert.Heading>Error de Conexión</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <Row className="mb-4 align-items-center">
                <Col md={6}>
                    <h2>Panel de Control de Clientes</h2>
                    <p className="text-muted">Lista de usuarios activos en FakeStoreAPI</p>
                </Col>
                <Col md={6}>
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1">🔍</InputGroup.Text>
                            <FormControl
                                placeholder="Buscar por apellido o ciudad..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                        </InputGroup>
                    </Form>
                </Col>
            </Row>

            <div className="table-responsive shadow-sm rounded">
                <Table striped bordered hover className="align-middle bg-white mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre Completo</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Ciudad</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientesFiltrados.length > 0 ? (
                            clientesFiltrados.map((cliente) => (
                                <tr key={cliente.id}>
                                    <td><strong>#{cliente.id}</strong></td>
                                    <td className="text-capitalize">
                                        {cliente.name?.firstname} {cliente.name?.lastname}
                                    </td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.phone}</td>
                                    <td className="text-capitalize">{cliente.address?.city}</td>
                                    <td className="text-center">
                                        <button 
                                            className="btn btn-primary btn-sm px-3"
                                            onClick={() => navigate(`/clientes/${cliente.id}`)}
                                        >
                                            Ver Ficha Completa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-muted">
                                    No se encontraron clientes que coincidan con la búsqueda.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default ListaClientes;