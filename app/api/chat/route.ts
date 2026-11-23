import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { z } from "zod"

type HistoryEntry = {
  role: "system" | "user" | "assistant"
  content: string
}

// Validasi skema ketat menggunakan Zod untuk mencegah payload abuse dan eksploitasi token
const ChatRequestSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "Pesan tidak boleh kosong.")
    .max(1000, "Pesan terlalu panjang (maksimal 1000 karakter)."),
  history: z
    .array(
      z.object({
        role: z.enum(["system", "user", "assistant"]),
        content: z.string().max(2000, "Riwayat pesan terlalu panjang (maksimal 2000 karakter)."),
      })
    )
    .max(20, "Riwayat percakapan melebihi batas maksimal 20 item.")
    .optional()
    .default([]),
})

// In-Memory Rate Limiter per IP (Maksimal 25 request per menit)
const chatRateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkChatRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 menit
  const maxRequests = 25

  const record = chatRateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    chatRateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return { allowed: true }
  }

  if (record.count >= maxRequests) {
    const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000)
    return { allowed: false, retryAfterSeconds }
  }

  record.count += 1
  return { allowed: true }
}

// System prompt resmi yang merepresentasikan persona Farish Ilham Syahrani (Rishy)
// Dilengkapi instruksi multi-tone adaptive intelligence (Kaku/Formal, Akademik/Ilmiah, Santai/Sehari-hari)
const RISHY_SYSTEM_PROMPT = `Kamu adalah Rishy Assistant, asisten AI cerdas, adaptif, solutif, dan ramah untuk website portfolio Farish Ilham Syahrani (Rishy).
Tugas utamamu adalah menjawab seluruh pertanyaan pengunjung website mengenai latar belakang, keahlian teknis, pengalaman kerja, riset akademis, karya/proyek unggulan, serta kontak kerja sama Farish Ilham Syahrani secara akurat, kontekstual, dan tanpa halusinasi.

===================================================================
=== PANDUAN ADAPTASI GAYA BAHASA (MULTI-TONE ADAPTIVE INTELLIGENCE) ===
===================================================================
Kamu WAJIB mengidentifikasi gaya bahasa penanya dan menyesuaikan gaya tuturmu secara dinamis:

1. GAYA SEHARI-HARI / SANTAI / GAUL / SLANG
   (Contoh indikator: "bro", "min", "coy", "kak", "gan", "dong", "sih", "nih", "spill", "kepo", "gimana", "gw/lu", "keren", "mantap", "asik", gaya chat santai):
   - Gunakan gaya bahasa yang santai, luwes, ramah, hangat, to the point, dan tidak kaku layaknya rekan sesama tech enthusiast.
   - Boleh menyapa akrab: "Halo bro!", "Halo kak!", "Siap!", atau "Asyik banget pertanyaannya!".
   - Tetap sopan, solutif, dan berikan informasi yang akurat berdasarkan data profil Farish.

2. GAYA KAKU / FORMAL / KORPORAT / BISNIS / REKRUTMEN
   (Contoh indikator: "Dengan hormat", "Mohon informasi", "Kualifikasi Saudara Farish", "Rekrutmen", "Bapak/Ibu", bahasa Indonesia baku EYD/PUEBI, gaya email resmi):
   - Gunakan Bahasa Indonesia formal, terstruktur rapi, tertib kaidah bahasa, dan profesional tingkat tinggi layaknya komunikasi resmi rekrutmen atau korporasi.
   - Gunakan sapaan resmi seperti "Bapak/Ibu", "Rekan Profesional", atau "Yth. Pengunjung".
   - Jelaskan kompetensi, riwayat karir, serta spesifikasi teknis proyek secara sistematis, kredibel, dan komprehensif.

3. GAYA AKADEMIK / ILMIAH / TEKNIKAL / RISET
   (Contoh indikator: "metodologi", "algoritma", "TF-IDF", "Multinomial Naive Bayes", "Knowledge Graph", "GraphRAG", "arsitektur sistem", "evaluasi metrik", "akurasi", "kompleksitas", "skripsi", "jurnal"):
   - Gunakan terminologi teknis ilmiah yang presisi, mendalam, dan analitis.
   - Paparkan pipeline komputasi, arsitektur data, traversal graf semantik, pembobotan fitur, dan rasionalisasi teoretis di balik setiap solusi komputasi yang dibangun Farish.

4. GAYA BAHASA INGGRIS ATAU CAMPURAN (BILINGUAL)
   - Jika pengunjung bertanya dalam bahasa Inggris, balaslah dalam bahasa Inggris yang fasih, alami, dan profesional.
   - Jika pertanyaan mencampurkan istilah teknis bahasa Inggris dan Indonesia, adaptasikan secara natural tanpa canggung.

===================================================================
=== PROFIL LENGKAP & TERVERIFIKASI FARISH ILHAM SYAHRANI (RISHY) ===
===================================================================
1. **Identitas & Profil Pribadi**:
   - Nama Lengkap: Farish Ilham Syahrani
   - Nama Panggilan / Brand: Rishy
   - Status & Gelar: Fresh Graduate S1 Teknik Informatika (Universitas Trunojoyo Madura, 2022 - 2026, Lulus dengan IPK 3.70 / Predikat Sangat Memuaskan).
   - Spesialisasi / Profesi: Full Stack Developer & Machine Learning Engineer.
   - Domisili / Lokasi: Kamal, Kab. Bangkalan, Madura, Jawa Timur, Indonesia.
   - Karakter Kerja: Berorientasi pada arsitektur bersih (clean code & clean architecture), skalabilitas sistem, performa komputasi tinggi, desain modern responsif (mobile & desktop), serta pemanfaatan data & Machine Learning cerdas.

2. **Kontak Resmi & Media Sosial**:
   - Email: farishilham.s@gmail.com
   - WhatsApp / Telepon: +62 878-5056-6785 (https://wa.me/6287850566785)
   - LinkedIn: https://www.linkedin.com/in/farish-ilham-syahrani/
   - GitHub: https://github.com/farishilhams
   - Instagram: @farishsyahrani (https://instagram.com/farishsyahrani)
   - TikTok: @rishsyahrani (https://tiktok.com/@rishsyahrani)

3. **Tech Stack & Keahlian Komprehensif**:
   - Frontend: Next.js 16 (App Router), React 19, TypeScript, JavaScript, Tailwind CSS, HTML5, CSS3, Framer Motion, Progressive Web App (PWA).
   - Backend: Python, Node.js, Express.js, Laravel, PHP, RESTful API, WebSocket (Supabase Realtime Channel).
   - AI & Machine Learning: PyTorch, Scikit-Learn, Deep Learning, Natural Language Processing (NLP), Multinomial Naive Bayes, TF-IDF, Sastrawi Stemmer, Graph Retrieval-Augmented Generation (GraphRAG), Knowledge Graphs, LLM Integration, OCR (Optical Character Recognition / Tesseract).
   - Basis Data (Databases): MySQL, PostgreSQL, Supabase, MongoDB Atlas, Neo4j (Graph Database).
   - Tools, Deployment & Layanan: Git, GitHub, Postman, Vercel, Midtrans Snap Payment Gateway, Streamlit Cloud, Google OAuth 2.0.

4. **Pengalaman Kerja & Sertifikasi**:
   - Back-End Developer Intern di MPStore SuperApps (Juli - September 2025):
     * Merancang dan mengimplementasikan RESTful API berkinerja tinggi menggunakan Express.js dan TypeScript untuk Web Panel internal perusahaan.
     * Mengembangkan proteksi keamanan 5 tingkatan Role-Based Access Control (RBAC).
     * Mengelola skema dan kueri basis data MySQL serta integrasi Supabase PostgreSQL.
     * Menguji endpoint API secara menyeluruh menggunakan Postman dan berkolaborasi erat dengan frontend React.
   - S1 Teknik Informatika - Universitas Trunojoyo Madura (2022 - 2026, Lulus IPK 3.70).
   - Data Science Fundamentals & R Training - DQLab (April 2024).
   - Microsoft Office Specialist Certification - Karirnex by PT Ebiz Karisma Internasional (Agustus 2026).

5. **Daftar Lengkap 6 Karya & Proyek Unggulan**:
   - Proyek 1: **BatikGems E-Commerce** (Aplikasi Web & E-Commerce)
     * Deskripsi: Platform e-commerce busana batik nusantara modern untuk mendigitalkan pemasaran batik ke pasar nasional.
     * Fitur Utama: Integrasi API ekspedisi RajaOngkir untuk estimasi ongkos kirim real-time otomatis ke seluruh kecamatan Indonesia, manajemen inventaris multi-varian ukuran & warna, sistem checkout dengan kalkulasi invoice otomatis, dan panel admin intuitif.
     * Tech Stack: PHP, MySQL, RajaOngkir API, JavaScript, Bootstrap, REST API.
     * Live Demo: https://batikgems.infinityfreeapp.com | Repo: https://github.com/farishilhams/E-Commerce-Batik

   - Proyek 2: **MPStore Web Panel** (Platform Web Enterprise)
     * Deskripsi: Dashboard operasional internal terpusat untuk tata kelola ekosistem digital MPStore SuperApps yang dibangun selama masa magang Farish.
     * Fitur Utama: Keamanan 5 tingkatan Role-Based Access Control (RBAC), arsitektur RESTful API cepat berbasis Express.js + TypeScript, sinkronisasi basis data cloud Supabase PostgreSQL, dan monitoring analitik operasional terpadu.
     * Tech Stack: React 19, Vite, Express.js, TypeScript, Supabase PostgreSQL, Tailwind CSS.
     * Live Demo: https://website-panel-mpstore.vercel.app/ | Repo: https://github.com/farishilhams/Website-Panel

   - Proyek 3: **GraphRAG Search Engine** (Platform AI & Mesin Pencari Semantik)
     * Deskripsi: Mesin pencari akademik cerdas berbasis riset skripsi inovatif untuk eksplorasi dan temu balik informasi dokumen tugas akhir Teknik Informatika UTM.
     * Fitur Utama: Pipeline cerdas Graph Retrieval-Augmented Generation (GraphRAG), pemetaan relasi semantik entitas riset ke dalam struktur graf pengetahuan Neo4j, pencarian berbasis konteks makna (bukan sekadar kata kunci konvensional), dan visualisasi graf interaktif Streamlit.
     * Tech Stack: Python, Streamlit, GraphRAG, Knowledge Graphs, Neo4j, LLM / NLP.
     * Live Demo: https://graphrag-search-engine.streamlit.app/ | Repo: https://github.com/farishilhams/GraphRAG-Search-Engine

   - Proyek 4: **TravelKita** (Platform Reservasi & E-Ticketing Penerbangan Komersial Modern)
     * Deskripsi: Platform reservasi tiket pesawat modern berbasis Next.js 16 dan React 19 yang menghadirkan alur pemesanan interaktif dan terintegrasi secara komprehensif.
     * Fitur Utama: Pemilihan dan sinkronisasi kursi kabin pesawat secara langsung (real-time seat mapping) antar-pengguna via Supabase WebSocket, gateway pembayaran digital multichannel aman Midtrans Snap, radar Flight Information Display System (FIDS) langsung, serta panel back-office admin lengkap untuk pengelolaan jadwal penerbangan, armada maskapai, dan validasi e-ticket otomatis.
     * Tech Stack: Next.js 16, React 19, TypeScript, Tailwind CSS, Midtrans Snap, Supabase.
     * Live Demo: https://travel-kita.vercel.app/ | Repo: https://github.com/farishilhams/TravelKita

   - Proyek 5: **Klasifikasi Tugas Akhir Naive Bayes** (Machine Learning & NLP Text Mining)
     * Deskripsi: Aplikasi cerdas otomasi analisis teks berbasis Machine Learning dan Natural Language Processing (NLP) yang mengklasifikasikan dokumen abstrak skripsi ke dalam rumpun bidang minat keilmuan Teknik Informatika (Kecerdasan Komputasi, Komputasi Bahasa Alami, Sistem Terdistribusi & Jaringan, Rekayasa Perangkat Lunak).
     * Fitur Utama: Pipeline preprocessing teks komprehensif (case folding, tokenizing, stopword removal, stemming bahasa Indonesia via Sastrawi), ekstraksi bobot kata TF-IDF (Term Frequency - Inverse Document Frequency), klasifikasi multi-kelas dengan algoritma Multinomial Naive Bayes, studio pengujian abstrak interaktif, dan visualisasi distribusi probabilitas prediksi.
     * Tech Stack: Python, Streamlit, Scikit-Learn, NLP, Multinomial Naive Bayes, TF-IDF, Sastrawi.
     * Live Demo: https://klasifikasi-tugas-akhir-naive-bayes.streamlit.app/ | Repo: https://github.com/farishilhams/Klasifikasi-Tugas-Akhir-Naive-Bayes

   - Proyek 6: **Sakuin** (Progressive Web App & Pengelolaan Keuangan Pribadi)
     * Deskripsi: Asisten finansial digital personal berbasis Progressive Web App (PWA) yang ringan, dapat diinstal langsung di perangkat smartphone, dan menyederhanakan pencatatan keuangan harian secara otomatis.
     * Fitur Utama: Pemindai struk belanja otomatis berbasis Optical Character Recognition (OCR / Tesseract) untuk mengekstrak nominal belanja tanpa ketik manual, manajemen arus kas masuk dan keluar terstruktur, budgeting alokasi anggaran bulanan per kategori, pelacakan target tabungan (wishlist), autentikasi aman Google OAuth 2.0, dan sinkronisasi basis data cloud MongoDB Atlas.
     * Tech Stack: React.js, PWA, Node.js, Express.js, MongoDB Atlas, OCR / Tesseract, Tailwind CSS, Google OAuth.
     * Live Demo: https://sakuinfree.vercel.app/ | Repo: https://github.com/farishilhams/Sakuin

Instruksi Menjawab:
- Berikan respon yang ramah, sopan, to the point, dan terstruktur rapi (gunakan poin atau markdown bila sesuai).
- Jika ada pertanyaan di luar konteks portfolio Rishy, jawablah secara ringkas dan arahkan kembali ke topik portfolio atau kontak Rishy.
- Jangan mengarang data di luar profil di atas.`

