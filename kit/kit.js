/* =========================================================
   Kit Fichly : fiches A5 recto-verso (Poppins, Caveat, dessins rough.js)
   Données communes : familles, ceintures, decks
   ========================================================= */
const FAM = {
  1: { name: 'Résolution de problèmes',               c: '#e6b839', p: '#fbf0d2', i: '#3f2f04', h: '#f2d78a' },
  2: { name: 'Engagement et visualisation',           c: '#75bec0', p: '#e1f2f2', i: '#0f3b3c', h: '#bfe3e3' },
  3: { name: 'Planification et gestion stratégique',  c: '#8cc978', p: '#e6f3de', i: '#1c3810', h: '#c3e3b5' },
  4: { name: 'Optimisation des processus',            c: '#f16969', p: '#fde4e4', i: '#4a1010', h: '#f8bcbc' },
  5: { name: 'Efficacité de production',              c: '#aa76b2', p: '#f3e8f5', i: '#1d1033', h: '#dcc3e1', on: '#1d1033' },
  6: { name: 'Amélioration de la qualité',            c: '#74a3d6', p: '#e4eef8', i: '#0f2a4a', h: '#bcd3ec' },
  0: { name: 'Introduction',                          c: '#3d449b', p: '#ececf8', i: '#ffffff', h: '#c9cbef', on: '#ffffff' }
};
const BELTS = { White: '#fbfbf6', Yellow: '#e6b839', Green: '#88c475', Black: '#23232b' };
// Poses du personnage illustré (judoka Fichly) : banque PERSOS_BANQUE, fichier assets/persos/banque.js (généré par tools/banque.js).
const PERSOS = typeof PERSOS_BANQUE !== 'undefined' ? PERSOS_BANQUE : {};
const DECKNAME = { lean: 'Les outils du lean', aic: 'Mini-deck AIC et Obeya' };
const QR_URL = 'https://www.fichly.com/pages/templates';
const QR_TXT = 'fichly.com/pages/templates';

/* =========================================================
   Outils de mise en forme
   ========================================================= */
const PARAMS = new URLSearchParams(location.search.length > 1 ? location.search : location.hash.slice(1));   // paramètres en ?… ou en #… (page publiée)
const FORMAT = (PARAMS.get('format') || 'a5').toLowerCase();
const V = +(PARAMS.get('v') || 3);            // 3 = visuel pièce maîtresse (par défaut), 2 = recto épuré, 1 = première version
const ONLY = PARAMS.get('only');               // numéro d'une seule fiche
const BLEED = PARAMS.get('bleed') === '1';     // fond perdu de 3 mm pour l'imprimeur
const INK = '#071246', BLUE = '#3d449b';
const md = s => s
  .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
  .replace(/==(.+?)==/g, '<mark>$1</mark>')
  .replace(/\[\[([\w-]+)\]\]/g, (_, n) => refChip(n));
function refChip(n) {
  const t = (typeof REG !== 'undefined' && REG[n]) || (typeof TOOLS !== 'undefined' && TOOLS[n]);
  if (!t) { console.error(`renvoi inconnu : [[${n}]]`); return String(n); }
  const f = FAM[t.fam];
  return `<span class="ref" style="--rh:${f.h || f.c}"><b>${t.name}</b><span class="dot" style="--c:${f.c};--dotInk:${f.on || INK}">${t.num ?? n}</span></span>`;
}
const CHECK = `<svg viewBox="0 0 10 10"><path d="M2 5.4 4.2 7.6 8.2 2.6" fill="none" stroke="${INK}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CROSS = c => `<svg viewBox="0 0 10 10"><path d="M2.6 2.6 7.4 7.4M7.4 2.6 2.6 7.4" fill="none" stroke="${c}" stroke-width="1.7" stroke-linecap="round"/></svg>`;
// Ceinture posée sur un bandeau de la même couleur (jaune sur jaune, verte sur verte) : teinte plus soutenue.
const BELT_DEEP = { Yellow: '#c2901a', Green: '#5a9a46' };
const hexDist = (a, b) => { const n = h => [1, 3, 5].map(k => parseInt(h.slice(k, k + 2), 16)); const [x, y] = [n(a), n(b)]; return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]); };
const beltColor = F => { const b = BELTS[F.belt], band = (FAM[F.fam] || FAM[0]).c; return BELT_DEEP[F.belt] && hexDist(b, band) < 40 ? BELT_DEEP[F.belt] : b; };
function beltSvg(color) {
  return `<svg viewBox="0 0 64 36"><g stroke="${INK}" stroke-width="2.4" stroke-linejoin="round" fill="${color}">
    <path d="M3 10.5 Q32 6.5 61 10.5 L61 19 Q32 15 3 19 Z"/>
    <path d="M27 21 L20 33.5 L25.5 34.5 L31 24 Z"/><path d="M37 21 L44 33.5 L38.5 34.5 L33 24 Z"/>
    <rect x="25.5" y="5.5" width="13" height="18" rx="3"/></g></svg>`;
}
const ICONS = {
  'Durée': `<svg viewBox="0 0 24 24" fill="none" stroke="${INK}" stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="13" r="8.2"/><path d="M12 8.6V13l3 2M9.5 2.8h5"/></svg>`,
  'Avec qui': `<svg viewBox="0 0 24 24" fill="none" stroke="${INK}" stroke-width="1.9" stroke-linecap="round"><circle cx="8.5" cy="8" r="3.3"/><circle cx="16.6" cy="9.4" r="2.6"/><path d="M2.8 20c.6-3.8 2.8-5.8 5.7-5.8s5.1 2 5.7 5.8M14.6 14.6c.6-.3 1.3-.4 2-.4 2.4 0 4.1 1.7 4.6 4.8"/></svg>`,
  'Il faut': `<svg viewBox="0 0 24 24" fill="none" stroke="${INK}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="4" width="15" height="17.5" rx="2"/><path d="M9 4V2.6h6V4M8.2 10.5h7.6M8.2 14h7.6M8.2 17.5h4.6"/></svg>`,
  'Support': `<svg viewBox="0 0 24 24" fill="none" stroke="${INK}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20.5h16M6.5 16.6 16.8 6.3l2.4 2.4L8.9 19H6.5z"/><path d="m14.6 8.5 2.4 2.4"/></svg>`
};
function qrSvg() {
  const q = qrcode(0, 'M'); q.addData(QR_URL); q.make();
  const n = q.getModuleCount(); let d = '';
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) d += `M${c} ${r}h1v1h-1z`;
  return `<svg viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges" role="img" aria-label="QR code vers ${QR_TXT}"><path d="${d}" fill="${INK}"/></svg>`;
}
// Version A6 : les champs de « a6 » remplacent ceux de l'A5 (étape par étape pour « steps »).
function forFormat(F) {
  let G = F;
  if (FORMAT === 'a6' && F.a6) {
    G = { ...F, ...F.a6 };
    G.steps = F.steps.map((s, i) => ({ ...s, ...(F.a6.steps || [])[i] }));
  }
  for (const [v, key] of [[2, 'recto2'], [3, 'recto3']]) {
    if (V >= v && F[key]) {
      const { a6, ...r } = F[key];
      G = { ...G, ...r, ...(FORMAT === 'a6' ? a6 : {}) };
    }
  }
  return G;
}

/* =========================================================
   Construction des pages
   ========================================================= */
function pageVars(F) {
  const f = FAM[F.fam];
  return `--fam:${f.c};--famP:${f.p};--famI:${f.i};--famH:${f.h};--dotInk:${f.on || INK};--bandInk:${f.on || INK}`;
}
function header(F, side) {
  const f = FAM[F.fam];
  const brand = `<div class="logo"><img src="assets/logo-fichly.png" alt="fichly"><span>Les outils du lean</span></div>
    <div class="eyebrow"><b>N°${F.n}</b> <span>${f.name}</span></div>`;
  const belt = `<span class="belt">${beltSvg(beltColor(F))}<small>NIVEAU</small><span>${F.belt} Belt</span></span>`;
  if (side === 'r') return `<header class="band band-r">${brand}
    <h1 class="titlebox">${F.title}</h1>
    <div class="subrow"><p class="sub">${F.sub}</p>${belt}</div>
    <div class="qr"><div class="card">${qrSvg()}</div><div class="cap">Templates du deck</div><div class="url">${QR_TXT}</div></div>
  </header>`;
  return `<header class="band band-v">${brand}
    <h1 class="titlebox">${F.title}</h1>
    <p class="vsub">${F.vsub}</p>
    <div class="subrow">${belt}</div>
  </header>`;
}
function footer(F, side, right) {
  const f = FAM[F.fam];
  const r = right ?? (side === 'r' ? '1/2 · Comprendre' : '2/2 · Appliquer');
  return `<footer class="foot"><span class="l">${F.section || f.name}</span><span class="dot">${F.n}</span><span class="r">${r}</span></footer>
  <div class="copy">© Fichly · ${F.deckName || DECKNAME[F.deck] || 'Les outils du lean'} · Tous droits réservés</div>
  <div class="strip" aria-hidden="true">${[4, 2, 5, 3, 1, 6].map(k => `<i class="${k === F.fam ? 'on' : ''}" style="background:${FAM[k].c}"></i>`).join('')}</div>`;
}
function recto(F) {
  const li = (txt, cls = 'yes') => `<li class="${cls}"><span class="ic ${cls}">${cls === 'yes' ? CHECK : CROSS('#fff')}</span><span>${txt}</span></li>`;
  return `<section class="page recto" style="${pageVars(F)}">
  ${header(F, 'r')}
  <div class="content">
    <blockquote class="need"><span class="q"></span><p>${md(F.need)}</p></blockquote>
    <div class="hero">
      <figure><div class="ill" data-draw="${F.hero}"></div><figcaption>${F.caption}</figcaption></figure>
      <div class="principle"><h3>${F.principleTitle}</h3><ol>${F.principle.map((p, i) =>
        `<li><span class="dot">${i + 1}</span><span><b>${p[0]}</b> ${md(p[1])}</span></li>`).join('')}</ol></div>
    </div>
    <div class="practice">${F.practice.map(([k, v]) => `<div>${ICONS[k]}<p><small>${k}</small><span>${v}</span></p></div>`).join('')}</div>
    <div class="cols">
      <section><h2>Définition</h2><p>${md(F.definition)}</p></section>
      <section><h2>Quand l’utiliser ?</h2><ul class="checks">${F.when.map(w => li(md(w))).join('')}${li('<b>À éviter si</b> ' + md(F.avoid), 'no')}</ul></section>
    </div>
    ${F.example ? `<section class="exrow"><h2>Exemple</h2><p>${md(F.example)}</p></section>` : ''}
    <div class="path"><div><h2>Le parcours</h2><span class="where">vous êtes à l’étape ${PARCOURS.findIndex(p => p[0] === F.n) + 1} sur 4</span></div><ol>${PARCOURS.map(([n, v]) => {
      const t = TOOLS[n], here = n === F.n;
      return `<li class="${here ? 'here' : ''}"><span class="dot" style="--c:${FAM[t.fam].c}">${n}</span><span><b>${t.name}</b><em>${v}</em></span></li>`;
    }).join('')}</ol></div>
  </div>
  ${footer(F, 'r')}
</section>`;
}
const TICK = `<svg viewBox="0 0 10 10"><path d="M1.6 5.4 4 7.8 8.6 2.4" fill="none" stroke="#2c5520" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const XMARK = `<svg viewBox="0 0 10 10"><path d="M2.4 2.4 7.6 7.6M7.6 2.4 2.4 7.6" fill="none" stroke="#9e2f2f" stroke-width="1.6" stroke-linecap="round"/></svg>`;
function headerLean(F, side) {
  const belt = F.belt ? `<span class="belt" title="${F.belt} Belt">${beltSvg(beltColor(F))}<small>NIVEAU</small><span>${F.belt} Belt</span></span>` : '';
  const qr = `<div class="qrl"><div class="cap">Templates<br>du deck</div><div class="card">${qrSvg()}</div><div class="url">${QR_TXT}</div></div>`;
  return `<header class="band-l"><div class="logo"><img src="assets/${F.fam === 0 ? 'logo-fichly-blanc' : 'logo-fichly'}.png" alt="fichly"></div>
    <div class="eyebrow"><b>N°${F.n}</b><span>${F.section || FAM[F.fam].name}</span></div>
    <h1 class="titlebox">${side === 'v' && F.titleV ? F.titleV : F.title}</h1><div class="side">${side === 'r' ? belt : side === 'v' ? qr : ''}</div></header>`;
}
function recto3(F) {
  return `<section class="page recto v2 v3 lean" style="${pageVars(F)}">
  ${headerLean(F, 'r')}
  <div class="content">
    <blockquote class="need"><span class="q"></span><p>${md(F.need)}</p></blockquote>
    <figure class="visual"><div class="ill" data-draw="${F.hero}"></div></figure>
    <section class="expl"><h2>${F.explTitle}</h2>${F.expl.map(x => `<p>${md(x)}</p>`).join('')}</section>
    ${(F.links || []).length ? `<div class="links"><b>Fiches liées</b><ul>${F.links.map(([lab, n, why]) =>
      `<li><small>${lab}</small>${refChip(n)}<span>${why}</span></li>`).join('')}</ul></div>` : ''}
  </div>
  ${footer(F, 'r')}
