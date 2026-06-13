import { Navigate } from "react-router-dom";
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";
import ListaClientes from "../views/ListaClientes";
import DetalleCliente from "../views/DetalleCliente";
import RutaProtegida from "../components/common/RutaProtegida";

const routes = [
  {
    path: "/",
    element: <Navigate to="/login" replace />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: (
      <RutaProtegida>
        <Dashboard />
      </RutaProtegida>
    )
  },
  {
    path: "/clientes",
    element: (
      <RutaProtegida>
        <ListaClientes />
      </RutaProtegida>
    )
  },
  {
    path: "/clientes/:id",
    element: (
      <RutaProtegida>
        <DetalleCliente />
      </RutaProtegida>
    )
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />
  }
];

export default routes;