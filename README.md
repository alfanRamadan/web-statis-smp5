# Prototipe HTML — SMP Negeri 5 Kota Kupang

Prototipe statis untuk tahap **Modeling Design**. Tidak butuh server, build, atau instalasi.

**Iterasi 3** menyesuaikan prototipe dengan website sekolah yang sudah ada (smpnegeri5kupang.sch.id) dan draft KP v2 (KPdraft02). Lihat bagian *Perubahan iterasi 3* di bawah.

## Cara membuka

Buka `index.html` langsung di browser (double-click). Semua tautan memakai path relatif, jadi tetap jalan dari `file://` maupun saat di-hosting.

## Deploy ke Netlify

1. Push folder ini (isinya, bukan folder induknya) ke repo GitHub.
2. Netlify → *Add new site* → *Import an existing project* → pilih repo.
3. Biarkan *Build command* kosong dan *Publish directory* `.` (sudah diatur di `netlify.toml`).
4. Deploy. Panel admin ada di `/admin/login.html`.

`netlify.toml` juga memasang header `noindex` agar prototipe (data contoh) tidak muncul di Google.

## Layar

| Kode | Berkas |
|---|---|
| PUB-01 Beranda | `index.html` |
| PUB-02 Profil Sekolah | `profil.html` |
| PUB-03 Guru & Staf | `guru-staf.html` |
| PUB-04 Berita & Prestasi | `berita.html` |
| PUB-05 Detail Berita | `berita-detail.html` |
| PUB-06 Form Kunjungan | `kunjungan.html` |
| PUB-07 Pengajuan Berhasil | `kunjungan-sukses.html` |
| PUB-08 Cek Status | `cek-status.html` |
| PUB-09 Pendaftaran Lomba | `lomba.html` |
| PUB-10 Reservasi Sarana | `reservasi.html` |
| PUB-11 Pendaftaran Kegiatan Sekolah | `agenda.html` |
| PUB-12 Pengajuan Berhasil (generik) | `sukses.html` |
| PUB-13 Galeri Sekolah | `galeri.html` |
| PUB-14 Informasi SPMB | `spmb.html` |
| PUB-15 Detail Prestasi | `prestasi-detail.html` |
| PUB-16 Dokumen & Tautan (baru) | `unduhan.html` |
| ADM-01 Login Admin | `admin/login.html` |
| ADM-02 Dashboard | `admin/index.html` |
| ADM-03 Verifikasi Kunjungan | `admin/kunjungan.html` |
| ADM-04 Kelola Berita | `admin/berita.html` |
| ADM-05 Verifikasi Lomba | `admin/lomba.html` |
| ADM-06 Verifikasi Reservasi | `admin/reservasi.html` |
| ADM-07 Kelola Kegiatan | `admin/agenda.html` |
| ADM-08 Kelola Akun Admin | `admin/akun.html` |
| ADM-09 Profil Sekolah | `admin/profil.html` |
| ADM-10 Guru & Staf | `admin/guru.html` |
| ADM-11 Prestasi | `admin/prestasi.html` |
| ADM-12 Galeri | `admin/galeri.html` |
| ADM-13 Sarana | `admin/sarana.html` |
| ADM-14 Pengumuman & SPMB (baru) | `admin/spmb.html` |
| ADM-15 Dokumen & Tautan (baru) | `admin/unduhan.html` |

## Alur demo

1. **Publik:** Beranda → kartu layanan → isi form → halaman sukses → Cek Status.
2. **Cek Status:** tempel salah satu kode contoh di bawah, atau klik tombol contoh.
3. **Admin:** login `operator` / `admin123` → Dashboard → pilih modul di sidebar.
4. **Kunjungan:** klik "Verifikasi", isi jadwal konfirmasi, tombol "Setujui" aktif. "Tolak" wajib catatan.
5. **Lomba:** buka drawer, ubah status ke Revisi/Ditolak — catatan wajib. Status lain boleh tanpa catatan.
6. **Reservasi:** "Setujui" baru aktif setelah centang "sudah cek ketersediaan". "Tolak" wajib catatan.
7. **Kegiatan:** "+ Buat Kegiatan" menambah kegiatan baru. Klik "Kelola Peserta", konfirmasi/tolak peserta — angka kuota ikut berubah.
8. **Akun:** "Tambah Akun" atau "Edit" untuk membuka drawer akun dan peran. Saat mengedit, tombol "Reset Password" menampilkan password sementara.
9. **Berita:** Dashboard → Berita → Edit untuk membuka drawer editor.
10. **Unggah ulang lomba:** buka Cek Status, pilih contoh `LMB-261103-M4XA`, isi 4 digit terakhir no. HP `7890`, pilih berkas, lalu kirim. Status kembali ke Menunggu.
11. **Filter publik:** Galeri punya filter kategori; tab Prestasi punya filter tahun dan tingkat; berita punya pagination 3 halaman.
12. **Master lomba:** Dashboard → Lomba → "+ Buat Lomba", isi nama dan kuota, lalu Simpan. Baris baru muncul di tabel Lomba Aktif (hanya di memori).
13. **Editor berita:** tombol B/I/daftar/tautan memakai format bawaan browser; "Pratinjau" menampilkan isi editor di bawah form.

