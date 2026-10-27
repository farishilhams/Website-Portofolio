import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

interface HistoryEntry {
  role: "system" | "user" | "assistant"
  content: string
}

// System prompt resmi yang merepresentasikan persona Farish Ilham Syahrani (Rishy)
const RISHY_SYSTEM_PROMPT = `Kamu adalah Rishy Assistant, asisten AI cerdas dan ramah untuk website portfolio Farish Ilham Syahrani (Rishy).
Tugas utamamu adalah menjawab pertanyaan pengunjung website portfolio mengenai latar belakang, keahlian, pengalaman kerja, proyek, dan kontak Rishy secara akurat, profesional, dan solutif dalam Bahasa Indonesia.

Berikut adalah profil lengkap dan terverifikasi mengenai Rishy:
1. **Identitas & Profil**:
   - Nama Lengkap: Farish Ilham Syahrani
   - Nama Panggilan / Brand: Rishy
   - Gelar & Status: Fresh Graduate S1 Teknik Informatika (Universitas Trunojoyo Madura, 2022 - 2026, IPK: 3.70)
   - Spesialisasi / Profesi: Full Stack Developer & Machine Learning Engineer
   - Domisili / Lokasi: Kamal, Kab. Bangkalan, Madura, Jawa Timur, Indonesia
   - Karakter Kerja: Berorientasi pada arsitektur bersih (clean code), performa tinggi, desain modern responsif, serta pemanfaatan data & machine learning.

2. **Kontak & Media Sosial**:
   - Email: farishilham.s@gmail.com
   - WhatsApp / Telp: +62 878-5056-6785 (https://wa.me/6287850566785)
   - LinkedIn: https://www.linkedin.com/in/farish-ilham-syahrani/
   - GitHub: https://github.com/farishilhams
   - Instagram: @farishsyahrani
   - TikTok: @rishsyahrani

3. **Tech Stack & Keahlian**:
   - Frontend: React.js, Next.js (App Router), TypeScript, Tailwind CSS, HTML5, CSS3, Framer Motion
   - Backend: Python, Node.js, Express.js, Laravel, RESTful API
   - AI / Machine Learning: PyTorch, Scikit-Learn, Deep Learning, Natural Language Processing (NLP), Graph Retrieval-Augmented Generation (GraphRAG), Knowledge Graphs
   - Database: MySQL, PostgreSQL, Supabase, Neo4j (Graph Database)
   - Tools & Deployment: Git, GitHub, Postman, Vercel, Streamlit Cloud

4. **Pengalaman & Sertifikasi**:
   - Back-End Developer Intern di MPStore SuperApps (Juli - September 2025): Merancang RESTful API Express.js untuk sistem Web Panel internal, mengelola database MySQL, integrasi frontend React, dan pengujian API via Postman.
   - S1 Teknik Informatika - Universitas Trunojoyo Madura (Lulus 2026, IPK 3.70).
   - Data Science Fundamentals & R Training - DQLab (April 2024).
   - Microsoft Office Specialist Certification - Karirnex by PT Ebiz Karisma Internasional (Agustus 2026).

5. **Karya & Proyek Unggulan**:
   - Proyek 1: **BatikGems E-Commerce** (Web Application & E-Commerce)
     Platform e-commerce busana batik dengan integrasi RajaOngkir API untuk kalkulasi ongkir real-time otomatis, manajemen transaksi & stok multi-varian ukuran berbasis PHP & MySQL.
     Demo: https://batikgems.infinityfreeapp.com | Repo: https://github.com/farishilhams/E-Commerce-Batik
   - Proyek 2: **MPStore Web Panel** (Enterprise Web Platform)
     Web panel manajemen ekosistem digital MPStore dengan proteksi keamanan 5 tingkat Role-Based Access Control (RBAC), Express.js REST API, React 19 + Vite, dan Supabase PostgreSQL.
     Demo: https://website-panel-mpstore.vercel.app/ | Repo: https://github.com/farishilhams/Website-Panel
   - Proyek 3: **GraphRAG Search Engine** (AI / Machine Learning Platform)
     Mesin pencari cerdas berbasis Graph Retrieval-Augmented Generation (GraphRAG) dan Knowledge Graphs untuk eksplorasi dan temu balik informasi dokumen skripsi Teknik Informatika Universitas Trunojoyo Madura berbasis Python & Streamlit.
     Demo: https://graphrag-search-engine.streamlit.app/ | Repo: https://github.com/farishilhams/GraphRAG-Search-Engine

Instruksi Menjawab:
- Berikan respon yang ramah, sopan, to the point, dan terstruktur rapi (gunakan poin atau markdown bila sesuai).
- Jika ada pertanyaan di luar konteks portfolio Rishy, jawablah secara singkat dan arahkan kembali ke topik portfolio atau kontak Rishy.
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

/**
 * Intelligent Fallback Generator berbasis Knowledge Base resmi Farish Ilham Syahrani (Rishy).
 * Berfungsi jika API Key eksternal belum diisi atau penyedia AI eksternal sedang mengalami gangguan / rate limit.
 */
function generateFallbackResponse(query: string): string {
  const q = (query || "").toLowerCase()

  // 1. Pengalaman Kerja, Magang, Karir (prioritas tinggi)
  if (hasWord(q, ["pengalaman", "magang", "intern", "internship", "riwayat", "karir", "bekerja", "kantor"])) {
    return `**Pengalaman Kerja & Profesional Farish Ilham Syahrani**:

