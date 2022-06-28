import {
    createTable
} from "./dinamicas.js";

import Anuncio_Auto from "./anuncio_auto.js";

const url = "http://localhost:3000/anuncios";
const $formAnuncio = document.forms[0];
const divError = document.querySelector(".div-form-error");
const btnEliminar = document.querySelector(".btn-eliminar");
const DONE = 4;






// ------------ RESPONSIVE TABLE CON BOOTSTRAP --------
// window.addEventListener("resize", (e) => { 
//     let tablas = document.getElementsByClassName("tabla");
//     if (window.screen.width < 1001 && tablas.length >0) { 
//         tablas[0].classList.add("table-responsive");
//     }else{
//         tablas[0].classList.remove("table-responsive");
//     }
// });


// -------------- Obtengo todos los anuncios por ajax ----------
let anuncios = [];
actualizarAnunciosAndTabla();

function actualizarTabla(arr){
    const divTabla = document.querySelector(".content-tabla");
    // si tiene elementos los remuevo
    while(divTabla.children.length > 0) { divTabla.removeChild(divTabla.firstElementChild); }

    if(arr.length > 0){ 
        divTabla.appendChild(createTable(arr)); 
    }
}

function actualizarAnunciosAndTabla(){
    const xhr = new XMLHttpRequest(); 
    // xhr.onreadystatechange = () => { };
    xhr.addEventListener('readystatechange', (url) => {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300){
                const data = JSON.parse(xhr.responseText); 
                anuncios = data; // actualizo data de la db
                actualizarTabla(data); // actualizo tabla mostrada
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

// --------- FILTRADO Y PROMEDIO ---------
const cmbTransaccion = document.querySelector("#cmbTransaccion");
cmbTransaccion.addEventListener('change', (e) => 
{
    filtrarTablaBy(e.srcElement.value);
});
function filtrarTablaBy(value){
    let filtrada = anuncios;
    switch (value) {
        case 'todos':
            actualizarTabla(anuncios);
            document.querySelector("#labelPromedio").textContent = "";
            // setearPromedioTabla(anuncios);
        break;
        case 'venta':
            filtrada = getTransaccionBy('venta');
            actualizarTabla(filtrada);
            setearPromedioTabla(filtrada);
        break;
        case 'alquiler':
            filtrada = getTransaccionBy('alquiler');
            actualizarTabla(filtrada);
            setearPromedioTabla(filtrada);
        break;
    }
}
function setearPromedioTabla(arr){
    const labelPromedio = document.querySelector("#labelPromedio");
    let promedio = getPromedioPrecio(arr);
    labelPromedio.textContent = "Promedio de Precios: $ " + promedio;
}
function getPromedioPrecio(arr){
    let total= 0;
    // precio es la variable del objeto
    arr.map(({ precio }) => total+=parseInt(precio));
    return total / arr.length;
}
function getTransaccionBy(campo){
    const filter = anuncios.filter((element => element.transaccion == campo));
    return filter;
}



// --------- ACCIONES WINDOW ---------
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
            handlerDeleteById($formAnuncio.id.value); 
        }
    }

    if(e.target.matches(".nav-menu")){ esconderNav(); }




})



// -------------------------- ACCIONES DEL FORMULARIO --------------------------
$formAnuncio.addEventListener("submit", (e) =>{
    const formObj = e.target;
    e.preventDefault();

    if(!validarDatosForm(formObj)){ return false; }

    if($formAnuncio.id.value == 0){ // ADD 
        // formObj.id.value = Date.now();
        handlerCreate(formObj);
    }
    else if(formObj.id.value > 0){ // UPDATE
        handlerUpdate(formObj);
    }
});

