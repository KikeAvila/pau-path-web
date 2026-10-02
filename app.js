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
  if (viewId === "teoria") renderTeoria();
  if (viewId === "examenes") renderExamenes();
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

let currentQuiz = null;

function abrirNodo(id) {
  const qs = window.PAU_DATA.preguntas?.[id];
  if (!qs || qs.length === 0) {
    // Si no hay preguntas
    S.nodos[id] = true;
    S.xp += CFG.XP_NODO;
    saveState();
    renderStatsTop();
    renderPath();
    alert(`Nodo ${id} completado (No hay preguntas cargadas en la base de datos).`);
    return;
  }
  
  currentQuiz = {
    id: id,
    qs: [...qs],
    idx: 0,
    fallos: 0
  };
  
  $("quiz-tema").textContent = "Test: " + window.PAU_DATA.camino.flatMap(n=>n.nodos).find(x=>x.id===id)?.tema;
  $("quiz-modal").classList.remove("hidden");
  renderQuizQuestion();
}

function renderQuizQuestion() {
  $("feedback").classList.add("hidden");
  const q = currentQuiz.qs[currentQuiz.idx];
  $("quiz-enunciado").textContent = q.q;
  
  // Progress bar
  const pct = (currentQuiz.idx / currentQuiz.qs.length) * 100;
  $("quiz-progress").style.width = pct + "%";
  
  let html = "";
  q.opciones.forEach((opt, i) => {
    html += `<label style="display:block; padding:15px; margin:10px 0; background:#222; border-radius:8px; border:2px solid transparent; cursor:pointer; font-size:16px;" onclick="selectQuizOption(this)">
      <input type="radio" name="quiz-opt" value="${i}" style="display:none;">
      ${opt}
    </label>`;
  });
  $("quiz-opciones").innerHTML = html;
  
  const checkBtn = $("quiz-check");
  checkBtn.disabled = true;
  checkBtn.classList.remove("hidden");
  checkBtn.textContent = "Comprobar";
  checkBtn.onclick = checkQuizAnswer;
}

function selectQuizOption(lbl) {
  document.querySelectorAll("input[name='quiz-opt']").forEach(i => {
    i.parentElement.style.border = "2px solid transparent";
    i.parentElement.style.background = "#222";
  });
  lbl.style.border = "2px solid #58cc02";
  lbl.style.background = "#005c4b";
  lbl.querySelector("input").checked = true;
  $("quiz-check").disabled = false;
}

function checkQuizAnswer() {
  const q = currentQuiz.qs[currentQuiz.idx];
  const sel = document.querySelector("input[name='quiz-opt']:checked");
  if (!sel) return;
  const val = parseInt(sel.value);
  
  const correct = val === q.correcta;
  
  const fb = $("feedback");
  fb.classList.remove("hidden");
  fb.className = "feedback"; // reset classes
  
  if (correct) {
    fb.classList.add("correct");
    $("feedback-title").textContent = "¡Correcto!";
    $("feedback-icon").textContent = "✅";
    $("feedback-text").textContent = q.explicacion || "";
    S.xp += CFG.XP_ACIERTO;
  } else {
    fb.classList.add("wrong");
    $("feedback-title").textContent = "Fallaste";
    $("feedback-icon").textContent = "❌";
    $("feedback-text").textContent = `La correcta era: ${q.opciones[q.correcta]}. ${q.explicacion || ""}`;
    currentQuiz.fallos++;
  }
  
  renderStatsTop();
  $("quiz-check").classList.add("hidden");
  $("feedback-continue").onclick = nextQuizQuestion;
}

function nextQuizQuestion() {
  currentQuiz.idx++;
  if (currentQuiz.idx >= currentQuiz.qs.length) {
    finishQuiz();
  } else {
    renderQuizQuestion();
  }
}

function finishQuiz() {
  $("quiz-modal").classList.add("hidden");
  $("feedback").classList.add("hidden");
  
  S.nodos[currentQuiz.id] = true;
  S.xp += CFG.XP_NODO;
  saveState();
  renderStatsTop();
  renderPath();
  
  $("result-title").textContent = "¡Prueba superada!";
  $("result-text").textContent = `Has terminado con ${currentQuiz.fallos} fallos. Ganaste ${CFG.XP_NODO} XP extra.`;
  $("result-modal").classList.remove("hidden");
}

