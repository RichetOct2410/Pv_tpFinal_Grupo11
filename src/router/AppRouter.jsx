import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Login from "../page/Login";
import Dashboard from "../page/Dashboard";
import ListaClientes from "../page/ListaClientes";
import DetalleCliente from "../page/DetalleCliente";
import ClienteFormPage from "../page/ClienteFormPage";
import Admins from "../page/Admins";
import AdminFormPage from "../page/AdminFormPage";
import LogSistema from "../page/LogSistema";
import Error404 from "../page/Error404";
import RutaProtegida from "../components/commun/RutaProtegida";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App page={<Login />} />
  },
  {
    path: "/login",
    element: <App page={<Login />} />
  },
  {
    path: "/dashboard",
    element: <App page={<RutaProtegida><Dashboard /></RutaProtegida>} />
  },
  {
    path: "/clientes",
    element: <App page={<RutaProtegida><ListaClientes /></RutaProtegida>} />
  },
  {
    path: "/clientes/nuevo",
    element: <App page={<RutaProtegida><ClienteFormPage /></RutaProtegida>} />
  },
  {
    path: "/clientes/:id",
    element: <App page={<RutaProtegida><DetalleCliente /></RutaProtegida>} />
  },
  {
    path: "/admins",
    element: <App page={<RutaProtegida><Admins /></RutaProtegida>} />
  },
  {
    path: "/admins/:id/editar",
    element: <App page={<RutaProtegida><AdminFormPage /></RutaProtegida>} />
  },
  {
    path: "/logs",
    element: <App page={<RutaProtegida><LogSistema /></RutaProtegida>} />
  },
  {
    path: "*",
    element: <App page={<Error404 />} />
  }
]);
