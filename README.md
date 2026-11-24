# Malam Terakhir di Desa

Game **Indonesian pixel horror** 2D top-down berbasis browser (HTML + CSS + JavaScript murni, tanpa library dan tanpa build).

> Jawa, 1998. Seorang pemuda pulang ke desa setelah menerima surat misterius dari ibunya. Desa itu kosong, dan penduduknya menghilang.

## Fitur
- Eksplorasi desa, puzzle (peti bersandi), mencari barang, bersembunyi, dan bertahan hidup
- Misi bertahap (Bab 1 - 3) dan hantu yang terbangun satu per satu
- Musuh: Kuntilanak, Pocong, Genderuwo, dan sosok misterius
- Meter Jiwa dan Napas, lentera yang meredup saat jiwa turun
- 6 ending berbeda dan 3 Easter egg tersembunyi
- Audio prosedural (Web Audio): jangkrik, angin malam, gamelan slendro, gong, detak jantung
- Pixel art 16-bit digambar lewat kode
- Kontrol keyboard (PC) dan joystick sentuh (HP, mode landscape)

## Kontrol
| Perangkat | Gerak | Lari | Aksi / lanjut dialog |
|---|---|---|---|
| PC | WASD / panah | Shift | E / Spasi / Enter |
| HP | Joystick bulat | Tombol LARI | Tombol AKSI / ketuk layar |

`M` untuk bisukan suara.

## Struktur folder
```
malam-terakhir-di-desa/
├── index.html      # kerangka halaman
├── style.css       # tampilan, kontrol sentuh, layar putar HP
├── game.js         # seluruh logika game, sprite, audio, UI
├── assets/
│   ├── egg1.jpg    # gambar Easter egg (sudah dipikselkan)
│   ├── egg2.jpg
│   └── egg3.png
└── README.md
```

## Menjalankan
**Cara cepat:** buka `index.html` langsung di browser.

**Lewat server lokal (disarankan):**
```bash
# Python
python3 -m http.server 8000
# atau Node
npx serve .
```
Lalu buka `http://localhost:8000`.

## Deploy ke GitHub Pages
1. Buat repo baru di GitHub, lalu unggah semua isi folder ini ke root repo.
2. Buka **Settings → Pages**.
3. Pada **Build and deployment**, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Simpan. Beberapa menit kemudian game bisa dimainkan di `https://USERNAME.github.io/NAMA-REPO/`.

## Mengganti gambar Easter egg
Gambar di `assets/` bisa diganti dengan file sendiri dengan nama yang sama. Ukuran asli sangat kecil (sekitar 30-72 piksel) dan ditampilkan dengan gaya pixel. Rasio 3:4 paling pas. Kalau repo akan dibuat publik, pastikan semua orang di foto setuju fotonya dipakai, atau ganti dengan gambar lain.

## Catatan teknis
- Font **VT323** dimuat dari Google Fonts (lisensi SIL OFL). Tanpa internet, game memakai font monospace bawaan.
- Rendering: kanvas dunia 320×180 diperbesar tanpa blur, ditambah kanvas teks resolusi tinggi supaya tulisan tajam.
- Kemajuan ending tersimpan di `localStorage` (kunci `mtd`).
