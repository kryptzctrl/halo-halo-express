/* 3D sari-sari neighbourhood (three.js). Falls back to the 2D SVG scene if WebGL/three is missing. */
(function () {
  var sc = document.getElementById("sc"), stage = document.getElementById("stage");
  if (!sc || !window.THREE) return;
  var T = THREE, r;
  try { r = new T.WebGLRenderer({ alpha: true, antialias: true }); } catch (e) { return; }
  r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  r.domElement.id = "s3d"; sc.appendChild(r.domElement); sc.classList.add("is3d");
  var s = new T.Scene(), cam = new T.PerspectiveCamera(38, 3, 0.1, 100);
  var amb = new T.HemisphereLight(0xffffff, 0x998877, 0.95), sun = new T.DirectionalLight(0xfff2cc, 0.9);
  sun.position.set(-6, 10, 8); s.add(amb, sun);
  var warm = new T.PointLight(0xffc766, 0, 14); warm.position.set(0, 3.8, 4); s.add(warm);
  var P = [0xe63946, 0xf4a261, 0x2a9d8f, 0xffd23f, 0x3a86ff, 0x8338ec, 0xff7aa2, 0x06d6a0];
  function box(w, h, d, c, x, y, z, p) {
    var m = new T.Mesh(new T.BoxGeometry(w, h, d), new T.MeshLambertMaterial({ color: c }));
    m.position.set(x, y, z); (p || s).add(m); return m;
  }
  function tex(w, h, f) {
    var c = document.createElement("canvas"); c.width = w; c.height = h; f(c.getContext("2d"), w, h);
    return new T.CanvasTexture(c);
  }
  function plane(w, h, t, x, y, z) {
    var m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ map: t }));
    m.position.set(x, y, z); s.add(m);
  }
  // ground + store
  box(70, 0.2, 40, 0xa89f8d, 0, -0.1, 4);
  box(10, 4.4, 3, 0xf4e6c4, 0, 2.2, 0);
  box(10.04, 1.4, 3.04, 0x2f9e8f, 0, 0.7, 0);
  var roof = box(11.4, 0.25, 3.8, 0xb5654a, 0, 4.75, 0.9); roof.rotation.x = 0.25;
  box(11.4, 0.12, 0.2, 0x7a3a26, 0, 4.2, 2.72);
  box(7, 1.95, 0.05, 0x2a1a14, 0, 2.3, 1.52);
  for (var row = 0; row < 3; row++) {
    var base = 1.4 + row * 0.62;
    box(7, 0.05, 0.4, 0x8a5a2b, 0, base - 0.03, 1.6);
    for (var x = -3.3; x < 3.3; x += 0.3) {
      var h = 0.2 + Math.random() * 0.25;
      box(0.2, h, 0.14, P[(Math.random() * P.length) | 0], x, base + h / 2, 1.58);
    }
  }
  for (var g = -3.5; g <= 3.5; g += 0.4) box(0.05, 2, 0.05, 0xdddddd, g, 2.3, 1.66);
  box(7.6, 0.2, 0.7, 0x8a5a2b, 0, 1.25, 1.85);
  plane(6.2, 0.95, tex(512, 78, function (c, w, h) {
    c.fillStyle = "#d62828"; c.fillRect(0, 0, w, h); c.strokeStyle = "#ffd23f"; c.lineWidth = 6; c.strokeRect(3, 3, w - 6, h - 6);
    c.textAlign = "center"; c.fillStyle = "#ffe66d"; c.font = "44px Impact,Arial Black,sans-serif"; c.fillText("SARI-SARI STORE", w / 2, 46);
    c.fillStyle = "#fff"; c.font = "bold 15px Arial"; c.fillText("Tindahan ni Aling Nena \u2022 Halo-Halo \u2022 Yelo \u2022 Load", w / 2, 68);
  }), 0, 3.85, 1.53);
  plane(1.7, 2, tex(128, 150, function (c, w, h) {
    c.fillStyle = "#fff"; c.fillRect(0, 0, w, h); c.fillStyle = "#d62828"; c.fillRect(0, 0, w, 30);
    c.textAlign = "center"; c.fillStyle = "#fff"; c.font = "22px Impact,Arial Black,sans-serif"; c.fillText("HALO-HALO", w / 2, 23);
    c.fillStyle = "#cfe9fb"; c.beginPath(); c.moveTo(34, 50); c.lineTo(94, 50); c.lineTo(80, 108); c.lineTo(48, 108); c.fill();
    c.fillStyle = "#8338ec"; c.fillRect(37, 56, 54, 10); c.fillStyle = "#ffd23f"; c.fillRect(40, 66, 48, 10); c.fillStyle = "#e63946"; c.fillRect(43, 76, 42, 10);
    c.fillStyle = "#d62828"; c.font = "18px Impact,Arial Black,sans-serif"; c.fillText("\u20B125 LANG!", w / 2, 134);
  }), -4.1, 2.7, 1.53);
  plane(1.5, 0.45, tex(128, 40, function (c, w, h) {
    c.fillStyle = "#ffd23f"; c.fillRect(0, 0, w, h); c.fillStyle = "#c0392b"; c.textAlign = "center"; c.font = "22px Impact,Arial Black,sans-serif"; c.fillText("YELO \u2022 BUKO", w / 2, 28);
  }), 4.1, 3.2, 1.53);
  for (var k = 0; k < 4; k++) for (var q = 0; q < 5; q++) box(0.18, 0.26, 0.04, P[(k * 5 + q) % P.length], 3.6 + k * 0.4, 2.8 - q * 0.32, 1.55);
  // neighbourhood
  [[-9.8, 3.4, 0xe9a7b5], [9.8, 3.9, 0xf2d9a0], [-15, 3, 0x9ecbb8], [15.5, 3.2, 0xb7c9f0]].forEach(function (b) {
    box(4.6, b[1], 3.2, b[2], b[0], b[1] / 2, -1.5);
    var rf = box(5, 0.25, 3.6, 0xb5654a, b[0], b[1] + 0.12, -1.5); rf.rotation.z = b[0] < 0 ? 0.08 : -0.08;
    box(0.9, 0.9, 0.05, 0x4f7191, b[0] - 1, b[1] * 0.6, 0.12); box(0.8, 1.6, 0.05, 0x7a4a2a, b[0] + 1, 0.8, 0.12);
  });
  var palms = [];
  [[-6.3, -0.8, 5.5], [6.7, -1, 6.3], [-12.5, 0.5, 5]].forEach(function (p) {
    var gp = new T.Group(); gp.position.set(p[0], 0, p[1]); s.add(gp);
    var t = new T.Mesh(new T.CylinderGeometry(0.15, 0.22, p[2], 8), new T.MeshLambertMaterial({ color: 0x6b4a2b })); t.position.y = p[2] / 2; gp.add(t);
    for (var i = 0; i < 6; i++) {
      var lf = new T.Mesh(new T.ConeGeometry(0.28, 2.2, 4), new T.MeshLambertMaterial({ color: 0x2f8f3a }));
      lf.scale.z = 0.25; lf.position.y = p[2]; lf.rotation.y = i * 1.047; lf.rotation.x = 1.15;
      var hold = new T.Group(); hold.position.y = p[2]; lf.position.y = 0; lf.position.z = 1; hold.add(lf); hold.rotation.y = i * 1.047; gp.add(hold);
    }
    palms.push(gp);
  });
  box(0.22, 6.2, 0.22, 0x5b4630, -7.6, 3.1, 0.6); box(1.8, 0.14, 0.14, 0x5b4630, -7.6, 5.6, 0.6);
  box(1.8, 0.7, 0.9, 0xe63946, -8.5, 0.6, 4.2); box(1.1, 0.7, 0.8, 0xf4f1de, -8.7, 1.25, 4.2);
  [[-9.2, 3.8], [-9.2, 4.6], [-7.9, 4.2]].forEach(function (w) {
    var wh = new T.Mesh(new T.CylinderGeometry(0.3, 0.3, 0.14, 12), new T.MeshLambertMaterial({ color: 0x222222 }));
    wh.rotation.x = Math.PI / 2; wh.position.set(w[0], 0.3, w[1]); s.add(wh);
  });
  box(0.7, 0.9, 0.7, 0xd62828, 6.6, 0.45, 3.2); box(0.7, 0.9, 0.7, 0x2a6fd6, 7.4, 0.45, 3.2); box(0.7, 0.9, 0.7, 0x2ecc71, 7, 1.35, 3.2);
  var flags = [];
  for (var f = -6.4; f <= 6.4; f += 0.55) {
    var fl = new T.Mesh(new T.ConeGeometry(0.22, 0.45, 3), new T.MeshLambertMaterial({ color: P[flags.length % P.length] }));
    fl.rotation.x = Math.PI; fl.position.set(f, 5.9 - 0.9 * (1 - Math.pow(f / 6.5, 2)) - 0.25, 3.1); s.add(fl); flags.push(fl);
  }
  var bulbs = [];
  for (var bx = -5.4; bx <= 5.4; bx += 0.6) {
    var bl = new T.Mesh(new T.SphereGeometry(0.1, 8, 8), new T.MeshBasicMaterial({ color: 0xffe9a0, transparent: true, opacity: 0.35 }));
    bl.position.set(bx, 4.05, 2.78); s.add(bl); bulbs.push(bl);
  }
  // sizing, camera, loop
  var mx = 0, dim = 0, tick = 0;
  addEventListener("mousemove", function (e) { mx = e.clientX / innerWidth - 0.5; });
  function size() {
    var w = sc.clientWidth || 600, h = sc.clientHeight || 300;
    r.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix();
  }
  if (window.ResizeObserver) new ResizeObserver(size).observe(sc); else addEventListener("resize", size);
  size();
  function frame(t) {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    t *= 0.001;
    if (tick++ % 20 === 0) dim = parseFloat(getComputedStyle(stage).getPropertyValue("--dim")) || 0;
    amb.intensity = 0.95 - 0.65 * dim; sun.intensity = 0.9 * (1 - dim);
    warm.intensity = dim * 1.3;
    bulbs.forEach(function (b, i) { b.material.opacity = 0.35 + 0.65 * Math.min(1, dim * 2.2) * (0.85 + 0.15 * Math.sin(t * 3 + i)); });
    palms.forEach(function (p, i) { p.rotation.z = Math.sin(t * 0.9 + i) * 0.025; });
    flags.forEach(function (f, i) { f.rotation.z = Math.sin(t * 2.2 + i) * 0.18; });
    var dist = Math.min(22, Math.max(13, 6.8 / (Math.tan(0.332) * cam.aspect)));
    cam.position.set(mx * 1.6, 2.7 + Math.sin(t * 0.4) * 0.05, dist); cam.lookAt(0, 2.5, 0);
    r.render(s, cam);
  }
  requestAnimationFrame(frame);
})();
