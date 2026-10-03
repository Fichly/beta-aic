// Registre des cartes des deux decks : nom (renvois), famille (couleur), numéro affiché, ordre, fichier, pages sources.
const REG = {
 "lean-00": {
  "deck": "lean",
  "order": 0,
  "num": 0,
  "name": "Introduction",
  "fam": 0,
  "file": "cards/lean/lean-00.js",
  "kind": "libre",
  "pages": [
   1,
   2,
   3
  ]
 },
 "lean-01": {
  "deck": "lean",
  "order": 1,
  "num": 1,
  "name": "Guide du deck",
  "fam": 0,
  "file": "cards/lean/lean-01.js",
  "kind": "libre",
  "pages": [
   4,
   5
  ]
 },
 "lean-02": {
  "deck": "lean",
  "order": 2,
  "num": 2,
  "name": "Comprendre le lean",
  "fam": 0,
  "file": "cards/lean/lean-02.js",
  "kind": "libre",
  "pages": [
   6,
   7,
   10
  ]
 },
 "lean-03": {
  "deck": "lean",
  "order": 3,
  "num": 3,
  "name": "Ceintures et Six Sigma",
  "fam": 0,
  "file": "cards/lean/lean-03.js",
  "kind": "libre",
  "pages": [
   11,
   12
  ]
 },
 "lean-04": {
  "deck": "lean",
  "order": 4,
  "num": 4,
  "name": "VOC",
  "fam": 1,
  "file": "cards/lean/lean-04.js",
  "kind": "outil",
  "pages": [
   13,
   14
  ]
 },
 "lean-05": {
  "deck": "lean",
  "order": 5,
  "num": 5,
  "name": "QQOQCCP",
  "fam": 1,
  "file": "cards/lean/lean-05.js",
  "kind": "outil",
  "pages": [
   15,
   16
  ]
 },
 "lean-06": {
  "deck": "lean",
  "order": 6,
  "num": 6,
  "name": "VA, NVA, NVAO",
  "fam": 1,
  "file": "cards/lean/lean-06.js",
  "kind": "outil",
  "pages": [
   17,
   18
  ]
 },
 "lean-07": {
  "deck": "lean",
  "order": 7,
  "num": 7,
  "name": "Muda, Muri, Mura",
  "fam": 1,
  "file": "cards/lean/lean-07.js",
  "kind": "outil",
  "pages": [
   19,
   20
  ]
 },
 "lean-08": {
  "deck": "lean",
  "order": 8,
  "num": 8,
  "name": "Ishikawa",
  "fam": 1,
  "file": "cards/lean/lean-08.js",
  "kind": "outil",
  "pages": [
   21,
   22
  ]
 },
 "lean-09": {
  "deck": "lean",
  "order": 9,
  "num": 9,
  "name": "5 Pourquoi",
  "fam": 1,
  "file": "cards/lean/lean-09.js",
  "kind": "outil",
  "pages": [
   23,
   24
  ]
 },
 "lean-10": {
  "deck": "lean",
  "order": 10,
  "num": 10,
  "name": "Bâtonnage",
  "fam": 1,
  "file": "cards/lean/lean-10.js",
  "kind": "outil",
  "pages": [
   25,
   26
  ]
 },
 "lean-11": {
  "deck": "lean",
  "order": 11,
  "num": 11,
  "name": "PDCA",
  "fam": 1,
  "file": "cards/lean/lean-11.js",
  "kind": "outil",
  "pages": [
   27,
   28
  ]
 },
 "lean-12": {
  "deck": "lean",
  "order": 12,
  "num": 12,
  "name": "A3",
  "fam": 1,
  "file": "cards/lean/lean-12.js",
  "kind": "outil",
  "pages": [
   29,
   30
  ]
 },
 "lean-13": {
  "deck": "lean",
  "order": 13,
  "num": 13,
  "name": "8D",
  "fam": 1,
  "file": "cards/lean/lean-13.js",
  "kind": "outil",
  "pages": [
   31,
   32
  ]
 },
 "lean-14": {
  "deck": "lean",
  "order": 14,
  "num": 14,
  "name": "DMAIC",
  "fam": 1,
  "file": "cards/lean/lean-14.js",
  "kind": "outil",
  "pages": [
   33,
   34
  ]
 },
 "lean-15": {
  "deck": "lean",
  "order": 15,
  "num": 15,
  "name": "Chantier Kaizen",
  "fam": 1,
  "file": "cards/lean/lean-15.js",
  "kind": "outil",
  "pages": [
   35,
   36
  ]
 },
 "lean-16": {
  "deck": "lean",
  "order": 16,
  "num": 16,
  "name": "QRQC",
  "fam": 1,
  "file": "cards/lean/lean-16.js",
  "kind": "outil",
  "pages": [
   37,
   38
  ]
 },
 "lean-17": {
  "deck": "lean",
  "order": 17,
  "num": 17,
  "name": "Les 3G",
  "fam": 2,
  "file": "cards/lean/lean-17.js",
  "kind": "outil",
  "pages": [
   39,
   40
  ]
 },
 "lean-18": {
  "deck": "lean",
  "order": 18,
  "num": 18,
  "name": "DILO",
  "fam": 2,
  "file": "cards/lean/lean-18.js",
  "kind": "outil",
  "pages": [
   41,
   42
  ]
 },
 "lean-19": {
  "deck": "lean",
  "order": 19,
  "num": 19,
  "name": "5S",
  "fam": 2,
  "file": "cards/lean/lean-19.js",
  "kind": "outil",
  "pages": [
   43,
   44
  ]
 },
 "lean-20": {
  "deck": "lean",
  "order": 20,
  "num": 20,
  "name": "Management visuel",
  "fam": 2,
  "file": "cards/lean/lean-20.js",
  "kind": "outil",
  "pages": [
   45,
   46
  ]
 },
 "lean-21": {
  "deck": "lean",
  "order": 21,
  "num": 21,
  "name": "SQCDPE",
  "fam": 2,
  "file": "cards/lean/lean-21.js",
  "kind": "outil",
  "pages": [
   47,
   48
  ]
 },
 "lean-22": {
  "deck": "lean",
  "order": 22,
  "num": 22,
  "name": "Obeya",
  "fam": 2,
  "file": "cards/lean/lean-22.js",
  "kind": "outil",
  "pages": [
   49,
   50
  ]
 },
 "lean-23": {
  "deck": "lean",
  "order": 23,
  "num": 23,
  "name": "AIC",
  "fam": 2,
  "file": "cards/lean/lean-23.js",
  "kind": "outil",
  "pages": [
   51,
   52
  ]
 },
 "lean-24": {
  "deck": "lean",
  "order": 24,
  "num": 24,
  "name": "Pareto",
  "fam": 3,
  "file": "cards/lean/lean-24.js",
  "kind": "outil",
  "pages": [
   53,
   54
  ]
 },
 "lean-25": {
  "deck": "lean",
  "order": 25,
  "num": 25,
  "name": "Matrice gain/effort",
  "fam": 3,
  "file": "cards/lean/lean-25.js",
  "kind": "outil",
  "pages": [
   55,
   56
  ]
 },
 "lean-26": {
  "deck": "lean",
  "order": 26,
  "num": 26,
  "name": "Matrice de décision",
  "fam": 3,
  "file": "cards/lean/lean-26.js",
  "kind": "outil",
  "pages": [
   57,
   58
  ]
 },
 "lean-27": {
  "deck": "lean",
  "order": 27,
  "num": 27,
  "name": "SMART",
  "fam": 3,
  "file": "cards/lean/lean-27.js",
  "kind": "outil",
  "pages": [
   59,
   60
  ]
 },
 "lean-28": {
  "deck": "lean",
  "order": 28,
  "num": 28,
  "name": "OKR",
  "fam": 3,
  "file": "cards/lean/lean-28.js",
  "kind": "outil",
  "pages": [
   61,
   62
  ]
 },
 "lean-29": {
  "deck": "lean",
  "order": 29,
  "num": 29,
  "name": "Hoshin Kanri",
  "fam": 3,
  "file": "cards/lean/lean-29.js",
  "kind": "outil",
  "pages": [
   63,
   64
  ]
 },
 "lean-30": {
  "deck": "lean",
  "order": 30,
  "num": 30,
  "name": "Diagramme spaghetti",
  "fam": 4,
  "file": "cards/lean/lean-30.js",
  "kind": "outil",
  "pages": [
   65,
   66
  ]
 },
 "lean-31": {
  "deck": "lean",
  "order": 31,
  "num": 31,
  "name": "Swimlane",
  "fam": 4,
  "file": "cards/lean/lean-31.js",
  "kind": "outil",
  "pages": [
   67,
   68
  ]
 },
 "lean-32": {
  "deck": "lean",
  "order": 32,
  "num": 32,
  "name": "SIPOC",
  "fam": 4,
  "file": "cards/lean/lean-32.js",
  "kind": "outil",
  "pages": [
   69,
   70
  ]
 },
 "lean-33": {
  "deck": "lean",
  "order": 33,
  "num": 33,
  "name": "VSM",
  "fam": 4,
  "file": "cards/lean/lean-33.js",
  "kind": "outil",
  "pages": [
   71,
   72
  ]
 },
 "lean-34": {
  "deck": "lean",
  "order": 34,
  "num": 34,
  "name": "Flux tiré",
  "fam": 4,
  "file": "cards/lean/lean-34.js",
  "kind": "outil",
  "pages": [
   73,
   74
  ]
 },
 "lean-35": {
  "deck": "lean",
  "order": 35,
  "num": 35,
  "name": "Takt Time",
  "fam": 5,
  "file": "cards/lean/lean-35.js",
  "kind": "outil",
  "pages": [
   75,
   76
  ]
 },
 "lean-36": {
  "deck": "lean",
  "order": 36,
  "num": 36,
  "name": "Yamazumi",
  "fam": 5,
  "file": "cards/lean/lean-36.js",
  "kind": "outil",
  "pages": [
   77,
   78
  ]
 },
 "lean-37": {
  "deck": "lean",
  "order": 37,
  "num": 37,
  "name": "Heijunka",
  "fam": 5,
  "file": "cards/lean/lean-37.js",
  "kind": "outil",
  "pages": [
   79,
   80
  ]
 },
 "lean-38": {
  "deck": "lean",
  "order": 38,
  "num": 38,
  "name": "TRS",
  "fam": 5,
  "file": "cards/lean/lean-38.js",
  "kind": "outil",
  "pages": [
   81,
   82
  ]
 },
 "lean-39": {
  "deck": "lean",
  "order": 39,
  "num": 39,
  "name": "AMDEC",
  "fam": 5,
  "file": "cards/lean/lean-39.js",
  "kind": "outil",
  "pages": [
   83,
   84
  ]
 },
 "lean-40": {
  "deck": "lean",
  "order": 40,
  "num": 40,
  "name": "SMED",
  "fam": 5,
  "file": "cards/lean/lean-40.js",
  "kind": "outil",
  "pages": [
   85,
   86
  ]
 },
 "lean-41": {
  "deck": "lean",
  "order": 41,
  "num": 41,
  "name": "Poka-yoke",
  "fam": 6,
  "file": "cards/lean/lean-41.js",
  "kind": "outil",
  "pages": [
   87,
   88
  ]
 },
 "lean-42": {
  "deck": "lean",
  "order": 42,
  "num": 42,
  "name": "Jidoka",
  "fam": 6,
  "file": "cards/lean/lean-42.js",
  "kind": "outil",
  "pages": [
   89,
   90
  ]
 },
 "lean-43": {
  "deck": "lean",
  "order": 43,
  "num": 43,
  "name": "Andon",
  "fam": 6,
  "file": "cards/lean/lean-43.js",
  "kind": "outil",
  "pages": [
   91,
   92
  ]
 },
 "lean-44": {
  "deck": "lean",
  "order": 44,
  "num": 44,
  "name": "Cartes de contrôle",
  "fam": 6,
  "file": "cards/lean/lean-44.js",
  "kind": "outil",
  "pages": [
   93,
   94
  ]
 },
 "lean-45": {
  "deck": "lean",
  "order": 45,
  "num": 45,
  "name": "TWI",
  "fam": 6,
  "file": "cards/lean/lean-45.js",
  "kind": "outil",
  "pages": [
   95,
   96
  ]
 },
 "lean-46": {
  "deck": "lean",
  "order": 46,
  "num": 46,
  "name": "Aller plus loin",
  "fam": 0,
  "file": "cards/lean/lean-46.js",
  "kind": "libre",
  "pages": [
   97,
   98
  ]
 },
 "aic-01": {
  "deck": "aic",
  "order": 1,
  "num": 1,
  "name": "Introduction",
  "fam": 6,
  "section": "AIC · Introduction",
  "file": "cards/aic/aic-01.js",
  "pages": [
   1,
   2
  ],
  "kind": "libre"
 },
 "aic-02": {
  "deck": "aic",
  "order": 2,
  "num": 2,
  "name": "Comprendre le lean",
  "fam": 6,
  "section": "AIC · Introduction",
  "file": "cards/aic/aic-02.js",
  "pages": [
   3,
   4
  ],
  "kind": "libre"
 },
 "aic-03": {
  "deck": "aic",
  "order": 3,
  "num": 3,
  "name": "Introduction aux AIC",
  "fam": 6,
  "section": "AIC · Introduction",
  "file": "cards/aic/aic-03.js",
  "pages": [
   5,
   6
  ],
  "kind": "libre"
 },
 "aic-04": {
  "deck": "aic",
  "order": 4,
  "num": 4,
  "name": "Le fil rouge",
  "fam": 6,
  "section": "AIC · Fil rouge",
  "file": "cards/aic/aic-04.js",
  "pages": [
   10,
   11
  ],
  "kind": "libre"
 },
 "aic-05": {
  "deck": "aic",
  "order": 5,
  "num": 5,
  "name": "Pourquoi lancer les AIC ?",
  "fam": 4,
  "section": "AIC · Construire",
  "file": "cards/aic/aic-05.js",
  "pages": [
   12,
   13
  ],
  "kind": "outil"
 },
 "aic-06": {
  "deck": "aic",
  "order": 6,
  "num": 6,
  "name": "Diagnostiquer l’existant",
  "fam": 4,
  "section": "AIC · Construire",
  "file": "cards/aic/aic-06.js",
  "pages": [
   17,
   18
  ],
  "kind": "outil"
 },
 "aic-07": {
  "deck": "aic",
  "order": 7,
  "num": 7,
  "name": "Partir de la voix du client",
  "fam": 4,
  "section": "AIC · Construire",
  "file": "cards/aic/aic-07.js",
  "pages": [
   19,
   22
  ],
  "kind": "outil"
 },
 "aic-08": {
  "deck": "aic",
  "order": 8,
  "num": 8,
  "name": "Décliner la stratégie",
  "fam": 4,
  "section": "AIC · Construire",
  "file": "cards/aic/aic-08.js",
  "pages": [
   23,
   24
  ],
  "kind": "outil"
 },
 "aic-09": {
  "deck": "aic",
  "order": 9,
  "num": 9,
  "name": "Relier la stratégie au terrain",
  "fam": 4,
  "section": "AIC · Construire",
  "file": "cards/aic/aic-09.js",
  "pages": [
   25,
   26
  ],
  "kind": "outil"
 },
 "aic-10": {
  "deck": "aic",
  "order": 10,
  "num": 10,
  "name": "Indicateurs SQCDP",
  "fam": 4,
  "section": "AIC · Construire",
  "file": "cards/aic/aic-10.js",
  "pages": [
   27,
   28
  ],
  "kind": "outil"
 },
 "aic-11": {
  "deck": "aic",
  "order": 11,
  "num": 11,
  "name": "Pyramide AIC",
  "fam": 4,
  "section": "AIC · Construire",
  "file": "cards/aic/aic-11.js",
  "pages": [
   29,
   30
  ],
  "kind": "outil"
 },
 "aic-12": {
  "deck": "aic",
  "order": 12,
  "num": 12,
  "name": "Management visuel",
  "fam": 4,
  "section": "AIC · Construire",
  "file": "cards/aic/aic-12.js",
  "pages": [
   31,
   32
  ],
  "kind": "outil"
 },
 "aic-13": {
  "deck": "aic",
  "order": 13,
  "num": 13,
  "name": "Standards d’animation",
  "fam": 4,
  "section": "AIC · Construire",
  "file": "cards/aic/aic-13.js",
  "pages": [
   33,
   34
  ],
  "kind": "outil"
 },
 "aic-14": {
  "deck": "aic",
  "order": 14,
  "num": 14,
  "name": "Former les animateurs",
  "fam": 1,
  "section": "AIC · Déployer",
  "file": "cards/aic/aic-14.js",
  "pages": [
   35,
   36
  ],
  "kind": "outil"
 },
 "aic-15": {
  "deck": "aic",
  "order": 15,
  "num": 15,
  "name": "TOP 5",
  "fam": 1,
  "section": "AIC · Déployer",
  "file": "cards/aic/aic-15.js",
  "pages": [
   37
  ],
  "kind": "outil"
 },
 "aic-15b": {
  "deck": "aic",
  "order": 15.5,
  "num": 15,
  "name": "Tableau du TOP 5",
  "fam": 1,
  "section": "AIC · Déployer",
  "file": "cards/aic/aic-15b.js",
  "pages": [
   38
  ],
  "kind": "libre"
 },
 "aic-16": {
  "deck": "aic",
  "order": 16,
  "num": 16,
  "name": "TOP 15 et escalade",
  "fam": 1,
  "section": "AIC · Déployer",
  "file": "cards/aic/aic-16.js",
  "pages": [
   39
  ],
  "kind": "outil"
 },
 "aic-16b": {
  "deck": "aic",
  "order": 16.5,
  "num": 16,
  "name": "Tableau du TOP 15",
  "fam": 1,
  "section": "AIC · Déployer",
  "file": "cards/aic/aic-16b.js",
  "pages": [
   40
  ],
  "kind": "libre"
 },
 "aic-17": {
  "deck": "aic",
  "order": 17,
  "num": 17,
  "name": "TOP 60 direction",
  "fam": 1,
  "section": "AIC · Déployer",
  "file": "cards/aic/aic-17.js",
  "pages": [
   41
  ],
  "kind": "outil"
 },
 "aic-17b": {
  "deck": "aic",
  "order": 17.5,
  "num": 17,
  "name": "Tableau du TOP 60",
  "fam": 1,
  "section": "AIC · Déployer",
  "file": "cards/aic/aic-17b.js",
  "pages": [
   42
  ],
  "kind": "libre"
 },
 "aic-18": {
  "deck": "aic",
  "order": 18,
  "num": 18,
  "name": "Plan d’action",
  "fam": 1,
  "section": "AIC · Déployer",
  "file": "cards/aic/aic-18.js",
  "pages": [
   43,
   44
  ],
  "kind": "outil"
 },
 "aic-19": {
  "deck": "aic",
  "order": 19,
  "num": 19,
  "name": "Bonne posture",
  "fam": 1,
  "section": "AIC · Déployer",
  "file": "cards/aic/aic-19.js",
  "pages": [
   45,
   46
  ],
  "kind": "outil"
 },
 "aic-20": {
  "deck": "aic",
  "order": 20,
  "num": 20,
  "name": "Obeya stratégie",
  "fam": 3,
  "section": "AIC · Ancrer et étendre",
  "file": "cards/aic/aic-20.js",
  "pages": [
   47,
   48
  ],
  "kind": "outil"
 },
 "aic-21": {
  "deck": "aic",
  "order": 21,
  "num": 21,
  "name": "Fonctions office",
  "fam": 3,
  "section": "AIC · Ancrer et étendre",
  "file": "cards/aic/aic-21.js",
  "pages": [
   49
  ],
  "kind": "outil"
 },
 "aic-21b": {
  "deck": "aic",
  "order": 21.5,
  "num": 21,
  "name": "Obeya RH",
  "fam": 3,
  "section": "AIC · Ancrer et étendre",
  "file": "cards/aic/aic-21b.js",
  "pages": [
   50
  ],
  "kind": "libre"
 },
 "aic-22": {
  "deck": "aic",
  "order": 22,
  "num": 22,
  "name": "Digitaliser",
  "fam": 3,
  "section": "AIC · Ancrer et étendre",
  "file": "cards/aic/aic-22.js",
  "pages": [
   51,
   52
  ],
  "kind": "outil"
 },
 "aic-23": {
  "deck": "aic",
  "order": 23,
  "num": 23,
  "name": "10 indicateurs",
  "fam": 5,
  "section": "AIC · Glossaire",
  "file": "cards/aic/aic-23.js",
  "pages": [
   53,
   54
  ],
  "kind": "libre"
 },
 "aic-24": {
  "deck": "aic",
  "order": 24,
  "num": 24,
  "name": "Justifier les AIC",
  "fam": 5,
  "section": "AIC · Glossaire",
  "file": "cards/aic/aic-24.js",
  "pages": [
   55,
   56
  ],
  "kind": "libre"
 }
};
