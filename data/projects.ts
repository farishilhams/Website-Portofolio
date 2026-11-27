import { type StaticImageData } from "next/image"
import batikGemsImg from "@/public/images/projects/ecommerce-batik.png"
import mpstorePanelImg from "@/public/images/projects/mpstore-panel.png"
import graphragSearchImg from "@/public/images/projects/graphrag-search.png"
import travelKitaImg from "@/public/images/projects/travelkita-booking.png"
import naiveBayesImg from "@/public/images/projects/naive-bayes-thesis.png"
import sakuinFinanceImg from "@/public/images/projects/sakuin-finance.png"

export interface ProjectItem {
  id: string
  index: number
  imagePath: StaticImageData | string
  title: string
  category: string
  shortDescription: string
  description: string
  longDescription: string
  details: string
  createdAt: string
  features: string[]
  tech: string[]
  githubUrl: string
  liveDemoUrl: string
  isPrivateRepo: boolean
}

export const projectList: ProjectItem[] = [
  {
    id: "batikgems-ecommerce",
    index: 0,
    imagePath: batikGemsImg,
    title: "BatikGems E-Commerce",
    category: "Aplikasi Web & E-Commerce",
    shortDescription:
      "Platform e-commerce busana batik modern dengan integrasi RajaOngkir API untuk kalkulasi ongkos kirim otomatis serta manajemen stok multi-varian.",
    description:
      "BatikGems adalah platform e-commerce berbasis web yang dirancang untuk memfasilitasi transaksi busana batik nusantara secara digital dengan kalkulasi ongkir dinamis dan pelacakan pesanan otomatis.",
    longDescription:
      "BatikGems E-Commerce hadir untuk memperluas pemasaran busana batik tradisional ke pasar nasional melalui pengalaman belanja daring yang praktis. Platform ini mengintegrasikan API RajaOngkir agar pembeli dapat menghitung ongkos kirim secara akurat dan real-time ke seluruh wilayah Indonesia.\n\nDari sisi pengelolaan toko, sistem menyediakan manajemen inventaris multi-varian ukuran dan warna, alur checkout hingga faktur otomatis, serta panel admin untuk memantau pesanan dan laporan penjualan secara terpusat.",
    details:
      "Dibangun menggunakan PHP native berpola MVC yang terstruktur, basis data relasional MySQL, JavaScript untuk validasi interaktif di sisi klien, serta Bootstrap agar antarmuka tetap responsif di berbagai perangkat.",
    createdAt: "Juni 2024",
    features: [
      "Integrasi API Ekspedisi RajaOngkir untuk Estimasi Ongkir Otomatis & Akurat",
      "Sistem Manajemen Stok Multi-Varian Ukuran dan Warna Busana",
      "Alur Pemesanan Terpadu dengan Penghitungan Total & Faktur Transaksi",
      "Panel Dashboard Admin untuk Manajemen Produk, Pesanan, dan Laporan Penjualan",
    ],
    tech: ["PHP", "MySQL", "RajaOngkir API", "JavaScript", "Bootstrap", "REST API"],
    githubUrl: "https://github.com/farishilhams/E-Commerce-Batik",
    liveDemoUrl: "https://batikgems.infinityfreeapp.com",
    isPrivateRepo: false,
  },
  {
    id: "mpstore-web-panel",
    index: 1,
    imagePath: mpstorePanelImg,
    title: "MPStore Web Panel",
    category: "Platform Web Enterprise",
    shortDescription:
      "Web panel operasional internal MPStore dengan proteksi 5 tingkat Role-Based Access Control (RBAC), Express.js REST API, dan Supabase PostgreSQL.",
    description:
      "Dashboard operasional terpusat yang dirancang untuk mengelola ekosistem digital MPStore dengan keamanan otorisasi bertingkat dan integrasi basis data cloud.",
    longDescription:
      "Dikembangkan selama masa magang sebagai Back-End Developer di MPStore SuperApps, web panel ini berfungsi sebagai pusat tata kelola operasional dan analitik internal perusahaan. Arsitektur backend memadukan Express.js dan TypeScript untuk menghadirkan RESTful API yang cepat serta terstruktur.\n\nKeamanan sistem dijaga melalui proteksi 5 tingkat hak akses (Role-Based Access Control), dilengkapi sinkronisasi basis data cloud Supabase PostgreSQL, manajemen akun tim, serta antarmuka React 19 dan Vite yang modern.",
    details:
      "Mengimplementasikan autentikasi token JWT, pengelolaan skema relasional PostgreSQL melalui Supabase, pengujian endpoint menyeluruh dengan Postman, serta state management yang optimal di sisi frontend.",
    createdAt: "Agustus 2025",
    features: [
      "Proteksi Keamanan 5 Tingkat Akses (Role-Based Access Control / RBAC)",
      "Arsitektur RESTful API Berkinerja Tinggi Menggunakan Express.js & TypeScript",
      "Integrasi Basis Data Cloud Supabase PostgreSQL yang Terukur dan Cepat",
      "Pemantauan Real-Time Ekosistem Digital, Manajemen Pengguna & Analitik Data",
    ],
    tech: ["React 19", "Vite", "Express.js", "TypeScript", "Supabase", "Tailwind CSS"],
    githubUrl: "https://github.com/farishilhams/Website-Panel",
    liveDemoUrl: "https://website-panel-mpstore.vercel.app/",
    isPrivateRepo: false,
  },
  {
    id: "graphrag-search-engine",
    index: 2,
    imagePath: graphragSearchImg,
    title: "GraphRAG Search Engine",
    category: "Platform AI & Mesin Pencari Semantik",
    shortDescription:
      "Mesin pencari semantik dokumen skripsi Teknik Informatika UTM berbasis Graph Retrieval-Augmented Generation (GraphRAG) dan Knowledge Graph Neo4j.",
    description:
      "Platform temu balik informasi yang menggabungkan Graph Retrieval-Augmented Generation (GraphRAG) dan Knowledge Graph Neo4j untuk memahami konteks riset dokumen akademik secara mendalam.",
    longDescription:
      "Proyek riset tugas akhir di Program Studi Teknik Informatika Universitas Trunodjoyo Madura ini dirancang untuk mengatasi keterbatasan pencarian kata kunci konvensional. Dokumen skripsi diurai dan ditransformasikan menjadi struktur graf pengetahuan (Knowledge Graph) di dalam basis data Neo4j.\n\nDengan memadukan Large Language Model (LLM) dan algoritma GraphRAG, sistem memetakan relasi antar-topik, penulis, algoritma, serta metodologi penelitian untuk menghasilkan rangkuman akademis yang kontekstual melalui antarmuka Streamlit.",
    details:
      "Dikembangkan menggunakan Python sebagai bahasa inti, PyTorch dan Scikit-Learn untuk pemrosesan NLP, basis data graf Neo4j untuk traversal relasi semantik berkecepatan tinggi, serta Streamlit Cloud untuk visualisasi graf interaktif.",
    createdAt: "Februari 2026",
    features: [
      "Pipeline Cerdas Graph Retrieval-Augmented Generation (GraphRAG)",
      "Pemetaan Relasi Semantik Antar-Entitas Riset Berbasis Knowledge Graph Neo4j",
      "Pencarian Semantik & Temu Balik Informasi Dokumen Berdasarkan Konteks Nyata",
      "Antarmuka Visualisasi Graf & Analisis Eksploratif Interaktif Berbasis Streamlit",
    ],
    tech: ["Python", "Streamlit", "GraphRAG", "Knowledge Graphs", "Neo4j", "LLM / NLP"],
    githubUrl: "https://github.com/farishilhams/GraphRAG-Search-Engine",
    liveDemoUrl: "https://graphrag-search-engine.streamlit.app/",
    isPrivateRepo: false,
  },
  {
    id: "travelkita-flight-booking",
    index: 3,
    imagePath: travelKitaImg,
    title: "TravelKita",
    category: "Platform Reservasi & E-Ticketing",
    shortDescription:
      "Platform reservasi tiket pesawat modern berbasis Next.js 16 dengan sinkronisasi kursi real-time Supabase, pembayaran Midtrans Snap, dan radar FIDS.",
    description:
      "TravelKita adalah platform pemesanan tiket pesawat berbasis Next.js 16 dan React 19 yang menghadirkan alur reservasi interaktif, pembayaran digital Midtrans, dan pemantauan jadwal penerbangan.",
    longDescription:
      "TravelKita dirancang untuk menghadirkan pengalaman pemesanan tiket penerbangan komersial yang cepat, transparan, dan terintegrasi. Platform ini memanfaatkan Supabase WebSocket agar pemilihan dan ketersediaan denah kursi kabin (seat mapping) tersinkronisasi secara real-time antar-pengguna.\n\nTransaksi pembayaran ditangani melalui gateway Midtrans Snap yang mendukung berbagai kanal pembayaran aman. Sistem juga dilengkapi radar Flight Information Display System (FIDS) langsung serta panel back-office admin untuk mengelola maskapai, rute jadwal, dan validasi e-ticket otomatis.",
    details:
      "Arsitektur aplikasi memanfaatkan Next.js 16 Server Components, React 19, TypeScript, Tailwind CSS, Supabase PostgreSQL Realtime Channel untuk state kursi kabin, serta integrasi webhook Midtrans untuk verifikasi pembayaran instan.",
    createdAt: "Januari 2026",
    features: [
      "Pemilihan & Sinkronisasi Kursi Kabin Pesawat Real-Time (Supabase WebSocket)",
      "Gateway Pembayaran Digital Multichannel Terintegrasi Midtrans Snap",
      "Radar Jadwal & Flight Information Display System (FIDS) Interaktif",
      "Panel Back-Office Admin Lengkap untuk Manajemen Maskapai, Rute & E-Ticket",
    ],
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Midtrans", "Supabase"],
    githubUrl: "https://github.com/farishilhams/TravelKita",
    liveDemoUrl: "https://travel-kita.vercel.app/",
    isPrivateRepo: false,
  },
  {
    id: "klasifikasi-tugas-akhir-naive-bayes",
    index: 4,
    imagePath: naiveBayesImg,
    title: "Klasifikasi Tugas Akhir Naive Bayes",
    category: "Machine Learning & NLP",
    shortDescription:
      "Aplikasi klasifikasi teks abstrak tugas akhir Teknik Informatika menggunakan algoritma Multinomial Naive Bayes dan ekstraksi fitur TF-IDF.",
    description:
      "Sistem klasifikasi teks berbasis Machine Learning dan Natural Language Processing (NLP) untuk memetakan abstrak skripsi ke rumpun bidang minat Teknik Informatika secara objektif.",
    longDescription:
      "Aplikasi ini mengotomatisasi pengelompokan topik tugas akhir mahasiswa Teknik Informatika ke dalam empat bidang minat: Kecerdasan Komputasi, Komputasi Bahasa Alami, Sistem Terdistribusi dan Jaringan, serta Teknologi Perangkat Lunak.\n\nTeks abstrak diproses melalui tahapan NLP lengkap (case folding, tokenizing, stopword removal, dan stemming Sastrawi), lalu diberi pembobotan kata TF-IDF sebelum diklasifikasikan oleh algoritma Multinomial Naive Bayes lewat antarmuka pengujian interaktif di Streamlit.",
    details:
      "Dibangun dengan Python, Scikit-Learn untuk pemodelan Multinomial Naive Bayes dan TfidfVectorizer, Sastrawi serta NLTK untuk prapemrosesan teks bahasa Indonesia, Pandas dan NumPy untuk pengolahan korpus, serta Streamlit untuk antarmuka web.",
    createdAt: "November 2025",
    features: [
      "Ekstraksi Fitur Pembobotan Kata Term Frequency - Inverse Document Frequency (TF-IDF)",
      "Klasifikasi Cerdas Multi-Kelas Menggunakan Algoritma Multinomial Naive Bayes",
      "Pipeline Preprocessing Teks Lengkap (Tokenizing, Stopwords, Stemming Sastrawi)",
      "Studio Pengujian Abstrak Interaktif & Analisis Probabilitas Kelas Prediksi",
    ],
    tech: ["Python", "Streamlit", "Scikit-Learn", "NLP", "Naive Bayes", "TF-IDF"],
    githubUrl: "https://github.com/farishilhams/Klasifikasi-Tugas-Akhir-Naive-Bayes",
    liveDemoUrl: "https://klasifikasi-tugas-akhir-naive-bayes.streamlit.app/",
    isPrivateRepo: false,
  },
  {
    id: "sakuin-finance-pwa",
    index: 5,
    imagePath: sakuinFinanceImg,
    title: "Sakuin",
    category: "Progressive Web App & Finansial",
    shortDescription:
      "Aplikasi pengelola keuangan pribadi berbasis Progressive Web App (PWA) dengan pemindai struk otomatis OCR, manajemen anggaran, dan Google OAuth.",
    description:
      "Sakuin adalah asisten finansial digital berbasis Progressive Web App (PWA) yang memudahkan pengguna mencatat pengeluaran, memindai struk belanja otomatis, dan mengatur anggaran bulanan.",
    longDescription:
      "Sakuin (Pengelola Uang Saku) dirancang sebagai aplikasi keuangan yang ringan, intuitif, dan dapat diinstal langsung ke perangkat mobile sebagai Progressive Web App (PWA). Pengguna cukup memindai foto struk belanja melalui fitur Optical Character Recognition (OCR) untuk mengekstrak daftar item dan total nominal tanpa mengetik manual.\n\nSelain pencatatan transaksi harian, aplikasi ini menyediakan pengaturan anggaran per kategori, pelacakan target tabungan (wishlist), grafik arus kas interaktif, serta autentikasi Google OAuth yang tersinkronisasi dengan basis data cloud MongoDB.",
    details:
      "Frontend dibangun dengan React, Vite, Tailwind CSS, serta Service Worker PWA, sedangkan backend menggunakan Node.js, Express.js, MongoDB Atlas, Tesseract OCR API untuk pembacaan struk, dan Google OAuth 2.0.",
    createdAt: "Desember 2025",
    features: [
      "Pemindai Struk Belanja Otomatis Berbasis Optical Character Recognition (OCR)",
      "Manajemen Arus Kas Masuk & Keluar Lengkap dengan Alokasi Budget per Kategori",
      "Dukungan Progressive Web App (PWA) yang Responsif dan Dapat Diinstal di Ponsel",
      "Autentikasi Aman Google OAuth 2.0 & Sinkronisasi Cloud Database MongoDB",
    ],
    tech: ["React.js", "PWA", "Node.js", "MongoDB", "OCR / Tesseract", "Tailwind CSS"],
    githubUrl: "https://github.com/farishilhams/Sakuin",
    liveDemoUrl: "https://sakuinfree.vercel.app/",
    isPrivateRepo: false,
  },
]
