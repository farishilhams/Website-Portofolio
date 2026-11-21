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
  {
    id: "travelkita-flight-booking",
    index: 3,
    imagePath: travelKitaImg,
    title: "TravelKita",
    category: "Platform Reservasi & E-Ticketing",
    shortDescription:
      "Platform reservasi tiket penerbangan komersial modern yang dilengkapi gateway pembayaran Midtrans Snap, sinkronisasi kursi real-time via Supabase WebSocket, radar penerbangan FIDS langsung, dan dashboard admin terpadu.",
    description:
      "TravelKita adalah platform pemesanan tiket pesawat modern berbasis Next.js 16 dan React 19 yang menghadirkan alur reservasi interaktif, integrasi pembayaran digital Midtrans, dan pemantauan status penerbangan real-time.",
    longDescription:
      "TravelKita dirancang untuk menyajikan pengalaman pemesanan tiket penerbangan komersial yang cepat, transparan, dan terintegrasi secara menyeluruh. Dibangun dengan Next.js 16 App Router dan React 19, platform ini mengintegrasikan Supabase WebSocket untuk sinkronisasi denah kursi kabin (seat mapping) secara real-time antar-pengguna, gateway pembayaran Midtrans Snap untuk transaksi multichannel yang aman, Flight Information Display System (FIDS) radar langsung, serta panel back-office administrator yang lengkap untuk manajemen maskapai, rute jadwal penerbangan, dan validasi e-ticket otomatis.",
    details:
      "Arsitektur frontend memanfaatkan Next.js 16 Server Components dan React 19 untuk performa loading maksimal, TypeScript untuk type-safety di seluruh modul pemesanan, Tailwind CSS untuk visual responsif, Supabase PostgreSQL & Realtime Channel untuk sinkronisasi state kursi pesawat, serta integrasi webhook Midtrans untuk verifikasi status transaksi instan.",
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
      "Aplikasi cerdas klasifikasi teks abstrak tugas akhir menggunakan algoritma Multinomial Naive Bayes dan ekstraksi fitur TF-IDF untuk memetakan bidang peminatan riset Teknik Informatika secara akurat.",
    description:
      "Sistem otomasi analisis teks berbasis Machine Learning dan Natural Language Processing (NLP) yang mengklasifikasikan abstrak skripsi ke dalam rumpun keilmuan Teknik Informatika secara instan dan objektif.",
    longDescription:
      "Aplikasi ini dikembangkan untuk mengotomatisasi pengelompokan topik penelitian skripsi dan tugas akhir mahasiswa Teknik Informatika ke dalam berbagai bidang minat keilmuan (Kecerdasan Komputasi, Komputasi Bahasa Alami, Sistem Terdistribusi & Jaringan, serta Teknologi Perangkat Lunak). Mengimplementasikan pipeline pemrosesan teks NLP komprehensif mulai dari case folding, tokenizing, stopword removal, dan stemming kata bahasa Indonesia menggunakan Sastrawi, dilanjutkan dengan ekstraksi pembobotan kata TF-IDF, serta klasifikasi menggunakan Multinomial Naive Bayes dengan evaluasi metrik akurasi tinggi yang disajikan lewat antarmuka Streamlit yang intuitif.",
    details:
      "Dibangun dengan Python sebagai bahasa utama, Scikit-Learn untuk pemodelan Multinomial Naive Bayes dan TfidfVectorizer, Sastrawi & NLTK untuk preprocessing teks bahasa Indonesia, Pandas & NumPy untuk manipulasi korpus dataset, serta Streamlit untuk penyajian antarmuka web pengujian abstrak secara interaktif.",
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
      "Aplikasi pengelolaan keuangan pribadi berbasis Progressive Web App (PWA) dengan integrasi pemindai struk otomatis OCR Receipt Scanner, manajemen arus kas & anggaran bulanan, serta autentikasi aman Google OAuth.",
    description:
      "Sakuin adalah asisten finansial digital berbasis web dan mobile PWA yang membantu pengguna mencatat pengeluaran, memindai struk belanja secara otomatis, dan mengontrol alokasi anggaran bulanan secara teratur.",
    longDescription:
      "Sakuin (Pengelola Uang Saku) dirancang sebagai solusi finansial modern yang ringan, intuitif, dan dapat diinstal langsung di perangkat smartphone sebagai Progressive Web App (PWA). Aplikasi ini menyederhanakan pencatatan pengeluaran melalui fitur canggih pemindai struk belanja berbasis Optical Character Recognition (OCR) yang mengekstrak item dan total belanjaan otomatis. Dilengkapi sistem perencanaan anggaran per kategori (budgeting), pelacakan target tabungan (wishlist), grafik analitik arus kas interaktif, serta sistem keamanan login terintegrasi Google OAuth dan basis data cloud MongoDB.",
    details:
      "Frontend dibangun menggunakan React, Vite, dan Tailwind CSS dengan konfigurasi PWA (Service Worker & Web App Manifest), backend didukung oleh Node.js, Express.js, dan database MongoDB Atlas untuk penyimpanan transaksi terstruktur, Tesseract OCR API untuk pemindaian teks struk belanja, serta Google OAuth 2.0 untuk otentikasi akun pengguna yang aman.",
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
