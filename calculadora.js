document.addEventListener('DOMContentLoaded', function() {
    // Cargar el historial guardado al abrir la aplicación
    mostrarHistorial();

    document.getElementById('btnCalcular').addEventListener('click', function() {
        let dap = parseFloat(document.getElementById('inputDap').value);
        let altura = parseFloat(document.getElementById('inputAltura').value);
        let especie = document.getElementById('selectEspecie').value;
        
        if(isNaN(dap) || isNaN(altura) || dap <= 0 || altura <= 0) {
            alert("Por favor, ingresa valores válidos para el DAP y la Altura.");
            return;
        }

        // Constantes del archivo base
        const piCuartos = 0.7854;
        let factorForma = (especie === "latifoliada") ? 0.7 : 0.4;

        // Fórmula de volumen
        let volumen = piCuartos * (dap * dap) * altura * factorForma;
        let volumenFormateado = volumen.toFixed(4);

        // Mostrar el resultado actual
        document.getElementById('resultadoVolumen').innerHTML = `${volumenFormateado}<span style="font-size: 1.1rem; font-weight: 500;"> m³</span>`;

        // Guardar la operación en el historial local
        guardarEnHistorial(especie, dap, altura, volumenFormateado);
    });

    document.getElementById('btnLimpiar').addEventListener('click', function() {
        if(confirm("¿Seguro que deseas borrar todo el historial?")) {
            localStorage.removeItem('historialForestal');
            mostrarHistorial();
        }
    });
});

// Función para guardar datos en el almacenamiento local del teléfono
function guardarEnHistorial(especie, dap, altura, volumen) {
    let historial = JSON.parse(localStorage.getItem('historialForestal')) || [];
    
    // Crear el nuevo registro con formato legible
    let nuevoRegistro = {
        especie: especie.charAt(0).toUpperCase() + especie.slice(1),
        dap: dap,
        altura: altura,
        volumen: volumen,
        fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Agregar al inicio del arreglo para que aparezca primero lo más reciente
    historial.unshift(nuevoRegistro);

    // Limitar el historial a los últimos 20 elementos para optimizar espacio
    if(historial.length > 20) historial.pop();

    localStorage.setItem('historialForestal', JSON.stringify(historial));
    mostrarHistorial();
}

// Función para renderizar el historial en la interfaz
function mostrarHistorial() {
    let historial = JSON.parse(localStorage.getItem('historialForestal')) || [];
    let contenedor = document.getElementById('listaHistorial');
    
    if (historial.length === 0) {
        contenedor.innerHTML = '<p class="text-center text-white-50 small my-3">No hay cálculos guardados</p>';
        return;
    }

    let html = '';
    historial.forEach(item => {
        html += `
            <div class="history-item">
                <div class="d-flex justify-content-between font-weight-bold mb-1">
                    <span><strong>${item.especie}</strong></span>
                    <span class="text-white-50 font-monospace">${item.fecha}</span>
                </div>
                <div class="text-white-50 small">
                    DAP: ${item.dap}m | Alt: ${item.altura}m | <strong>Vol: ${item.volumen} m³</strong>
                </div>
            </div>
        `;
    });
    
    contenedor.innerHTML = html;
}