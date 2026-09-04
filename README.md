# 🚀 Farish Ilham Syahrani (Rishy) - Personal Portfolio

<div align="center">

  [![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

  <p align="center">
    Website portofolio profesional dan interaktif milik <b>Farish Ilham Syahrani (Rishy)</b> — <i>Fresh Graduate</i> S1 Teknik Informatika (Universitas Trunojoyo Madura), <b>Web Developer</b> & <b>Machine Learning Engineer</b>.
  </p>

  <p align="center">
    <a href="https://github.com/farishilhams/Website-Portofolio"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="mailto:farishilham.s@gmail.com">Contact Me</a>
    ·
    <a href="https://wa.me/6287850566785">WhatsApp</a>
    ·
    <a href="https://www.linkedin.com/in/farish-ilham-syahrani/">LinkedIn</a>
    ·
    <a href="https://github.com/farishilhams">GitHub</a>
  </p>

</div>

---

## 🌟 Overview

Website portofolio ini dirancang menggunakan arsitektur modern **Next.js 16 App Router**, **Turbopack**, **Tailwind CSS v4**, dan **TypeScript**. Memadukan estetika visual premium, performa tinggi, animasi interaktif halus dengan **Framer Motion**, serta fitur asisten cerdas **AI Chatbot** interaktif dengan *streaming responses*.

---

## ✨ Fitur Unggulan

- 🎨 **Modern & Premium UI/UX**: Desain clean, tipografi terkurasi, kontras harmonis, dan efek mikro-interaksi modern (*glare hover*, *smooth reveals*).
- 🤖 **Interactive AI Assistant (Rishy Bot)**:
  - Asisten AI pintar yang siap menjawab pertanyaan pengunjung tentang latar belakang, keahlian, proyek, dan kontak Rishy.
  - Mendukung penyedia AI fleksibel (Groq / OpenAI / NVIDIA NIM) dengan format *streaming response*.
  - Dilengkapi **Intelligent Local Knowledge-Base Fallback Engine** sehingga chatbot tetap dapat menjawab secara akurat tanpa bergantung pada API eksternal.
- 💼 **Selected Works Showcase**:
  - Kartu proyek interaktif dengan tag teknologi, modal detail, dan tautan live demo / GitHub.
  - Optimasi gambar berbasis *Static Imports* & *Content Hashing* otomatis dari Next.js untuk tampilan tajam tanpa distorsi.
- 🛠️ **Tech Stack & Skills Matrix**: Penataan keahlian komprehensif mulai dari Front-End, Back-End & AI/ML, Databases (SQL & Neo4j Graph DB), hingga Tools & Infrastructure.
- 📍 **Embedded Location Map**: Peta interaktif berbasis Google Maps embed resmi (Kamal, Bangkalan, Madura, Jawa Timur).
- 📱 **Fully Responsive**: Tampilan adaptif presisi di seluruh resolusi layar (Mobile slider tak terbatas, Tablet, hingga Desktop 4K).
- 🔍 **SEO & Performance Optimized**: Konfigurasi OpenGraph metadata dinamis, `sitemap.xml`, dan `robots.txt` terstruktur rapi.

---

## 📁 Karya & Proyek Unggulan

| # | Nama Proyek | Kategori | Tech Stack | Tautan |
| :-: | :--- | :--- | :--- | :--- |
| **01** | **BatikGems E-Commerce** | Web Application & E-Commerce | PHP, MySQL, RajaOngkir API, JavaScript, Bootstrap | [Demo](https://batikgems.infinityfreeapp.com) · [Repo](https://github.com/farishilhams/E-Commerce-Batik) |
| **02** | **MPStore Web Panel** | Enterprise Web Platform | React 19, Vite, Express.js, TypeScript, Supabase, Tailwind CSS | [Demo](https://website-panel-mpstore.vercel.app/) · [Repo](https://github.com/farishilhams/Website-Panel) |
| **03** | **GraphRAG Search Engine** | AI / ML & Search Platform | Python, Streamlit, GraphRAG, Knowledge Graphs, Neo4j, LLM | [Demo](https://graphrag-search-engine.streamlit.app/) · [Repo](https://github.com/farishilhams/GraphRAG-Search-Engine) |

---

## 🛠️ Tech Stack Codebase

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Library UI**: [React 19](https://react.dev/)
- **Bahasa**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animasi**: [Framer Motion](https://www.framer.com/motion/)
- **AI & Integrasi**: [OpenAI SDK](https://github.com/openai/openai-node), React Markdown, Remark GFM
- **Email Service**: [Nodemailer](https://nodemailer.com/)

---

## 📂 Struktur Direktori

```text
Website-Portofolio/
├── app/
│   ├── api/
│   │   ├── chat/route.ts        # Route handler AI Chatbot (Streaming & Fallback)
│   │   └── send-email/route.ts  # Route handler kirim pesan kontak
│   ├── about.tsx                # Komponen section Tentang Saya
│   ├── contact.tsx              # Komponen Kontak, Maps, & Modal Chatbot AI
│   ├── experience.tsx           # Komponen section Pengalaman & Sertifikasi
│   ├── hero.tsx                 # Komponen Hero section & CV download
│   ├── layout.tsx               # Root layout & SEO Metadata
│   ├── page.tsx                 # Halaman utama (Single Page Application)
│   ├── project.tsx              # Komponen Selected Works & Modal Preview
│   ├── robots.ts                # SEO Robots configuration
│   ├── sitemap.ts               # XML Sitemap generator
│   └── tech-stack.tsx           # Komponen Tech Stack matrix
├── components/                  # Komponen UI umum, Loader, & Animasi
├── public/
│   ├── cv/                      # Berkas CV resmi
│   ├── icons/                   # Ikon SVG Tech Stack resmi
│   └── images/                  # Aset foto profil & thumbnail proyek
├── styles/                      # Konfigurasi CSS & Tailwind styling
├── .env.example                 # Template variabel lingkungan (AI & Email)
├── .gitignore                   # Aturan proteksi file rahasia Git
├── tsconfig.json                # Konfigurasi TypeScript compiler
└── package.json                 # Manajemen dependensi proyek
```

---

## 🚀 Panduan Menjalankan Proyek Lokal

### 1. Clone Repositori
```bash
git clone https://github.com/farishilhams/Website-Portofolio.git
cd Website-Portofolio
```

### 2. Install Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variables (Opsional)
Salin file `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```
Isi variabel jika ingin menggunakan live API Key AI atau email:
```env
# AI Assistant (Pilih salah satu)
GROQ_API_KEY=
OPENAI_API_KEY=
NVIDIA_APIKEY=

# Email Form
EMAIL_USER=
EMAIL_PASS=
```
*(Catatan: Jika dikosongkan, chatbot otomatis berjalan menggunakan Intelligent Local Knowledge-Base Rishy).*

### 4. Jalankan Development Server
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000).

### 5. Build Produksi
```bash
npm run build
npm run start
```

---

## ☁️ Panduan Deployment ke Vercel

1. Buka [Vercel](https://vercel.com) dan login via akun GitHub Anda.
2. Klik **Add New...** -> **Project**.
3. Pilih repository **`farishilhams/Website-Portofolio`** lalu klik **Import**.
4. Di bagian **Environment Variables**, tambahkan API key Anda (misal `GROQ_API_KEY` atau `OPENAI_API_KEY`).
5. Klik **Deploy**. Website portofolio Anda langsung aktif secara global!

---

## 📬 Hubungi Saya

- **Nama**: Farish Ilham Syahrani (Rishy)
- **Email**: [farishilham.s@gmail.com](mailto:farishilham.s@gmail.com)
- **WhatsApp**: [+62 878-5056-6785](https://wa.me/6287850566785)
- **LinkedIn**: [linkedin.com/in/farish-ilham-syahrani](https://www.linkedin.com/in/farish-ilham-syahrani/)
- **GitHub**: [github.com/farishilhams](https://github.com/farishilhams)

---

<p align="center">
  Dibuat dengan ❤️ oleh <b>Farish Ilham Syahrani (Rishy)</b> · &copy; 2026 Seluruh Hak Cipta Dilindungi.
</p>
