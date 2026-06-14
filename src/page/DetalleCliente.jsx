import React from "react";
import { useParams } from "react-router-dom";

const DetalleCliente = () => {
	const { id } = useParams();
	return (
		<div className="container py-4">
			<h2>Detalle del Cliente</h2>
			<p>ID: {id}</p>
		</div>
	);
};

export default DetalleCliente;
