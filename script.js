(function () {
  var P = ["images/us-01.jpg", "images/us-02.jpg", "images/us-03.jpg", "images/us-04.jpg", "images/us-05.jpg", "images/us-06.jpg", "images/us-07.jpg", "images/us-08.jpg", "images/us-09.jpg", "images/us-10.jpg"];
  var K2 = ["images/memories-11.jpg", "images/memories-12.jpg", "images/memories-13.jpg", "images/memories-14.jpg", "images/memories-15.jpg", "images/memories-16.jpg", "images/memories-17.jpg", "images/memories-18.jpg", "images/memories-19.jpg", "images/memories-20.jpg"];
  var K = ["images/memories-01.jpg", "images/memories-02.jpg", "images/memories-03.jpg", "images/memories-04.jpg", "images/memories-05.jpg", "images/memories-06.jpg", "images/memories-07.jpg", "images/memories-08.jpg", "images/memories-09.jpg", "images/memories-10.jpg"];
  function build(id, list, off) {
    var t = document.getElementById(id), n = list.length;
    for (var rep = 0; rep < 2; rep++)for (var i = 0; i < n; i++) {
      var k = (i + off) % n, f = document.createElement('div'); f.className = 'fr';
      if (rep) f.setAttribute('aria-hidden', 'true');
      var b = document.createElement('b'); b.textContent = (20 + (i % 10) * 3 + off) + ' \u25B8';
      var im = document.createElement('img'); im.src = list[k]; im.alt = rep ? '' : 'Photo'; im.draggable = false;
      f.appendChild(b); f.appendChild(im); t.appendChild(f);
    }
  }
  build('t1', K, 0); build('t2', K2, 0);
  /* two rows share no photo: each row gets 5 different photos, repeated to fill wide screens */
  function rep(a, n) { var r = []; for (var j = 0; j < n; j++) r = r.concat(a); return r; }
  var rowA = [0, 2, 4, 6, 8].map(function (i) { return P[i]; });
  var rowB = [1, 3, 5, 7, 9].map(function (i) { return P[i]; });
  build('t3', rep(rowA, 4), 0);
  build('t4', rep(rowB, 4), 0);
  var hero = document.getElementById('hero');
  for (var s = 0; s < 16; s++) { var d = document.createElement('i'); d.className = 'star'; d.style.left = (Math.random() * 96 + 2) + '%'; d.style.top = (Math.random() * 55 + 2) + '%'; d.style.animationDelay = (Math.random() * 3) + 's'; hero.appendChild(d); }
  document.getElementById('parked').innerHTML = document.querySelector('.bike svg').outerHTML;
})();

