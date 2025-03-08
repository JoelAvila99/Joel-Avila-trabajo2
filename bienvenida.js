const cajas = document.querySelectorAll('.cajita');
const carrito = document.getElementById('carrito');
const totalDonaciones = document.getElementById('totalDonaciones');

let total = 0;

cajas.forEach(caja => {
    caja.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-donar')) {
            const nombre = caja.dataset.nombre;
            const precio = parseInt(caja.dataset.precio);
            Swal.fire({
                title: "Donacion agregada",
                icon: "success",
                draggable: true
              });

            const itemCarrito = document.createElement('li');
            itemCarrito.innerHTML = `Donación a: ${nombre}, Precio: ${precio} <button class="btn-eliminar">Eliminar</button>`; // Agregar botón de eliminar
            carrito.appendChild(itemCarrito);

            total += precio;
            totalDonaciones.textContent = `Total de donaciones: ${total}`;

            const donaciones = JSON.parse(localStorage.getItem('donaciones')) || [];
            donaciones.push({ nombre, precio });
            localStorage.setItem('donaciones', JSON.stringify(donaciones));
        }
    });
});

carrito.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-eliminar')) {
        const itemCarrito = event.target.parentElement;
        const precio = parseInt(itemCarrito.textContent.split('Precio: ')[1]);

        Swal.fire({
            title: "¿Estas seguro que deseas elimiar?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, deseo elimiar la donación.",
            cancelButtonText: "cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                carrito.removeChild(itemCarrito);

                total -= precio;
                totalDonaciones.textContent = `Total de donaciones: ${total}`;

                const donaciones = JSON.parse(localStorage.getItem('donaciones')) || [];
                const nombre = itemCarrito.textContent.split('Donación a: ')[1].split(',')[0];
                const index = donaciones.findIndex(donacion => donacion.nombre === nombre);
                if (index !== -1) {
                    donaciones.splice(index, 1);
                    localStorage.setItem('donaciones', JSON.stringify(donaciones));
                }
                Swal.fire({
                    title: "Eliminado!",
                    text: "Su donacion ha sido eliminada",
                    icon: "success"
                });
            }
        });
    }
});

const CargarDonaciones = () => {
    const donacionesGuardadas = JSON.parse(localStorage.getItem('donaciones')) || [];
    donacionesGuardadas.forEach(ayuda => {
        const itemCarrito = document.createElement('li');
        itemCarrito.innerHTML = `Donación a: ${ayuda.nombre}, Precio: ${ayuda.precio} <button class="btn-eliminar">Eliminar</button>`;
        carrito.appendChild(itemCarrito);
        total += ayuda.precio;
    });
    totalDonaciones.textContent = `Total de donaciones: ${total}`; // Actualizar el total en el DOM
};

totalDonaciones.addEventListener('click', () => {
    Swal.fire({
        title: "Estas seguro de completar la donación?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, deseo completar."
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Donacion completada!",
                text: "Muchas gracias por su donación! No se olvide de seguirnos en redes social",
                icon: "success",
                timer:3000
            });
            
            localStorage.clear(); // Limpiar localStorage
            location.reload(); // Recargar la página
        }
    });
});

CargarDonaciones();
