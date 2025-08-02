# lab12-excepciones
## Historias de Usuario
1. Visualización en tabla:
   Yo como usuario,
   Deseo ver una lista con los movimientos registrados en una tabla,
   Para revisar fácilmente cada ingreso o gasto que he registrado.
   ### Descripción funcional:
   - Cuando el usuario registra un nuevo movimiento (ingreso o gasto) mediante el formulario, este debe aparecer automáticamente en una tabla. La tabla debe mostrar claramente la información del movimiento, incluyendo:
   - Tipo de transacción (ingreso/gasto)
   - Detalle del movimiento
   - Monto en soles/dólares
   - Opciones para editar o eliminar
   - Cada nueva transacción debe agregarse como una nueva fila en la tabla, permitiendo una lectura rápida, ordenada y actualizable en tiempo real.
     
2. Cálculo automático de totales:
  Yo como usuario,
  Deseo ver automáticamente los totales de ingresos, gastos y balance actualizado,
  Para saber en todo momento cómo están mis finanzas.
  ### Descripción funcional:
  - Cada vez que el usuario registra, edita o elimina un movimiento, el sistema debe actualizar automáticamente:
  - El total de ingresos (sumando todos los movimientos de tipo ingreso).
  - El total de gastos (sumando todos los movimientos de tipo gasto).
  - El balance final (ingresos - gastos).
  - Si no hay movimientos registrados o todos son eliminados, los totales deben mostrar $0, sin errores ni valores anteriores.

## Desiciones técnicas claves:
1. Manejo de eventos con addEventListener
    Se usaron escuchadores de eventos para capturar acciones del usuario (como agregar, editar o eliminar movimientos). Esto permite que la interfaz sea dinámica y responda sin recargar la página.
2. Actualización automática de totales
    Se implementó una función que recalcula los totales de ingresos, gastos y balance cada vez que hay un cambio en los movimientos. Así se evita duplicar código y se asegura precisión en tiempo real.
3. Separación visual usando TailwindCSS
    Se eligió TailwindCSS para aplicar estilos rápidamente mediante clases utilitarias. Esto permitió crear una interfaz atractiva y organizada sin escribir CSS personalizado.
4. Uso de un arreglo en memoria para almacenar los movimientos
    Los movimientos se guardan en un arreglo de objetos en tiempo real. Aunque no se usa una base de datos, esta estructura permite manipular fácilmente los datos (filtrar, editar, eliminar).

## Enlace al proyecto desplegado:
https://laurasalas-dev.github.io/lab12-excepciones/



