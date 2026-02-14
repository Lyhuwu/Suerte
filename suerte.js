const listaOriginal = [
    "Una cita en el cine 🎬",
    "Dejarte ganar en lo que sea (nee mi equipo) 🎮",
    "Unos besitos 💋",
    "Unos besotes 😘",
    "Un abachito💞",
    "Cita en cafetería",
    "Cita en el acuario 🐧",
    "Un muamuamuamua 👄",
    "Una cita a donde queya",
    "Eliminar al gallo de pelea",
    "Un ah ah ah ah 🔥",
    "Tu y yo toda le eternidad",
    "Evasión de pelea: repele la pelea y debemos amarnos mucho sisisis 🛡️💖",
    "Vale por abachote 🫂",
    "Comida favorita 🍔",
    "Romper distancia entre nosotras yadiosmio testaño",
    "Ver una peli juntitas💖",
    "Un masajito 💆",
    "Una tarde juntitas"
];

let disponibles = [];
let cuponActualTexto = "";
let indiceParaBorrar = null;

document.addEventListener('DOMContentLoaded', () => {
    cargarCuponesGuardados();
    disponibles = [...listaOriginal];
});

function revelarCupon() {
    // REPRODUCIR SONIDO
    const sonido = document.getElementById('sonido-galleta');
    sonido.currentTime = 0; // Reinicia el audio si se toca rápido
    sonido.play();

    if (disponibles.length === 0) disponibles = [...listaOriginal];
    
    const indiceAleatorio = Math.floor(Math.random() * disponibles.length);
    cuponActualTexto = disponibles[indiceAleatorio];
    disponibles.splice(indiceAleatorio, 1);

    document.getElementById('texto-cupon').innerText = cuponActualTexto;
    document.getElementById('galletas-flex').classList.add('hidden');
    document.getElementById('cupon-resultado').classList.remove('hidden');

    const btnGuardar = document.getElementById('btn-guardar');
    btnGuardar.innerText = "📥 Guardar en mi Billetera";
    btnGuardar.disabled = false;
    btnGuardar.style.background = "#ff8fa3";

    lanzarConfeti();
}

function guardarCupon() {
    let guardados = JSON.parse(localStorage.getItem('misCuponesSofi')) || [];
    if (!guardados.includes(cuponActualTexto)) {
        guardados.push(cuponActualTexto);
        localStorage.setItem('misCuponesSofi', JSON.stringify(guardados));
        cargarCuponesGuardados();
        const btnGuardar = document.getElementById('btn-guardar');
        btnGuardar.innerText = "¡Guardado! ✅";
        btnGuardar.disabled = true;
        btnGuardar.style.background = "#4ecdc4";
    }
}

function cargarCuponesGuardados() {
    let guardados = JSON.parse(localStorage.getItem('misCuponesSofi')) || [];
    const contenedor = document.getElementById('lista-cupones');
    if (guardados.length === 0) {
        contenedor.innerHTML = '<p style="color:#999; font-style:italic;">Aún no has guardado cupones...</p>';
        return;
    }
    let html = '';
    guardados.forEach((cupon, index) => {
        html += `<div class="mini-ticket"><span>${cupon}</span><button class="btn-usar" onclick="abrirModal(${index})">Usar</button></div>`;
    });
    contenedor.innerHTML = html;
}

function abrirModal(index) {
    indiceParaBorrar = index;
    document.getElementById('modal-confirmacion').classList.remove('hidden');
}

function cerrarModal() {
    document.getElementById('modal-confirmacion').classList.add('hidden');
    indiceParaBorrar = null;
}

function confirmarCanje() {
    if (indiceParaBorrar !== null) {
        let guardados = JSON.parse(localStorage.getItem('misCuponesSofi')) || [];
        guardados.splice(indiceParaBorrar, 1);
        localStorage.setItem('misCuponesSofi', JSON.stringify(guardados));
        cargarCuponesGuardados();
        cerrarModal();
        lanzarConfeti();
    }
}

function resetGalletas() {
    document.getElementById('galletas-flex').classList.remove('hidden');
    document.getElementById('cupon-resultado').classList.add('hidden');
}

function lanzarConfeti() {
    var count = 200;
    var defaults = { origin: { y: 0.7 }, zIndex: 12000 };
    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
}

function borrarTodo() {
    if(confirm("¿Segura que quieres borrar todo el historial?")) {
        localStorage.removeItem('misCuponesSofi');
        cargarCuponesGuardados();
    }
}
