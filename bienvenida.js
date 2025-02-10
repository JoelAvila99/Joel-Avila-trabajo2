//Bienvenida a usuario
let nombreUsuario= prompt("Bienvenido a una pagina dedicada a nuestro planeta tierra. Indicanos tu nombre")
alert("¡Bienvenido! " + nombreUsuario)

console.log("El nombre del usuario es " + nombreUsuario)


 /* cuestionario a usuario */

 let conociendoUser = parseInt(prompt("Del 1 al 10, ¿cómo te calificarías cuánto te gusta la naturaleza?"));  

 if (conociendoUser >= 1 && conociendoUser <= 10) {  
     if (conociendoUser >= 8) {  
         alert("¡Genial! Nos llevaremos muy bien.");  
     } else {  
         alert("Espero que esta página cambie tu parecer.");  
     }  
 } else {  
     alert("Ingrese un número válido entre 1 y 10.");  
 }  
console.log(conociendoUser)
//donacion

const ayudas = [  
    { id: 1, nombre: `Equipo playa`, precio: 10 },  
    { id: 2, nombre: `Equipo africa`, precio: 10 },  
    { id: 3, nombre: `Equipo arboles`, precio: 10 }  
];  

const caja = document.getElementById(`caja`);  
const carrito = document.getElementById(`carrito`);  
const totalDonaciones = document.getElementById(`totalDonaciones`); 

// Función para mostrar las donaciones
let total = 0;
const MostrarDonacion = () => {  
    ayudas.forEach(ayuda => {  
        let carta = document.createElement(`div`);  
        carta.innerHTML = `Has seleccionado donar a ${ayuda.nombre} y el monto es ${ayuda.precio}`;  
        
        const boton = document.createElement(`button`);  
        boton.textContent = "Donar";  
        boton.addEventListener(`click`, () => AgregarDonacion(ayuda));  
        carta.appendChild(boton);  
        caja.appendChild(carta);  
    });  
};  

// Función para agregar donaciones  
const AgregarDonacion = ayuda => {  
    const itemCarrito = document.createElement(`li`);  
    itemCarrito.textContent = `Carrito: ${ayuda.nombre}, Precio: ${ayuda.precio}`;   
    carrito.appendChild(itemCarrito);  
    
    total += ayuda.precio;
    totalDonaciones.textContent = `Total de donaciones: ${total}`; 

    // Guardar en localStorage  
    const donaciones = JSON.parse(localStorage.getItem('donaciones')) || [];  
    donaciones.push(ayuda);  
    localStorage.setItem('donaciones', JSON.stringify(donaciones));  

    // Mostrar en consola las donaciones almacenadas  
    console.log('Donaciones en localStorage:', donaciones);  
};  

// Función para cargar donaciones desde localStorage al cargar la página  
const CargarDonaciones = () => {  
    const donacionesGuardadas = JSON.parse(localStorage.getItem('donaciones')) || [];  
    donacionesGuardadas.forEach(ayuda => {  
        AgregarDonacion(ayuda);  
    });  
};  

// Llamar a MostrarDonacion para que se muestre inicialmente  
MostrarDonacion();  
CargarDonaciones();  // Cargar donaciones existentes  
