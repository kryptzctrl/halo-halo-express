const T = [
  ["Red Beans", "#8b2f2f", "🫘"],
  ["White Beans", "#eee6d6", "⚪"],
  ["Banana", "#f6d84a", "🍌"],
  ["Jackfruit", "#f2b705", "🟡"],
  ["Kamote", "#e0762f", "🍠"],
  ["Nata Gel", "#7fd4f5", "🧊"],
  ["Macapuno", "#f4efe6", "🥥"],
  ["Sago Pearls", "#3a2a22", "🧋"],
  ["Gulaman", "#3fbf7f", "🟩"],
  ["Leche Flan", "#d98a2b", "🍮"],
  ["Ube Halaya", "#7a4fc0", "🟣"],
  ["Pinipig", "#d9c27a", "🌾"],
  ["Ube Ice Cream", "#b48be0", "🍨"],
  ["Sweet Corn", "#f7d54a", "🌽"],
  ["Buko Strips", "#f4efe6", "🥥"],
];
const SIZES = [
  ["MINI", 2, 45],
  ["SEMI", 3, 45],
  ["GRANDE", 4, 45],
  ["FULL", 5, 45],
];
const $ = (id) => document.getElementById(id);
let DF = 1,
  NW = -1,
  mus = 1,
  mt = 0,
  mi = 0,
  vm = ld("hhx_vm", 1),
  vs = ld("hhx_vs", 1);
const Q = [];
function ld(k, d) {
  try {
    const v = localStorage.getItem(k);
    return v == null ? d : JSON.parse(v);
  } catch (e) {
    return d;
  }
}
function sv(k, v) {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch (e) {}
}
let TUT = ld("hhx_tut", 0) ? -1 : 0;
const REC = [
  ["Mais con Yelo", [13, 11], null, 2],
  ["Ube Overload", [10, 12, 11], 12, 2],
  ["Buko Pandan", [14, 8, 7], null, 3],
  ["Special Halo-Halo", [0, 2, 3, 9, 12], 12, 4],
  ["Halo-Halo Royale", [1, 4, 6, 9, 12], 12, 5],
];
const RL = ["", "Lola", "Tricycle Driver", "Estudyante", "Balikbayan"];
const RX = {
  1: `<g fill="#fff" opacity=".55"><circle cx="26" cy="140" r="4"/><circle cx="94" cy="150" r="4"/><circle cx="60" cy="158" r="4"/></g>`,
  2: `<path d="M8 150 H112 M8 162 H112" stroke="#fff" stroke-width="5" opacity=".8"/>`,
  3: `<path d="M52 108 L68 108 L60 128Z" fill="#c0392b"/>`,
  4: `<g fill="#ffd54f"><circle cx="24" cy="135" r="5"/><circle cx="96" cy="145" r="5"/><circle cx="56" cy="156" r="5"/><circle cx="76" cy="132" r="4"/></g>`,
};
const ACH = [
  ["First Order", "Serve your first order", () => S.srv >= 1],
  ["Combo x5", "5 correct orders in a row", () => S.cb >= 5],
  ["Mix Master", "Stir 10 glasses", () => +ld("hhx_mx", 0) >= 10],
  ["Day 5", "Reach Day 5", () => S.lv >= 5],
  ["Recipe Collector", "Discover 3 recipes", () => ld("hhx_rb", []).length >= 3],
  ["Perfect Day", "Finish a day with no mistakes", () => S.perfect],
];
function chkAch() {
  const a = ld("hhx_ach", []);
  ACH.forEach((x) => {
    if (!a.includes(x[0]) && x[2]()) {
      a.push(x[0]);
      sv("hhx_ach", a);
      toast("🏆 Award unlocked: " + x[0]);
    }
  });
}
function tone(f, d, type, v) {
  if (!snd || !mus) return;
  try {
    AC = AC || new AudioContext();
    const o = AC.createOscillator(),
      g = AC.createGain();
    o.type = type;
    o.frequency.value = f;
    g.gain.value = Math.max(0.0001, v * vm);
    o.connect(g);
    g.connect(AC.destination);
    o.start();
    g.gain.exponentialRampToValueAtTime(0.001, AC.currentTime + d);
    o.stop(AC.currentTime + d);
  } catch (e) {}
}
const MEL = [392, 440, 523, 440, 392, 330, 392, 0, 330, 392, 440, 392, 330, 294, 330, 0],
  BAS = [196, 196, 262, 262, 175, 175, 196, 196];
function musTick() {} // old beeps replaced by audio/bgm.mp3
const TS = [
  "Drag the Ice Shaver into a glass (or click it)",
  "Now drag the Evap Milk in",
  "Add the toppings shown in the order bubble",
  "Drag the Mix-Mix Spoon in circles over the glass",
  "Now press Serve Glass!",
];
function tutUI() {
  document.querySelectorAll(".hl").forEach((e) => e.classList.remove("hl"));
  const t = $("tutb");
  if (TUT < 0 || !S.run || !C || S.pause) {
    t.style.display = "none";
    return;
  }
  const g = G[sel],
    st = !g.ice ? 0 : !g.milk ? 1 : !C.order.every((x) => g.t.includes(x)) ? 2 : !g.mx ? 3 : 4;
  t.style.display = "block";
  t.textContent = TS[st];
  const els =
    st == 0
      ? [$("bIce")]
      : st == 1
        ? [$("bMilk")]
        : st == 2
          ? C.order
              .filter((x) => !g.t.includes(x))
              .map((i) => document.querySelector(`.tp[data-t="${i}"]`))
          : st == 3
            ? [$("bSpoon")]
            : [document.querySelector(".gl.sel .serve")];
  els.forEach((e) => e && e.classList.add("hl"));
}
const bean = (f, k) =>
  `<g fill="${f}" stroke="${k}" stroke-width="1"><ellipse cx="13" cy="14" rx="8" ry="5" transform="rotate(-30 13 14)"/><ellipse cx="27" cy="17" rx="8" ry="5" transform="rotate(25 27 17)"/><ellipse cx="18" cy="29" rx="8" ry="5" transform="rotate(-8 18 29)"/></g><g fill="#fff" opacity=".4"><ellipse cx="11" cy="12" rx="3" ry="1.2" transform="rotate(-30 11 12)"/><ellipse cx="25" cy="15" rx="3" ry="1.2" transform="rotate(25 25 15)"/><ellipse cx="16" cy="27" rx="3" ry="1.2" transform="rotate(-8 16 27)"/></g>`;