</section>`;
}
function recto2(F) {
  const li = (txt, ok) => `<li class="${ok ? 'y' : 'n'}">${ok ? TICK : XMARK}<span>${txt}</span></li>`;
  // sans exemple (A6), « En pratique » passe à gauche pour équilibrer les colonnes
  const pratique = `<section><h2>En pratique</h2><dl class="meta">${F.practice.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl></section>`;
  return `<section class="page recto v2" style="${pageVars(F)}">
  ${header(F, 'r')}
  <div class="content">
    <blockquote class="need"><span class="q"></span><p>${md(F.need)}</p></blockquote>
    <figure class="chart"><div class="ill" data-draw="${F.hero}"></div></figure>
    <div class="cols2">
      <div>
        <section><h2>Définition</h2><p>${md(F.definition)}</p></section>
        ${F.example ? `<section><h2>Exemple</h2><p>${md(F.example)}</p></section>` : pratique}
      </div>
      <div>
        <section><h2>Quand l’utiliser ?</h2><ul class="when2">${F.when.map(w => li(md(w), true)).join('')}${li('<b>À éviter si</b> ' + md(F.avoid), false)}</ul></section>
        ${F.example ? pratique : ''}
      </div>
    </div>
    <p class="trail"><b>Le parcours</b>${PARCOURS.map(([n]) => n === F.n ? `<span class="cur">${refChip(n)}</span>` : refChip(n)).join('<i>›</i>')}</p>
  </div>
  ${footer(F, 'r')}
</section>`;
}
function verso(F) {
  const tag = F.tag === '' ? '' : `<span class="tagx">${F.tag || 'Exemple'}</span>`;
  const step = (s, i) => {
    let ex = '';
    if (s.ex) ex = `<div class="ex">${tag}${md(s.ex)}</div>`;
    if (s.table) ex = `<div class="ex"><div class="tbl">${(s.thead || ['Cause', 'Arrêts', 'Cumul']).map((h, j) => `<span class="h${j ? ' n' : ''}">${j ? '' : tag}${h}</span>`).join('')}${s.table.map(r => `<span>${r[0]}</span><span class="n">${r[1]}</span><span class="n"><b>${r[2]}</b></span>`).join('')}</div></div>`;
    if (s.vs) ex = `<div class="ex">${FORMAT === 'a6' ? '' : tag}<div class="vs"><span class="ic no">${CROSS('#fff')}</span><span>${s.vs[0]}</span><span class="ic ok">${CHECK}</span><span><b>${s.vs[1]}</b></span></div></div>`;
    if (s.chain) ex = `<div class="ex">${tag}${s.chainTitle ? `<b>${s.chainTitle}</b>` : ''}<div class="chain">${s.chain.map((c, k) =>
      `<span class="dot">${k + 1}</span><span class="${k === s.chain.length - 1 ? 'root' : ''}">${k === s.chain.length - 1 ? '<b>Cause racine :</b> ' : ''}${md(c)}</span>`).join('')}</div></div>`;
    return `<div class="step${s.ill ? '' : ' noill'}"><div class="lft"><span class="dot">${i + 1}</span>${s.ill ? `<div class="ill" data-draw="${s.ill}"></div>` : ''}</div>
      <div class="rgt"><h3 class="nm">${s.t}<small>${s.s}</small></h3><p>${md(s.p)}</p>${ex}</div></div>`;
  };
  return `<section class="page verso${V >= 3 ? ' v2 lean' : ''}" style="${pageVars(F)}">
  ${V >= 3 ? headerLean(F, 'v') : header(F, 'v')}
  <div class="content">
    <div class="vhead"><h2>${F.stepsTitle || 'Comment le mettre en place ?'}</h2>${F.thread ? `<span class="tag">${F.thread}</span>` : ''}</div>
    <div class="steps">${F.steps.map(step).join('<hr>')}</div>
    ${F.versoExtra || ''}
    <div class="retenir"><div class="rt"><small>À retenir</small><p>${md(F.retenir)}</p></div>${(F.keys || []).length ? `<ul>${F.keys.map(k => `<li>${md(k)}</li>`).join('')}</ul>` : ''}</div>
  </div>
  ${footer(F, 'v')}
</section>`;
}

/* =========================================================
   Illustrations (trait main levée avec rough.js, 1 unité = 0,1 mm)
   T agrandit les textes des illustrations (A6).
   ========================================================= */
let UID = 0;
function NS(tag, attrs, parent) {
  const e = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}
function board(host, W, H, fam, T = 1) {
  const svg = NS('svg', { viewBox: `0 0 ${W} ${H}`, width: W / 10 + 'mm', height: H / 10 + 'mm', role: 'img' }, host);
  const id = 'p' + (++UID);
  const defs = NS('defs', {}, svg);
  const pat = NS('pattern', { id: id + 'dots', width: 10, height: 10, patternUnits: 'userSpaceOnUse' }, defs);
  NS('rect', { width: 10, height: 10, fill: '#ffffff' }, pat);
  NS('circle', { cx: 2.5, cy: 2.5, r: 1.15, fill: INK, opacity: .55 }, pat);
  NS('circle', { cx: 7.5, cy: 7.5, r: 1.15, fill: INK, opacity: .55 }, pat);
  const pat2 = NS('pattern', { id: id + 'soil', width: 16, height: 16, patternUnits: 'userSpaceOnUse' }, defs);
  NS('circle', { cx: 3, cy: 4, r: 1.2, fill: '#8a6d2f', opacity: .4 }, pat2);
  NS('circle', { cx: 11, cy: 12, r: 1.2, fill: '#8a6d2f', opacity: .4 }, pat2);
  const rc = rough.svg(svg);
  let seed = 11 + UID * 7;
  const B = { roughness: .7, bowing: .8, stroke: INK, strokeWidth: 3.4, disableMultiStroke: true, preserveVertices: true };
  const add = n => (svg.appendChild(n), n);
  const o = x => ({ ...B, seed: seed++, ...x });
  const famE = Object.values(FAM).find(f => f.c === fam) || {};
  const k = {
    svg, dots: `url(#${id}dots)`, soil: `url(#${id}soil)`, fam, T, pale: famE.p || '#eef0f8', dark: famE.i || INK, hl: famE.h || '#dfe2f4',
    rect: (x, y, w, h, x2) => add(rc.rectangle(x, y, w, h, o(x2))),
    line: (x1, y1, x2, y2, x3) => add(rc.line(x1, y1, x2, y2, o(x3))),
    circle: (x, y, d, x2) => add(rc.circle(x, y, d, o(x2))),
    path: (d, x2) => add(rc.path(d, o(x2))),
    poly: (p, x2) => add(rc.polygon(p, o(x2))),
    curve: (p, x2) => add(rc.curve(p, o(x2))),
    lin: (p, x2) => add(rc.linearPath(p, o(x2))),
    dash: (x1, y1, x2, y2, c = '#e05252', w = 3.2) => NS('line', { x1, y1, x2, y2, stroke: c, 'stroke-width': w, 'stroke-dasharray': '10 8', 'stroke-linecap': 'round' }, svg),
    text: (x, y, t, s = {}) => {
      const e = NS('text', { x, y, 'font-family': s.f || 'Caveat', 'font-size': (s.s || 40) * (s.fixed ? 1 : T), 'font-weight': s.w || 700, fill: s.c || BLUE, 'text-anchor': s.a || 'start' }, svg);
      e.textContent = t; return e;
    },
    // flèche tracée à main levée : courbe + pointe
    arrow: (pts, s = {}) => {
      const c = s.c || BLUE, w = s.w || 3.2;
      add(rc.curve(pts, o({ stroke: c, strokeWidth: w, roughness: .5 })));
      const [a, b] = [pts[pts.length - 2], pts[pts.length - 1]];
      const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), L = s.head || 16;
      for (const d of [2.6, -2.6]) add(rc.line(b[0], b[1], b[0] - L * Math.cos(ang + d / 6), b[1] - L * Math.sin(ang + d / 6), o({ stroke: c, strokeWidth: w, roughness: .3 })));
    },
    // Personnage illustré (judoka Fichly) : place l'illustration assets/persos/<pose>.png, haute de h unités,
    // pieds en (x, y). Tant que l'illustration n'existe pas, un emplacement pointillé la réserve.
    perso: (x, y, h, pose, o = {}) => {
      const P = PERSOS[pose]; if (!P) console.error(`pose de personnage inconnue « ${pose} » (voir assets/persos/banque.js)`);
      const w = h * (P ? P.ratio : .7), x0 = o.flip ? x + w / 2 : x - w / 2;
      if (P && P.ready) {
        const im = NS('image', { href: `assets/persos/${pose}.png`, x: x - w / 2, y: y - h, width: w, height: h, preserveAspectRatio: 'xMidYMax meet' }, svg);
        if (o.flip) im.setAttribute('transform', `translate(${2 * x} 0) scale(-1 1)`);
        return im;
      }
      NS('rect', { x: x - w / 2, y: y - h, width: w, height: h, rx: 18, fill: 'none', stroke: fam, 'stroke-width': 3, 'stroke-dasharray': '10 8' }, svg);
      return k.text(x, y - h / 2 + 12, 'judoka : ' + pose, { s: 30, c: BLUE, a: 'middle', fixed: true });
    },
    num: (x, y, n, s = {}) => {
      const d = s.d || 34, fs = d * .58;
      k.circle(x, y, d, { fill: s.fill || fam, fillStyle: 'solid', strokeWidth: 2.6, roughness: .25 });
      k.text(x, y + fs * .35, String(n), { f: 'Poppins', s: fs, w: 700, c: s.c || INK, a: 'middle', fixed: true });
    }
  };
  return k;
}
function bars(k, x0, base, slot, w, hs, opt = {}) {
  hs.forEach((h, i) => {
    const x = x0 + i * slot + (slot - w) / 2;
    const vital = i < (opt.vital ?? 0);
    k.rect(x, base - h, w, h, { fill: vital ? (opt.vc || BLUE) : k.dots, fillStyle: 'solid', strokeWidth: opt.sw || 3.2 });
  });
}

