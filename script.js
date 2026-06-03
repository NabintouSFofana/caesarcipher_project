/*
 * Caesar Cipher · Nabintou S. Fofana · 2025
 * MIT-licensed code · https://github.com/NabintouSFofana/caesarcipher_project
 */

/* ============================================================
   CAESAR CIPHER — web demo
   Vanilla JS port of the Java algorithm + alphabet wheel.
   ============================================================ */

(() => {
  'use strict';

  // ── The algorithm (1:1 with CaesarsCipher.java) ───────────
  function caesarEncrypt(text, shift) {
    if (text == null) throw new TypeError('text must not be null');
    const n = ((shift % 26) + 26) % 26;
    let out = '';
    for (const c of text) {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) {        // A-Z
        out += String.fromCharCode(65 + ((code - 65 + n) % 26));
      } else if (code >= 97 && code <= 122) {  // a-z
        out += String.fromCharCode(97 + ((code - 97 + n) % 26));
      } else {
        out += c;
      }
    }
    return out;
  }

  // ── DOM ───────────────────────────────────────────────────
  const $ = (id) => document.getElementById(id);
  const plainInput   = $('plainInput');
  const shiftInput   = $('shiftInput');
  const shiftDisplay = $('shiftDisplay');
  const cipherOutput = $('cipherOutput');
  const copyBtn      = $('copyBtn');
  const swapBtn      = $('swapBtn');
  const toast        = $('toast');
  const toastText    = $('toastText');
  const innerRing    = $('innerRing');
  const wheelSvg     = $('wheelSvg');

  // ── Wheel: build letter labels ────────────────────────────
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  function placeLettersOnRing(parent, radius, klass) {
    for (let i = 0; i < 26; i++) {
      const angleDeg = (i / 26) * 360 - 90;          // start at top
      const angleRad = (angleDeg * Math.PI) / 180;
      const x = Math.cos(angleRad) * radius;
      const y = Math.sin(angleRad) * radius;
      const t = document.createElementNS(SVG_NS, 'text');
      t.setAttribute('x', x.toFixed(2));
      t.setAttribute('y', y.toFixed(2));
      t.setAttribute('class', `letter ${klass}`);
      t.dataset.index = String(i);
      t.textContent = ALPHABET[i];
      parent.appendChild(t);
    }
  }

  // Outer ring (plaintext) is static — put it in the root SVG
  placeLettersOnRing(wheelSvg, 95, 'outer');
  // Inner ring (ciphertext) rotates with shift
  placeLettersOnRing(innerRing, 65, 'inner');

  function rotateWheel(shift) {
    const n = ((shift % 26) + 26) % 26;
    const deg = (n / 26) * 360;
    innerRing.setAttribute('transform', `rotate(${deg})`);
  }

  // ── Render ────────────────────────────────────────────────
  function render() {
    const text = plainInput.value;
    const shift = parseInt(shiftInput.value, 10) || 0;
    shiftDisplay.textContent = `${shift > 0 ? '+' : ''}${shift}`;
    cipherOutput.value = caesarEncrypt(text, shift);
    rotateWheel(shift);
    highlightFirstLetter(text);
  }

  function highlightFirstLetter(text) {
    // Find first letter in plaintext; highlight it on outer ring + its target on inner
    [...wheelSvg.querySelectorAll('.letter.match')].forEach(el => el.classList.remove('match'));
    for (const c of text) {
      const code = c.charCodeAt(0);
      let idx = -1;
      if (code >= 65 && code <= 90) idx = code - 65;
      else if (code >= 97 && code <= 122) idx = code - 97;
      if (idx >= 0) {
        const outerEl = wheelSvg.querySelector(`.letter.outer[data-index="${idx}"]`);
        if (outerEl) outerEl.classList.add('match');
        const innerEl = innerRing.querySelector(`.letter.inner[data-index="${idx}"]`);
        if (innerEl) innerEl.classList.add('match');
        return;
      }
    }
  }

  // ── Events ────────────────────────────────────────────────
  plainInput.addEventListener('input', render);
  shiftInput.addEventListener('input', render);

  document.querySelectorAll('.chip[data-shift]').forEach(chip => {
    chip.addEventListener('click', () => {
      shiftInput.value = chip.dataset.shift;
      render();
    });
  });

  swapBtn.addEventListener('click', () => {
    // swap output back into input and flip the shift sign
    plainInput.value = cipherOutput.value;
    shiftInput.value = String(-parseInt(shiftInput.value, 10));
    render();
    plainInput.focus();
  });

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(cipherOutput.value);
      showToast('Copied ciphertext to clipboard');
    } catch {
      // Fallback for older browsers / non-https
      cipherOutput.select();
      document.execCommand('copy');
      showToast('Copied ciphertext');
    }
  });

  // ── Toast ─────────────────────────────────────────────────
  let toastTimer;
  function showToast(message) {
    toastText.textContent = message;
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add('is-visible'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => { toast.hidden = true; }, 250);
    }, 1800);
  }

  // ── Boot ──────────────────────────────────────────────────
  render();
})();