/**
 * Helper untuk memeriksa keberadaan kata kunci secara aman.
 * Untuk kata pendek (<= 3 karakter seperti 'ai', 'wa', 'hp', 's1', 'utm'), gunakan word boundary regex
 * agar tidak terjadi false-positive pada kata umum (contoh: 'bagaimana' tidak sengaja cocok dengan 'ai').
 */
function hasWord(text: string, words: string[]): boolean {
  return words.some((w) => {
    if (w.length <= 3) {
      return new RegExp(`\\b${w}\\b`, "i").test(text)
    }
    return text.includes(w)
  })
}

type UserTone = "casual" | "academic" | "formal" | "neutral"

/**
 * Deteksi gaya bahasa pengguna untuk menyesuaikan gaya respons pada Fallback Generator:
 * - Casual: Pengguna menggunakan sapaan santai / slang ("bro", "min", "coy", "dong", "sih", "nih", "spill", "kepo", "wkwk")
 * - Academic: Pengguna menggunakan istilah metodologi / algoritma / riset ("metodologi", "algoritma", "akurasi", "tf-idf", "naive bayes", "knowledge graph", "arsitektur", "evaluasi")
 * - Formal: Pengguna menggunakan gaya baku korporat / rekrutmen ("dengan hormat", "mohon informasi", "kualifikasi saudara", "rekrutmen", "cv", "resume")
 * - Neutral: Gaya bahasa umum sehari-hari
 */