const IC = {
  0: bean("#9b2c2c", "#5e1414"),
  1: bean("#f6f0e0", "#bdb298"),
  2: `<g fill="#f8e07a" stroke="#d6a82c" stroke-width="1.5"><circle cx="13" cy="13" r="8.5"/><circle cx="28" cy="16" r="8.5"/><circle cx="18" cy="29" r="8.5"/></g><g fill="none" stroke="#e8c04a"><circle cx="13" cy="13" r="5"/><circle cx="28" cy="16" r="5"/><circle cx="18" cy="29" r="5"/></g><g fill="#a8741a"><circle cx="13" cy="13" r="1.4"/><circle cx="28" cy="16" r="1.4"/><circle cx="18" cy="29" r="1.4"/></g>`,
  3: `<g fill="#f6b92e" stroke="#c07f0c" stroke-width="1.2"><path d="M5 22 Q8 8 22 9 Q20 22 5 22Z"/><path d="M18 33 Q16 18 32 16 Q36 30 18 33Z"/><path d="M20 8 Q32 6 35 14 Q26 16 20 8Z"/></g><path d="M9 18 Q14 12 19 12 M22 28 Q26 22 31 21" stroke="#fff" opacity=".45" fill="none" stroke-width="1.5"/>`,
  4: `<g stroke="#a54a14" stroke-width="1.2"><rect x="5" y="12" width="15" height="15" rx="2.5" fill="#ee8c3b" transform="rotate(-10 12 19)"/><rect x="21" y="9" width="14" height="14" rx="2.5" fill="#f19a4c" transform="rotate(12 28 16)"/><rect x="14" y="24" width="14" height="13" rx="2.5" fill="#e67a2a" transform="rotate(-4 21 30)"/></g><path d="M7 24 L19 22 M24 20 L34 22 M16 35 L27 34" stroke="#6d3a7a" stroke-width="2"/>`,
  5: `<g fill="#cdeffd" fill-opacity=".85" stroke="#7ec6e6" stroke-width="1.2"><rect x="5" y="9" width="14" height="14" rx="3"/><rect x="21" y="12" width="14" height="14" rx="3"/><rect x="12" y="24" width="14" height="13" rx="3"/></g><g fill="#fff" opacity=".85"><rect x="7" y="11" width="5" height="2" rx="1"/><rect x="23" y="14" width="5" height="2" rx="1"/><rect x="14" y="26" width="5" height="2" rx="1"/></g>`,
  6: `<g fill="none" stroke-linecap="round"><path d="M5 14 Q13 5 21 14 T36 12 M4 24 Q12 15 20 24 T35 22 M7 33 Q15 26 23 33 T36 31" stroke="#d9cfb6" stroke-width="5"/><path d="M5 14 Q13 5 21 14 T36 12 M4 24 Q12 15 20 24 T35 22 M7 33 Q15 26 23 33 T36 31" stroke="#fffaf0" stroke-width="3"/></g>`,
  7: `<g fill="#2e211b" stroke="#120c09"><circle cx="12" cy="13" r="6"/><circle cx="27" cy="12" r="6"/><circle cx="19" cy="27" r="6.5"/><circle cx="33" cy="28" r="4"/><circle cx="6" cy="30" r="4"/></g><g fill="#fff" opacity=".45"><circle cx="10" cy="11" r="1.8"/><circle cx="25" cy="10" r="1.8"/><circle cx="17" cy="25" r="2"/></g>`,
  8: `<g stroke-width="1.2"><rect x="5" y="9" width="14" height="14" rx="3" fill="#3fbf7f" stroke="#1f8a52"/><rect x="21" y="12" width="14" height="14" rx="3" fill="#e0494f" stroke="#a02a30"/><rect x="12" y="24" width="14" height="13" rx="3" fill="#35b070" stroke="#1f8a52"/></g><g fill="#fff" opacity=".5"><rect x="7" y="11" width="5" height="2" rx="1"/><rect x="23" y="14" width="5" height="2" rx="1"/><rect x="14" y="26" width="5" height="2" rx="1"/></g>`,
  9: `<path d="M5 30 L9 15 L31 15 L35 30Q20 34 5 30Z" fill="#f2bf55" stroke="#c9902a" stroke-width="1.2"/><path d="M9 15 L31 15 L32 20 Q28 24 25 20 Q22 25 19 20 Q15 24 13 20 Q10 23 8 20Z" fill="#8b4a12"/><ellipse cx="20" cy="15" rx="11" ry="2" fill="#a85c1a"/>`,
  10: `<path d="M6 30 Q4 20 12 16 Q10 8 20 8 Q30 8 28 16 Q36 20 34 30 Q20 36 6 30Z" fill="#7a4fc0" stroke="#4d2a8a" stroke-width="1.4"/><path d="M12 24 Q20 18 28 24" fill="none" stroke="#a98be0" stroke-width="2" stroke-linecap="round"/><ellipse cx="15" cy="17" rx="3" ry="1.5" fill="#fff" opacity=".35"/>`,
  11: `<g fill="#e8d49a" stroke="#b9a05a"><ellipse cx="11" cy="12" rx="6" ry="3" transform="rotate(-20 11 12)"/><ellipse cx="27" cy="11" rx="6" ry="3" transform="rotate(25 27 11)"/><ellipse cx="18" cy="22" rx="6" ry="3" transform="rotate(5 18 22)"/><ellipse cx="9" cy="30" rx="6" ry="3" transform="rotate(30 9 30)"/><ellipse cx="29" cy="30" rx="6" ry="3" transform="rotate(-25 29 30)"/></g>`,
  12: `<path d="M10 30 L20 39 L30 30Z" fill="#e0a85a" stroke="#b07a2a"/><path d="M7 22 Q6 5 20 5 Q34 5 33 22 Q34 28 29 28 Q27 33 24 28 Q21 31 18 28 Q14 31 12 28 Q6 29 7 22Z" fill="#b48be0" stroke="#7d54b8" stroke-width="1.3"/><ellipse cx="14" cy="13" rx="4" ry="2.5" fill="#fff" opacity=".5"/>`,
  ice: `<rect x="9" y="4" width="22" height="15" rx="3" fill="#dff3ff" stroke="#8cc9ee" stroke-width="1.5"/><rect x="12" y="7" width="7" height="3" rx="1.5" fill="#fff"/><rect x="5" y="19" width="30" height="7" rx="2" fill="#9aa5b1" stroke="#5f6b78"/><rect x="11" y="26" width="18" height="8" fill="#6b7682"/><circle cx="35" cy="14" r="3" fill="#d4a017"/><path d="M32 14 L36 22" stroke="#d4a017" stroke-width="2"/><path d="M14 37 L26 37" stroke="#e8f6ff" stroke-width="3" stroke-linecap="round"/>`,
  milk: `<rect x="9" y="8" width="22" height="28" rx="3" fill="#f1f1f1" stroke="#999"/><rect x="9" y="14" width="22" height="16" fill="#2b6cb0"/><ellipse cx="20" cy="8" rx="11" ry="3" fill="#d8d8d8" stroke="#999"/><text x="20" y="25" font-size="7" font-weight="700" text-anchor="middle" fill="#fff" font-family="Arial">MILK</text>`,
  fz: `<g stroke="#7fd4f5" stroke-width="3" stroke-linecap="round"><path d="M20 4 V36 M6 12 L34 28 M6 28 L34 12"/></g><g stroke="#bfeaff" stroke-width="2" stroke-linecap="round" fill="none"><path d="M15 6 L20 11 L25 6 M15 34 L20 29 L25 34"/></g>`,
  trash: `<g fill="#fff"><rect x="9" y="12" width="22" height="24" rx="3" opacity=".92"/><rect x="6" y="8" width="28" height="4" rx="2"/><rect x="16" y="4" width="8" height="4" rx="1.5"/></g><g stroke="#c0392b" stroke-width="2.5" stroke-linecap="round"><path d="M15 17 V31 M20 17 V31 M25 17 V31"/></g>`,
  cube: `<rect x="8" y="8" width="24" height="24" rx="4" fill="#d8f1ff" fill-opacity=".9" stroke="#8cc9ee" stroke-width="1.6"/><rect x="11" y="11" width="9" height="3" rx="1.5" fill="#fff"/>`,
  logo: `<path d="M5 6 L35 6 L30 36 Q20 39 10 36Z" fill="#fff" fill-opacity=".25" stroke="#fff" stroke-width="1.8"/><path d="M8 27 L32 27 L30 36 Q20 39 10 36Z" fill="#b48be0"/><path d="M7 20 H33 L32 27 H8Z" fill="#f7efdc"/><circle cx="14" cy="16" r="3" fill="#e0494f"/><circle cx="22" cy="14" r="3" fill="#f6b92e"/><circle cx="28" cy="16" r="3" fill="#3fbf7f"/><path d="M11 7 H29 Q27 12 20 11 Q13 12 11 7Z" fill="#f6fcff"/>`,
};
IC[13] = `<g fill="#f7d54a" stroke="#c9a021" stroke-width="1"><rect x="5" y="6" width="8" height="10" rx="3"/><rect x="15" y="4" width="8" height="10" rx="3"/><rect x="26" y="7" width="8" height="10" rx="3"/><rect x="9" y="18" width="8" height="10" rx="3"/><rect x="20" y="18" width="8" height="10" rx="3"/><rect x="12" y="29" width="8" height="8" rx="3"/><rect x="29" y="22" width="7" height="9" rx="3"/></g><g fill="#fff" opacity=".5"><circle cx="8" cy="9" r="1.5"/><circle cx="18" cy="7" r="1.5"/><circle cx="23" cy="21" r="1.5"/></g>`;
IC[14] = `<g fill="none" stroke-linecap="round"><path d="M6 10 L30 6 M5 21 L35 17 M8 31 L32 29" stroke="#d9cfb6" stroke-width="7"/><path d="M6 10 L30 6 M5 21 L35 17 M8 31 L32 29" stroke="#fffaf0" stroke-width="4.5"/></g>`;
IC.spoon = `<path d="M8 35 L24 15" stroke="#b8860b" stroke-width="4" stroke-linecap="round"/><ellipse cx="29" cy="10" rx="8" ry="6" transform="rotate(-50 29 10)" fill="#e8e8e8" stroke="#999" stroke-width="1.5"/>`;
IC.turon = `<rect x="4" y="15" width="32" height="12" rx="6" fill="#d9902f" stroke="#8a5412" stroke-width="1.5" transform="rotate(-20 20 21)"/><path d="M10 26 L30 14 M14 30 L34 18" stroke="#f3c26a" stroke-width="2" opacity=".7"/><g fill="#fff6d8"><circle cx="14" cy="22" r="1"/><circle cx="22" cy="18" r="1"/><circle cx="28" cy="23" r="1"/></g>`;
IC.cue = `<path d="M20 2 V38" stroke="#c9a46a" stroke-width="2.5"/><g fill="#b8721f" stroke="#7a4710"><ellipse cx="20" cy="9" rx="9" ry="5"/><ellipse cx="20" cy="19" rx="9" ry="5"/><ellipse cx="20" cy="29" rx="9" ry="5"/></g><g fill="#f0c36a" opacity=".65"><ellipse cx="16" cy="8" rx="4" ry="1.5"/><ellipse cx="16" cy="18" rx="4" ry="1.5"/><ellipse cx="16" cy="28" rx="4" ry="1.5"/></g>`;
IC.juice = `<path d="M10 14 L30 14 L27 36 Q20 38 13 36Z" fill="#fffaf0" stroke="#bbb" stroke-width="1.5"/><path d="M26 14 L30 3 H34" stroke="#e0494f" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M11 20 H29" stroke="#d9cfb6" stroke-width="1.5"/><circle cx="20" cy="28" r="3" fill="#fff" opacity=".8"/>`;
const svg = (k) => `<svg viewBox="0 0 40 40">${IC[k]}</svg>`;
const TC = {};
const tile = (i) =>
  TC[i] ||
  (TC[i] =
    "data:image/svg+xml," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">${IC[i]}</svg>`,
    ));

const GSVG = `<svg viewBox="0 0 100 150"><path d="M0 2 L100 2 L86 141 Q84 148 75 149 L25 149 Q16 148 14 141Z" fill="#ffffff12" stroke="#eaf5ff" stroke-width="2.5" vector-effect="non-scaling-stroke" stroke-linejoin="round"/><ellipse cx="50" cy="3" rx="50" ry="4" fill="#ffffff22" stroke="#fff" stroke-width="2" vector-effect="non-scaling-stroke"/><path d="M22 138 Q50 146 78 138" fill="none" stroke="#ffffff66" stroke-width="2" vector-effect="non-scaling-stroke"/><path d="M12 16 L22 122" stroke="#ffffff88" stroke-width="5" stroke-linecap="round" vector-effect="non-scaling-stroke"/><path d="M90 24 L83 84" stroke="#ffffff44" stroke-width="3" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>`;
const BG = [
  "linear-gradient(#7fc8f8,#ffe2b0 70%)",
  "linear-gradient(#f29a5c,#ffd08a 70%)",
  "linear-gradient(#3b4a8a,#d27a7a 75%)",
  "linear-gradient(#1b2a5a,#5a3a7a 75%)",
];
const HI = [
  ["Pabili po ng halo-halo!", "Hello! One halo-halo please."],
  ["Ang init! Isang halo-halo po.", "It's so hot! One halo-halo please."],
  ["Pa-order po, ate/kuya!", "Excuse me, I'd like to order."],
  ["Gutom na ako, bilis po!", "I'm so hungry, please hurry!"],
  ["Isa pong special, please!", "One special halo-halo please!"],
  ["Masarap 'yan, pabili!", "That looks delicious, I'll have one!"],
];
let S = {},
  G,
  sel,
  C,
  loop,
  timer,
  snd = 1,
  AC;
let best =
  +(function () {
    try {
      return localStorage.getItem("hhx");
    } catch (e) {}
  })() || 0;
function sfx(f, d, type) {
  if (!snd) return;
  try {
    AC = AC || new AudioContext();
    const o = AC.createOscillator(),
      g = AC.createGain();
    o.type = type || "sine";
    o.frequency.value = f;
    g.gain.value = Math.max(0.0001, 0.08 * vs);
    o.connect(g);
    g.connect(AC.destination);
    o.start();
    g.gain.exponentialRampToValueAtTime(0.001, AC.currentTime + d);
    o.stop(AC.currentTime + d);
  } catch (e) {}
}
function pop(t) {
  const e = document.createElement("div");
  e.className = "pop";
  e.textContent = t;
  const r = $("cust").getBoundingClientRect();
  e.style.left = r.left + 20 + "px";
  e.style.top = r.top + "px";
  document.body.appendChild(e);
  setTimeout(() => e.remove(), 1000);
}
const rnd = (a) => a[Math.floor(Math.random() * a.length)];