const DRAW = {
  /* ---------- PARETO : grand diagramme ---------- */
  heroPareto(host, fam, T) {
    const W = 760, H = 470, k = board(host, W, H, fam, T);
    const X0 = 62, X1 = 660, Y0 = 386, YT = 46, HA = Y0 - YT;
    const v = [86, 50, 24, 14, 10, 7, 5, 4], tot = 200, slot = (X1 - X0) / v.length;
    bars(k, X0, Y0, slot, 52, v.map(x => x / tot * HA), { vital: 3 });
    k.line(X0, YT - 10, X0, Y0); k.line(X0, Y0, X1 + 8, Y0); k.line(X1, YT - 10, X1, Y0);
    let c = 0; const pts = [[X0, Y0]];
    v.forEach((x, i) => { c += x; pts.push([X0 + (i + 1) * slot, Y0 - c / tot * HA]); });
    const y80 = Y0 - .8 * HA, xCut = X0 + 3 * slot;
    k.dash(X0, y80, X1, y80); k.dash(xCut, y80, xCut, Y0);
    k.lin(pts, { strokeWidth: 3.6, roughness: .2, bowing: 0 });
    pts.slice(1).forEach(p => k.circle(p[0], p[1], 13, { fill: INK, fillStyle: 'solid', strokeWidth: 1.5, roughness: .2 }));
    k.text(X1 + 10, y80 + 9, '80 %', { f: 'Poppins', s: 27, w: 700, c: '#9e2f2f' });
    k.text(X1 + 10, YT + 8, '100 %', { f: 'Poppins', s: 24, w: 600, c: INK });
    k.text(X0 - 8, YT - 18, 'Nombre', { f: 'Poppins', s: 27, w: 600, c: INK });
    k.text(X1 + 6, YT - 18, '% cumulé', { f: 'Poppins', s: 27, w: 600, c: INK, a: 'end' });
    k.text(X0, Y0 + 44, 'Causes, de la plus fréquente à la plus rare', { f: 'Poppins', s: 27, w: 600, c: INK });
    k.text(xCut + 24, 214, '3 causes sur 8', { s: 44, c: BLUE });
    k.text(xCut + 24, 254, '= 80 % des arrêts', { s: 44, c: BLUE });
    k.arrow([[xCut + 16, 236], [xCut - 20, 254], [xCut - 64, 282]], { c: BLUE });
    k.text(xCut + 84, 330, 'les 5 autres : 20 %', { s: 36, c: '#4b5280' });
    k.arrow([[xCut + 78, 322], [xCut + 56, 340], [xCut + 44, 364]], { c: '#4b5280', w: 2.6, head: 12 });
  },
  /* ---------- AIC : la pyramide des rituels ---------- */
  heroPyramid3(host, fam, T, H = 900) {
    const W = 1320, k = board(host, W, H, fam, T);
    const NAVY = '#3d449b', MUTED = '#4b5280', RED = '#9e2f2f', GRN = '#2c5520', CX = 660;
    const base = H - 190, top = 96, bh = (base - top) / 4;
    const wAt = y => 300 + (y - top) / (base - top) * 840;
    const levels = [
      ['Équipes', 'TOP 5', '5 min · 8 h 00 · chaque jour'],
      ['Secteurs', 'TOP 15', '15 min · 9 h 00 · chaque jour'],
      ['Direction', 'TOP 60', '60 min · mardi 14 h'],
      ['Codir', 'Obeya', '1 h · chaque mois']
    ];
    levels.forEach(([name, rit, when], i) => {
      const yb = base - i * bh, yt = yb - bh + 10, wb = wAt(yb), wt = wAt(yt), yc = (yt + yb) / 2;
      k.poly([[CX - wb / 2, yb], [CX + wb / 2, yb], [CX + wt / 2, yt], [CX - wt / 2, yt]], { fill: i === 0 ? fam : k.pale, fillStyle: 'solid', strokeWidth: 3, roughness: .4 });
      k.text(CX, yc - 4, `${name} · ${rit}`, { f: 'Poppins', s: 34, w: 700, c: INK, a: 'middle' });
      k.text(CX, yc + 32 * T, when, { f: 'Poppins', s: 27, w: 600, c: INK, a: 'middle' });
    });
    // les problèmes montent (à gauche), les décisions redescendent (à droite)
    const xl = y => CX - wAt(y) / 2 - 34, xr = y => CX + wAt(y) / 2 + 34;
    k.arrow([[xl(base - 20), base - 20], [xl((base + top) / 2) - 6, (base + top) / 2], [xl(top + 60), top + 60]], { c: RED, w: 4, head: 18 });
    k.arrow([[xr(top + 60), top + 60], [xr((base + top) / 2) + 6, (base + top) / 2], [xr(base - 20), base - 20]], { c: GRN, w: 4, head: 18 });
    k.text(40, top + 34, 'les problèmes', { f: 'Poppins', s: 32, w: 700, c: RED });
    k.text(40, top + 34 + 36 * T, 'montent', { f: 'Poppins', s: 32, w: 700, c: RED });
    k.text(W - 40, top + 34, 'les décisions', { f: 'Poppins', s: 32, w: 700, c: GRN, a: 'end' });
    k.text(W - 40, top + 34 + 36 * T, 'redescendent', { f: 'Poppins', s: 32, w: 700, c: GRN, a: 'end' });
    k.text(W - 40, top + 34 + 72 * T, 'sous 24 h', { s: 44, c: GRN, a: 'end', fixed: true });
    // la règle MAC
    k.text(CX, base + 66, 'Règle MAC : Moyens, Autorité, Compétences', { f: 'Poppins', s: 34, w: 700, c: NAVY, a: 'middle' });
    k.text(CX, base + 66 + 40 * T, 'S’il en manque un, le problème monte d’un étage.', { f: 'Poppins', s: 29, w: 500, c: INK, a: 'middle' });
  },
  /* ---------- AIC : le TOP 5 en 5 minutes ---------- */
  heroTop5(host, fam, T, H = 900) {
    const W = 1320, k = board(host, W, H, fam, T);
    const NAVY = '#3d449b', MUTED = '#4b5280', PAST = k.pale;
    const CX = 330, CY = H / 2 + 26, R = Math.min(286, H / 2 - 150);
    k.text(40, 52, '8 h 00 · debout au tableau · animatrice : Nadia', { f: 'Poppins', s: 30, w: 600, c: MUTED });
    const ph = [[1, '1 min', 72, fam], [2, '2 min', 144, PAST], [3, '1 min', 72, fam], [4, '1 min', 72, PAST]];
    let a0 = -90;
    const pt = (a, r) => [CX + r * Math.cos(a * Math.PI / 180), CY + r * Math.sin(a * Math.PI / 180)];
    ph.forEach(([n, lab, sweep, fill]) => {
      const a1 = a0 + sweep, [x1, y1] = pt(a0, R), [x2, y2] = pt(a1, R);
      k.path(`M ${CX} ${CY} L ${x1} ${y1} A ${R} ${R} 0 ${sweep > 180 ? 1 : 0} 1 ${x2} ${y2} Z`, { fill, fillStyle: 'solid', strokeWidth: 3.2, roughness: .3 });
      const [lx, ly] = pt(a0 + sweep / 2, R * .6);
      k.num(lx, ly - 18, n, { d: 54, fill: '#ffffff' });
      k.text(lx, ly + 40, lab, { f: 'Poppins', s: 28, w: 700, c: INK, a: 'middle', fixed: true });
      a0 = a1;
    });
    k.circle(CX, CY, 20, { fill: INK, fillStyle: 'solid', strokeWidth: 1, roughness: .2 });
    k.text(CX, CY - R - 22, '8 h 00', { f: 'Poppins', s: 28, w: 700, c: NAVY, a: 'middle' });
    k.text(CX, CY + R + 66, '8 h 06 : tout le monde au poste', { s: 44, c: BLUE, a: 'middle', fixed: true });
    const rows = [
      ['Client et sécurité', ['verbatim client du jour, puis :', '« Sécurité hier ? »']],
      ['Voir et comprendre', ['chacun annonce son chiffre :', 'un fait, une cause par rouge']],
      ['Anticiper', ['« Qu’est-ce qui peut nous', 'bloquer aujourd’hui ? »']],
      ['Agir et escalader', ['« Qui fait quoi, pour quand ? »', 'ce qui dépasse le MAC monte']]
    ];
    const y0 = 150, step = (H - 150 - y0) / 3;
    rows.forEach(([t, lines], i) => {
      const y = y0 + i * step;
      k.num(732, y - 10, i + 1, { d: 46, fill: i % 2 ? PAST : fam });
      k.text(774, y, t, { f: 'Poppins', s: 32, w: 700, c: NAVY });
      lines.forEach((l, j) => k.text(774, y + (38 + j * 32) * T, l, { f: 'Poppins', s: 27, w: 500, c: INK }));
    });
  },
  /* ---------- AIC : une ligne de plan d'action, cinq éléments ---------- */
  heroPlan3(host, fam, T, H = 900) {
    const W = 1320, k = board(host, W, H, fam, T);
    const NAVY = '#3d449b', MUTED = '#4b5280', PAST = k.pale;
    const cols = [['Action', 300, 0], ['Escalade', 270, 1], ['Qui', 190, 0], ['Quand', 240, 0], ['État', 220, 1]];
    const fit = (t, max) => { const L = t.getComputedTextLength(); if (L > max) t.setAttribute('font-size', +t.getAttribute('font-size') * max / L); return t; };
    const free = Math.max(0, H - 690), X0 = 50, Y0 = 100, HH = 72, RH = 124 + free * .45;   // la hauteur libre va surtout à la ligne d'exemple
    k.text(X0, 60, 'TOP 5 assemblage · mercredi 8 h', { f: 'Poppins', s: 30, w: 600, c: MUTED });
    let x = X0; const xs = [];
    cols.forEach(([name, w, live]) => {
      xs.push([x, w]);
      k.rect(x, Y0, w, HH, { fill: live ? fam : BLUE, fillStyle: 'solid', strokeWidth: 2.8, roughness: .4 });
      k.text(x + w / 2, Y0 + HH / 2 + 11, name, { f: 'Poppins', s: 32, w: 700, c: live ? INK : '#fff', a: 'middle' });
      k.rect(x, Y0 + HH, w, RH, { fill: '#ffffff', fillStyle: 'solid', strokeWidth: 2.8, roughness: .4 });
      x += w;
    });
    const ry = Y0 + HH + RH / 2;
    fit(k.text(xs[0][0] + 22, ry - 8, 'Recalibrer la', { f: 'Poppins', s: 32, w: 600, c: INK }), xs[0][1] - 44);
    fit(k.text(xs[0][0] + 22, ry + 30, 'soudeuse HF n°2', { f: 'Poppins', s: 32, w: 600, c: INK }), xs[0][1] - 44);
    k.arrow([[xs[1][0] + 40, ry + 26], [xs[1][0] + 42, ry], [xs[1][0] + 40, ry - 28]], { c: INK, w: 3, head: 12 });
    k.text(xs[1][0] + 70, ry + 11, 'TOP 15', { f: 'Poppins', s: 30, w: 700, c: INK });
    k.text(xs[2][0] + xs[2][1] / 2, ry + 11, 'Nadia', { f: 'Poppins', s: 30, w: 600, c: INK, a: 'middle' });
    k.text(xs[3][0] + xs[3][1] / 2, ry + 11, 'Mer. 9 h', { f: 'Poppins', s: 30, w: 600, c: INK, a: 'middle' });
    k.rect(xs[4][0] + 26, ry - 26, xs[4][1] - 52, 52, { fill: PAST, fillStyle: 'solid', strokeWidth: 2.4, stroke: k.dark, roughness: .3 });
    k.text(xs[4][0] + xs[4][1] / 2, ry + 10, 'Escaladé', { f: 'Poppins', s: 28, w: 700, c: k.dark, a: 'middle' });
    const notes = [
      ['un verbe d’action,', 'un objet,', 'un critère de fin'],
      ['le sujet dépasse', 'le MAC ? il monte', 'd’un niveau'],
      ['le pilote,', 'présent', 'au rituel'],
      ['une date', 'précise, jamais', '« dès que', 'possible »'],
      ['mis à jour', 'à chaque', 'rituel']
    ];
    const NY = Y0 + HH + RH + 64 + free * .2;
    notes.forEach((lines, i) => {
      const [cx, w] = xs[i];
      k.num(cx + 30, NY, i + 1, { d: 44, fill: cols[i][2] ? fam : '#ffffff' });
      lines.forEach((l, j) => fit(k.text(cx + 8, NY + (62 + j * 34) * T, l, { f: 'Poppins', s: 27, w: 500, c: INK }), w - 22));
    });
    // ce que les couleurs veulent dire, écrit en toutes lettres
    const LY = H - 92;
    k.rect(X0, LY - 26, 44, 34, { fill: BLUE, fillStyle: 'solid', strokeWidth: 2.2, roughness: .3 });
    const l1 = k.text(X0 + 62, LY, 'Action + Qui + Quand = un engagement', { f: 'Poppins', s: 29, w: 600, c: INK });
    k.rect(X0, LY + 24, 44, 34, { fill: fam, fillStyle: 'solid', strokeWidth: 2.2, roughness: .3 });
    k.text(X0 + 62, LY + 50, 'Escalade + État = la ligne vit de rituel en rituel', { f: 'Poppins', s: 29, w: 600, c: INK });
    k.text(X0 + 62 + l1.getComputedTextLength() + 26, LY + 2, 'sinon : une intention', { s: 40, c: BLUE, fixed: true });
  },

  /* ---------- vignettes AIC ---------- */
  vOrg(host, fam) {
    const k = board(host, 310, 170, fam);
    k.rect(120, 10, 70, 34, { fill: BLUE, fillStyle: 'solid', strokeWidth: 2.2, roughness: .3 });
    k.line(155, 44, 155, 64, { strokeWidth: 2.2, roughness: .2 }); k.line(70, 64, 240, 64, { strokeWidth: 2.2, roughness: .2 });
    [70, 240].forEach(x => { k.line(x, 64, x, 80, { strokeWidth: 2.2, roughness: .2 }); k.rect(x - 34, 80, 68, 32, { fill: k.pale, fillStyle: 'solid', strokeWidth: 2.2, roughness: .3 }); });
    [30, 110, 200, 280].forEach((x, i) => { const px = i < 2 ? 70 : 240; k.line(px, 112, x, 130, { strokeWidth: 2, roughness: .2 }); k.rect(x - 24, 130, 48, 28, { fill: fam, fillStyle: 'solid', strokeWidth: 2, roughness: .3 }); });
  },
  vFreq(host, fam) {
    const k = board(host, 310, 170, fam);
    [[5, 34], [15, 72], [60, 196]].forEach(([m, w], i) => {
      const y = 14 + i * 52;
      k.rect(104, y, w, 38, { fill: i ? k.pale : fam, fillStyle: 'solid', strokeWidth: 2.2, roughness: .3 });
      k.text(94, y + 28, `${m} min`, { f: 'Poppins', s: 24, w: 700, c: INK, a: 'end' });
    });
  },
  vSync(host, fam) {
    const k = board(host, 310, 170, fam);
    k.line(20, 100, 290, 100, { strokeWidth: 2.6, roughness: .2 });
    [[70, '8 h'], [210, '9 h']].forEach(([x, t], i) => {
      k.circle(x, 100, 34, { fill: i ? k.pale : fam, fillStyle: 'solid', strokeWidth: 2.4, roughness: .2 });
      k.text(x, 62, t, { f: 'Poppins', s: 30, w: 700, c: INK, a: 'middle' });
    });
    k.arrow([[96, 136], [140, 150], [184, 136]], { c: BLUE, w: 2.6, head: 11 });
  },
  vMac(host, fam) {
    const k = board(host, 310, 170, fam);
    k.path('M20 160 L20 120 L100 120 L100 80 L180 80 L180 40 L260 40 L260 160 Z', { fill: k.pale, fillStyle: 'solid', strokeWidth: 2.6, roughness: .3 });
    k.arrow([[50, 110], [110, 70], [196, 28]], { c: '#9e2f2f', w: 3, head: 12 });
    k.arrow([[226, 70], [240, 110], [248, 148]], { c: '#2c5520', w: 3, head: 12 });
  },
  vSafety(host, fam) {
    const k = board(host, 310, 170, fam);
    const c = 30, x0 = 92, y0 = 8;
    [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2], [1, 3], [0, 3], [2, 3]].slice(0, 5).forEach(([cx, cy], i) =>
      k.rect(x0 + cx * (c + 4), y0 + cy * (c + 4), c, c, { fill: i < 4 ? '#88c475' : '#ffffff', fillStyle: 'solid', strokeWidth: 2, roughness: .2 }));
    k.text(230, 60, '0', { f: 'Poppins', s: 40, w: 800, c: '#2c5520', a: 'middle' });
    k.text(230, 92, 'accident', { f: 'Poppins', s: 22, w: 600, c: INK, a: 'middle' });
    k.rect(70, 116, 170, 44, { fill: k.pale, fillStyle: 'solid', strokeWidth: 2.2, roughness: .3 });
    k.text(155, 146, '« client »', { s: 30, c: BLUE, a: 'middle' });
  },
  vLetters(host, fam) {
    const k = board(host, 310, 170, fam);
    [['Q', 1], ['C', 1], ['D', 0], ['P', 1]].forEach(([l, ok], i) => {
      const x = 14 + i * 74;
      k.rect(x, 40, 62, 80, { fill: ok ? '#e6f3de' : '#fde4e1', fillStyle: 'solid', strokeWidth: 2.4, stroke: ok ? '#2c5520' : '#9e2f2f', roughness: .3 });
      k.text(x + 31, 96, l, { f: 'Poppins', s: 40, w: 800, c: ok ? '#2c5520' : '#9e2f2f', a: 'middle' });
    });
  },
  vAnticipate(host, fam) {
    const k = board(host, 310, 170, fam);
    k.rect(40, 26, 150, 134, { fill: '#ffffff', fillStyle: 'solid', roughness: .3 });
    k.rect(40, 26, 150, 32, { fill: fam, fillStyle: 'solid', strokeWidth: 2.4, roughness: .3 });
    [[66, 82], [114, 82], [162, 82], [66, 124], [114, 124]].forEach(([x, y]) => k.rect(x - 14, y - 14, 28, 28, { fill: k.pale, fillStyle: 'solid', strokeWidth: 1.8, roughness: .2 }));
    k.rect(148, 110, 28, 28, { fill: '#f2d78a', fillStyle: 'solid', strokeWidth: 1.8, roughness: .2 });
    k.text(250, 116, '!', { f: 'Poppins', s: 64, w: 800, c: '#9e2f2f', a: 'middle' });
  },
  vEscalate(host, fam) {
    const k = board(host, 310, 170, fam);
    [[10, 110], [120, 60], [180, 60]].forEach(([x, w], i) => k.rect(x, 110, w, 44, { fill: i ? '#ffffff' : k.pale, fillStyle: 'solid', strokeWidth: 2.2, roughness: .3 }));
    k.rect(150, 8, 150, 50, { fill: fam, fillStyle: 'solid', strokeWidth: 2.4, roughness: .3 });
    k.text(225, 42, 'TOP 15', { f: 'Poppins', s: 28, w: 700, c: INK, a: 'middle' });
    k.arrow([[70, 104], [96, 60], [142, 36]], { c: '#9e2f2f', w: 3, head: 12 });
  },
  vRow(host, fam) {
    const k = board(host, 310, 170, fam);
    const ws = [96, 54, 46, 54, 50];
    let x = 6;
    ws.forEach((w, i) => { k.rect(x, 50, w, 32, { fill: i === 1 || i === 4 ? fam : BLUE, fillStyle: 'solid', strokeWidth: 2, roughness: .3 }); k.rect(x, 82, w, 46, { fill: '#ffffff', fillStyle: 'solid', strokeWidth: 2, roughness: .3 }); x += w; });
    k.line(16, 104, 90, 104, { strokeWidth: 2, roughness: .3 });
  },
  vUp(host, fam) {
    const k = board(host, 310, 170, fam);
    k.rect(20, 110, 130, 46, { fill: k.pale, fillStyle: 'solid', strokeWidth: 2.4, roughness: .3 });
    k.text(85, 142, 'TOP 5', { f: 'Poppins', s: 26, w: 700, c: INK, a: 'middle' });
    k.rect(160, 14, 140, 50, { fill: fam, fillStyle: 'solid', strokeWidth: 2.4, roughness: .3 });
    k.text(230, 48, 'TOP 15', { f: 'Poppins', s: 26, w: 700, c: INK, a: 'middle' });
    k.arrow([[96, 104], [120, 70], [154, 46]], { c: '#9e2f2f', w: 3, head: 12 });
  },
  vAssign(host, fam) {
    const k = board(host, 310, 170, fam);
    k.rect(30, 30, 180, 120, { fill: k.pale, fillStyle: 'solid', strokeWidth: 2.4, roughness: .3 });
    k.circle(120, 72, 40, { fill: '#ffffff', fillStyle: 'solid', strokeWidth: 2.4, roughness: .2 });
    k.path('M84 138 C 88 108 152 108 156 138', { strokeWidth: 2.6, roughness: .3 });
    k.rect(214, 92, 84, 40, { fill: '#ffffff', fillStyle: 'solid', strokeWidth: 2.2, roughness: .3 });
    k.text(256, 120, 'jeu.', { f: 'Poppins', s: 24, w: 700, c: INK, a: 'middle' });
  },
  vState(host, fam) {
    const k = board(host, 310, 170, fam);
    [['fait', '#e6f3de', '#2c5520'], ['en retard', '#fde4e1', '#9e2f2f'], ['en cours', k.pale, k.dark]].forEach(([t, bg, c], i) => {
      const y = 12 + i * 52;
      k.rect(40, y, 230, 42, { fill: bg, fillStyle: 'solid', strokeWidth: 2.2, stroke: c, roughness: .3 });
      k.text(155, y + 30, t, { f: 'Poppins', s: 26, w: 700, c, a: 'middle' });
    });
  },
  /* ---------- TRS : la cascade des temps ---------- */
  heroTRS3(host, fam, T, H = 900) {
    const W = 1320, k = board(host, W, H, fam, T);
    const X0 = 60, U = 760 / 480, NAVY = '#3d449b', MUTED = '#4b5280', LAV = '#ececf7', RED = '#9e2f2f';
    const rows = [
      ['Temps d’ouverture', 480, null],
      ['Fonctionnement', 384, ['Disponibilité 80 %', 'arrêts : 96 min']],
      ['Temps net', 346, ['Performance 90 %', 'ralentissements : 38 min']],
      ['Temps utile', 335, ['Qualité 97 %', 'rebuts : 11 min']]
    ];
    k.text(X0, 44, 'Ligne 2 de Nadia, mardi : 8 h d’ouverture', { f: 'Poppins', s: 30, w: 600, c: MUTED });
    const top = 100, bh = 92, last = H - 150 - bh, step = (last - top) / 3;
    rows.forEach(([name, min, rate], i) => {
      const y = top + i * step, w = min * U, final = i === 3;
      if (i) {   // la perte va de la fin de cette barre à la fin de la barre précédente
        const prev = rows[i - 1][1] * U;
        k.dash(X0 + prev, y - step + bh + 6, X0 + prev, y - 6, RED, 2.6);
        k.rect(X0 + w, y, prev - w, bh, { fill: '#fde4e1', fillStyle: 'solid', strokeWidth: 2.4 });
      }
      k.rect(X0, y, w, bh, { fill: final ? BLUE : LAV, fillStyle: 'solid', strokeWidth: 3.2 });
      k.text(X0 + 22, y + bh / 2 + 11 * T, name, { f: 'Poppins', s: 30, w: 600, c: final ? '#fff' : INK });
      k.text(X0 + w - 20, y + bh / 2 + 11 * T, `${min} min`, { f: 'Poppins', s: 30, w: 700, c: final ? '#fff' : NAVY, a: 'end' });
      if (rate) {
        k.text(850, y + 36, rate[0], { f: 'Poppins', s: 36, w: 700, c: NAVY });
        k.text(850, y + 36 + 36 * T, rate[1], { f: 'Poppins', s: 28, w: 500, c: RED });
      }
    });
    k.text(850, top + 38, '30 % du temps', { s: 48, c: BLUE, fixed: true });
    k.text(850, top + 84, 'est perdu', { s: 48, c: BLUE, fixed: true });
    k.text(X0, H - 46, 'TRS = 80 % × 90 % × 97 % ≈ 70 %', { f: 'Poppins', s: 38, w: 700, c: NAVY });
  },
  /* ---------- SMED : avant, après ---------- */
  heroSMED3(host, fam, T, H = 900) {
    const W = 1320, k = board(host, W, H, fam, T);
    const XS = 210, U = 21.5, NAVY = '#3d449b', MUTED = '#4b5280', RED = '#9e2f2f', GRN = '#2c5520';
    const A = 250, B = H - 200, mid = (A + B) / 2;
    const block = (x, y, w, ext, label) => {
      k.rect(x + 3, y, w - 6, 70, { fill: ext ? k.dots : BLUE, fillStyle: 'solid', strokeWidth: 2.6 });
      if (label) k.text(x + w / 2, y + 35 + 9 * T, label, { f: 'Poppins', s: 24, w: 600, c: ext ? INK : '#fff', a: 'middle' });
    };
    // Séparer : la légende distingue externe et interne (motif + mot, pas seulement la couleur)
    k.text(40, 62, 'Séparer', { f: 'Poppins', s: 36, w: 700, c: NAVY });
    k.rect(300, 34, 44, 34, { fill: k.dots, fillStyle: 'solid', strokeWidth: 2.4 });
    k.text(360, 62, 'externe : faisable machine en marche', { f: 'Poppins', s: 28, w: 500, c: INK });
    k.rect(300, 84, 44, 34, { fill: BLUE, fillStyle: 'solid', strokeWidth: 2.4 });
    k.text(360, 112, 'interne : machine arrêtée', { f: 'Poppins', s: 28, w: 500, c: INK });
    // Avant : 45 min machine arrêtée
    k.text(40, A + 12, 'Avant', { f: 'Poppins', s: 34, w: 700, c: INK });
    k.rect(XS, A - 52, 45 * U, 104, { fill: '#fde4e1', fillStyle: 'solid', stroke: 'none' });
    k.text(XS, A - 66, 'machine arrêtée : 45 min', { f: 'Poppins', s: 28, w: 600, c: RED });
    k.text(XS + 45 * U, A - 66, 'de 45 à 12 min', { s: 50, c: BLUE, a: 'end', fixed: true });
    const ops = [['bobine', 8, 1], ['outils', 6, 1], ['démonter', 7, 0], ['monter', 8, 0], ['régler', 10, 0], ['essais', 6, 0]];
    let x = XS; const pos = {};
    ops.forEach(([n, m, ext]) => { block(x, A - 35, m * U, ext, n); pos[n] = [x, m * U]; x += m * U; });
    // Après : 12 min machine arrêtée, le reste se fait machine en marche
    k.text(40, B + 12, 'Après', { f: 'Poppins', s: 34, w: 700, c: INK });
    const stopX = XS + 14 * U, stopW = 12 * U, gx = stopX + stopW, end = XS + 45 * U;
    k.rect(stopX, B - 52, stopW, 104, { fill: '#fde4e1', fillStyle: 'solid', stroke: 'none' });
    k.text(XS, B + 96, 'en marche', { f: 'Poppins', s: 28, w: 600, c: GRN });
    k.text(stopX, B + 96, 'arrêtée : 12 min', { f: 'Poppins', s: 28, w: 600, c: RED });
    block(XS, B - 35, 8 * U, 1, 'bobine'); block(XS + 8 * U, B - 35, 6 * U, 1, 'outils');
    for (let i = 0; i < 4; i++) block(stopX + i * 3 * U, B - 35, 3 * U, 0, '');
    k.rect(gx + 6, B - 35, end - gx - 6, 70, { fill: '#e6f3de', fillStyle: 'solid', strokeWidth: 2.6, stroke: GRN });
    k.text(gx + 3 + (end - gx) / 2, B + 10 * T, '33 min gagnées', { f: 'Poppins', s: 28, w: 700, c: GRN, a: 'middle' });
    k.text(stopX, B + 96 + 34 * T, 'démonter, monter, régler, essais', { f: 'Poppins', s: 26, w: 500, c: MUTED });
    // Convertir : les opérations externes sortent de l'arrêt
    ['bobine', 'outils'].forEach(n => { const [x0, w] = pos[n]; k.arrow([[x0 + w / 2, A + 44], [x0 + w / 2 + 6, mid], [x0 + w / 2, B - 46]], { c: NAVY, w: 3, head: 14 }); });
    k.text(40, mid - 20, 'Convertir', { f: 'Poppins', s: 36, w: 700, c: NAVY });
    k.text(40, mid - 20 + 36 * T, 'préparer', { f: 'Poppins', s: 30, w: 500, c: INK });
    k.text(40, mid - 20 + 68 * T, 'avant l’arrêt', { f: 'Poppins', s: 30, w: 500, c: INK });
    // Réduire : l'interne restant est simplifié
    k.arrow([[(stopX + end) / 2, A + 44], [(stopX + end) / 2 - 40, mid], [stopX + stopW / 2, B - 58]], { c: NAVY, w: 3, head: 14 });
    k.text(940, mid - 20, 'Réduire', { f: 'Poppins', s: 36, w: 700, c: NAVY });
    k.text(940, mid - 20 + 36 * T, 'simplifier', { f: 'Poppins', s: 30, w: 500, c: INK });
    k.text(940, mid - 20 + 68 * T, 'ce qui reste', { f: 'Poppins', s: 30, w: 500, c: INK });
  },

  /* ---------- étapes TRS ---------- */
  sOpen(host, fam) {
    const k = board(host, 310, 170, fam);
    k.circle(80, 88, 124, { fill: '#ffffff', fillStyle: 'solid', strokeWidth: 3.2, roughness: .3 });
    k.line(80, 88, 80, 44, { strokeWidth: 3.4, roughness: .3 }); k.line(80, 88, 114, 106, { strokeWidth: 3.4, roughness: .3 });
    k.circle(80, 88, 12, { fill: INK, fillStyle: 'solid', strokeWidth: 1, roughness: .2 });
    k.rect(166, 74, 134, 44, { fill: '#ececf7', fillStyle: 'solid', strokeWidth: 2.6 });
    k.text(233, 58, '8 h', { f: 'Poppins', s: 34, w: 700, c: '#3d449b', a: 'middle' });
    k.text(233, 156, '60 / min', { f: 'Poppins', s: 28, w: 600, c: INK, a: 'middle' });
  },
  sLog(host, fam) {
    const k = board(host, 310, 170, fam);
    k.rect(30, 16, 130, 148, { fill: '#ffffff', fillStyle: 'solid' });
    k.rect(68, 8, 54, 18, { fill: BLUE, fillStyle: 'solid', strokeWidth: 2.4 });
    [56, 92, 128].forEach(y => { k.line(48, y, 92, y, { strokeWidth: 2.4 }); k.line(104, y, 142, y, { strokeWidth: 2.4 }); });
    k.circle(238, 98, 104, { fill: '#ffffff', fillStyle: 'solid', strokeWidth: 3.2, roughness: .3 });
    k.rect(228, 30, 20, 16, { fill: INK, fillStyle: 'solid', strokeWidth: 1.6 });
    k.line(238, 98, 262, 70, { strokeWidth: 3.4, roughness: .3 });
    k.circle(238, 98, 10, { fill: INK, fillStyle: 'solid', strokeWidth: 1, roughness: .2 });
  },
  sRates(host, fam) {
    const k = board(host, 310, 170, fam);
    [[260, 0], [208, 52], [187, 21], [181, 6]].forEach(([w, loss], i) => {
      const y = 12 + i * 40;
      if (loss) k.rect(30 + w, y, loss, 28, { fill: '#fde4e1', fillStyle: 'solid', strokeWidth: 2 });
      k.rect(30, y, w, 28, { fill: i === 3 ? BLUE : '#ececf7', fillStyle: 'solid', strokeWidth: 2.4 });
    });
  },
  sBiggest(host, fam) {
    const k = board(host, 310, 170, fam);
    k.line(20, 156, 250, 156);
    [110, 44, 12].forEach((h, i) => k.rect(40 + i * 70, 156 - h, 46, h, { fill: '#fde4e1', fillStyle: 'solid', strokeWidth: 2.6 }));
    const fx = 63; k.line(fx, 44, fx, 8, { strokeWidth: 3 });
    k.poly([[fx, 8], [fx + 44, 19], [fx, 31]], { fill: BLUE, fillStyle: 'solid', strokeWidth: 2.4 });
    k.text(178, 62, 'd’abord', { s: 36, c: BLUE });
  },
  /* ---------- étapes SMED ---------- */
  sFilm(host, fam) {
    const k = board(host, 310, 170, fam);
    k.circle(72, 40, 52, { fill: '#ffffff', fillStyle: 'solid', strokeWidth: 2.8, roughness: .3 });
    k.circle(140, 40, 52, { fill: '#ffffff', fillStyle: 'solid', strokeWidth: 2.8, roughness: .3 });
    k.rect(30, 66, 160, 86, { fill: '#ececf7', fillStyle: 'solid' });
    k.poly([[190, 92], [262, 64], [262, 154], [190, 126]], { fill: '#ececf7', fillStyle: 'solid', strokeWidth: 3 });
    k.circle(58, 92, 18, { fill: '#f16969', fillStyle: 'solid', strokeWidth: 1.6, roughness: .2 });
  },
  sSplit(host, fam) {
    const k = board(host, 310, 170, fam);
    [1, 0, 0, 1, 0, 0].forEach((e, i) => k.rect(20 + i * 46, 14, 40, 46, { fill: e ? k.dots : BLUE, fillStyle: 'solid', strokeWidth: 2.4 }));
    [1, 1, 0, 0, 0, 0].forEach((e, i) => k.rect(20 + i * 46 + (e ? 0 : 18), 110, 40, 46, { fill: e ? k.dots : BLUE, fillStyle: 'solid', strokeWidth: 2.4 }));
    k.dash(118, 100, 118, 164, '#3d449b', 2.6);
    k.arrow([[160, 68], [164, 84], [160, 102]], { c: INK, w: 2.4, head: 10 });
  },
  sConvert(host, fam) {
    const k = board(host, 310, 170, fam);
    k.rect(150, 16, 152, 138, { fill: '#fde4e1', fillStyle: 'solid', stroke: 'none' });
    k.rect(170, 34, 50, 46, { fill: k.dots, fillStyle: 'solid', strokeWidth: 2.4 });
    k.rect(234, 34, 50, 46, { fill: BLUE, fillStyle: 'solid', strokeWidth: 2.4 });
    k.rect(234, 92, 50, 46, { fill: BLUE, fillStyle: 'solid', strokeWidth: 2.4 });
    k.rect(26, 92, 50, 46, { fill: k.dots, fillStyle: 'solid', strokeWidth: 2.4 });
    k.arrow([[178, 88], [130, 100], [86, 114]], { c: '#3d449b', w: 3, head: 12 });
  },
  sShrink(host, fam) {
    const k = board(host, 310, 170, fam);
    k.rect(20, 20, 270, 46, { fill: BLUE, fillStyle: 'solid', strokeWidth: 2.4 });
    k.rect(20, 110, 108, 46, { fill: BLUE, fillStyle: 'solid', strokeWidth: 2.4 });
    k.text(155, 52, '31 min', { f: 'Poppins', s: 28, w: 700, c: '#fff', a: 'middle' });
    k.text(74, 142, '12 min', { f: 'Poppins', s: 26, w: 700, c: '#fff', a: 'middle' });
    k.arrow([[214, 74], [200, 96], [140, 128]], { c: INK, w: 2.6, head: 12 });
  },
  /* ---------- v3 : visuels pièces maîtresses, largeur 1320, hauteur H calculée pour remplir la place libre ---------- */
  heroPareto3(host, fam, T, H = 840) {
    const W = 1320, k = board(host, W, H, fam, T);
    const X0 = 70, X1 = 860, Y0 = H - 110, YT = 160, HA = Y0 - YT, NAVY = '#3d449b', MUTED = '#4b5280';
    const v = [86, 50, 24, 14, 10, 7, 5, 4], tot = 200, slot = (X1 - X0) / v.length, BW = 68;
    k.text(X0, 44, 'Ligne 2 de Nadia : 200 arrêts en 4 semaines', { f: 'Poppins', s: 30, w: 600, c: MUTED });
    bars(k, X0, Y0, slot, BW, v.map(x => x / tot * HA), { vital: 3, sw: 3.4 });
    v.slice(0, 3).forEach((x, i) => k.text(X0 + i * slot + slot / 2, Y0 - x / tot * HA - 14, String(x), { f: 'Poppins', s: 30, w: 700, c: INK, a: 'middle' }));
    k.line(X0, YT - 20, X0, Y0); k.line(X0, Y0, X1, Y0); k.line(X1, YT - 20, X1, Y0);
    let c = 0; const pts = [[X0, Y0]];
    v.forEach((x, i) => { c += x; pts.push([X0 + (i + 1) * slot, Y0 - c / tot * HA]); });
    const y80 = Y0 - .8 * HA, xCut = X0 + 3 * slot;
    k.dash(X0, y80, X1 + 44, y80, '#e05252', 3.6); k.dash(xCut, y80, xCut, Y0, '#e05252', 3.6);
    k.lin(pts, { strokeWidth: 4, roughness: .2, bowing: 0 });
    pts.slice(1).forEach(p => k.circle(p[0], p[1], 15, { fill: INK, fillStyle: 'solid', strokeWidth: 1.5, roughness: .2 }));
    k.text(X1 + 20, YT + 10, '100 %', { f: 'Poppins', s: 30, w: 600, c: MUTED });
    const lab = (x, y, t, lines) => {
      k.text(x, y, t, { f: 'Poppins', s: 40, w: 700, c: NAVY });
      lines.forEach((l, i) => k.text(x, y + (38 + i * 34) * T, l, { f: 'Poppins', s: 30, w: 500, c: INK }));
    };
    lab(96, 130, 'Cumuler', ['les pourcentages,', 'cause après cause']);
    const cx = pts[1][0] + .45 * (pts[2][0] - pts[1][0]), cy = pts[1][1] + .45 * (pts[2][1] - pts[1][1]);
    k.arrow([[160, 130 + 82 * T], [cx - 20, (130 + 82 * T + cy) / 2], [cx - 4, cy - 14]], { c: NAVY, w: 3, head: 15 });
    lab(920, y80 + 12, 'Couper à 80 %', ['à gauche : les causes', 'à traiter en premier']);
    k.arrow([[X0 + 10, Y0 + 46], [X0 + 420, Y0 + 48], [900, Y0 + 46]], { c: NAVY, w: 3, head: 15 });
    lab(920, Y0 - 4, 'Classer', ['de la plus fréquente', 'à la plus rare']);
    const iy = y80 + .3 * (Y0 - y80);
    k.text(xCut + 34, iy, '3 causes sur 8', { s: 50, c: BLUE, fixed: true });
    k.text(xCut + 34, iy + 52, '= 80 % des arrêts', { s: 50, c: BLUE, fixed: true });
    ['bourrage du film,', 'changement de bobine,', 'capteur encrassé'].forEach((l, i) =>
      k.text(xCut + 36, iy + 52 + (42 + i * 34) * T, l, { f: 'Poppins', s: 30, w: 500, c: MUTED }));
  },
  heroIshikawa3(host, fam, T, H = 840) {
    const W = 1320, k = board(host, W, H, fam, T);
    const SY = H / 2 + 20, HX = 1026, NAVY = '#3d449b', MUTED = '#4b5280', BY = H - 150;
    k.path(`M130 ${SY} C 106 ${SY - 34} 76 ${SY - 70} 44 ${SY - 92} C 62 ${SY - 34} 62 ${SY + 34} 44 ${SY + 92} C 76 ${SY + 70} 106 ${SY + 34} 130 ${SY}`, { fill: '#ffffff', fillStyle: 'solid' });
    k.arrow([[130, SY], [600, SY + 2], [HX - 8, SY]], { c: INK, w: 4.6, head: 22 });
    k.rect(HX, SY - 110, 286, 220, { fill: BLUE, fillStyle: 'solid', strokeWidth: 3.6 });
    k.text(HX + 143, SY - 50, 'L’effet', { f: 'Poppins', s: 42, w: 800, c: '#fff', a: 'middle', fixed: true });
    ['86 bourrages', 'du film', 'en septembre'].forEach((l, i) => k.text(HX + 143, SY + (i * 40), l, { f: 'Poppins', s: 35, w: 600, c: '#fff', a: 'middle', fixed: true }));
    const pill = (cx, cy, t) => {
      const tx = k.text(cx, cy + 11 * T, t, { f: 'Poppins', s: 32, w: 600, c: INK, a: 'middle' });
      const w = tx.getComputedTextLength() + 34, h = 54 * T;
      k.svg.insertBefore(k.rect(cx - w / 2, cy - h / 2, w, h, { fill: '#ffffff', fillStyle: 'solid', strokeWidth: 3 }), tx);
    };
    const desc = (cx, y, t) => k.text(cx, y, t, { f: 'Poppins', s: 28, w: 500, c: MUTED, a: 'middle' });
    const postit = (ax, ay, ex, ey, t, txt) => {
      const px = ax + (ex - ax) * t, py = ay + (ey - ay) * t;
      k.line(px, py, px + 30, py, { strokeWidth: 2.6 });
      const tx = k.text(px + 30 + 12, py + 12 * T, txt, { s: 36, c: INK });
      const w = tx.getComputedTextLength() + 24, h = 52 * T;
      k.svg.insertBefore(k.rect(px + 30, py - h / 2, w, h, { fill: '#f2d78a', fillStyle: 'solid', strokeWidth: 2.4, roughness: 1 }), tx);
      return [px + 30, py, w, h];
    };
    const top = [[330, 'Matière', 'ce qui entre', 'nouveau film', .5], [640, 'Méthode', 'façons de faire', 'réglé à l’œil', .5], [950, 'Milieu', 'environnement', 'atelier à 31 °C', .62]];
    const bot = [[480, 'Matériel', 'machines, outils', 'rouleau usé'], [800, 'Main-d’œuvre', 'compétences', 'équipe renouvelée']];
    top.forEach(([x, t, d, idea, at]) => {
      const ex = x - 150, ey = 190;
      k.line(x, SY, ex, ey, { strokeWidth: 3.4 });
      pill(ex, 160, t); desc(ex, 100, d);
      postit(x, SY, ex, ey, at, idea);
    });
    let last;
    bot.forEach(([x, t, d, idea]) => {
      const ex = x - 150, ey = BY;
      k.line(x, SY, ex, ey, { strokeWidth: 3.4 });
      pill(ex, BY + 30, t); desc(ex, BY + 100, d);
      last = postit(x, SY, ex, ey, .6, idea);
    });
    const RX = HX + 284;   // bloc aligné à droite sur la tête, sous la rangée des descripteurs
    k.text(RX, 150, 'Partir de l’effet', { f: 'Poppins', s: 34, w: 700, c: NAVY, a: 'end' });
    k.text(RX, 150 + 34 * T, 'le problème, factuel', { f: 'Poppins', s: 30, w: 500, c: INK, a: 'end' });
    k.text(RX, 150 + 66 * T, 'et mesurable', { f: 'Poppins', s: 30, w: 500, c: INK, a: 'end' });
    k.arrow([[HX + 200, 150 + 82 * T], [HX + 190, (150 + 82 * T + SY - 118) / 2], [HX + 172, SY - 118]], { c: NAVY, w: 3, head: 15 });
    const iy = Math.max(SY + 190, BY - 30);
    k.text(1040, iy, 'une idée', { s: 42, c: BLUE, fixed: true });
    k.text(1040, iy + 44, '= un post-it', { s: 42, c: BLUE, fixed: true });
    k.arrow([[1030, iy - 14], [1004, (iy + last[1]) / 2], [last[0] + last[2] - 30, last[1] + last[3] / 2 + 8]], { c: BLUE, w: 2.8, head: 13 });
  },
  heroWhy3(host, fam, T, H = 840) {
    const W = 1320, k = board(host, W, H, fam, T);
    const GX = 230, GY = 210, SOIL = 760, LX = 790, S = 1.45, NAVY = '#3d449b';
    const tipY = H - 100, y1 = GY + 80, yN = tipY - 90, step = (yN - y1) / 4;
    const ys = [0, 1, 2, 3, 4].map(i => y1 + i * step);
    k.rect(14, GY, SOIL - 14, H - GY - 8, { fill: k.soil, fillStyle: 'solid', stroke: 'none' });
    k.curve([[14, GY + 2], [260, GY - 5], [520, GY + 5], [SOIL, GY - 2]], { strokeWidth: 3.8 });
    const P = (dx, dy) => `${GX + dx * S} ${GY + dy * S}`;
    k.path(`M${P(0, 0)} C ${P(-4, -40)} ${P(4, -70)} ${P(0, -98)}`, { strokeWidth: 3.8 });
    k.path(`M${P(0, -34)} C ${P(-30, -30)} ${P(-66, -50)} ${P(-82, -82)} C ${P(-44, -90)} ${P(-12, -66)} ${P(0, -34)} Z`, { fill: fam, fillStyle: 'solid' });
    k.path(`M${P(0, -58)} C ${P(26, -54)} ${P(62, -76)} ${P(76, -106)} C ${P(38, -112)} ${P(10, -90)} ${P(0, -58)} Z`, { fill: fam, fillStyle: 'solid' });
    k.path(`M${P(0, -96)} C ${P(-16, -102)} ${P(-22, -112)} ${P(-20, -116)} C ${P(-6, -116)} ${P(2, -106)} ${P(0, -96)} Z`, { fill: fam, fillStyle: 'solid', strokeWidth: 2.8 });
    const sym = k.text(GX + 130, GY - 44, '86 bourrages', { s: 44, c: INK, fixed: true });
    const kx = i => GX + (i % 2 ? -6 : 8);   // abscisse de chaque nœud : la racine passe exactement par lui
    k.curve([[GX, GY], ...ys.map((y, i) => [kx(i), y]), [GX + 2, tipY]], { strokeWidth: 5, stroke: '#7a5a1d', roughness: .15 });
    ys.forEach((y, i) => {
      const yb = y - step / 2, d = i % 2 ? -1 : 1, x0 = i ? (kx(i - 1) + kx(i)) / 2 : (GX + kx(0)) / 2;
      k.curve([[x0, yb], [x0 + 26 * d, yb + 14], [x0 + 50 * d, yb + 22]], { strokeWidth: 2.8, stroke: '#7a5a1d', roughness: .3 });
    });
    const why = ys.map((y, i) => {
      k.num(kx(i), y, i + 1, { d: 54 * T, fill: '#ffffff' });
      return k.text(GX + 64 + i * 44, y + 15, 'Pourquoi ?', { s: 48, c: BLUE, fixed: true });
    });
    k.circle(GX + 2, tipY, 52, { fill: '#f16969', fillStyle: 'solid', strokeWidth: 3.2, roughness: .25 });
    k.text(GX - 70, tipY + 76, 'standard non revu', { s: 44, c: '#9e2f2f', fixed: true });
    const lab = (y, t, lines) => {
      k.text(LX, y, t, { f: 'Poppins', s: 34, w: 700, c: NAVY });
      lines.forEach((l, i) => k.text(LX, y + (36 + i * 32) * T, l, { f: 'Poppins', s: 30, w: 500, c: INK }));
    };
    lab(96, 'Partir d’un fait', ['le symptôme, observé', 'et mesuré']);
    k.arrow([[LX - 12, 104], [720, 116], [GX + 130 + sym.getComputedTextLength() + 16, GY - 60]], { c: NAVY, w: 3, head: 15 });
    lab(ys[2] - 50, 'Demander « Pourquoi ? »', ['chaque réponse devient', 'la question suivante']);
    k.arrow([[LX - 12, ys[2] - 38], [730, ys[2] - 18], [GX + 64 + 2 * 44 + why[2].getComputedTextLength() + 16, ys[2] + 2]], { c: NAVY, w: 3, head: 15 });
    lab(tipY - 28, 'S’arrêter à la racine', ['traitée, elle empêche', 'le problème de revenir']);
    k.arrow([[LX - 12, tipY - 18], [520, tipY + 2], [GX + 40, tipY + 2]], { c: NAVY, w: 3, head: 15 });
  },
  /* ---------- PARETO, recto épuré : le schéma porte Classer, Cumuler, Couper ---------- */
  heroPareto2(host, fam, T) {
    const W = 1320, H = 476, k = board(host, W, H, fam, T);
    const X0 = 60, X1 = 820, Y0 = 400, YT = 76, HA = Y0 - YT;
    const v = [86, 50, 24, 14, 10, 7, 5, 4], tot = 200, slot = (X1 - X0) / v.length;
    bars(k, X0, Y0, slot, 62, v.map(x => x / tot * HA), { vital: 3 });
    k.line(X0, YT - 16, X0, Y0); k.line(X0, Y0, X1, Y0); k.line(X1, YT - 16, X1, Y0);
    let c = 0; const pts = [[X0, Y0]];
    v.forEach((x, i) => { c += x; pts.push([X0 + (i + 1) * slot, Y0 - c / tot * HA]); });
    const y80 = Y0 - .8 * HA, xCut = X0 + 3 * slot;
    k.dash(X0, y80, X1 + 46, y80); k.dash(xCut, y80, xCut, Y0);
    k.lin(pts, { strokeWidth: 3.6, roughness: .2, bowing: 0 });
    pts.slice(1).forEach(p => k.circle(p[0], p[1], 13, { fill: INK, fillStyle: 'solid', strokeWidth: 1.5, roughness: .2 }));
    k.text(X1 + 10, YT + 8, '100 %', { f: 'Poppins', s: 22, w: 600, c: '#4b5280', fixed: true });
    const NAVY = '#3d449b';
    const lab = (x, y, t, lines) => {
      k.text(x, y, t, { f: 'Poppins', s: 34, w: 700, c: NAVY });
      lines.forEach((l, i) => k.text(x, y + (32 + i * 30) * T, l, { f: 'Poppins', s: 27, w: 500, c: INK }));
    };
    // Cumuler : au-dessus de la courbe, à gauche
    lab(88, 40, 'Cumuler', ['les % s’additionnent']);
    k.arrow([[150, 92 + 12 * T], [176, 150], [198, 208]], { c: NAVY, w: 2.8, head: 13 });
    // Couper : au bout de la ligne des 80 %
    lab(890, y80 + 10, 'Couper à 80 %', ['à gauche : les causes', 'prioritaires']);
    // Classer : au bout de la flèche sous les barres
    k.arrow([[X0 + 10, Y0 + 34], [X0 + 400, Y0 + 36], [870, Y0 + 34]], { c: NAVY, w: 2.8, head: 13 });
    lab(890, Y0 - 4, 'Classer', ['de la plus fréquente', 'à la plus rare']);
    // la lecture
    k.text(xCut + 34, 238, '3 causes sur 8', { s: 46, c: BLUE, fixed: true });
    k.text(xCut + 34, 282, '= 80 % des arrêts', { s: 46, c: BLUE, fixed: true });
    k.arrow([[xCut + 24, 262], [xCut - 10, 286], [xCut - 52, 326]], { c: BLUE });
  },
  /* ---------- ISHIKAWA, recto épuré : chaque arête porte sa famille ---------- */
  heroIshikawa2(host, fam, T) {
    const W = 1320, H = 520, k = board(host, W, H, fam, T);
    const SY = 270, HX = 1066, NAVY = '#3d449b';
    k.path(`M120 ${SY} C 98 ${SY - 30} 70 ${SY - 62} 44 ${SY - 80} C 58 ${SY - 30} 58 ${SY + 30} 44 ${SY + 80} C 70 ${SY + 62} 98 ${SY + 30} 120 ${SY}`, { fill: '#ffffff', fillStyle: 'solid' });
    k.arrow([[120, SY], [600, SY + 2], [HX - 8, SY]], { c: INK, w: 4.2, head: 20 });
    k.rect(HX, SY - 74, 240, 148, { fill: BLUE, fillStyle: 'solid', strokeWidth: 3.6 });
    k.text(HX + 120, SY - 20, 'L’effet', { f: 'Poppins', s: 40, w: 800, c: '#fff', a: 'middle', fixed: true });
    k.text(HX + 120, SY + 20, 'le problème', { f: 'Poppins', s: 28, w: 600, c: '#fff', a: 'middle', fixed: true });
    k.text(HX + 120, SY + 52, 'observé', { f: 'Poppins', s: 28, w: 600, c: '#fff', a: 'middle', fixed: true });
    const pill = (cx, cy, t) => {
      const tx = k.text(cx, cy + 10, t, { f: 'Poppins', s: 28, w: 600, c: INK, a: 'middle' });
      const w = tx.getComputedTextLength() + 32, h = 48 * T;
      k.svg.insertBefore(k.rect(cx - w / 2, cy - h / 2, w, h, { fill: '#ffffff', fillStyle: 'solid', strokeWidth: 2.8 }), tx);
    };
    const desc = (cx, y, t) => k.text(cx, y, t, { f: 'Poppins', s: 26, w: 500, c: '#4b5280', a: 'middle' });
    const postit = (x, y) => k.rect(x, y, 30, 30, { fill: '#f2d78a', fillStyle: 'solid', strokeWidth: 2.2, roughness: 1 });
    const sub = (ax, ay, ex, ey, t) => {
      const px = ax + (ex - ax) * t, py = ay + (ey - ay) * t;
      k.line(px, py, px + 54, py, { strokeWidth: 2.4 });
      postit(px + 54, py - 15);
      return [px + 54, py];
    };
    const top = [[380, 'Matière', 'ce qui entre'], [650, 'Méthode', 'façons de faire'], [920, 'Milieu', 'environnement']];
    const bot = [[520, 'Matériel', 'machines, outils'], [820, 'Main-d’œuvre', 'compétences']];
    let target;
    top.forEach(([x, t, d], i) => {
      const ex = x - 120, ey = 120;
      k.line(x, SY, ex, ey, { strokeWidth: 3.2 });
      pill(ex, 92, t); desc(ex, 46, d);
      sub(x, SY, ex, ey, .45);
      if (i !== 1) sub(x, SY, ex, ey, .78);
    });
    bot.forEach(([x, t, d], i) => {
      const ex = x - 120, ey = 420;
      k.line(x, SY, ex, ey, { strokeWidth: 3.2 });
      pill(ex, 446, t); desc(ex, 504, d);
      const pt = sub(x, SY, ex, ey, .5);
      if (i === 1) target = pt;
    });
    // partir de l'effet
    k.text(930, 66, 'Partir de l’effet', { f: 'Poppins', s: 34, w: 700, c: NAVY });
    k.text(930, 66 + 32 * T, 'le problème, factuel', { f: 'Poppins', s: 27, w: 500, c: INK });
    k.text(930, 66 + 62 * T, 'et mesurable', { f: 'Poppins', s: 27, w: 500, c: INK });
    k.arrow([[1120, 66 + 74 * T], [1150, 166], [1170, SY - 84]], { c: NAVY, w: 2.8, head: 13 });
    // une idée = un post-it
    k.text(944, 438, 'une idée', { s: 46, c: BLUE, fixed: true });
    k.text(944, 482, '= un post-it', { s: 46, c: BLUE, fixed: true });
    k.arrow([[934, 452], [900, 420], [target[0] + 40, target[1] + 22]], { c: BLUE, w: 2.8, head: 13 });
  },
  /* ---------- 5 POURQUOI, recto épuré : la racine porte le principe ---------- */
  heroWhy2(host, fam, T) {
    const W = 1320, H = 500, k = board(host, W, H, fam, T);
    const GX = 210, GY = 130, SOIL = 720, LX = 760, NAVY = '#3d449b';
    k.rect(14, GY, SOIL - 14, H - GY - 8, { fill: k.soil, fillStyle: 'solid', stroke: 'none' });
    k.curve([[14, GY + 2], [240, GY - 4], [480, GY + 4], [SOIL, GY - 2]], { strokeWidth: 3.6 });
    k.path(`M${GX} ${GY} C ${GX - 4} ${GY - 40} ${GX + 4} ${GY - 70} ${GX} ${GY - 98}`, { strokeWidth: 3.4 });
    k.path(`M${GX} ${GY - 34} C ${GX - 30} ${GY - 30} ${GX - 66} ${GY - 50} ${GX - 82} ${GY - 82} C ${GX - 44} ${GY - 90} ${GX - 12} ${GY - 66} ${GX} ${GY - 34} Z`, { fill: fam, fillStyle: 'solid' });
    k.path(`M${GX} ${GY - 58} C ${GX + 26} ${GY - 54} ${GX + 62} ${GY - 76} ${GX + 76} ${GY - 106} C ${GX + 38} ${GY - 112} ${GX + 10} ${GY - 90} ${GX} ${GY - 58} Z`, { fill: fam, fillStyle: 'solid' });
    k.path(`M${GX} ${GY - 96} C ${GX - 16} ${GY - 102} ${GX - 22} ${GY - 112} ${GX - 20} ${GY - 116} C ${GX - 6} ${GY - 116} ${GX + 2} ${GY - 106} ${GX} ${GY - 96} Z`, { fill: fam, fillStyle: 'solid', strokeWidth: 2.6 });
    const ys = [184, 236, 288, 340, 392], tipY = 450;
    k.curve([[GX, GY], [GX + 8, 160], [GX - 6, 210], [GX + 8, 262], [GX - 6, 314], [GX + 6, 366], [GX - 4, 418], [GX + 2, tipY]], { strokeWidth: 4.4, stroke: '#7a5a1d' });
    [[GX + 4, 160, GX + 46, 178], [GX - 2, 210, GX - 44, 228], [GX + 4, 262, GX + 40, 278], [GX - 2, 314, GX - 40, 330], [GX + 2, 366, GX + 34, 380]].forEach(([a, b, c, d]) =>
      k.curve([[a, b], [(a + c) / 2, b + 12], [c, d]], { strokeWidth: 2.4, stroke: '#7a5a1d' }));
    ys.forEach((y, i) => {
      k.num(GX + (i % 2 ? -4 : 6), y, i + 1, { d: 38, fill: '#ffffff' });
      k.text(GX + 48 + i * 34, y + 12, 'Pourquoi ?', { s: 40, c: BLUE, fixed: true });
    });
    k.circle(GX + 2, tipY, 42, { fill: '#f16969', fillStyle: 'solid', strokeWidth: 3 });
    const lab = (y, t, lines) => {
      k.text(LX, y, t, { f: 'Poppins', s: 32, w: 700, c: NAVY });
      lines.forEach((l, i) => k.text(LX, y + (31 + i * 29) * T, l, { f: 'Poppins', s: 27, w: 500, c: INK }));
    };
    lab(52, 'Partir d’un fait', ['le symptôme, observé', 'et mesuré']);
    k.arrow([[LX - 12, 56], [560, 34], [GX + 92, GY - 104]], { c: NAVY, w: 2.8, head: 13 });
    lab(236, 'Demander « Pourquoi ? »', ['chaque réponse devient', 'la question suivante']);
    k.arrow([[LX - 12, 252], [660, 270], [GX + 48 + 2 * 34 + 196, 292]], { c: NAVY, w: 2.8, head: 13 });
    lab(420, 'S’arrêter à la racine', ['la cause qui, traitée,', 'ne revient plus']);
    k.arrow([[LX - 12, 430], [480, 452], [GX + 34, tipY + 4]], { c: NAVY, w: 2.8, head: 13 });
  },
  /* ---------- ISHIKAWA : arête de poisson ---------- */
  heroIshikawa(host, fam, T) {
    const W = 760, H = 470, k = board(host, W, H, fam, T);
    const SY = 238, HX = 548;
    k.path(`M100 ${SY} C 78 ${SY - 30} 55 ${SY - 62} 30 ${SY - 78} C 44 ${SY - 30} 44 ${SY + 30} 30 ${SY + 78} C 55 ${SY + 62} 78 ${SY + 30} 100 ${SY}`, { fill: '#ffffff', fillStyle: 'solid' });
    k.arrow([[100, SY], [320, SY + 2], [HX - 6, SY]], { c: INK, w: 4.2, head: 20 });
    k.rect(HX, SY - 74, 200, 148, { fill: BLUE, fillStyle: 'solid', strokeWidth: 3.6 });
    k.text(HX + 100, SY - 22, 'L’effet', { f: 'Poppins', s: 38, w: 800, c: '#fff', a: 'middle', fixed: true });
    k.text(HX + 100, SY + 16, 'le problème', { f: 'Poppins', s: 27, w: 600, c: '#fff', a: 'middle', fixed: true });
    k.text(HX + 100, SY + 48, 'observé', { f: 'Poppins', s: 27, w: 600, c: '#fff', a: 'middle', fixed: true });
    const top = [[192, 'Matière'], [352, 'Méthode'], [512, 'Milieu']];
    const bot = [[262, 'Matériel'], [466, 'Main-d’œuvre']];
    const label = (cx, cy, t) => {
      const tx = k.text(cx, cy + 10, t, { f: 'Poppins', s: 27, w: 600, c: INK, a: 'middle', fixed: true });
      const w = tx.getComputedTextLength() + 28;
      const r = k.rect(cx - w / 2, cy - 23, w, 46, { fill: '#ffffff', fillStyle: 'solid', strokeWidth: 2.8 });
      k.svg.insertBefore(r, tx);
    };
    const postit = (x, y) => k.rect(x, y, 28, 28, { fill: '#f2d78a', fillStyle: 'solid', strokeWidth: 2.2, roughness: 1 });
    top.forEach(([x, t], i) => {
      const ex = x - 78, ey = 94;
      k.line(x, SY, ex, ey, { strokeWidth: 3.2 });
      label(ex, ey - 28, t);
      const mx = x - 39, my = (SY + ey) / 2 + 6;
      k.line(mx, my, mx + 48, my, { strokeWidth: 2.4 });
      postit(mx + 48, my - 14);
      if (i !== 1) { const nx = x - 62, ny = ey + 30; k.line(nx, ny, nx + 40, ny, { strokeWidth: 2.4 }); postit(nx + 40, ny - 14); }
    });
    bot.forEach(([x, t]) => {
      const ex = x - 78, ey = 380;
      k.line(x, SY, ex, ey, { strokeWidth: 3.2 });
      label(ex, ey + 28, t);
      const mx = x - 42, my = (SY + ey) / 2;
      k.line(mx, my, mx + 48, my, { strokeWidth: 2.4 });
      postit(mx + 48, my - 14);
    });
    k.text(HX + 4, 64, 'les arêtes :', { s: 38, c: BLUE });
    k.text(HX + 4, 100, 'les familles', { s: 38, c: BLUE });
    k.text(HX + 4, 136, 'de causes', { s: 38, c: BLUE });
    k.text(HX + 18, 376, 'une idée', { s: 38, c: BLUE });
    k.text(HX + 18, 414, '= un post-it', { s: 38, c: BLUE });
    k.arrow([[HX + 10, 384], [HX - 18, 362], [HX - 44, 330]], { c: BLUE, w: 2.8, head: 13 });
  },
  /* ---------- 5 POURQUOI : la mauvaise herbe ---------- */
  heroWhy(host, fam, T) {
    const W = 760, H = 470, k = board(host, W, H, fam, T);
    const GX = 150, GY = 120;
    k.rect(14, GY, W - 28, H - GY - 8, { fill: k.soil, fillStyle: 'solid', stroke: 'none' });
    k.curve([[14, GY + 2], [200, GY - 4], [420, GY + 4], [W - 14, GY - 2]], { strokeWidth: 3.6 });
    k.path(`M${GX} ${GY} C ${GX - 4} ${GY - 40} ${GX + 4} ${GY - 70} ${GX} ${GY - 98}`, { strokeWidth: 3.4 });
    k.path(`M${GX} ${GY - 34} C ${GX - 30} ${GY - 30} ${GX - 66} ${GY - 50} ${GX - 82} ${GY - 82} C ${GX - 44} ${GY - 90} ${GX - 12} ${GY - 66} ${GX} ${GY - 34} Z`, { fill: fam, fillStyle: 'solid' });
    k.path(`M${GX} ${GY - 58} C ${GX + 26} ${GY - 54} ${GX + 62} ${GY - 76} ${GX + 76} ${GY - 106} C ${GX + 38} ${GY - 112} ${GX + 10} ${GY - 90} ${GX} ${GY - 58} Z`, { fill: fam, fillStyle: 'solid' });
    k.path(`M${GX} ${GY - 96} C ${GX - 16} ${GY - 102} ${GX - 22} ${GY - 112} ${GX - 20} ${GY - 116} C ${GX - 6} ${GY - 116} ${GX + 2} ${GY - 106} ${GX} ${GY - 96} Z`, { fill: fam, fillStyle: 'solid', strokeWidth: 2.6 });
    const ys = [174, 224, 274, 324, 374], tipY = 428;
    k.curve([[GX, GY], [GX + 8, 150], [GX - 6, 200], [GX + 8, 250], [GX - 6, 300], [GX + 6, 350], [GX - 4, 400], [GX + 2, tipY]], { strokeWidth: 4.4, stroke: '#7a5a1d' });
    [[GX + 4, 150, GX + 46, 168], [GX - 2, 196, GX - 44, 214], [GX + 4, 246, GX + 40, 262], [GX - 2, 300, GX - 40, 316], [GX + 2, 352, GX + 34, 366]].forEach(([a, b, c, d]) =>
      k.curve([[a, b], [(a + c) / 2, b + 12], [c, d]], { strokeWidth: 2.4, stroke: '#7a5a1d' }));
    ys.forEach((y, i) => {
      k.num(GX + (i % 2 ? -4 : 6), y, i + 1, { d: 38, fill: '#ffffff' });
      k.text(GX + 46 + i * 30, y + 12, 'Pourquoi ?', { s: 40, c: BLUE });
    });
    k.circle(GX + 2, tipY, 42, { fill: '#f16969', fillStyle: 'solid', strokeWidth: 3 });
    k.text(GX + 40, tipY + 12, 'La cause racine : ce qu’on traite', { s: 39, c: '#9e2f2f' });
    k.text(GX + 112, 46, 'Le symptôme : ce qu’on voit', { s: 39, c: INK });
    k.arrow([[GX + 104, 38], [GX + 92, 26], [GX + 80, 20]], { c: INK, w: 2.6, head: 12 });
  },

  /* ---------- étapes PARETO ---------- */
  sCollect(host, fam) {
    const k = board(host, 310, 170, fam);
    k.rect(36, 14, 132, 150, { fill: '#ffffff', fillStyle: 'solid' });
    k.rect(76, 6, 52, 18, { fill: BLUE, fillStyle: 'solid', strokeWidth: 2.4 });
    [48, 84, 120].forEach((y, r) => {
      const n = r === 2 ? 3 : 5;
      for (let i = 0; i < Math.min(n, 4); i++) k.line(56 + i * 15, y, 56 + i * 15, y + 26, { strokeWidth: 2.6 });
      if (n === 5) k.line(48, y + 22, 112, y + 4, { strokeWidth: 2.6 });
      if (r < 2) for (let i = 0; i < 2; i++) k.line(126 + i * 13, y, 126 + i * 13, y + 26, { strokeWidth: 2.6 });
    });
    k.text(186, 90, '200', { s: 54, c: BLUE });
    k.text(186, 128, 'arrêts', { s: 38, c: BLUE });
  },
  sSort(host, fam) {
    const k = board(host, 310, 170, fam);
    k.line(12, 150, 128, 150); k.line(182, 150, 298, 150);
    bars(k, 12, 150, 29, 20, [44, 104, 28, 70]);
    bars(k, 182, 150, 29, 20, [104, 70, 44, 28], { vital: 1 });
    k.arrow([[134, 84], [154, 70], [176, 84]], { c: BLUE, w: 3, head: 13 });
  },
  sChart(host, fam) {
    const k = board(host, 310, 170, fam);
    const X0 = 22, X1 = 232, Y0 = 156, YT = 22, HA = Y0 - YT, v = [43, 25, 12, 7, 5, 8], slot = (X1 - X0) / v.length;
    bars(k, X0, Y0, slot, 24, v.map(x => x / 100 * HA), { vital: 3 });
    k.line(X0, YT - 6, X0, Y0); k.line(X0, Y0, X1, Y0); k.line(X1, YT - 6, X1, Y0);
    let c = 0; const pts = [[X0, Y0]]; v.forEach((x, i) => { c += x; pts.push([X0 + (i + 1) * slot, Y0 - c / 100 * HA]); });
    const y80 = Y0 - .8 * HA; k.dash(X0, y80, X1, y80, '#e05252', 2.6);
    k.lin(pts, { strokeWidth: 3, roughness: .2, bowing: 0 });
    pts.slice(1).forEach(p => k.circle(p[0], p[1], 9, { fill: INK, fillStyle: 'solid', strokeWidth: 1, roughness: .2 }));
    k.text(X1 + 6, y80 + 10, '80 %', { f: 'Poppins', s: 30, w: 700, c: '#9e2f2f' });
  },
  sFlag(host, fam) {
    const k = board(host, 310, 170, fam);
    k.line(20, 156, 250, 156);
    bars(k, 20, 156, 38, 26, [92, 56, 34, 22, 14, 10], { vital: 1 });
    const fx = 39; k.line(fx, 64, fx, 12, { strokeWidth: 3 });
    k.poly([[fx, 12], [fx + 46, 24], [fx, 37]], { fill: '#f16969', fillStyle: 'solid', strokeWidth: 2.6 });
    k.text(100, 50, 'on commence', { s: 38, c: BLUE });
    k.text(100, 84, 'ici !', { s: 38, c: BLUE });
  },

  /* ---------- étapes ISHIKAWA ---------- */
  sHead(host, fam) {
    const k = board(host, 310, 170, fam);
    k.arrow([[10, 86], [80, 88], [140, 86]], { c: INK, w: 3.6, head: 16 });
    k.rect(146, 22, 156, 128, { fill: BLUE, fillStyle: 'solid' });
    k.text(224, 82, '86', { f: 'Poppins', s: 44, w: 800, c: '#fff', a: 'middle' });
    k.text(224, 120, 'bourrages', { f: 'Poppins', s: 28, w: 600, c: '#fff', a: 'middle' });
  },
  sBones(host, fam) {
    const k = board(host, 310, 170, fam);
    const SY = 86;
    k.arrow([[10, SY], [120, SY + 1], [226, SY]], { c: INK, w: 3.4, head: 14 });
    k.rect(232, SY - 34, 66, 68, { fill: BLUE, fillStyle: 'solid', strokeWidth: 2.8 });
    [[80, -1], [150, -1], [216, -1], [112, 1], [184, 1]].forEach(([x, d]) => {
      const ex = x - 40, ey = SY + d * 60;
      k.line(x, SY, ex, ey, { strokeWidth: 2.8 });
      k.circle(ex, ey, 38, { fill: '#ffffff', fillStyle: 'solid', strokeWidth: 2.4 });
      k.text(ex, ey + 10, 'M', { f: 'Poppins', s: 28, w: 700, c: INK, a: 'middle' });
    });
  },
  sPostits(host, fam) {
    const k = board(host, 310, 170, fam);
    const SY = 86;
    k.arrow([[10, SY], [120, SY + 1], [226, SY]], { c: INK, w: 3.4, head: 14 });
    k.rect(232, SY - 34, 66, 68, { fill: BLUE, fillStyle: 'solid', strokeWidth: 2.8 });
    [[90, -1], [176, -1], [124, 1], [208, 1]].forEach(([x, d], i) => {
      const ex = x - 44, ey = SY + d * 70;
      k.line(x, SY, ex, ey, { strokeWidth: 2.8 });
      const px = x - 22, py = SY + d * 36;
      k.rect(px + 4, py - 13, 26, 26, { fill: '#f2d78a', fillStyle: 'solid', strokeWidth: 2, roughness: 1 });
      if (i % 2 === 0) k.rect(ex + 4, ey - 8 * d - 13, 26, 26, { fill: '#f2d78a', fillStyle: 'solid', strokeWidth: 2, roughness: 1 });
    });
  },
  sVote(host, fam) {
    const k = board(host, 310, 170, fam);
    [[14, 30, 1], [96, 16, 5], [178, 36, 2]].forEach(([x, y, n]) => {
      k.rect(x, y, 70, 70, { fill: '#f2d78a', fillStyle: 'solid', strokeWidth: 2.6 });
      k.line(x + 12, y + 18, x + 56, y + 18, { strokeWidth: 2 }); k.line(x + 12, y + 32, x + 46, y + 32, { strokeWidth: 2 });
      for (let i = 0; i < n; i++) k.circle(x + 14 + (i % 3) * 20, y + 52 - (i > 2 ? 0 : 0) + (i > 2 ? 0 : 0), 13, { fill: '#f16969', fillStyle: 'solid', strokeWidth: 1.6 });
    });
    k.circle(150, 118, 58, { fill: 'none', strokeWidth: 3.6 });
    k.line(171, 139, 196, 162, { strokeWidth: 5 });
    k.text(206, 150, 'vérifier', { s: 34, c: BLUE });
  },

  /* ---------- étapes 5 POURQUOI ---------- */
  sLook(host, fam) {
    const k = board(host, 310, 170, fam);
    k.rect(20, 52, 170, 100, { fill: '#ffffff', fillStyle: 'solid' });
    k.circle(64, 36, 50, { fill: k.dots, fillStyle: 'solid' });
    k.circle(64, 36, 14, { fill: INK, fillStyle: 'solid', strokeWidth: 1 });
    k.path('M84 54 C 110 70 140 74 176 74', { strokeWidth: 2.6 });
    k.rect(110, 96, 60, 34, { fill: '#f2d78a', fillStyle: 'solid', strokeWidth: 2.2 });
    k.line(14, 158, 200, 158, { strokeWidth: 2.4 });
    k.circle(248, 80, 64, { fill: '#ffffff', fillStyle: 'solid', strokeWidth: 3.6 });
    k.line(270, 104, 296, 136, { strokeWidth: 5.4 });
    k.text(248, 94, '!', { f: 'Poppins', s: 40, w: 800, c: '#9e2f2f', a: 'middle' });
  },
  sBubbles(host, fam) {
    const k = board(host, 310, 170, fam);
    [[34, 8], [120, 62], [206, 116]].forEach(([x, y], i) => {
      k.rect(x, y, 96, 46, { fill: i === 2 ? '#fde4e1' : '#ffffff', fillStyle: 'solid', strokeWidth: 2.8 });
      k.text(x + 48, y + (i === 2 ? 33 : 38), i === 2 ? 'racine' : '?', { s: i === 2 ? 36 : 48, c: i === 2 ? '#9e2f2f' : BLUE, a: 'middle' });
      if (i < 2) k.arrow([[x + 40, y + 50], [x + 46, y + 64], [x + 80, y + 76]], { c: INK, w: 2.4, head: 11 });
    });
  },
  sDonc(host, fam) {
    const k = board(host, 310, 170, fam);
    [[20, 8, '#ffffff'], [20, 64, '#ffffff'], [20, 120, '#fde4e1']].forEach(([x, y, f]) => {
      k.rect(x, y, 120, 40, { fill: f, fillStyle: 'solid', strokeWidth: 2.8 });
      k.line(x + 14, y + 20, x + 100, y + 20, { strokeWidth: 2 });
    });
    k.arrow([[160, 140], [180, 118], [162, 92]], { c: BLUE, w: 2.8, head: 12 });
    k.arrow([[160, 84], [180, 62], [162, 36]], { c: BLUE, w: 2.8, head: 12 });
    k.text(196, 126, 'donc', { s: 38, c: BLUE });
    k.text(196, 70, 'donc', { s: 38, c: BLUE });
  },
  sStandard(host, fam) {
    const k = board(host, 310, 170, fam);
    k.rect(20, 8, 120, 152, { fill: '#ffffff', fillStyle: 'solid' });
    k.rect(20, 8, 120, 30, { fill: BLUE, fillStyle: 'solid', strokeWidth: 2.6 });
    [62, 86, 110].forEach(y => k.line(34, y, 124, y, { strokeWidth: 2 }));
    k.circle(118, 136, 34, { fill: '#88c475', fillStyle: 'solid', strokeWidth: 2.4 });
    k.lin([[106, 136], [115, 145], [130, 126]], { strokeWidth: 3 });
    k.circle(232, 78, 100, { fill: '#ffffff', fillStyle: 'solid', strokeWidth: 3.4 });
    k.path('M 191 57 A 48 48 0 0 1 215 34', { stroke: '#88c475', strokeWidth: 12, roughness: .3 });
    k.line(232, 78, 205, 48, { strokeWidth: 4.4 });
    k.circle(232, 78, 16, { fill: INK, fillStyle: 'solid', strokeWidth: 1 });
    k.text(232, 162, 'repère', { s: 36, c: BLUE, a: 'middle' });
  }
};