function renderTeoria() {
  const c = $("teoria-container");
  const teoria = window.PAU_DATA.teoria || {};
  let html = `<h2>📚 Fichas de Teoría</h2><p style="color:var(--gray); font-size:0.9em; margin-bottom:15px;">Estudia los conceptos más difíciles antes de enfrentarte a los retos.</p>`;
  
  Object.keys(teoria).forEach(id => {
    const t = teoria[id];
    html += `<div style="background:#111; padding:15px; border-radius:8px; margin-bottom:15px; border-left:4px solid var(--blue);">
      <h3 style="color:var(--blue);">${t.titulo}</h3>`;
    t.secciones.forEach(sec => {
      html += `<h4 style="margin-top:10px; color:#bbb;">${sec.h}</h4>
      <ul style="margin-top:5px; margin-left:20px; line-height:1.5;">`;
      sec.puntos.forEach(p => html += `<li>${p}</li>`);
      html += `</ul>`;
    });
    html += `</div>`;
  });
  c.innerHTML = html;
}

function renderExamenes() {
  const c = $("examenes-container");
  const examenes = window.PAU_DATA.examenes || [];
  
  let html = `<h2>📝 Exámenes y Retos</h2>
    <p style="color:var(--gray); font-size:0.9em; margin-bottom:15px;">Pruebas oficiales EBAU y colecciones de preguntas difíciles.</p>
    
    <div style="background:#222; padding:15px; border-radius:8px; margin-bottom:20px; text-align:center; border: 2px solid #FF5722;">
      <h3 style="color:#FF5722; margin-bottom:5px;">🔥 Reto: Solo Preguntas Difíciles</h3>
      <p style="font-size:0.9em; color:#bbb; margin-bottom:10px;">Un test infinito compuesto únicamente por las preguntas en las que la gente suele fallar más.</p>
      <button class="btn btn-primary" style="background:#FF5722;" onclick="abrirTestDificil()">Empezar Reto Difícil</button>
    </div>
    
    <h3>Exámenes Oficiales (EBAU)</h3>
  `;
  
  examenes.forEach(ex => {
    html += `<div style="background:#111; padding:15px; border-radius:8px; margin-top:10px; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <h4 style="font-size:1.1em;">${ex.titulo}</h4>
        <span style="font-size:0.85em; color:var(--gray);">${ex.qs.length} preguntas de Matemáticas y Física</span>
      </div>
      <button class="btn" style="background:var(--blue);" onclick="alert('Próximamente: Carga de examen oficial')">Hacer Examen</button>
    </div>`;
  });
  
  c.innerHTML = html;
}

function abrirTestDificil() {
  // Recopilar todas las preguntas marcadas como "dificil"
  let preguntasDificiles = [];
  const todas = window.PAU_DATA.preguntas || {};
  Object.keys(todas).forEach(id => {
    todas[id].forEach(q => {
      if (q.dificil) preguntasDificiles.push(q);
    });
  });
  
  if (preguntasDificiles.length === 0) {
    alert("No hay suficientes preguntas difíciles catalogadas en la base de datos.");
    return;
  }
  
  // Mezclar array (Fisher-Yates)
  for (let i = preguntasDificiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [preguntasDificiles[i], preguntasDificiles[j]] = [preguntasDificiles[j], preguntasDificiles[i]];
  }
  
  currentQuiz = {
    id: "test-dificil",
    qs: preguntasDificiles.slice(0, 5), // Tomar 5 al azar
    idx: 0,
    fallos: 0
  };
  
  $("quiz-tema").textContent = "🔥 Reto: Preguntas Difíciles";
  $("quiz-modal").classList.remove("hidden");
  renderQuizQuestion();
}

