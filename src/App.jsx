import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AdminProvider } from "./context/AdminContext";
import routes from "./routes/routes";
import { useRoutes } from "react-router-dom";
import BarraNavegacion from "./components/layout/BarraNavegacion";
import Footer from "./components/layout/Footer";

const AppRoutes = () => useRoutes(routes);

const App = () => {
    return (
    <AdminProvider>
        <BrowserRouter>
        <BarraNavegacion />
        <AppRoutes />
        <Footer />
        </BrowserRouter>
    </AdminProvider>
  );
};

export default App;
