import { Button } from "react-bootstrap";

const ClienteRow = ({ cliente, onVer, onEliminar, onToggleActivo, onToggleFavorito, puedeGestionar }) => {
  return (
    <tr>
      <td>
        <strong>#{cliente.id}</strong>
      </td>

      <td>
        {cliente.name?.firstname} {cliente.name?.lastname}
      </td>

      <td>{cliente.email}</td>

      <td>{cliente.phone}</td>

      <td className="text-capitalize">
        {cliente.address?.city}
      </td>

      <td className="text-center">
        {cliente.active !== false ? (
          <span className="badge bg-success">Activo</span>
        ) : (
          <span className="badge bg-secondary">Inactivo</span>
        )}
      </td>

      <td className="text-center">
        {cliente.favorite === true ? (
          <span className="text-warning">★</span>
        ) : (
          <span className="text-muted">☆</span>
        )}
      </td>

      <td className="text-center">
        <Button
          variant="primary"
          size="sm"
          className="me-1"
          onClick={() => onVer(cliente.id)}
        >
          Ver
        </Button>

        <Button
          variant={cliente.favorite === true ? "warning" : "outline-secondary"}
          size="sm"
          className="me-1"
          onClick={() => onToggleFavorito && onToggleFavorito(cliente)}
        >
          {cliente.favorite === true ? "Favorito" : "Marcar"}
        </Button>

        {puedeGestionar && (
          <>
            <Button
              variant={cliente.active !== false ? "outline-warning" : "outline-success"}
              size="sm"
              className="me-1"
              onClick={() => onToggleActivo && onToggleActivo(cliente)}
            >
              {cliente.active !== false ? "Desactivar" : "Activar"}
            </Button>

            <Button
              variant="danger"
              size="sm"
              onClick={() => onEliminar(cliente)}
            >
              Eliminar
            </Button>
          </>
        )}
      </td>
    </tr>
  );
};

export default ClienteRow;