let total = 0;
let conteoIngresos = 0;

function agregarIngreso() {
    const ingresoInput = document.getElementById('income');
    const ingreso = parseFloat(ingresoInput.value);
    if (!isNaN(ingreso)) {
        total += ingreso;
        conteoIngresos++;
        document.getElementById('totalIncome').textContent = `Total: $${total.toFixed(2)}`;
        
        const cuerpoTablaIngresos = document.getElementById('incomeTableBody');
        const nuevaFila = document.createElement('tr');
        
        const celdaNumero = document.createElement('td');
        celdaNumero.textContent = conteoIngresos;
        nuevaFila.appendChild(celdaNumero);
        
        const celdaMonto = document.createElement('td');
        celdaMonto.textContent = `$${ingreso.toFixed(2)}`;
        nuevaFila.appendChild(celdaMonto);
        
        cuerpoTablaIngresos.appendChild(nuevaFila);

        ingresoInput.value = '';
    } else {
        alert('Por favor, ingresa un monto válido.');
    }
}
