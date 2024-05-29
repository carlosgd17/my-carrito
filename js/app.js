const img = document.querySelector('.card img');
const card = document.querySelector('.card');


let shownFooter = false;

const footerClass = document.querySelector('.footer');
//footerClass.classList.add('activo');
console.log(footerClass.classList);

function footerEffect(){
    if(shownFooter){
        console.log('hide');
        shownFooter = false;
        footerClass.classList.remove('activo');
    } else{
        console.log('show');
        shownFooter = true;
        footerClass.classList.add('activo');
    }
}


// para el boton carrito
const carritoBtn = document.querySelector('.btn-flotante');
carritoBtn.addEventListener('click', footerEffect);

// para el boton agregar
const agregarBtn = document.querySelectorAll('.card .info .agregar');
//agregarBtn.addEventListener('click', agregarItem);

// para la factura
const articulos = document.querySelector('.nav-footer.Articulo .menu');
const precios = document.querySelector('.nav-footer.Precio .menu');
const cantidades = document.querySelector('.nav-footer.Cantidad .menu');
const total = document.querySelector('.nav-footer.Total .menu');

const granTotal = document.createElement('p');
granTotal.textContent = '0';
total.appendChild(granTotal);

agregarBtn.forEach(btn => {
    btn.addEventListener('click', agregarItem);
});

function agregarItem(){
    
    const parentElement = this.parentElement.parentElement;
    const titulo = parentElement.querySelector('.titulo').textContent;
    const precio = parentElement.querySelector('.precio').textContent;

    const res = alreadyOnCarrito(titulo);
    if(res !== -1){
        const temp = cantidades.children[res].textContent;
        cantidades.children[res].textContent = parseInt(temp) + 1;
    } else{
        const articuloName = document.createElement('p');
        articuloName.textContent = titulo;
        articuloName.addEventListener('click', removeItem);
        articulos.appendChild(articuloName);

        const articuloPrice = document.createElement('p');
        articuloPrice.textContent = precio;
        precios.appendChild(articuloPrice);

        const articuloCantidad = document.createElement('p');
        articuloCantidad.textContent = '1';
        cantidades.appendChild(articuloCantidad);
    }

    addTotal(precio);
}


function addTotal(precio){
    granTotal.textContent = parseFloat(granTotal.textContent.replace("$", "")) + parseFloat(precio.replace("$", "")); 
    granTotal.textContent = "$" + granTotal.textContent;
}

function alreadyOnCarrito(articuloName){
    const articulosOnCarrito = document.querySelectorAll('.nav-footer.Articulo .menu p');
    for(let i = 0; i < articulosOnCarrito.length; i++){
        if(articulosOnCarrito[i].textContent === articuloName){
            return i;
        }
    }
    return -1;
}

// para el boton eliminar
const itemBtn = document.querySelectorAll('.nav-footer.Articulo .menu p');
itemBtn.forEach(btn => {
    btn.addEventListener('click', removeItem);
});

function removeItem(){

    console.log('remove');
    titulo = this.textContent;

    const res = alreadyOnCarrito(titulo);
    if(res !== -1){
        const temp = cantidades.children[res].textContent;
        granTotal.textContent = parseFloat(granTotal.textContent.replace("$", "")) - parseFloat(precios.children[res].textContent.replace("$", ""));
        if(parseInt(temp) > 1){
            cantidades.children[res].textContent = parseInt(temp) - 1;
        } else{
            articulos.removeChild(articulos.children[res]);
            cantidades.removeChild(cantidades.children[res]);
            precios.removeChild(precios.children[res]);
        }
    }

    subtractTotal(precio);
}

function subtractTotal(precio){
    granTotal.textContent = parseFloat(granTotal.textContent.replace("$", "")) - parseFloat(precio.replace("$", "")); 
    granTotal.textContent = "$" + granTotal.textContent;
}