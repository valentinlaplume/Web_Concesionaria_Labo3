function createTable(arr){
    const table = document.createElement("table");
    if(Array.isArray(arr) && arr.length > 0) 
    { 
        table.appendChild(createHead(arr[0]));
        table.appendChild(createBody(arr));
        
    }else{ 
        console.log("function createTable: Parametro 'arr' no es array o length = 0."); 
    }
    return table;
}

function createHead(obj){
    const thead = document.createElement("thead"),
          tr = document.createElement("tr");

    // ---- Agrego clases a las cabecera body ---- 
    tr.setAttribute("class", "tabla-cabecera");

    // ------ Forma de ver key con forin ------
    for (const key in obj) { 
        if(key !== "id"){
            const th = document.createElement("th");
            
            if(key.includes("cantidad")){
                let restoKey = key.slice(8, key.length - 1);
                let key2 = 'cantidad de ' + restoKey + 's';
                th.textContent = key2;
            }
            else{
                th.textContent = key;
            }
            
            tr.appendChild(th);
        }
    } 
    
    thead.appendChild(tr);

    return thead;
}

function createBody(arr){
    const tbody = document.createElement("tbody");
    
    arr.forEach((obj, index) => {
        const tr = document.createElement("tr");

        // ---- Agrego clases a las row body  ---- 
        tr.classList.add("td-row");
        
        // ---- Agrego datos a la row ---- 
        for (const key in obj)
        {
            if(key === "id"){
                tr.setAttribute("data-id", obj[key]);
            }
            else{
                const td = document.createElement("td");

                // td.textContent = truncarTextoExtenso(obj[key]); 
                td.textContent = obj[key]; 
                tr.appendChild(td);
            }
        }

        tbody.appendChild(tr);
        
    });

    return tbody;
}


export{
    createTable
} 