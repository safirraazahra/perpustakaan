# 📚 Perpustakaan API

REST API sederhana untuk layanan **pencatatan peminjaman buku perpustakaan** yang dibangun dengan **Node.js**, **Express.js**, dan **Supabase** sebagai database.

---

## 📖 Deskripsi Umum

API ini menyediakan layanan CRUD (Create, Read, Update, Delete) untuk mengelola data peminjaman buku di perpustakaan. Fitur utama:

- Catat peminjaman buku baru
- Lihat seluruh data peminjaman
- Filter data berdasarkan `status`, `anggota_id`, atau `buku_id`
- Pagination otomatis
- Perbarui status pengembalian buku
- Hapus data peminjaman
- Validasi input lengkap
- Deployed ke Vercel (akses publik)

---

## 🗄️ Struktur Data / Schema

### Tabel: `peminjaman`

| Kolom                    | Tipe         | Keterangan                                           |
|--------------------------|--------------|------------------------------------------------------|
| `id`                     | UUID         | Primary key (auto-generated)                         |
| `anggota_id`             | TEXT         | ID anggota perpustakaan (wajib)                      |
| `buku_id`                | TEXT         | ID buku yang dipinjam (wajib)                        |
| `tanggal_pinjam`         | DATE         | Tanggal mulai meminjam (wajib, format: YYYY-MM-DD)   |
| `tanggal_kembali_rencana`| DATE         | Tanggal rencana pengembalian (wajib)                 |
| `tanggal_kembali_aktual` | DATE         | Tanggal aktual pengembalian (opsional)               |
| `status`                 | TEXT         | Status: `Dipinjam`, `Dikembalikan`, `Terlambat`      |
| `created_at`             | TIMESTAMPTZ  | Waktu record dibuat (auto)                           |
| `updated_at`             | TIMESTAMPTZ  | Waktu record terakhir diupdate (auto)                |

---

## 🔗 Base URL

```
Lokal   : http://localhost:3000
Vercel  : https://perpustakaan-rust.vercel.app
```

---

## 📡 Endpoint & Contoh Request/Response

### GET /
Informasi API.

**Response:**
```json
{
  "success": true,
  "message": "Selamat datang di API Perpustakaan 📚",
  "version": "1.0.0",
  "endpoints": { "loans": "/api/loans" }
}
```

---

### GET /api/loans
Ambil semua data peminjaman. Mendukung filter dan pagination.

**Query Parameters:**

| Parameter    | Tipe   | Keterangan                                           |
|-------------|--------|------------------------------------------------------|
| `status`    | string | Filter: `Dipinjam`, `Dikembalikan`, atau `Terlambat` |
| `anggota_id`| string | Filter berdasarkan ID anggota                        |
| `buku_id`   | string | Filter berdasarkan ID buku                           |
| `page`      | number | Halaman (default: 1)                                 |
| `limit`     | number | Jumlah per halaman (default: 10)                     |