function renderOrientacion() {
  const c = $("orientacion-container");
  
  // Extract unique careers and universities for the dropdowns
  const grados = window.PAU_DATA.grados || [];
  const carreras = [...new Set(grados.map(g => g.carrera))].sort();
  const unis = [...new Set(grados.map(g => g.uni))].sort();
  
  let html = `
    <div style="padding:15px;">
      <h2>🎓 Buscador de Notas de Corte</h2>
      <p style="font-size: 0.9em; color: var(--gray); margin-bottom:15px;">Busca por carrera o por universidad para ver la oferta y las notas exigidas en la EBAU.</p>
      
      <div style="display:flex; flex-direction:column; gap:10px; background:#111; padding:15px; border-radius:8px; margin-bottom:20px;">
        <label style="font-weight:bold;">Buscar Carrera (Ej: Medicina, Ingeniería...):</label>
        <select id="ori-carrera" style="padding:10px; border-radius:6px; background:#222; color:#fff; border:1px solid #444;" onchange="filtrarOrientacion()">
          <option value="ALL">-- Todas las carreras --</option>
          ${carreras.map(car => `<option value="${car}">${car}</option>`).join('')}
        </select>
        
        <label style="font-weight:bold; margin-top:10px;">Buscar Universidad:</label>
        <select id="ori-uni" style="padding:10px; border-radius:6px; background:#222; color:#fff; border:1px solid #444;" onchange="filtrarOrientacion()">
          <option value="ALL">-- Todas las universidades --</option>
          ${unis.map(u => `<option value="${u}">${u}</option>`).join('')}
        </select>
      </div>

      <div id="ori-resultados" style="display:flex; flex-direction:column; gap:10px;">
        <!-- Resultados aquí -->
      </div>
    </div>
  `;
  c.innerHTML = html;
  
  // Initial render of all items
  filtrarOrientacion();
}

