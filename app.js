const form = document.querySelector("#financial-form");
const tipoTransaccion = document.querySelector("#transaction-type");
const detalleTransaccion = document.getElementById("transaction-detail");
const montoTransaccion = document.getElementById("transaction-amount");
const resumenIngreso = document.getElementById("summary-income")
const resumenGasto = document.getElementById("summary-expenses");
const balance = document.getElementById("summary-balance")
const tableBody = document.getElementById("transactions-table")
const totalIngresoTxt = document.getElementById("totalI_txt");
const totalGastoTxt = document.getElementById("totalG_txt");
const arribaBalance = document.getElementById("balance-display");

let tipoHTML = "";


let arregloTransacciones = [];

form.addEventListener("submit", function (event) {

   event.preventDefault();  /* Para evitar que se refresque */


   try {
      const soloLetras = /^[a-zA-Z\s]+$/;

      if (!soloLetras.test(detalleTransaccion.value)) {
         throw new Error("El detalle solo debe contener letras.");
      }

      // ...si pasa, el código continúa normalmente

   } catch (error) {
      alert(error.message);
      return;
   }

   const movimiento = {
      tipo: tipoTransaccion.value,
      detalle: detalleTransaccion.value,
      monto: Number(montoTransaccion.value)
   }

   arregloTransacciones.push(movimiento);
   console.log(arregloTransacciones)

   const arrIngreso = arregloTransacciones.filter((mov) => mov.tipo === "ingreso");
   const totalIngreso = arrIngreso.reduce((acc, mov) => acc + mov.monto, 0);
   resumenIngreso.innerText = `$${totalIngreso.toFixed(2)}`;

   const arrGasto = arregloTransacciones.filter((mov) => mov.tipo === "gasto");
   const totalGasto = arrGasto.reduce((acc, mov) => acc + mov.monto, 0);
   resumenGasto.innerText = `$${totalGasto.toFixed(2)}`;

   try {

      let totalBalance = Math.max(totalIngreso - totalGasto, 0);

      balance.innerText = `$${totalBalance.toFixed(2)}`;
      arribaBalance.innerText = `$${totalBalance.toFixed(2)}`;

   } catch (error) {

      console.error("Error al calcular el balance:", error);
      balance.innerText = "$0.00";
      arribaBalance.innerText = "$0.00";
      
   }


   /*
      Para renderizar informacion dentro de una tabla o cualquier elemento
      1. Capturar o tener ya capturado el elemento donde se insertara la informacion
   */

   if (movimiento.tipo === "ingreso") {
      tipoHTML = `<span class="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Ingreso</span>`;
   } else {
      tipoHTML = `<span class="inline-block px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Gasto</span>`;
   }

   tableBody.innerHTML += `
               <tr data-id="${arregloTransacciones.length - 1}" class="hover:bg-white/80 transition-colors duration-200">
                 
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                     ${new Date().toLocaleDateString("es-PE")}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                     ${tipoHTML}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                     ${movimiento.detalle}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-bold ${movimiento.tipo === "ingreso" ? "text-green-600" : "text-red-600"
      }">
                     $${movimiento.monto.toFixed(2)}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-center">
                     <div class="flex justify-center space-x-2">
                     <button class="btn-editar text-indigo-600 hover:text-indigo-800 p-2 hover:bg-indigo-50 rounded-lg" title="Editar">
                           <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-eliminar text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg" title="Eliminar">
                           <i class="fas fa-trash-alt"></i>
                        </button>
                     </div>
                  </td>
               </tr>
   `
   totalIngresoTxt.innerText = `$${totalIngreso.toFixed(2)}`;
   totalGastoTxt.innerText = `$${totalGasto.toFixed(2)}`;


   detalleTransaccion.value = "";
   montoTransaccion.value = "";
})

function actualizarIDsTabla() {
   const filas = tableBody.querySelectorAll("tr");
   filas.forEach((fila, index) => {
      fila.dataset.id = index;
   });
}

tableBody.addEventListener("click", function (e) {
   const boton = e.target.closest("button");
   if (!boton) return;

   const fila = boton.closest("tr");
   const id = fila.dataset.id;

   if (boton.classList.contains("btn-eliminar")) {
      arregloTransacciones.splice(id, 1);
      fila.remove();

      const ingresos = arregloTransacciones
         .filter(m => m.tipo === "ingreso")
         .reduce((acc, m) => acc + m.monto, 0) || 0;

      const gastos = arregloTransacciones
         .filter(m => m.tipo === "gasto")
         .reduce((acc, m) => acc + m.monto, 0) || 0;

      const totalBalance = Math.max(ingresos - gastos, 0);

      resumenIngreso.innerText = `$${ingresos.toFixed(2)}`;
      resumenGasto.innerText = `$${gastos.toFixed(2)}`;
      totalIngresoTxt.innerText = `$${ingresos.toFixed(2)}`;
      totalGastoTxt.innerText = `$${gastos.toFixed(2)}`;
      balance.innerText = `$${totalBalance.toFixed(2)}`;
      arribaBalance.innerText = `$${totalBalance.toFixed(2)}`;

      actualizarIDsTabla(); // opcional, por si necesitas mantener orden
   }
});