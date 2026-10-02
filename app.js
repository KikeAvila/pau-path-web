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

// ----- IA y Gemini -----
async function callIA(systemPrompt, userText, history = []) {
  if (!S.perfil.apiKey) {
    alert("Por favor, configura tu API Key de Gemini en tu perfil.");
    return null;
  }
  
  const messages = [...history];
  if (userText) messages.push({ role: "user", content: userText });

  const contents = messages.map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }]
  }));

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${S.perfil.apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: contents
      })
    });
    
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || "Error en la API de Gemini");
    }
    const data = await res.json();
    return data.candidates[0].content.parts[0].text;
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
  
  div.innerHTML = text.replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  c.appendChild(div);
  c.scrollTop = c.scrollHeight;
}

let vocClassicIndex = 0;
let vocClassicScores = { ingenieria: 0, ciencias: 0, letras: 0, artes: 0 };
const vocClassicQuestions = [
  {
    q: "¿Qué tipo de actividades disfrutas más en tu tiempo libre?",
    options: [
      { text: "Desarmar cosas, entender cómo funcionan o construir algo.", points: { ingenieria: 2, ciencias: 1 } },
      { text: "Leer, debatir ideas, o escribir historias.", points: { letras: 2, artes: 1 } },
      { text: "Hacer experimentos caseros o leer sobre descubrimientos.", points: { ciencias: 2, ingenieria: 1 } },
      { text: "Dibujar, tocar música o crear diseños visuales.", points: { artes: 2, letras: 1 } }
    ]
  },
  {
    q: "Cuando te enfrentas a un problema complejo, ¿cómo prefieres resolverlo?",
    options: [
      { text: "Busco una solución lógica, paso a paso, aplicando fórmulas o matemáticas.", points: { ingenieria: 2, ciencias: 2 } },
      { text: "Intento ver el problema desde diferentes perspectivas y reflexionar.", points: { letras: 2 } },
      { text: "Imagino una solución creativa, fuera de lo común.", points: { artes: 2 } }
    ]
  },
  {
    q: "¿Qué asignaturas te resultan menos pesadas de estudiar?",
    options: [
      { text: "Matemáticas, Física, Tecnología.", points: { ingenieria: 3, ciencias: 1 } },
      { text: "Biología, Química, Ciencias de la Tierra.", points: { ciencias: 3 } },
      { text: "Historia, Lengua, Filosofía.", points: { letras: 3 } },
      { text: "Dibujo Artístico, Diseño, Música.", points: { artes: 3 } }
    ]
  },
  {
    q: "Imagina tu trabajo ideal dentro de 10 años. ¿Dónde te ves?",
    options: [
      { text: "En una planta industrial, diseñando motores o mejorando procesos mecánicos.", points: { ingenieria: 3 } },
      { text: "En un laboratorio, investigando curas o materiales nuevos.", points: { ciencias: 3 } },
      { text: "En una oficina, editorial o dando clases, rodeado de libros y personas.", points: { letras: 3 } },
      { text: "En un estudio de diseño, taller de arte o trabajando como freelance creativo.", points: { artes: 3 } }
    ]
  }
];

function renderVocacional() {
  const c = $("vocacional-container");
  c.innerHTML = `
    <div style="padding:15px;">
      <h2>🧠 Test Vocacional</h2>
      <p style="font-size: 0.9em; color: var(--gray);">Elige cómo quieres realizar el test vocacional.</p>
      
      <div id="voc-menu" style="display:flex; flex-direction:column; gap:10px; margin-top:20px;">
        <button class="btn btn-primary" onclick="startVocClassic()" style="padding:15px; font-size:16px;">📝 Hacer Test Clásico (Offline)</button>
        <button class="btn" onclick="startVocAI()" style="padding:15px; font-size:16px; background:#4CAF50;">🤖 Chat Vocacional con IA (Gemini)</button>
      </div>

      <div id="voc-classic-area" class="hidden" style="margin-top:20px; background:#111; padding:15px; border-radius:8px;"></div>
      <div id="voc-ai-area" class="hidden" style="margin-top:20px;"></div>
    </div>
  `;
}

function startVocClassic() {
  $("voc-menu").classList.add("hidden");
  $("voc-classic-area").classList.remove("hidden");
  vocClassicIndex = 0;
  vocClassicScores = { ingenieria: 0, ciencias: 0, letras: 0, artes: 0 };
  renderVocClassicQuestion();
}

