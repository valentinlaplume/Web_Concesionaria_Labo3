import {
    createTable
} from "./dinamicas.js";

import Anuncio_Auto from "./anuncio_auto.js";

const url = "http://localhost:3000/anuncios";

// ----------------- localStorage -----------------
// const anuncios = localStorage.getItem("anuncios") 
//                     ? JSON.parse(localStorage.getItem("anuncios")) 
//                     : [];

let anuncios = [];
actualizarDivVehiculo();
const mainContenedor = document.getElementById("main-contenedor");
mainContenedor.style.display = "none";

// --------- Capturamos todos los click por condicion ---------
window.addEventListener("click", (e) => {
    if(e.target.matches(".nav-menu")){ esconderNav(); }

})

function actualizarDivVehiculo(){
    const xhr = new XMLHttpRequest(); 
    xhr.addEventListener('readystatechange', (url) => {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300){
                const data = JSON.parse(xhr.responseText); 
                anuncios = data; // actualizo data de la db
                if(anuncios.length > 0){
                    createDivVehiculo(data);
                    mainContenedor.style.display = "block";
                }
                removeSpinner();
            }
            else{
                console.error('No hay datos en db.json');
                console.error(xhr.status, xhr.statusText);
                removeSpinner();
            }
        }
        else{
            showSpinner();
        }
    })
    xhr.open("GET", url);
    xhr.send();
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
        const descripcion = document.createElement("h4");
        const precio = document.createElement("h4");
        const descripButton = document.createElement("label");
        const km = document.createElement("label");
        const potencia = document.createElement("label");
        const puertas = document.createElement("label");
        const button = document.createElement("button");

        div.setAttribute("class", "div-auto");
        h3.textContent = e.titulo; // nombre auto

        descripcion.setAttribute("class", "h3-div-auto");
        descripcion.textContent = e.descripcion;

        precio.setAttribute("class", "h4-div-auto");
        precio.textContent = "$ " + e.precio;
        
        
        puertas.textContent = "Puertas: " + e.cantidadPuertas;
        puertas.setAttribute("class", "puertas-div-auto");
        
        km.textContent = "km: " + e.km;
        km.setAttribute("class", "km-div-auto");
        
        potencia.textContent = "Potencia: " + e.potencia;
        potencia.setAttribute("class", "potencia-div-auto");
        
        descripButton.setAttribute("class", "label-div-auto");
        button.textContent = "Ver Vehículo";
        button.setAttribute("class", "button-div-auto");

        // console.log(e);

        div.appendChild(h3);
        div.appendChild(descripcion);
        div.appendChild(precio);
        div.appendChild(puertas);
        div.appendChild(km);
        div.appendChild(potencia);

        div.appendChild(descripButton);
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

// -------------------------- ACCIONES SPINNER --------------------------
function showSpinner(){
    const divTabla = document.querySelector(".div-spinner");
    const image = document.createElement('img');
    image.classList.add("img-spinner");
    image.src = "./img/spinner.gif";
    image.alt = "icono spinner";
    image.style.display = "block";
    image.style.width = "10%";

    if(!divTabla.hasChildNodes())
    {
        divTabla.appendChild(image);
    }
}
function removeSpinner(){
    const contentSpinner = document.querySelector(".div-spinner");
    while(contentSpinner.children.length > 0) // si tiene elementos los remuevo
    { 
        contentSpinner.removeChild(contentSpinner.firstElementChild);
    }
}




