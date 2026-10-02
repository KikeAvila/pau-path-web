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
      titulo: "Trimestre 1 - Arranque",
      nodos: [
        { id: "m2-1", asig: "mates2", tema: "Matrices y Determinantes", tipo: "quiz" },
        { id: "fis-1", asig: "fisica", tema: "Campo Gravitatorio", tipo: "quiz" },
        { id: "dib-1", asig: "dibujo", tema: "Geometría Métrica", tipo: "quiz" },
        { id: "len-1", asig: "lengua", tema: "Sintaxis", tipo: "quiz" },
      ]
    },
    {
      id: "nivel-2",
      titulo: "Trimestre 1 - Profundizando",
      nodos: [
        { id: "m2-2", asig: "mates2", tema: "Sistemas de Ecuaciones", tipo: "quiz" },
        { id: "fis-2", asig: "fisica", tema: "Campo Electromagnético", tipo: "quiz" },
        { id: "hist-1", asig: "historia", tema: "Raíces Históricas", tipo: "quiz" },
      ]
    }
  ],
  universidades: [
    { nombre: "Universidad Politécnica de Madrid (UPM)", carrera: "Ingeniería Mecánica", corte: 11.234 },
    { nombre: "Universidad Carlos III de Madrid (UC3M)", carrera: "Ingeniería Mecánica", corte: 11.890 },
    { nombre: "Universidad Nebrija", carrera: "Ingeniería del Automóvil", corte: 5.0, tipo: "Privada" }
  ],
  preguntas: {
    "m2-1": [
      {
        q: "Si A es una matriz 3x3 y |A| = 2, ¿cuál es el determinante de 3A?",
        opciones: ["6", "18", "54", "Ninguna de las anteriores"],
        correcta: 2,
        explicacion: "El determinante de k*A para una matriz nxn es k^n * |A|. Aquí n=3, k=3, así que 3^3 * 2 = 27 * 2 = 54."
      },
      {
        q: "¿Cuál de las siguientes afirmaciones sobre el rango de una matriz es cierta?",
        opciones: [
          "El rango es el número máximo de filas linealmente independientes.",
          "El rango siempre es igual al número de columnas.",
          "El rango de una matriz nula es 1."
        ],
        correcta: 0,
        explicacion: "El rango de una matriz es, por definición, el número máximo de filas (o columnas) que son linealmente independientes."
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
        explicacion: "F = G * (m1*m2) / r^2. La fuerza es inversamente proporcional al cuadrado de la distancia (r)."
      },
      {
        q: "¿Qué es la velocidad de escape?",
        opciones: [
          "La velocidad máxima de un satélite en órbita.",
          "La velocidad mínima necesaria para que un cuerpo escape de la atracción gravitatoria.",
          "La velocidad de rotación de un planeta."
        ],
        correcta: 1,
        explicacion: "Es la velocidad que necesita un objeto para que su energía mecánica sea cero (o mayor), pudiendo alejarse indefinidamente."
      }
    ]
  }
};
