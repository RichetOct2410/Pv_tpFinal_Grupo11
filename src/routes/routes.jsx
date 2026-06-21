import React from "react";
import { Navigate } from "react-router-dom";
import Login from "../page/Login";
import Dashboard from "../page/Dashboard";
import ListaClientes from "../page/ListaClientes";
import DetalleCliente from "../page/DetalleCliente";
import ClienteFormPage from "../page/ClienteFormPage";
import Admins from "../page/Admins";
import AdminFormPage from "../page/AdminFormPage";
import Error404 from "../page/Error404";
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
    path: "/clientes/nuevo",
    element: (
      <RutaProtegida>
        <ClienteFormPage />
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
    path: "/admins",
    element: (
      <RutaProtegida>
        <Admins />
      </RutaProtegida>
    )
  },
  {
    path: "/admins/:id/editar",
    element: (
      <RutaProtegida>
        <AdminFormPage />
      </RutaProtegida>
    )
  },
  {
    path: "*",
    element: <Error404 />
  }
];

export default routes;