💼 **Back-End Developer Intern** — **MPStore SuperApps** *(Juli - September 2025)*
- Bertanggung jawab merancang dan mengembangkan arsitektur backend untuk Web Panel internal perusahaan.
- Membangun RESTful API berkinerja tinggi menggunakan Express.js dan TypeScript.
- Mengelola integritas skema dan kueri basis data MySQL.
- Melakukan pengujian endpoint menyeluruh melalui Postman.
- Berkolaborasi aktif mengintegrasikan API dengan antarmuka Frontend React.js.`
  }

  // 2. Keahlian, Tech Stack, Bahasa Pemrograman, Tools
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
    return `Berikut adalah keahlian teknis (**Tech Stack**) yang dikuasai oleh **Farish Ilham Syahrani (Rishy)**:

- 💻 **Front-End Development**: React.js, Next.js (App Router), TypeScript, Tailwind CSS, HTML5, CSS3, Framer Motion
- ⚙️ **Back-End Development**: Python, Node.js, Express.js, Laravel, RESTful API
- 🧠 **AI & Machine Learning**: PyTorch, Scikit-Learn, Deep Learning, Natural Language Processing (NLP), Graph Retrieval-Augmented Generation (GraphRAG), Knowledge Graphs
- 🗄️ **Databases**: MySQL, PostgreSQL, Supabase, Neo4j (Graph Database)
- 🛠️ **Tools & DevOps**: Git, GitHub, Postman, Vercel, Streamlit Cloud

Farish berfokus pada arsitektur kode yang bersih (*clean architecture*), performa tinggi, dan integrasi kecerdasan buatan berbasis data modern.`
  }

  // 3. Jasa, Hire, Kerja Sama, Freelance, Buat Website
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
    return `Farish Ilham Syahrani terbuka untuk kesempatan kerja penuh waktu (*Full-time*), paruh waktu (*Part-time*), proyek *Freelance*, maupun kolaborasi pengembangan perangkat lunak (Web Development & AI).

