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

// ----- IA y Anthropic -----
async function callIA(systemPrompt, userText, history = []) {
  if (!S.perfil.apiKey) {
    alert("Por favor, configura tu API Key de Anthropic en tu perfil.");
    return null;
  }
  
  const messages = [...history];
  if (userText) messages.push({ role: "user", content: userText });

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": S.perfil.apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 1000,
        system: systemPrompt,
        messages: messages
      })
    });
    
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || "Error en la API");
    }
    const data = await res.json();
    return data.content[0].text;
  } catch (e) {
    alert("Error IA: " + e.message);
    return null;
  }
}

// Historiales temporales (se pierden al recargar)
let vocacionalHistory = [];
let escritorHistory = [];

function appendMsg(containerId, role, text) {
  const c = $(containerId);
  if (!c) return;
  const div = document.createElement("div");
  div.style.marginBottom = "10px";
  div.style.padding = "8px 12px";
  div.style.borderRadius = "8px";
  div.style.maxWidth = "85%";
  div.style.lineHeight = "1.4";
  
  if (role === "user") {
    div.style.background = "#005c4b";
    div.style.marginLeft = "auto";
  } else {
    div.style.background = "#222";
  }
  
  // Parsear markdown basico y saltos de linea
  div.innerHTML = text.replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  c.appendChild(div);
  c.scrollTop = c.scrollHeight;
}

function renderVocacional() {
  const c = $("vocacional-container");
  if (!c.querySelector("#voc-chat")) {
    c.innerHTML = `
      <h2>🧠 Test Vocacional interactivo</h2>
      <p style="font-size: 0.9em; color: var(--gray);">Descubre tu perfil ideal charlando con nuestra IA orientadora.</p>
      <div id="voc-chat" style="height:350px;overflow-y:auto;background:#111;padding:15px;margin-bottom:10px;border-radius:8px;border:1px solid #333;display:flex;flex-direction:column;"></div>
      <div style="display:flex;gap:5px;">
        <input type="text" id="voc-input" style="flex:1;padding:12px;border-radius:6px;border:1px solid #333;background:#222;color:#fff;" placeholder="Escribe tu respuesta aquí..." onkeypress="if(event.key==='Enter') enviarMensajeVoc()">
        <button class="btn btn-primary" id="voc-btn" onclick="enviarMensajeVoc()">Enviar</button>
      </div>
    `;
    
    if (vocacionalHistory.length === 0) {
       // Mensaje inicial local
       appendMsg("voc-chat", "assistant", "¡Hola! 👋 Soy tu orientador vocacional. ¿En qué curso estás y qué asignaturas se te dan mejor o te gustan más?");
    } else {
       // Re-renderizar historial
       vocacionalHistory.forEach(m => appendMsg("voc-chat", m.role, m.content));
    }
  }
}

async function enviarMensajeVoc() {
  const input = $("voc-input");
  const text = input.value.trim();
  if (!text) return;
  
  input.value = "";
  input.disabled = true;
  $("voc-btn").disabled = true;
  
  appendMsg("voc-chat", "user", text);
  vocacionalHistory.push({ role: "user", content: text });
  
  const systemPrompt = "Eres un orientador vocacional experto para estudiantes de bachillerato en España que preparan la PAU/EBAU. El usuario es de modalidad de Ciencias. Haz preguntas cortas, evalúa su interés en Ingeniería Mecánica u otras ramas, su estilo de trabajo y personalidad. Usa un tono amigable, de tú a tú, empático y constructivo.";
  
  const respuesta = await callIA(systemPrompt, null, vocacionalHistory);
  if (respuesta) {
    appendMsg("voc-chat", "assistant", respuesta);
    vocacionalHistory.push({ role: "assistant", content: respuesta });
  }
  
  input.disabled = false;
  $("voc-btn").disabled = false;
  input.focus();
}

function renderEscritor() {
  const c = $("escritor-container");
  if (!c.querySelector("#escritor-chat")) {
    c.innerHTML = `
      <h2>✍️ El Rincón del Escritor</h2>
      <p style="font-size: 0.9em; color: var(--gray);">Tu asistente creativo libre de fórmulas. Pega ideas, pide lluvia de ideas o combate bloqueos.</p>
      <div id="escritor-chat" style="height:350px;overflow-y:auto;background:#111;padding:15px;margin-bottom:10px;border-radius:8px;border:1px solid #333;display:flex;flex-direction:column;"></div>
      <div style="display:flex;gap:5px;">
        <textarea id="escritor-input" rows="2" style="flex:1;padding:12px;border-radius:6px;border:1px solid #333;background:#222;color:#fff;font-family:inherit;resize:vertical;" placeholder="Tengo un bloqueo con el capítulo 3..."></textarea>
        <button class="btn btn-primary" id="escritor-btn" onclick="enviarMensajeEscritor()">Enviar</button>
      </div>
    `;
    
    if (escritorHistory.length === 0) {
       appendMsg("escritor-chat", "assistant", "¡Hola escritor! 📚 Estoy aquí para ayudarte con ese libro de 150 páginas. ¿En qué podemos trabajar hoy? ¿Personajes, trama, o algún bloqueo?");
    } else {
       escritorHistory.forEach(m => appendMsg("escritor-chat", m.role, m.content));
    }
  }
}

async function enviarMensajeEscritor() {
  const input = $("escritor-input");
  const text = input.value.trim();
  if (!text) return;
  
  input.value = "";
  input.disabled = true;
  $("escritor-btn").disabled = true;
  
  appendMsg("escritor-chat", "user", text);
  escritorHistory.push({ role: "user", content: text });
  
  const systemPrompt = "Eres un asistente creativo de escritura colaborativa. El usuario es un estudiante que está escribiendo un libro de 150 páginas. Ayúdale con bloqueos creativos, desarrollo de personajes, trama y estilo. Sé inspirador, constructivo y creativo. No escribas el libro por él, dale ideas, enfoques y consejos. Usa un formato claro y agradable.";
  
  const respuesta = await callIA(systemPrompt, null, escritorHistory);
  if (respuesta) {
    appendMsg("escritor-chat", "assistant", respuesta);
    escritorHistory.push({ role: "assistant", content: respuesta });
  }
  
  input.disabled = false;
  $("escritor-btn").disabled = false;
  input.focus();
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
  $("user-nombre").value = S.perfil.nombre || "";
  $("user-apikey").value = S.perfil.apiKey || "";
  $("user-modal").classList.remove("hidden");
}

$("stat-user").onclick = configurarPerfil;

function initUI() {
  $("user-cancelar").onclick = () => $("user-modal").classList.add("hidden");
  $("user-guardar").onclick = () => {
    S.perfil.nombre = $("user-nombre").value.trim();
    S.perfil.apiKey = $("user-apikey").value.trim();
    saveState();
    renderStatsTop();
    renderInicio();
    $("user-modal").classList.add("hidden");
  };
}

// ----- Inicialización -----
function init() {
  loadState();
  initUI();
  renderStatsTop();
  navTo("inicio");
}

window.onload = init;
