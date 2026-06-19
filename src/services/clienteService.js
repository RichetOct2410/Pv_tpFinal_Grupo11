import normales from "../data/normales";

const clienteService = (() => {
const obtenerClientes = () => {
    return [...normales];
};

const obtenerClientePorId = (id) => {
    return normales.find((cliente) => cliente.id === Number(id));
};

const buscarCliente = (texto) => {
    const termino = texto.toLowerCase().trim();
    return normales.filter((cliente) => {
      const nombre = cliente.nombre?.toLowerCase() || "";
      const ciudad = cliente.direccion?.ciudad?.toLowerCase() || "";
      return nombre.includes(termino) || ciudad.includes(termino);
    });
  };

  const agregarCliente = (cliente) => {
    const maxId = normales.length > 0 ? Math.max(...normales.map((c) => c.id)) : 0;
    const nuevoCliente = {
      ...cliente,
      id: maxId + 1,
    };

    normales.push(nuevoCliente);
    return [...normales];
  };

const actualizarCliente = (id, clienteActualizado) => {
    const indice = normales.findIndex((cliente) => cliente.id === Number(id));
    if (indice !== -1) {
      normales[indice] = {
        ...normales[indice],
        ...clienteActualizado,
        direccion: {
          ...normales[indice].direccion,
          ...clienteActualizado.direccion,
        },
      };
    }
    return [...normales];
  };

  const eliminarCliente = (id) => {
    const indice = normales.findIndex((cliente) => cliente.id === Number(id));
    if (indice !== -1) {
      normales.splice(indice, 1);
    }
    return [...normales];
  };

  return {
    obtenerClientes,
    obtenerClientePorId,
    buscarCliente,
    agregarCliente,
    eliminarCliente,
  };
})();

export default clienteService;