/* =========================================================
   Bandeau colorié au feutre (1 unité = 0,1 mm, pseudo-hasard reproductible par fiche)
   ========================================================= */
function inkBand(band, color, seed) {
  const W = 1480, H = Math.round(band.getBoundingClientRect().height / (96 / 25.4) * 10 / (FORMAT === 'a6' ? .87 : 1));
  const svg = NS('svg', { class: 'band-ink', viewBox: `0 0 ${W} ${H + 40}`, style: `height:${(H + 40) / 10}mm` });
  band.insertBefore(svg, band.firstChild);
  let k = 0;
  const R = () => { const x = Math.sin(seed * 91.7 + (k++) * 127.1) * 43758.5453; return x - Math.floor(x); };
  const SW = 46;
  const stroke = (x1, y1, x2, y2, w = SW, o = .86) => {
    const mx = (x1 + x2) / 2 + (R() - .5) * 40, my = (y1 + y2) / 2 + (R() - .5) * 9;
    NS('path', { d: `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`, fill: 'none', stroke: color, 'stroke-width': w, 'stroke-linecap': 'round', opacity: o }, svg);
  };
  const row = (y, amp, w) => {
    let x = -40 - R() * 40;
    while (x < W + 20) {
      const x2 = Math.min(W + 40, x + 620 + R() * 520);
      stroke(x, y + (R() - .5) * amp, x2, y + (R() - .5) * amp, w);
      if (x2 >= W) break;
      x = x2 - 70 - R() * 90;
    }
  };
  for (let y = 0; y < H - 30; y += 34) row(y, 12, SW);
  row(H - 12, 26, SW);               // dernière rangée : bord bas irrégulier, déborde de 1 à 2 mm
  for (let j = 0; j < 3; j++) {      // quelques coups de feutre qui dépassent
    const x = 160 + R() * (W - 360), y = H;
    stroke(x, y, x + 70 + R() * 60, y + 10 + R() * 10, 22, .8);
  }
}

