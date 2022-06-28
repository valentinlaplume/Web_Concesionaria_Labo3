import Anuncio from "./anuncio.js";

export default class Anuncio_Auto extends Anuncio{

    constructor(/*id,*/ 
        titulo, 
        transaccion, 
        descripcion,
        precio,
        cantidadPuertas,
        km,
        potencia) 
        {

        super(/*id,*/ 
        titulo, 
        transaccion, 
        descripcion,
        precio)

        this.cantidadPuertas = parseInt(cantidadPuertas);
        this.km = parseInt(km);
        this.potencia = parseInt(potencia);
    }
}