/* ---------- Drawn customers (realistic shaded SVG portraits) ---------- */
let PID = 0;
const N1 = (n) => Math.round(n * 10) / 10;
/* lighten (f > 0) or darken (f < 0) a #rrggbb colour */
function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16),
    t = f < 0 ? 0 : 255,
    a = Math.abs(f);
  return (
    "#" +
    [n >> 16, (n >> 8) & 255, n & 255]
      .map((v) =>
        Math.round(v + (t - v) * a)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}
const flower = (x, y, c, m) =>
  `<g transform="translate(${x} ${y})"><g fill="${c}" opacity=".85"><circle cy="-2.7" r="2.3"/><circle cx="2.7" r="2.3"/><circle cy="2.7" r="2.3"/><circle cx="-2.7" r="2.3"/></g><circle r="1.4" fill="${m}"/></g>`;

function person(p, mood) {
  const id = "p" + PID++,
    U = (k) => `url(#${id}${k})`;
  const { skin, hair, shirt, style, acc, role } = p;
  const fem = !!p.fem,
    old = role == 1,
    jw = p.jw || 1,
    nw = p.nw || 1,
    bt = p.bt || 1,
    collar = p.collar || role == 3,
    ang = mood == "angry",
    hap = mood == "happy",
    w = 29 * jw;
  const sD = shade(skin, -0.3),
    sDD = shade(skin, -0.55),
    sL = shade(skin, 0.35);
  const hD = shade(hair, -0.35),
    hL = shade(hair, 0.45),
    bro = shade(hair, -0.3);
  const lv =
    parseInt(skin.slice(1, 3), 16) * 0.3 +
    parseInt(skin.slice(3, 5), 16) * 0.59 +
    parseInt(skin.slice(5, 7), 16) * 0.11;
  const lip =
    lv > 185
      ? fem
        ? "#c4636b"
        : "#b97470"
      : lv > 140
        ? fem
          ? "#b2545c"
          : "#a5605c"
        : fem
          ? "#8c444a"
          : "#7a423c";
  const lipD = shade(lip, -0.35),
    lipL = shade(lip, 0.18);
  const X = (s, d) => N1(60 + s * d);

  /* ----- shapes ----- */
  const face = `M60 33 C${N1(60 - w * 0.92)} 33 ${N1(60 - w)} 47 ${N1(60 - w)} 66 C${N1(60 - w)} 82 ${N1(60 - w * 0.66)} 97 60 101 C${N1(60 + w * 0.66)} 97 ${N1(60 + w)} 82 ${N1(60 + w)} 66 C${N1(60 + w)} 47 ${N1(60 + w * 0.92)} 33 60 33Z`;
  const neckP = collar
    ? "M49 88 L49 98 L60 128 L71 98 L71 88Z"
    : "M49 88 L49 106 Q60 126 71 106 L71 88Z";
  const torso =
    "M6 170 C6 132 20 116 42 110 Q47 108.5 49 104 L71 104 Q73 108.5 78 110 C100 116 114 132 114 170Z";

  /* ----- eyes ----- */
  const eyeHu = ang ? 3.1 : hap ? 2.5 : 3.8,
    eyeHl = hap ? 1.4 : 2.3;
  const eyeD = (s) => {
    const cx = X(s, 12.6),
      cy = 67,
      inX = N1(cx - s * 6.3),
      ouX = N1(cx + s * 6.3);
    const up = `M${inX} ${cy + 0.7} Q${cx} ${N1(cy - 2 * eyeHu)} ${ouX} ${cy - 0.2}`;
    return {
      cx,
      cy,
      inX,
      ouX,
      up,
      d: `${up} Q${cx} ${N1(cy + 2 * eyeHl)} ${inX} ${cy + 0.7}Z`,
    };
  };
  const eyeSvg = (s, k) => {
    const e = eyeD(s),
      { cx, cy, inX, ouX } = e;
    return `<ellipse cx="${cx}" cy="${cy - 1}" rx="9" ry="5.8" fill="${sDD}" opacity=".16" filter="${U("b")}"/>
<path d="${e.d}" fill="#f3eee8"/>
<g clip-path="${U("e" + k)}"><circle cx="${cx}" cy="${cy}" r="3.5" fill="${U("i")}"/><circle cx="${cx}" cy="${cy}" r="1.55" fill="#0a0605"/><circle cx="${N1(cx - 1.1)}" cy="${N1(cy - 1.3)}" r=".95" fill="#fff" opacity=".95"/><circle cx="${N1(cx + 1.3)}" cy="${N1(cy + 1)}" r=".42" fill="#fff" opacity=".55"/><rect x="${N1(cx - 7)}" y="${N1(cy - 2 * eyeHu)}" width="14" height="2.6" fill="#000" opacity=".2"/></g>
<path d="${e.up}" fill="none" stroke="#150c09" stroke-width="${fem ? 2 : 1.7}" stroke-linecap="round"/>
${fem ? `<path d="M${ouX} ${cy - 0.2} q${s * 2.2} -0.5 ${s * 3} -2" fill="none" stroke="#150c09" stroke-width="1.2" stroke-linecap="round"/>` : ""}
<path d="M${inX} ${N1(cy - eyeHu - 1.6)} Q${cx} ${N1(cy - 2 * eyeHu - 3)} ${ouX} ${N1(cy - eyeHu - 0.6)}" fill="none" stroke="${sD}" stroke-width="1" opacity=".5" stroke-linecap="round"/>
<path d="M${inX} ${cy + 1.2} Q${cx} ${N1(cy + 2 * eyeHl + 1)} ${ouX} ${cy + 0.9}" fill="none" stroke="${sD}" stroke-width=".8" opacity=".35"/>`;
  };

  /* ----- brows ----- */
  const th = (fem ? 2.1 : 2.8) * bt;
  const [yi, yp, yo] = ang ? [60.2, 56.6, 55.6] : hap ? [56.2, 53.8, 57.2] : [57.4, 55.2, 58.6];
  const brow = (s) =>
    `<path d="M${X(s, 4.5)} ${yi} Q${X(s, 13)} ${N1(yp - 1.6)} ${X(s, 23)} ${yo} Q${X(s, 14)} ${N1(yp - 1.6 + th * 1.9)} ${X(s, 4.5)} ${N1(yi + th)}Z" fill="${bro}"/>`;
  const furrow = ang
    ? `<path d="M57.6 52 Q56.8 55.5 57.6 58.5 M62.4 52 Q63.2 55.5 62.4 58.5" fill="none" stroke="${sDD}" stroke-width="1" opacity=".3" stroke-linecap="round"/>`
    : "";

  /* ----- nose (light from the upper left) ----- */
  const nose = `<path d="M${X(1, 2.6)} 65 Q${X(1, 3.8)} 75 ${X(1, 5)} 81" fill="none" stroke="${sD}" stroke-width="2.4" opacity=".28" stroke-linecap="round"/>
<path d="M${X(-1, 2)} 66 Q${X(-1, 2.8)} 74 ${X(-1, 3.4)} 79" fill="none" stroke="${sL}" stroke-width="2" opacity=".4" stroke-linecap="round"/>
<ellipse cx="60" cy="82.5" rx="${N1(5.6 * nw)}" ry="3.7" fill="${shade(skin, -0.06)}"/>
<ellipse cx="58" cy="81.2" rx="2.2" ry="1.5" fill="${sL}" opacity=".35"/>
<path d="M${X(-1, 5.8 * nw)} 80.6 Q${X(-1, 7.8 * nw)} 84 ${X(-1, 4.8 * nw)} 86 M${X(1, 5.8 * nw)} 80.6 Q${X(1, 7.8 * nw)} 84 ${X(1, 4.8 * nw)} 86" fill="none" stroke="${sD}" stroke-width="1.2" opacity=".55" stroke-linecap="round"/>
<ellipse cx="${X(-1, 2.7)}" cy="84.3" rx="1.8" ry="1.05" fill="${sDD}" opacity=".8"/><ellipse cx="${X(1, 2.7)}" cy="84.3" rx="1.8" ry="1.05" fill="${sDD}" opacity=".8"/>
<ellipse cx="60" cy="87" rx="4.5" ry="1.3" fill="${sDD}" opacity=".18"/>`;

  /* ----- mouth ----- */
  let mouth;
  if (hap)
    mouth = `<path d="M50.8 90.4 Q60 93 69.2 90.4 Q67.6 96.4 60 96.8 Q52.4 96.4 50.8 90.4Z" fill="#4e1519"/>
<path d="M52.2 91 Q60 93.4 67.8 91 L67.2 93.6 Q60 95.6 52.8 93.6Z" fill="#f6f1ea"/>
<path d="M55 95.4 Q60 93.6 65 95.4 Q60 97 55 95.4Z" fill="#b8484f"/>
<path d="M49.6 90.3 Q54.5 87.6 60 88.9 Q65.5 87.6 70.4 90.3 Q60 93.2 49.6 90.3Z" fill="${shade(lip, -0.08)}"/>
<path d="M51.5 93.6 Q60 97.2 68.5 93.6 Q66.5 98.4 60 98.6 Q53.5 98.4 51.5 93.6Z" fill="${lipL}"/>`;
  else if (ang)
    mouth = `<path d="M51.6 94.4 Q55.5 90.4 60 91.2 Q64.5 90.4 68.4 94.4 Q60 92.4 51.6 94.4Z" fill="${shade(lip, -0.12)}"/>
<path d="M53.2 94.2 Q60 92.8 66.8 94.2 Q64.5 98 60 98 Q55.5 98 53.2 94.2Z" fill="${lip}"/>
<path d="M51.6 94.4 Q60 91.7 68.4 94.4" fill="none" stroke="${lipD}" stroke-width="1.2" stroke-linecap="round"/>
<path d="M55.5 99.4 Q60 98 64.5 99.4" fill="none" stroke="${sD}" stroke-width="1" opacity=".4" stroke-linecap="round"/>`;
  else
    mouth = `<path d="M52 91.8 Q56 89.6 60 90.5 Q64 89.6 68 91.8 Q60 93.1 52 91.8Z" fill="${shade(lip, -0.1)}"/>
<path d="M53.5 92.4 Q60 94 66.5 92.4 Q64 97 60 97 Q56 97 53.5 92.4Z" fill="${lipL}"/>
<path d="M52 91.8 Q60 93.3 68 91.8" fill="none" stroke="${lipD}" stroke-width="1.1" stroke-linecap="round"/>
<ellipse cx="60" cy="98.4" rx="4" ry="1.1" fill="${sDD}" opacity=".16"/>`;
  const mustache =
    acc == 3
      ? `<path d="M60 88.2 Q55 85.2 49.5 88.6 Q51 91.4 56 90.2 Q59 89.4 60 89.4 Q61 89.4 64 90.2 Q69 91.4 70.5 88.6 Q65 85.2 60 88.2Z" fill="${shade(hair, -0.05)}"/><path d="M52 88.4 Q55 87.4 58 88.4 M62 88.4 Q65 87.4 68 88.4" fill="none" stroke="${hL}" stroke-width=".7" opacity=".4"/>`
      : "";

  /* ----- skin lines: nasolabial folds, plus age lines for Lola ----- */
  const nlo = old ? 0.35 : hap ? 0.3 : 0.12;
  const lines = [-1, 1]
    .map(
      (s) =>
        `<path d="M${X(s, 9.5)} 84 Q${X(s, 13.5)} 90 ${X(s, 12)} 95" fill="none" stroke="${sDD}" stroke-width="1" opacity="${nlo}" stroke-linecap="round"/>` +
        (old
          ? `<path d="M${X(s, 20.5)} 65 l${s * 4} -1.2 M${X(s, 20.5)} 67.5 l${s * 4.4} .6 M${X(s, 20.5)} 70 l${s * 3.8} 2.2 M${X(s, 7.5)} 72.5 Q${X(s, 12.6)} 75.5 ${X(s, 18)} 72.5" fill="none" stroke="${sDD}" stroke-width=".8" opacity=".3" stroke-linecap="round"/>`
          : ""),
    )
    .join("");
  const forehead = old
    ? `<path d="M42 49 Q60 46 78 49 M44 53 Q60 50.5 76 53" fill="none" stroke="${sDD}" stroke-width=".8" opacity=".2"/>`
    : "";

  /* ----- body ----- */
  const RXs = {
    1:
      flower(22, 140, "#f4c2d7", "#ffd54f") +
      flower(96, 150, "#f4c2d7", "#ffd54f") +
      flower(32, 162, "#f8dbe7", "#ffd54f") +
      flower(84, 134, "#f8dbe7", "#ffd54f") +
      flower(60, 160, "#f4c2d7", "#ffd54f"),
    2: `<path d="M8 148 H112 V155 H8Z M8 160 H112 V167 H8Z" fill="#e3eaee" opacity=".9"/><path d="M8 148 H112 M8 160 H112" stroke="#fff" stroke-width="1" opacity=".7"/>`,
    4:
      flower(24, 136, "#ffd54f", "#c0392b") +
      flower(94, 146, "#fff3e0", "#e67e22") +
      flower(34, 160, "#fff3e0", "#e67e22") +
      flower(82, 132, "#ffd54f", "#c0392b") +
      flower(70, 162, "#ffd54f", "#c0392b"),
  };
  const torsoSvg = `<path d="${torso}" fill="${U("t")}"/>
<path d="M28 128 Q34 148 30 170 M92 128 Q86 148 90 170 M50 140 Q48 156 52 170" fill="none" stroke="${shade(shirt, -0.4)}" stroke-width="1.6" opacity=".25" stroke-linecap="round"/>
<path d="M24 124 C32 117 38 114 44 112" fill="none" stroke="${shade(shirt, 0.55)}" stroke-width="2.6" opacity=".35" stroke-linecap="round"/>
${RXs[role] || ""}`;
  const neckSvg = `<path d="${neckP}" fill="${U("n")}"/><g clip-path="${U("k")}"><ellipse cx="60" cy="97" rx="17" ry="8" fill="${sDD}" opacity=".5" filter="${U("b")}"/></g>`;
  let neckline;
  if (collar) {
    const cf = shade(shirt, 0.1),
      cs = shade(shirt, -0.3);
    const tie = `<path d="M55.5 125.5 L64.5 125.5 L63 132 L57 132Z" fill="#a8281f"/><path d="M57 132 L63 132 L66.5 168 L60 172 L53.5 168Z" fill="#c0392b"/><path d="M58.6 134 L59.4 166" stroke="#fff" stroke-width="1.2" opacity=".25"/>`;
    neckline =
      `<path d="M49 97 L39 113 L56 133 L60 128Z" fill="${cf}" stroke="${cs}" stroke-width="1" stroke-linejoin="round"/><path d="M71 97 L81 113 L64 133 L60 128Z" fill="${shade(shirt, -0.04)}" stroke="${cs}" stroke-width="1" stroke-linejoin="round"/>` +
      (role == 3
        ? tie
        : `<path d="M60 130 L60 170" stroke="${cs}" stroke-width="1.2" opacity=".6"/><circle cx="60" cy="142" r="1.4" fill="${shade(shirt, -0.15)}"/><circle cx="60" cy="156" r="1.4" fill="${shade(shirt, -0.15)}"/>`);
  } else
    neckline = `<path d="M49 106 Q60 126 71 106" fill="none" stroke="${shade(shirt, -0.3)}" stroke-width="2.4" stroke-linecap="round"/><path d="M47.5 107.5 Q60 129 72.5 107.5" fill="none" stroke="${shade(shirt, 0.25)}" stroke-width="1.4" opacity=".5"/>`;

  /* ----- ears, face, skin shading ----- */
  const ear = (s) =>
    `<ellipse cx="${X(s, w - 0.6)}" cy="71" rx="4.4" ry="7.6" fill="${shade(skin, -0.1)}"/><ellipse cx="${X(s, w - 0.2)}" cy="71.5" rx="2" ry="4.6" fill="${sD}" opacity=".55"/>`;
  const faceSvg = `<path d="${face}" fill="${U("s")}"/>
<g clip-path="${U("c")}">
<ellipse cx="60" cy="101" rx="25" ry="9" fill="${sDD}" opacity=".24" filter="${U("b")}"/>
<ellipse cx="53" cy="44" rx="15" ry="7" fill="#fff" opacity=".14" filter="${U("b")}"/>
<ellipse cx="44" cy="77" rx="6" ry="4" fill="${sL}" opacity=".3" filter="${U("b")}"/>
<circle cx="41" cy="81" r="6.5" fill="#e0605f" opacity="${ang ? 0.3 : hap ? 0.26 : 0.13}" filter="${U("b")}"/><circle cx="79" cy="81" r="6.5" fill="#e0605f" opacity="${ang ? 0.3 : hap ? 0.26 : 0.13}" filter="${U("b")}"/>
${ang ? `<path d="${face}" fill="#c0392b" opacity=".1"/>` : ""}
${style == 3 || style == 4 ? `<ellipse cx="60" cy="53" rx="31" ry="6" fill="#000" opacity=".17" filter="${U("b")}"/>` : ""}
${acc == 3 ? `<path d="M31 72 Q33 99 60 102 Q87 99 89 72 Q82 90 60 91 Q38 90 31 72Z" fill="${hair}" opacity=".2" filter="${U("b2")}"/>` : ""}
${lines}${forehead}
</g>`;
  const ring =
    acc == 2
      ? [-1, 1]
          .map((s) =>
            fem
              ? `<circle cx="${X(s, w - 0.4)}" cy="82.5" r="3.2" fill="none" stroke="${U("g")}" stroke-width="1.5"/>`
              : `<circle cx="${X(s, w - 0.4)}" cy="79" r="1.7" fill="${U("g")}"/>`,
          )
          .join("")
      : "";

  /* ----- glasses ----- */
  let glasses = "";
  if (acc == 1) {
    const fc = old ? "#8a6d3b" : "#1c1c1c",
      tint = role == 4;
    const lens = (x0) =>
      `<rect x="${x0}" y="59.5" width="21" height="14.5" rx="6" fill="${tint ? "#2b2118" : U("l")}" ${tint ? 'fill-opacity=".5"' : ""} stroke="${fc}" stroke-width="1.8"/>`;
    glasses =
      lens(34.5) +
      lens(64.5) +
      `<path d="M55.5 65.5 Q60 62.5 64.5 65.5" fill="none" stroke="${fc}" stroke-width="1.6"/><path d="M34.5 64 L${N1(60 - w)} 66 M85.5 64 L${N1(60 + w)} 66" stroke="${fc}" stroke-width="1.5" fill="none"/><path d="M38 63.5 L45 61.5 M68 63.5 L75 61.5" stroke="#fff" stroke-width="1.3" opacity=".55" stroke-linecap="round"/>`;
  }

  /* ----- hair, hats ----- */
  const sheen = (d, sw) =>
    `<path d="${d}" fill="none" stroke="${hL}" stroke-width="${sw || 3.2}" opacity=".32" stroke-linecap="round" filter="${U("b")}"/>`;
  const strand = (d) =>
    `<path d="${d}" fill="none" stroke="${hD}" stroke-width=".9" opacity=".4" stroke-linecap="round"/>`;
  const hf = U("h");
  const H0 = `<path d="M29 69 C24 38 41 23 61 24 C83 24 97 40 91 69 C89 58 86 52 79 47 C71 53 60 46 53 46 C44 47 36 55 33 69 C32 70 30 70 29 69Z" fill="${hf}"/>`;
  const H1 = `<path d="M29 72 C24 38 41 23 60 24 C79 23 96 38 91 72 C90 60 82 48 60 41 C38 48 30 60 29 72Z" fill="${hf}"/>`;
  const H2 = `<path d="M30 64 C26 38 42 26 60 26 C78 26 94 38 90 64 C85 50 74 44 60 44 C46 44 35 50 30 64Z" fill="${hf}"/>`;
  const bob = `<path d="M27 62 C22 86 26 102 34 106 L86 106 C94 102 98 86 93 62Z" fill="${hf}"/>`;
  let back = "",
    locks = "",
    top = "",
    hat = "";
  if (fem && (style == 0 || style == 3 || style == 4)) back = bob;
  if (style == 0) top = H0 + sheen("M40 38 Q58 27 80 38") + strand("M34 62 Q36 44 52 33 M44 60 Q47 42 62 31 M78 50 Q84 44 86 36");
  if (style == 1) {
    back = `<path d="M27 60 C18 90 20 128 30 146 L90 146 C100 128 102 90 93 60Z" fill="${hf}"/>`;
    locks = `<path d="M31 66 C24 90 24 118 30 140 C40 134 43 112 40 88Z" fill="${hf}"/><path d="M89 66 C96 90 96 118 90 140 C80 134 77 112 80 88Z" fill="${hf}"/><path d="M29 90 Q28 112 31 132 M91 90 Q92 112 89 132" fill="none" stroke="${hD}" stroke-width="1" opacity=".4"/>`;
    top =
      H1 +
      `<path d="M60 25 L60 41" stroke="${hD}" stroke-width="1" opacity=".6"/>` +
      sheen("M38 38 Q50 28 58 28 M82 38 Q70 28 62 28") +
      strand("M33 64 Q34 46 54 34 M87 64 Q86 46 66 34");
  }
  if (style == 2) {
    back = `<circle cx="60" cy="20" r="11.5" fill="${hf}"/><path d="M52 18 Q60 12 68 18 M50 22 Q60 28 70 22 M56 12 Q60 20 64 28" fill="none" stroke="${hD}" stroke-width="1" opacity=".45"/>`;
    top =
      H2 +
      sheen("M40 40 Q50 31 60 30 Q70 31 80 40") +
      strand("M40 50 Q46 36 58 28 M80 50 Q74 36 62 28 M52 46 Q56 36 60 29");
  }
  if (style == 3) {
    top = H0;
    hat = `<ellipse cx="60" cy="41" rx="55" ry="9.5" fill="${U("r")}"/>
<ellipse cx="60" cy="41" rx="42" ry="7" fill="none" stroke="#9a7326" stroke-width=".9" opacity=".35"/><ellipse cx="60" cy="41" rx="50" ry="8.6" fill="none" stroke="#9a7326" stroke-width=".8" opacity=".3"/>
<path d="M32 41 C34 18 47 6 60 6 C73 6 86 18 88 41 Q60 47 32 41Z" fill="${U("a")}"/>
<path d="M60 6 L36 43 M60 6 L44 45 M60 6 L52 46 M60 6 L60 46 M60 6 L68 46 M60 6 L76 45 M60 6 L84 43 M33.6 30 Q60 35 86.4 30 M32.4 36 Q60 42 87.6 36" fill="none" stroke="#a47c2c" stroke-width=".8" opacity=".35"/>
<path d="M32 38 Q60 46 88 38 L88 42 Q60 50 32 42Z" fill="#6b3f1d"/>
<path d="M44 20 Q50 11 60 9" fill="none" stroke="#fff" stroke-width="3" opacity=".35" stroke-linecap="round" filter="${U("b")}"/>
<path d="M35 45 Q26 76 46 99 M85 45 Q94 76 74 99" fill="none" stroke="#3a2418" stroke-width=".8" opacity=".5"/>`;
  }
  if (style == 4) {
    top = H0;
    hat = `<path d="M27 44 C25 24 42 14 60 14 C78 14 95 24 93 44 Q60 38 27 44Z" fill="${U("p")}"/>
<path d="M60 14 Q54 28 52 41 M60 14 Q66 28 68 41 M60 14 Q44 24 36 40 M60 14 Q76 24 84 40" fill="none" stroke="${shade(shirt, -0.3)}" stroke-width=".9" opacity=".5"/>
<circle cx="60" cy="14.5" r="2.2" fill="${shade(shirt, -0.15)}"/>
<path d="M23 45 Q60 54 97 45 Q98 49 93 52 Q60 58 27 52 Q22 49 23 45Z" fill="${U("q")}"/>
<path d="M27 44 Q60 50 93 44" fill="none" stroke="${shade(shirt, -0.4)}" stroke-width="1.2"/>
<path d="M36 22 Q46 16 56 15" fill="none" stroke="#fff" stroke-width="3" opacity=".3" stroke-linecap="round" filter="${U("b")}"/>`;
  }
  const crown = `<path d="M40 36 L44 16 L53 28 L60 11 L67 28 L76 16 L80 36 Q60 41 40 36Z" fill="${U("g")}" stroke="#8a6508" stroke-width="1.4" stroke-linejoin="round"/><circle cx="44" cy="16" r="2" fill="#e74c3c"/><circle cx="60" cy="11" r="2.4" fill="#2f80ed"/><circle cx="76" cy="16" r="2" fill="#e74c3c"/><path d="M42 33 Q60 38 78 33" fill="none" stroke="#fff" stroke-width="1" opacity=".5"/>`;

  /* ----- gradients / clip paths (ids are unique per portrait) ----- */
  const defs = `<defs>
<filter id="${id}b" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="1.6"/></filter>
<filter id="${id}b2" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation=".7"/></filter>
<radialGradient id="${id}s" cx=".42" cy=".36" r=".78"><stop offset="0" stop-color="${shade(skin, 0.14)}"/><stop offset=".55" stop-color="${skin}"/><stop offset="1" stop-color="${shade(skin, -0.26)}"/></radialGradient>
<linearGradient id="${id}n" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="${shade(skin, -0.2)}"/><stop offset=".4" stop-color="${shade(skin, -0.04)}"/><stop offset="1" stop-color="${shade(skin, -0.26)}"/></linearGradient>
<linearGradient id="${id}t" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="${shade(shirt, -0.28)}"/><stop offset=".3" stop-color="${shade(shirt, 0.1)}"/><stop offset=".55" stop-color="${shirt}"/><stop offset="1" stop-color="${shade(shirt, -0.32)}"/></linearGradient>
<linearGradient id="${id}h" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${shade(hair, 0.22)}"/><stop offset=".5" stop-color="${hair}"/><stop offset="1" stop-color="${shade(hair, -0.25)}"/></linearGradient>
<radialGradient id="${id}i"><stop offset="0" stop-color="#6e4a2e"/><stop offset=".6" stop-color="#3b2416"/><stop offset="1" stop-color="#1a0f0a"/></radialGradient>
<linearGradient id="${id}l" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity=".05"/></linearGradient>
<linearGradient id="${id}g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#fff1a8"/><stop offset=".5" stop-color="#f5b800"/><stop offset="1" stop-color="#b8860b"/></linearGradient>
<linearGradient id="${id}a" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#b58a37"/><stop offset=".35" stop-color="#e8c775"/><stop offset=".7" stop-color="#d1a653"/><stop offset="1" stop-color="#9a7326"/></linearGradient>
<radialGradient id="${id}r" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#e3bd69"/><stop offset="1" stop-color="#a07a2e"/></radialGradient>
<linearGradient id="${id}p" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="${shade(shirt, -0.25)}"/><stop offset=".35" stop-color="${shade(shirt, 0.12)}"/><stop offset=".6" stop-color="${shirt}"/><stop offset="1" stop-color="${shade(shirt, -0.3)}"/></linearGradient>
<linearGradient id="${id}q" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${shade(shirt, -0.12)}"/><stop offset="1" stop-color="${shade(shirt, -0.42)}"/></linearGradient>
<clipPath id="${id}c"><path d="${face}"/></clipPath><clipPath id="${id}k"><path d="${neckP}"/></clipPath>
<clipPath id="${id}e1"><path d="${eyeD(1).d}"/></clipPath><clipPath id="${id}e0"><path d="${eyeD(-1).d}"/></clipPath>
</defs>`;

  return `<svg viewBox="0 0 120 170" width="100%">${defs}${back}${torsoSvg}${neckSvg}${neckline}${locks}${ear(-1)}${ear(1)}${faceSvg}${ring}${nose}${eyeSvg(-1, 0)}${eyeSvg(1, 1)}${brow(-1)}${brow(1)}${furrow}${mouth}${mustache}${glasses}${top}${hat}${p.vip ? crown : ""}</svg>`;
}
function newLook() {
  const style = Math.floor(Math.random() * 5);
  const fem = style == 1 || style == 2 ? true : Math.random() < 0.4;
  const L = {
    skin: rnd(["#f1c9a5", "#e3b184", "#cf9a6a", "#b97f4f", "#8d5a36"]),
    hair: rnd(["#17100d", "#17100d", "#2b1b13", "#3a2418", "#5a3a22", "#1d2238"]),
    shirt: rnd(["#2f80ed", "#e74c3c", "#27ae60", "#9b59b6", "#f39c12", "#16a085"]),
    style,
    acc: Math.floor(Math.random() * 4),
    collar: Math.random() < 0.3,
    fem,
    jw: fem ? 0.9 + Math.random() * 0.08 : 0.98 + Math.random() * 0.12,
    nw: 0.9 + Math.random() * 0.3,
    bt: 0.85 + Math.random() * 0.4,
  };
  if (fem && L.acc == 3) L.acc = 0; /* no moustaches on women */
  const role = rnd([0, 0, 0, 1, 2, 3, 4]);
  L.role = role;
  if (role == 1)
    Object.assign(L, {
      hair: "#d9d9d9",
      style: 2,
      acc: 1,
      shirt: "#7e57c2",
      collar: false,
      fem: true,
      jw: 0.92,
    });
  if (role == 2)
    Object.assign(L, { style: 4, acc: 3, shirt: "#f5b800", collar: false, fem: false, jw: 1.08 });
  if (role == 3) Object.assign(L, { style: 0, acc: 0, shirt: "#fafafa", collar: true });
  if (role == 4) Object.assign(L, { style: 3, acc: 1, shirt: "#ff7043", collar: false });
  return L;
}

/* ---------- Game ---------- */
function init() {
  S = {
    lv: 1,
    co: 0,
    tg: 250,
    an: 0,
    cb: 0,
    tot: 0,
    pause: 0,
    fc: 2,
    fz: 0,
    pb: 0,
    pm: 1,
    tp: 0.2,
    cs: 5,
    srv: 0,
    wr: 0,
    shop: 0,
    upg: 0,
    ds: 0,
    de: 0,
    dt: 0,
    dw: 0,
    perfect: 0,
    gap: 0,
    sp: 0,
    al: 3,
    w: 0,
    sn: -1,
    bought: [],
    ev: 0,
    evt: 0,
    nev: 45,
    hw: 0,
    po: 0,
    fi: 0,
  };
  Q.length = 0;
  $("evb").style.display = "none";
  $("line").innerHTML = "";
  snkUI();
  $("up").style.display = "none";
  document.body.classList.remove("paused");
  $("bPause").textContent = "⏸";
  G = [0, 1, 2, 3, 4, 5].map(() => ({ ice: 0, milk: 0, t: [], o: [] }));
  sel = 0;
  C = null;
  ui();
  draw();
}
function ui() {
  $("lv").textContent = S.lv;
  $("co").textContent = "₱" + S.co;
  $("tg").textContent = "₱" + S.tg;
  $("an").textContent = S.an + "/" + S.al;
  $("cb").textContent = "x" + S.cb;
  $("bs").textContent = "₱" + best;
  $("wl").textContent = "₱" + S.w;
  $("stage").classList.toggle("bunt", S.bought.includes(1));
  $("fzc").textContent = S.fc + " charges";
  $("stage").style.setProperty("--sky", BG[(S.lv - 1) % BG.length]);
  $("stage").style.setProperty("--dim", [0, 0.08, 0.3, 0.5][(S.lv - 1) % BG.length]);
}
function toast(m) {
  const t = $("toast");
  t.textContent = m;
  t.style.opacity = 1;
  clearTimeout(t._h);
  t._h = setTimeout(() => (t.style.opacity = 0), 1800);
}
const GL = (i) =>
  `<div class="gl" data-i="${i}"><span>Glass #${i + 1}</span><div class="glass"><div class="cup"><div class="stk"></div><i class="tgt"></i></div>${GSVG}</div><button class="serve" data-s="${i}">Serve Glass</button></div>`;
function lyEl(x, i) {
  const e = document.createElement("div");
  e.dataset.k = String(x);
  if (x == "ice") e.className = "ly ice";
  else if (x == "milk") e.className = "ly milk";
  else {
    e.className = "ly tl";
    e.dataset.g = i;
    e.dataset.r = x;
    e.title = T[x][0] + " (click to remove)";
    e.style.cssText = `--c:${T[x][1]};--t1:url('${tile(x)}')`;
  }

  if (x == "ice") {
    for (let j = 0; j < 12; j++) {
      const b = document.createElement("i");
      b.className = "icb";
      b.style.cssText = `left:${(j % 4) * 24 + Math.random() * 8}%;top:${Math.floor(j / 4) * 30 - 8 + Math.random() * 10}%;--r:${Math.random() * 70 - 35}deg;--dl:${Math.random() * 0.5}s`;
      e.appendChild(b);
    }
  } else if (x != "milk") {
    for (let j = 0; j < 15; j++) {
      const q = document.createElement("img");
      q.className = "pc";
      q.src = tile(x);
      q.style.cssText = `left:${(j % 5) * 19 + Math.random() * 6 - 2}%;top:${Math.floor(j / 5) * 32 - 14 + Math.random() * 10}%;--r:${Math.random() * 80 - 40}deg;--r2:${Math.random() * 500 - 250}deg;--dl:${Math.random() * 0.55}s;z-index:${j % 5}`;
      e.appendChild(q);
    }
  }
  return e;
}
function draw() {
  const box = $("glasses");
  box.style.setProperty("--cols", G.length > 6 ? 4 : 3);
  while (box.children.length < G.length)
    box.insertAdjacentHTML("beforeend", GL(box.children.length));
  const tg = C ? (32 + 11 * C.order.length) / 100 : 0;
  G.forEach((g, i) => {
    const el = box.children[i],
      stk = el.querySelector(".stk"),
      cup = el.querySelector(".cup");
    el.classList.toggle("sel", i == sel);
    cup.classList.toggle("mixed", !!g.mx);
    cup.classList.toggle("hastgt", !!C);
    cup.style.setProperty("--f", tg);
    cup.style.setProperty("--u", 100 / (3.2 + (C ? C.order.length : 3)));
    const want = g.o.map(String);
    [...stk.children].forEach((c) => {
      if (!c.classList.contains("rm") && !want.includes(c.dataset.k)) {
        c.classList.add("rm");
        setTimeout(() => c.remove(), 320);
      }
    });
    want.forEach((k, j) => {
      if (![...stk.children].some((c) => c.dataset.k == k && !c.classList.contains("rm"))) {
        const e = lyEl(g.o[j], i);
        if (i == NW && j == g.o.length - 1) e.classList.add("new");
        stk.appendChild(e);
      }
    });
  });
  NW = -1;
  const g = G[sel];
  document.querySelectorAll(".tp").forEach((b, i) => (b.style.opacity = g.t.includes(i) ? 0.4 : 1));
  tutUI();
}
function mk() {
  const prev = C;
  const n = Math.min(5, 2 + Math.floor(Math.random() * (1 + Math.min(3, Math.ceil(S.lv / 1.5)))));
  const pool = T.map((_, i) => i)
    .filter((i) => S.lv >= 3 || i < 13)
    .sort(() => Math.random() - 0.5)
    .slice(0, n);
  const sz = SIZES[Math.min(n, 5) - 2];
  const rr = Math.random(),
    ty = S.lv < 2 ? 0 : rr < 0.12 ? 2 : rr < 0.32 ? 1 : 0;
  const m0 = (Math.max(19, 35 - S.lv * 2) + S.pb) * DF * (1 + 0.08 * (mq() - 1)),
    max = ty == 1 ? m0 * 0.6 : ty == 2 ? m0 * 0.85 : m0;
  const price =
    Math.round(((sz[2] + n * 20) * S.pm * (ty == 1 ? 1.25 : ty == 2 ? 1.6 : 1)) / 5) * 5;
  const C0 = rnd(HI);
  C = {
    look: newLook(),
    order: pool,
    size: sz,
    price,
    pat: max,
    max,
    done: 0,
    ty,
    hi: C0[0],
    he: C0[1],
    vp: 0.85 + Math.random() * 0.45,
  };
  const rc = REC.filter((r) => r[3] <= S.lv);
  if (rc.length && Math.random() < 0.3) {
    const r = rnd(rc);
    C.name = r[0];
    C.order = r[1].slice();
    C.top = r[2];
    C.size = ["SPECIAL"];
    C.price =
      Math.round(((70 + r[1].length * 20 + 25) * S.pm * (ty == 1 ? 1.25 : ty == 2 ? 1.6 : 1)) / 5) *
      5;
  }
  const rl = C.look.role;
  if (rl == 1) {
    C.max *= 1.3;
    C.pat = C.max;
  }
  if (rl == 3) {
    C.max *= 0.85;
    C.pat = C.max;
  }
  if (rl == 2) C.price = Math.round((C.price * 1.1) / 5) * 5;
  if (rl == 4) C.price = Math.round((C.price * 1.3) / 5) * 5;
  if (S.hw) C.price = Math.round((C.price * 1.2) / 5) * 5;
  if (S.lv >= 2 && !C.name && Math.random() < 0.3) {
    C.snack = rnd([0, 1, 2]);
    C.price += 25;
  }
  if (TUT >= 0) {
    C.snack = null;
    C.name = null;
    C.top = null;
    C.order = [0, 9];
    C.size = SIZES[0];
    C.max = C.pat = 90;
    C.ty = 0;
  }
  const k = C;
  C = prev;
  return k;
}
const SN = [
  ["Turon", "turon"],
  ["Banana Cue", "cue"],
  ["Buko Juice", "juice"],
];
const mq = () => (TUT >= 0 ? 1 : Math.min(8, 4 + Math.floor((S.lv - 1) / 2) + (S.hw ? 1 : 0)));
function show() {
  if (!C) return;
  const c = $("cust");
  c.className = "";
  void c.offsetWidth;
  c.className = "in";
  $("bubble").style.display = "block";
  C._m = null;
  render();
  $("bubble").classList.remove("hide");
  draw();
  tutUI();
  drawQ();
}
function newCustomer() {
  if (!S.run) return;
  const k = mk();
  if (!C && !S.gap) {
    C = k;
    show();
  } else {
    Q.push(k);
    drawQ();
  }
}
function drawQ() {
  drawQ0();
  document.querySelectorAll("#line .qi").forEach((el, i) => {
    const k = Q[i];
    if (k && !k._seen) {
      k._seen = 1;
      el.classList.add("qe");
    }
  });
  fitQ();
}
function fitQ() {
  const L = $("line"),
    st = $("stage");
  if (!L || !st) return;
  L.style.transform = "none";
  if (!Q.length) return;
  const mw = st.clientWidth * 0.46,
    mh = Math.max(60, st.clientHeight - 46);
  const sc = Math.min(1, mh / L.offsetHeight, mw / Math.max(L.scrollWidth, 1));
  L.style.transform = sc < 1 ? "scale(" + sc + ")" : "none";
}
window.addEventListener("resize", () => {
  try {
    fitQ();
  } catch (e) {}
});
function drawQ0() {
  $("line").innerHTML = Q.map(
    (k, i) =>
      `<div class="qi${k.sh ? "" : " n"}" data-q="${i}" title="Serve this customer first"><div class="qb"><div></div></div>${person({ ...k.look, vip: k.ty == 2 }, "neutral")}<div class="qo">${k.order.map((x) => `<i class="ci">${svg(x)}</i>`).join("")}</div><small>${k.size[0]} · ₱${k.price}</small></div>`,
  ).join("");
  Q.forEach((k) => (k.sh = 1));
  updQ();
}
function updQ() {
  document.querySelectorAll(".qi .qb div").forEach((b, i) => {
    const k = Q[i];
    if (!k) return;
    const r = k.pat / k.max;
    b.style.width = r * 100 + "%";
    b.style.background = r > 0.4 ? "#2ecc71" : "#e74c3c";
  });
}
function snkUI() {
  document
    .querySelectorAll("[data-sn]")
    .forEach((b) => b.classList.toggle("on", +b.dataset.sn === S.sn));
}
const EVS = [
  ["Heat wave! Orders pay +20% and the line grows", 20, () => (S.hw = 1), () => (S.hw = 0)],
  ["Power outage! No shaved ice for a few seconds", 12, () => (S.po = 1), () => (S.po = 0)],
  ["Fiesta! Tips are doubled", 20, () => (S.fi = 1), () => (S.fi = 0)],
  [
    "School group arrives! Extra customers",
    5,
    () => {
      for (let i = 0; i < 2; i++) Q.push(mk());
      drawQ();
    },
    () => {},
  ],
];
function evTick(dt) {
  if (S.evt > 0) {
    S.evt -= dt;
    if (S.evt <= 0) {
      EVS[S.ev - 1][3]();
      S.ev = 0;
      $("evb").style.display = "none";
      S.nev = 40 + Math.random() * 30;
    }
    return;
  }
  S.nev -= dt;
  if (S.nev <= 0 && S.lv >= 2 && C && TUT < 0) {
    const i = Math.floor(Math.random() * EVS.length),
      e = EVS[i];
    S.ev = i + 1;
    S.evt = e[1];
    e[2]();
    const b = $("evb");
    b.textContent = e[0];
    b.style.display = "block";
    sfx(300, 0.4, "square");
  }
}
const STALL = [
  ["Bigger Fan", "+4s patience", 150, () => (S.pb += 4)],
  ["Banderitas", "+10% on orders", 200, () => (S.pm *= 1.1)],
  ["Extra Glass", "One more glass", 250, () => G.push({ ice: 0, milk: 0, t: [], o: [] })],
  ["Lucky Charm", "1 more angry allowed", 350, () => S.al++],
  ["Radio", "Combo bonus +5", 180, () => (S.cs += 5)],
];
function stallHTML() {
  return (
    `<h3 style="margin:6px 0 0">Stall Shop · Wallet ₱${S.w}</h3><div id="uc">` +
    STALL.map((b, i) => {
      const got = S.bought.includes(i);
      return `<button class="uc" data-b="${i}" ${got || S.w < b[2] || (i == 2 && G.length >= 8) ? "disabled" : ""} style="width:130px;padding:10px;${got ? "opacity:.4" : ""}"><b>${b[0]}</b><small>${got ? "Owned" : b[1] + " · ₱" + b[2]}</small></button>`;
    }).join("") +
    "</div>"
  );
}
const md = () => {
  const r = C.pat / C.max;
  return C.done == 1 ? "happy" : C.done == 2 || r < 0.3 ? "angry" : r < 0.65 ? "neutral" : "happy";
};
function pat() {
  if (!C) return;
  const f = $("pfill");
  if (!f) return render();
  const r = C.pat / C.max;
  f.style.width = r * 100 + "%";
  f.style.background =
    S.fz > 0 ? "#3498db" : r > 0.5 ? "#2ecc71" : r > 0.25 ? "#f1c40f" : "#e74c3c";
  if (md() !== C._m) {
    C._m = md();
    $("cust").innerHTML = person({ ...C.look, vip: C.ty == 2 }, C._m);
  }
}
function render() {
  if (!C) return;
  const r = C.pat / C.max;
  C._m = md();
  $("cust").innerHTML = person({ ...C.look, vip: C.ty == 2 }, C._m);
  $("bubble").innerHTML =
    `<div id="pbar"><div id="pfill" style="width:${r * 100}%;background:${S.fz > 0 ? "#3498db" : r > 0.5 ? "#2ecc71" : r > 0.25 ? "#f1c40f" : "#e74c3c"}"></div></div>${C.name ? `<div style="font-weight:700;color:#7a3b00;font-size:14px">${C.name}</div>` : ""}<span class="tag" style="background:${["#e67e22", "#e74c3c", "#d4a017"][C.ty]}">${["", "⚡ RUSH ", "👑 VIP "][C.ty]}${C.size[0]} • ₱${C.price}</span><div style="font-size:11px;color:#666;font-style:italic;margin-bottom:3px">${RL[C.look.role] ? "<b>" + RL[C.look.role] + "</b> · " : ""}“${C.hi}”</div><div><span class="chip">Ice + Milk</span>${C.snack != null ? `<span class="chip" style="background:#d6f5d6">+ <i class="ci">${svg(SN[C.snack][1])}</i>${SN[C.snack][0]}</span>` : ""}${C.top != null ? `<span class="chip" style="background:#ffe9b0">Add last: <i class="ci">${svg(C.top)}</i>${T[C.top][0]}</span>` : ""}${C.order.map((i) => `<span class="chip"><i class="ci">${svg(i)}</i>${T[i][0]}</span>`).join("")}</div>`;
}
function leave(ok, why) {
  const c = $("cust");
  C.done = ok ? 1 : 2;
  render();
  $("bubble").classList.add("hide");
  const was = C;
  C = null;
  draw();
  S.gap = 1;
  S.sn = -1;
  snkUI();
  setTimeout(() => {
    c.className = ok ? "out" : "bad";
    if (!ok) setTimeout(() => (c.className = "out"), 350);
  }, 150);
  setTimeout(() => {
    S.gap = 0;
    if (!S.run) return;
    C = Q.shift() || null;
    if (C) show();
    else drawQ();
  }, 1250);
}
function angry(why) {
  S.an++;
  S.dw++;
  S.cb = 0;
  sfx(160, 0.3, "sawtooth");
  ui();
  toast(why);
  if (S.an >= S.al) end();
}
function serve(i) {
  if (!C || !S.run) return;
  const g = G[i];
  if (!g.ice && !g.milk && !g.t.length) return toast("That glass is empty!");
  const okSn = C.snack == null ? S.sn < 0 : S.sn === C.snack,
    lt = [...g.o].reverse().find((x) => typeof x == "number"),
    okSet =
      g.ice && g.milk && g.t.length == C.order.length && C.order.every((x) => g.t.includes(x)),
    ok = okSet && okSn && (C.top == null || lt === C.top);
  if (ok) {
    S.cb++;
    S.srv++;
    const tip = C.pat / C.max > 0.5 ? Math.round(C.price * S.tp * (S.fi ? 2 : 1)) : 0,
      cbn = Math.min(S.cb - 1, 5) * S.cs;
    const gain = C.price + tip + cbn + (g.mx ? 15 : 0);
    S.co += gain;
    S.tot += gain;
    S.w += gain;
    S.ds++;
    S.de += gain;
    S.dt += tip;
    if (S.tot > best) {
      best = S.tot;
      try {
        localStorage.setItem("hhx", best);
      } catch (e) {}
    }
    toast(
      `Salamat po! +₱${gain}${tip ? " (fast tip!)" : ""}${cbn ? " 🔥 combo bonus" : ""}${g.mx ? " · mixed +₱15" : ""}`,
    );
    pop("+₱" + gain);
    if (TUT >= 0) {
      TUT = -1;
      sv("hhx_tut", 1);
    }
    const nm = C.name;
    if (nm) {
      const rb = ld("hhx_rb", []);
      if (!rb.includes(nm)) {
        rb.push(nm);
        sv("hhx_rb", rb);
        setTimeout(() => toast("📖 New recipe discovered: " + nm + "!"), 1500);
      }
    }
    setTimeout(chkAch, 300);
    sfx(660, 0.15);
    setTimeout(() => sfx(880, 0.2), 120);
    if (S.co >= S.tg) {
      S.lv++;
      S.co = 0;
      S.tg += 150;
      S.fc++;
      S.upg = 1;
      S.perfect = S.dw == 0;
      sv("hhx_day", S.lv);
      sfx(990, 0.4);
      toast("DAY COMPLETE! +1 Freeze charge");
    }
    ui();
    G[i] = { ice: 0, milk: 0, t: [], o: [] };
    draw();
    leave(true);
    if (S.upg) {
      S.upg = 0;
      setTimeout(shop, 700);
    }
  } else {
    const miss = [];
    if (!g.ice) miss.push("ice");
    if (!g.milk) miss.push("milk");
    C.order.filter((x) => !g.t.includes(x)).forEach((x) => miss.push(T[x][0]));
    const ext = g.t.filter((x) => !C.order.includes(x)).map((x) => T[x][0]);
    S.wr++;
    G[i] = { ice: 0, milk: 0, t: [], o: [] };
    draw();
    leave(false);
    angry(
      "Mali po! " +
        (okSet && !okSn
          ? "Check the snack! "
          : okSet && !ok
            ? "Add " + T[C.top][0] + " last! "
            : "") +
        (miss.length ? "Missing: " + miss.join(", ") + ". " : "") +
        (ext.length ? "Extra: " + ext.join(", ") + "." : ""),
    );
  }
}
function tick(dt) {
  if (!S.run || S.pause) return;
  evTick(dt);
  if (S.sp > 0) S.sp -= dt;
  else {
    const tot = (C ? 1 : 0) + Q.length;
    if (tot < mq()) {
      const n = Math.min(mq() - tot, 1 + Math.floor(S.lv / 3));
      for (let i = 0; i < n; i++) newCustomer();
      S.sp = Math.max(1.2, 3.5 - S.lv * 0.25);
    }
  }
  if (S.fz > 0) {
    S.fz -= dt;
    if (C) pat();
    return;
  }
  for (let i = Q.length - 1; i >= 0; i--) {
    Q[i].pat -= dt;
    if (Q[i].pat <= 0) {
      Q.splice(i, 1);
      drawQ();
      angry("A waiting customer left!");
    }
  }
  if (C) {
    C.pat -= dt;
    if (C.pat <= 0) {
      leave(false, "late");
      angry("Too slow! Customer walked out.");
      return;
    }
    pat();
  }
  updQ();
}
let lt = 0;
function raf(t) {
  if (!S.run) return;
  const dt = Math.min(0.1, Math.max(0, (t - lt) / 1000));
  lt = t;
  tick(dt);
  timer = requestAnimationFrame(raf);
}
function end() {
  S.run = false;
  cancelAnimationFrame(timer);
  $("ov").style.display = "flex";
  $("ov").querySelector("h2").textContent = "Game Over!";
  $("ovt").innerHTML =
    `You reached <b>Level ${S.lv}</b> and earned ₱${S.tot} total.<br>${S.srv} served, ${S.wr} wrong orders.<br>Best run: ₱${best}`;
  $("start").textContent = "Play Again";
}
$("tops").innerHTML = T.map(
  (t, i) => `<button class="tp" data-t="${i}"><i>${svg(i)}</i>${t[0]}</button>`,
).join("");
document.querySelectorAll("[data-ic]").forEach((e) => (e.innerHTML = svg(e.dataset.ic)));
const act = () => S.run && !S.pause;
document.addEventListener("click", (e) => {
  if (!act()) return;
  const s = e.target.closest("[data-s]");
  if (s) return serve(+s.dataset.s);
  const qi = e.target.closest(".qi");
  if (qi && C && !S.gap) {
    const i = +qi.dataset.q;
    [C, Q[i]] = [Q[i], C];
    C._m = null;
    render();
    draw();
    tutUI();
    drawQ();
    return;
  }
  const ly = e.target.closest(".ly[data-r]");
  if (ly) {
    const g = G[+ly.dataset.g];
    g.t = g.t.filter((x) => x != +ly.dataset.r);
    g.o = g.o.filter((x) => x !== +ly.dataset.r);
    sel = +ly.dataset.g;
    sfx(300, 0.08);
    return draw();
  }
  const gl = e.target.closest(".gl");
  if (gl) {
    sel = +gl.dataset.i;
    draw();
  }
});
function fx(gi, k, v) {
  const c = document.querySelector(`.gl[data-i="${gi}"] .cup`);
  if (!c) return;
  const r = c.getBoundingClientRect(),
    x = r.left + r.width / 2;
  if (k == "milk") {
    const e = document.createElement("div");
    e.className = "pour";
    e.style.cssText = `left:${x - 5}px;top:${r.top - 70}px;height:${r.height * 0.5 + 70}px`;
    document.body.appendChild(e);
    setTimeout(() => e.remove(), 750);
    return;
  }
  const em = svg(k == "ice" ? "cube" : v);
  for (let j = 0; j < (k == "ice" ? 14 : 5); j++) {
    const e = document.createElement("div");
    e.className = "fall";
    e.innerHTML = em;
    e.style.cssText = `left:${x - 10 + (Math.random() - 0.5) * r.width * 0.5}px;top:${r.top - 70}px;font-size:${k == "ice" ? 14 : 20}px;animation-delay:${j * (k == "ice" ? 45 : 90)}ms;--d:${r.height * 0.55 + 60}px`;
    document.body.appendChild(e);
    setTimeout(() => e.remove(), 1400);
  }
}
function addItem(gi, k, v) {
  const g = G[gi];
  sel = gi;
  if (k == "ice") {
    if (S.po) return toast("Power outage! No shaved ice right now") || draw();
    if (g.ice) return toast("Already has ice") || draw();
    g.ice = 1;
  } else if (k == "milk") {
    if (g.milk) return toast("Already has milk") || draw();
    g.milk = 1;
  } else {
    if (g.t.includes(v)) return toast("Already added") || draw();
    if (g.t.length >= 6) return toast("Glass is full!") || draw();
    g.t.push(v);
  }
  g.mx = 0;
  g.o.push(k == "top" ? v : k);
  NW = gi;
  sfx(440 + g.t.length * 60, 0.08);
  draw();
  fx(gi, k, v);
}
function drag(el, k, v, label) {
  el.addEventListener("pointerdown", (e) => {
    if (!act()) return;
    e.preventDefault();
    const x0 = e.clientX,
      y0 = e.clientY;
    let gh = null;
    const clr = () => document.querySelectorAll(".gl").forEach((q) => q.classList.remove("over"));
    const mv = (ev) => {
      if (!gh && Math.hypot(ev.clientX - x0, ev.clientY - y0) > 6) {
        gh = document.createElement("div");
        gh.className = "ghost";
        gh.innerHTML = label;
        document.body.appendChild(gh);
      }
      if (gh) {
        gh.style.left = ev.clientX + "px";
        gh.style.top = ev.clientY + "px";
        clr();
        const t = document.elementFromPoint(ev.clientX, ev.clientY),
          q = t && t.closest(".gl");
        if (q) q.classList.add("over");
      }
    };
    const up = (ev) => {
      removeEventListener("pointermove", mv);
      removeEventListener("pointerup", up);
      clr();
      if (gh) {
        gh.remove();
        const t = document.elementFromPoint(ev.clientX, ev.clientY),
          q = t && t.closest(".gl");
        if (q) addItem(+q.dataset.i, k, v);
      } else addItem(sel, k, v);
    };
    addEventListener("pointermove", mv);
    addEventListener("pointerup", up);
  });
}
document.querySelectorAll(".tp").forEach((b) => drag(b, "top", +b.dataset.t, b.innerHTML));
$("bSpoon").addEventListener("pointerdown", (e) => {
  if (!act()) return;
  e.preventDefault();
  const gh = document.createElement("div");
  gh.className = "ghost";
  gh.innerHTML = "<i>" + svg("spoon") + "</i>Stir";
  document.body.appendChild(gh);
  let pa = null,
    acc = 0,
    gi = -1;
  const mv = (ev) => {
    gh.style.left = ev.clientX + "px";
    gh.style.top = ev.clientY + "px";
    const t = document.elementFromPoint(ev.clientX, ev.clientY),
      q = t && t.closest(".gl");
    if (!q) {
      pa = null;
      return;
    }
    const i = +q.dataset.i;
    if (i != gi) {
      gi = i;
      acc = 0;
      pa = null;
    }
    const r = q.querySelector(".cup").getBoundingClientRect(),
      a = Math.atan2(ev.clientY - (r.top + r.height / 2), ev.clientX - (r.left + r.width / 2));
    if (pa !== null) {
      let d = a - pa;
      if (d > Math.PI) d -= 2 * Math.PI;
      if (d < -Math.PI) d += 2 * Math.PI;
      acc += Math.abs(d);
    }
    pa = a;
    if (acc > 8 && !G[i].mx && G[i].o.length > 1) {
      G[i].mx = 1;
      sel = i;
      sv("hhx_mx", +ld("hhx_mx", 0) + 1);
      sfx(520, 0.2);
      draw();
      toast("Mix-mix! Nice stirring (+₱15 on serve)");
      chkAch();
    }
  };
  const up = () => {
    gh.remove();
    removeEventListener("pointermove", mv);
    removeEventListener("pointerup", up);
  };
  addEventListener("pointermove", mv);
  addEventListener("pointerup", up);
});
function setMus() {
  mus = !mus;
  $("bMus").style.opacity = mus ? 1 : 0.4;
  $("mMus").textContent = "🎵 Music: " + (mus ? "On" : "Off");
  bgmPlay();
}
$("bMus").onclick = setMus;
$("mMus").onclick = setMus;
$("mCont").onclick = () => startGame(+ld("hhx_day", 1));
function showBook() {
  const rb = ld("hhx_rb", []),
    ac = ld("hhx_ach", []);
  $("bk").innerHTML =
    `<h2 style="color:#f5b800;margin:0">Recipe Book</h2>` +
    REC.map((r) => {
      const k = rb.includes(r[0]);
      return `<div class="rc"><b>${k ? r[0] : "???"}</b> <small>${k ? "" : "Appears from Day " + r[3] + ". Serve it once to discover it."}</small><div>${k ? r[1].map((i) => `<span class="chip"><i class="ci">${svg(i)}</i>${T[i][0]}</span>`).join("") + (r[2] != null ? `<span class="chip" style="background:#ffe9b0">${T[r[2]][0]} added last</span>` : "") : ""}</div></div>`;
    }).join("") +
    `<h2 style="color:#f5b800;margin:8px 0 0">Awards</h2>` +
    ACH.map(
      (a) =>
        `<div class="rc">${ac.includes(a[0]) ? "✅" : "🔒"} <b>${a[0]}</b> <small>${a[1]}</small></div>`,
    ).join("") +
    `<button class="mb" id="bkx">Close</button>`;
  $("bk").style.display = "flex";
  $("bkx").onclick = () => ($("bk").style.display = "none");
}
$("mBook").onclick = showBook;
document.querySelectorAll("[data-sn]").forEach(
  (b) =>
    (b.onclick = () => {
      if (!act()) return;
      S.sn = S.sn === +b.dataset.sn ? -1 : +b.dataset.sn;
      snkUI();
      sfx(500, 0.06);
    }),
);
$("rM").value = vm;
$("rS").value = vs;
$("rM").oninput = (e) => {
  vm = +e.target.value;
  sv("hhx_vm", vm);
  bgmVol();
};
$("rS").oninput = (e) => {
  vs = +e.target.value;
  sv("hhx_vs", vs);
  sfx(600, 0.1);
};
$("mSet").onclick = () => ($("st").style.display = "flex");
$("stx").onclick = () => ($("st").style.display = "none");
$("rReset").onclick = () => {
  try {
    ["hhx", "hhx_day", "hhx_rb", "hhx_ach", "hhx_mx", "hhx_tut"].forEach((k) =>
      localStorage.removeItem(k),
    );
  } catch (e) {}
  best = 0;
  TUT = 0;
  $("st").style.display = "none";
  showMenu();
  toast("Progress reset");
};
drag($("bIce"), "ice", 0, "<i>" + svg("ice") + "</i>Shaved Ice");
drag($("bMilk"), "milk", 0, "<i>" + svg("milk") + "</i>Evap Milk");
$("bPause").onclick = () => {
  if (!S.run || S.shop) return;
  S.pause = S.pause ? 0 : 1;
  document.body.classList.toggle("paused", !!S.pause);
  $("bPause").textContent = S.pause ? "▶" : "⏸";
};

const UP = [
  ["🐢", "Patient Customers", "+6s patience", () => (S.pb += 6)],
  ["💰", "Premium Pricing", "+15% on all orders", () => (S.pm *= 1.15)],
  ["❄", "Freeze Charges", "+2 Freeze Time", () => (S.fc += 2)],
  ["😌", "Calm Down", "Remove 1 anger", () => (S.an = Math.max(0, S.an - 1))],
  [
    "🥤",
    "Extra Glass",
    "One more glass in the tray",
    () => {
      G.push({ ice: 0, milk: 0, t: [], o: [] });
    },
  ],
  ["🍀", "Lucky Tips", "Fast tips 40% instead of 20%", () => (S.tp = 0.4)],
  ["🔥", "Combo Boost", "Bigger combo bonus", () => (S.cs += 5)],
];
function shop(keep) {
  if (!S.run) return;
  S.pause = 1;
  S.shop = 1;
  const st = S.dw == 0 ? 3 : S.dw <= 1 ? 2 : 1;
  const ch = (S.ch =
    (keep && S.ch) ||
    UP.filter((u) => !(u[1] == "Extra Glass" && G.length >= 8))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3));
  $("up").innerHTML =
    `<h2>Day ${S.lv - 1} complete!</h2><div style="font-size:34px;color:#f5b800">${"★".repeat(st)}${"☆".repeat(3 - st)}</div><p style="margin:0;color:#ddd">Earned ₱${S.de} · ${S.ds} served · ${S.dw} mistakes · tips ₱${S.dt}</p><h3 style="margin:0">Pick an upgrade for Day ${S.lv}</h3><div id="uc">` +
    ch
      .map(
        (u) =>
          `<button class="uc" data-u="${UP.indexOf(u)}"><b>${u[0]} ${u[1]}</b><small>${u[2]}</small></button>`,
      )
      .join("") +
    "</div>" +
    stallHTML();
  $("up").style.display = "flex";
}
$("up").onclick = (e) => {
  const sb = e.target.closest("[data-b]");
  if (sb) {
    const i = +sb.dataset.b,
      x = STALL[i];
    if (S.w >= x[2] && !S.bought.includes(i)) {
      S.w -= x[2];
      S.bought.push(i);
      x[3]();
      sfx(700, 0.15);
      ui();
      draw();
      shop(1);
    }
    return;
  }
  const b = e.target.closest("[data-u]");
  if (!b) return;
  UP[+b.dataset.u][3]();
  S.pause = 0;
  S.shop = 0;
  S.ds = S.de = S.dt = S.dw = 0;
  $("up").style.display = "none";
  sfx(800, 0.2);
  ui();
  draw();
};
$("bFz").onclick = () => {
  if (act() && C && S.fc > 0 && S.fz <= 0) {
    S.fc--;
    S.fz = 6;
    sfx(900, 0.3);
    toast("Time frozen for 6 seconds!");
    ui();
  }
};
document.addEventListener("visibilitychange", () => {
  if (document.hidden && act()) $("bPause").click();
});
addEventListener("keydown", (e) => {
  if (e.key == "p" || e.key == "P") return $("bPause").click();
  if (!act()) return;
  if (/^[1-9]$/.test(e.key) && +e.key <= G.length) {
    sel = +e.key - 1;
    draw();
  } else if (e.key == "Enter") serve(sel);
  else if (e.key == "i" || e.key == "I") addItem(sel, "ice");
  else if (e.key == "m" || e.key == "M") addItem(sel, "milk");
  else if (e.key == "Backspace") {
    G[sel] = { ice: 0, milk: 0, t: [], o: [] };
    draw();
  } else if (e.key == "f" || e.key == "F") $("bFz").click();
});
$("bTrash").onclick = () => {
  if (S.run) {
    G[sel] = { ice: 0, milk: 0, t: [], o: [] };
    draw();
  }
};
function startGame(d) {
  init();
  if (typeof d == "number" && d > 1) {
    S.lv = d;
    S.tg = 250 + 150 * (d - 1);
    TUT = -1;
    ui();
  }
  S.run = true;
  if (!mt) mt = setInterval(musTick, 230);
  $("ov").style.display = "none";
  $("menu").style.display = "none";
  cancelAnimationFrame(timer);
  lt = performance.now();
  timer = requestAnimationFrame(raf);
  newCustomer();
}
/* ---------- background music (audio/bgm.mp3) ---------- */
const BGM = $("bgm");
BGM.loop = true;
BGM.addEventListener("ended", () => {
  BGM.currentTime = 0;
  if (!document.hidden) BGM.play().catch(() => {});
});
function bgmVol() {
  BGM.volume = Math.min(1, vm * 0.55);
  BGM.muted = !mus;
}
function bgmPlay() {
  bgmVol();
  if (BGM.paused) BGM.play().catch(() => {});
}
document.addEventListener("pointerdown", bgmPlay);
document.addEventListener("keydown", bgmPlay);
document.addEventListener("visibilitychange", () => (document.hidden ? BGM.pause() : bgmPlay()));
bgmVol();

