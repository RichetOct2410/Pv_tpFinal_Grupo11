const API_URL = "https://fakestoreapi.com/users";
const STORAGE_KEY = "clientes_creados";
const STORAGE_DELETED_KEY = "clientes_eliminados";

const obtenerClientesLocales = () => {
  const guardados = localStorage.getItem(STORAGE_KEY);
  return guardados ? JSON.parse(guardados) : [];
};

const guardarClientesLocales = (clientes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));
};

const obtenerClientesEliminados = () => {
  const guardados = localStorage.getItem(STORAGE_DELETED_KEY);
  return guardados ? JSON.parse(guardados) : [];
};

const guardarClientesEliminados = (ids) => {
  localStorage.setItem(STORAGE_DELETED_KEY, JSON.stringify(ids));
};

const clienteService = (() => {
  const obtenerClientes = async () => {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
      throw new Error("No se pudieron obtener los clientes.");
    }

    const clientesApi = await respuesta.json();
    const clientesLocales = obtenerClientesLocales();
    const eliminados = obtenerClientesEliminados();

    const combinados = new Map();

    clientesApi
      .filter((cliente) => !eliminados.includes(Number(cliente.id)))
      .forEach((cliente) => combinados.set(Number(cliente.id), cliente));

    clientesLocales.forEach((cliente) => {
      combinados.set(Number(cliente.id), cliente);
    });

    return Array.from(combinados.values());
  };

  const obtenerClientePorId = async (id) => {
    const clienteLocal = obtenerClientesLocales().find(
      (cliente) => Number(cliente.id) === Number(id)
    );

    if (clienteLocal) {
      return clienteLocal;
    }

    const eliminados = obtenerClientesEliminados();
    if (eliminados.includes(Number(id))) {
      throw new Error("No se pudo obtener el cliente.");
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

  const actualizarClienteLocal = async (clienteActualizado) => {
    const clientesLocales = obtenerClientesLocales();
    const index = clientesLocales.findIndex(
      (cliente) => Number(cliente.id) === Number(clienteActualizado.id)
    );

    let siguientes;

    if (index !== -1) {
      siguientes = clientesLocales.map((cliente) =>
        Number(cliente.id) === Number(clienteActualizado.id)
          ? clienteActualizado
          : cliente
      );
    } else {
      siguientes = [...clientesLocales, clienteActualizado];
    }

    guardarClientesLocales(siguientes);
    return clienteActualizado;
  };

  const eliminarCliente = async (id) => {
    const clientesLocales = obtenerClientesLocales();
    const idNumerico = Number(id);

    if (clientesLocales.some((cliente) => Number(cliente.id) === idNumerico)) {
      guardarClientesLocales(
        clientesLocales.filter((cliente) => Number(cliente.id) !== idNumerico)
      );
    }

    const eliminados = obtenerClientesEliminados();
    if (!eliminados.includes(idNumerico)) {
      guardarClientesEliminados([...eliminados, idNumerico]);
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
    actualizarClienteLocal,
    eliminarCliente
  };
})();

export default clienteService;