import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

interface HistoryEntry {
  role: "system" | "user" | "assistant"
  content: string
}

// System prompt resmi yang merepresentasikan persona Farish Ilham Syahrani (Rishy)
const RISHY_SYSTEM_PROMPT = `Kamu adalah Rishy Assistant, asisten AI cerdas dan ramah untuk website portofolio Farish Ilham Syahrani (Rishy).
Tugas utamamu adalah menjawab pertanyaan pengunjung website portofolio mengenai latar belakang, keahlian, pengalaman kerja, proyek, dan kontak Rishy secara akurat, profesional, dan solutif dalam Bahasa Indonesia.

Berikut adalah profil lengkap dan terverifikasi mengenai Rishy:
1. **Identitas & Profil**:
   - Nama Lengkap: Farish Ilham Syahrani
   - Nama Panggilan / Brand: Rishy
   - Gelar & Status: Fresh Graduate S1 Teknik Informatika (Universitas Trunojoyo Madura, 2022 - 2026, IPK: 3.70)
   - Spesialisasi / Profesi: Web Developer & Machine Learning Engineer
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
- Jika ada pertanyaan di luar konteks portofolio Rishy, jawablah secara singkat dan arahkan kembali ke topik portofolio atau kontak Rishy.
- Jangan mengarang data di luar profil di atas.`

/**
 * Intelligent fallback generator jika API Key eksternal belum diatur di .env.local
 * atau kuota provider AI eksternal sedang habis / rate limited.
 */
