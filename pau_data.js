window.PAU_DATA = {
  asignaturas: {
    "mates2": { nombre: "Matemáticas II", icono: "📐" },
    "fisica": { nombre: "Física", icono: "🍎" },
    "quimica": { nombre: "Química", icono: "🧪" },
    "biologia": { nombre: "Biología", icono: "🧬" },
    "dibujo": { nombre: "Dibujo Técnico", icono: "📏" },
    
    "lengua": { nombre: "Lengua Castellana", icono: "📖" },
    "historia": { nombre: "Historia de España", icono: "📜" },
    "ingles": { nombre: "Inglés", icono: "🇬🇧" },
    
    "mates_ccss": { nombre: "Matemáticas CCSS", icono: "📊" },
    "economia": { nombre: "Economía de la Empresa", icono: "💶" },
    "latin": { nombre: "Latín", icono: "🏛️" }
  },
    camino: [
    // TRIMESTRE 1
    {
      id: "comunes-t1",
      rama: "comun",
      titulo: "Fase General - Trimestre 1",
      nodos: [
        { id: "len-1", asig: "lengua", tema: "Sintaxis Simple", tipo: "teoria" },
        { id: "hist-1", asig: "historia", tema: "Raíces y Reyes Católicos", tipo: "quiz" },
        { id: "ing-1", asig: "ingles", tema: "Grammar: Past & Conditionals", tipo: "quiz" }
      ]
    },
    {
      id: "ing-t1",
      rama: "ingenieria",
      titulo: "Ingeniería y Tecnología - Trimestre 1",
      nodos: [
        { id: "m2-1", asig: "mates2", tema: "Matrices Básicas", tipo: "teoria" },
        { id: "fis-1", asig: "fisica", tema: "Fuerza Gravitatoria", tipo: "quiz" },
        { id: "dib-1", asig: "dibujo", tema: "Geometría Métrica", tipo: "quiz" }
      ]
    },
    {
      id: "salud-t1",
      rama: "salud",
      titulo: "Ciencias de la Salud - Trimestre 1",
      nodos: [
        { id: "m2-1", asig: "mates2", tema: "Matrices Básicas", tipo: "teoria" },
        { id: "qui-1", asig: "quimica", tema: "Estructura Atómica", tipo: "quiz" },
        { id: "bio-1", asig: "biologia", tema: "Bioelementos y Agua", tipo: "quiz" }
      ]
    },
    {
      id: "soc-t1",
      rama: "sociales",
      titulo: "Ciencias Sociales - Trimestre 1",
      nodos: [
        { id: "mcs-1", asig: "mates_ccss", tema: "Matrices y Sistemas", tipo: "quiz" },
        { id: "eco-1", asig: "economia", tema: "La Empresa y el Entorno", tipo: "quiz" }
      ]
    },
    {
      id: "hum-t1",
      rama: "humanidades",
      titulo: "Humanidades - Trimestre 1",
      nodos: [
        { id: "lat-1", asig: "latin", tema: "Declinaciones y Casos", tipo: "quiz" },
        { id: "len-2", asig: "lengua", tema: "Literatura Clásica", tipo: "teoria" }
      ]
    },

    // TRIMESTRE 2
    {
      id: "comunes-t2",
      rama: "comun",
      titulo: "Fase General - Trimestre 2",
      nodos: [
        { id: "len-3", asig: "lengua", tema: "Morfología y Literatura", tipo: "quiz" },
        { id: "hist-2", asig: "historia", tema: "Siglo XIX y Restauración", tipo: "quiz" },
        { id: "ing-2", asig: "ingles", tema: "Passive & Reported Speech", tipo: "quiz" }
      ]
    },
    {
      id: "ing-t2",
      rama: "ingenieria",
      titulo: "Ingeniería y Tecnología - Trimestre 2",
      nodos: [
        { id: "m2-2", asig: "mates2", tema: "Geometría y Vectores", tipo: "quiz" },
        { id: "fis-2", asig: "fisica", tema: "Ondas y Óptica", tipo: "quiz" },
        { id: "dib-2", asig: "dibujo", tema: "Sistema Diédrico", tipo: "quiz" }
      ]
    },
    {
      id: "salud-t2",
      rama: "salud",
      titulo: "Ciencias de la Salud - Trimestre 2",
      nodos: [
        { id: "m2-2", asig: "mates2", tema: "Geometría y Vectores", tipo: "quiz" },
        { id: "qui-2", asig: "quimica", tema: "Termoquímica y Cinética", tipo: "quiz" },
        { id: "bio-2", asig: "biologia", tema: "Biología Celular", tipo: "quiz" }
      ]
    },
    {
      id: "soc-t2",
      rama: "sociales",
      titulo: "Ciencias Sociales - Trimestre 2",
      nodos: [
        { id: "mcs-2", asig: "mates_ccss", tema: "Probabilidad Básica", tipo: "quiz" },
        { id: "eco-2", asig: "economia", tema: "Gestión Financiera", tipo: "quiz" }
      ]
    },
    {
      id: "hum-t2",
      rama: "humanidades",
      titulo: "Humanidades - Trimestre 2",
      nodos: [
        { id: "lat-2", asig: "latin", tema: "Traducción de Textos", tipo: "quiz" }
      ]
    },

    // TRIMESTRE 3 (SIMULACROS)
    {
      id: "comunes-t3",
      rama: "comun",
      titulo: "Simulacros EBAU - Fase General",
      nodos: [
        { id: "sim-len", asig: "lengua", tema: "Examen EBAU Lengua", tipo: "examen" },
        { id: "sim-hist", asig: "historia", tema: "Examen EBAU Historia", tipo: "examen" },
        { id: "sim-ing", asig: "ingles", tema: "Examen EBAU Inglés", tipo: "examen" }
      ]
    },
    {
      id: "ing-t3",
      rama: "ingenieria",
      titulo: "Simulacros EBAU - Ingeniería",
      nodos: [
        { id: "sim-m2", asig: "mates2", tema: "Examen EBAU Matemáticas II", tipo: "examen" },
        { id: "sim-fis", asig: "fisica", tema: "Examen EBAU Física", tipo: "examen" },
        { id: "sim-dib", asig: "dibujo", tema: "Examen EBAU Dibujo", tipo: "examen" }
      ]
    },
    {
      id: "salud-t3",
      rama: "salud",
      titulo: "Simulacros EBAU - Salud",
      nodos: [
        { id: "sim-m2", asig: "mates2", tema: "Examen EBAU Matemáticas II", tipo: "examen" },
        { id: "sim-qui", asig: "quimica", tema: "Examen EBAU Química", tipo: "examen" },
        { id: "sim-bio", asig: "biologia", tema: "Examen EBAU Biología", tipo: "examen" }
      ]
    },
    {
      id: "soc-t3",
      rama: "sociales",
      titulo: "Simulacros EBAU - Sociales",
      nodos: [
        { id: "sim-mcs", asig: "mates_ccss", tema: "Examen EBAU Mates CCSS", tipo: "examen" },
        { id: "sim-eco", asig: "economia", tema: "Examen EBAU Economía", tipo: "examen" }
      ]
    },
    {
      id: "hum-t3",
      rama: "humanidades",
      titulo: "Simulacros EBAU - Humanidades",
      nodos: [
        { id: "sim-lat", asig: "latin", tema: "Examen EBAU Latín", tipo: "examen" }
      ]
    }
  ],
  teoria: {
    "m2-1": {
      titulo: "Álgebra: Matrices y Determinantes (Nivel EBAU)",
      secciones: [
        { 
          h: "1. Concepto y Dimensión", 
          puntos: [
            "Una matriz real de orden m×n es un conjunto de m·n números reales dispuestos en m filas y n columnas.",
            "Notación: A = (a_ij) donde 'i' es la fila (1 ≤ i ≤ m) y 'j' es la columna (1 ≤ j ≤ n).",
            "Dos matrices son iguales si y solo si tienen la misma dimensión y los elementos que ocupan la misma posición son idénticos."
          ] 
        },
        { 
          h: "2. Operaciones Básicas y Propiedades", 
          puntos: [
            "Suma: A + B = (a_ij + b_ij). Solo se pueden sumar matrices de la misma dimensión. Propiedades: Conmutativa, Asociativa, Elemento neutro (matriz nula), Elemento opuesto.",
            "Producto por un escalar: k·A = (k·a_ij). Propiedades: Distributiva respecto a la suma de matrices y de escalares, pseudo-asociativa.",
            "Producto de matrices: A·B. Condición estricta: el número de columnas de A debe coincidir con el número de filas de B. El elemento c_ij se obtiene multiplicando escalarmente la fila 'i' de A por la columna 'j' de B.",
            "ATENCIÓN EBAU: El producto de matrices NO es conmutativo (A·B ≠ B·A en general). Esto es crucial en ecuaciones matriciales."
          ] 
        },
        {
          h: "3. Matrices Cuadradas Especiales",
          puntos: [
            "Matriz Identidad (I): Elementos de la diagonal principal son 1, el resto 0. Cumple que A·I = I·A = A.",
            "Matriz Traspuesta (A^T): Se obtiene cambiando filas por columnas. Propiedades: (A^T)^T = A; (A+B)^T = A^T + B^T; (A·B)^T = B^T · A^T.",
            "Matriz Simétrica: A = A^T. Matriz Antisimétrica: A = -A^T."
          ]
        },
        {
          h: "4. Cálculo de Inversa y Rango",
          puntos: [
            "Matriz Inversa (A^-1): Cumple que A·A^-1 = A^-1·A = I. Solo existe si el determinante |A| ≠ 0 (matriz regular).",
            "Fórmula: A^-1 = (1/|A|) · (Adj(A))^T.",
            "Rango de una matriz: Número de filas o columnas linealmente independientes. También se define como el orden del mayor menor no nulo de la matriz."
          ]
        }
      ]
    },
    "fis-1": {
      titulo: "Física: Interacción Gravitatoria",
      secciones: [
        { 
          h: "1. Ley de Gravitación Universal de Newton", 
          puntos: [
            "Dos masas puntuales (m1 y m2) separadas una distancia 'r' se atraen con una fuerza directamente proporcional al producto de sus masas e inversamente proporcional al cuadrado de su distancia.",
            "Fórmula vector: F = -G · (m1·m2 / r^2) · u_r",
            "G es la constante de gravitación universal: 6.67 × 10^-11 N·m^2/kg^2.",
            "Características de la fuerza: Es siempre atractiva, central (dirigida al centro de la masa) y conservativa (el trabajo en un trayecto cerrado es cero)."
          ] 
        },
        { 
          h: "2. Campo Gravitatorio e Intensidad (g)", 
          puntos: [
            "El campo gravitatorio es la perturbación que una masa crea en el espacio que la rodea. Se mide mediante la intensidad del campo gravitatorio 'g'.",
            "g = Fuerza por unidad de masa = -G · (M / r^2) · u_r.",
            "Principio de superposición: Si existen varias masas, el campo total en un punto es la suma vectorial de los campos creados por cada masa individualmente."
          ] 
        },
        { 
          h: "3. Energía Potencial Gravitatoria (Ep)", 
          puntos: [
            "Como el campo es conservativo, se puede definir una energía potencial. Ep = -G · (M·m / r).",
            "El signo negativo indica que la fuerza es atractiva y que el cero de energía se ha establecido convencionalmente en el infinito.",
            "Potencial gravitatorio (V): Energía potencial por unidad de masa. V = Ep/m = -G·M/r. Se mide en J/kg."
          ] 
        },
        { 
          h: "4. Movimiento Orbital y Leyes de Kepler", 
          puntos: [
            "Velocidad orbital (v): Se iguala la fuerza gravitatoria a la fuerza centrípeta (m·v^2/r). Resulta v = √(G·M/r).",
            "Tercera Ley de Kepler: El cuadrado del período orbital (T) es proporcional al cubo del radio orbital (r). T^2 = (4π^2 / G·M) · r^3.",
            "Velocidad de escape: Velocidad mínima para escapar de la atracción gravitatoria (Ep = 0). v_e = √(2·G·M/R)."
          ] 
        }
      ]
    },
    "len-1": {
      titulo: "Lengua: Sintaxis y Oración Simple",
      secciones: [
        { 
          h: "1. El Sujeto y sus Características", 
          puntos: [
            "Es el Sintagma Nominal (SN) cuyo núcleo concuerda en número y persona con el verbo. NUNCA lleva preposición (excepto 'hasta' o 'entre' en casos marginales).",
            "Prueba de concordancia: Cambia el número del verbo. Si una palabra o grupo de palabras tiene que cambiar obligatoriamente, eso es el sujeto.",
            "Sujeto Omitido/Elíptico (SO): No aparece explícito pero se deduce de la desinencia verbal (Ej: [Nosotros] fuimos al cine)."
          ] 
        },
        { 
          h: "2. Los Complementos Verbales Principales", 
          puntos: [
            "Complemento Directo (CD): Sintagma Nominal o S.Prep (con 'a' si es persona). Se sustituye por lo, la, los, las. Al pasar la oración a pasiva, el CD se convierte en Sujeto Paciente.",
            "Complemento Indirecto (CI): Sintagma Preposicional (con 'a'). Indica el destinatario del daño o provecho de la acción. Se sustituye por le, les. (Ojo con los leísmos).",
            "Atributo (Atr): Exclusivo de verbos copulativos (ser, estar, parecer). Expresa una cualidad del sujeto. Se sustituye por 'lo' (invariable). Ej: Juan está (cansado -> lo está)."
          ] 
        },
        {
          h: "3. Complementos Circunstanciales y de Régimen",
          puntos: [
            "Complemento de Régimen (CRég): S.Prep exigido semánticamente por el verbo (Ej: 'acordarse DE', 'depender DE', 'confiar EN'). No se puede omitir sin alterar el significado del verbo.",
            "Complemento Predicativo (CPvo): Adjetivo o SN que complementa simultáneamente al verbo y al Sujeto o CD, concordando en género y número. (Ej: Los atletas llegaron 'exhaustos').",
            "Complementos Circunstanciales (CC): Indican circunstancias de la acción (Lugar, Tiempo, Modo, Causa, Finalidad, Compañía, Instrumento). Son eliminables."
          ]
        }
      ]
    }
  },
  examenes: [
    { id: "ebau-2023-ord", titulo: "EBAU Madrid 2023 - Ordinaria", qs: ["m2-1", "fis-1", "fis-3"] },
    { id: "ebau-2023-ext", titulo: "EBAU Madrid 2023 - Extraordinaria", qs: ["m2-2", "fis-2", "m2-4"] }
  ],
    universidades: [
    // MADRID
    { comunidad: "Madrid", uni: "Universidad Politécnica de Madrid (UPM)", carrera: "Ingeniería Mecánica", corte: 11.234, rama: "Ingeniería" },
    { comunidad: "Madrid", uni: "Universidad Politécnica de Madrid (UPM)", carrera: "Ingeniería Aeroespacial", corte: 12.560, rama: "Ingeniería" },
    { comunidad: "Madrid", uni: "Universidad Carlos III de Madrid (UC3M)", carrera: "Ingeniería Mecánica", corte: 11.890, rama: "Ingeniería" },
    { comunidad: "Madrid", uni: "Universidad Complutense de Madrid (UCM)", carrera: "Medicina", corte: 13.060, rama: "Salud" },
    { comunidad: "Madrid", uni: "Universidad Complutense de Madrid (UCM)", carrera: "Derecho", corte: 9.500, rama: "Sociales" },
    { comunidad: "Madrid", uni: "Universidad Complutense de Madrid (UCM)", carrera: "Historia", corte: 5.0, rama: "Humanidades" },
    
    // ANDALUCÍA
    { comunidad: "Andalucía", uni: "Universidad de Sevilla (US)", carrera: "Medicina", corte: 13.080, rama: "Salud" },
    { comunidad: "Andalucía", uni: "Universidad de Sevilla (US)", carrera: "Ingeniería Aeroespacial", corte: 12.350, rama: "Ingeniería" },
    { comunidad: "Andalucía", uni: "Universidad de Málaga (UMA)", carrera: "Ingeniería Mecánica", corte: 10.150, rama: "Ingeniería" },
    { comunidad: "Andalucía", uni: "Universidad de Málaga (UMA)", carrera: "ADE", corte: 8.900, rama: "Sociales" },
    
    // CATALUÑA
    { comunidad: "Cataluña", uni: "Universitat de Barcelona (UB)", carrera: "Medicina", corte: 12.920, rama: "Salud" },
    { comunidad: "Cataluña", uni: "Universitat Politècnica de Catalunya (UPC)", carrera: "Ingeniería Mecánica", corte: 10.210, rama: "Ingeniería" },
    { comunidad: "Cataluña", uni: "Universitat Pompeu Fabra (UPF)", carrera: "Derecho", corte: 10.850, rama: "Sociales" },
    
    // COMUNIDAD VALENCIANA
    { comunidad: "Comunidad Valenciana", uni: "Universitat Politècnica de València (UPV)", carrera: "Ingeniería Aeroespacial", corte: 13.050, rama: "Ingeniería" },
    { comunidad: "Comunidad Valenciana", uni: "Universitat de València (UV)", carrera: "Medicina", corte: 13.030, rama: "Salud" },
    { comunidad: "Comunidad Valenciana", uni: "Universitat de València (UV)", carrera: "Periodismo", corte: 9.300, rama: "Sociales" },
    
    // CASTILLA Y LEÓN
    { comunidad: "Castilla y León", uni: "Universidad de Salamanca (USAL)", carrera: "Medicina", corte: 12.890, rama: "Salud" },
    { comunidad: "Castilla y León", uni: "Universidad de Salamanca (USAL)", carrera: "Derecho", corte: 8.500, rama: "Sociales" }
  ],
  preguntas: {
    "qui-1": [ { q: "¿Cuál es el número atómico del carbono?", opciones: ["6", "12", "14", "8"], correcta: 0, explicacion: "El carbono tiene 6 protones." } ],
    "qui-2": [ { q: "¿Qué estudia la termoquímica?", opciones: ["El calor en reacciones químicas", "La velocidad de reacción", "El equilibrio iónico", "La tabla periódica"], correcta: 0, explicacion: "Estudia los intercambios de energía térmica." } ],
    "bio-1": [ { q: "¿Cuál es el bioelemento primario más abundante en los seres vivos?", opciones: ["Carbono", "Oxígeno", "Hidrógeno", "Nitrógeno"], correcta: 1, explicacion: "Por masa, el oxígeno (en el agua) es el más abundante." } ],
    "bio-2": [ { q: "¿Qué orgánulo produce la energía celular?", opciones: ["Ribosoma", "Mitocondria", "Lisosoma", "Aparato de Golgi"], correcta: 1, explicacion: "Las mitocondrias realizan la respiración celular." } ],
    "mcs-1": [ { q: "¿Qué es una matriz estocástica?", opciones: ["Matriz de Markov", "Matriz simétrica", "Matriz nula", "Matriz identidad"], correcta: 0, explicacion: "Se usa en cadenas de Markov." } ],
    "mcs-2": [ { q: "¿Cuál es la probabilidad de sacar un 6 en un dado normal?", opciones: ["1/6", "1/2", "1/3", "0"], correcta: 0, explicacion: "Casos favorables / Casos posibles." } ],
    "eco-1": [ { q: "¿Qué es el patrimonio neto de una empresa?", opciones: ["Bienes + Derechos - Obligaciones", "Bienes + Obligaciones", "Sólo el capital social", "Las deudas"], correcta: 0, explicacion: "Es el activo menos el pasivo exigible." } ],
    "eco-2": [ { q: "¿Qué es el VAN (Valor Actual Neto)?", opciones: ["Un criterio de selección de inversiones", "Un impuesto", "Un tipo de contrato", "Un ratio de liquidez"], correcta: 0, explicacion: "Actualiza los flujos de caja de una inversión." } ],
    "lat-1": [ { q: "¿A qué declinación pertenece la palabra 'rosa, -ae'?", opciones: ["Primera", "Segunda", "Tercera", "Cuarta"], correcta: 0, explicacion: "Termina en -ae en el genitivo singular." } ],
    "lat-2": [ { q: "¿Cómo se traduce 'Alea iacta est'?", opciones: ["La suerte está echada", "El tiempo vuela", "Aprovecha el día", "El hombre es un lobo"], correcta: 0, explicacion: "Frase atribuida a Julio César." } ],
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
