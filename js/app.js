document.addEventListener("DOMContentLoaded", async () => {
    const selectOrigen = document.getElementById("moneda-origen");
    const selectDestino = document.getElementById("moneda-destino");
    const botonConvertir = document.getElementById("convertir");
    const inputMonto = document.getElementById("monto");
    const inputResultado = document.getElementById("resultado");
    const listaHistorial = document.getElementById("historial");

    const datosApi = await obtenerTasasDeCambio();
    const monedas = datosApi ? datosApi.rates : await obtenerMonedasLocales();

    // Llenar los selectores con monedas
    for (const [codigo, nombre] of Object.entries(monedas)) {
        const opcionOrigen = document.createElement("option");
        const opcionDestino = document.createElement("option");
        opcionOrigen.value = codigo;
        opcionDestino.value = codigo;
        opcionOrigen.textContent = nombre;
        opcionDestino.textContent = nombre;
        selectOrigen.appendChild(opcionOrigen);
        selectDestino.appendChild(opcionDestino);
    }

    // Manejar la conversión
    botonConvertir.addEventListener("click", () => {
        const monedaOrigen = selectOrigen.value;
        const monedaDestino = selectDestino.value;
        const monto = parseFloat(inputMonto.value);

        if (isNaN(monto)) {
        alert("Por favor, ingrese un monto válido");
        return;
        }

        const tasa = datosApi.rates[monedaDestino] / datosApi.rates[monedaOrigen];
      const resultado = (monto * tasa).toFixed(2);

        inputResultado.value = `${resultado} ${monedaDestino}`;

      // Actualizar historial
        const itemHistorial = document.createElement("li");
        itemHistorial.className = "list-group-item";
        itemHistorial.textContent = `${monto} ${monedaOrigen} = ${resultado} ${monedaDestino}`;
        listaHistorial.appendChild(itemHistorial);

      // Guardar en localStorage
        guardarHistorialLocal(itemHistorial.textContent);
    });
    
    // Obtener historial de localStorage
    cargarHistorialLocal();
    });
    
  // Funciones auxiliares
    const obtenerMonedasLocales = async () => {
    const respuesta = await fetch("data/monedas.json");
    return await respuesta.json();
    };

    const guardarHistorialLocal = (conversion) => {
    const historial = JSON.parse(localStorage.getItem("historial")) || [];
    historial.push(conversion);
    localStorage.setItem("historial", JSON.stringify(historial));
    };

    const cargarHistorialLocal = () => {
    const historial = JSON.parse(localStorage.getItem("historial")) || [];
    const listaHistorial = document.getElementById("historial");
    historial.forEach((item) => {
        const itemHistorial = document.createElement("li");
        itemHistorial.className = "list-group-item";
        itemHistorial.textContent = item;
        listaHistorial.appendChild(itemHistorial);
    });
    };