function generateFallbackResponse(query: string): string {
  const q = query.toLowerCase()

  if (q.includes("halo") || q.includes("hai") || q.includes("pagi") || q.includes("siang") || q.includes("malam") || q.includes("assalam")) {
    return `Halo! Senang bisa menyapa Anda. Saya asisten AI untuk **Farish Ilham Syahrani (Rishy)**.

Ada yang bisa saya bantu terkait:
1. 👨‍💻 **Profil & Latar Belakang** Rishy
2. 🚀 **Keahlian & Tech Stack** (Web Development & Machine Learning)
3. 📁 **Proyek Unggulan** (BatikGems, MPStore Web Panel, GraphRAG Search Engine)
4. 📬 **Kontak & Kerja Sama**`
  }

  if (q.includes("siapa") || q.includes("tentang") || q.includes("profil") || q.includes("bio") || q.includes("background")) {
    return `**Farish Ilham Syahrani (Rishy)** adalah seorang **Web Developer & Machine Learning Engineer** (Fresh Graduate S1 Teknik Informatika dari **Universitas Trunojoyo Madura** dengan IPK **3.70**).

Rishy berfokus pada pengembangan aplikasi web modern berperforma tinggi (React, Next.js, TypeScript, Express.js) serta penerapan kecerdasan buatan berbasis data dan Knowledge Graphs (Python, PyTorch, GraphRAG, Neo4j).`
  }

  if (q.includes("proyek") || q.includes("project") || q.includes("portofolio") || q.includes("karya") || q.includes("aplikasi") || q.includes("batik") || q.includes("mpstore") || q.includes("graphrag")) {
    return `Berikut 3 karya proyek unggulan Rishy:

1. 🛍️ **BatikGems E-Commerce**:
   Platform e-commerce busana batik dengan kalkulasi ongkir real-time otomatis via RajaOngkir API dan manajemen stok multi-varian ukuran.
   - **Tech Stack**: PHP, MySQL, RajaOngkir API, JavaScript, Bootstrap
   - **Demo**: [batikgems.infinityfreeapp.com](https://batikgems.infinityfreeapp.com)

2. 🏢 **MPStore Web Panel**:
   Web panel manajemen ekosistem digital dengan 5 tingkat hak akses (RBAC), arsitektur RESTful API berkinerja tinggi, dan integrasi Supabase.
   - **Tech Stack**: React 19, Vite, Express.js, TypeScript, Supabase PostgreSQL, Tailwind CSS
   - **Demo**: [website-panel-mpstore.vercel.app](https://website-panel-mpstore.vercel.app/)

3. 🧠 **GraphRAG Search Engine**:
   Mesin pencari cerdas berbasis *Graph Retrieval-Augmented Generation* dan *Knowledge Graph* untuk eksplorasi semantik dokumen skripsi Teknik Informatika UTM.
   - **Tech Stack**: Python, Streamlit, GraphRAG, Knowledge Graphs, Neo4j, LLM/NLP
   - **Demo**: [graphrag-search-engine.streamlit.app](https://graphrag-search-engine.streamlit.app/)`
  }

  if (q.includes("skill") || q.includes("tech") || q.includes("keahlian") || q.includes("kemampuan") || q.includes("bahasa") || q.includes("stack")) {
    return `Berikut keahlian teknis (Tech Stack) yang dikuasai Rishy:

- **Front-End**: React.js, Next.js (App Router), TypeScript, Tailwind CSS, HTML5, CSS3, Framer Motion
- **Back-End**: Python, Node.js, Express.js, Laravel, RESTful API
- **AI & Machine Learning**: PyTorch, Scikit-Learn, NLP, Deep Learning, GraphRAG, Knowledge Graphs
- **Database**: MySQL, PostgreSQL, Supabase, Neo4j (Graph Database)
- **Tools**: Git, GitHub, Postman, Vercel`
  }

  if (q.includes("kontak") || q.includes("hubungi") || q.includes("email") || q.includes("wa") || q.includes("whatsapp") || q.includes("telepon") || q.includes("linkedin") || q.includes("lokasi") || q.includes("alamat")) {
    return `Anda dapat menghubungi Farish Ilham Syahrani (Rishy) melalui:

- 📧 **Email**: [farishilham.s@gmail.com](mailto:farishilham.s@gmail.com)
- 💬 **WhatsApp**: [+62 878-5056-6785](https://wa.me/6287850566785)
- 💼 **LinkedIn**: [linkedin.com/in/farish-ilham-syahrani](https://www.linkedin.com/in/farish-ilham-syahrani/)
- 🐙 **GitHub**: [github.com/farishilhams](https://github.com/farishilhams)
- 📍 **Lokasi**: Kamal, Kab. Bangkalan, Madura, Jawa Timur, Indonesia`
  }

  if (q.includes("pengalaman") || q.includes("kerja") || q.includes("magang") || q.includes("intern") || q.includes("riwayat")) {
    return `**Pengalaman Kerja & Pelatihan Rishy**:

- 💼 **Back-End Developer Intern** - MPStore SuperApps (Juli - September 2025):
  Merancang dan membangun RESTful API dengan Express.js untuk kebutuhan Web Panel internal perusahaan, mengelola database MySQL, pengujian endpoint via Postman, serta integrasi dengan Frontend React.
- 🎓 **S1 Teknik Informatika** - Universitas Trunojoyo Madura (2022 - 2026, IPK: 3.70).
- 📜 **Pelatihan Data Science Fundamentals & R** - DQLab (April 2024).
- 📜 **Microsoft Office Specialist Certification** - Karirnex by PT Ebiz Karisma Internasional (Agustus 2026).`
  }

  return `Terima kasih atas pertanyaan Anda! Farish Ilham Syahrani (Rishy) adalah Web Developer & Machine Learning Engineer (S1 Teknik Informatika UTM, IPK 3.70).

Apakah Anda ingin mengetahui lebih lanjut tentang:
- **Proyek-proyek unggulan** (BatikGems, MPStore Web Panel, GraphRAG Search Engine)
- **Tech Stack & Keahlian** (React, Next.js, TypeScript, Python, PyTorch, Neo4j)
- **Informasi Kontak / Kolaborasi** (Email: farishilham.s@gmail.com, WhatsApp: +62 878-5056-6785)`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)

    if (!body || typeof body.text !== "string" || !body.text.trim()) {
      return NextResponse.json(
        { success: false, message: "Pesan tidak boleh kosong." },
        { status: 400 }
      )
    }

    const { text, history = [] }: { text: string; history: HistoryEntry[] } = body
    const userText = text.trim()

    // Cek konfigurasi API Key penyedia AI dari environment variables
    const groqKey = process.env.GROQ_API_KEY
    const openAiKey = process.env.OPENAI_API_KEY
    const nvidiaKey = process.env.NVIDIA_APIKEY

    let client: OpenAI | null = null
    let modelName = "gpt-4o-mini"

    if (groqKey) {
      client = new OpenAI({
        apiKey: groqKey,
        baseURL: "https://api.groq.com/openai/v1",
      })
      modelName = process.env.GROQ_MODEL || "llama-3.3-70b-versatile"
    } else if (openAiKey) {
      client = new OpenAI({
        apiKey: openAiKey,
        baseURL: process.env.OPENAI_BASE_URL || undefined,
      })
      modelName = process.env.OPENAI_MODEL || "gpt-4o-mini"
    } else if (nvidiaKey) {
      client = new OpenAI({
        apiKey: nvidiaKey,
        baseURL: "https://integrate.api.nvidia.com/v1",
      })
      modelName = process.env.NVIDIA_MODEL || "meta/llama-3.1-70b-instruct"
    }

    // Jika tidak ada API key yang dikonfigurasi, gunakan fallback response generator cerdas
    if (!client) {
      console.warn("[Chat API] Tidak ada API Key AI (GROQ_API_KEY / OPENAI_API_KEY / NVIDIA_APIKEY). Menggunakan fallback knowledge-base Rishy.")
      const fallbackText = generateFallbackResponse(userText)

      // Mengembalikan response stream dengan simulasi text stream untuk UX typewriter
      const encoder = new TextEncoder()
      const readable = new ReadableStream({
        async start(controller) {
          const words = fallbackText.split(" ")
          for (let i = 0; i < words.length; i++) {
            const chunk = (i === 0 ? "" : " ") + words[i]
            controller.enqueue(encoder.encode(chunk))
            // Delay mikro 12ms agar efek streaming halus di frontend
            await new Promise((r) => setTimeout(r, 12))
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

    // Bangun messages dengan jaminan System Prompt Rishy yang akurat
    const validHistory = Array.isArray(history)
      ? history.filter((h) => h && (h.role === "user" || h.role === "assistant"))
      : []

    const messages = [
      { role: "system", content: RISHY_SYSTEM_PROMPT },
      ...validHistory.slice(-8), // ambil riwayat pesan secukupnya agar hemat konteks
      { role: "user", content: userText },
    ]

    try {
      const completion = await client.chat.completions.create({
        model: modelName,
        messages: messages as any,
        temperature: 0.7,
        max_tokens: 1024,
        stream: true,
      })

      const encoder = new TextEncoder()
      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of completion) {
              const content = chunk.choices?.[0]?.delta?.content || ""
              if (content) {
                controller.enqueue(encoder.encode(content))
              }
            }
            controller.close()
          } catch (streamError) {
            console.error("[Chat API Stream Error]:", streamError)
            controller.error(streamError)
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
    } catch (apiError: any) {
      console.error("[Chat API Provider Error]:", apiError)

      // Analisis status error spesifik dari provider AI
      const status = apiError?.status || apiError?.statusCode || 500

      // Jika error adalah kuota habis (429) atau auth (401), aktifkan fallback response cerdas
      // sehingga pengunjung tetap mendapatkan jawaban informatif tanpa tampilan error rusak
      if (status === 429 || status === 401 || status === 500) {
        console.warn(`[Chat API] Fallback diaktifkan akibat status error provider: ${status}`)
        const fallbackText = generateFallbackResponse(userText)

        const encoder = new TextEncoder()
        const readable = new ReadableStream({
          async start(controller) {
            const words = fallbackText.split(" ")
            for (let i = 0; i < words.length; i++) {
              const chunk = (i === 0 ? "" : " ") + words[i]
              controller.enqueue(encoder.encode(chunk))
              await new Promise((r) => setTimeout(r, 12))
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

      return NextResponse.json(
        {
          success: false,
          message: apiError?.message || "Terjadi kesalahan pada layanan AI provider.",
        },
        { status: typeof status === "number" && status >= 400 && status < 600 ? status : 500 }
      )
    }
  } catch (error: any) {
    console.error("[Chat API Fatal Error]:", error)
    return NextResponse.json(
      { success: false, message: error?.message || "Gagal memproses permintaan chat." },
      { status: 500 }
    )
  }
}