function cargarForm(obj){
    console.log();
    console.log("id cargado Form:",obj.id);
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
function setearIdFormAndForm(){
    $formAnuncio.id.value = 0;
    $formAnuncio.titulo.value = "";
    $formAnuncio.transaccion.value = "";
    $formAnuncio.descripcion.value = "";
    $formAnuncio.precio.value = "";
    $formAnuncio.cantidadPuertas.value = "";
    $formAnuncio.km.value = "";
    $formAnuncio.potencia.value = "";
    // $formAnuncio.reset();
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

// -------------------------- VERIFICACIONES --------------------------
function existElement(id, arr){
    let e = arr.find((e)=> e.id == id);
    // console.log(e);
    return e != undefined ? true : false;
}



// -------------------------- ABM --------------------------
function handlerCreate(formObj){
    const { id, titulo, transaccion, descripcion, precio, cantidadPuertas, km, potencia } = formObj;
    
    const newObj = new Anuncio_Auto(
        titulo.value.trim(),
        transaccion.value, 
        descripcion.value.trim(),
        parseFloat(precio.value),
        parseInt(cantidadPuertas.value),
        parseInt(km.value),
        parseInt(potencia.value)
    );

    // const newObj = {
    // "titulo": titulo.value.trim(), 
    // "transaccion": transaccion.value, 
    // "descripcion": descripcion.value.trim(),
    // "precio": parseFloat(precio.value),
    // "cantidadPuertas": parseInt(cantidadPuertas.value),
    // "km": parseInt(km.value),
    // "potencia": parseInt(potencia.value)
    // };

    const xhr = new XMLHttpRequest(); 

    xhr.addEventListener('readystatechange', (url) => {
        if(xhr.readyState == DONE) 
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                alert('Alta de anuncio con éxito.');
                actualizarAnunciosAndTabla();
                setearIdFormAndForm();
            }
            else{
                alert('Error al crear Anuncio.');
                console.error(xhr.status, xhr.statusText);
            }
        }
    })

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type","application/json;charset=utf8")
    xhr.send(JSON.stringify(newObj));
}
function handlerUpdate(formObj){
    if(window.confirm("¿Desea modificar Anuncio?")){
        const { id, titulo, transaccion, descripcion, precio, cantidadPuertas, km, potencia } = formObj;
        
        let e = anuncios.find((e)=> e.id == id.value);

        if(e != null){
            e.titulo = titulo.value.trim(); 
            e.transaccion = transaccion.value; 
            e.descripcion = descripcion.value.trim();
            e.precio = parseFloat(precio.value);
            e.cantidadPuertas = parseInt(cantidadPuertas.value);
            e.km = parseInt(km.value);
            e.potencia = parseInt(potencia.value);
        }

        const xhr = new XMLHttpRequest(); 
        xhr.addEventListener('readystatechange', (url) => {
            if(xhr.readyState == DONE) 
            {
                if(xhr.status >= 200 && xhr.status < 300)
                {
                    alert('Anuncio modificado con éxito.');
                    actualizarAnunciosAndTabla();
                    btnEliminar.style.display = "none";
                    setearIdFormAndForm();
                }
                else{
                    alert('Error al modificar Anuncio.');
                    console.error(xhr.status, xhr.statusText);
                }
            }
        });

        xhr.open("PUT", url + '/' + e.id);
        xhr.setRequestHeader("Content-Type","application/json;charset=utf8")
        xhr.send(JSON.stringify(e));
    }
}
function handlerDeleteById(id){
    if(window.confirm("¿Desea eliminar Anuncio?")){
        if(id > 0){
            const xhr = new XMLHttpRequest(); 
            xhr.addEventListener('readystatechange', (url) => {
                if(xhr.readyState == DONE) 
                {
                    if(xhr.status >= 200 && xhr.status < 300)
                    {
                        alert('Anuncio eliminado con éxito.');
                        actualizarAnunciosAndTabla();
                        btnEliminar.style.display = "none";
                        setearIdFormAndForm();
                    }
                    else{
                        alert('Error al eliminar Anuncio.');
                        console.error(xhr.status, xhr.statusText);
                    }
                }
            })

            xhr.open("DELETE", url + '/' + id);
            xhr.setRequestHeader("Content-Type","application/json;charset=utf8")
            xhr.send();
        }
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



// -------------------------- ACCIONES RESPONSIVE --------------------------
function esconderNav(){
    const enlaces = document.getElementsByClassName('nav-enlace');
    for(var i=0;  i < enlaces.length; i++){
        enlaces[i].classList.toggle('nav-desaparece');
    }
}



// ------------------ ACCIONES MOSTRAR-ESCONDER COLUMNAS -------------------
let cajasCheck = document.querySelectorAll(".checkbox-table");
const tablaCreadaDinamicamente = document.querySelector(".content-tabla");


cajasCheck.forEach(checkbox => 
{
    checkbox.addEventListener("click", (e) => 
    {
        //console.log(tablaCreadaDinamicamente.querySelector("tbody").querySelectorAll("tr").length);
        if(tablaCreadaDinamicamente != null){
            let arrayCheckboxes = document.querySelector(".container-checkbox-campos-tabla").querySelectorAll("input");
            let valueRecibido;
            let estaChequeado;

            let cantidadCheckboxes = arrayCheckboxes.length;
            for (let i = 0; i < cantidadCheckboxes; i++){
                estaChequeado = arrayCheckboxes[i].checked;
                valueRecibido =  arrayCheckboxes[i].value;
                mostrar_esconder_columnas(valueRecibido,estaChequeado);
            }       
        }        
    });
});

function mostrar_esconder_columnas(valueRecibido, estaChequeado)
{
    //-------------------------------------- TITULO --------------------------------------------//
    //Si x checkbox del titulo esta tildado remuevo el atributo hidden, sino lo seteo. 
    
    //-------------HEADER------------//
    let trsHeader = tablaCreadaDinamicamente.querySelector("thead").querySelectorAll("tr");

    if (estaChequeado == true)
    {
        trsHeader[0].querySelectorAll("th")[valueRecibido].removeAttribute("Hidden");
    }
    else
    {
        trsHeader[0].querySelectorAll("th")[valueRecibido].setAttribute("Hidden", true);
    }

    //El valor 0 es el TITULO y su celda con el valor cargado
    //camposHeader[valueRecibido].removeAttribute("Hidden");
    //--------------------------------//
    
    let trs = tablaCreadaDinamicamente.querySelector("tbody").querySelectorAll("tr"); 
    
    for (let i = 0; i < trs.length; i++) 
    {  
        if (estaChequeado == true)
            trs[i].querySelectorAll("td")[valueRecibido].removeAttribute("Hidden");
        else
            trs[i].querySelectorAll("td")[valueRecibido].setAttribute("Hidden", true);
    }
}

//filtrar
// https://onlinegdb.com/USd4dN58q






