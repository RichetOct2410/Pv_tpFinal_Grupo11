import React from "react";
import BarraNavegacion from "./components/layout/BarraNavegacion";
import Footer from "./components/layout/Footer";

const App = ({ page }) => {
  return (
    <>
      <BarraNavegacion />
      {page}
      <Footer />
    </>
  );
};

export default App;
