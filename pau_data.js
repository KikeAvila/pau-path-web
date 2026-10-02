window.PAU_DATA = {
  asignaturas: {
    "mates2": { nombre: "Matemáticas II", icono: "📐" },
    "fisica": { nombre: "Física", icono: "⚛️" },
    "dibujo": { nombre: "Dibujo Técnico", icono: "📏" },
    "lengua": { nombre: "Lengua Castellana", icono: "📚" },
    "historia": { nombre: "Historia de España", icono: "🏰" },
    "ingles": { nombre: "Inglés", icono: "🇬🇧" }
  },
  camino: [
    {
      id: "nivel-1",
      titulo: "Trimestre 1 - Arranque",
      nodos: [
        { id: "m2-1", asig: "mates2", tema: "Matrices y Determinantes", tipo: "teoria" },
        { id: "fis-1", asig: "fisica", tema: "Campo Gravitatorio", tipo: "quiz" },
        { id: "dib-1", asig: "dibujo", tema: "Geometría Métrica", tipo: "mixto" },
        { id: "len-1", asig: "lengua", tema: "Sintaxis: Oración Simple", tipo: "quiz" },
      ]
    },
    {
      id: "nivel-2",
      titulo: "Trimestre 1 - Profundizando",
      nodos: [
        { id: "m2-2", asig: "mates2", tema: "Sistemas de Ecuaciones", tipo: "quiz" },
        { id: "fis-2", asig: "fisica", tema: "Campo Electromagnético", tipo: "teoria" },
        { id: "hist-1", asig: "historia", tema: "Raíces Históricas", tipo: "lectura" },
      ]
    }
  ],
  universidades: [
    { nombre: "Universidad Politécnica de Madrid (UPM)", carrera: "Ingeniería Mecánica", corte: 11.234 },
    { nombre: "Universidad Carlos III de Madrid (UC3M)", carrera: "Ingeniería Mecánica", corte: 11.890 },
    { nombre: "Universidad Nebrija", carrera: "Ingeniería del Automóvil", corte: 5.0, tipo: "Privada" }
  ]
};
