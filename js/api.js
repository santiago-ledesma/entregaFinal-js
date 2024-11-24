const obtenerTasasDeCambio = async () => {
    const url = "https://api.exchangerate-api.com/v4/latest/USD"; // Cambiar según disponibilidad de API
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error("Error al obtener tasas de cambio");
        return await respuesta.json();
    } catch (error) {
        console.error("Error al obtener datos de la API:", error);
      return null; // Manejar el error retornando null
    }
};
