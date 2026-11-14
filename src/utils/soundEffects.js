// Web Audio API Sound Synthesizer for Coco's Birthday Website
// Zero external network requests, instant playback, zero broken asset risk.

let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

let meowBuffer = null;

// Preload the uploaded cat meow audio buffer for instant 0ms latency playback
async function loadMeowBuffer() {
  const ctx = getAudioContext();
  if (!ctx || meowBuffer) return;
  try {
    const res = await fetch('/cat_meow.mp3');
    const arrayBuf = await res.arrayBuffer();
    ctx.decodeAudioData(arrayBuf, (decoded) => {
      meowBuffer = decoded;
    });
  } catch (e) {
    // Graceful fallback to HTML5 Audio
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('click', loadMeowBuffer, { once: true });
  window.addEventListener('touchstart', loadMeowBuffer, { once: true });
}

/**
 * Play Coco's uploaded authentic cat meow sound
 */
export function playMeow() {
  const ctx = getAudioContext();
  if (ctx && meowBuffer) {
    try {
      const src = ctx.createBufferSource();
      src.buffer = meowBuffer;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.85, ctx.currentTime);
      src.connect(gain);
      gain.connect(ctx.destination);
      src.start(0);
      return;
    } catch (e) {
      // Fallback below
    }
  }

  // HTML5 Audio fallback for immediate playback
  try {
    const audio = new Audio('/cat_meow.mp3');
    audio.volume = 0.85;
    audio.play().catch(() => {});
  } catch (e) {}
}

/**
 * Play a soothing, warm cat purr
 */
export function playPurr() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();

  // Low frequency rumble
  osc.type = 'sine';
  osc.frequency.setValueAtTime(75, now);

  // Purr rhythm amplitude modulation (~24 Hz)
  lfo.type = 'sine';
  lfo.frequency.setValueAtTime(24, now);
  lfoGain.gain.setValueAtTime(0.12, now);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.18, now + 0.1);
  gain.gain.linearRampToValueAtTime(0.15, now + 0.5);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

  lfo.connect(gain.gain);
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  lfo.start(now);
  osc.stop(now + 0.72);
  lfo.stop(now + 0.72);
}

/**
 * Play a sparkly celestial chime (for cake, wishes, celebrations)
 */
export function playChime() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // Pentatonic celebration notes: E5, G5, B5, E6
  const freqs = [659.25, 783.99, 987.77, 1318.51];

  freqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.06);

    const noteStart = now + idx * 0.06;
    gain.gain.setValueAtTime(0.001, noteStart);
    gain.gain.linearRampToValueAtTime(0.15, noteStart + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(noteStart);
    osc.stop(noteStart + 0.65);
  });
}

/**
 * Play a soft cute bubble pop
 */
export function playPop() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(240, now + 0.08);

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.09);
}