function detectTone(text: string): UserTone {
  const t = text.toLowerCase()

  // Prioritaskan deteksi gaya santai
  const casualMarkers = [
    "bro", "sob", "coy", "bang", "kak", "gan", "min", "lu", "lo", "gw", "gue",
    "kepo", "spill", "dong", "sih", "nih", "deh", "kan", "gimana", "keren", "mantap",
    "anjir", "jir", "wkwk", "haha", "asik", "santai", "nggak", "ga", "gak", "bgt", "banget"
  ]
  if (casualMarkers.some((w) => new RegExp(`\\b${w}\\b`, "i").test(t))) {
    return "casual"
  }

  // Deteksi gaya akademik / riset
  const academicMarkers = [
    "metodologi", "algoritma", "teoretis", "hipotesis", "komparasi", "analisis",
    "akurasi", "evaluasi", "kompleksitas", "matematis", "pembobotan", "parameter",
    "knowledge graph", "graphrag", "traversal", "tf-idf", "tfidf", "naive bayes",
    "multinomial", "stemming", "sastrawi", "nlp", "arsitektur", "skripsi", "jurnal", "rumpun"
  ]
  if (academicMarkers.some((w) => t.includes(w))) {
    return "academic"
  }

  // Deteksi gaya kaku / formal / korporat
  const formalMarkers = [
    "dengan hormat", "mohon", "saudara", "bapak", "ibu", "perusahaan", "rekrutmen",
    "kualifikasi", "surat", "ijazah", "transkrip", "apakah bersedia", "lamaran",
    "cv", "resume", "portofolio resmi", "terkait", "sehubungan", "terima kasih banyak"
  ]
  if (formalMarkers.some((w) => t.includes(w))) {
    return "formal"
  }

  return "neutral"
}

/**
 * Intelligent Fallback Generator berbasis Knowledge Base resmi Farish Ilham Syahrani (Rishy).
 * Mendukung seluruh 6 proyek lengkap dan mengadaptasikan gaya bahasa (Casual, Formal, Akademik, Netral).
 * Berfungsi jika API Key eksternal belum diisi atau penyedia AI eksternal sedang mengalami rate limit.
 */
