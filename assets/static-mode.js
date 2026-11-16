// Mode prototipe statis: tidak ada server, jadi form tidak menyimpan apa pun.
(function () {
  var root = new URL('..', document.currentScript.src).href;
  var toastEl;
  function toast(pesan) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = pesan;
    toastEl.classList.add('show');
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  }
  document.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation(); // lewati konfirmasi hapus bawaan
    var aksi = e.target.getAttribute('data-aksi') || '';
    if (aksi === '/login') { location.href = root + 'admin/index.html'; return; }
    if (aksi === '/logout') { location.href = root + 'login.html'; return; }
    toast('Prototipe: data tidak disimpan.');
  }, true);
  document.addEventListener('DOMContentLoaded', function () {
    var login = document.querySelector('form[data-aksi="/login"]');
    if (login) {
      login.querySelector('[name=email]').value = 'operator@sekolah.test';
      login.querySelector('[name=password]').value = 'prototipe';
    }
    var lencana = document.createElement('div');
    lencana.textContent = 'Prototipe — data contoh';
    lencana.style.cssText = 'position:fixed;left:12px;bottom:12px;z-index:9999;background:#1d2b3a;color:#fff;font:600 12px Arial;padding:6px 10px;border-radius:999px;opacity:.85;pointer-events:none';
    document.body.appendChild(lencana);
  });
})();