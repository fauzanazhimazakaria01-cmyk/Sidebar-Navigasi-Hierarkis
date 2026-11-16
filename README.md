# Implementasi Antarmuka Web — Manajemen Proyek & Dokumen (PT M2 & M4)

Proyek ini merupakan implementasi komponen dasar antarmuka pengguna berbasis web menggunakan **HTML5 semantik**, **CSS3 murni**, dan **JavaScript (Vanilla JS)** tanpa *framework* eksternal. Desain mengacu pada wireframe halaman **Manajemen Proyek & Dokumen** dari Tugas 1.

## Fitur & Komponen Utama
1. **Top Header & Pencarian Global**: Menampilkan identitas portal PT M2/M4, tombol *toggle* navigasi, serta pencarian real-time berdasarkan nama dokumen atau PIC.
2. **Sidebar Navigasi Hierarkis**: Struktur pohon menu yang memisahkan modul kerja PT M2, sistem fungsional PT M4, dan kontrol audit.
3. **Kartu Ringkasan KPI (Metrics Cards)**: Menampilkan statistik dokumen *Approved*, *Menunggu Review*, dan tingkat kepatuhan SLA secara dinamis.
4. **Form Unggah Dokumen dengan Validasi**: Formulir input dengan validasi sisi klien (*client-side validation*) sebelum menambahkan berkas ke repositori.
5. **Tabel Repositori Interaktif**: Dilengkapi filter status dan tombol aksi cepat untuk mengubah status persetujuan dokumen.
6. **Footer**: Informasi hak cipta sistem terpadu PT M2 & PT M4.

## Struktur Proyek
```text
├── index.html   # Struktur semantik HTML5
├── styles.css   # Styling responsif (12-column desktop / 4-column mobile) & skala spacing 8px
├── script.js    # Logika interaktivitas, validasi form, filter, dan DOM manipulation
└── README.md    # Dokumentasi proyek
```

## Cara Menjalankan
1. **Secara Lokal**:
   - Unduh atau *clone* repositori ini ke komputer Anda:
     ```bash
     git clone https://github.com
     ```
   - Buka berkas `index.html` secara langsung menggunakan peramban (*browser*) modern (Chrome, Firefox, Edge, atau Safari).
2. **Melalui GitHub Pages**:
   - Buka tab **Settings > Pages** pada repositori GitHub ini, pilih *branch* `main` dan folder `/ (root)`, lalu klik **Save** untuk mengakses versi *live*.
   - 
