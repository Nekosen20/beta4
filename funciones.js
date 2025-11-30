
function abrirFormulario(nombre) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("animalNombre").textContent = nombre;
  document.getElementById("animal").value = nombre;
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

function enviarFormulario(event) {
  event.preventDefault();
  const nombre = document.querySelector("#modal input[type='text']").value;
  const animal = document.getElementById("animal").value;
  alert(`Gracias ${nombre}, hemos recibido tu solicitud para adoptar a ${animal}. ¡Nos contactaremos contigo pronto!`);
  cerrarModal();
  event.target.reset();//reiniciar el formulario cuando se termine
}

window.onclick = function(event) {//cuando doy click se pueda hacer algo
  if (event.target === document.getElementById("modal")) {
    cerrarModal();
  }
};function verImagen(src) {
  const modal = document.getElementById("imgModal");
  const imagen = document.getElementById("imagenGrande");
  imagen.src = src;
  modal.style.display = "block";
}

function cerrarImagen() {//para cerrar imagen
  document.getElementById("imgModal").style.display = "none";
}
function mostrarSeccion(id) {//para separar las secciones 
  const secciones = document.querySelectorAll("section");
  secciones.forEach(sec => sec.classList.remove("activa")); 
  const activa = document.getElementById(id);
  if (activa) activa.classList.add("activa"); 
}
window.addEventListener("DOMContentLoaded", () => { //Le dice al navegador: “Cuando termine de cargar el documento (sin esperar imágenes o CSS), ejecuta esta función.”
  mostrarSeccion("Inicio");
});
function publicarAnimal(event) {
    event.preventDefault();
    
    const form = event.target;
    const datos = new FormData(form);

    const nombre = datos.get('nombre').trim(); 
    const tipo = datos.get('tipo');
    const edad = datos.get('edad');
    const descripcion = datos.get('descripcion');
    const contacto = datos.get('contacto');
    const imagen = datos.get('imagen');
    
    // N U E V O S   C A M P O S
    const esterilizado = datos.get('esterilizado'); 
    const vacunas = datos.get('vacunas'); 

    if (imagen.size === 0) {
        alert("Por favor, selecciona una imagen del animal.");
        return;
    }

    const reader = new FileReader();
    
    reader.onload = function () {
        const contenedor = document.querySelector(`#${tipo} .cards`);
        
        
        const cardHTML = `
            <img src="${reader.result}" alt="${nombre}" onclick="verImagen(this.src)">
            <h3>${nombre}</h3>
            <p>${descripcion}</p>
            <div class="info-extra small text-start p-2">
                <p class="mb-1"><strong>Edad:</strong> ${edad} años</p>
                <p class="mb-1"><strong>Esterilizado:</strong> <span class="badge ${esterilizado === 'Sí' ? 'bg-success' : 'bg-danger'}">${esterilizado}</span></p>
                <p class="mb-1"><strong>Vacunas al día:</strong> <span class="badge ${vacunas === 'Sí' ? 'bg-success' : 'bg-danger'}">${vacunas}</span></p>
                <p class="mb-1"><strong>Contacto:</strong> ${contacto}</p>
            </div>
            <button onclick="abrirFormulario('${nombre}')" class="btn btn-primary mt-2 w-100">Adoptar</button>
        `;
        
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = cardHTML;
        
        if (contenedor.firstChild) {
            contenedor.insertBefore(card, contenedor.firstChild);
        } else {
            contenedor.appendChild(card);
        }

        form.reset();
        alert(`¡${nombre} ha sido publicado correctamente en la sección ${tipo.toUpperCase()}!`);
    };

    reader.readAsDataURL(imagen);
}