**Contoh Request:**
```
GET /api/loans
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Data peminjaman berhasil diambil",
  "data": [
    {
      "id": "27979644-bd58-4d6d-a2ec-4c8bfb141086",
      "anggota_id": "A004",
      "nama_anggota": "Lanjar Setiawan",
      "buku_id": "B004",
      "judul_buku": "Negeri 5 Menara",
      "tanggal_pinjam": "2026-10-05",
      "tanggal_kembali_rencana": "2026-10-19",
      "tanggal_kembali_aktual": null,
      "status": "Dipinjam",
      "created_at": "2026-09-30T14:23:43.540436+00:00",
      "updated_at": "2026-09-30T14:23:43.540436+00:00"
    },
    {
      "id": "a833587f-9a22-470b-bcfc-1e4ebeaa7a39",
      "anggota_id": "A003",
      "nama_anggota": "Safira Zahra",
      "buku_id": "B003",
      "judul_buku": "Sang Pemimpi",
      "tanggal_pinjam": "2026-09-01",
      "tanggal_kembali_rencana": "2026-09-14",
      "tanggal_kembali_aktual": null,
      "status": "Dipinjam",
      "created_at": "2026-09-30T14:23:31.183355+00:00",
      "updated_at": "2026-09-30T14:23:31.183355+00:00"
    },
    {
      "id": "e8e48eeb-3255-46c3-8eb6-d8c3dfcb9f48",
      "anggota_id": "A002",
      "nama_anggota": "Kiara Wulan",
      "buku_id": "B002",
      "judul_buku": "Bumi Manusia",
      "tanggal_pinjam": "2026-10-02",
      "tanggal_kembali_rencana": "2026-10-16",
      "tanggal_kembali_aktual": null,
      "status": "Dipinjam",
      "created_at": "2026-09-30T14:23:15.216831+00:00",
      "updated_at": "2026-09-30T14:23:15.216831+00:00"
    },
    {
      "id": "a5565e6e-7f34-4c2f-abc7-ef5f1588e0a6",
      "anggota_id": "A001",
      "nama_anggota": "Ade Raihan Hanafi",
      "buku_id": "B001",
      "judul_buku": "Laskar Pelangi",
      "tanggal_pinjam": "2026-10-01",
      "tanggal_kembali_rencana": "2026-10-14",
      "tanggal_kembali_aktual": null,
      "status": "Dipinjam",
      "created_at": "2026-09-30T14:22:45.351398+00:00",
      "updated_at": "2026-09-30T14:22:45.351398+00:00"
    }
  ],
  "pagination": {
    "total": 7,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

**Contoh Request dengan Filter:**
```
GET /api/loans?status=Terlambat
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Data peminjaman berhasil diambil",
  "data": [
    {
      "id": "a833587f-9a22-470b-bcfc-1e4ebeaa7a39",
      "anggota_id": "A003",
      "nama_anggota": "Safira Zahra",
      "buku_id": "B003",
      "judul_buku": "Sang Pemimpi",
      "tanggal_pinjam": "2026-09-01",
      "tanggal_kembali_rencana": "2026-09-14",
      "tanggal_kembali_aktual": null,
      "status": "Terlambat",
      "created_at": "2026-09-30T14:23:31.183355+00:00",
      "updated_at": "2026-09-30T14:44:13.156398+00:00"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

---

### GET /api/loans/:id
Ambil satu data peminjaman berdasarkan ID.

**Contoh Request:**
```
GET /api/loans/a833587f-9a22-470b-bcfc-1e4ebeaa7a39
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Data peminjaman berhasil diambil",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "anggota_id": "A001",
    "buku_id": "B001",
    "tanggal_pinjam": "2026-09-01",
    "tanggal_kembali_rencana": "2026-09-14",
    "tanggal_kembali_aktual": "2026-09-13",
    "status": "Dikembalikan",
    "created_at": "2026-09-01T07:00:00.000Z",
    "updated_at": "2026-09-13T10:30:00.000Z"
  }
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Peminjaman dengan id xxx tidak ditemukan"
}
```

---

### POST /api/loans
Buat data peminjaman baru.

**Request Body:**
```json
{
  "anggota_id": "A001",
  "nama_anggota": "Myesha Azka Hafizha",
  "buku_id": "B007",
  "judul_buku": "Mimpi Kunci",
  "tanggal_pinjam": "2026-10-02",
  "tanggal_kembali_rencana": "2026-10-15"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Peminjaman berhasil dibuat",
  "data": {
    "id": "1481da06-993d-4e2a-8544-d27349055e43",
    "anggota_id": "A001",
    "nama_anggota": "Myesha Azka Hafizha",
    "buku_id": "B007",
    "judul_buku": "Mimpi Kunci",
    "tanggal_pinjam": "2026-10-02",
    "tanggal_kembali_rencana": "2026-10-15",
    "tanggal_kembali_aktual": null,
    "status": "Dipinjam",
    "created_at": "2026-09-30T14:42:08.728866+00:00",
    "updated_at": "2026-09-30T14:42:08.728866+00:00"
  }
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validasi gagal",
  "errors": ["tanggal_kembali_rencana harus setelah tanggal_pinjam"]
}
```

---

### PUT /api/loans/:id
Perbarui sebagian data peminjaman (semua field opsional). Bisa menggunakan `PUT` atau `PATCH`.

**Contoh Request:**
```
PUT /api/loans/a833587f-9a22-470b-bcfc-1e4ebeaa7a39
```

**Request Body:**
```json
{
  "status": "Terlambat"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Peminjaman berhasil diperbarui",
  "data": {
    "id": "a833587f-9a22-470b-bcfc-1e4ebeaa7a39",
    "anggota_id": "A003",
    "nama_anggota": "Safira Zahra",
    "buku_id": "B003",
    "judul_buku": "Sang Pemimpi",
    "tanggal_pinjam": "2026-09-01",
    "tanggal_kembali_rencana": "2026-09-14",
    "tanggal_kembali_aktual": null,
    "status": "Terlambat",
    "created_at": "2026-09-30T14:23:31.183355+00:00",
    "updated_at": "2026-09-30T14:44:13.156398+00:00"
  }
}
```

---

### DELETE /api/loans/:id
Hapus data peminjaman berdasarkan ID.

**Contoh Request:**
```
DELETE /api/loans/24ba42ec-6627-4e8c-a3ab-45d4bb66e89a
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Peminjaman dengan id 24ba42ec-6627-4e8c-a3ab-45d4bb66e89a berhasil dihapus"
}
```

---

## 🛠️ Panduan Instalasi & Menjalankan Lokal

### Prasyarat
- Node.js v18 atau lebih baru
- npm
- Akun [Supabase](https://supabase.com) (gratis)

### 1. Clone Repository
```bash
git clone https://github.com/safirraazahra/perpustakaan.git
cd perpustakaan
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Supabase
1. Buat project baru di [Supabase](https://app.supabase.com)
2. Buka **SQL Editor** di dashboard Supabase
3. Jalankan SQL berikut untuk membuat tabel:
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS peminjaman (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  anggota_id TEXT NOT NULL,
  nama_anggota TEXT,
  buku_id TEXT NOT NULL,
  judul_buku TEXT,
  tanggal_pinjam DATE NOT NULL,
  tanggal_kembali_rencana DATE NOT NULL,
  tanggal_kembali_aktual DATE,
  status TEXT NOT NULL DEFAULT 'Dipinjam'
    CHECK (status IN ('Dipinjam', 'Dikembalikan', 'Terlambat')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE peminjaman DISABLE ROW LEVEL SECURITY;
```
4. Salin **Project URL** dan **anon public key** dari menu **Settings → API**

### 4. Konfigurasi Environment
```bash
cp .env.example .env
```

Edit file `.env`:
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
PORT=3000
NODE_ENV=development
```

### 5. Jalankan Server
```bash
# Mode development (auto-restart dengan nodemon)
npm run dev

# Mode production
npm start
```

Server berjalan di: `http://localhost:3000`

---

## 🚀 Deployment ke Vercel

### Via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login dan deploy
vercel

# Tambah environment variables
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY

# Deploy ke production
vercel --prod
```

### Via GitHub Integration
1. Push repository ke GitHub
2. Login ke [vercel.com](https://vercel.com)
3. Klik **New Project** → import repository GitHub
4. Tambahkan **Environment Variables**:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
5. Klik **Deploy**

File `vercel.json` sudah dikonfigurasi agar semua request diarahkan ke Express app.

---

## 🌐 Link Deployment

**API Live**: https://perpustakaan-rust.vercel.app

---

## 📁 Struktur Project

```
perpustakaan/
├── src/
│   ├── config/
│   │   └── supabase.js          # Koneksi Supabase client
│   ├── controllers/
│   │   └── loanController.js    # Logic CRUD peminjaman
│   ├── middleware/
│   │   ├── errorHandler.js      # Global error handler
│   │   └── validate.js          # Validasi request body
│   ├── routes/
│   │   └── loanRoutes.js        # Definisi endpoint
│   └── app.js                   # Setup Express app
├── index.js                     # Entry point server
├── vercel.json                  # Konfigurasi Vercel
├── .env.example                 # Template environment variable
├── .gitignore
├── package.json
└── README.md
```

---

## 📝 Teknologi

| Teknologi    | Keterangan                       |
|-------------|----------------------------------|
| Node.js v18  | Runtime JavaScript               |
| Express.js   | Framework web                    |
| Supabase     | Database PostgreSQL as a service |
| Vercel       | Platform deployment              |
| dotenv       | Manajemen environment variable   |
| cors         | Cross-Origin Resource Sharing    |

---

## 📄 Lisensi

MIT License - bebas digunakan untuk keperluan edukasi.