/* ---------- main menu: banderitas + confetti ---------- */
function buntSVG(w, h0) {
  const cols = ["#e63946", "#f5b800", "#2f80ed", "#2ecc71", "#ff7a00", "#b44ae0"],
    segW = Math.max(150, Math.min(230, w / 5)),
    sag = 30;
  let out = `<svg width="${w}" height="${h0}" viewBox="0 0 ${w} ${h0}" xmlns="http://www.w3.org/2000/svg">`,
    ci = 0;
  for (let x0 = -10; x0 < w + segW; x0 += segW) {
    const x1 = x0 + segW, cx = (x0 + x1) / 2, y0 = 4, cy = y0 + sag * 2;
    out += `<path d="M${x0} ${y0} Q${cx} ${cy} ${x1} ${y0}" fill="none" stroke="#f3e2b8" stroke-width="2"/>`;
    const n = Math.round(segW / 28);
    for (let i = 1; i < n; i++) {
      const t = i / n,
        x = (1 - t) * (1 - t) * x0 + 2 * t * (1 - t) * cx + t * t * x1,
        y = (1 - t) * (1 - t) * y0 + 2 * t * (1 - t) * cy + t * t * y0,
        dx = 2 * (1 - t) * (cx - x0) + 2 * t * (x1 - cx),
        dy = 2 * (1 - t) * (cy - y0) + 2 * t * (y0 - cy),
        ang = (Math.atan2(dy, dx) * 180) / Math.PI,
        c = cols[ci++ % cols.length];
      out += `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${ang.toFixed(1)})"><g class="fl" style="animation-delay:${(-Math.random() * 2.4).toFixed(2)}s"><path d="M-12 0 H12 L0 28Z" fill="${c}" stroke="#0004" stroke-width="1"/><path d="M-7 4 H7" stroke="#fff" stroke-opacity=".55" stroke-width="2"/></g></g>`;
    }
  }
  return out + "</svg>";
}
function drawBunt() {
  $("buntm").innerHTML = buntSVG(innerWidth, 96);
}
function drawConfetti() {
  const c = $("confetti");
  if (c.children.length) return;
  const cols = ["#e63946", "#f5b800", "#2f80ed", "#2ecc71", "#ff7a00", "#b44ae0"];
  for (let i = 0; i < 28; i++) {
    const e = document.createElement("i");
    e.style.cssText = `left:${Math.random() * 100}%;background:${cols[i % cols.length]};animation-duration:${6 + Math.random() * 7}s;animation-delay:${-Math.random() * 12}s`;
    c.appendChild(e);
  }
}
addEventListener("resize", () => {
  if ($("menu").style.display != "none") drawBunt();
});
function showMenu() {
  S.run = false;
  cancelAnimationFrame(timer);
  $("ov").style.display = "none";
  $("up").style.display = "none";
  $("menu").style.display = "flex";
  drawBunt();
  drawConfetti();
  $("mpics").innerHTML = [0, 1, 2].map(() => `<div>${person(newLook(), "happy")}</div>`).join("");
  $("mBest").textContent = "Best run: ₱" + best;
  const dd = +ld("hhx_day", 1);
  $("mCont").style.display = dd > 1 ? "block" : "none";
  $("mCont").textContent = "▶ Continue (Day " + dd + ")";
}
function setSnd() {
  snd = !snd;
  $("bSnd").textContent = snd ? "🔊" : "🔇";
  $("mSnd").textContent = "🔊 Sound: " + (snd ? "On" : "Off");
}
$("start").onclick = startGame;
$("mPlay").onclick = startGame;
$("bMenu").onclick = showMenu;
$("mSnd").onclick = setSnd;
$("bSnd").onclick = setSnd;
$("mHow").onclick = () => {
  const h = $("how");
  h.style.display = h.style.display == "block" ? "none" : "block";
};
document.querySelectorAll("[data-d]").forEach(
  (b) =>
    (b.onclick = () => {
      DF = +b.dataset.d;
      document.querySelectorAll("[data-d]").forEach((x) => x.classList.toggle("on", x == b));
    }),
);

let hq = 0;
$("bHome").onclick = () => {
  if (!S.run) return showMenu();
  if (hq) {
    hq = 0;
    $("bHome").textContent = "🏠";
    return showMenu();
  }
  hq = 1;
  $("bHome").textContent = "Quit?";
  setTimeout(() => {
    hq = 0;
    $("bHome").textContent = "🏠";
  }, 2000);
};
init();
showMenu();
