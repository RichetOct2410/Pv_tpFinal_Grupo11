import React, { useState, useEffect, useContext } from "react";
import { Table, Form, FormControl, InputGroup, Alert, Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ComponenteLoader from "../components/commun/Loader";
import clienteService from "../services/clienteService";
import { useNotification } from "../context/NotificationContext";
import { AdminContext } from "../context/AdminContext";

const ListaClientes = () => {
    const navigate = useNavigate();
    const { admin } = useContext(AdminContext);

    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        setLoading(true);
        setError(null);

        try {
            const datos = clienteService.obtenerClientes();
            setClientes(datos);
        } catch (err) {
            setError(err.message || "Ocurrió un error inesperado.");
        } finally {
            setLoading(false);
        }
    }, []);

    const clientesFiltrados = clientes.filter((cliente) => {
        const nombre = cliente.nombre?.toLowerCase() || "";
        const ciudad = cliente.direccion?.ciudad?.toLowerCase() || "";
        const textoBusqueda = busqueda.toLowerCase().trim();
        return nombre.includes(textoBusqueda) || ciudad.includes(textoBusqueda);
    });

    const { notify } = useNotification();
    const [clienteAEliminar, setClienteAEliminar] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);

    const confirmarEliminar = (cliente) => {
        setClienteAEliminar(cliente);
        setMostrarModal(true);
    };

    const cerrarModal = () => {
        setClienteAEliminar(null);
        setMostrarModal(false);
    };

    const manejarEliminar = () => {
        if (!clienteAEliminar) return;

        const actualizados = clienteService.eliminarCliente(clienteAEliminar.id);
        setClientes(actualizados);
        const hora = new Date().toLocaleTimeString();
        notify(`Se modificó la lista de clientes a las ${hora}`);
        cerrarModal();
    };

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
                    <Alert.Heading>Error de carga</Alert.Heading>
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
                    <p className="text-muted">Lista de clientes registrados en el sistema</p>
                </Col>
                <Col md={6} className="text-md-end">
                    {admin?.sector !== "Soporte" && (
                        <Button variant="success" className="mb-3 me-2" onClick={() => navigate("/clientes/nuevo")}>Nuevo Cliente</Button>
                    )}
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1">🔍</InputGroup.Text>
                            <FormControl
                                placeholder="Buscar por nombre o ciudad..."
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
                            <th>Nombre</th>
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
                                    <td>{cliente.nombre}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.telefono}</td>
                                    <td className="text-capitalize">{cliente.direccion?.ciudad}</td>
                                    <td className="text-center">
                                        <Button variant="primary" size="sm" className="me-1" onClick={() => navigate(`/clientes/${cliente.id}`)}>
                                            Ver
                                        </Button>
                                        {admin?.sector !== "Soporte" && (
                                            <>
                                                <Button variant="warning" size="sm" className="me-1" onClick={() => navigate(`/clientes/${cliente.id}/editar`)}>
                                                    Editar
                                                </Button>
                                                <Button variant="danger" size="sm" onClick={() => confirmarEliminar(cliente)}>
                                                    Eliminar
                                                </Button>
                                            </>
                                        )}
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

            <Modal show={mostrarModal} onHide={cerrarModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>¿Seguro que quieres eliminar a <strong>{clienteAEliminar?.nombre}</strong>?</p>
                    <p className="text-muted">Esta acción no se puede deshacer.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cerrarModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={manejarEliminar}>
                        Eliminar cliente
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ListaClientes;
