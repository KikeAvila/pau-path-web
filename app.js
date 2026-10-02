"use strict";

const CFG = {
  XP_ACIERTO: 10, XP_NODO: 20
};

let S = null;
const KEY = "paupath_state";

function nuevoEstado() {
  return {
    xp: 0, racha: 0, ultima: null,
    nodos: {}, perfil: { nombre: "", pin: "", apiKey: "" }
  };
}

function loadState() {
  try { S = JSON.parse(localStorage.getItem(KEY)); } catch (_) { S = null; }
  if (!S) { S = nuevoEstado(); saveState(); }
  S.perfil = S.perfil || { nombre: "", pin: "", apiKey: "" };
}
function saveState() { localStorage.setItem(KEY, JSON.stringify(S)); }

function $(id) { return document.getElementById(id); }

// ----- Rutas y Vistas -----
function hideAll() { document.querySelectorAll(".view").forEach(v => v.classList.remove("active")); }
function navTo(viewId) {
  hideAll();
  const v = $("view-" + viewId);
  if (v) v.classList.add("active");
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.view === viewId));
  if (viewId === "inicio") renderInicio();
  if (viewId === "path") renderPath();
  if (viewId === "orientacion") renderOrientacion();
  if (viewId === "vocacional") renderVocacional();
  if (viewId === "escritor") renderEscritor();
  if (viewId === "stats") renderStats();
}

document.querySelectorAll(".tab").forEach(t => {
  t.onclick = () => navTo(t.dataset.view);
});

// ----- Renderizadores Principales -----
function renderInicio() {
  const c = $("inicio-content");
  c.innerHTML = `
    <div style="padding: 20px; text-align: center;">
      <h1>🚀 Bienvenido a PAU Path, ${S.perfil.nombre || "Estudiante"}!</h1>
      <p>Tu camino hacia la universidad empieza aquí.</p>
      <p>Configura tu perfil para empezar a guardar tu progreso en la nube y usar IA.</p>
      <button onclick="configurarPerfil()" class="btn">⚙️ Configurar Perfil</button>
    </div>
  `;
}

function renderPath() {
  const c = $("path-container");
  let html = `<div style="padding: 20px;"><h2>🗺️ El Camino (EBAU)</h2>`;
  if (!window.PAU_DATA) {
    c.innerHTML = html + "Cargando datos...</div>"; return;
  }
  
  window.PAU_DATA.camino.forEach(nivel => {
    html += `<div class="level-box" style="margin-bottom: 20px; background: #222; border-radius: 12px; padding: 15px;">
      <h3>${nivel.titulo}</h3>
      <div style="display: flex; gap: 10px; overflow-x: auto; padding: 10px 0;">`;
    nivel.nodos.forEach(nodo => {
      const asig = window.PAU_DATA.asignaturas[nodo.asig];
      const done = S.nodos[nodo.id] ? "✅" : "";
      html += `<div style="background: #333; padding: 10px; border-radius: 8px; min-width: 120px; text-align: center; cursor: pointer;" onclick="abrirNodo('${nodo.id}')">
        <div style="font-size: 24px;">${asig.icono}</div>
        <div style="font-size: 12px; margin-top: 5px;">${asig.nombre}</div>
        <div style="font-size: 11px; color: #888;">${nodo.tema}</div>
        <div>${done}</div>
      </div>`;
    });
    html += `</div></div>`;
  });
  html += `</div>`;
  c.innerHTML = html;
}

function abrirNodo(id) {
  if (confirm(`¿Completar el nodo ${id}? (Simulación)`)) {
    S.nodos[id] = true;
    S.xp += CFG.XP_NODO;
    saveState();
    renderStatsTop();
    renderPath();
  }
}

function renderOrientacion() {
  const c = $("orientacion-container");
  let html = `<h2>🎓 Orientación Universitaria</h2>`;
  window.PAU_DATA.universidades.forEach(u => {
    html += `<div style="background:#222; padding:10px; margin:10px 0; border-radius:8px;">
      <strong>${u.carrera}</strong> en ${u.nombre} <br/>
      Nota de corte: <span style="color: #4CAF50;">${u.corte}</span> ${u.tipo ? `(${u.tipo})` : ""}
    </div>`;
  });
  c.innerHTML = html;
}

function renderVocacional() {
  $("vocacional-container").innerHTML = `
    <h2>🧠 Test Vocacional interactivo</h2>
    <p>Pronto aquí podrás chatear con la IA para descubrir tu perfil ideal.</p>
    <button class="btn" onclick="alert('Próximamente')">Empezar Test</button>
  `;
}

function renderEscritor() {
  $("escritor-container").innerHTML = `
    <h2>✍️ El Rincón del Escritor</h2>
    <p>Un espacio libre de fórmulas. Escribe, desarrolla personajes y pide consejo a la IA para tu libro.</p>
    <textarea style="width:100%; height: 150px; background:#111; color:#fff; padding:10px;" placeholder="Tengo un bloqueo con el capítulo 3..."></textarea>
    <button class="btn" style="margin-top:10px;" onclick="alert('Enviando a IA...')">Pedir consejo</button>
  `;
}

function renderStats() {
  $("stats-container").innerHTML = `
    <div style="padding: 20px;">
      <h2>📈 Tu Progreso</h2>
      <p>Experiencia: ${S.xp} XP</p>
      <p>Nodos completados: ${Object.keys(S.nodos).length}</p>
    </div>
  `;
}

// ----- UI y Perfil -----
function renderStatsTop() {
  $("stat-xp").textContent = S.xp;
  $("stat-racha").textContent = S.racha;
  $("stat-user-name").textContent = S.perfil.nombre || "Entrar";
}

function configurarPerfil() {
  const n = prompt("Tu nombre:", S.perfil.nombre);
  if (n !== null) S.perfil.nombre = n;
  const k = prompt("Tu API Key de Anthropic (para usar IA):", S.perfil.apiKey);
  if (k !== null) S.perfil.apiKey = k;
  saveState();
  renderStatsTop();
  renderInicio();
}

$("stat-user").onclick = configurarPerfil;

// ----- Inicialización -----
function init() {
  loadState();
  renderStatsTop();
  navTo("inicio");
}

window.onload = init;
