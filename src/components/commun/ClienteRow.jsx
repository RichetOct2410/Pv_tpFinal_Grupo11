import React from "react";
import { Button } from "react-bootstrap";

const ClienteRow = ({ cliente, onVer, onEditar, onEliminar, puedeGestionar }) => {
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
        <Button
          variant="primary"
          size="sm"
          className="me-1"
          onClick={() => onVer(cliente.id)}
        >
          Ver
        </Button>

        {puedeGestionar && (
          <>
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