(function () {
  try { var n = decodeURIComponent(location.hash.slice(1)); if (n) document.getElementById('name').textContent = n; } catch (e) { }
  var ns = 'http://www.w3.org/2000/svg', g = document.getElementById('ticks');
  function pt(r, v) { var a = (-120 + v * 2.4) * Math.PI / 180; return [150 + r * Math.sin(a), 150 - r * Math.cos(a)]; }
  function el(t, at) { var e = document.createElementNS(ns, t); for (var k in at) e.setAttribute(k, at[k]); g.appendChild(e); return e; }
  for (var v = 0; v <= 100; v += 5) {
    var maj = v % 20 === 0, p1 = pt(maj ? 92 : 100, v), p2 = pt(108, v);
    el('line', { x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], stroke: v >= 80 ? 'var(--red)' : 'var(--silver)', 'stroke-width': maj ? 3 : 1.5 });
    if (maj) { var l = pt(76, v), t = el('text', { x: l[0], y: l[1] + 4, 'text-anchor': 'middle', 'font-size': 11, fill: 'var(--soft)' }); t.textContent = v; }
  }
  var a = pt(112, 80), b = pt(112, 100);
  el('path', { d: 'M' + a[0] + ' ' + a[1] + 'A112 112 0 0 1 ' + b[0] + ' ' + b[1], fill: 'none', stroke: 'var(--red)', 'stroke-width': 4, opacity: .7 });
  var needle = document.getElementById('needle'), num = document.getElementById('num'), cur = 0;
  function go(v, ms) {
    var from = cur, t0 = null; needle.style.transform = 'rotate(' + (-120 + v * 2.4) + 'deg)';
    function step(t) { if (!t0) t0 = t; var k = Math.min((t - t0) / ms, 1); cur = from + (v - from) * (1 - Math.pow(1 - k, 3)); num.textContent = Math.round(cur); if (k < 1) requestAnimationFrame(step); } requestAnimationFrame(step);
  }
  needle.style.transform = 'rotate(-120deg)';
  setTimeout(function () { go(22, 1800); }, 300);
  var busy = false, txt = document.getElementById('revtxt');
  document.getElementById('rev').addEventListener('click', function () {
    if (busy) return; busy = true; revFx(); txt.textContent = 'ブロロロ! Vroom!'; go(100, 1100); setTimeout(function () { goTo('photos'); }, 1500);
    setTimeout(function () { go(22, 1800); }, 1400);
    setTimeout(function () { txt.textContent = 'Ride safe!'; busy = false; }, 3300);
  });
  function goTo(id) { var el = document.getElementById(id); if (el && el.offsetParent === null) el = document.getElementById('msg'); if (el) el.scrollIntoView({ behavior: window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth', block: 'start' }); }
  Array.prototype.forEach.call(document.querySelectorAll('[data-go]'), function (b) { b.addEventListener('click', function () { goTo(b.getAttribute('data-go')); }); });
  /* message ride */
  var ride = document.getElementById('ride'), msg = document.getElementById('msg'), start = document.getElementById('start'), again = document.getElementById('again');
  var calm = window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches;
  function play(fn, back) {
    if (calm) { fn(); return; }
    start.disabled = true; again.disabled = true;
    ride.classList.remove('on', 'back'); void ride.offsetWidth; ride.classList.add('on'); if (back) ride.classList.add('back');
    go(100, 1000); setTimeout(function () { go(22, 1800); }, 1500);
    setTimeout(fn, 1300);
    setTimeout(function () { ride.classList.remove('on', 'back'); start.disabled = !solved; again.disabled = false; }, 2900);
  }
  var MS = ['Happy 22nd Birthday Rek, I may not be good in making messages or a sweet message but I wanna let you know how grateful I am that I have you in my life, life may separate us before but  thank you for finding your way back to me and making things right the way they supposed to be.', 'I\'ve seen how much you\'ve grown and I really appreciate the patience and effort you\'ve shown lately. Thank you for always supporting and helping me sa akong mga ka echosan sa kinabuhi. I\'m really happy and grateful ug unsay naa sa atoa karon. Kabaw ko e correct nimo ang akong English pero okay nana oi atleast masabtan ug na deliver ug tarong.',
    'I pray for your safety, good health, long life, happiness, success and may this new chapter brings you closer sa mga gusto nimo sa kinabuhi and I hope every decision you do in life, is si God ang imo e center.  Happy Birthday again, <3 ', 'From the woman u love :P, ', 'Jucille'], ct = [];
  function clearChat() { ct.forEach(clearTimeout); ct = []; document.getElementById('cbody').innerHTML = ''; document.getElementById('us').classList.remove('on'); }
  function hearts() { if (calm) return; var c = document.getElementById('chat'); for (var h = 0; h < 9; h++) { var e = document.createElement('i'); e.className = 'heart'; e.textContent = '♥'; e.style.left = (8 + Math.random() * 30) + '%'; e.style.setProperty('--hx', (Math.random() * 90 - 10) + 'px'); e.style.animationDelay = (h * .12) + 's'; c.appendChild(e); setTimeout(function (x) { x.remove(); }, 2800, e); } }
  function runChat() {
    clearChat(); var b = document.getElementById('cbody'), t = 0;
    function bub(m, last) { var d = document.createElement('div'); d.className = 'bub' + (calm ? '' : ' in') + (last ? ' last' : ''); d.textContent = m; b.appendChild(d); }
    function seen() { var s = document.createElement('div'); s.className = 'seen'; s.textContent = 'Seen just now ✓✓'; b.appendChild(s); document.getElementById('us').classList.add('on'); }
    if (calm) { MS.forEach(function (m, i) { bub(m, i === MS.length - 1); }); seen(); return; }
    MS.forEach(function (m, i) {
      var last = i === MS.length - 1, at = t + (i ? 450 : 1000), len = Math.min(2400, 800 + m.length * 13);
      ct.push(setTimeout(function () { var ty = document.createElement('div'); ty.className = 'bub typing'; ty.innerHTML = '<i></i><i></i><i></i>'; b.appendChild(ty); }, at));
      ct.push(setTimeout(function () { var ty = b.querySelector('.typing'); if (ty) ty.remove(); bub(m, last); if (last) hearts(); }, at + len));
      t = at + len;
    });
    ct.push(setTimeout(seen, t + 800));
  }
  function closeMsg() { clearChat(); stopSong(); msg.classList.remove('show'); var ig = document.getElementById('ignite'); ig.style.display = ''; window.scrollTo({ top: Math.max(ig.offsetTop - 80, 0), behavior: calm ? 'auto' : 'smooth' }); }
  function open() {
    document.getElementById('ignite').style.display = 'none';
    msg.classList.add('show'); party(); runChat(); if (wantSong) playSong();
    setTimeout(function () { msg.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' }); }, calm ? 0 : 1600);
  }
  var solved = false, wantSong = true, ac = null, song = null, mbtn = document.getElementById('music');
  function setBtn(on) { mbtn.textContent = on ? '♪ Song: on' : '♪ Song: off'; }
  function ensureAudio() { try { if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === 'suspended') ac.resume(); } catch (e) { } }
  var N = { C: 261.63, D: 293.66, E: 329.63, F: 349.23, G: 392, A: 440, B: 466.16, H: 523.25 };
  var tune = [['C', .75], ['C', .25], ['D', 1], ['C', 1], ['F', 1], ['E', 2], ['C', .75], ['C', .25], ['D', 1], ['C', 1], ['G', 1], ['F', 2], ['C', .75], ['C', .25], ['H', 1], ['A', 1], ['F', 1], ['E', 1], ['D', 1], ['B', .75], ['B', .25], ['A', 1], ['F', 1], ['G', 1], ['F', 2]];
  function playSong() {
    stopSong(); ensureAudio(); if (!ac) return; var m = ac.createGain(); m.gain.value = .18; m.connect(ac.destination); var t = ac.currentTime + .1, bt = .46;
    tune.forEach(function (n) { var o = ac.createOscillator(), e = ac.createGain(); o.type = 'triangle'; o.frequency.value = N[n[0]]; o.connect(e); e.connect(m); var d = n[1] * bt; e.gain.setValueAtTime(0, t); e.gain.linearRampToValueAtTime(1, t + .03); e.gain.exponentialRampToValueAtTime(.001, t + d * .95); o.start(t); o.stop(t + d); t += d; });
    song = m; setBtn(true); setTimeout(function () { if (song === m) { song = null; setBtn(false); } }, (t - ac.currentTime) * 1000);
  }
  function stopSong() { if (song && ac) { try { song.gain.setTargetAtTime(0, ac.currentTime, .05); } catch (e) { } var s = song; setTimeout(function () { try { s.disconnect(); } catch (e) { } }, 400); } song = null; setBtn(false); }
  mbtn.addEventListener('click', function () { if (song) { wantSong = false; stopSong(); } else { wantSong = true; playSong(); } });
  function balloon(c) { return '<svg viewBox="0 0 50 100" width="100%" height="100%"><path d="M25 2C42 2 48 18 44 32C40 46 30 52 25 54C20 52 10 46 6 32C2 18 8 2 25 2Z" fill="' + c + '"/><path d="M25 54L21 60H29Z" fill="' + c + '"/><path d="M25 60C18 70 32 80 25 98" fill="none" stroke="#d3d6dc" stroke-width="1.3"/><ellipse cx="15" cy="17" rx="4" ry="8" fill="#fff" opacity=".35" transform="rotate(25 15 17)"/></svg>'; }
  function party() {
    if (calm) return; var cols = ['#e5484d', '#b8323a', '#d3d6dc', '#f3e3b8', '#2b2b31'];
    for (var i = 0; i < 40; i++) { var c = document.createElement('i'); c.className = 'cf'; c.style.left = Math.random() * 100 + 'vw'; c.style.background = cols[i % 5]; c.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px'); c.style.animationDuration = (3 + Math.random() * 2.5) + 's'; c.style.animationDelay = (Math.random() * .8) + 's'; document.body.appendChild(c); setTimeout(function (x) { x.remove(); }, 7000, c); }
    for (var j = 0; j < 6; j++) { var b = document.createElement('i'); b.className = 'bal'; b.style.left = (j % 2 ? 86 + Math.random() * 9 : 2 + Math.random() * 9) + 'vw'; b.innerHTML = balloon(['#e5484d', '#9c2a31', '#d3d6dc'][j % 3]); b.style.animationDuration = (7 + Math.random() * 4) + 's'; b.style.animationDelay = (Math.random() * 1.2) + 's'; document.body.appendChild(b); setTimeout(function (x) { x.remove(); }, 13000, b); }
  }
  var icons = ['🏍️', '🪖', '🍜', '🌸', '🎂', '🔧'], quiz = document.getElementById('quiz'), gmsg = document.getElementById('gmsg'), skip = document.getElementById('skip'), wrong = 0, qi = 0;
  var segs = document.querySelectorAll('#prog i'), stat = document.getElementById('stat');
  function setProg() { for (var k = 0; k < segs.length; k++)segs[k].classList.toggle('on', k < qi); stat.textContent = qi >= Q.length ? 'Ready to ride · 10/10' : 'Answer to unlock · ' + qi + '/10'; }
  var Q = [
    { q: 'What’s my favorite food?', o: ['Ramen', 'Spicy fried chicken', 'Sinigang', 'Pizza'], a: 1 },
    { q: 'When did you start courting me?', o: ['Nov 17, 2022', 'Jan 17, 2023', 'Dec 17, 2022', 'Dec 7, 2022'], a: 2 },
    { q: 'What’s my favorite cake flavor?', o: ['Ube', 'Red velvet', 'Mango', 'Chocolate'], a: 3 },
    { q: 'What’s my favorite color?', o: ['Pink', 'Red', 'Blue', 'Purple'], a: 0 },
    { q: 'What’s my middle name?', o: ['Reales', 'Paylado', 'Bacalla', 'Versoza'], a: 1 },
    { q: 'Where did our first laag happen?', o: ['Ayala Center Cebu', 'SM J Mall', 'SM Seaside', 'Robinsons Galleria'], a: 2 },
    { q: 'Do I prefer mountains or beaches?', o: ['Mountains', 'Both', 'Beaches', 'Neither'], a: 1 },
    { q: 'Do I prefer cats or dogs?', o: ['Cats', 'Dogs', 'Neither', 'Both'], a: 3 },
    { q: 'What’s my go-to drink at 7-Eleven?', o: ['Big Gulp', 'Delight', 'Iced coffee', 'Slurpee'], a: 1 },
    { q: 'What was your nickname on my Messenger during the pandemic?', o: ['Rexft.Mabangis', 'Gwapoft.Mahangin', 'Rexft.Mahangin', 'Rexft.Mainit'], a: 2 }
  ];
  var MSG = ['Aray ko!', 'Hala, waka kaila nako?', 'Sayup ka dae', 'Wrong', 'Try again!'];
  var SFX = ['ガーン!', 'BONK!', 'OOPS!', 'OOF!'], EMO = ['🤡', '💀', '🙈', '🤨', '😵‍💫'];
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  var YAY = ['Correct!', 'Korek!', 'Goods!', 'Very is good!', 'Nice one!', 'Tama!'];
  var YSFX = ['バン!', 'NICE!', 'YES!', 'KOREK!'], YEMO = ['🎉', '✨', '😎', '👏', '🏍️'];
  function ding() { try { ensureAudio(); if (!ac) return; var t = ac.currentTime;[523.25, 659.25, 783.99].forEach(function (fq, k) { var o = ac.createOscillator(), g = ac.createGain(), s = t + k * .09; o.type = 'sine'; o.frequency.value = fq; g.gain.setValueAtTime(.001, s); g.gain.exponentialRampToValueAtTime(.08, s + .02); g.gain.exponentialRampToValueAtTime(.001, s + .35); o.connect(g); g.connect(ac.destination); o.start(s); o.stop(s + .4); }); } catch (e) { } }
  function mini() { var cols = ['#e5484d', '#d3d6dc', '#f3e3b8']; for (var i = 0; i < 14; i++) { var c = document.createElement('i'); c.className = 'cf'; c.style.left = (30 + Math.random() * 40) + 'vw'; c.style.top = '30vh'; c.style.background = cols[i % 3]; c.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px'); c.style.animationDuration = (1.6 + Math.random()) + 's'; document.body.appendChild(c); setTimeout(function (x) { x.remove(); }, 3000, c); } }
  function cheer() { ding(); if (calm) return; var d = document.createElement('div'); d.className = 'oops yay'; d.innerHTML = '<span>' + pick(YEMO) + '</span><b>' + pick(YSFX) + '</b>'; document.body.appendChild(d); setTimeout(function () { d.remove(); }, 1400); mini(); }
  function revFx() {
    ensureAudio(); if (ac) { try { var t = ac.currentTime, o = ac.createOscillator(), f = ac.createBiquadFilter(), g = ac.createGain(); o.type = 'sawtooth'; f.type = 'lowpass'; f.frequency.value = 500; o.frequency.setValueAtTime(55, t); o.frequency.exponentialRampToValueAtTime(240, t + 1.1); o.frequency.exponentialRampToValueAtTime(70, t + 2.2); g.gain.setValueAtTime(.001, t); g.gain.exponentialRampToValueAtTime(.12, t + .15); g.gain.setValueAtTime(.12, t + 1.4); g.gain.exponentialRampToValueAtTime(.001, t + 2.3); o.connect(f); f.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + 2.4); } catch (e) { } }
    if (calm) return; var gz = document.querySelector('.gauge'), hr = document.querySelector('.hero'); gz.classList.add('revving'); hr.classList.add('hot');
    for (var i = 0; i < 7; i++) { (function (i) { setTimeout(function () { var s = document.createElement('i'); s.className = 'sm'; s.style.left = (10 + Math.random() * 80) + '%'; hr.appendChild(s); setTimeout(function () { s.remove(); }, 1700); }, i * 160); })(i); }
    setTimeout(function () { gz.classList.remove('revving'); }, 1400); setTimeout(function () { hr.classList.remove('hot'); }, 2000);
  }
  function boing() { try { ensureAudio(); if (!ac) return; var o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime; o.type = 'sawtooth'; o.frequency.setValueAtTime(330, t); o.frequency.exponentialRampToValueAtTime(110, t + .4); g.gain.setValueAtTime(.06, t); g.gain.exponentialRampToValueAtTime(.001, t + .45); o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + .5); } catch (e) { } }
  function oops() { boing(); if (calm) return; quiz.classList.remove('shake'); void quiz.offsetWidth; quiz.classList.add('shake'); var d = document.createElement('div'); d.className = 'oops'; d.innerHTML = '<span>' + pick(EMO) + '</span><b>' + pick(SFX) + '</b>'; document.body.appendChild(d); setTimeout(function () { d.remove(); }, 1400); }
  function renderQ() {
    quiz.innerHTML = ''; if (qi >= Q.length) { unlock(); return; } var q = Q[qi];
    var h = document.createElement('p'); h.className = 'qtxt'; var cp = document.createElement('small'); cp.textContent = 'Checkpoint ' + (qi + 1) + ' of ' + Q.length; h.appendChild(cp); h.appendChild(document.createTextNode(q.q)); quiz.appendChild(h);
    q.o.forEach(function (t, i) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'opt'; var em = document.createElement('em'); em.textContent = 'ABCD'.charAt(i); b.appendChild(em); b.appendChild(document.createTextNode(t)); quiz.appendChild(b);
      b.addEventListener('click', function () {
        if (i === q.a) { b.classList.add('good'); gmsg.textContent = pick(YAY); cheer(); Array.prototype.forEach.call(quiz.querySelectorAll('.opt'), function (x) { x.disabled = true; }); qi++; setProg(); setTimeout(function () { gmsg.textContent = ''; renderQ(); }, 800); }
        else { wrong++; b.disabled = true; b.classList.add('bad'); gmsg.textContent = pick(MSG); oops(); if (wrong >= 8) skip.hidden = false; }
      });
    });
  }
  function unlock() { qi = Q.length; setProg(); document.getElementById('ignite').classList.add('open'); solved = true; start.disabled = false; skip.hidden = true; quiz.innerHTML = ''; gmsg.textContent = 'All correct! Unlocked.'; document.getElementById('gtxt').textContent = 'Nice one. Press start.'; party(); }
  skip.addEventListener('click', unlock);
  renderQ(); setProg();
  start.addEventListener('click', function () { ensureAudio(); play(open); });
  again.addEventListener('click', function () { play(closeMsg, true); });
})();

/* back to top */
(function () {
  var b = document.getElementById('totop'), ring = document.getElementById('totopRing');
  if (!b) return;
  var C = 131.95, tick = false;
  function upd() {
    tick = false;
    var y = window.pageYOffset || document.documentElement.scrollTop, max = document.documentElement.scrollHeight - window.innerHeight;
    b.classList.toggle('on', y > 500);
    if (ring) ring.style.strokeDashoffset = C * (1 - (max > 0 ? Math.min(y / max, 1) : 0));
  }
  window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
  window.addEventListener('resize', upd);
  b.addEventListener('click', function () {
    var calm = window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches;
    window.scrollTo({ top: 0, behavior: calm ? 'auto' : 'smooth' });
  });
  upd();
})();