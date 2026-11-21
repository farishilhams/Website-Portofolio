import { type StaticImageData } from "next/image"
import batikGemsImg from "@/public/images/projects/ecommerce-batik.png"
import mpstorePanelImg from "@/public/images/projects/mpstore-panel.png"
import graphragSearchImg from "@/public/images/projects/graphrag-search.png"

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
      "Platform e-commerce busana batik modern yang terintegrasi dengan API RajaOngkir untuk kalkulasi ongkos kirim real-time otomatis, serta manajemen stok dan varian ukuran busana yang dinamis.",
    description:
      "BatikGems adalah platform e-commerce busana batik modern berbasis web yang dirancang untuk memfasilitasi transaksi busana batik nusantara secara digital dengan kalkulasi ongkir dinamis dan pelacakan pesanan otomatis.",
    longDescription:
      "BatikGems E-Commerce dibangun untuk mendigitalkan pemasaran busana batik tradisional ke pasar nasional yang lebih luas. Menggunakan arsitektur PHP dan basis data MySQL yang andal, platform ini mengintegrasikan API RajaOngkir untuk menghitung tarif pengiriman secara akurat ke seluruh wilayah Indonesia. Dilengkapi sistem manajemen inventaris multi-varian ukuran, alur transaksi aman dari pemilihan produk hingga invoice otomatis, serta panel admin intuitif untuk monitoring penjualan dan ketersediaan stok.",
    details:
      "Arsitektur sistem dibangun menggunakan PHP native dengan pola MVC bersih, MySQL untuk manajemen data relasional terstruktur, JavaScript untuk validasi interaktif di sisi klien, serta Bootstrap untuk desain antarmuka yang sepenuhnya responsif di semua perangkat.",
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
      "Web panel internal ekosistem digital MPStore dengan arsitektur proteksi keamanan 5 tingkatan Role-Based Access Control (RBAC), Express.js RESTful API, dan basis data Supabase PostgreSQL.",
    description:
      "Sistem dashboard operasional terpusat perusahaan yang dirancang untuk mengelola ekosistem digital MPStore dengan proteksi keamanan otorisasi bertingkat dan integrasi basis data cloud.",
    longDescription:
      "Dikembangkan selama masa magang sebagai Back-End Developer di MPStore SuperApps, web panel ini menjadi pusat tata kelola operasional dan analitik data internal perusahaan. Dibangun dengan memadukan Express.js dan TypeScript pada backend untuk menghasilkan RESTful API berkinerja tinggi, sistem pengamanan 5 level hak akses (Role-Based Access Control), sinkronisasi basis data cloud Supabase PostgreSQL, manajemen akun tim, serta antarmuka React 19 + Vite yang modern, cepat, dan responsif.",
    details:
      "Mengimplementasikan keamanan token JWT, enkripsi data, manajemen skema relasional PostgreSQL via Supabase, dokumentasi dan pengujian endpoint menyeluruh melalui Postman, serta arsitektur state management yang optimal di sisi frontend.",
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
      "Mesin pencari akademik cerdas berbasis Graph Retrieval-Augmented Generation (GraphRAG) dan Knowledge Graphs untuk eksplorasi serta temu balik semantik dokumen skripsi Teknik Informatika UTM.",
    description:
      "Platform temu balik informasi mutakhir yang menggabungkan Graph Retrieval-Augmented Generation (GraphRAG) dengan Knowledge Graphs berbasis Neo4j untuk memahami relasi makna dan konteks riset dokumen akademik secara mendalam.",
    longDescription:
      "Merupakan riset skripsi inovatif di program studi Teknik Informatika Universitas Trunojoyo Madura yang memecahkan keterbatasan pencarian teks konvensional. Dokumen skripsi diurai dan ditransformasikan ke dalam struktur graf pengetahuan (Knowledge Graph) di Neo4j. Memanfaatkan Large Language Model (LLM) dan algoritma GraphRAG untuk memetakan hubungan keterkaitan antar-topik, penulis, konsep algoritma, dan metodologi, menghasilkan jawaban dan rangkuman akademis kontekstual dengan antarmuka interaktif Streamlit.",
    details:
      "Menggunakan Python sebagai bahasa inti analisis data, PyTorch dan Scikit-Learn untuk pemrosesan NLP, basis data graf Neo4j untuk traversal jalur relasi semantik berkecepatan tinggi, serta Streamlit Cloud untuk penyajian visualisasi graf interaktif yang mudah diakses.",
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
]
