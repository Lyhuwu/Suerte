// --- 1. LISTA DE CUPONES (19 opciones) ---
const listaOriginal = [
    "Una cita en el cine 🎬",
    "Dejarte ganar en lo que sea (nee mi equipo) 🎮",
    "Unos besitos 💋",
    "Unos besotes 😘",
    "Un abachito💞",
    "Cita en cafetería ☕",
    "Cita en el acuario 🐧",
    "Un muamuamuamua 👄",
    "Una cita a donde queya ✨",
    "Eliminar al gallo de pelea 🐓🚫",
    "Un ah ah ah ah 🔥",
    "Tu y yo toda la eternidad ♾️",
    "Evasión de pelea: repele la pelea y debemos amarnos mucho sisisis 🛡️💖",
    "Vale por abachote 🫂",
    "Comida favorita 🍔",
    "Romper distancia entre nosotras yadiosmio testaño ✈️❤️",
    "Ver una peli juntitas💖",
    "Un masajito 💆",
    "Una tarde juntitas 🌇"
];

// Variables de estado
let disponibles = [];
let cuponActualTexto = "";
let indiceParaBorrar = null;

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    cargarCuponesGuardados();
    disponibles = [...listaOriginal]; // Llenar la baraja al inicio
});

// --- FUNCIÓN PRINCIPAL: REVELAR GALLETA ---
function revelarCupon() {
    // 1. Efecto visual instantáneo: las galletas se desvanecen un poco
    const contenedorGalletas = document.getElementById('galletas-flex');
    contenedorGalletas.style.opacity = "0.4";
    contenedorGalletas.style.pointerEvents = "none"; // Evita que pique otra mientras carga

    // 2. Sonido del CRACK instantáneo
    const sonidoCrack = document.getElementById('sonido-galleta');
    if (sonidoCrack) {
        sonidoCrack.currentTime = 0;
        sonidoCrack.play();
    }

    // 3. RETRASO MÁGICO (400ms) para la sorpresa
    setTimeout(() => {
        // Elegir cupón (evitando repetidos)
        if (disponibles.length === 0) disponibles = [...listaOriginal];
        const indiceAleatorio = Math.floor(Math.random() * disponibles.length);
        cuponActualTexto = disponibles[indiceAleatorio];
        disponibles.splice(indiceAleatorio, 1);

        // Actualizar interfaz
        document.getElementById('texto-cupon').innerText = cuponActualTexto;
        contenedorGalletas.classList.add('hidden');
        document.getElementById('cupon-resultado').classList.remove('hidden');
        
        // Resetear botones
        const btnGuardar = document.getElementById('btn-guardar');
        btnGuardar.innerText = "📥 Guardar en mi Billetera";
        btnGuardar.disabled = false;
        btnGuardar.style.background = "#ff4d6d";

        // 4. ¡FESTEJO! Sonido de confeti y animación
        lanzarConfeti();

        // Limpiar el detalle visual para la próxima vez
        contenedorGalletas.style.opacity = "1";
        contenedorGalletas.style.pointerEvents = "auto";
    }, 400); 
}

// --- GUARDAR EN BILLETERA ---
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

// --- CARGAR LISTA DE LA BILLETERA ---
function cargarCuponesGuardados() {
    let guardados = JSON.parse(localStorage.getItem('misCuponesSofi')) || [];
    const contenedor = document.getElementById('lista-cupones');
    
    if (guardados.length === 0) {
        contenedor.innerHTML = '<p style="color:#999; font-style:italic;">Aún no has guardado cupones...</p>';
        return;
    }

    let html = '';
    guardados.forEach((cupon, index) => {
        html += `
            <div class="mini-ticket">
                <span>${cupon}</span>
                <button class="btn-usar" onclick="abrirModal(${index})">Usar</button>
            </div>
        `;
    });
    contenedor.innerHTML = html;
}

// --- LÓGICA DEL CANJE (MODAL) ---
function abrirModal(index) {
    // Sonido de alerta al abrir
    const sonidoAlerta = document.getElementById('sonido-alerta');
    if (sonidoAlerta) {
        sonidoAlerta.currentTime = 0;
        sonidoAlerta.play();
    }

    indiceParaBorrar = index;
    document.getElementById('modal-confirmacion').classList.remove('hidden');
}

function confirmarCanje() {
    if (indiceParaBorrar !== null) {
        let guardados = JSON.parse(localStorage.getItem('misCuponesSofi')) || [];
        guardados.splice(indiceParaBorrar, 1);
        localStorage.setItem('misCuponesSofi', JSON.stringify(guardados));
        
        cargarCuponesGuardados();
        cerrarModal();
        // Aquí no hay confeti ni ruidos para que no sea repetitivo
    }
}

function cerrarModal() {
    document.getElementById('modal-confirmacion').classList.add('hidden');
    indiceParaBorrar = null;
}

// --- RESETEAR PARA OTRA GALLETA ---
function resetGalletas() {
    document.getElementById('galletas-flex').classList.remove('hidden');
    document.getElementById('cupon-resultado').classList.add('hidden');
}

// --- FUNCIÓN DE CONFETI Y SONIDO DE ÉXITO ---
function lanzarConfeti() {
    const sonidoFestejo = document.getElementById('sonido-confeti');
    if (sonidoFestejo) {
        sonidoFestejo.currentTime = 0;
        sonidoFestejo.play();
    }

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

// --- BORRAR TODO EL HISTORIAL ---
function borrarTodo() {
    if(confirm("¿Segura que quieres borrar todo el historial?")) {
        localStorage.removeItem('misCuponesSofi');
        cargarCuponesGuardados();
    }
}
