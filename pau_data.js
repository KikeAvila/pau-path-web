window.PAU_DATA = {
  asignaturas: {
    "mates2": { nombre: "Matemáticas II", icono: "📐" },
    "fisica": { nombre: "Física", icono: "⚛️" },
    "dibujo": { nombre: "Dibujo Técnico", icono: "📏" },
    "lengua": { nombre: "Lengua Castellana", icono: "📖" },
    "historia": { nombre: "Historia de España", icono: "🏛️" },
    "ingles": { nombre: "Inglés", icono: "🇬🇧" }
  },
  camino: [
    {
      id: "nivel-1",
      titulo: "Trimestre 1 - Nivel 1 (Básico)",
      nodos: [
        { id: "m2-1", asig: "mates2", tema: "Matrices Básicas", tipo: "teoria" },
        { id: "fis-1", asig: "fisica", tema: "Fuerza Gravitatoria", tipo: "quiz" },
        { id: "dib-1", asig: "dibujo", tema: "Geometría Métrica", tipo: "quiz" }
      ]
    },
    {
      id: "nivel-2",
      titulo: "Trimestre 1 - Nivel 2 (Intermedio)",
      nodos: [
        { id: "m2-2", asig: "mates2", tema: "Determinantes", tipo: "quiz" },
        { id: "fis-2", asig: "fisica", tema: "Campo Gravitatorio", tipo: "teoria" },
        { id: "len-1", asig: "lengua", tema: "Sintaxis Simple", tipo: "quiz" }
      ]
    },
    {
      id: "nivel-3",
      titulo: "Trimestre 1 - Nivel 3 (Avanzado)",
      nodos: [
        { id: "m2-3", asig: "mates2", tema: "Rango e Inversa", tipo: "quiz" },
        { id: "hist-1", asig: "historia", tema: "Raíces Históricas", tipo: "quiz" },
        { id: "fis-3", asig: "fisica", tema: "Velocidad de Escape", tipo: "quiz" }
      ]
    },
    {
      id: "nivel-4",
      titulo: "Trimestre 1 - Nivel 4 (Retos EBAU)",
      nodos: [
        { id: "m2-4", asig: "mates2", tema: "Sistemas Lineales", tipo: "quiz" },
        { id: "fis-4", asig: "fisica", tema: "Satélites y Órbitas", tipo: "quiz" },
        { id: "dib-2", asig: "dibujo", tema: "Sistema Diédrico Básico", tipo: "quiz" }
      ]
    },
    {
      id: "nivel-5",
      titulo: "Trimestre 1 - Nivel 5 (Simulacro T1)",
      nodos: [
        { id: "sim-m2", asig: "mates2", tema: "Simulacro Matemáticas T1", tipo: "examen" },
        { id: "sim-fis", asig: "fisica", tema: "Simulacro Física T1", tipo: "examen" }
      ]
    }
  ],
  teoria: {
    "m2-1": {
      titulo: "Matrices Básicas",
      secciones: [
        { h: "Definición", puntos: ["Una matriz es un arreglo bidimensional de números.", "Su dimensión se expresa como m x n (filas x columnas)."] },
        { h: "Tipos", puntos: ["Matriz fila, matriz columna, matriz cuadrada.", "Matriz identidad (unos en la diagonal, ceros en el resto)."] }
      ]
    },
    "fis-2": {
      titulo: "Campo Gravitatorio",
      secciones: [
        { h: "Concepto", puntos: ["Perturbación del espacio creada por una masa.", "Se mide por la intensidad g = G*M/r^2."] },
        { h: "Potencial", puntos: ["El campo gravitatorio es conservativo.", "Energía potencial Ep = -G*M*m/r."] }
      ]
    }
  },
  examenes: [
    { id: "ebau-2023-ord", titulo: "EBAU Madrid 2023 - Ordinaria", qs: ["m2-1", "fis-1", "fis-3"] },
    { id: "ebau-2023-ext", titulo: "EBAU Madrid 2023 - Extraordinaria", qs: ["m2-2", "fis-2", "m2-4"] }
  ],
  universidades: [
    // INGENIERÍAS (UPM, UC3M, URJC)
    { uni: "Universidad Politécnica de Madrid (UPM)", carrera: "Ingeniería Mecánica", corte: 11.234, rama: "Ingeniería" },
    { uni: "Universidad Politécnica de Madrid (UPM)", carrera: "Ingeniería Aeroespacial", corte: 12.560, rama: "Ingeniería" },
    { uni: "Universidad Politécnica de Madrid (UPM)", carrera: "Ingeniería Informática", corte: 10.950, rama: "Ingeniería" },
    { uni: "Universidad Carlos III de Madrid (UC3M)", carrera: "Ingeniería Mecánica", corte: 11.890, rama: "Ingeniería" },
    { uni: "Universidad Carlos III de Madrid (UC3M)", carrera: "Ingeniería Biomédica", corte: 12.910, rama: "Ingeniería" },
    { uni: "Universidad Rey Juan Carlos (URJC)", carrera: "Ingeniería Mecánica", corte: 9.800, rama: "Ingeniería" },
    
    // CIENCIAS DE LA SALUD (UCM, UAM, UAH)
    { uni: "Universidad Complutense de Madrid (UCM)", carrera: "Medicina", corte: 13.060, rama: "Salud" },
    { uni: "Universidad Complutense de Madrid (UCM)", carrera: "Enfermería", corte: 11.800, rama: "Salud" },
    { uni: "Universidad Complutense de Madrid (UCM)", carrera: "Psicología", corte: 10.900, rama: "Salud" },
    { uni: "Universidad Autónoma de Madrid (UAM)", carrera: "Medicina", corte: 13.120, rama: "Salud" },
    { uni: "Universidad Autónoma de Madrid (UAM)", carrera: "Enfermería", corte: 11.950, rama: "Salud" },
    { uni: "Universidad de Alcalá (UAH)", carrera: "Medicina", corte: 12.980, rama: "Salud" },

    // CIENCIAS SOCIALES Y JURÍDICAS (UCM, UC3M)
    { uni: "Universidad Complutense de Madrid (UCM)", carrera: "Derecho", corte: 9.500, rama: "Sociales" },
    { uni: "Universidad Complutense de Madrid (UCM)", carrera: "Periodismo", corte: 8.700, rama: "Sociales" },
    { uni: "Universidad Complutense de Madrid (UCM)", carrera: "ADE", corte: 9.850, rama: "Sociales" },
    { uni: "Universidad Carlos III de Madrid (UC3M)", carrera: "Derecho y ADE", corte: 12.100, rama: "Sociales" },

    // ARTES Y HUMANIDADES (UCM, UAM)
    { uni: "Universidad Complutense de Madrid (UCM)", carrera: "Bellas Artes", corte: 10.200, rama: "Artes" },
    { uni: "Universidad Complutense de Madrid (UCM)", carrera: "Filología Hispánica", corte: 7.500, rama: "Humanidades" },
    { uni: "Universidad Complutense de Madrid (UCM)", carrera: "Filosofía", corte: 8.100, rama: "Humanidades" },
    { uni: "Universidad Autónoma de Madrid (UAM)", carrera: "Historia", corte: 8.300, rama: "Humanidades" },

    // PRIVADAS
    { uni: "Universidad Nebrija", carrera: "Ingeniería del Automóvil", corte: 5.0, rama: "Ingeniería" },
    { uni: "Universidad CEU San Pablo", carrera: "Medicina", corte: 5.0, rama: "Salud" },
    { uni: "Universidad Francisco de Vitoria", carrera: "Periodismo", corte: 5.0, rama: "Sociales" }
  ],
  preguntas: {
    "m2-1": [
      {
        q: "Si A es una matriz 3x3 y |A| = 2, ¿cuál es el determinante de 3A?",
        opciones: ["6", "18", "54", "Ninguna de las anteriores"],
        correcta: 2,
        explicacion: "El determinante de k*A para una matriz nxn es k^n * |A|. Aquí n=3, k=3, así que 3^3 * 2 = 27 * 2 = 54.",
        dificil: true
      },
      {
        q: "¿Cuál de las siguientes afirmaciones sobre el rango de una matriz es cierta?",
        opciones: [
          "El rango es el número máximo de filas linealmente independientes.",
          "El rango siempre es igual al número de columnas.",
          "El rango de una matriz nula es 1."
        ],
        correcta: 0,
        explicacion: "El rango de una matriz es, por definición, el número máximo de filas (o columnas) que son linealmente independientes.",
        dificil: false
      }
    ],
    "fis-1": [
      {
        q: "Según la Ley de Gravitación Universal de Newton, la fuerza entre dos masas es...",
        opciones: [
          "Directamente proporcional a la distancia al cuadrado.",
          "Inversamente proporcional a la distancia al cuadrado.",
          "Inversamente proporcional a las masas."
        ],
        correcta: 1,
        explicacion: "F = G * (m1*m2) / r^2. La fuerza es inversamente proporcional al cuadrado de la distancia (r).",
        dificil: false
      },
      {
        q: "¿Qué es la velocidad de escape?",
        opciones: [
          "La velocidad máxima de un satélite en órbita.",
          "La velocidad mínima necesaria para que un cuerpo escape de la atracción gravitatoria.",
          "La velocidad de rotación de un planeta."
        ],
        correcta: 1,
        explicacion: "Es la velocidad que necesita un objeto para que su energía mecánica sea cero (o mayor), pudiendo alejarse indefinidamente.",
        dificil: true
      }
    ],
    "m2-3": [
      {
        q: "Si el determinante de una matriz es 0, entonces...",
        opciones: ["Tiene matriz inversa.", "No tiene matriz inversa.", "Es la matriz identidad."],
        correcta: 1,
        explicacion: "Una matriz es invertible si y solo si su determinante es distinto de cero.",
        dificil: false
      }
    ],
    "m2-4": [
      {
        q: "En un sistema compatible indeterminado...",
        opciones: ["No hay solución.", "Hay una única solución.", "Hay infinitas soluciones."],
        correcta: 2,
        explicacion: "Según el teorema de Rouché-Frobenius, si rang(A)=rang(A*) < n, hay infinitas soluciones.",
        dificil: true
      }
    ],
    "fis-3": [
      {
        q: "La Tercera Ley de Kepler establece que...",
        opciones: ["El periodo al cuadrado es proporcional al cubo del radio.", "El periodo es igual al radio.", "Las órbitas son siempre circulares."],
        correcta: 0,
        explicacion: "T^2 / r^3 = constante.",
        dificil: false
      }
    ],
    "fis-4": [
      {
        q: "La energía mecánica de un satélite en órbita circular es...",
        opciones: ["Positiva.", "Cero.", "Negativa."],
        correcta: 2,
        explicacion: "Em = Ep + Ec = -G*M*m/r + G*M*m/(2r) = -G*M*m/(2r), que es negativa.",
        dificil: true
      }
    ]
  }
};
