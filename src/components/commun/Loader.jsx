import React from "react";
import { Spinner } from "react-bootstrap";

const ComponenteLoader = () => {
    return (
        <div className="d-flex justify-content-center align-items-center w-100 py-5">
            <Spinner animation="border" variant="primary" role="status">
                <span className="visually-hidden">Cargando...</span>
            </Spinner>
        </div>
    );
};

export default ComponenteLoader;