const API_URL = "https://fakestoreapi.com/users";
const STORAGE_KEY = "clientes_creados";

const obtenerClientesLocales = () => {
  const guardados = localStorage.getItem(STORAGE_KEY);
  return guardados ? JSON.parse(guardados) : [];
};

const guardarClientesLocales = (clientes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));
};

const clienteService = (() => {
  const obtenerClientes = async () => {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
      throw new Error("No se pudieron obtener los clientes.");
    }

    const clientesApi = await respuesta.json();
    const clientesLocales = obtenerClientesLocales();

    return [...clientesApi, ...clientesLocales];
  };

  const obtenerClientePorId = async (id) => {
    const clienteLocal = obtenerClientesLocales().find(
      (cliente) => cliente.id === Number(id)
    );

    if (clienteLocal) {
      return clienteLocal;
    }

    const respuesta = await fetch(`${API_URL}/${id}`);

    if (!respuesta.ok) {
      throw new Error("No se pudo obtener el cliente.");
    }

    return await respuesta.json();
  };

  const agregarCliente = async (cliente) => {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cliente)
    });

    if (!respuesta.ok) {
      throw new Error("No se pudo agregar el cliente.");
    }

    const clienteCreado = await respuesta.json();

    const clientesLocales = obtenerClientesLocales();

    const nuevoCliente = {
      ...cliente,
      id: clienteCreado.id || Date.now()
    };

    guardarClientesLocales([...clientesLocales, nuevoCliente]);

    return nuevoCliente;
  };

  const eliminarCliente = async (id) => {
    const clientesLocales = obtenerClientesLocales();

    const existeLocal = clientesLocales.some(
      (cliente) => cliente.id === Number(id)
    );

    if (existeLocal) {
      guardarClientesLocales(
        clientesLocales.filter((cliente) => cliente.id !== Number(id))
      );

      return { id };
    }

    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (!respuesta.ok) {
      throw new Error("No se pudo eliminar el cliente.");
    }

    return await respuesta.json();
  };

  return {
    obtenerClientes,
    obtenerClientePorId,
    agregarCliente,
    eliminarCliente
  };
})();

export default clienteService;