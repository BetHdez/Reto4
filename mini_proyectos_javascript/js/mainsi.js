let total = 0;
let incomeCount = 0;

function addIncome() {
    const incomeInput = document.getElementById('income');
    const income = parseFloat(incomeInput.value);
    if (!isNaN(income)) {
        total += income;
        incomeCount++;
        document.getElementById('totalIncome').textContent = `Total: $${total.toFixed(2)}`;
        
        const incomeTableBody = document.getElementById('incomeTableBody');
        const newRow = document.createElement('tr');
        
        const cellNumber = document.createElement('td');
        cellNumber.textContent = incomeCount;
        newRow.appendChild(cellNumber);
        
        const cellAmount = document.createElement('td');
        cellAmount.textContent = `$${income.toFixed(2)}`;
        newRow.appendChild(cellAmount);
        
        incomeTableBody.appendChild(newRow);

        incomeInput.value = '';
    } else {
        alert('Por favor, ingresa un monto válido.');
    }
}