// Ensure this is accessible globally by the onchange events
window.filtrarOrientacion = function() {
  const selCarrera = $("ori-carrera").value;
  const selUni = $("ori-uni").value;
  const res = $("ori-resultados");
  
  const grados = window.PAU_DATA.grados || [];
  
  const filtrados = grados.filter(g => {
    const matchCarrera = (selCarrera === "ALL" || g.carrera === selCarrera);
    const matchUni = (selUni === "ALL" || g.uni === selUni);
    return matchCarrera && matchUni;
  });
  
  if (filtrados.length === 0) {
    res.innerHTML = `<p style="color:#ffc7ca; padding:15px; background:#3d1518; border-radius:8px;">No se han encontrado resultados para esta combinación.</p>`;
    return;
  }
  
  let html = "";
  filtrados.forEach(g => {
    // Add color coding based on branch
    let ramaColor = "#888";
    if (g.rama === "Ingeniería") ramaColor = "#4CAF50";
    else if (g.rama === "Salud") ramaColor = "#2196F3";
    else if (g.rama === "Sociales") ramaColor = "#FF9800";
    else if (g.rama === "Artes") ramaColor = "#E91E63";
    else if (g.rama === "Humanidades") ramaColor = "#9C27B0";
    
    html += `
      <div style="background:#222; padding:15px; border-radius:8px; border-left: 5px solid ${ramaColor};">
        <div style="font-weight:900; font-size:1.1em;">${g.carrera}</div>
        <div style="font-size:0.9em; color:#bbb; margin-top:4px;">${g.uni}</div>
        <div style="margin-top:10px; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:0.85em; background:#333; padding:3px 8px; border-radius:12px;">${g.rama}</span>
          <span style="font-weight:bold; color:${g.corte > 12 ? '#FF5722' : '#8BC34A'};">Nota de corte: ${g.corte.toFixed(3)}</span>
        </div>
      </div>
    `;
  });
  
  res.innerHTML = html;
};

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
      { text: "Ayudar a otros a sentirse mejor o leer sobre el cuerpo humano.", points: { salud: 3, ciencias: 1 } },
      { text: "Dibujar, tocar música o crear diseños visuales.", points: { artes: 2, letras: 1 } },
      { text: "Ninguna de las anteriores / Otra cosa.", points: {} }
    ]
  },
  {
    q: "Cuando te enfrentas a un problema complejo, ¿cómo prefieres resolverlo?",
    options: [
      { text: "Busco una solución lógica, aplicando fórmulas matemáticas o tecnología.", points: { ingenieria: 2, ciencias: 1 } },
      { text: "Intento reflexionar sobre el impacto humano o social del problema.", points: { sociales: 2, letras: 2 } },
      { text: "Imagino una solución creativa y fuera de lo común.", points: { artes: 2, ingenieria: 1 } },
      { text: "Analizo los síntomas y busco un tratamiento o diagnóstico lógico.", points: { salud: 2, ciencias: 2 } },
      { text: "Prefiero pedir ayuda o buscar un enfoque distinto.", points: {} }
    ]
  },
  {
    q: "¿Qué asignaturas te resultan menos pesadas de estudiar?",
    options: [
      { text: "Matemáticas, Física, Tecnología.", points: { ingenieria: 3, ciencias: 1 } },
      { text: "Biología, Química, Anatomía.", points: { ciencias: 1, salud: 3 } },
      { text: "Economía, Historia, Geografía.", points: { sociales: 3, letras: 1 } },
      { text: "Dibujo Artístico, Diseño, Música.", points: { artes: 3 } },
      { text: "Sinceramente, ninguna encaja conmigo al 100%.", points: {} }
    ]
  },
  {
    q: "Imagina tu trabajo ideal dentro de 10 años. ¿Dónde te ves?",
    options: [
      { text: "En una oficina de proyectos, diseñando tecnología o software.", points: { ingenieria: 3 } },
      { text: "En un laboratorio, clínica o un hospital, atendiendo pacientes.", points: { salud: 3, ciencias: 1 } },
      { text: "En un juzgado, empresa, o medios de comunicación.", points: { sociales: 3, letras: 2 } },
      { text: "En un estudio de diseño, taller de arte o como freelance creativo.", points: { artes: 3 } },
      { text: "En otro sector completamente distinto.", points: {} }
    ]
  },
  {
    q: "Si tuvieras que leer un artículo de una revista, ¿cuál elegirías?",
    options: [
      { text: "El desarrollo de un nuevo motor aeroespacial o chip de IA.", points: { ingenieria: 2, ciencias: 1 } },
      { text: "Un análisis sobre la historia económica mundial.", points: { sociales: 2, letras: 1 } },
      { text: "Una reseña sobre una nueva corriente artística o película.", points: { artes: 2, letras: 1 } },
      { text: "Un ensayo sobre la psique humana y cómo interactuamos.", points: { salud: 2, sociales: 1 } },
      { text: "Leer no es lo mío / Otra temática.", points: {} }
    ]
  },
  {
    q: "¿Con qué tipo de herramientas prefieres trabajar?",
    options: [
      { text: "Ordenadores, software de programación o herramientas de taller.", points: { ingenieria: 2 } },
      { text: "Microscopios, instrumental médico o de laboratorio.", points: { salud: 2, ciencias: 1 } },
      { text: "Pinceles, cámaras, software de diseño o instrumentos musicales.", points: { artes: 2 } },
      { text: "Libros, documentos, leyes o bases de datos económicas.", points: { sociales: 2, letras: 1 } },
      { text: "Ninguna de las anteriores.", points: {} }
    ]
  },
  {
    q: "¿Qué tipo de series o documentales te enganchan más?",
    options: [
      { text: "Cómo se hace, megaconstrucciones o tecnología futurista.", points: { ingenieria: 2 } },
      { text: "Casos médicos, naturaleza salvaje o el cuerpo humano.", points: { salud: 2, ciencias: 2 } },
      { text: "Crímenes reales, juicios, o política internacional.", points: { sociales: 2 } },
      { text: "Dramas históricos, cine independiente o biografías de artistas.", points: { artes: 2, letras: 1 } },
      { text: "Suelo ver cosas de humor puro u otras categorías.", points: {} }
    ]
  },
  {
    q: "Si fueras el líder de un proyecto, ¿cuál sería tu rol?",
    options: [
      { text: "Diseñar la arquitectura técnica o el código del sistema.", points: { ingenieria: 2 } },
      { text: "Asegurarme del bienestar y la psicología del equipo.", points: { salud: 2, sociales: 1 } },
      { text: "Gestionar los recursos financieros, el marketing o lo legal.", points: { sociales: 3 } },
      { text: "Crear la identidad visual, el logo y la estética.", points: { artes: 2 } },
      { text: "No me gusta liderar proyectos / Me encargaré de otra cosa.", points: {} }
    ]
  },
  {
    q: "¿Qué cualidad valoras más en ti mismo?",
    options: [
      { text: "Mi capacidad analítica y de estructurar problemas.", points: { ingenieria: 2, ciencias: 1 } },
      { text: "Mi empatía y deseo de sanar o cuidar a otros.", points: { salud: 3 } },
      { text: "Mi capacidad de comunicación, persuasión y escritura.", points: { letras: 2, sociales: 2 } },
      { text: "Mi sensibilidad estética e imaginación.", points: { artes: 3 } },
      { text: "Otra cualidad que no encaja aquí.", points: {} }
    ]
  },
  {
    q: "Si descubres un bug en una aplicación que usas, ¿qué haces?",
    options: [
      { text: "Intento adivinar por qué falló el código y cómo lo arreglaría.", points: { ingenieria: 3 } },
      { text: "Me quejo de que la experiencia de usuario es visualmente horrible.", points: { artes: 1, ingenieria: 1 } },
      { text: "Escribo un correo formal de reclamación exigiendo un reembolso.", points: { sociales: 2, letras: 1 } },
      { text: "Me da exactamente igual y la sigo usando o la borro.", points: {} }
    ]
  },
  {
    q: "¿Cómo te sientes respecto a la memorización de grandes cantidades de datos?",
    options: [
      { text: "Prefiero entender la lógica y deducir la fórmula.", points: { ingenieria: 2, ciencias: 1 } },
      { text: "Se me da genial memorizar huesos, músculos o reacciones químicas.", points: { salud: 3, ciencias: 2 } },
      { text: "Se me da bien memorizar leyes, fechas históricas o textos.", points: { sociales: 2, letras: 2 } },
      { text: "Odio memorizar, prefiero improvisar y crear.", points: { artes: 2 } },
      { text: "No tengo preferencia.", points: {} }
    ]
  },
  {
    q: "¿Qué noticia de un periódico te llamaría más la atención?",
    options: [
      { text: "Un avance en inteligencia artificial o un nuevo cohete.", points: { ingenieria: 3 } },
      { text: "Una cura prometedora para una enfermedad rara.", points: { salud: 3, ciencias: 2 } },
      { text: "Un cambio drástico en la bolsa de valores o una nueva ley.", points: { sociales: 3 } },
      { text: "La apertura de un museo o una exposición de vanguardia.", points: { artes: 3 } },
      { text: "Leo los deportes o los sucesos locales.", points: {} }
    ]
  },
  {
    q: "¿Si te dejaran solo en un laboratorio vacío, qué harías?",
    options: [
      { text: "Revisar los ordenadores y maquinaria electrónica.", points: { ingenieria: 3 } },
      { text: "Mirar los microscopios y muestras biológicas.", points: { salud: 2, ciencias: 3 } },
      { text: "Apagar la luz y usar el silencio para escribir o pensar.", points: { letras: 2, artes: 1 } },
      { text: "Aburrirme y salir a buscar a gente con quien hablar.", points: { sociales: 1 } },
      { text: "Ninguna de las anteriores.", points: {} }
    ]
  },
  {
    q: "¿Qué te atrae de un idioma extranjero?",
    options: [
      { text: "La estructura lógica y cómo encajan las piezas gramaticales.", points: { ingenieria: 1, letras: 2 } },
      { text: "Cómo suena fonéticamente y su belleza musical.", points: { artes: 2, letras: 1 } },
      { text: "La oportunidad que me da para hacer negocios o relaciones internacionales.", points: { sociales: 3 } },
      { text: "Poder leer manuales técnicos o estudios médicos extranjeros.", points: { ciencias: 1, salud: 1 } },
      { text: "No me interesan los idiomas.", points: {} }
    ]
  },
  {
    q: "Cuando viajas a una ciudad nueva, ¿qué es lo primero que haces?",
    options: [
      { text: "Fijarme en cómo está diseñado el metro, los puentes y los edificios.", points: { ingenieria: 3 } },
      { text: "Visitar los museos, galerías de arte y obras arquitectónicas.", points: { artes: 3 } },
      { text: "Empaparme de la historia, costumbres y organización de la gente.", points: { sociales: 2, letras: 2 } },
      { text: "Probar la gastronomía local y relajarme, sin complicaciones.", points: {} }
    ]
  },
  {
    q: "Si tuvieras que dar una charla TED, ¿sobre qué sería?",
    options: [
      { text: "El futuro de las energías renovables o la computación cuántica.", points: { ingenieria: 3, ciencias: 2 } },
      { text: "La importancia de la salud mental y los cuidados médicos.", points: { salud: 3 } },
      { text: "El impacto de la economía en la desigualdad social.", points: { sociales: 3 } },
      { text: "Cómo el arte puede cambiar el estado de ánimo de la sociedad.", points: { artes: 3 } },
      { text: "Me aterroriza hablar en público / Sobre otro tema.", points: {} }
    ]
  },
  {
    q: "Frente a un debate polémico, tú sueles...",
    options: [
      { text: "Buscar datos empíricos, números y estadísticas para ganar.", points: { ingenieria: 2, ciencias: 2 } },
      { text: "Argumentar basándote en la ética, la filosofía y la historia.", points: { letras: 3, sociales: 1 } },
      { text: "Analizar el lenguaje no verbal y la psicología del oponente.", points: { salud: 2, sociales: 1 } },
      { text: "Preferir no discutir y cambiar de tema con humor.", points: {} }
    ]
  },
  {
    q: "¿En qué entorno te concentras mejor?",
    options: [
      { text: "Con 3 monitores, teclado mecánico y silencio.", points: { ingenieria: 2 } },
      { text: "En una biblioteca o archivo, rodeado de polvo y libros antiguos.", points: { letras: 2, sociales: 1 } },
      { text: "En un espacio caótico, lleno de colores, bocetos y música de fondo.", points: { artes: 3 } },
      { text: "En equipo, discutiendo y compartiendo ideas en voz alta.", points: { sociales: 2, salud: 1 } },
      { text: "En otro lado.", points: {} }
    ]
  },
  {
    q: "¿Qué opinas del trabajo manual o de campo?",
    options: [
      { text: "Me encanta mancharme de grasa o cables.", points: { ingenieria: 3 } },
      { text: "Prefiero trabajar con las manos tocando a pacientes (fisioterapia, cirugía).", points: { salud: 3 } },
      { text: "Prefiero hacer trabajo de campo arqueológico o geológico.", points: { ciencias: 2, letras: 1 } },
      { text: "Lo mío es esculpir, pintar o tallar cosas.", points: { artes: 3 } },
      { text: "Prefiero estar sentado en una silla cómoda y limpia.", points: { sociales: 1, letras: 1 } }
    ]
  },
  {
    q: "¿Qué legado te gustaría dejar en el mundo?",
    options: [
      { text: "Un invento tecnológico que facilite la vida a millones.", points: { ingenieria: 3, ciencias: 1 } },
      { text: "Haber salvado vidas o descubierto un tratamiento médico.", points: { salud: 3, ciencias: 2 } },
      { text: "Una gran obra literaria, pictórica o musical.", points: { artes: 3, letras: 3 } },
      { text: "Un cambio en las leyes o haber liderado una empresa justa.", points: { sociales: 3 } },
      { text: "Ser recordado como una buena persona, simplemente.", points: {} }
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
  vocClassicScores = { ingenieria: 0, ciencias: 0, salud: 0, sociales: 0, letras: 0, artes: 0 };
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
    if (bestProfile === "ciencias") desc = "Tienes un perfil científico nato (Biología, Química, Física pura, Matemáticas). Disfrutas investigando en laboratorios y entendiendo las leyes que rigen el mundo natural.";
    if (bestProfile === "salud") desc = "Tienes una fuerte vocación por las Ciencias de la Salud (Medicina, Enfermería, Fisioterapia). Tu empatía y deseo de sanar a otros te define.";
    if (bestProfile === "sociales") desc = "Te mueves genial en Ciencias Sociales y Jurídicas (Derecho, ADE, Economía, Periodismo). Te interesan las leyes, los negocios y la estructura de la sociedad.";
    if (bestProfile === "letras") desc = "Lo tuyo son las Artes y Humanidades Clásicas (Filosofía, Filología, Historia). Se te da bien analizar, escribir y el pensamiento crítico.";
    if (bestProfile === "artes") desc = "Tienes un perfil marcadamente artístico (Bellas Artes, Diseño Gráfico, Audiovisuales). Prefieres crear, imaginar y expresarte de forma visual o sonora.";

    area.innerHTML = `
      <h3 style="color:#4CAF50; text-align:center;">¡Test Completado!</h3>
      <h2 style="text-align:center; text-transform:uppercase;">Perfil Dominante: ${bestProfile}</h2>
      <p style="text-align:center; margin-top:10px;">${desc}</p>
      <div style="background:#222; padding:10px; margin-top:15px; border-radius:8px; font-size:0.85em; color:#bbb;">
        Puntuaciones: Ing: ${vocClassicScores.ingenieria}, Salud: ${vocClassicScores.salud}, Soc: ${vocClassicScores.sociales}, Letras: ${vocClassicScores.letras}, Ciencias: ${vocClassicScores.ciencias}, Artes: ${vocClassicScores.artes}
      </div>
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
    if (vocClassicScores[k] !== undefined) {
      vocClassicScores[k] += pts[k];
    }
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
  c.innerHTML = `
    <div style="padding:15px;">
      <h2>✍️ Pasión por Escribir</h2>
      <p style="font-size: 0.9em; color: var(--gray);">Sabemos que además de las ciencias, tienes una gran pasión por la escritura y que escribir es importante para ti. Este es un espacio para reflexionar sobre tus opciones.</p>
      
      <div style="margin-top:20px; background:#111; padding:15px; border-radius:8px;">
        <h3 style="color:#4CAF50;">Ingeniería y Letras: ¿Se pueden combinar?</h3>
        <p style="margin-top:10px; line-height:1.5;">Tener un cerebro lógico para la Ingeniería Mecánica y a la vez talento para contar historias en un libro de 150 páginas es un perfil poco común y muy valioso. Si no sabes por dónde inclinarte, ten en cuenta estas opciones:</p>
        <ul style="margin-top:10px; margin-left:20px; line-height:1.5;">
          <li><b>Ingeniería + Escritor por vocación:</b> Muchos profesionales técnicos (ingenieros, médicos) son escritores exitosos. La ingeniería te da estabilidad, y tu tiempo libre te da libertad creativa pura.</li>
          <li><b>Divulgación Científica / Periodismo Tecnológico:</b> Escribir sobre motores, tecnología y avances científicos combinando tu conocimiento técnico con tu pluma.</li>
          <li><b>Liderazgo y Gestión:</b> En el mundo de la ingeniería, quien sabe comunicarse, redactar y organizar ideas claramente, rápidamente asciende a puestos de liderazgo.</li>
        </ul>
      </div>

      <div style="margin-top:20px; background:#111; padding:15px; border-radius:8px;">
        <h3 style="color:#2196F3;">Diario de Orientación</h3>
        <p style="margin-top:10px;">Usa este bloque de notas para aclarar tus ideas. ¿Te ves trabajando de ingeniero y escribiendo en tus ratos libres? ¿O te llama más una carrera de letras puros?</p>
        <textarea style="width:100%; height:120px; margin-top:10px; background:#222; color:#fff; border:1px solid #333; padding:10px; border-radius:6px; font-family:inherit;" placeholder="Escribe aquí tus pensamientos y reflexiones personales..."></textarea>
      </div>
    </div>
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

// ----- Tema y UI Global -----
function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function setThemeIcon() {
  const tt = $("theme-toggle");
  if (!tt) return;
  const dark = currentTheme() === "dark";
  tt.textContent = dark ? "☀️" : "🌙";
  tt.title = dark ? "Cambiar a tema claro" : "Cambiar a tema oscuro";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", dark ? "#14171c" : "#58cc02");
}

function toggleTheme() {
  const next = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  try { localStorage.setItem("paupath_theme", next); } catch (_) {}
  setThemeIcon();
}

function toggleLang() {
  alert("Próximamente: Traducción al inglés de Matemáticas y Física.");
}

// ----- Inicialización -----
function init() {
  loadState();
  initUI();
  renderStatsTop();
  setThemeIcon();
  
  const tt = $("theme-toggle");
  if (tt) tt.addEventListener("click", toggleTheme);
  
  const lt = $("lang-toggle");
  if (lt) lt.addEventListener("click", toggleLang);

  const rc = $("result-close");
  if (rc) rc.addEventListener("click", () => $("result-modal").classList.add("hidden"));
  
  const qc = $("quiz-close");
  if (qc) qc.addEventListener("click", () => {
    $("quiz-modal").classList.add("hidden");
    $("feedback").classList.add("hidden");
  });

  navTo("inicio");
}

window.onload = init;
