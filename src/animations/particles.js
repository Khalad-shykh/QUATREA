/**
 * Seasonal atmosphere particles — a small, dependency-free canvas engine.
 *
 *   petals  (spring)  drifting blossom petals
 *   light   (summer)  rising golden light motes
 *   leaves  (autumn)  tumbling amber leaves
 *   frost   (winter)  slow, fine frost crystals
 *
 * Switching type fades the current particles out while the new season's
 * particles drift in, so scene changes feel continuous rather than cut.
 * Sprites are pre-rendered once; each frame is only drawImage calls.
 */

const TAU = Math.PI * 2;
const rand = (min, max) => min + Math.random() * (max - min);

function makeSprite(size, draw) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  draw(canvas.getContext('2d'), size);
  return canvas;
}

function buildSprites() {
  const petal = makeSprite(64, (ctx, s) => {
    const g = ctx.createLinearGradient(0, 0, s, s);
    g.addColorStop(0, 'rgba(255,240,246,0.95)');
    g.addColorStop(1, 'rgba(232,188,206,0.85)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(s * 0.5, s * 0.06);
    ctx.bezierCurveTo(s * 0.95, s * 0.25, s * 0.85, s * 0.8, s * 0.5, s * 0.94);
    ctx.bezierCurveTo(s * 0.15, s * 0.8, s * 0.05, s * 0.25, s * 0.5, s * 0.06);
    ctx.fill();
  });

  const glow = makeSprite(64, (ctx, s) => {
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, 'rgba(255,240,200,1)');
    g.addColorStop(0.18, 'rgba(244,206,128,0.75)');
    g.addColorStop(0.5, 'rgba(233,199,123,0.18)');
    g.addColorStop(1, 'rgba(233,199,123,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
  });

  const leaf = makeSprite(64, (ctx, s) => {
    const g = ctx.createLinearGradient(0, 0, s, s);
    g.addColorStop(0, 'rgba(230,150,80,0.95)');
    g.addColorStop(1, 'rgba(150,70,35,0.9)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(s * 0.5, s * 0.04);
    ctx.quadraticCurveTo(s * 0.98, s * 0.42, s * 0.5, s * 0.96);
    ctx.quadraticCurveTo(s * 0.02, s * 0.42, s * 0.5, s * 0.04);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,214,170,0.45)';
    ctx.lineWidth = s * 0.025;
    ctx.beginPath();
    ctx.moveTo(s * 0.5, s * 0.1);
    ctx.lineTo(s * 0.5, s * 0.92);
    ctx.stroke();
  });

  const frost = makeSprite(32, (ctx, s) => {
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.35, 'rgba(214,238,255,0.6)');
    g.addColorStop(1, 'rgba(193,232,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
  });

  return { petals: petal, light: glow, leaves: leaf, frost };
}

const CONFIG = {
  petals: { count: 30, size: [7, 15], vy: [14, 34], vx: [-6, 10], sway: [8, 22], spin: [-0.9, 0.9], alpha: [0.45, 0.9] },
  light: { count: 42, size: [10, 26], vy: [-16, -5], vx: [-4, 4], sway: [4, 12], spin: [0, 0], alpha: [0.25, 0.85] },
  leaves: { count: 16, size: [12, 22], vy: [26, 52], vx: [4, 18], sway: [14, 34], spin: [-1.6, 1.6], alpha: [0.6, 0.95] },
  frost: { count: 70, size: [2, 7], vy: [6, 20], vx: [-3, 6], sway: [2, 8], spin: [0, 0], alpha: [0.25, 0.85] },
};

export class ParticleField {
  constructor(canvas, { density = 1 } = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.density = density;
    this.particles = [];
    this.type = null;
    this.running = false;
    this.last = 0;
    this.spawnClock = 0;
    this.sprites = buildSprites();
    this.tick = this.tick.bind(this);
    this.resize();
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const { clientWidth: w, clientHeight: h } = this.canvas;
    this.w = w;
    this.h = h;
    this.canvas.width = Math.max(1, Math.round(w * dpr));
    this.canvas.height = Math.max(1, Math.round(h * dpr));
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Scale particle count with the area of the field (reference: 1440×900).
    this.areaScale = Math.min(1.4, Math.max(0.35, (w * h) / (1440 * 900)));
  }

  setType(type) {
    if (type === this.type) return;
    this.type = type;
    this.settled = false;
    clearTimeout(this.settleTimer);
    this.settleTimer = setTimeout(() => {
      this.settled = true;
    }, 2500);
    this.particles.forEach((p) => {
      if (p.type !== type) p.dying = true;
    });
  }

  target() {
    return this.type ? Math.round(CONFIG[this.type].count * this.density * this.areaScale) : 0;
  }

  spawn(initial = false) {
    const type = this.type;
    const c = CONFIG[type];
    const size = rand(...c.size);
    // New particles fade in where they are born, so a season change reads as
    // the atmosphere transforming rather than a new wave entering the frame.
    const rising = c.vy[1] < 0;
    const fromEdge = !initial && this.settled && Math.random() < 0.5;
    this.particles.push({
      type,
      size,
      x: rand(-0.05, 1.05) * this.w,
      y: fromEdge ? (rising ? this.h + size * 2 : -size * 2) : rand(0, this.h),
      vx: rand(...c.vx),
      vy: rand(...c.vy),
      sway: rand(...c.sway),
      swaySpeed: rand(0.4, 1.1),
      phase: rand(0, TAU),
      rot: rand(0, TAU),
      spin: rand(...c.spin),
      alpha: rand(...c.alpha),
      life: 0,
      fade: 0,
      dying: false,
    });
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    if (this.particles.length === 0 && this.type) {
      const n = Math.round(this.target() * 0.6);
      for (let i = 0; i < n; i += 1) this.spawn(true);
    }
    this.raf = requestAnimationFrame(this.tick);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  tick(now) {
    if (!this.running) return;
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    const { ctx, w, h } = this;

    // Ease new particles in rather than flooding the frame on a scene change.
    const living = this.particles.filter((p) => !p.dying && p.type === this.type).length;
    this.spawnClock += dt;
    if (this.type && living < this.target() && this.spawnClock > 0.06) {
      this.spawnClock = 0;
      this.spawn(false);
    }

    ctx.clearRect(0, 0, w, h);

    for (let i = this.particles.length - 1; i >= 0; i -= 1) {
      const p = this.particles[i];
      p.life += dt;
      p.fade = p.dying ? Math.max(0, p.fade - dt * 0.9) : Math.min(1, p.fade + dt * 0.8);
      p.x += (p.vx + Math.sin(p.life * p.swaySpeed + p.phase) * p.sway) * dt;
      p.y += p.vy * dt;
      p.rot += p.spin * dt;

      const outOfBounds =
        p.y > h + p.size * 3 || p.y < -p.size * 3 || p.x < -p.size * 4 || p.x > w + p.size * 4;
      if ((p.dying && p.fade <= 0) || outOfBounds) {
        this.particles.splice(i, 1);
        continue;
      }

      let alpha = p.alpha * p.fade;
      if (p.type === 'light' || p.type === 'frost') {
        alpha *= 0.65 + 0.35 * Math.sin(p.life * 2.2 + p.phase);
      }
      ctx.globalAlpha = alpha;

      const sprite = this.sprites[p.type];
      const s = p.size;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      if (p.type === 'leaves' || p.type === 'petals') {
        // Fake 3D tumbling by squashing one axis over time.
        ctx.scale(Math.cos(p.life * 1.3 + p.phase) * 0.8 + 0.2, 1);
      }
      ctx.drawImage(sprite, -s / 2, -s / 2, s, s * (p.type === 'leaves' ? 1.25 : 1));
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    this.raf = requestAnimationFrame(this.tick);
  }

  destroy() {
    clearTimeout(this.settleTimer);
    this.stop();
    this.particles = [];
  }
}