function generateFallbackResponse(query: string): string {
  const q = (query || "").toLowerCase()
  const tone = detectTone(q)

  // 1. Proyek Spesifik: TravelKita (Tiket Pesawat, Booking, Penerbangan, Midtrans, Radar FIDS)
  if (
    hasWord(q, [
      "travelkita",
      "travel-kita",
      "travel kita",
      "tiket",
      "pesawat",
      "penerbangan",
      "flight",
      "booking",
      "midtrans",
      "fids",
      "radar",
      "kursi",
      "seat",
    ])
  ) {
    if (tone === "casual") {
      return `Keren banget bro! **TravelKita** itu salah satu proyek unggulan Farish. Ini platform pemesanan tiket pesawat modern yang canggih banget:

✈️ **Fitur Gokil TravelKita**:
- **Pilih Kursi Real-Time**: Pas milih kursi kabin pesawat, kursinya langsung tersinkronisasi live antar-user pakai Supabase WebSocket.
- **Payment Cepat Midtrans Snap**: Pembayaran tiket bisa langsung beres multichannel aman.
- **Radar Flight FIDS Langsung**: Bisa cek status jadwal penerbangan real-time.
- **Admin Dashboard Lengkap**: Buat kelola rute, jadwal penerbangan maskapai, sampai e-ticket otomatis.

🛠️ **Tech Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS, Midtrans Snap, Supabase.
🔗 **Cobain Live**: [travel-kita.vercel.app](https://travel-kita.vercel.app/)
🐙 **Cek Kode di GitHub**: [github.com/farishilhams/TravelKita](https://github.com/farishilhams/TravelKita)

Ada yang mau kamu tanyain lagi soal TravelKita, bro?`
    }

    if (tone === "academic") {
      return `Mengenai arsitektur dan implementasi sistem pada **TravelKita**:

✈️ **TravelKita — Platform Reservasi Penerbangan Komersial Modern**:
- **Arsitektur Real-Time**: Mengadopsi arsitektur reaktif dengan *state synchronization* berbasis Supabase WebSocket Realtime Channel untuk mencegah *race condition* pada pemesanan denah kursi (*seat mapping*) multi-klien secara serempak.
- **Transaksional & Gateway**: Terintegrasi secara aman dengan Midtrans Snap API menggunakan webhook listener terverifikasi guna memastikan integritas status pembayaran.
- **FIDS & Monitoring**: Menyediakan modul Flight Information Display System (FIDS) dengan visualisasi radar penerbangan berbasis antarmuka reaktif.
- **Spesifikasi Stack**: Next.js 16 Server Components, React 19, TypeScript, Tailwind CSS, Supabase PostgreSQL, Midtrans Gateway.

Tautan eksplorasi sistem:
- **Live Demo**: [travel-kita.vercel.app](https://travel-kita.vercel.app/)
- **Repository GitHub**: [github.com/farishilhams/TravelKita](https://github.com/farishilhams/TravelKita)`
    }

    return `**TravelKita** adalah platform reservasi tiket penerbangan komersial modern yang dikembangkan oleh Farish Ilham Syahrani:

✈️ **Fitur & Keunggulan Utama**:
1. **Sinkronisasi Kursi Real-Time**: Pemilihan denah kursi kabin (seat mapping) sinkron seketika antar-pengguna via Supabase WebSocket.
2. **Gateway Pembayaran Midtrans Snap**: Alur transaksi pemesanan tiket aman, otomatis, dan mendukung ragam metode pembayaran digital.
3. **Radar FIDS Terpadu**: Pemantauan jadwal dan status penerbangan secara langsung.
4. **Panel Back-Office Administrator**: Manajemen rute penerbangan, maskapai, transaksi, serta penerbitan e-ticket otomatis.

- 🛠️ **Tech Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS, Midtrans, Supabase
- 🌐 **Live Demo**: [travel-kita.vercel.app](https://travel-kita.vercel.app/)
- 🐙 **Source Code**: [github.com/farishilhams/TravelKita](https://github.com/farishilhams/TravelKita)`
  }

  // 2. Proyek Spesifik: Klasifikasi Tugas Akhir Naive Bayes (NLP, TF-IDF, Skripsi, Sastrawi)
  if (
    hasWord(q, [
      "naive bayes",
      "naivebayes",
      "bayes",
      "klasifikasi",
      "abstrak",
      "skripsi informatika",
      "tf-idf",
      "tfidf",
      "sastrawi",
      "text mining",
      "bidang minat",
      "rumpun",
    ])
  ) {
    if (tone === "casual") {
      return `Mantap nih! Farish bikin aplikasi Machine Learning cerdas bernama **Klasifikasi Tugas Akhir Naive Bayes**:

🤖 **Gimana Cara Kerjanya?**:
Kamu tinggal tempel teks abstrak skripsi/tugas akhir, nanti sistem otomatis nebak abstrak itu masuk ke bidang minat apa di Teknik Informatika (Kecerdasan Komputasi, NLP, Jaringan, atau Rekayasa Perangkat Lunak).

⚡ **Teknologi di Baliknya**:
- Text Preprocessing lengkap (case folding, buang stopword, stemming pakai Sastrawi).
- Ekstraksi bobot kata TF-IDF biar kata-kata kunci penting terdeteksi.
- Algoritma Multinomial Naive Bayes yang cepat dan akurat.
- Antarmuka interaktif pakai Streamlit.

🛠️ **Tech Stack**: Python, Streamlit, Scikit-Learn, NLP, Naive Bayes, TF-IDF, Sastrawi.
🔗 **Cobain Langsung**: [klasifikasi-tugas-akhir-naive-bayes.streamlit.app](https://klasifikasi-tugas-akhir-naive-bayes.streamlit.app/)
🐙 **Cek GitHub**: [github.com/farishilhams/Klasifikasi-Tugas-Akhir-Naive-Bayes](https://github.com/farishilhams/Klasifikasi-Tugas-Akhir-Naive-Bayes)`
    }

    if (tone === "academic") {
      return `Tinjauan metodologis sistem **Klasifikasi Tugas Akhir Menggunakan Multinomial Naive Bayes & TF-IDF**:

🔬 **Pipeline Pemrosesan Bahasa Alami (NLP)**:
1. **Text Preprocessing**: Normalisasi teks (case folding), tokenisasi kata, pembersihan derau (noise removal), filtering kata umum (*stopword removal*), dan reduksi morfologi ke bentuk kata dasar menggunakan algoritma Nazief & Adriani melalui pustaka *Sastrawi*.
2. **Feature Extraction**: Pembobotan fitur teks berbasis *Term Frequency - Inverse Document Frequency* (TF-IDF) untuk merepresentasikan signifikansi semantik kata dalam korpus abstrak.
3. **Klasifikasi Probabilistik**: Algoritma Multinomial Naive Bayes diaplikasikan untuk menghitung posterior probability dari masing-masing kelas rumpun keilmuan Teknik Informatika (Kecerdasan Komputasi, Komputasi Bahasa Alami, Sistem Terdistribusi & Jaringan, dan Teknologi Perangkat Lunak).
4. **Evaluasi & Pengujian**: Menghasilkan inferensi kelas target dengan matriks probabilitas terinci yang disajikan interaktif melalui Streamlit.

- 🛠️ **Tech Stack**: Python, Scikit-Learn, Sastrawi, Streamlit, Pandas, NumPy
- 🌐 **Live Demo**: [klasifikasi-tugas-akhir-naive-bayes.streamlit.app](https://klasifikasi-tugas-akhir-naive-bayes.streamlit.app/)
- 🐙 **Repository**: [github.com/farishilhams/Klasifikasi-Tugas-Akhir-Naive-Bayes](https://github.com/farishilhams/Klasifikasi-Tugas-Akhir-Naive-Bayes)`
    }

    return `**Klasifikasi Tugas Akhir Naive Bayes** adalah aplikasi machine learning analisis teks abstrak karya Farish Ilham Syahrani:

🤖 **Fungsi & Fitur**:
- Mengotomatisasi penentuan bidang minat tugas akhir mahasiswa Teknik Informatika secara objektif dan instan.
- Pipeline NLP lengkap: tokenizing, stopword removal, stemming bahasa Indonesia via Sastrawi.
- Pembobotan fitur kata menggunakan metode Term Frequency - Inverse Document Frequency (TF-IDF).
- Pemodelan klasifikasi multi-kelas dengan Multinomial Naive Bayes dan studio pengujian abstrak interaktif.

- 🛠️ **Tech Stack**: Python, Streamlit, Scikit-Learn, NLP, Naive Bayes, TF-IDF
- 🌐 **Live Demo**: [klasifikasi-tugas-akhir-naive-bayes.streamlit.app](https://klasifikasi-tugas-akhir-naive-bayes.streamlit.app/)
- 🐙 **Repository**: [github.com/farishilhams/Klasifikasi-Tugas-Akhir-Naive-Bayes](https://github.com/farishilhams/Klasifikasi-Tugas-Akhir-Naive-Bayes)`
  }

  // 3. Proyek Spesifik: Sakuin (Keuangan, PWA, OCR, Struk, Budget, Uang Saku)
  if (
    hasWord(q, [
      "sakuin",
      "keuangan",
      "finansial",
      "pwa",
      "ocr",
      "struk",
      "budget",
      "budgeting",
      "uang saku",
      "uang",
      "kas",
      "arus kas",
      "belanja",
      "wishlist",
    ])
  ) {
    if (tone === "casual") {
      return `Nah, kalau aplikasi pengatur keuangan pribadi, Farish bikin yang namanya **Sakuin (Pengelola Uang Saku)**!

📱 **Apa yang bikin Sakuin praktis banget?**:
- **Bisa di-install di HP (PWA)**: Jadi langsung kerasa kayak aplikasi native di Android atau iPhone tanpa makan memori gede.
- **Scan Struk Otomatis (OCR)**: Tinggal foto atau upload struk belanjaan, teks dan total biayanya langsung kebaca otomatis pakai OCR Tesseract.
- **Budgeting & Wishlist**: Ada batas pos anggaran bulanan dan target nabung biar pengeluaran kamu nggak jebol.
- **Login Google**: Gak ribet, tinggal klik masuk dengan akun Google kamu.

🛠️ **Tech Stack**: React.js, PWA, Node.js, Express.js, MongoDB Atlas, OCR / Tesseract, Tailwind CSS.
🔗 **Coba Sakuin di Sini**: [sakuinfree.vercel.app](https://sakuinfree.vercel.app/)
🐙 **Cek Kodenya di GitHub**: [github.com/farishilhams/Sakuin](https://github.com/farishilhams/Sakuin)`
    }

    if (tone === "academic") {
      return `Arsitektur teknis **Sakuin — Progressive Web App Finansial Terintegrasi OCR**:

📱 **Spesifikasi Solusi Perangkat Lunak**:
1. **Progressive Web App (PWA)**: Menerapkan Service Worker caching strategy dan Web App Manifest untuk menghadirkan pengalaman aplikasi mandiri (*installable*), responsif di seluruh rasio layar mobile, dan berlatensi rendah.
2. **Optical Character Recognition (OCR)**: Mengintegrasikan engine pemindaian optik Tesseract untuk mendeteksi token karakter angka dan teks transaksi pada struk fisik secara otomatis (*automated receipt parsing*).
3. **Persistensi & Keamanan**: Menggunakan MongoDB Atlas dengan skema transaksi relasional-dokumen terindeks, Express.js REST API, dan otorisasi aman Google OAuth 2.0.

- 🛠️ **Tech Stack**: React.js, PWA, Node.js, Express.js, MongoDB Atlas, Tesseract OCR, Tailwind CSS
- 🌐 **Live Demo**: [sakuinfree.vercel.app](https://sakuinfree.vercel.app/)
- 🐙 **Repository**: [github.com/farishilhams/Sakuin](https://github.com/farishilhams/Sakuin)`
    }

    return `**Sakuin** adalah aplikasi pengelolaan keuangan pribadi berbasis Progressive Web App (PWA) karya Farish Ilham Syahrani:

📱 **Keunggulan & Fitur**:
1. **Pemindai Struk OCR Otomatis**: Mendeteksi rincian belanja dan total transaksi secara langsung dari foto struk belanjaan via OCR Tesseract.
2. **Arus Kas & Budgeting**: Pencatatan pemasukan, pengeluaran, alokasi anggaran bulanan per pos belanja, dan pelacakan wishlist tabungan.
3. **Dukungan PWA**: Ringan, cepat, dan dapat diinstal langsung ke layar beranda smartphone pengguna.
4. **Keamanan Akun**: Autentikasi Google OAuth 2.0 serta penyimpanan cloud database MongoDB Atlas.

- 🛠️ **Tech Stack**: React.js, PWA, Node.js, MongoDB, OCR / Tesseract, Tailwind CSS
- 🌐 **Live Demo**: [sakuinfree.vercel.app](https://sakuinfree.vercel.app/)
- 🐙 **Source Code**: [github.com/farishilhams/Sakuin](https://github.com/farishilhams/Sakuin)`
  }

  // 4. Proyek Spesifik: BatikGems E-Commerce
  if (hasWord(q, ["batikgems", "batik", "rajaongkir", "ongkir"])) {
    return `🛍️ **BatikGems E-Commerce** (Aplikasi Web & E-Commerce Busana Batik)

Platform toko daring batik nusantara yang dikembangkan oleh Farish Ilham Syahrani untuk mendigitalkan pemasaran busana tradisional ke seluruh Indonesia.

**Fitur Utama**:
- Integrasi API RajaOngkir untuk penghitungan ongkos kirim real-time dan otomatis ke seluruh kecamatan.
- Manajemen stok busana berbasis varian ukuran dan warna secara dinamis.
- Alur pemesanan terpadu dengan invoice otomatis dan panel admin untuk pengelolaan produk dan transaksi.

- 🛠️ **Tech Stack**: PHP, MySQL, RajaOngkir API, JavaScript, Bootstrap
- 🌐 **Live Demo**: [batikgems.infinityfreeapp.com](https://batikgems.infinityfreeapp.com)
- 🐙 **Repository**: [github.com/farishilhams/E-Commerce-Batik](https://github.com/farishilhams/E-Commerce-Batik)`
  }

  // 5. Proyek Spesifik: MPStore Web Panel
  if (hasWord(q, ["mpstore", "rbac", "role-based", "panel internal"])) {
    return `🏢 **MPStore Web Panel** (Platform Web Enterprise Internal)

Web panel manajemen operasional internal perusahaan yang dikembangkan oleh Farish Ilham Syahrani selama menjalani program magang sebagai Back-End Developer di MPStore SuperApps.

**Fitur Utama**:
- Proteksi keamanan tingkat tinggi dengan 5 level Role-Based Access Control (RBAC).
- Arsitektur RESTful API berkinerja tinggi menggunakan Express.js dan TypeScript.
- Integrasi cloud database Supabase PostgreSQL dan antarmuka modern responsif berbasis React 19 + Vite.

- 🛠️ **Tech Stack**: React 19, Vite, Express.js, TypeScript, Supabase PostgreSQL, Tailwind CSS
- 🌐 **Live Demo**: [website-panel-mpstore.vercel.app](https://website-panel-mpstore.vercel.app/)
- 🐙 **Repository**: [github.com/farishilhams/Website-Panel](https://github.com/farishilhams/Website-Panel)`
  }

  // 6. Proyek Spesifik: GraphRAG Search Engine
  if (hasWord(q, ["graphrag", "graph rag", "knowledge graph", "neo4j", "semantik"])) {
    return `🧠 **GraphRAG Search Engine** (Platform AI & Mesin Pencari Semantik)

Platform temu balik informasi cerdas berbasis Graph Retrieval-Augmented Generation (GraphRAG) dan Knowledge Graphs karya riset skripsi Farish Ilham Syahrani di Universitas Trunojoyo Madura.

**Fitur Utama**:
- Mentransformasi dokumen skripsi ke dalam relasi graf pengetahuan Neo4j.
- Pencarian semantik mendalam yang memahami keterkaitan konsep riset, metodologi, dan penulis secara kontekstual.
- Antarmuka visualisasi graf interaktif berbasis Streamlit.

- 🛠️ **Tech Stack**: Python, Streamlit, GraphRAG, Knowledge Graphs, Neo4j, LLM / NLP
- 🌐 **Live Demo**: [graphrag-search-engine.streamlit.app](https://graphrag-search-engine.streamlit.app/)
- 🐙 **Repository**: [github.com/farishilhams/GraphRAG-Search-Engine](https://github.com/farishilhams/GraphRAG-Search-Engine)`
  }

  // 7. Pengalaman Kerja, Magang, Karir
  if (hasWord(q, ["pengalaman", "magang", "intern", "internship", "riwayat", "karir", "bekerja", "kantor"])) {
    if (tone === "casual") {
      return `Bro, ini dia rangkuman pengalaman kerja profesional Farish Ilham Syahrani:

💼 **Back-End Developer Intern** di **MPStore SuperApps** *(Juli - September 2025)*:
- Ngembangin arsitektur RESTful API kencang pakai Express.js dan TypeScript buat Web Panel internal.
- Nerapin sistem keamanan 5 tingkatan Role-Based Access Control (RBAC).
- Ngatur skema basis data MySQL dan Supabase PostgreSQL.
- Testing endpoint menyeluruh lewat Postman dan koordinasi langsung bareng tim Frontend React.js.

Punya ide proyek atau tawaran kerja sama seru? Kontak Farish langsung di WhatsApp [+62 878-5056-6785](https://wa.me/6287850566785)!`
    }

    if (tone === "academic" || tone === "formal") {
      return `**Riwayat Pengalaman Profesional Farish Ilham Syahrani**:

💼 **Back-End Developer Intern** — **MPStore SuperApps** *(Juli - September 2025)*
- Bertanggung jawab penuh dalam perancangan arsitektur backend untuk sistem Web Panel internal korporasi.
- Membangun antarmuka pemrograman aplikasi (RESTful API) berkinerja tinggi menggunakan Express.js dan TypeScript.
- Mengimplementasikan sistem otorisasi 5 tingkatan hak akses (*Role-Based Access Control* / RBAC).
- Menjaga integritas skema data relasional pada MySQL dan Supabase PostgreSQL.
- Melakukan verifikasi dan pengujian endpoint secara komprehensif melalui Postman serta integrasi bersama tim Frontend React.js.`
    }

    return `**Pengalaman Kerja & Profesional Farish Ilham Syahrani**:

💼 **Back-End Developer Intern** — **MPStore SuperApps** *(Juli - September 2025)*
- Bertanggung jawab merancang dan mengembangkan arsitektur backend untuk Web Panel internal perusahaan.
- Membangun RESTful API berkinerja tinggi menggunakan Express.js dan TypeScript.
- Menerapkan proteksi keamanan 5 level Role-Based Access Control (RBAC).
- Mengelola integritas skema dan kueri basis data MySQL serta Supabase PostgreSQL.
- Melakukan pengujian endpoint menyeluruh melalui Postman dan berkolaborasi mengintegrasikannya dengan Frontend React.js.`
  }

  // 8. Keahlian, Tech Stack, Bahasa Pemrograman, Tools
  if (
    hasWord(q, [
      "keahlian",
      "skill",
      "kemampuan",
      "stack",
      "tech",
      "teknologi",
      "bahasa",
      "coding",
      "pemrograman",
      "react",
      "next",
      "typescript",
      "python",
      "backend",
      "frontend",
      "machine learning",
      "ai",
      "database",
      "tools",
      "framework",
    ])
  ) {
    if (tone === "casual") {
      return `Ini dia deretan **Tech Stack** yang dikuasai Farish, bro:

- 💻 **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, HTML5, CSS3, Framer Motion, PWA
- ⚙️ **Backend**: Python, Node.js, Express.js, Laravel, PHP, REST API, WebSocket
- 🧠 **AI & Machine Learning**: PyTorch, Scikit-Learn, NLP, Naive Bayes, TF-IDF, GraphRAG, Knowledge Graphs, OCR
- 🗄️ **Databases**: MySQL, PostgreSQL, Supabase, MongoDB Atlas, Neo4j
- 🛠️ **Tools & Deployment**: Git, GitHub, Postman, Vercel, Midtrans, Streamlit Cloud

Farish selalu utamain kode yang bersih, rapi, dan cepat! Mau diskusi tech stack tertentu, bro?`
    }

    return `Berikut adalah keahlian teknis (**Tech Stack**) yang dikuasai oleh **Farish Ilham Syahrani (Rishy)**:

- 💻 **Front-End Development**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, HTML5, CSS3, Framer Motion, Progressive Web Apps (PWA)
- ⚙️ **Back-End Development**: Python, Node.js, Express.js, Laravel, PHP, RESTful API, WebSocket (Supabase Realtime)
- 🧠 **AI & Machine Learning**: PyTorch, Scikit-Learn, Deep Learning, Natural Language Processing (NLP), Multinomial Naive Bayes, TF-IDF, Graph Retrieval-Augmented Generation (GraphRAG), Knowledge Graphs, Tesseract OCR
- 🗄️ **Databases**: MySQL, PostgreSQL, Supabase, MongoDB Atlas, Neo4j (Graph Database)
- 🛠️ **Tools & Deployment**: Git, GitHub, Postman, Vercel, Midtrans Snap, Streamlit Cloud, Google OAuth 2.0

Farish berfokus pada arsitektur kode yang bersih (*clean architecture*), skalabilitas tinggi, dan integrasi kecerdasan buatan berbasis data modern.`
  }

  // 9. Jasa, Hire, Kerja Sama, Freelance, Buat Website
  if (
    hasWord(q, [
      "jasa",
      "hire",
      "freelance",
      "kerja sama",
      "kerjasama",
      "kolaborasi",
      "bikin web",
      "buat web",
      "bikin website",
      "buat website",
      "order",
      "rekrut",
      "tarif",
      "harga",
    ])
  ) {
    return `Farish Ilham Syahrani terbuka untuk kesempatan kerja penuh waktu (*Full-time*), paruh waktu (*Part-time*), proyek *Freelance*, maupun kolaborasi pengembangan perangkat lunak (Web Development, Mobile PWA & AI/Machine Learning).

Untuk diskusi kebutuhan proyek, penawaran kerja sama, atau estimasi teknis, silakan langsung hubungi melalui:
- 💬 **WhatsApp**: [+62 878-5056-6785](https://wa.me/6287850566785)
- 📧 **Email**: [farishilham.s@gmail.com](mailto:farishilham.s@gmail.com)
- 💼 **LinkedIn**: [linkedin.com/in/farish-ilham-syahrani](https://www.linkedin.com/in/farish-ilham-syahrani/)`
  }

  // 10. Proyek, Portfolio, Karya, Aplikasi (Menampilkan Seluruh 6 Proyek)
  if (
    hasWord(q, [
      "proyek",
      "project",
      "portfolio",
      "portofolio",
      "karya",
      "aplikasi",
      "daftar project",
      "semua project",
      "demo",
    ])
  ) {
    if (tone === "casual") {
      return `Ini dia 6 proyek keren yang udah Farish bangun, bro:

1. ✈️ **TravelKita** — Platform reservasi tiket pesawat modern (Next.js 16, React 19, Supabase WebSocket kursi real-time, Midtrans Snap, Radar FIDS).
   🔗 [Demo](https://travel-kita.vercel.app/) | [GitHub](https://github.com/farishilhams/TravelKita)

2. 🤖 **Klasifikasi Tugas Akhir Naive Bayes** — Aplikasi AI pengelompokan abstrak skripsi Teknik Informatika (Python, Scikit-Learn, Naive Bayes, TF-IDF, Streamlit).
   🔗 [Demo](https://klasifikasi-tugas-akhir-naive-bayes.streamlit.app/) | [GitHub](https://github.com/farishilhams/Klasifikasi-Tugas-Akhir-Naive-Bayes)

3. 📱 **Sakuin** — Aplikasi kelola keuangan personal PWA dengan OCR scanner struk belanja & Google OAuth (React.js, Node.js, MongoDB, Tesseract OCR).
   🔗 [Demo](https://sakuinfree.vercel.app/) | [GitHub](https://github.com/farishilhams/Sakuin)

4. 🛍️ **BatikGems E-Commerce** — Belanja busana batik dengan RajaOngkir API otomatis (PHP, MySQL, Bootstrap).
   🔗 [Demo](https://batikgems.infinityfreeapp.com) | [GitHub](https://github.com/farishilhams/E-Commerce-Batik)

5. 🏢 **MPStore Web Panel** — Dashboard internal perusahaan dengan 5 level RBAC aman (React 19, Express.js, TypeScript, Supabase).
   🔗 [Demo](https://website-panel-mpstore.vercel.app/) | [GitHub](https://github.com/farishilhams/Website-Panel)

6. 🧠 **GraphRAG Search Engine** — Mesin pencari semantik cerdas berbasis graf pengetahuan skripsi (Python, Neo4j, Knowledge Graphs, Streamlit).
   🔗 [Demo](https://graphrag-search-engine.streamlit.app/) | [GitHub](https://github.com/farishilhams/GraphRAG-Search-Engine)

Tertarik ngebedah yang mana nih, bro?`
    }

    return `Berikut adalah **6 Proyek Unggulan** yang telah dikembangkan oleh **Farish Ilham Syahrani**:

1. ✈️ **TravelKita** (Platform Reservasi & E-Ticketing Penerbangan Komersial)
   - Reservasi tiket penerbangan modern dengan sinkronisasi kursi real-time via Supabase WebSocket, gateway pembayaran Midtrans Snap, radar FIDS, dan panel admin.
   - **Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS, Midtrans, Supabase
   - **Demo**: [travel-kita.vercel.app](https://travel-kita.vercel.app/) | **Repo**: [github.com/farishilhams/TravelKita](https://github.com/farishilhams/TravelKita)

2. 🤖 **Klasifikasi Tugas Akhir Naive Bayes** (Machine Learning & NLP Text Mining)
   - Otomasi pengelompokan topik abstrak skripsi ke rumpun bidang minat Informatika menggunakan Multinomial Naive Bayes dan pembobotan kata TF-IDF.
   - **Stack**: Python, Streamlit, Scikit-Learn, NLP, Naive Bayes, TF-IDF
   - **Demo**: [klasifikasi-tugas-akhir-naive-bayes.streamlit.app](https://klasifikasi-tugas-akhir-naive-bayes.streamlit.app/) | **Repo**: [github.com/farishilhams/Klasifikasi-Tugas-Akhir-Naive-Bayes](https://github.com/farishilhams/Klasifikasi-Tugas-Akhir-Naive-Bayes)

3. 📱 **Sakuin** (Progressive Web App & Pengelolaan Keuangan Pribadi)
   - Aplikasi PWA mobile-ready dengan pemindai struk belanja otomatis OCR Tesseract, manajemen arus kas & alokasi budget, serta login Google OAuth.
   - **Stack**: React.js, PWA, Node.js, Express.js, MongoDB Atlas, OCR / Tesseract
   - **Demo**: [sakuinfree.vercel.app](https://sakuinfree.vercel.app/) | **Repo**: [github.com/farishilhams/Sakuin](https://github.com/farishilhams/Sakuin)

4. 🛍️ **BatikGems E-Commerce** (Aplikasi Web & E-Commerce)
   - Platform e-commerce busana batik dengan integrasi API RajaOngkir untuk estimasi ongkir otomatis real-time ke seluruh Indonesia dan manajemen varian stok.
   - **Stack**: PHP, MySQL, RajaOngkir API, JavaScript, Bootstrap
   - **Demo**: [batikgems.infinityfreeapp.com](https://batikgems.infinityfreeapp.com) | **Repo**: [github.com/farishilhams/E-Commerce-Batik](https://github.com/farishilhams/E-Commerce-Batik)

5. 🏢 **MPStore Web Panel** (Platform Web Enterprise Internal)
   - Web panel manajemen sistem internal dengan proteksi keamanan 5 level Role-Based Access Control (RBAC), Express.js REST API, dan basis data Supabase PostgreSQL.
   - **Stack**: React 19, Vite, Express.js, TypeScript, Supabase, Tailwind CSS
   - **Demo**: [website-panel-mpstore.vercel.app](https://website-panel-mpstore.vercel.app/) | **Repo**: [github.com/farishilhams/Website-Panel](https://github.com/farishilhams/Website-Panel)

6. 🧠 **GraphRAG Search Engine** (AI / Knowledge Graph Platform)
   - Mesin pencari semantik mutakhir berbasis Graph Retrieval-Augmented Generation (GraphRAG) dan Knowledge Graphs Neo4j untuk temu balik dokumen skripsi Teknik Informatika.
   - **Stack**: Python, Streamlit, GraphRAG, Knowledge Graphs, Neo4j, LLM
   - **Demo**: [graphrag-search-engine.streamlit.app](https://graphrag-search-engine.streamlit.app/) | **Repo**: [github.com/farishilhams/GraphRAG-Search-Engine](https://github.com/farishilhams/GraphRAG-Search-Engine)`
  }

  // 11. Pendidikan, Kuliah, Kampus, Skripsi, IPK
  if (
    hasWord(q, [
      "pendidikan",
      "kuliah",
      "universitas",
      "kampus",
      "utm",
      "trunojoyo",
      "informatika",
      "jurusan",
      "prodi",
      "ipk",
      "skripsi",
      "lulus",
      "lulusan",
      "mahasiswa",
      "gelar",
      "s1",
    ])
  ) {
    if (tone === "casual") {
      return `Farish itu lulusan **S1 Teknik Informatika** dari **Universitas Trunojoyo Madura** (angkatan 2022 - lulus 2026), bro!
IPK-nya mantap di angka **3.70** (Skala 4.00) dengan predikat Sangat Memuaskan. Riset skripsinya mendalam banget seputar Graph Retrieval-Augmented Generation (GraphRAG) dan Knowledge Graphs.`
    }

    return `**Riwayat Pendidikan Farish Ilham Syahrani**:

🎓 **S1 Teknik Informatika** — **Universitas Trunojoyo Madura** (2022 - 2026)
- **Status**: Fresh Graduate
- **IPK**: **3.70** (Skala 4.00, Predikat Sangat Memuaskan)
- **Fokus Riset Skripsi**: Pengembangan Graph Retrieval-Augmented Generation (GraphRAG) dan Knowledge Graphs untuk sistem pencarian semantik dokumen skripsi.`
  }

  // 12. Sertifikasi & Pelatihan
  if (
    hasWord(q, [
      "sertifikasi",
      "sertifikat",
      "sertif",
      "certificate",
      "pelatihan",
      "kursus",
      "lisensi",
      "dqlab",
      "mos",
      "microsoft",
    ])
  ) {
    return `**Sertifikasi & Pelatihan Resmi yang Diraih Farish**:

1. 📜 **Data Science Fundamentals & R Training** — DQLab (April 2024)
   - Pelatihan komprehensif mengenai analisis data, pemrograman R, dan konsep dasar *data science*.
2. 📜 **Microsoft Office Specialist Certification** — Karirnex by PT Ebiz Karisma Internasional (Agustus 2026)
   - Sertifikasi kompetensi resmi produktivitas dan pengelolaan dokumen profesional.`
  }

  // 13. Kontak, Hubungi, Media Sosial, Lokasi
  if (
    hasWord(q, [
      "kontak",
      "hubungi",
      "contact",
      "email",
      "wa",
      "whatsapp",
      "nomor",
      "telepon",
      "telp",
      "hp",
      "linkedin",
      "github",
      "instagram",
      "tiktok",
      "lokasi",
      "alamat",
      "domisili",
      "tinggal",
    ])
  ) {
    if (tone === "casual") {
      return `Mau ngobrol langsung sama Farish? Gampang banget bro, langsung sapa lewat:

- 💬 **WhatsApp**: [+62 878-5056-6785](https://wa.me/6287850566785)
- 📧 **Email**: [farishilham.s@gmail.com](mailto:farishilham.s@gmail.com)
- 💼 **LinkedIn**: [linkedin.com/in/farish-ilham-syahrani](https://www.linkedin.com/in/farish-ilham-syahrani/)
- 🐙 **GitHub**: [github.com/farishilhams](https://github.com/farishilhams)
- 📸 **Instagram**: [@farishsyahrani](https://instagram.com/farishsyahrani)
- 📍 **Domisili**: Kamal, Kab. Bangkalan, Madura, Jawa Timur`
    }

    return `Anda dapat menghubungi **Farish Ilham Syahrani (Rishy)** melalui kontak resmi berikut:

- 💬 **WhatsApp**: [+62 878-5056-6785](https://wa.me/6287850566785)
- 📧 **Email**: [farishilham.s@gmail.com](mailto:farishilham.s@gmail.com)
- 💼 **LinkedIn**: [linkedin.com/in/farish-ilham-syahrani](https://www.linkedin.com/in/farish-ilham-syahrani/)
- 🐙 **GitHub**: [github.com/farishilhams](https://github.com/farishilhams)
- 📸 **Instagram**: [@farishsyahrani](https://instagram.com/farishsyahrani)
- 🎵 **TikTok**: [@rishsyahrani](https://tiktok.com/@rishsyahrani)
- 📍 **Lokasi / Domisili**: Kamal, Kab. Bangkalan, Madura, Jawa Timur, Indonesia`
  }

  // 14. Profil, Siapa Farish, Biodata, Latar Belakang
  if (
    hasWord(q, [
      "siapa",
      "profil",
      "profile",
      "biodata",
      "bio",
      "background",
      "latar belakang",
      "tentang",
      "kenalan",
    ])
  ) {
    if (tone === "casual") {
      return `Kenalin bro, **Farish Ilham Syahrani** (biasa dipanggil **Rishy**) itu seorang **Full Stack Developer & Machine Learning Engineer** asal Kamal, Bangkalan, Madura.

Dia baru aja lulus S1 Teknik Informatika di Universitas Trunojoyo Madura dengan IPK 3.70. Farish suka banget ngebangun web app modern berkinerja tinggi, API skalabel, dan implementasi AI/ML kayak GraphRAG, Naive Bayes, dan OCR.`
    }

    return `**Farish Ilham Syahrani** (akrab dipanggil **Rishy**) adalah seorang **Full Stack Developer & Machine Learning Engineer** yang berdomisili di Kamal, Kab. Bangkalan, Madura, Jawa Timur.

Beliau merupakan Fresh Graduate **S1 Teknik Informatika** dari **Universitas Trunojoyo Madura** (lulus dengan predikat sangat memuaskan, IPK **3.70**).

Farish memiliki dedikasi tinggi dalam merancang aplikasi web modern berkinerja tinggi serta riset terapan Machine Learning cerdas, mencakup ekosistem Next.js 16, React 19, Express.js, Graph Retrieval-Augmented Generation (GraphRAG), Knowledge Graphs, dan Progressive Web Apps.`
  }

  // 15. Sapaan / Greeting
  if (
    hasWord(q, [
      "halo",
      "hai",
      "hei",
      "helo",
      "hi",
      "pagi",
      "siang",
      "sore",
      "malam",
      "assalam",
      "permisi",
      "ping",
      "tes",
      "test",
    ])
  ) {
    if (tone === "casual") {
      return `Yo halo bro! Senang bisa ngobrol bareng kamu. Gue adalah Rishy Assistant, asisten AI pribadi buat **Farish Ilham Syahrani (Rishy)**.

Ada yang mau kamu kepoin tentang karya atau profil Farish?
1. 🚀 **Tech Stack** (Next.js 16, React 19, Python, Machine Learning)
2. 📁 **6 Proyek Unggulan** (TravelKita, Naive Bayes NLP, Sakuin PWA, BatikGems, MPStore, GraphRAG)
3. 💼 **Pengalaman Kerja** (Back-End Developer di MPStore SuperApps)
4. 🎓 **Pendidikan** (S1 Teknik Informatika UTM, IPK 3.70)
5. 📬 **Kontak Langsung** (WhatsApp / Email)`
    }

    if (tone === "formal") {
      return `Selamat datang. Saya adalah Rishy Assistant, asisten virtual resmi untuk **Farish Ilham Syahrani (Rishy)**.

Bagian informasi mana yang sekiranya dapat saya sajikan untuk Bapak/Ibu?
1. 📁 **Kualifikasi 6 Proyek Unggulan** (TravelKita, Klasifikasi Naive Bayes, Sakuin PWA, BatikGems, MPStore, GraphRAG)
2. 🚀 **Kompetensi Teknis / Tech Stack** (Full Stack Development & Machine Learning)
3. 💼 **Riwayat Pengalaman Profesional** (Back-End Developer Intern di MPStore SuperApps)
4. 🎓 **Latar Belakang Akademis & Sertifikasi** (S1 Teknik Informatika UTM, IPK 3.70)
5. 📬 **Jalur Komunikasi & Rekrutmen** (WhatsApp & Email Resmi)`
    }

    return `Halo! Senang menyapa Anda. Saya adalah Rishy Assistant, asisten AI pribadi untuk **Farish Ilham Syahrani (Rishy)**.

Ada yang bisa saya bantu seputar profil atau karya Rishy?
1. 🚀 **Keahlian & Tech Stack** (Next.js 16, React 19, Python, ML, Neo4j, Supabase)
2. 📁 **6 Proyek Unggulan** (TravelKita, Klasifikasi Naive Bayes, Sakuin PWA, BatikGems, MPStore, GraphRAG)
3. 💼 **Pengalaman Kerja** (Back-End Developer di MPStore SuperApps)
4. 🎓 **Pendidikan & Sertifikasi** (S1 Teknik Informatika UTM, IPK 3.70)
5. 📬 **Kontak & Kerja Sama** (WhatsApp, Email, LinkedIn)`
  }

  // 16. Default / Fallback Respons Cerdas
  if (tone === "casual") {
    return `Makasih udah mampir dan nanya, bro! Farish Ilham Syahrani (Rishy) adalah **Full Stack Developer & Machine Learning Engineer** (Fresh Graduate S1 Teknik Informatika UTM, IPK 3.70).

Mau tahu info apa nih selanjutnya?
- 🚀 **Tech Stack**: Next.js 16, React 19, TypeScript, Python, PyTorch, Neo4j, Supabase
- 📁 **6 Proyek Keren**: TravelKita, Naive Bayes NLP, Sakuin PWA, BatikGems, MPStore Web Panel, GraphRAG
- 💼 **Pengalaman Kerja**: Back-End Developer di MPStore SuperApps
- 📬 **Kontak**: WhatsApp (+62 878-5056-6785) atau Email (farishilham.s@gmail.com)`
  }

  return `Terima kasih atas pertanyaan Anda! Farish Ilham Syahrani (Rishy) adalah **Full Stack Developer & Machine Learning Engineer** (Fresh Graduate S1 Teknik Informatika UTM, IPK 3.70).

Informasi apa yang ingin Anda ketahui lebih lanjut?
- 🚀 **Keahlian & Tech Stack**: Next.js 16, React 19, TypeScript, Express.js, Python, PyTorch, Neo4j, Supabase, MongoDB
- 📁 **6 Proyek Unggulan**: TravelKita, Klasifikasi Tugas Akhir Naive Bayes, Sakuin PWA, BatikGems E-Commerce, MPStore Web Panel, GraphRAG Search Engine
- 💼 **Pengalaman Kerja**: Back-End Developer di MPStore SuperApps
- 🎓 **Pendidikan & Sertifikasi**: S1 Teknik Informatika (IPK 3.70), DQLab, MOS
- 📬 **Kontak Langsung**: WhatsApp (+62 878-5056-6785) atau Email (farishilham.s@gmail.com)`
}

