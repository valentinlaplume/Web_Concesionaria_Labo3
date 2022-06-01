import {
    createTable
} from "./dinamicas.js";

import Anuncio_Auto from "./anuncio_auto.js";

// ----------------- localStorage -----------------
const anuncios = localStorage.getItem("anuncios") 
                    ? JSON.parse(localStorage.getItem("anuncios")) 
                    : [];


actualizarDivVehiculo();


// --------- Capturamos todos los click por condicion ---------
window.addEventListener("click", (e) => {

    if(e.target.matches(".nav-menu")){ esconderNav(); }

})

function actualizarDivVehiculo(){
    const data = localStorage.getItem("anuncios") 
        ? JSON.parse(localStorage.getItem("anuncios")) 
        : [];

    if(data.length > 0){
        createDivVehiculo(data)
    }
}

function createDivVehiculo(arr){
    const content = document.querySelector(".content-div-vehiculos");
    
    while(content.children.length > 0) // si tiene elementos los remuevo
    { 
        content.removeChild(content.firstElementChild);
    }

    arr.forEach( e =>{
        const div = document.createElement("div");
        const h3 = document.createElement("h3");
        const precio = document.createElement("h4");
        const label = document.createElement("label");
        const km = document.createElement("label");
        const potencia = document.createElement("label");
        const puertas = document.createElement("label");
        const button = document.createElement("button");

        div.setAttribute("class", "div-auto");
        h3.textContent = e.titulo;

        h3.setAttribute("class", "h3-div-auto");
        precio.textContent = e.descripcion;

        precio.setAttribute("class", "h4-div-auto");
        precio.textContent = "$ " + e.precio;
        

        label.setAttribute("class", "label-div-auto");
        button.textContent = "Ver Vehiculo";

        puertas.textContent = "Puertas: " + e.cantidadPuertas;
        puertas.setAttribute("class", "puertas-div-auto");

        potencia.textContent = "Potencia: " + e.potencia;
        potencia.setAttribute("class", "potencia-div-auto");

        km.textContent = "km: " + e.km;
        km.setAttribute("class", "km-div-auto");


        button.setAttribute("class", "button-div-auto");

        console.log(e);

        div.appendChild(h3);
        div.appendChild(precio);
        div.appendChild(label);
        div.appendChild(km);
        div.appendChild(potencia);
        div.appendChild(puertas);
        div.appendChild(button);
        content.appendChild(div);
    })
}


function esconderNav(){
    const enlaces = document.getElementsByClassName('nav-enlace');
    for(var i=0;  i < enlaces.length; i++){
        enlaces[i].classList.toggle('nav-desaparece');
    }
}




