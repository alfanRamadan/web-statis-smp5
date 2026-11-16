# Prototipe HTML — SMP Negeri 5 Kota Kupang

Prototipe statis untuk dicoba operator sekolah. Tampilannya **diekspor dari aplikasi Laravel** (menu, banner, form CMS, halaman Prestasi, SPMB, Dokumen, dan seterusnya), jadi sama dengan aplikasi yang sedang dikembangkan. Tidak butuh server, build, atau instalasi. Semua isi adalah **data contoh**.

## Cara membuka

Buka `index.html` langsung di browser (klik dua kali). Semua tautan relatif, jadi tetap jalan dari `file://` maupun saat di-hosting.

## Deploy ke Netlify

1. Push folder ini (isinya, bukan folder induknya) ke repo GitHub.
2. Netlify → *Add new site* → *Import an existing project* → pilih repo.
3. Biarkan *Build command* kosong dan *Publish directory* `.` (sudah diatur di `netlify.toml`).
4. Deploy. Panel admin ada di `/login.html`.

`netlify.toml` juga memasang header `noindex` agar prototipe (data contoh) tidak muncul di Google.

## Cara mencoba

- **Situs publik:** mulai dari `index.html`. Menu atas membuka Profil, Berita & Prestasi, SPMB, Akademik, dan Layanan.
- **Panel admin:** buka `login.html`, lalu klik **Masuk** (kolom email dan password sudah terisi, isi bebas). Dari dashboard, buka menu di sidebar: Profil, Guru & Staf, Berita, Prestasi, Galeri, Pengumuman & SPMB, Dokumen & Tautan, lalu Layanan.
- **Tombol Simpan, Hapus, dan Terapkan** hanya menampilkan pesan "Prototipe: data tidak disimpan". Halaman daftar tidak bisa difilter atau dicari.
- Label **"Prototipe — data contoh"** di pojok kiri bawah setiap halaman mengingatkan hal itu.

## Isi

| Kelompok | Berkas |
|---|---|
| Publik | `index.html`, `profil.html`, `guru-staf.html`, `galeri.html` (+ `galeri__kategori-*.html`), `berita.html` (+ `berita__*.html`, `berita/*.html`), `prestasi/*.html`, `spmb.html`, `dokumen.html` |
| Layanan (tampilan saja) | `kunjungan.html`, `lomba.html`, `reservasi.html`, `kegiatan.html`, `cek-status.html`, `kunjungan/sukses.html`, `pengajuan/sukses.html` |
| Admin | `login.html`, `admin/index.html`, `admin/profil.html`, `admin/guru.html`, `admin/berita.html`, `admin/prestasi.html`, `admin/galeri.html`, `admin/spmb.html`, `admin/dokumen.html`, `admin/kunjungan.html`, `admin/lomba.html`, `admin/reservasi.html`, `admin/sarana.html`, `admin/kegiatan.html`, `admin/akun.html`, dan halaman `create`/`edit` di `admin/<modul>/` |
| Aset | `assets/style.css`, `assets/app.js`, `assets/static-mode.js`, `assets/img/`, `assets/contoh/` (foto dan berkas contoh) |

## Yang sudah nyata di aplikasi, dan yang masih tampilan saja

- **Sudah berfungsi di aplikasi Laravel:** Berita, Guru & Staf, Galeri/Fasilitas, Profil, Prestasi, Pengumuman (banner), SPMB, dan Dokumen & Tautan. Di prototipe ini bentuknya sama, tetapi datanya tidak tersimpan.
- **Masih tampilan saja, juga di aplikasi:** Kunjungan, Lomba, Reservasi Sarana, Kegiatan, Cek Status, dan halaman admin layanan. Angka, kode, dan tabel di sana hanya contoh.
- Halaman **Akun Admin** masih menampilkan "peran"; keputusan akhirnya satu peran saja.

## Memperbarui prototipe ini

Berkas di folder ini **dihasilkan otomatis**; jangan diedit manual karena akan tertimpa. Setelah aplikasi Laravel berubah, jalankan dari folder proyek Laravel:

```
cd D:\laragon\www\web-smpn5
php tools/ekspor-prototipe.php "D:\Claude\smp5 clonning\prototype\html"
```

Skrip memakai database sementara di memori berisi data contoh, jadi database asli tidak tersentuh. Data contoh diubah di bagian atas `tools/ekspor-prototipe.php`.

## Kembali ke versi lama

Versi prototipe iterasi 3 (sebelum diekspor dari aplikasi) ada di commit pertama repo ini. Untuk melihatnya: `git log` lalu `git checkout <kode-commit> -- .`