function renderVocClassicQuestion() {
  const area = $("voc-classic-area");
  if (vocClassicIndex >= vocClassicQuestions.length) {
    // Show results
    let maxScore = 0;
    let bestProfile = "";
    for (let p in vocClassicScores) {
      if (vocClassicScores[p] > maxScore) { maxScore = vocClassicScores[p]; bestProfile = p; }
    }
    
    let desc = "";
    if (bestProfile === "ingenieria") desc = "Tu perfil encaja perfectamente con las Ingenierías (Mecánica, Industrial, Informática). Te gusta resolver problemas reales usando la lógica y las matemáticas.";
    if (bestProfile === "ciencias") desc = "Tienes un perfil científico nato (Biología, Química, Física pura, Medicina). Disfrutas investigando y entendiendo cómo funciona el mundo.";
    if (bestProfile === "letras") desc = "Lo tuyo son las Humanidades y Ciencias Sociales (Periodismo, Derecho, Filosofía, Filología). Se te da bien analizar, escribir y debatir.";
    if (bestProfile === "artes") desc = "Tienes un perfil marcadamente artístico (Bellas Artes, Diseño Gráfico, Audiovisuales). Prefieres crear y expresarte de forma visual o sonora.";

    area.innerHTML = `
      <h3 style="color:#4CAF50; text-align:center;">¡Test Completado!</h3>
      <h2 style="text-align:center; text-transform:uppercase;">Perfil Dominante: ${bestProfile}</h2>
      <p style="text-align:center; margin-top:10px;">${desc}</p>
      <button class="btn" style="width:100%; margin-top:20px;" onclick="renderVocacional()">Volver al inicio</button>
    `;
    return;
  }

  const q = vocClassicQuestions[vocClassicIndex];
  let html = `<h3>Pregunta ${vocClassicIndex + 1} de ${vocClassicQuestions.length}</h3>`;
  html += `<p style="margin:15px 0; font-size:1.1em;">${q.q}</p>`;
  html += `<div style="display:flex; flex-direction:column; gap:10px;">`;
  q.options.forEach((opt, i) => {
    html += `<button class="btn" style="text-align:left; white-space:normal; line-height:1.4;" onclick="answerVocClassic(${i})">${opt.text}</button>`;
  });
  html += `</div>`;
  area.innerHTML = html;
}

function answerVocClassic(optIndex) {
  const q = vocClassicQuestions[vocClassicIndex];
  const pts = q.options[optIndex].points;
  for (let k in pts) {
    vocClassicScores[k] += pts[k];
  }
  vocClassicIndex++;
  renderVocClassicQuestion();
}

function startVocAI() {
  $("voc-menu").classList.add("hidden");
  const area = $("voc-ai-area");
  area.classList.remove("hidden");
  
  area.innerHTML = `
    <div id="voc-chat" style="height:350px;overflow-y:auto;background:#111;padding:15px;margin-bottom:10px;border-radius:8px;border:1px solid #333;display:flex;flex-direction:column;"></div>
    <div style="display:flex;gap:5px;">
      <input type="text" id="voc-input" style="flex:1;padding:12px;border-radius:6px;border:1px solid #333;background:#222;color:#fff;" placeholder="Escribe tu respuesta aquí..." onkeypress="if(event.key==='Enter') enviarMensajeVoc()">
      <button class="btn btn-primary" id="voc-btn" onclick="enviarMensajeVoc()">Enviar</button>
    </div>
    <button class="btn" style="width:100%; margin-top:10px;" onclick="renderVocacional()">Volver</button>
  `;
  
  if (vocacionalHistory.length === 0) {
     appendMsg("voc-chat", "assistant", "¡Hola! 👋 Soy tu orientador vocacional impulsado por Gemini. ¿En qué curso estás y qué asignaturas se te dan mejor o te gustan más?");
  } else {
     vocacionalHistory.forEach(m => appendMsg("voc-chat", m.role, m.content));
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
  
  const systemPrompt = "Eres un orientador vocacional experto para estudiantes de bachillerato en España que preparan la PAU/EBAU. El usuario es de modalidad de Ciencias. Haz preguntas cortas, evalúa su interés en Ingeniería Mecánica u otras ramas. Usa un tono amigable.";
  
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
      <p style="font-size: 0.9em; color: var(--gray);">Tu asistente creativo impulsado por Gemini.</p>
      <div id="escritor-chat" style="height:350px;overflow-y:auto;background:#111;padding:15px;margin-bottom:10px;border-radius:8px;border:1px solid #333;display:flex;flex-direction:column;"></div>
      <div style="display:flex;gap:5px;">
        <textarea id="escritor-input" rows="2" style="flex:1;padding:12px;border-radius:6px;border:1px solid #333;background:#222;color:#fff;font-family:inherit;resize:vertical;" placeholder="Tengo un bloqueo con el capítulo 3..."></textarea>
        <button class="btn btn-primary" id="escritor-btn" onclick="enviarMensajeEscritor()">Enviar</button>
      </div>
    `;
    
    if (escritorHistory.length === 0) {
       appendMsg("escritor-chat", "assistant", "¡Hola escritor! 📚 Estoy aquí para ayudarte con tu libro. ¿En qué trabajamos hoy?");
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
  
  const systemPrompt = "Eres un asistente creativo de escritura colaborativa. El usuario escribe un libro de 150 páginas. Ayúdale con bloqueos, personajes y trama. No escribas por él, da ideas. Usa formato claro.";
  
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
  if (S.perfil.pin) {
    const p = prompt("Introduce tu PIN de 4 dígitos para acceder al perfil:");
    if (p !== S.perfil.pin) {
      alert("PIN incorrecto.");
      return;
    }
  }
  
  $("user-nombre").value = S.perfil.nombre || "";
  $("user-pin").value = S.perfil.pin || "";
  $("user-apikey").value = S.perfil.apiKey || "";
  $("user-modal").classList.remove("hidden");
}

$("stat-user").onclick = configurarPerfil;

function initUI() {
  $("user-cancelar").onclick = () => $("user-modal").classList.add("hidden");
  $("user-guardar").onclick = () => {
    const pinVal = $("user-pin").value.trim();
    if (pinVal && (pinVal.length !== 4 || isNaN(pinVal))) {
      alert("El PIN debe ser de exactamente 4 números.");
      return;
    }
    
    S.perfil.nombre = $("user-nombre").value.trim();
    S.perfil.pin = pinVal;
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
