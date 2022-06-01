import {
    createTable,
    createDivVehiculo
} from "./dinamicas.js";

import Anuncio_Auto from "./anuncio_auto.js";

// ----------------- localStorage -----------------
const anuncios = localStorage.getItem("anuncios") 
                    ? JSON.parse(localStorage.getItem("anuncios")) 
                    : [];

actualizarTabla(anuncios);

const $formAnuncio = document.forms[0];
const divError = document.querySelector(".div-form-error");
const btnEliminar = document.querySelector(".btn-eliminar");

// --------- Capturamos todos los click por condicion ---------
window.addEventListener("click", (e) => {
    if(e.target.matches(".btn-cancelar")){
        setearIdFormAndForm();
        divError.style.display = "none";
        btnEliminar.style.display = "none";
    }
    else 
    {
        if(e.target.matches("tr td")
            && existElement(e.target.parentElement.dataset.id, anuncios))
        {
            $formAnuncio.id.value = e.target.parentElement.dataset.id;
            cargarForm(anuncios.find((e)=> e.id == $formAnuncio.id.value)); 
            btnEliminar.style.display = "inline-block";
        }
        else if(e.target.matches(".btn-eliminar") && existElement($formAnuncio.id.value, anuncios))
        {
            handlerDeleteById($formAnuncio.id.value, anuncios); 
        }
    }

    if(e.target.matches(".nav-menu")){ esconderNav(); }

})

$formAnuncio.addEventListener("submit", (e) =>{
    const formObj = e.target;

    // Cancela el evento
    e.preventDefault();

    if(!validarDatosForm(formObj)){ return false; }

    if($formAnuncio.id.value == 0){ // ADD 
        formObj.id.value = Date.now();
        handlerCreate(formObj);
    }
    else if(formObj.id.value > 0){ // UPDATE
        handlerUpdate(formObj);
    }
});

function setearIdFormAndForm(){
    $formAnuncio.id.value = 0;
    $formAnuncio.reset();
}

function existElement(id, arr){
    let e = arr.find((e)=> e.id == id);
    return e != undefined ? true : false;
}
    
function validarDatosForm(formData){
    let titulo = formData.titulo.value;
    let transaccion = formData.transaccion.value;
    let descripcion = formData.descripcion.value;
    let precio = formData.precio.value;
    let cantidadPuertas = formData.cantidadPuertas.value;
    let km = formData.km.value;
    let potencia = formData.potencia.value;

    if(titulo == "" || titulo.length > 30) { divError.textContent = "El Título no puede encontrarse vacío y su longitud debe ser menor a 30 caracteres."; divError.style.display = "block"; return false; }
    if(descripcion.length > 100) { divError.textContent = "La longitud de Descripcion debe ser menor a 100 caracteres."; divError.style.display = "block"; return false; }
    if(transaccion == "") { divError.textContent = "Debe seleccionar Transacción."; divError.style.display = "block"; return false; }
    if(precio == "" || isNaN(precio) || parseFloat(precio) < 0) { divError.textContent = "Precio inválido. Verifique!!"; divError.style.display = "block"; return false; }
    if(cantidadPuertas == "" || isNaN(cantidadPuertas) || parseInt(cantidadPuertas) < 0) { divError.textContent = "Cantidad de Puertas inválido. Verifique!!"; divError.style.display = "block"; return false; }
    if(km == "" || isNaN(km) || parseInt(km) < 0) { divError.textContent = "Cantidad de km inválido. Verifique!!"; divError.style.display = "block"; return false; }
    if(potencia == "" || isNaN(potencia) || parseInt(potencia) < 0) { divError.textContent = "Cantidad de potencia inválido. Verifique!!"; divError.style.display = "block"; return false; }

    divError.textContent = "";
    divError.style.display = "none";
    return true;
}    

function cargarForm(obj){
    if(obj != null && obj != undefined){
        divError.style.display = "none";
        const { id, titulo, transaccion, descripcion, precio, cantidadPuertas, km, potencia } = $formAnuncio;
        id.value = obj.id; 
        titulo.value = obj.titulo;
        transaccion.value = obj.transaccion; 
        descripcion.value = obj.descripcion;
        precio.value = obj.precio;
        cantidadPuertas.value = obj.cantidadPuertas;
        km.value = obj.km;
        potencia.value = obj.potencia;
    }
}

function handlerCreate(formObj){
    const { id, titulo, transaccion, descripcion, precio, cantidadPuertas, km, potencia } = formObj;
    
    const newObj = new Anuncio_Auto(
    id.value, 
    titulo.value, 
    transaccion.value, 
    descripcion.value,
    parseFloat(precio.value),
    parseInt(cantidadPuertas.value),
    parseInt(km.value),
    parseInt(potencia.value));

    anuncios.push(newObj);

    setearIdFormAndForm();
    actualizarStorage(anuncios);
    actualizarTabla();
}
function handlerUpdate(formObj){
    if(window.confirm("¿Desea modificar Anuncio?")){

        const { id, titulo, transaccion, descripcion, precio, cantidadPuertas, km, potencia } = formObj;
        
        let e = anuncios.find((e)=> e.id == id.value);
        if(e != null){
            e.titulo = titulo.value; 
            e.transaccion = transaccion.value; 
            e.descripcion = descripcion.value;
            e.precio = parseFloat(precio.value);
            e.cantidadPuertas = parseInt(cantidadPuertas.value);
            e.km = parseInt(km.value);
            e.potencia = parseInt(potencia.value);
            
            setearIdFormAndForm();
            btnEliminar.style.display = "none";
            actualizarStorage(anuncios);
            actualizarTabla();
        }
    }
}
function handlerDeleteById(id, arr){
    if(window.confirm("¿Desea eliminar Anuncio?")){

        const condicion = (e) => {return e.id == id};
        let index = arr.findIndex(condicion);
        if(index != -1){
            arr.splice(index, 1);
            
            setearIdFormAndForm();
            btnEliminar.style.display = "none";
            actualizarStorage(arr);
            actualizarTabla();
        }
    }
}

function actualizarStorage(data){
    localStorage.setItem("anuncios", JSON.stringify(data ? data.sort((a,b) => a.precio - b.precio) : []) );
}
function actualizarTabla(){
    const data = localStorage.getItem("anuncios") 
        ? JSON.parse(localStorage.getItem("anuncios")) 
        : [];

    const divTabla = document.querySelector(".content-tabla");
    
    while(divTabla.children.length > 0) // si tiene elementos los remuevo
    { 
        divTabla.removeChild(divTabla.firstElementChild);
    }

    if(data.length > 0){
        showSpinner();
        setTimeout(() => {
            removeSpinner();
            divTabla.appendChild(createTable(data));
        }, 2000);
    }
        
}

function showSpinner(){
    const divTabla = document.querySelector(".div-spinner");
    const image = document.createElement('img');
    image.classList.add("img-spinner");
    image.src = "./img/spinner.gif";
    image.alt = "imagen spinner";
    image.style.display = "block";
    divTabla.appendChild(image);
}
function removeSpinner(){
    const contentSpinner = document.querySelector(".div-spinner");
    while(contentSpinner.children.length > 0) // si tiene elementos los remuevo
    { 
        contentSpinner.removeChild(contentSpinner.firstElementChild);
    }
}

function esconderNav(){
    const enlaces = document.getElementsByClassName('nav-enlace');
    for(var i=0;  i < enlaces.length; i++){
        enlaces[i].classList.toggle('nav-desaparece');
    }
}