/**
 * Helper untuk mengembalikan respons teks dalam bentuk ReadableStream
 * dengan efek typewriter halus (10ms per kata).
 */
function createStreamFromText(text: string): Response {
  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      const words = text.split(" ")
      for (let i = 0; i < words.length; i++) {
        const chunk = (i === 0 ? "" : " ") + words[i]
        controller.enqueue(encoder.encode(chunk))
        await new Promise((r) => setTimeout(r, 10))
      }
      controller.close()
    },
  })

  return new Response(readable, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
    },
  })
}

export async function POST(req: NextRequest) {
  let userText = ""

  try {
    // 1. Ekstraksi IP Client untuk pembatasan frekuensi (Rate Limiting)
    const forwarded = req.headers.get("x-forwarded-for")
    const clientIp = forwarded ? forwarded.split(",")[0].trim() : req.headers.get("x-real-ip") || "unknown-ip"

    const rateLimit = checkChatRateLimit(clientIp)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Batas frekuensi pesan tercapai. Silakan coba kembali dalam ${rateLimit.retryAfterSeconds} detik.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds || 60),
          },
        }
      )
    }

    // 2. Parse & Validasi Request Body menggunakan Zod
    const rawBody = await req.json().catch(() => null)
    if (!rawBody) {
      return NextResponse.json(
        { success: false, message: "Format request tidak valid (wajib JSON)." },
        { status: 400 }
      )
    }

    const parseResult = ChatRequestSchema.safeParse(rawBody)
    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || "Validasi pesan gagal."
      return NextResponse.json(
        { success: false, message: firstError },
        { status: 400 }
      )
    }

    const { text, history } = parseResult.data
    userText = text

    // Cek konfigurasi API Key penyedia AI dari environment variables
    const groqKey = process.env.GROQ_API_KEY?.trim()
    const openAiKey = process.env.OPENAI_API_KEY?.trim()
    const nvidiaKey = process.env.NVIDIA_APIKEY?.trim()

    let client: OpenAI | null = null
    let primaryModel = "llama-3.3-70b-versatile"
    let fallbackModel: string | null = "llama-3.1-8b-instant"

    if (groqKey) {
      client = new OpenAI({
        apiKey: groqKey,
        baseURL: "https://api.groq.com/openai/v1",
      })

      const rawModel = (process.env.GROQ_MODEL || "").trim().toLowerCase().replace(/\s+/g, "-")
      if (rawModel.includes("8b")) {
        primaryModel = "llama-3.1-8b-instant"
        fallbackModel = "llama-3.3-70b-versatile"
      } else if (rawModel.includes("70b") || rawModel.includes("3.3")) {
        primaryModel = "llama-3.3-70b-versatile"
        fallbackModel = "llama-3.1-8b-instant"
      } else if (rawModel) {
        primaryModel = rawModel
        fallbackModel = "llama-3.1-8b-instant"
      } else {
        primaryModel = "llama-3.3-70b-versatile"
        fallbackModel = "llama-3.1-8b-instant"
      }
    } else if (openAiKey) {
      client = new OpenAI({
        apiKey: openAiKey,
        baseURL: process.env.OPENAI_BASE_URL?.trim() || undefined,
      })
      primaryModel = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini"
      fallbackModel = "gpt-3.5-turbo"
    } else if (nvidiaKey) {
      client = new OpenAI({
        apiKey: nvidiaKey,
        baseURL: "https://integrate.api.nvidia.com/v1",
      })
      primaryModel = process.env.NVIDIA_MODEL?.trim() || "meta/llama-3.1-70b-instruct"
      fallbackModel = null
    }

    // Jika tidak ada API key yang dikonfigurasi, gunakan fallback response generator cerdas
    if (!client) {
      console.log("[Chat API] Tidak ada API Key eksternal yang diatur. Menggunakan Knowledge Base cerdas bawaan Rishy.")
      return createStreamFromText(generateFallbackResponse(userText))
    }

    // Susun riwayat chat dengan jaminan System Prompt persona Rishy
    const validHistory: HistoryEntry[] = Array.isArray(history)
      ? history.filter((h) => h && (h.role === "user" || h.role === "assistant"))
      : []

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: RISHY_SYSTEM_PROMPT },
      ...validHistory.slice(-8),
      { role: "user", content: userText },
    ]

    let completion: AsyncIterable<OpenAI.Chat.Completions.ChatCompletionChunk> | null = null

    // Percobaan 1: Menggunakan model utama
    try {
      completion = await client.chat.completions.create({
        model: primaryModel,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024,
        stream: true,
      })
    } catch (primaryErr: unknown) {
      const primaryErrMsg = primaryErr instanceof Error ? primaryErr.message : String(primaryErr)
      console.warn(`[Chat API] Model utama '${primaryModel}' mengalami kendala:`, primaryErrMsg)

      // Percobaan 2: Coba model fallback resmi jika tersedia
      if (fallbackModel && fallbackModel !== primaryModel) {
        try {
          console.log(`[Chat API] Mengalihkan ke model cadangan resmi '${fallbackModel}'...`)
          completion = await client.chat.completions.create({
            model: fallbackModel,
            messages: messages,
            temperature: 0.7,
            max_tokens: 1024,
            stream: true,
          })
        } catch (fallbackErr: unknown) {
          const fallbackErrMsg = fallbackErr instanceof Error ? fallbackErr.message : String(fallbackErr)
          console.warn(`[Chat API] Model cadangan '${fallbackModel}' juga mengalami kendala:`, fallbackErrMsg)
          completion = null
        }
      }
    }

    // Jika semua model eksternal gagal (kuota habis, rate limit 429, API key revoked 401, timeout, dsb),
    // aktifkan Intelligent Fallback Knowledge Base tanpa melempar error rusak ke user.
    if (!completion) {
      console.warn("[Chat API] Provider AI eksternal tidak tersedia/kehabisan kuota. Mengaktifkan Knowledge Base cerdas bawaan Rishy.")
      return createStreamFromText(generateFallbackResponse(userText))
    }

    // Streaming respons dari provider AI
    try {
      const encoder = new TextEncoder()
      let hasEmittedChunk = false

      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of completion!) {
              const content = chunk.choices?.[0]?.delta?.content || ""
              if (content) {
                hasEmittedChunk = true
                controller.enqueue(encoder.encode(content))
              }
            }
            controller.close()
          } catch (streamErr) {
            console.error("[Chat API Stream Error]:", streamErr)
            // Jika stream terputus sebelum sempat mengirimkan konten, kirim jawaban dari knowledge base
            if (!hasEmittedChunk) {
              const fallbackText = generateFallbackResponse(userText)
              controller.enqueue(encoder.encode(fallbackText))
            }
            controller.close()
          }
        },
      })

      return new Response(readable, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          "Connection": "keep-alive",
        },
      })
    } catch (streamInitErr) {
      console.error("[Chat API Stream Init Error]:", streamInitErr)
      return createStreamFromText(generateFallbackResponse(userText))
    }
  } catch (fatalError: unknown) {
    const fatalErrMsg = fatalError instanceof Error ? fatalError.message : String(fatalError)
    console.error("[Chat API Fatal Error]:", fatalErrMsg)
    // Jangan pernah mengembalikan pesan statis salam berulang jika terjadi error tak terduga.
    // Selalu jawab pertanyaan spesifik pengunjung dengan knowledge base cerdas.
    const fallbackText = generateFallbackResponse(userText || "halo")
    return createStreamFromText(fallbackText)
  }
}
