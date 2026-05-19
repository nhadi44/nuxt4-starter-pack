# 📋 Nuxt Enterprise Starter Pack - Future Roadmap & TODOs

Berikut adalah daftar tugas terperinci (*TODO Checklist*) untuk fase pengembangan berikutnya. Dokumen ini dapat Anda gunakan sebagai acuan progres saat melanjutkan pengembangan *starter pack* ini di kemudian hari.

---

## 🔐 1. Autentikasi, Otorisasi & Keamanan
- [ ] **Middleware Route Guards**
  - [ ] Buat file middleware `app/middleware/auth.ts` untuk memverifikasi token pengguna.
  - [ ] Buat file middleware `app/middleware/guest.ts` untuk melarang pengguna terautentikasi mengakses halaman login.
- [ ] **Token Interceptor & Refresh Token**
  - [ ] Perbarui `services/http.ts` agar menyuntikkan header `Authorization: Bearer <token>` secara dinamis.
  - [ ] Implementasikan interceptor `onResponseError` untuk mendeteksi status `401` dan melakukan pemicuan *refresh token* secara otomatis tanpa memutuskan koneksi pengguna (*silent token refresh*).
- [ ] **Role-Based Access Control (RBAC)**
  - [ ] Buat composable `useAbility()` untuk mengecek *permission* dinamis.
  - [ ] Buat komponen pembungkus `<Can permission="read_users">` untuk kontrol visibilitas UI.

---

## 🌍 2. Internasionalisasi (Multi-Bahasa)
- [ ] **Integrasi `@nuxtjs/i18n`**
  - [ ] Instal dependensi `@nuxtjs/i18n` dan konfigurasikan di `nuxt.config.ts`.
- [ ] **Ekstraksi String Komponen**
  - [ ] Pindahkan semua teks statis komponen ke dalam dictionary `locales/id.json` dan `locales/en.json`.
- [ ] **Komponen Switcher**
  - [ ] Buat selektor bahasa `LanguageSwitcher.vue` yang terintegrasi dengan preferensi lokal browser.

---

## 🚦 3. Penanganan Eror Global
- [ ] **Custom `error.vue`**
  - [ ] Rancang halaman layout eror khusus di root proyek untuk menampilkan halaman 404 (Not Found), 403 (Forbidden), dan 500 (Internal Server Error) dengan visual premium.
- [ ] **Global API Toast Boundary**
  - [ ] Buat interceptor global agar setiap kegagalan API fetch secara otomatis menembakkan notifikasi error menggunakan `useToast()` tanpa menulis kode toast manual di setiap file halaman.

---

## 📐 4. Kerangka Tata Letak & Template Halaman
- [ ] **Auth Layout**
  - [ ] Sediakan layout khusus halaman autentikasi (`layouts/auth.vue`) dengan desain belah dua (kolom visual branding kiri, kolom form login kanan).
- [ ] **Dashboard Layout**
  - [ ] Integrasikan `AppSidebar`, navigasi atas, status koneksi realtime, serta pembungkus konten utama.
- [ ] **Settings Layout**
  - [ ] Buat layout sekunder 2-kolom dengan navigasi internal untuk pengaturan profil, preferensi, dan keamanan.

---

## 🤖 5. End-to-End (E2E) Testing
- [ ] **Integrasi Playwright**
  - [ ] Inisialisasi `@playwright/test` di dalam repositori.
- [ ] **Skrip Pengujian Alur Utama**
  - [ ] Tulis E2E test untuk skenario *User Flow* penting seperti:
    - Alur login penuh -> Masuk halaman dashboard -> Menambah, mengubah, dan menghapus item CRUD -> Log out.

---

## 🚀 6. Automasi CI/CD & DevOps
- [ ] **Github Actions CI**
  - [ ] Buat file workflow `.github/workflows/ci.yml`.
  - [ ] Konfigurasikan skrip otomatis untuk menjalankan `npm run typecheck`, `npm run lint`, dan `npm run test` di setiap *push* atau *pull request* ke branch `master`.
- [ ] **Semantic Versioning & Deploy**
  - [ ] Integrasikan generator changelog otomatis atau hubungkan langsung dengan Vercel/Netlify staging deployment.
