import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AdminProvider } from "./context/AdminContext";
import routes from "./routes/routes";
import { useRoutes } from "react-router-dom";
import Header from "./components/layout/Header";

const AppRoutes = () => useRoutes(routes);

const App = () => {
    return (
    <AdminProvider>
        <BrowserRouter>
        <Header />
        <AppRoutes />
        </BrowserRouter>
    </AdminProvider>
  );
};

export default App;
