import { Navigate } from "react-router-dom";
import Login from "../page/Login";
import Dashboard from "../page/Dashboard";
import ListaClientes from "../page/ListaClientes";
import DetalleCliente from "../page/DetalleCliente";
import RutaProtegida from "../components/commun/RutaProtegida";

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