Untuk melihat state error: klik "Kirim Pengajuan" dengan form kosong, atau login dengan password salah.

### Kode contoh Cek Status

| Kode | Hasil |
|---|---|
| `KJG-261103-7KQ2` | Kunjungan, Menunggu |
| `KJG-261031-3TKR` | Kunjungan, Disetujui |
| `KJG-261031-P6WD` | Kunjungan, Ditolak |
| `LMB-261103-M4XA` | Lomba, Revisi + unggah ulang (HP `7890`) |
| `RSV-261102-9BHT` | Reservasi, Menunggu |
| `AGT-261101-P6WD` | Kegiatan, Dikonfirmasi |
| `LMB-261104-8QK2` | Lomba baru, Menunggu |
| `RSV-261104-2NHT` | Reservasi baru, Menunggu |
| `AGT-261104-5WPD` | Kegiatan baru, Menunggu |

## Yang masih statis

- Tidak ada backend, database, atau autentikasi nyata. Login hanya demo di sisi browser.
- Data guru, berita, kode, tanggal, dan kuota adalah contoh. Ganti sebelum presentasi final.
- Foto memakai placeholder `.media`; ganti dengan `<img>` atau background foto asli. Logo sekolah sudah memakai `assets/img/logo.png`.
- Unggah berkas hanya divalidasi di browser; tidak ada penyimpanan file.
- Halaman admin Profil, Guru & Staf, Prestasi, Galeri, dan Sarana masih statis — tombol simpan/tambah/edit/filter hanya menampilkan toast.
- Master Lomba bisa menambah baris di memori; edit lomba masih toast. Hapus akun juga hanya di memori.
- Filter galeri, tahun/tingkat prestasi, dan pagination berita berfungsi di sisi browser, tetapi datanya tidak lengkap dan hilang saat refresh.
- Editor berita memakai `execCommand` bawaan browser (deprecated); ganti dengan editor sungguhan saat Construction.
- Peran admin hanya tampil di data akun; belum membatasi menu atau akses halaman.
- Tanggal form kunjungan dipatok `2026-11-05` agar cocok dengan skenario demo.
- Kuota agenda dihitung dari peserta yang dikonfirmasi, tetapi hanya di memori halaman (hilang saat refresh).

## Berkas pendukung (di luar repo ini)

- `stitch/DESIGN.md` — token warna, font, komponen.
- `stitch/Prompt_Iterasi1.md` — copy dan struktur tiap layar.
- `revisi/skema_database.sql` — acuan implementasi Laravel + MySQL setelah desain disetujui.

## Perubahan iterasi 3

Disesuaikan dengan draft KP v2 dan website lama sekolah:

- **PPDB → SPMB.** `ppdb.html` diganti `spmb.html`. Halaman hanya berisi informasi (jadwal, jalur Domisili/Afirmasi/Prestasi/Mutasi, persyaratan) dan tombol ke portal resmi Dinas Pendidikan Kota Kupang. Website tidak menerima pendaftaran SPMB.
- **Agenda dipisah.** "Pendaftaran Agenda" menjadi **Pendaftaran Kegiatan Sekolah** (`agenda.html`). Jadwal reservasi yang disetujui pindah ke **Kalender Pemakaian Sarana** (`reservasi.html#kalender`).
- **Banner pengumuman** di atas semua halaman publik, menggantikan banner "SAS" di website lama. Dikelola di `admin/spmb.html`.
- **Fitur website lama** (usulan awal; menunggu keputusan sekolah saat wawancara, lihat bagian 7 draft):
  - Learning Room, English Day, Cetak Kwitansi → tautan di `unduhan.html`.
  - File Kurikulum dan Jadwal → dokumen unduhan di `unduhan.html`.
  - Pengunjung Perpustakaan → pilihan "Kunjungan perpustakaan" di form kunjungan.
  - Surat Pinjaman → digantikan Reservasi Sarana.
  - Mading Online dan English Day → kategori berita.
  - Video dan Mars Sekolah → bagian Media di `unduhan.html`.
- **Data asli sekolah:** alamat (Jl. Frans Seda, Kelapa Lima), email, media sosial (Instagram, Facebook, YouTube, TikTok), serta visi dan misi dari website lama. Misi nomor 2 masih menyebut US/UN dan perlu diperbarui sekolah.
- **Persetujuan data pribadi** (UU No. 27/2022) wajib dicentang di keempat form layanan.
- Nama kepala sekolah diganti placeholder "Nama Kepala Sekolah". Nomor telepon dihapus karena tidak ada nomor resmi di website lama.
- Tombol simpan di halaman admin baru memakai `data-toast` (hanya menampilkan notifikasi demo).
