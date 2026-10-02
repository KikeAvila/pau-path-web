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
        { id: "len-1", asig: "lengua", tema: "Sintaxis Simple", tipo: "quiz" }
      ]
    },
    {
      id: "nivel-2",
      titulo: "Trimestre 1 - Nivel 2 (Intermedio)",
      nodos: [
        { id: "m2-2", asig: "mates2", tema: "Determinantes", tipo: "quiz" },
        { id: "ing-1", asig: "ingles", tema: "Tiempos Verbales (Past)", tipo: "quiz" },
        { id: "hist-1", asig: "historia", tema: "Raíces Históricas", tipo: "quiz" }
      ]
    },
    {
      id: "nivel-3",
      titulo: "Trimestre 1 - Nivel 3 (Avanzado)",
      nodos: [
        { id: "m2-3", asig: "mates2", tema: "Rango e Inversa", tipo: "quiz" },
        { id: "fis-2", asig: "fisica", tema: "Campo Gravitatorio", tipo: "teoria" },
        { id: "len-2", asig: "lengua", tema: "Morfología Básica", tipo: "quiz" }
      ]
    },
    {
      id: "nivel-4",
      titulo: "Trimestre 1 - Nivel 4 (Retos EBAU)",
      nodos: [
        { id: "m2-4", asig: "mates2", tema: "Sistemas Lineales", tipo: "quiz" },
        { id: "hist-2", asig: "historia", tema: "Reyes Católicos y Austrias", tipo: "quiz" },
        { id: "ing-2", asig: "ingles", tema: "Condicionales", tipo: "quiz" }
      ]
    },
    {
      id: "nivel-5",
      titulo: "Trimestre 1 - Nivel 5 (Simulacro T1)",
      nodos: [
        { id: "sim-ciencias-t1", asig: "mates2", tema: "Simulacro Ciencias T1", tipo: "examen" },
        { id: "sim-letras-t1", asig: "lengua", tema: "Simulacro Letras T1", tipo: "examen" }
      ]
    },
    // TRIMESTRE 2
    {
      id: "nivel-6",
      titulo: "Trimestre 2 - Nivel 1 (Geometría y Siglo XIX)",
      nodos: [
        { id: "m2-5", asig: "mates2", tema: "Vectores en el Espacio", tipo: "teoria" },
        { id: "fis-5", asig: "fisica", tema: "Movimiento Armónico", tipo: "quiz" },
        { id: "hist-3", asig: "historia", tema: "Guerra de Independencia", tipo: "quiz" }
      ]
    },
    {
      id: "nivel-7",
      titulo: "Trimestre 2 - Nivel 2 (Intermedio)",
      nodos: [
        { id: "m2-6", asig: "mates2", tema: "Rectas y Planos", tipo: "quiz" },
        { id: "len-3", asig: "lengua", tema: "Literatura: Generación del 98", tipo: "teoria" },
        { id: "ing-3", asig: "ingles", tema: "Reported Speech", tipo: "quiz" }
      ]
    },
    {
      id: "nivel-8",
      titulo: "Trimestre 2 - Nivel 3 (Avanzado)",
      nodos: [
        { id: "fis-6", asig: "fisica", tema: "Ondas Sonoras", tipo: "quiz" },
        { id: "m2-7", asig: "mates2", tema: "Posiciones Relativas", tipo: "quiz" },
        { id: "hist-4", asig: "historia", tema: "La Restauración", tipo: "quiz" }
      ]
    },
    {
      id: "nivel-9",
      titulo: "Trimestre 2 - Nivel 4 (Retos EBAU)",
      nodos: [
        { id: "fis-7", asig: "fisica", tema: "Óptica Geométrica", tipo: "teoria" },
        { id: "len-4", asig: "lengua", tema: "Sintaxis Compuesta", tipo: "quiz" },
        { id: "ing-4", asig: "ingles", tema: "Passive Voice", tipo: "quiz" }
      ]
    },
    {
      id: "nivel-10",
      titulo: "Trimestre 2 - Nivel 5 (Simulacro T2)",
      nodos: [
        { id: "sim-ciencias-t2", asig: "fisica", tema: "Simulacro Ciencias T2", tipo: "examen" },
        { id: "sim-letras-t2", asig: "historia", tema: "Simulacro Letras T2", tipo: "examen" }
      ]
    },
    // TRIMESTRE 3
    {
      id: "nivel-11",
      titulo: "Trimestre 3 - Nivel 1 (Análisis y Siglo XX)",
      nodos: [
        { id: "m2-9", asig: "mates2", tema: "Límites y Continuidad", tipo: "teoria" },
        { id: "hist-5", asig: "historia", tema: "Segunda República y Guerra", tipo: "quiz" },
        { id: "ing-5", asig: "ingles", tema: "Relative Clauses", tipo: "quiz" }
      ]
    },
    {
      id: "nivel-12",
      titulo: "Trimestre 3 - Nivel 2 (Intermedio)",
      nodos: [
        { id: "m2-10", asig: "mates2", tema: "Derivadas y Aplicaciones", tipo: "quiz" },
        { id: "fis-9", asig: "fisica", tema: "Efecto Fotoeléctrico", tipo: "quiz" },
        { id: "len-5", asig: "lengua", tema: "Literatura: Generación del 27", tipo: "quiz" }
      ]
    },
    {
      id: "nivel-13",
      titulo: "Trimestre 3 - Nivel 3 (Avanzado)",
      nodos: [
        { id: "m2-11", asig: "mates2", tema: "Integrales Indefinidas", tipo: "quiz" },
        { id: "hist-6", asig: "historia", tema: "Franquismo y Transición", tipo: "quiz" },
        { id: "ing-6", asig: "ingles", tema: "Vocabulary and Reading", tipo: "quiz" }
      ]
    },
    {
      id: "nivel-14",
      titulo: "Trimestre 3 - Nivel 4 (Retos EBAU)",
      nodos: [
        { id: "m2-12", asig: "mates2", tema: "Cálculo de Áreas", tipo: "quiz" },
        { id: "fis-10", asig: "fisica", tema: "Física Nuclear", tipo: "quiz" },
        { id: "len-6", asig: "lengua", tema: "Comentario de Texto", tipo: "teoria" }
      ]
    },
    {
      id: "nivel-15",
      titulo: "Trimestre 3 - Nivel 5 (Simulacro T3)",
      nodos: [
        { id: "sim-ebau-m2", asig: "mates2", tema: "Examen EBAU Matemáticas", tipo: "examen" },
        { id: "sim-ebau-hist", asig: "historia", tema: "Examen EBAU Historia", tipo: "examen" }
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
    "ing-1": [ { q: "Complete the sentence: 'Yesterday I ___ to the store.'", opciones: ["go", "went", "gone", "going"], correcta: 1, explicacion: "Past simple." } ],
    "ing-2": [ { q: "If I ___ you, I would study more.", opciones: ["was", "were", "am", "be"], correcta: 1, explicacion: "Second conditional uses 'were' for all persons." } ],
    "ing-3": [ { q: "He said: 'I am happy'. -> He said that he ___ happy.", opciones: ["is", "was", "has been", "were"], correcta: 1, explicacion: "Present simple backshifts to past simple." } ],
    "ing-4": [ { q: "The book ___ written by Shakespeare.", opciones: ["is", "was", "has", "did"], correcta: 1, explicacion: "Passive voice past simple." } ],
    "ing-5": [ { q: "The man ___ car was stolen called the police.", opciones: ["who", "whom", "whose", "which"], correcta: 2, explicacion: "Possessive relative pronoun." } ],
    "ing-6": [ { q: "Which word is a synonym for 'essential'?", opciones: ["optional", "crucial", "minor", "trivial"], correcta: 1, explicacion: "Crucial means extremely important or necessary." } ],
    
    "len-1": [ { q: "¿Cuál es el sujeto en 'Me gusta el café'?", opciones: ["Me", "gusta", "el café", "Yo (omitido)"], correcta: 2, explicacion: "El verbo concuerda con 'el café'." } ],
    "len-2": [ { q: "La palabra 'inconstitucionalmente' es...", opciones: ["Simple", "Derivada", "Parasintética", "Compuesta"], correcta: 1, explicacion: "Derivada mediante prefijo y sufijos." } ],
    "len-3": [ { q: "¿Qué autor pertenece a la Generación del 98?", opciones: ["Lorca", "Unamuno", "Góngora", "Cervantes"], correcta: 1, explicacion: "Unamuno es figura clave del 98." } ],
    "len-4": [ { q: "En 'Dime si vienes', la oración subordinada es...", opciones: ["Sustantiva", "Adjetiva", "Adverbial", "No hay subordinada"], correcta: 0, explicacion: "Es sustantiva de objeto directo." } ],
    "len-5": [ { q: "¿Quién escribió 'Romancero Gitano'?", opciones: ["Machado", "Lorca", "Alberti", "Cernuda"], correcta: 1, explicacion: "Obra clave de Federico García Lorca (Gen. 27)." } ],
    "len-6": [ { q: "¿Qué función del lenguaje predomina en un artículo de opinión?", opciones: ["Fática", "Metalingüística", "Apelativa o Conativa", "Estética"], correcta: 2, explicacion: "Busca convencer al receptor." } ],

    "hist-1": [ { q: "¿Qué pueblo prerromano habitaba el levante peninsular?", opciones: ["Celtas", "Íberos", "Tartessos", "Vascones"], correcta: 1, explicacion: "Los íberos ocupaban el sur y levante." } ],
    "hist-2": [ { q: "¿En qué año se descubrió América y se conquistó Granada?", opciones: ["1492", "1512", "1479", "1504"], correcta: 0, explicacion: "1492 es el año clave de los Reyes Católicos." } ],
    "hist-3": [ { q: "La Guerra de la Independencia Española (1808-1814) fue contra...", opciones: ["Reino Unido", "Francia", "Portugal", "Marruecos"], correcta: 1, explicacion: "Contra el Imperio Napoleónico." } ],
    "hist-4": [ { q: "El sistema de la Restauración (Turno Pacífico) fue ideado por...", opciones: ["Cánovas del Castillo", "Sagasta", "Maura", "Primo de Rivera"], correcta: 0, explicacion: "Cánovas diseñó el sistema de turno de partidos." } ],
    "hist-5": [ { q: "¿Qué Constitución se proclamó durante la Segunda República?", opciones: ["1812", "1876", "1931", "1978"], correcta: 2, explicacion: "Constitución republicana de 1931." } ],
    "hist-6": [ { q: "¿Quién fue el primer presidente del gobierno tras las elecciones de 1977?", opciones: ["Arias Navarro", "Adolfo Suárez", "Felipe González", "Carrero Blanco"], correcta: 1, explicacion: "Suárez lideró la UCD en las primeras elecciones." } ],
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
