import { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const adminGuardado = sessionStorage.getItem("admin");

    if (!adminGuardado) {
      return null;
    }

    try {
      const adminParseado = JSON.parse(adminGuardado);

      if (
        !adminParseado.user ||
        !adminParseado.password ||
        !adminParseado.sector
      ) {
        sessionStorage.removeItem("admin");
        return null;
      }

      return adminParseado;
    } catch {
      sessionStorage.removeItem("admin");
      return null;
    }
  });

  useEffect(() => {
    if (admin) {
      sessionStorage.setItem("admin", JSON.stringify(admin));
    } else {
      sessionStorage.removeItem("admin");
    }
  }, [admin]);

  const login = (adminObj) => {
    setAdmin(adminObj);
  };

  const logout = () => {
    setAdmin(null);
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};