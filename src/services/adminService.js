const adminsData = [
  {id: 1, nombre: "Victor Efimov", user: "victor@gmail.com", password: "victor123", sector: "Gerencia"},
  {id: 2, nombre: "Octavio Ricci", user: "octavio@gmail.com", password: "octavio123", sector: "Soporte"},
  {id: 3, nombre: "Luciana Cardozo", user: "luciana@gmail.com", password: "luciana123", sector: "Gerencia"},
  {id: 4, nombre: "Nicolas Azamor", user: "nicolas@gmail.com", password: "nicolas123", sector: "Soporte"},
];

const adminService = (() => {
  const obtenerAdmins = () => {
    return [...adminsData];
  };

  const obtenerAdminPorId = (id) => {
    return adminsData.find((a) => a.id === Number(id));
  };


  const actualizarAdmin = (id, datos, currentAdminId) => {
    if (Number(id) !== Number(currentAdminId)) {
      throw new Error("No autorizado para modificar este administrador.");
    }

    const indice = adminsData.findIndex((a) => a.id === Number(id));
    if (indice === -1) throw new Error("Administrador no encontrado.");

    adminsData[indice] = {
      ...adminsData[indice],
      ...datos,
    };

    return {...adminsData[indice]};
  };

  return {
    obtenerAdmins,
    obtenerAdminPorId,
    actualizarAdmin,
  };
})();

export default adminService;
