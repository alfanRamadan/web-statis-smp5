(function () {
  const root = document.body.dataset.root || '';
  const page = document.body.dataset.page || '';
  const adminPage = document.body.dataset.admin || '';

  const svg = (body, cls) => `<svg class="${cls || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  const icons = {
    menu: svg('<path d="M4 6h16M4 12h16M4 18h16"/>'),
    close: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
    bell: svg('<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>'),
    logout: svg('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>'),
    caret: svg('<path d="m6 9 6 6 6-6"/>', 'caret')
  };

  function publicHeader() {
    const active = (key) => page === key ? 'active' : '';
    return `
    <div class="announce"><div class="container">
      <span class="badge badge-warning">Pengumuman</span>
      <span>Sumatif Akhir Semester (SAS) Ganjil dimulai 1 Desember 2026.</span>
      <a href="${root}berita-detail.html">Selengkapnya</a>
    </div></div>
    <div class="container header-inner">
      <a class="brand" href="${root}index.html">
        <img class="crest" src="${root}assets/img/logo.png" alt="Logo SMP Negeri 5 Kota Kupang">
        <span><span class="brand-name">SMP Negeri 5 Kota Kupang</span><span class="brand-sub">Kota Kupang, Nusa Tenggara Timur</span></span>
      </a>
      <nav class="nav" aria-label="Navigasi utama">
        <a class="${active('beranda')}" href="${root}index.html">Beranda</a>
        <details class="nav-drop">
          <summary class="${active('profil') || active('guru') || active('galeri')}">Profil ${icons.caret}</summary>
          <div class="drop">
            <a href="${root}profil.html">Profil Sekolah</a>
            <a href="${root}profil.html#visi-misi">Visi &amp; Misi</a>
            <a href="${root}guru-staf.html">Guru &amp; Staf</a>
            <a href="${root}galeri.html">Galeri</a>
          </div>
        </details>
        <a class="${active('berita')}" href="${root}berita.html">Berita</a>
        <a href="${root}berita.html#prestasi">Prestasi</a>
        <a class="${active('spmb')}" href="${root}spmb.html">SPMB</a>
        <details class="nav-drop">
          <summary class="${active('unduhan')}">Akademik ${icons.caret}</summary>
          <div class="drop">
            <a href="${root}unduhan.html#dokumen">Dokumen &amp; Kurikulum</a>
            <a href="${root}unduhan.html#tautan">Learning Room</a>
            <a href="${root}unduhan.html#tautan">English Day</a>
            <a href="${root}unduhan.html#media">Video &amp; Media</a>
          </div>
        </details>
        <details class="nav-drop">
          <summary class="${active('kunjungan') || active('lomba') || active('reservasi') || active('agenda')}">Layanan ${icons.caret}</summary>
          <div class="drop">
            <a href="${root}kunjungan.html">Kunjungan Tamu</a>
            <a href="${root}lomba.html">Pendaftaran Lomba</a>
            <a href="${root}reservasi.html">Reservasi Sarana</a>
            <a href="${root}agenda.html">Pendaftaran Kegiatan</a>
            <a href="${root}reservasi.html#kalender">Kalender Pemakaian Sarana</a>
          </div>
        </details>
      </nav>
      <div class="header-actions">
        <a class="btn btn-text small" href="${root}admin/login.html">Masuk</a>
        <a class="btn btn-outline" href="${root}cek-status.html">Cek Status</a>
        <a class="btn btn-primary" href="${root}kunjungan.html">Ajukan Layanan</a>
      </div>
      <button class="hamburger" id="menuToggle" aria-label="Buka menu" aria-expanded="false">${icons.menu}</button>
    </div>
    <div class="mobile-nav" id="mobileNav">
      <a href="${root}index.html">Beranda</a>
      <a href="${root}profil.html">Profil Sekolah</a>
      <a href="${root}guru-staf.html">Guru &amp; Staf</a>
      <a href="${root}galeri.html">Galeri</a>
      <a href="${root}berita.html">Berita</a>
      <a href="${root}berita.html#prestasi">Prestasi</a>
      <a href="${root}spmb.html">SPMB</a>
      <a href="${root}unduhan.html">Dokumen &amp; Tautan</a>
      <a href="${root}kunjungan.html">Kunjungan Tamu</a>
      <a href="${root}lomba.html">Pendaftaran Lomba</a>
      <a href="${root}reservasi.html">Reservasi Sarana</a>
      <a href="${root}agenda.html">Pendaftaran Kegiatan</a>
      <div class="mobile-actions">
        <a class="btn btn-outline btn-block" href="${root}cek-status.html">Cek Status</a>
        <a class="btn btn-primary btn-block" href="${root}kunjungan.html">Ajukan Layanan</a>
        <a class="btn btn-text btn-block" href="${root}admin/login.html">Masuk Panel Admin</a>
      </div>
    </div>`;
  }

  function publicFooter() {
    return `
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="brand" href="${root}index.html"><img class="crest" src="${root}assets/img/logo.png" alt="Logo SMP Negeri 5 Kota Kupang"><span><span class="brand-name">SMP Negeri 5 Kota Kupang</span><span class="brand-sub">Kota Kupang, Nusa Tenggara Timur</span></span></a>
          <p class="small muted mt-16">Jl. Frans Seda, Kel. Kelapa Lima, Kec. Kelapa Lima, Kota Kupang, NTT 85228<br>smpnegeri5kupang.80@gmail.com<br>smpnegeri5kupang.sch.id</p>
        </div>
        <div>
          <div class="footer-title">Tautan Cepat</div>
          <div class="footer-links">
            <a href="${root}profil.html">Profil</a>
            <a href="${root}berita.html">Berita</a>
            <a href="${root}berita.html#prestasi">Prestasi</a>
            <a href="${root}galeri.html">Galeri</a>
            <a href="${root}spmb.html">Informasi SPMB</a>
            <a href="${root}unduhan.html">Dokumen &amp; Tautan</a>
          </div>
        </div>
        <div>
          <div class="footer-title">Layanan</div>
          <div class="footer-links">
            <a href="${root}kunjungan.html">Kunjungan Tamu</a>
            <a href="${root}lomba.html">Pendaftaran Lomba</a>
            <a href="${root}reservasi.html">Reservasi Sarana</a>
            <a href="${root}agenda.html">Pendaftaran Kegiatan</a>
            <a href="${root}reservasi.html#kalender">Kalender Pemakaian Sarana</a>
          </div>
        </div>
        <div>
          <div class="footer-title">Ikuti Kami</div>
          <div class="footer-links">
            <a href="https://www.instagram.com/smpnegeri5kupang" target="_blank" rel="noopener">Instagram</a>
            <a href="https://www.facebook.com/smpnegeri5kupang" target="_blank" rel="noopener">Facebook</a>
            <a href="https://www.youtube.com/channel/UCqFI5MzB6pjWHWjmUjy6tvw" target="_blank" rel="noopener">YouTube</a>
            <a href="https://www.tiktok.com/@smpn.5.kupang" target="_blank" rel="noopener">TikTok</a>
            <a href="${root}cek-status.html">Cek Status Pengajuan</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 UPTD SMP Negeri 5 Kota Kupang</span>
        <span>Prototipe iterasi 3 &mdash; data contoh</span>
      </div>
    </div>`;
  }

  function adminSidebar() {
    const link = (key, label, href, soon) => {
      const cls = adminPage === key ? 'side-link active' : 'side-link';
      if (soon) return `<a class="${cls}" href="#" data-soon="${label}">${label}</a>`;
      return `<a class="${cls}" href="${root}${href}">${label}</a>`;
    };
    return `
      <a class="brand" href="${root}admin/index.html">
        <img class="crest" src="${root}assets/img/logo.png" alt="Logo SMP Negeri 5 Kota Kupang">
        <span><span class="brand-name">SMPN 5 Kupang</span><span class="brand-sub">Panel Admin</span></span>
      </a>
      <div class="side-group">
        <div class="side-label">Utama</div>
        ${link('dashboard', 'Dashboard', 'admin/index.html')}
      </div>
      <div class="side-group">
        <div class="side-label">Konten</div>
        ${link('profil', 'Profil Sekolah', 'admin/profil.html')}
        ${link('guru', 'Guru & Staf', 'admin/guru.html')}
        ${link('berita', 'Berita', 'admin/berita.html')}
        ${link('prestasi', 'Prestasi', 'admin/prestasi.html')}
        ${link('galeri', 'Galeri', 'admin/galeri.html')}
        ${link('spmb', 'Pengumuman & SPMB', 'admin/spmb.html')}
        ${link('unduhan', 'Dokumen & Tautan', 'admin/unduhan.html')}
      </div>
      <div class="side-group">
        <div class="side-label">Layanan</div>
        ${link('kunjungan', 'Kunjungan', 'admin/kunjungan.html')}
        ${link('lomba', 'Lomba', 'admin/lomba.html')}
        ${link('reservasi', 'Reservasi', 'admin/reservasi.html')}
        ${link('sarana', 'Sarana', 'admin/sarana.html')}
        ${link('agenda', 'Kegiatan', 'admin/agenda.html')}
      </div>
      <div class="side-group">
        <div class="side-label">Sistem</div>
        ${link('akun', 'Akun Admin', 'admin/akun.html')}
      </div>
      <div class="side-bottom">
        <a class="side-link" href="${root}admin/login.html">${icons.logout} Keluar</a>
      </div>`;
  }

  function adminTopbar(el) {
    const title = el.dataset.title || 'Dashboard';
    const subtitle = el.dataset.subtitle || '';
    return `
      <div class="topbar-left">
        <button class="icon-btn menu-btn" id="sideToggle" aria-label="Buka menu admin">${icons.menu}</button>
        <div><h1>${title}</h1><div class="sub">${subtitle}</div></div>
      </div>
      <div class="topbar-actions">
        <a class="btn btn-text small" href="${root}index.html">Lihat situs</a>
        <button class="icon-btn" aria-label="Notifikasi">${icons.bell}</button>
        <div class="user-chip">
          <span class="avatar">OP</span>
          <span class="user-meta"><strong>Operator Sekolah</strong><span>Operator</span></span>
        </div>
      </div>`;
  }

  function init() {
    const header = document.getElementById('site-header');
    if (header) header.innerHTML = publicHeader();
    const footer = document.getElementById('site-footer');
    if (footer) footer.innerHTML = publicFooter();
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.innerHTML = adminSidebar();
    const topbar = document.getElementById('topbar');
    if (topbar) topbar.innerHTML = adminTopbar(topbar);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