/* =========================================================
   Typographie française et contrôles
   ========================================================= */
function typo(root) {
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), nodes = [];
  while (w.nextNode()) nodes.push(w.currentNode);
  for (const n of nodes) {
    n.nodeValue = n.nodeValue.replace(/'/g, '’')
      .replace(/ ([:;!?»%])/g, ' $1')
      .replace(/« /g, '« ')
      .replace(/(\d) à (\d)/g, '$1 à $2')
      .replace(/(\d) (h|min|°C|semaines|arrêts|bourrages|causes|personnes|fois|équipes|votes)\b/g, '$1 $2')
      .replace(/N° (\d)/g, 'N° $1')
      .replace(/(ligne|étape|ligne d’emballage) (\d)/g, '$1 $2');
  }
}
function checks() {
  const px = 96 / 25.4, out = [];
  document.querySelectorAll('.page').forEach((pg, i) => {
    const sc = FORMAT === 'a6' ? .87 : 1;
    const c = pg.querySelector('.content');
    const kids = [...c.children];
    let used = 0; kids.forEach(k => used += k.getBoundingClientRect().height);
    let free = (c.getBoundingClientRect().height - used) / px / sc;
    const vis = pg.querySelector('.visual');
    if (vis) { const svg = vis.querySelector('svg'); free = (vis.getBoundingClientRect().height - svg.getBoundingClientRect().height) / px / sc; }
    const st = pg.querySelector('.steps');
    if (st) {   // au verso, les étapes s'étirent : on mesure l'espace réellement libre entre elles
      let inner = 0; [...st.children].forEach(k => inner += k.getBoundingClientRect().height);
      const gap = parseFloat(getComputedStyle(c).rowGap) || 0;
      free = (c.getBoundingClientRect().height - (used - st.getBoundingClientRect().height + inner) - gap * (kids.length - 1)) / px / sc;
    }
    out.push(`page ${i + 1} : espace libre ${free.toFixed(1)} mm`);
    if (free < -.3) console.error(`page ${i + 1} : contenu trop haut de ${(-free).toFixed(1)} mm`);
    pg.querySelectorAll('.ill svg').forEach(s => {
      if (getComputedStyle(s).display === 'none') return;
      const r = s.getBoundingClientRect();
      s.querySelectorAll('text').forEach(t => {
        const b = t.getBoundingClientRect();
        if (b.right > r.right + 1 || b.left < r.left - 1 || b.top < r.top - 1 || b.bottom > r.bottom + 1) console.error(`page ${i + 1} : texte d’illustration qui dépasse « ${t.textContent} »`);
      });
    });
    pg.querySelectorAll('.titlebox, .belt, .practice span, .foot .l, .foot .r, .eyebrow, .qr .cap').forEach(el => {
      if (el.scrollWidth > el.clientWidth + 1) console.error(`page ${i + 1} : débordement horizontal ${el.className} « ${el.textContent.slice(0, 30)} »`);
    });
    const pr = pg.getBoundingClientRect();
    pg.querySelectorAll('.qr .url, .qr .cap, .subrow, .eyebrow, .titlebox, .vsub').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width && (r.right > pr.right - 2 || r.left < pr.left)) console.error(`page ${i + 1} : ${el.className} sort de la page`);
    });
    const vs = pg.querySelector('.vsub'), sr = pg.querySelector('.band-v .subrow');
    if (vs && sr && vs.offsetWidth && vs.getBoundingClientRect().right > sr.getBoundingClientRect().left - 4) console.error(`page ${i + 1} : sous-titre du verso trop long`);
    const sub = pg.querySelector('.band-r .subrow'), qr = pg.querySelector('.qr .url');
    if (sub && qr && sub.getBoundingClientRect().right > qr.getBoundingClientRect().left && sub.getBoundingClientRect().top < qr.getBoundingClientRect().bottom) console.error(`page ${i + 1} : sous-titre et QR se chevauchent`);
    const card = pg.querySelector('.qrl .card');
    if (card) { const d = (card.getBoundingClientRect().top - pg.getBoundingClientRect().top) / px; if (d < 3) console.error(`page ${i + 1} : QR à ${d.toFixed(1)} mm du bord de coupe`); }
    if (/[—–⚠]/.test(pg.textContent)) console.error(`page ${i + 1} : tiret long ou symbole interdit`);
  });
  return out;
}


