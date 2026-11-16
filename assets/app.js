document.addEventListener('DOMContentLoaded', function () {
  var toastEl;
  function toast(message) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastEl._timer);
    toastEl._timer = setTimeout(function () { toastEl.classList.remove('show'); }, 2400);
  }

  // Placeholder links for modules that are not part of iteration 1.
  document.querySelectorAll('[data-soon]').forEach(function (el) {
    el.addEventListener('click', function (event) {
      event.preventDefault();
      toast(el.dataset.soon + ' belum tersedia di prototipe ini.');
    });
  });
  // Demo-only actions on static admin pages: show a confirmation toast.
  document.querySelectorAll('[data-toast]').forEach(function (el) {
    el.addEventListener('click', function (event) {
      event.preventDefault();
      toast(el.dataset.toast);
    });
  });

  var overlay = document.getElementById('overlay');
  var sidebar = document.getElementById('sidebar');
  var menuToggle = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');
  var sideToggle = document.getElementById('sideToggle');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  // Dropdown menu utama: buka satu, tutup yang lain; klik di luar menu menutup semuanya.
  var dropdowns = document.querySelectorAll('.nav-drop');
  dropdowns.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) dropdowns.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });
  document.addEventListener('click', function (e) {
    dropdowns.forEach(function (d) { if (!d.contains(e.target)) d.open = false; });
  });

  if (sideToggle && sidebar && overlay) {
    sideToggle.addEventListener('click', function () {
      sidebar.classList.add('open');
      overlay.classList.add('open');
    });
  }

  function openDrawer(id) {
    var drawer = document.getElementById(id);
    if (!drawer) return;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawers() {
    document.querySelectorAll('.drawer.open').forEach(function (d) {
      d.classList.remove('open');
      d.setAttribute('aria-hidden', 'true');
    });
    if (overlay) overlay.classList.remove('open');
    if (sidebar) sidebar.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (overlay) overlay.addEventListener('click', closeDrawers);
  document.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', closeDrawers);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeDrawers();
  });
  document.querySelectorAll('[data-drawer]').forEach(function (el) {
    el.addEventListener('click', function (event) {
      event.preventDefault();
      openDrawer(el.dataset.drawer);
    });
  });

  // Tabs: Berita / Prestasi.
  var tabButtons = document.querySelectorAll('[data-tab-target]');
  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabButtons.forEach(function (b) { b.classList.toggle('active', b === btn); });
      document.querySelectorAll('[data-panel]').forEach(function (panel) {
        panel.hidden = panel.id !== btn.dataset.tabTarget;
      });
    });
  });
  if (location.hash === '#prestasi') {
    var prestasiTab = document.querySelector('[data-tab-target="panel-prestasi"]');
    if (prestasiTab) prestasiTab.click();
  }

  // Visit form.
  var formKunjungan = document.getElementById('formKunjungan');
  if (formKunjungan) {
    formKunjungan.querySelectorAll('input, select, textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        var field = input.closest('.field');
        if (field) field.classList.remove('invalid');
      });
    });
    formKunjungan.addEventListener('submit', function (event) {
      event.preventDefault();
      var valid = true;
      formKunjungan.querySelectorAll('[required]').forEach(function (input) {
        var field = input.closest('.field');
        var ok = input.type === 'checkbox' ? input.checked : input.value.trim() !== '';
        if (input.id === 'wa' && ok) {
          ok = /^08\d{8,13}$/.test(input.value.replace(/[\s-]/g, ''));
          var error = field.querySelector('.error-text');
          if (error) error.textContent = ok ? '' : 'Format nomor WhatsApp tidak valid. Gunakan 08xx xxxx xxxx.';
        }
        if (field) field.classList.toggle('invalid', !ok);
        if (!ok) valid = false;
      });
      if (!valid) {
        toast('Periksa kembali field yang wajib diisi.');
        return;
      }
      var nama = document.getElementById('nama').value.trim();
      var instansi = document.getElementById('instansi').value.trim();
      location.href = 'kunjungan/sukses.html?nama=' + encodeURIComponent(nama) + '&instansi=' + encodeURIComponent(instansi);
    });
  }

  // Generic public forms (Lomba, Reservasi, Agenda).
  document.querySelectorAll('form[data-validate]').forEach(function (form) {
    form.querySelectorAll('input, select, textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        var field = input.closest('.field');
        if (field) field.classList.remove('invalid');
      });
      input.addEventListener('change', function () {
        var field = input.closest('.field');
        if (field) field.classList.remove('invalid');
      });
    });
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var valid = true;
      form.querySelectorAll('[required]').forEach(function (input) {
        var field = input.closest('.field');
        var ok;
        if (input.type === 'checkbox') ok = input.checked;
        else if (input.type === 'file') ok = input.files && input.files.length > 0;
        else ok = input.value.trim() !== '';
        if (input.id === 'wa' && ok) {
          ok = /^08\d{8,13}$/.test(input.value.replace(/[\s-]/g, ''));
          var error = field.querySelector('.error-text');
          if (error) error.textContent = ok ? 'Nomor WhatsApp wajib diisi.' : 'Format nomor WhatsApp tidak valid. Gunakan 08xx xxxx xxxx.';
        }
        if (input.type === 'email' && ok) {
          ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
        }
        if (field) field.classList.toggle('invalid', !ok);
        if (!ok) valid = false;
      });
      if (!valid) {
        toast('Periksa kembali field yang wajib diisi.');
        return;
      }
      var namaEl = form.querySelector('[name="nama"]');
      var params = '?jenis=' + encodeURIComponent(form.dataset.jenis || '') +
        '&kode=' + encodeURIComponent(form.dataset.kode || '') +
        '&nama=' + encodeURIComponent(namaEl ? namaEl.value.trim() : '');
      location.href = form.dataset.success + params;
    });
  });

  // Preselect an agenda event from the event list.
  document.querySelectorAll('[data-daftar]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var form = document.getElementById('formAgenda');
      if (!form) return;
      var select = form.querySelector('#kegiatan');
      select.value = btn.dataset.daftar;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      if (form.scrollIntoView) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      select.focus({ preventScroll: true });
    });
  });

  var successName = document.getElementById('successName');
  if (successName) {
    var params = new URLSearchParams(location.search);
    var nama = params.get('nama');
    var instansi = params.get('instansi');
    var jenis = params.get('jenis');
    var kode = params.get('kode');
    if (nama) {
      successName.textContent = nama;
      var successName2 = document.getElementById('successName2');
      if (successName2) successName2.textContent = nama;
    }
    if (instansi) {
      var instansiEl = document.getElementById('successInstansi');
      if (instansiEl) instansiEl.textContent = instansi;
    }
    if (jenis) {
      var jenis1 = document.getElementById('successJenis');
      var jenis2 = document.getElementById('successJenis2');
      if (jenis1) jenis1.textContent = jenis;
      if (jenis2) jenis2.textContent = jenis;
    }
    if (kode) {
      var kodeEl = document.getElementById('kodeSukses');
      if (kodeEl) kodeEl.textContent = kode;
    }
  }

  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var source = document.getElementById(btn.dataset.copy);
      if (!source) return;
      var text = source.textContent.trim();
      var area = document.createElement('textarea');
      area.value = text;
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand('copy');
        toast('Kode disalin.');
      } catch (err) {
        toast('Salin manual: ' + text);
      }
      area.remove();
    });
  });

  document.querySelectorAll('[data-counter]').forEach(function (input) {
    var output = document.getElementById(input.dataset.counter);
    var max = input.maxLength > 0 ? input.maxLength : 300;
    var update = function () { if (output) output.textContent = input.value.length + '/' + max; };
    input.addEventListener('input', update);
    update();
  });

  // Cek Status.
  var STATUS = {
    menunggu: ['Menunggu', 'badge-warning'],
    disetujui: ['Disetujui', 'badge-success'],
    ditolak: ['Ditolak', 'badge-danger'],
    diterima: ['Diterima', 'badge-success'],
    revisi: ['Revisi', 'badge-info'],
    dikonfirmasi: ['Dikonfirmasi', 'badge-success']
  };
  var DATA = {
    'KJG-261103-7KQ2': {
      jenis: 'Kunjungan Tamu', status: 'menunggu',
      detail: [['Nama', 'Yohanes Tefa'], ['Instansi', 'Dinas Pendidikan Kota Kupang'], ['Tanggal kunjungan', '5 November 2026'], ['Diajukan', '3 November 2026, 09.14 WITA'], ['Keperluan', 'Koordinasi program literasi sekolah']],
      timeline: [['Pengajuan diterima', '3 November 2026, 09.14', 'done'], ['Verifikasi admin', 'Sedang diproses', 'active'], ['Jadwal dikonfirmasi', 'Menunggu verifikasi', '']]
    },
    'KJG-261031-3TKR': {
      jenis: 'Kunjungan Tamu', status: 'disetujui',
      detail: [['Nama', 'Fransiska Lobo'], ['Instansi', 'Universitas Nusa Cendana'], ['Tanggal kunjungan', '4 November 2026'], ['Jadwal konfirmasi', '4 November 2026, 10.00 WITA'], ['Keperluan', 'Studi lapangan mahasiswa']],
      timeline: [['Pengajuan diterima', '31 Oktober 2026, 13.20', 'done'], ['Verifikasi admin', '1 November 2026, 08.45', 'done'], ['Jadwal dikonfirmasi', '4 November 2026, 10.00 WITA', 'done']]
    },
    'KJG-261031-P6WD': {
      jenis: 'Kunjungan Tamu', status: 'ditolak',
      detail: [['Nama', 'Aleksander Bria'], ['Instansi', 'Puskesmas Bakunase'], ['Tanggal kunjungan', '3 November 2026'], ['Diajukan', '31 Oktober 2026, 08.30 WITA'], ['Keperluan', 'Sosialisasi kesehatan sekolah']],
      timeline: [['Pengajuan diterima', '31 Oktober 2026, 08.30', 'done'], ['Verifikasi admin', '1 November 2026, 09.10', 'done'], ['Pengajuan ditolak', '1 November 2026, 09.10', 'active']]
    },
    'LMB-261103-M4XA': {
      jenis: 'Pendaftaran Lomba', status: 'revisi',
      detail: [['Peserta', 'Kelas IX A'], ['Lomba', 'Lomba Cerdas Cermat'], ['Asal sekolah', 'SMP Negeri 5 Kota Kupang'], ['Diajukan', '3 November 2026, 10.02 WITA'], ['Karya', 'lcc-ix-a.pdf']],
      timeline: [['Pendaftaran diterima', '3 November 2026, 10.02', 'done'], ['Verifikasi panitia', '3 November 2026, 14.10', 'done'], ['Revisi berkas', 'Menunggu unggahan ulang', 'active']],
      note: 'Berkas karya kurang jelas. Silakan unggah ulang.',
      hp4: '7890'
    },
    'RSV-261102-9BHT': {
      jenis: 'Reservasi Sarana', status: 'menunggu',
      detail: [['Pemohon', 'Paulus Neno'], ['Sarana', 'Aula Serbaguna'], ['Tanggal pakai', '20 November 2026'], ['Waktu', '08.00–12.00 WITA'], ['Keperluan', 'Rapat komite sekolah']],
      timeline: [['Pengajuan diterima', '2 November 2026, 15.30', 'done'], ['Verifikasi admin', 'Sedang diperiksa', 'active'], ['Jadwal dikonfirmasi', 'Menunggu verifikasi', '']]
    },
    'AGT-261101-P6WD': {
      jenis: 'Pendaftaran Kegiatan', status: 'dikonfirmasi',
      detail: [['Peserta', 'Maria Goreti'], ['Kegiatan', 'Peringatan Hari Guru'], ['Tanggal', '25 November 2026'], ['Lokasi', 'Aula Serbaguna'], ['Diajukan', '1 November 2026, 11.05 WITA']],
      timeline: [['Pendaftaran diterima', '1 November 2026, 11.05', 'done'], ['Verifikasi admin', '2 November 2026, 09.00', 'done'], ['Peserta dikonfirmasi', '2 November 2026, 09.00', 'done']]
    },
    'LMB-261104-8QK2': {
      jenis: 'Pendaftaran Lomba', status: 'menunggu',
      detail: [['Peserta', 'Maria Goreti'], ['Lomba', 'Lomba Cerdas Cermat'], ['Asal sekolah', 'SMP Negeri 5 Kota Kupang'], ['Karya', 'lcc-ix-a.pdf'], ['Diajukan', '4 November 2026, 08.10 WITA']],
      timeline: [['Pendaftaran diterima', '4 November 2026, 08.10', 'done'], ['Verifikasi panitia', 'Sedang diperiksa', 'active'], ['Hasil seleksi', 'Menunggu verifikasi', '']]
    },
    'RSV-261104-2NHT': {
      jenis: 'Reservasi Sarana', status: 'menunggu',
      detail: [['Pemohon', 'Paulus Neno'], ['Sarana', 'Aula Serbaguna'], ['Tanggal pakai', '20 November 2026'], ['Waktu', '08.00–12.00 WITA'], ['Keperluan', 'Rapat komite sekolah']],
      timeline: [['Pengajuan diterima', '4 November 2026, 09.20', 'done'], ['Pemeriksaan ketersediaan', 'Sedang diperiksa', 'active'], ['Jadwal dikonfirmasi', 'Menunggu verifikasi', '']]
    },
    'AGT-261104-5WPD': {
      jenis: 'Pendaftaran Kegiatan', status: 'menunggu',
      detail: [['Peserta', 'Maria Goreti'], ['Kegiatan', 'Peringatan Hari Guru'], ['Tanggal', '25 November 2026'], ['Lokasi', 'Aula Serbaguna'], ['Diajukan', '4 November 2026, 10.05 WITA']],
      timeline: [['Pendaftaran diterima', '4 November 2026, 10.05', 'done'], ['Verifikasi admin', 'Sedang diperiksa', 'active'], ['Peserta dikonfirmasi', 'Menunggu verifikasi', '']]
    }
  };
  var hasilStatus = document.getElementById('hasilStatus');
  function renderStatus(code, data) {
    if (!data) {
      hasilStatus.innerHTML = '<div class="card center" style="padding:40px"><div class="icon-tile amber" style="margin:0 auto 12px">?</div><h3>Kode tidak ditemukan</h3><p class="small muted mt-8">Periksa kembali kode Anda. Kode terdiri dari 3 huruf, tanggal, dan 4 karakter acak.</p></div>';
      return;
    }
    var badge = STATUS[data.status];
    var detail = data.detail.map(function (row) {
      return '<div><dt>' + row[0] + '</dt><dd>' + row[1] + '</dd></div>';
    }).join('');
    var timeline = data.timeline.map(function (step) {
      return '<div class="tl-item ' + step[2] + '"><span class="tl-dot"></span><div><strong>' + step[0] + '</strong><span>' + step[1] + '</span></div></div>';
    }).join('');
    var note = '';
    if (data.note) {
      note = '<div class="note-box note-warning"><strong>Catatan Panitia</strong><p class="mt-8">' + data.note + '</p></div>' +
        '<div class="field mt-16"><label for="hp4">4 Digit Terakhir No. HP <span class="req">*</span></label><input id="hp4" type="text" inputmode="numeric" maxlength="4" placeholder="Contoh: 7890" autocomplete="off"><div class="hint">Sesuai nomor HP yang dipakai saat mendaftar.</div><div class="error-text">4 digit terakhir nomor HP tidak cocok.</div></div>' +
        '<div class="field"><label for="berkasUlang">Unggah Ulang Berkas <span class="req">*</span></label><input id="berkasUlang" type="file" accept=".pdf,.jpg,.jpeg,.png"><div class="hint">PDF, JPG, atau PNG, maksimal 5 MB.</div><div class="error-text">Berkas wajib dipilih.</div></div>' +
        '<button class="btn btn-primary" type="button" data-upload>Kirim Perbaikan</button>';
    }
    if (data.status === 'ditolak') {
      note = '<div class="note-box note-danger"><strong>Catatan Admin</strong><p class="mt-8">Jadwal bentrok dengan kegiatan sekolah. Silakan ajukan tanggal lain.</p></div><a class="btn btn-outline mt-16" href="kunjungan.html">Ajukan Ulang</a>';
    }
    hasilStatus.innerHTML =
      '<div class="card result-card">' +
        '<div class="result-head"><div><div class="tiny muted">Kode Pengajuan</div><div class="result-code mono">' + code + '</div></div><span class="badge ' + badge[1] + '">' + badge[0] + '</span></div>' +
        '<div class="row" style="margin-bottom:16px"><span class="badge badge-neutral">' + data.jenis + '</span></div>' +
        '<dl class="detail-grid">' + detail + '</dl>' +
        '<div class="timeline">' + timeline + '</div>' +
        note +
        '<div class="note-box note-info">Verifikasi dilakukan maksimal 1&times;24 jam kerja. Tidak ada notifikasi otomatis &mdash; simpan halaman ini atau kode Anda.</div>' +
      '</div>';
    var upload = hasilStatus.querySelector('[data-upload]');
    if (upload) {
      upload.addEventListener('click', function () {
        var hp4 = document.getElementById('hp4');
        var berkas = document.getElementById('berkasUlang');
        var ok = true;
        var cocok = hp4.value.trim() === data.hp4;
        hp4.closest('.field').classList.toggle('invalid', !cocok);
        if (!cocok) ok = false;
        var adaBerkas = berkas.files && berkas.files.length > 0;
        berkas.closest('.field').classList.toggle('invalid', !adaBerkas);
        if (!adaBerkas) ok = false;
        if (!ok) return;
        data.status = 'menunggu';
        delete data.note;
        data.timeline = [
          ['Pendaftaran diterima', '3 November 2026, 10.02', 'done'],
          ['Verifikasi panitia', '3 November 2026, 14.10', 'done'],
          ['Berkas diperbaiki', '4 November 2026, 10.00 WITA', 'done'],
          ['Verifikasi ulang', 'Sedang diperiksa', 'active']
        ];
        renderStatus(code, data);
        toast('Berkas perbaikan terkirim. Status kembali ke Menunggu.');
      });
    }
  }
  var formCek = document.getElementById('formCek');
  if (formCek && hasilStatus) {
    formCek.addEventListener('submit', function (event) {
      event.preventDefault();
      var code = document.getElementById('kodeStatus').value.trim().toUpperCase();
      renderStatus(code, DATA[code]);
    });
    document.querySelectorAll('[data-kode-demo]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.getElementById('kodeStatus').value = btn.dataset.kodeDemo;
        formCek.requestSubmit();
      });
    });
    renderStatus('KJG-261103-7KQ2', DATA['KJG-261103-7KQ2']);
  }

  // Admin: verification drawer.
  var btnSetujui = document.getElementById('btnSetujui');
  var vJadwal = document.getElementById('vJadwal');
  var vCatatan = document.getElementById('vCatatan');
  var currentRow = null;
  var currentPending = true;
  function updateRowStatus(row, status) {
    if (!row) return;
    var badge = row.querySelector('.badge');
    if (badge) {
      badge.className = 'badge ' + (status === 'Disetujui' ? 'badge-success' : status === 'Ditolak' ? 'badge-danger' : 'badge-warning');
      badge.textContent = status;
    }
    row.dataset.status = status.toLowerCase();
  }
  document.querySelectorAll('[data-verifikasi]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      currentRow = document.getElementById(btn.dataset.row);
      document.getElementById('vKode').textContent = btn.dataset.kode;
      document.getElementById('vNama').textContent = btn.dataset.nama;
      document.getElementById('vInstansi').textContent = btn.dataset.instansi;
      document.getElementById('vHp').textContent = btn.dataset.hp;
      document.getElementById('vTanggal').textContent = btn.dataset.tanggal;
      document.getElementById('vKeperluan').textContent = btn.dataset.keperluan;
      document.getElementById('vDiajukan').textContent = btn.dataset.diajukan;
      var badge = document.getElementById('vStatus');
      badge.className = 'badge ' + (btn.dataset.status === 'Disetujui' ? 'badge-success' : btn.dataset.status === 'Ditolak' ? 'badge-danger' : 'badge-warning');
      badge.textContent = btn.dataset.status;
      vJadwal.value = '';
      vCatatan.value = '';
      vJadwal.closest('.field').classList.remove('invalid');
      vCatatan.closest('.field').classList.remove('invalid');
      currentPending = btn.dataset.status === 'Menunggu';
      btnTolak.disabled = !currentPending;
      btnSetujui.disabled = true;
      document.getElementById('vHint').textContent = currentPending ? 'Isi jadwal konfirmasi terlebih dahulu.' : 'Pengajuan sudah diverifikasi.';
      openDrawer('drawerVerifikasi');
    });
  });
  if (vJadwal) {
    vJadwal.addEventListener('input', function () {
      if (!currentPending) return;
      btnSetujui.disabled = !vJadwal.value;
      document.getElementById('vHint').textContent = vJadwal.value ? '' : 'Isi jadwal konfirmasi terlebih dahulu.';
    });
  }
  if (btnSetujui) {
    btnSetujui.addEventListener('click', function () {
      if (btnSetujui.disabled) return;
      updateRowStatus(currentRow, 'Disetujui');
      closeDrawers();
      toast('Kunjungan disetujui (demo).');
    });
  }
  var btnTolak = document.getElementById('btnTolak');
  if (btnTolak) {
    btnTolak.addEventListener('click', function () {
      if (btnTolak.disabled) return;
      if (!vCatatan.value.trim()) {
        vCatatan.closest('.field').classList.add('invalid');
        vCatatan.focus();
        return;
      }
      updateRowStatus(currentRow, 'Ditolak');
      closeDrawers();
      toast('Kunjungan ditolak (demo).');
    });
  }

  // Admin filters.
  function applyKunjunganFilter() {
    var q = (document.getElementById('cariKunjungan').value || '').toLowerCase();
    var active = document.querySelector('[data-filter].active');
    var status = active ? active.dataset.filter : 'semua';
    document.querySelectorAll('#tabelKunjungan tbody tr').forEach(function (tr) {
      var matchText = tr.textContent.toLowerCase().indexOf(q) !== -1;
      var matchStatus = status === 'semua' || tr.dataset.status === status;
      tr.style.display = matchText && matchStatus ? '' : 'none';
    });
  }
  document.querySelectorAll('[data-filter]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-filter]').forEach(function (b) { b.classList.toggle('active', b === btn); });
      applyKunjunganFilter();
    });
  });
  var cariKunjungan = document.getElementById('cariKunjungan');
  if (cariKunjungan) {
    cariKunjungan.addEventListener('input', applyKunjunganFilter);
    document.getElementById('btnTerapkanKunjungan').addEventListener('click', applyKunjunganFilter);
    document.getElementById('btnResetKunjungan').addEventListener('click', function () {
      cariKunjungan.value = '';
      document.querySelector('[data-filter="semua"]').click();
    });
  }

  // Directory filter.
  var daftarGuru = document.getElementById('daftarGuru');
  if (daftarGuru) {
    var cariGuru = document.getElementById('cariGuru');
    var kategori = 'semua';
    var applyGuru = function () {
      var q = (cariGuru.value || '').toLowerCase();
      daftarGuru.querySelectorAll('[data-kategori]').forEach(function (card) {
        var matchText = card.textContent.toLowerCase().indexOf(q) !== -1;
        var matchKategori = kategori === 'semua' || card.dataset.kategori === kategori;
        card.style.display = matchText && matchKategori ? '' : 'none';
      });
    };
    document.querySelectorAll('#filterGuru [data-kategori]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('#filterGuru [data-kategori]').forEach(function (b) { b.classList.toggle('active', b === btn); });
        kategori = btn.dataset.kategori;
        applyGuru();
      });
    });
    cariGuru.addEventListener('input', applyGuru);
  }

  // Admin: shared status helper.
  function statusBadge(status) {
    if (status === 'Diterima' || status === 'Disetujui' || status === 'Dikonfirmasi' || status === 'Aktif') return 'badge-success';
    if (status === 'Ditolak' || status === 'Nonaktif') return 'badge-danger';
    if (status === 'Revisi') return 'badge-info';
    if (status === 'Menunggu') return 'badge-warning';
    return 'badge-neutral';
  }
  function setStatusBadge(row, status) {
    if (!row) return;
    var badge = row.querySelector('.badge');
    if (badge) {
      badge.className = 'badge ' + statusBadge(status);
      badge.textContent = status;
    }
    row.dataset.status = status.toLowerCase();
  }

  function applyAdminFilter(tableId, searchId, selectId, tabSelector, tabDataKey) {
    var table = document.getElementById(tableId);
    if (!table) return;
    var q = (document.getElementById(searchId).value || '').toLowerCase();
    var status = document.getElementById(selectId).value;
    if (!status) {
      var active = document.querySelector(tabSelector + '.active');
      status = active ? active.dataset[tabDataKey] : 'semua';
    }
    table.querySelectorAll('tbody tr').forEach(function (tr) {
      var matchText = tr.textContent.toLowerCase().indexOf(q) !== -1;
      var matchStatus = !status || status === 'semua' || tr.dataset.status === status;
      tr.style.display = matchText && matchStatus ? '' : 'none';
    });
  }

  if (document.getElementById('tabelLomba')) {
    var applyLomba = function () {
      applyAdminFilter('tabelLomba', 'cariLomba', 'statusLomba', '[data-lomba-filter]', 'lombaFilter');
    };
    document.querySelectorAll('[data-lomba-filter]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('[data-lomba-filter]').forEach(function (t) { t.classList.toggle('active', t === tab); });
        applyLomba();
      });
    });
    document.getElementById('cariLomba').addEventListener('input', applyLomba);
    document.getElementById('statusLomba').addEventListener('change', applyLomba);
    document.getElementById('btnTerapkanLomba').addEventListener('click', applyLomba);
  }

  if (document.getElementById('tabelReservasi')) {
    var applyReservasi = function () {
      applyAdminFilter('tabelReservasi', 'cariReservasi', 'statusReservasi', '[data-res-filter]', 'resFilter');
    };
    document.querySelectorAll('[data-res-filter]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('[data-res-filter]').forEach(function (t) { t.classList.toggle('active', t === tab); });
        applyReservasi();
      });
    });
    document.getElementById('cariReservasi').addEventListener('input', applyReservasi);
    document.getElementById('statusReservasi').addEventListener('change', applyReservasi);
    document.getElementById('btnTerapkanReservasi').addEventListener('click', applyReservasi);
  }

  // Admin: Lomba.
  var lombaRow = null;
  document.querySelectorAll('[data-lomba]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      lombaRow = document.getElementById(btn.dataset.row);
      document.getElementById('lKode').textContent = btn.dataset.kode;
      document.getElementById('lNama').textContent = btn.dataset.nama;
      document.getElementById('lLomba').textContent = btn.dataset.lombaNama;
      document.getElementById('lAsal').textContent = btn.dataset.asal;
      document.getElementById('lKarya').textContent = btn.dataset.karya;
      document.getElementById('lStatusSelect').value = btn.dataset.status;
      document.getElementById('lCatatan').value = '';
      document.getElementById('lCatatan').closest('.field').classList.remove('invalid');
      document.getElementById('lJuara').value = '';
      var badge = document.getElementById('lStatus');
      badge.className = 'badge ' + statusBadge(btn.dataset.status);
      badge.textContent = btn.dataset.status;
      document.getElementById('lHint').textContent = 'Pilih status lalu simpan.';
      openDrawer('drawerLomba');
    });
  });
  var lStatusSelect = document.getElementById('lStatusSelect');
  if (lStatusSelect) {
    lStatusSelect.addEventListener('change', function () {
      var badge = document.getElementById('lStatus');
      badge.className = 'badge ' + statusBadge(lStatusSelect.value);
      badge.textContent = lStatusSelect.value;
      document.getElementById('lHint').textContent = (lStatusSelect.value === 'Revisi' || lStatusSelect.value === 'Ditolak') ? 'Catatan wajib diisi untuk status ini.' : 'Pilih status lalu simpan.';
    });
  }
  var btnSimpanLomba = document.getElementById('btnSimpanLomba');
  if (btnSimpanLomba) {
    btnSimpanLomba.addEventListener('click', function () {
      var status = lStatusSelect.value;
      var catatan = document.getElementById('lCatatan');
      var needNote = status === 'Revisi' || status === 'Ditolak';
      if (needNote && !catatan.value.trim()) {
        catatan.closest('.field').classList.add('invalid');
        catatan.focus();
        return;
      }
      setStatusBadge(lombaRow, status);
      closeDrawers();
      toast('Status lomba disimpan: ' + status + ' (demo).');
    });
  }

  // Admin: Reservasi.
  var resRow = null;
  var resPending = true;
  var rCek = document.getElementById('rCek');
  var rCatatan = document.getElementById('rCatatan');
  document.querySelectorAll('[data-reservasi]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      resRow = document.getElementById(btn.dataset.row);
      document.getElementById('rKode').textContent = btn.dataset.kode;
      document.getElementById('rNama').textContent = btn.dataset.nama;
      document.getElementById('rInstansi').textContent = btn.dataset.instansi;
      document.getElementById('rSarana').textContent = btn.dataset.sarana;
      document.getElementById('rJadwal').textContent = btn.dataset.jadwal;
      document.getElementById('rKeperluan').textContent = btn.dataset.keperluan;
      var badge = document.getElementById('rStatus');
      badge.className = 'badge ' + statusBadge(btn.dataset.status);
      badge.textContent = btn.dataset.status;
      resPending = btn.dataset.status === 'Menunggu';
      rCek.checked = false;
      rCatatan.value = '';
      rCatatan.closest('.field').classList.remove('invalid');
      document.getElementById('btnSetujuiReservasi').disabled = true;
      document.getElementById('btnTolakReservasi').disabled = !resPending;
      document.getElementById('rHint').textContent = resPending ? 'Centang pemeriksaan ketersediaan untuk menyetujui.' : 'Pengajuan sudah diverifikasi.';
      openDrawer('drawerReservasi');
    });
  });
  if (rCek) {
    rCek.addEventListener('change', function () {
      document.getElementById('btnSetujuiReservasi').disabled = !rCek.checked || !resPending;
    });
  }
  var btnSetujuiReservasi = document.getElementById('btnSetujuiReservasi');
  if (btnSetujuiReservasi) {
    btnSetujuiReservasi.addEventListener('click', function () {
      if (btnSetujuiReservasi.disabled) return;
      setStatusBadge(resRow, 'Disetujui');
      closeDrawers();
      toast('Reservasi disetujui (demo).');
    });
  }
  var btnTolakReservasi = document.getElementById('btnTolakReservasi');
  if (btnTolakReservasi) {
    btnTolakReservasi.addEventListener('click', function () {
      if (btnTolakReservasi.disabled) return;
      if (!rCatatan.value.trim()) {
        rCatatan.closest('.field').classList.add('invalid');
        rCatatan.focus();
        return;
      }
      setStatusBadge(resRow, 'Ditolak');
      closeDrawers();
      toast('Reservasi ditolak (demo).');
    });
  }

  // Admin: Agenda participants and quota.
  function updateQuota(row) {
    var terisi = parseInt(row.dataset.terisi, 10);
    var kuota = parseInt(row.dataset.kuota, 10);
    var pct = Math.min(100, Math.round(terisi / kuota * 100));
    var text = row.querySelector('.quota-text');
    if (text) text.textContent = terisi + '/' + kuota;
    var bar = row.querySelector('.progress span');
    if (bar) bar.style.width = pct + '%';
    var pctEl = row.querySelectorAll('.spread.tiny span')[1];
    if (pctEl) pctEl.textContent = pct + '%';
  }
  function bindAgenda(btn) {
    btn.addEventListener('click', function () {
      document.getElementById('aKegiatan').textContent = btn.dataset.kegiatan;
      document.querySelectorAll('[data-peserta-panel]').forEach(function (panel) {
        panel.hidden = panel.dataset.pesertaPanel !== btn.dataset.row;
      });
      openDrawer('drawerAgenda');
    });
  }
  document.querySelectorAll('[data-agenda]').forEach(bindAgenda);
  document.querySelectorAll('[data-peserta-aksi]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var peserta = btn.closest('[data-peserta]');
      var eventRow = document.getElementById(peserta.dataset.event);
      var state = peserta.dataset.state;
      var action = btn.dataset.pesertaAksi;
      if (action === 'konfirmasi') {
        if (state === 'dikonfirmasi') { toast('Peserta sudah dikonfirmasi.'); return; }
        if (parseInt(eventRow.dataset.terisi, 10) >= parseInt(eventRow.dataset.kuota, 10)) {
          toast('Kuota kegiatan sudah penuh.');
          return;
        }
        eventRow.dataset.terisi = parseInt(eventRow.dataset.terisi, 10) + 1;
        peserta.dataset.state = 'dikonfirmasi';
        setStatusBadge(peserta, 'Dikonfirmasi');
      } else {
        if (state === 'ditolak') { toast('Peserta sudah ditolak.'); return; }
        if (state === 'dikonfirmasi') {
          eventRow.dataset.terisi = Math.max(0, parseInt(eventRow.dataset.terisi, 10) - 1);
        }
        peserta.dataset.state = 'ditolak';
        setStatusBadge(peserta, 'Ditolak');
      }
      updateQuota(eventRow);
    });
  });

  // Admin: create agenda.
  function formatTanggal(value) {
    var d = new Date(value + 'T00:00:00');
    if (isNaN(d.getTime())) return value;
    var bulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return d.getDate() + ' ' + bulan[d.getMonth()] + ' ' + d.getFullYear();
  }
  var btnSimpanAgenda = document.getElementById('btnSimpanAgenda');
  if (btnSimpanAgenda) {
    btnSimpanAgenda.addEventListener('click', function () {
      var nama = document.getElementById('agNama').value.trim();
      var tanggal = document.getElementById('agTanggal').value;
      var lokasi = document.getElementById('agLokasi').value.trim();
      var kuota = parseInt(document.getElementById('agKuota').value, 10);
      var valid = true;
      [['agNama', nama !== ''], ['agTanggal', tanggal !== ''], ['agLokasi', lokasi !== ''], ['agKuota', kuota > 0]].forEach(function (pair) {
        var field = document.getElementById(pair[0]).closest('.field');
        field.classList.toggle('invalid', !pair[1]);
        if (!pair[1]) valid = false;
      });
      if (!valid) return;

      var table = document.querySelector('#tabelAgenda tbody');
      var row = document.createElement('tr');
      row.id = 'arow' + (table.querySelectorAll('tr').length + 1);
      row.dataset.terisi = '0';
      row.dataset.kuota = kuota;
      row.innerHTML = '<td data-label="Kegiatan"></td><td data-label="Tanggal"></td><td data-label="Lokasi"></td><td data-label="Kuota"><div class="spread tiny"><span class="quota-text">0/' + kuota + '</span><span>0%</span></div><div class="progress mt-8" style="min-width:120px"><span style="width:0%"></span></div></td><td data-label="Status"><span class="badge badge-success">Terbuka</span></td><td data-label="Aksi"><div class="table-actions"></div></td>';
      row.cells[0].textContent = nama;
      row.cells[1].textContent = formatTanggal(tanggal);
      row.cells[2].textContent = lokasi;
      var actionBtn = document.createElement('button');
      actionBtn.className = 'btn btn-text btn-sm';
      actionBtn.type = 'button';
      actionBtn.dataset.agenda = '';
      actionBtn.dataset.row = row.id;
      actionBtn.dataset.kegiatan = nama;
      actionBtn.textContent = 'Kelola Peserta';
      bindAgenda(actionBtn);
      row.querySelector('.table-actions').appendChild(actionBtn);
      table.appendChild(row);

      var panel = document.createElement('div');
      panel.dataset.pesertaPanel = row.id;
      panel.hidden = true;
      panel.innerHTML = '<div class="note-box note-info">Belum ada peserta terdaftar.</div>';
      document.querySelector('#drawerAgenda .drawer-body').appendChild(panel);

      ['agNama', 'agTanggal', 'agLokasi', 'agKuota'].forEach(function (id) {
        document.getElementById(id).value = '';
        document.getElementById(id).closest('.field').classList.remove('invalid');
      });
      closeDrawers();
      toast('Kegiatan dibuat (demo).');
    });
  }

  // Admin: Akun.
  var akunRow = null;
  function bindAkunEdit(btn) {
    btn.addEventListener('click', function () {
      akunRow = document.getElementById(btn.dataset.row);
      document.getElementById('akunTitle').textContent = 'Edit Akun';
      document.getElementById('aNama').value = btn.dataset.nama;
      document.getElementById('aUsername').value = btn.dataset.username;
      document.getElementById('aRole').value = btn.dataset.role;
      document.getElementById('aStatus').value = btn.dataset.status;
      document.getElementById('resetInfo').hidden = true;
      document.getElementById('btnResetPassword').hidden = false;
      openDrawer('drawerAkun');
    });
  }
  document.querySelectorAll('[data-akun]').forEach(bindAkunEdit);
  var btnAkunBaru = document.querySelector('[data-akun-baru]');
  if (btnAkunBaru) {
    btnAkunBaru.addEventListener('click', function () {
      akunRow = null;
      document.getElementById('akunTitle').textContent = 'Tambah Akun';
      document.getElementById('aNama').value = '';
      document.getElementById('aUsername').value = '';
      document.getElementById('aRole').value = 'operator';
      document.getElementById('aStatus').value = 'aktif';
      document.getElementById('resetInfo').hidden = true;
      document.getElementById('btnResetPassword').hidden = true;
      document.querySelectorAll('#drawerAkun .field').forEach(function (f) { f.classList.remove('invalid'); });
    });
  }
  var btnResetPassword = document.getElementById('btnResetPassword');
  if (btnResetPassword) {
    btnResetPassword.addEventListener('click', function () {
      if (!akunRow) return;
      var temp = 'Smpn5-' + Math.random().toString(36).slice(2, 6).toUpperCase();
      var info = document.getElementById('resetInfo');
      info.hidden = false;
      info.innerHTML = '<strong>Password sementara</strong><p class="mt-8 mono">' + temp + '</p><p class="tiny mt-8">Sampaikan ke pengguna; wajib diganti saat login pertama.</p>';
    });
  }
  var btnSimpanAkun = document.getElementById('btnSimpanAkun');
  if (btnSimpanAkun) {
    btnSimpanAkun.addEventListener('click', function () {
      var nama = document.getElementById('aNama').value.trim();
      var username = document.getElementById('aUsername').value.trim();
      var role = document.getElementById('aRole').value;
      var status = document.getElementById('aStatus').value;
      var valid = true;
      [['aNama', nama], ['aUsername', username]].forEach(function (pair) {
        var field = document.getElementById(pair[0]).closest('.field');
        var ok = pair[1] !== '';
        field.classList.toggle('invalid', !ok);
        if (!ok) valid = false;
      });
      if (!valid) return;
      var roleLabel = role === 'operator' ? 'Operator' : 'Panitia Lomba';
      var statusLabel = status === 'aktif' ? 'Aktif' : 'Nonaktif';
      var row = akunRow;
      if (!row) {
        row = document.createElement('tr');
        row.id = 'urow' + (document.querySelectorAll('#tabelAkun tbody tr').length + 1);
        row.innerHTML = '<td data-label="Nama"></td><td data-label="Username"></td><td data-label="Peran"></td><td data-label="Status"></td><td data-label="Aksi"><div class="table-actions"><button class="btn btn-text btn-sm" type="button">Edit</button></div></td>';
        document.querySelector('#tabelAkun tbody').appendChild(row);
        bindAkunEdit(row.querySelector('[data-akun], button'));
      }
      row.cells[0].textContent = nama;
      row.cells[1].innerHTML = '<span class="table-code">' + username + '</span>';
      row.cells[2].textContent = roleLabel;
      row.cells[3].innerHTML = '<span class="badge ' + statusBadge(statusLabel) + '">' + statusLabel + '</span>';
      var editBtn = row.querySelector('button');
      editBtn.dataset.akun = '';
      editBtn.dataset.row = row.id;
      editBtn.dataset.nama = nama;
      editBtn.dataset.username = username;
      editBtn.dataset.role = role;
      editBtn.dataset.status = status;
      closeDrawers();
      toast('Akun disimpan (demo).');
    });
  }

  // Login.
  var formLogin = document.getElementById('formLogin');
  if (formLogin) {
    var loginError = document.getElementById('loginError');
    formLogin.querySelectorAll('input').forEach(function (input) {
      input.addEventListener('input', function () { if (loginError) loginError.hidden = true; });
    });
    formLogin.addEventListener('submit', function (event) {
      event.preventDefault();
      var username = document.getElementById('username').value.trim();
      var password = document.getElementById('password').value;
      if (username === 'operator' && password === 'admin123') {
        location.href = 'index.html';
      } else {
        loginError.hidden = false;
      }
    });
    var togglePass = document.getElementById('togglePass');
    if (togglePass) {
      togglePass.addEventListener('click', function () {
        var pass = document.getElementById('password');
        var show = pass.type === 'password';
        pass.type = show ? 'text' : 'password';
        togglePass.textContent = show ? 'Sembunyikan' : 'Lihat';
      });
    }
  }

  // Public prestasi filter (year + level).
  var prYear = 'semua';
  var prLevel = 'semua';
  function applyPrestasiFilter() {
    document.querySelectorAll('[data-pr]').forEach(function (item) {
      var okYear = prYear === 'semua' || item.dataset.year === prYear;
      var okLevel = prLevel === 'semua' || item.dataset.level === prLevel;
      item.style.display = okYear && okLevel ? '' : 'none';
    });
  }
  document.querySelectorAll('[data-pr-year]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-pr-year]').forEach(function (b) { b.classList.toggle('active', b === btn); });
      prYear = btn.dataset.prYear;
      applyPrestasiFilter();
    });
  });
  document.querySelectorAll('[data-pr-level]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-pr-level]').forEach(function (b) { b.classList.toggle('active', b === btn); });
      prLevel = btn.dataset.prLevel;
      applyPrestasiFilter();
    });
  });

  // Admin editor toolbar. shortcut: execCommand deprecated; replace with a real editor in Construction.
  document.querySelectorAll('[data-fmt]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var editor = btn.closest('.field').querySelector('.editor');
      if (!editor) return;
      editor.focus();
      if (btn.dataset.fmt === 'link') {
        var url = prompt('Alamat tautan:', 'https://');
        if (url) document.execCommand('createLink', false, url);
      } else {
        document.execCommand(btn.dataset.fmt, false, null);
      }
    });
  });

  // Admin: create master lomba (in-memory).
  var btnSimpanLombaBaru = document.getElementById('btnSimpanLombaBaru');
  if (btnSimpanLombaBaru) {
    btnSimpanLombaBaru.addEventListener('click', function () {
      var nama = document.getElementById('lombaNamaBaru').value.trim();
      var kuota = parseInt(document.getElementById('lombaKuotaBaru').value, 10);
      var valid = true;
      [['lombaNamaBaru', nama !== ''], ['lombaKuotaBaru', kuota > 0]].forEach(function (pair) {
        var field = document.getElementById(pair[0]).closest('.field');
        field.classList.toggle('invalid', !pair[1]);
        if (!pair[1]) valid = false;
      });
      if (!valid) return;
      var table = document.querySelector('#tabelLombaAktif tbody');
      var row = document.createElement('tr');
      row.innerHTML = '<td data-label="Nama Lomba"></td><td data-label="Kategori"></td><td data-label="Pendaftaran"></td><td data-label="Kuota"></td><td data-label="Status"><span class="badge badge-success">Dibuka</span></td><td data-label="Aksi"><div class="table-actions"><button class="btn btn-text btn-sm" type="button">Edit</button></div></td>';
      row.cells[0].textContent = nama;
      row.cells[1].textContent = document.getElementById('lombaKategoriBaru').value;
      row.cells[2].textContent = formatTanggal(document.getElementById('lombaMulai').value) + ' – ' + formatTanggal(document.getElementById('lombaTutup').value);
      row.cells[3].textContent = kuota + ' peserta';
      row.querySelector('button').addEventListener('click', function () { toast('Edit lomba belum tersedia di prototipe ini.'); });
      table.appendChild(row);
      ['lombaNamaBaru', 'lombaKuotaBaru'].forEach(function (id) {
        document.getElementById(id).value = '';
        document.getElementById(id).closest('.field').classList.remove('invalid');
      });
      closeDrawers();
      toast('Lomba dibuat (demo).');
    });
  }

  // Admin: delete account (in-memory).
  document.querySelectorAll('[data-hapus-akun]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!confirm('Hapus akun ini?')) return;
      var row = document.getElementById(btn.dataset.hapusAkun);
      if (row) row.remove();
      toast('Akun dihapus (demo).');
    });
  });
});
