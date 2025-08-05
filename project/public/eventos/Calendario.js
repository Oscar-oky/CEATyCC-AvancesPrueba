// Espera a que todo el contenido del HTML se haya cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. OBTENER REFERENCIAS A LOS ELEMENTOS DEL DOM ---
    const calendarTitle = document.querySelector('.calendar-title');
    const calendarGridBody = document.querySelector('.calendar-grid tbody');
    const monthSelect = document.querySelector('.calendar-nav select:nth-of-type(1)');
    const yearSelect = document.querySelector('.calendar-nav select:nth-of-type(2)');
    const prevMonthButton = document.querySelector('.nav-arrows button:nth-of-type(1)');
    const todayButton = document.querySelector('.nav-arrows button:nth-of-type(2)');
    const nextMonthButton = document.querySelector('.nav-arrows button:nth-of-type(3)');
    const goButton = document.querySelector('.btn-go');

    // Nombres de los meses para mostrar en el título
    const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    // --- 2. ESTADO INICIAL DEL CALENDARIO ---
    // 'currentDate' guardará la fecha que se está mostrando. Empezamos con la fecha actual.
    let currentDate = new Date();

    // --- 3. FUNCIÓN PRINCIPAL PARA RENDERIZAR EL CALENDARIO ---
    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth(); // 0 (Ene) a 11 (Dic)

        // --- Actualizar el título y los selectores ---
        calendarTitle.textContent = `Eventos en ${monthNames[month]} ${year}`;
        monthSelect.value = month; // Asigna el valor del mes al selector
        yearSelect.value = year;   // Asigna el valor del año al selector

        // Limpiar el contenido anterior de la tabla
        calendarGridBody.innerHTML = '';

        // --- Calcular los días del mes ---
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();
        
        // Ajuste para que la semana empiece en Lunes (0=Lun, 6=Dom)
        // getDay() original: 0=Dom, 1=Lun, ...
        let startDayOfWeek = firstDayOfMonth.getDay() - 1;
        if (startDayOfWeek === -1) { // Si era Domingo (0), ahora es -1, lo pasamos a 6
            startDayOfWeek = 6;
        }

        let dateCounter = 1;
        const today = new Date(); // Fecha real para marcar el día de hoy

        // Crear las filas y celdas del calendario (máximo 6 semanas)
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');

                if ((i === 0 && j < startDayOfWeek) || dateCounter > daysInMonth) {
                    // Celdas vacías antes del día 1 o después del último día
                    cell.classList.add('not-current-month');
                } else {
                    // Celdas con días del mes
                    const dayDiv = document.createElement('div');
                    dayDiv.className = 'day-number';
                    dayDiv.textContent = dateCounter;
                    cell.appendChild(dayDiv);

                    // Marcar el día de hoy
                    if (dateCounter === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                        cell.classList.add('today');
                    }
                    
                    dateCounter++;
                }
                row.appendChild(cell);
            }
            calendarGridBody.appendChild(row);

            // Si ya no quedan días, dejar de crear filas
            if (dateCounter > daysInMonth) {
                break;
            }
        }
    }

    // --- 4. FUNCIÓN PARA POBLAR LOS SELECTORES DE MES Y AÑO ---
    function populateSelectors() {
        // Poblar meses
        monthNames.forEach((name, index) => {
            const option = document.createElement('option');
            option.value = index;
            // Pone la primera letra en mayúscula
            option.textContent = name.charAt(0).toUpperCase() + name.slice(1);
            monthSelect.appendChild(option);
        });

        // Poblar años (ej. 10 años en el pasado y 10 en el futuro)
        const currentYear = new Date().getFullYear();
        for (let i = currentYear - 10; i <= currentYear + 10; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            yearSelect.appendChild(option);
        }
    }

    // --- 5. AÑADIR EVENT LISTENERS A LOS BOTONES Y SELECTORES ---
    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    todayButton.addEventListener('click', () => {
        currentDate = new Date();
        renderCalendar();
    });

    goButton.addEventListener('click', () => {
        const selectedYear = parseInt(yearSelect.value);
        const selectedMonth = parseInt(monthSelect.value);
        currentDate = new Date(selectedYear, selectedMonth, 1);
        renderCalendar();
    });

    // También puedes hacer que los selectores actualicen el calendario directamente
    monthSelect.addEventListener('change', () => goButton.click());
    yearSelect.addEventListener('change', () => goButton.click());


    // --- 6. INICIALIZAR EL CALENDARIO ---
    populateSelectors(); // Primero creamos las opciones
    renderCalendar();    // Luego renderizamos el calendario con la fecha actual
});