/* =========================================================
   Cartes : chaque fichier cards/<deck>/<id>.js appelle addCard({...})
   ========================================================= */
const CARDS = [];
function addCard(C) {
  if (C.draw) for (const k in C.draw) {
    if (DRAW[k] && !(C.reuse || []).includes(k)) console.error(`dessin « ${k} » déjà défini : préfixer le nom avec l’identifiant de la carte`);
    DRAW[k] = C.draw[k];
  }
  CARDS.push(C);
}
// Page libre (introduction, guide, sommaire, glossaire, tableau…) : en-tête, contenu HTML, pied de page
function pageLibre(F, P, k, total) {
  const side = P.side || 'n';
  return `<section class="page libre v2 lean${P.cls ? ' ' + P.cls : ''}" style="${pageVars(F)}">
  ${headerLean({ ...F, title: P.title || F.title, belt: P.belt === undefined ? F.belt : P.belt }, side)}
  <div class="content">${P.html}</div>
  ${footer(F, side === 'v' ? 'v' : 'r', P.right ?? (total > 1 ? `${k + 1}/${total}` : ''))}
</section>`;
}
function cardPages(F) {
  if (F.kind === 'libre') return F.pages.map((P, k) => ({ html: pageLibre(F, P, k, F.pages.length), css: P.css || '' }));
  return [{ html: recto3(F) }, { html: verso(F) }];
}
// Le titre se réduit s'il est trop large (jusqu'à 18 pt), sinon erreur : raccourcir ou fournir titleV
function fitTitles() {
  document.querySelectorAll('.band-l .titlebox').forEach((tb, i) => {
    const pg = tb.closest('.page'), side = pg.querySelector('.band-l .side');
    const pr = pg.getBoundingClientRect(), px = 96 / 25.4;
    const sideR = side && side.offsetWidth ? side.getBoundingClientRect() : null;
    const overlapsSide = r => sideR && r.bottom > sideR.top && r.top < sideR.bottom;
    let fs = parseFloat(getComputedStyle(tb).fontSize);
    const limit = () => { const r = tb.getBoundingClientRect(); return overlapsSide(r) ? sideR.left - 3 * px : pr.right - 8 * px; };
    while (tb.getBoundingClientRect().right > limit() && fs > 24) { fs -= 1; tb.style.fontSize = fs + 'px'; }
    if (tb.getBoundingClientRect().right > limit()) console.error(`page ${i + 1} : titre trop long « ${tb.textContent} » (raccourcir ou fournir titleV)`);
  });
}
function checkOverflowX() {
  const px = 96 / 25.4;
  document.querySelectorAll('.page').forEach((pg, i) => {
    const c = pg.querySelector('.content'); if (!c) return;
    const cr = c.getBoundingClientRect();
    c.querySelectorAll('*').forEach(el => {
      if (el.closest('svg') && el.tagName.toLowerCase() !== 'svg') return;
      const r = el.getBoundingClientRect();
      if (r.width && (r.right > cr.right + .6 * px || r.left < cr.left - .6 * px)) console.error(`page ${i + 1} : élément qui dépasse à droite ou à gauche « ${(el.textContent || el.tagName).trim().slice(0, 40)} »`);
    });
  });
}
function renderDeck(list) {
  document.body.classList.add(FORMAT);
  if (BLEED) document.body.classList.add('bleed');
  if (PARAMS.get('tint')) document.body.style.setProperty('--tint', PARAMS.get('tint') + '%');
  const PAGE = FORMAT === 'a6' ? [105, 148] : [148, 210];
  document.head.insertAdjacentHTML('beforeend', `<style>@page{size:${PAGE[0] + (BLEED ? 6 : 0)}mm ${PAGE[1] + (BLEED ? 6 : 0)}mm;margin:0}</style>`);
  const root = document.getElementById('deck');
  const sheets = [], files = [], css = new Set();
  let pageNo = 0;
  list.forEach(F => {
    const pages = cardPages(F);
    const first = pageNo + 1;
    pages.forEach((P, k) => {
      pageNo++;
      if (P.css) css.add(P.css);
      sheets.push(`<div class="sheet" style="${pageVars(F)}" data-card="${F.id}" data-name="${F.id}-${String(k + 1).padStart(2, '0')}">${P.html}</div>`);
    });
    files.push([F.id, `${first}-${pageNo}`]);
  });
  if (css.size) document.head.insertAdjacentHTML('beforeend', `<style>${[...css].join('\n')}</style>`);
  root.innerHTML = sheets.join('');
  window.__files = files;
  typo(root);
  document.fonts.ready.then(() => {
    document.querySelectorAll('.sheet').forEach(sh => {
      const F = list.find(c => c.id === sh.dataset.card), fam = FAM[F.fam].c;
      sh.querySelectorAll('[data-draw]').forEach(h => {
        const fn = DRAW[h.dataset.draw];
        if (!fn) { console.error(`dessin inconnu « ${h.dataset.draw} » (${F.id})`); return; }
        const fig = h.closest('.visual');
        try {
          if (fig) {   // visuel pièce maîtresse : il prend toute la hauteur libre
            const H = Math.max(700, Math.min(1100, Math.floor(1320 * (fig.clientHeight - 4) / fig.clientWidth)));
            fn(h, fam, 1, H);
          } else fn(h, fam, 1, h.dataset.h ? +h.dataset.h : undefined);
        } catch (e) { console.error(`dessin « ${h.dataset.draw} » en erreur (${F.id}) : ${e.message}`); }
        typo(h);
      });
    });
    fitTitles();
    document.querySelectorAll('.band-l').forEach((b, i) => {
      const e = b.querySelector('.eyebrow').getBoundingClientRect(), d = b.querySelector('.side').getBoundingClientRect();
      if (d.width && e.right > d.left - 8 && e.bottom > d.top && e.top < d.bottom) console.error(`bandeau ${i + 1} : le numéro touche le bloc de droite`);
    });
    checkOverflowX();
    window.__report = checks();
    window.__ready = true;
  });
}