Untuk diskusi kebutuhan proyek, penawaran kerja sama, atau estimasi teknis, silakan langsung hubungi melalui:
- **WhatsApp**: [+62 878-5056-6785](https://wa.me/6287850566785)
- **Email**: [farishilham.s@gmail.com](mailto:farishilham.s@gmail.com)`
  }

  // 4. Proyek, Portfolio, Karya, Aplikasi
  if (
    hasWord(q, [
      "proyek",
      "project",
      "portfolio",
      "portofolio",
      "karya",
      "aplikasi",
      "batikgems",
      "batik",
      "mpstore",
      "graphrag",
      "demo",
    ])
  ) {
    return `Berikut adalah 3 proyek unggulan yang telah dikembangkan oleh **Farish Ilham Syahrani**:

1. 🛍️ **BatikGems E-Commerce** (E-Commerce Web Platform)
   - Platform belanja batik daring dengan integrasi otomatis RajaOngkir API untuk penghitungan biaya kirim real-time, serta sistem manajemen stok ukuran multi-varian.
   - **Tech Stack**: PHP, MySQL, RajaOngkir API, JavaScript, Bootstrap
   - **Live Demo**: [batikgems.infinityfreeapp.com](https://batikgems.infinityfreeapp.com)

2. 🏢 **MPStore Web Panel** (Enterprise Management Platform)
   - Web panel manajemen sistem internal MPStore dengan perlindungan 5 tingkatan Role-Based Access Control (RBAC), performa RESTful API cepat, dan integrasi Supabase.
   - **Tech Stack**: React 19, Vite, Express.js, TypeScript, Supabase PostgreSQL, Tailwind CSS
   - **Live Demo**: [website-panel-mpstore.vercel.app](https://website-panel-mpstore.vercel.app/)

3. 🧠 **GraphRAG Search Engine** (AI / Knowledge Graph Platform)
   - Mesin pencari semantik cerdas berbasis Graph Retrieval-Augmented Generation (GraphRAG) dan Knowledge Graphs untuk eksplorasi dan temu balik dokumen skripsi Teknik Informatika UTM.
   - **Tech Stack**: Python, Streamlit, GraphRAG, Knowledge Graphs, Neo4j, LLM
   - **Live Demo**: [graphrag-search-engine.streamlit.app](https://graphrag-search-engine.streamlit.app/)`
  }

  // 5. Pendidikan, Kuliah, Kampus, Skripsi, IPK
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
    return `**Riwayat Pendidikan Farish Ilham Syahrani**:

🎓 **S1 Teknik Informatika** — **Universitas Trunojoyo Madura** (2022 - 2026)
- **Status**: Fresh Graduate
- **IPK**: **3.70** (Skala 4.00)
- **Fokus Riset Skripsi**: Pengembangan Graph Retrieval-Augmented Generation (GraphRAG) dan Knowledge Graph untuk sistem pencarian dokumen skripsi.`
  }

  // 6. Sertifikasi & Pelatihan
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

  // 7. Kontak, Hubungi, Media Sosial, Lokasi
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
    return `Anda dapat menghubungi **Farish Ilham Syahrani (Rishy)** melalui kontak resmi berikut:

- 💬 **WhatsApp**: [+62 878-5056-6785](https://wa.me/6287850566785)
- 📧 **Email**: [farishilham.s@gmail.com](mailto:farishilham.s@gmail.com)
- 💼 **LinkedIn**: [linkedin.com/in/farish-ilham-syahrani](https://www.linkedin.com/in/farish-ilham-syahrani/)
- 🐙 **GitHub**: [github.com/farishilhams](https://github.com/farishilhams)
- 📸 **Instagram**: [@farishsyahrani](https://instagram.com/farishsyahrani)
- 🎵 **TikTok**: [@rishsyahrani](https://tiktok.com/@rishsyahrani)
- 📍 **Lokasi**: Kamal, Kab. Bangkalan, Madura, Jawa Timur, Indonesia`
  }

  // 8. Profil, Siapa Farish, Biodata, Latar Belakang
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
    return `**Farish Ilham Syahrani** (akrab dipanggil **Rishy**) adalah seorang **Full Stack Developer & Machine Learning Engineer** yang berdomisili di Kamal, Kab. Bangkalan, Madura, Jawa Timur.

Beliau merupakan Fresh Graduate **S1 Teknik Informatika** dari **Universitas Trunojoyo Madura** (lulus dengan predikat memuaskan, IPK **3.70**).

Farish memiliki passion mendalam dalam membangun aplikasi web modern berkinerja tinggi serta riset implementasi Machine Learning cerdas, khususnya pada *Knowledge Graphs* dan *Graph Retrieval-Augmented Generation* (GraphRAG).`
  }

  // 9. Sapaan / Greeting
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
    return `Halo! Senang menyapa Anda. Saya adalah Rishy Assistant, asisten AI pribadi untuk **Farish Ilham Syahrani (Rishy)**.

Ada yang bisa saya bantu seputar profil atau karya Rishy?
1. 🚀 **Keahlian & Tech Stack** (Full Stack Web & Machine Learning)
2. 📁 **Proyek Unggulan** (BatikGems, MPStore Web Panel, GraphRAG Search Engine)
3. 💼 **Pengalaman Kerja** (Back-End Developer di MPStore SuperApps)
4. 🎓 **Pendidikan & Sertifikasi** (S1 Teknik Informatika UTM, IPK 3.70)
5. 📬 **Kontak & Kerja Sama** (WhatsApp, Email, LinkedIn)`
  }

  // 10. Default / Fallback Respons Cerdas
  return `Terima kasih atas pertanyaan Anda! Farish Ilham Syahrani (Rishy) adalah **Full Stack Developer & Machine Learning Engineer** (Fresh Graduate S1 Teknik Informatika UTM, IPK 3.70).

Informasi apa yang ingin Anda ketahui lebih lanjut?
- 🚀 **Keahlian & Tech Stack**: React, Next.js, TypeScript, Express.js, Python, PyTorch, Neo4j
- 📁 **Proyek Unggulan**: BatikGems E-Commerce, MPStore Web Panel, GraphRAG Search Engine
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
    const body = await req.json().catch(() => null)

    if (!body || typeof body.text !== "string" || !body.text.trim()) {
      return NextResponse.json(
        { success: false, message: "Pesan tidak boleh kosong." },
        { status: 400 }
      )
    }

    const { text, history = [] }: { text: string; history: HistoryEntry[] } = body
    userText = text.trim()

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
    const validHistory = Array.isArray(history)
      ? history.filter((h) => h && (h.role === "user" || h.role === "assistant"))
      : []

    const messages = [
      { role: "system", content: RISHY_SYSTEM_PROMPT },
      ...validHistory.slice(-8),
      { role: "user", content: userText },
    ]

    let completion: any = null

    // Percobaan 1: Menggunakan model utama
    try {
      completion = await client.chat.completions.create({
        model: primaryModel,
        messages: messages as any,
        temperature: 0.7,
        max_tokens: 1024,
        stream: true,
      })
    } catch (primaryErr: any) {
      console.warn(`[Chat API] Model utama '${primaryModel}' mengalami kendala:`, primaryErr?.message || primaryErr)

      // Percobaan 2: Coba model fallback resmi jika tersedia
      if (fallbackModel && fallbackModel !== primaryModel) {
        try {
          console.log(`[Chat API] Mengalihkan ke model cadangan resmi '${fallbackModel}'...`)
          completion = await client.chat.completions.create({
            model: fallbackModel,
            messages: messages as any,
            temperature: 0.7,
            max_tokens: 1024,
            stream: true,
          })
        } catch (fallbackErr: any) {
          console.warn(`[Chat API] Model cadangan '${fallbackModel}' juga mengalami kendala:`, fallbackErr?.message || fallbackErr)
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
            for await (const chunk of completion) {
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
  } catch (fatalError: any) {
    console.error("[Chat API Fatal Error]:", fatalError)
    // Jangan pernah mengembalikan pesan statis salam berulang jika terjadi error tak terduga.
    // Selalu jawab pertanyaan spesifik pengunjung dengan knowledge base cerdas.
    const fallbackText = generateFallbackResponse(userText)
    return createStreamFromText(fallbackText)
  }
}
