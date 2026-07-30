/* ==========================================================================
   AquaFix — validation.js
   Form validation with toast alerts + simple functionalities
   ========================================================================== */
   (function () {
    'use strict';
  
    /* ---------- Toast helper ---------- */
    function toast(message, type) {
      type = type || 'info';
      var icon = type === 'success' ? 'bi-check-circle-fill' : type === 'error' ? 'bi-exclamation-triangle-fill' : 'bi-info-circle-fill';
      var existing = document.getElementById('aquaToast');
      if (existing) existing.remove();
      var el = document.createElement('div');
      el.id = 'aquaToast';
      el.className = 'alert-toast alert-' + type;
      el.innerHTML = '<i class="bi ' + icon + '"></i><div>' + message + '</div>';
      document.body.appendChild(el);
      requestAnimationFrame(function () { el.classList.add('show'); });
      setTimeout(function () {
        el.classList.remove('show');
        setTimeout(function () { el.remove(); }, 400);
      }, 4000);
    }
    window.aquaToast = toast;
  
    /* ---------- Field validation ---------- */
    function setInvalid(field, msg) {
      field.classList.add('invalid');
      field.setAttribute('aria-invalid', 'true');
      var hint = field.parentNode.querySelector('.field-hint');
      if (!hint) {
        hint = document.createElement('span');
        hint.className = 'field-hint';
        hint.style.cssText = 'display:block;margin-top:.3rem;font-size:.75rem;color:var(--error-500,#ef4444);';
        field.parentNode.appendChild(hint);
      }
      hint.textContent = msg;
    }
    function setValid(field) {
      field.classList.remove('invalid');
      field.removeAttribute('aria-invalid');
      var hint = field.parentNode.querySelector('.field-hint');
      if (hint) hint.remove();
    }
  
    function validateField(field) {
      var val = (field.value || '').trim();
      var name = field.name || field.id;
      setValid(field);
      if (field.hasAttribute('required') && !val) {
        setInvalid(field, 'This field is required.');
        return false;
      }
      if (field.type === 'email' && val) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(val)) { setInvalid(field, 'Please enter a valid email address.'); return false; }
      }
      if (field.type === 'tel' && val) {
        var digits = val.replace(/[^0-9]/g, '');
        if (digits.length < 10) { setInvalid(field, 'Please enter a valid phone number.'); return false; }
      }
      if (name === 'zip' && val) {
        if (!/^[0-9]{5}$/.test(val)) { setInvalid(field, 'ZIP code must be 5 digits.'); return false; }
      }
      if (field.dataset.minLength) {
        var min = parseInt(field.dataset.minLength, 10);
        if (val.length < min) { setInvalid(field, 'Must be at least ' + min + ' characters.'); return false; }
      }
      return true;
    }
  
    /* ---------- Attach to all validated forms ---------- */
    document.querySelectorAll('form[data-validate]').forEach(function (form) {
      var fields = form.querySelectorAll('[data-validate-field]');
      // live validate on blur
      fields.forEach(function (f) {
        f.addEventListener('blur', function () { validateField(f); });
        f.addEventListener('input', function () {
          if (f.classList.contains('invalid')) validateField(f);
        });
      });
  
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var ok = true;
        fields.forEach(function (f) { if (!validateField(f)) ok = false; });
  
        if (!ok) {
          toast('Please fix the highlighted fields and try again.', 'error');
          var firstInvalid = form.querySelector('.invalid');
          if (firstInvalid) firstInvalid.focus();
          return;
        }
  
        var successMsg = form.getAttribute('data-success') || 'Thank you! We will be in touch shortly.';
        toast(successMsg, 'success');
        form.reset();
        fields.forEach(setValid);
  
        // custom hook
        var afterSubmit = form.getAttribute('data-after-submit');
        if (afterSubmit && typeof window[afterSubmit] === 'function') window[afterSubmit]();
      });
    });
  
    /* ---------- ZIP coverage checker ---------- */
    var zipForm = document.getElementById('zipForm');
    if (zipForm) {
      var areas = JSON.parse(zipForm.getAttribute('data-areas') || '[]');
      zipForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = zipForm.querySelector('[name="zip"]');
        var result = document.getElementById('zipResult');
        var val = (input.value || '').trim();
        if (!/^[0-9]{5}$/.test(val)) {
          toast('Please enter a valid 5-digit ZIP code.', 'error');
          return;
        }
        var found = areas.filter(function (a) { return a.zip === val; })[0];
        if (result) {
          result.classList.remove('hidden');
          if (found) {
            result.innerHTML = '<i class="bi bi-check-circle-fill" style="color:var(--accent-500)"></i> Yes! We serve <strong>' + found.name + '</strong> (' + found.zip + ') with an average arrival of <strong>' + found.eta + '</strong>.';
          } else {
            result.innerHTML = '<i class="bi bi-info-circle-fill" style="color:var(--warn-500)"></i> Sorry, we do not cover ZIP ' + val + ' yet. Call us and we will try to help.';
          }
        }
      });
    }
  
    /* ---------- Countdown timer ---------- */
    var countdown = document.getElementById('countdown');
    if (countdown) {
      var target = new Date(countdown.getAttribute('data-target')).getTime();
      var tick = function () {
        var now = Date.now();
        var diff = Math.max(0, target - now);
        var d = Math.floor(diff / 86400000);
        var h = Math.floor((diff % 86400000) / 3600000);
        var m = Math.floor((diff % 3600000) / 60000);
        var s = Math.floor((diff % 60000) / 1000);
        var set = function (id, v) { var el = document.getElementById(id); if (el) el.textContent = String(v).padStart(2, '0'); };
        set('cd-days', d); set('cd-hours', h); set('cd-mins', m); set('cd-secs', s);
      };
      tick();
      setInterval(tick, 1000);
    }
  
    /* ---------- Maintenance progress ---------- */
    var progressFill = document.getElementById('progressFill');
    if (progressFill) {
      var pct = 0;
      setInterval(function () {
        pct = (pct + 1) % 101;
        progressFill.style.width = pct + '%';
      }, 80);
    }
  })();
  