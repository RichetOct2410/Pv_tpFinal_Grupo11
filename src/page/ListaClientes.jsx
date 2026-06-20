import React, { useState, useEffect, useContext } from "react";
import { Table, Form, FormControl, InputGroup, Alert, Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ComponenteLoader from "../components/commun/Loader";
import ClienteRow from "../components/commun/ClienteRow";
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
    const cargarClientes = async () => {
        try {
            setLoading(true);
            setError(null);

            const datos = await clienteService.obtenerClientes();

            setClientes(datos);
        } catch (err) {
            setError(err.message || "Ocurrió un error inesperado.");
        } finally {
            setLoading(false);
        }
    };
    cargarClientes();
}, []);

    const clientesFiltrados = clientes.filter((cliente) => {
    const nombreCompleto = `${cliente.name?.firstname || ""} ${cliente.name?.lastname || ""}`.toLowerCase();
    const textoBusqueda = busqueda.toLowerCase().trim();

    return nombreCompleto.includes(textoBusqueda);
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

    const manejarEliminar = async () => {
    if (!clienteAEliminar) return;

    try {
        await clienteService.eliminarCliente(clienteAEliminar.id);

        setClientes((prev) =>
            prev.filter((cliente) => cliente.id !== clienteAEliminar.id)
        );

        const hora = new Date().toLocaleTimeString();

        notify(`Se modificó la lista de clientes a las ${hora}`, "danger");

        cerrarModal();
    } catch (err) {
        setError(err.message || "No se pudo eliminar el cliente.");
        cerrarModal();
    }
};

    const manejarToggleActivo = async (cliente) => {
        try {
            const clienteActualizado = {
                ...cliente,
                active: cliente.active !== false ? false : true,
            };

            await clienteService.actualizarClienteLocal(clienteActualizado);

            setClientes((prev) =>
                prev.map((item) =>
                    item.id === clienteActualizado.id ? clienteActualizado : item
                )
            );

            notify(`Cliente ${clienteActualizado.name?.firstname} ${clienteActualizado.name?.lastname} ${clienteActualizado.active ? "activado" : "desactivado"}`);
        } catch (err) {
            setError(err.message || "No se pudo cambiar el estado del cliente.");
        }
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
                                placeholder="Buscar por nombre..."
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
                            <th className="text-center">Estado</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientesFiltrados.length > 0 ? (
                                                        clientesFiltrados.map((cliente) => (
                                                        <ClienteRow
                                                            key={cliente.id}
                                                            cliente={cliente}
                                                            onVer={(id) => navigate(`/clientes/${id}`)}
                                                            onEliminar={confirmarEliminar}
                                                            onToggleActivo={manejarToggleActivo}
                                                            puedeGestionar={admin?.sector === "Gerencia"}
                                                        />
                                                        ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-4 text-muted">
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
                    <p>¿Seguro que quieres eliminar a <strong>{clienteAEliminar?.name?.firstname} {clienteAEliminar?.name?.lastname}</strong>?</p>
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
