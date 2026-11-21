import { type StaticImageData } from "next/image"
import batikGemsImg from "@/public/images/projects/ecommerce-batik.png"
import mpstorePanelImg from "@/public/images/projects/mpstore-panel.png"
import graphragSearchImg from "@/public/images/projects/graphrag-search.png"
import travelkitaImg from "@/public/images/projects/travelkita-booking.jpg"
import naiveBayesImg from "@/public/images/projects/naive-bayes-thesis.jpg"
import sakuinImg from "@/public/images/projects/sakuin-finance.jpg"

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
    imagePath: travelkitaImg,
    title: "TravelKita Flight Booking",
    category: "Aplikasi Web & Sistem Reservasi",
    shortDescription:
      "Platform reservasi tiket penerbangan modern berbasis Next.js 16 App Router dan React 19 yang dilengkapi payment gateway Midtrans Snap, sinkronisasi pemilihan kursi real-time via Supabase WebSocket, live radar FIDS, serta panel admin back-office yang komprehensif.",
    description:
      "TravelKita adalah platform pemesanan tiket penerbangan komersial modern yang dirancang untuk memberikan pengalaman booking pesawat yang aman, cepat, dan interaktif dengan pelacakan status penerbangan langsung dan pembayaran terpadu.",
    longDescription:
      "TravelKita dibangun sebagai solusi ekosistem reservasi tiket pesawat terbang komersial yang interaktif dan skalabel. Memanfaatkan teknologi mutakhir Next.js 16 App Router bersama React 19 dan TypeScript, sistem ini menyuguhkan pengalaman pencarian rute penerbangan domestik dan internasional yang mulus. Fitur unggulannya mencakup integrasi gateway pembayaran resmi Midtrans Snap untuk transaksi multi-metode (Virtual Account, E-Wallet, QRIS), pemetaan denah kursi pesawat secara visual dengan sinkronisasi status keterisian real-time melalui Supabase WebSocket, radar Flight Information Display System (FIDS) terpadu, serta dasbor administrator lengkap untuk mengelola jadwal rute, maskapai, dan konfirmasi tiket e-ticket otomatis.",
    details:
      "Arsitektur dibangun di atas Next.js 16 App Router dengan React 19 Server Components & Client Components, TypeScript untuk ketahanan tipe data penuh, Tailwind CSS untuk antarmuka responsif dan modern, Midtrans Snap API untuk pemrosesan transaksi pembayaran terenkripsi, serta Supabase PostgreSQL dengan WebSocket channel untuk sinkronisasi pemesanan kursi secara instan.",
    createdAt: "November 2025",
    features: [
      "Sistem Pemesanan Tiket Penerbangan Pulang-Pergi & Sekali Jalan",
      "Integrasi Payment Gateway Midtrans Snap (QRIS, VA, E-Wallet, CC)",
      "Pemilihan Denah Kursi Real-Time Menggunakan Supabase WebSocket",
      "Radar FIDS (Flight Information Display System) & Pelacakan Rute Langsung",
      "Panel Administrator Back-Office untuk Tata Kelola Maskapai & Transaksi",
    ],
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Midtrans API", "Supabase WebSocket"],
    githubUrl: "https://github.com/farishilhams/TravelKita",
    liveDemoUrl: "https://travel-kita.vercel.app/",
    isPrivateRepo: false,
  },
  {
    id: "thesis-naive-bayes-classifier",
    index: 4,
    imagePath: naiveBayesImg,
    title: "Klasifikasi Abstrak Tugas Akhir",
    category: "Machine Learning & Pemrosesan Bahasa Alami",
    shortDescription:
      "Aplikasi Machine Learning cerdas berbasis Streamlit dan Python untuk klasifikasi teks abstrak tugas akhir mahasiswa Teknik Informatika ke dalam 4 bidang minat menggunakan ekstraksi fitur TF-IDF dan algoritma Multinomial Naive Bayes.",
    description:
      "Sistem otomatisasi analisis teks akademis yang mengklasifikasikan rumpun bidang minat skripsi mahasiswa Teknik Informatika secara cepat, objektif, dan terstandarisasi memanfaatkan pemodelan Natural Language Processing (NLP).",
    longDescription:
      "Dikembangkan untuk memecahkan kendala penentuan bidang minat tugas akhir mahasiswa yang kerap memakan waktu verifikasi manual, aplikasi ini mengotomatiskan klasifikasi abstrak skripsi Teknik Informatika ke dalam empat rumpun keilmuan: Kecerdasan Komputasi, Komputasi Bahasa Alami, Sistem Terdistribusi & Jaringan, serta Rekayasa Perangkat Lunak. Menggunakan pipeline Natural Language Processing (NLP) lengkap mulai dari text preprocessing (case folding, tokenizing, stopword removal, stemming Sastrawi), pembobotan kata Term Frequency-Inverse Document Frequency (TF-IDF), hingga pelatihan model Multinomial Naive Bayes yang menghasilkan akurasi prediksi tinggi dengan dasbor pengujian interaktif Streamlit.",
    details:
      "Dibangun menggunakan bahasa Python 3, memanfaatkan Scikit-Learn untuk pipeline TF-IDF Vectorizer dan Multinomial Naive Bayes classifier, NLTK & Sastrawi untuk pemrosesan korpus teks bahasa Indonesia, Pandas untuk manajemen dataset abstrak, serta Streamlit untuk penyajian antarmuka web interaktif yang siap pakai dan mudah diuji secara langsung.",
    createdAt: "Desember 2024",
    features: [
      "Klasifikasi Teks Abstrak Otomatis ke 4 Bidang Minat Teknik Informatika",
      "Ekstraksi Fitur TF-IDF (Term Frequency-Inverse Document Frequency)",
      "Model Prediksi Berkinerja Tinggi Berbasis Multinomial Naive Bayes",
      "Studio Pengujian Abstrak Cepat dengan Contoh Sampel Terintegrasi",
      "Antarmuka Eksploratif & Visualisasi Distribusi Probabilitas Streamlit",
    ],
    tech: ["Python", "Streamlit", "Naive Bayes", "TF-IDF", "NLP", "Scikit-Learn"],
    githubUrl: "https://github.com/farishilhams/Klasifikasi-Tugas-Akhir-Naive-Bayes",
    liveDemoUrl: "https://klasifikasi-tugas-akhir-naive-bayes.streamlit.app/",
    isPrivateRepo: false,
  },
  {
    id: "sakuin-finance-pwa",
    index: 5,
    imagePath: sakuinImg,
    title: "SakuIn - Smart Finance PWA",
    category: "Progressive Web App (PWA) & FinTech",
    shortDescription:
      "Aplikasi pengelolaan keuangan pribadi berbasis Progressive Web App (PWA) dengan integrasi pemindai struk otomatis (OCR Receipt Scanner), visualisasi arus kas bulanan, autentikasi Google OAuth, serta sinkronisasi cloud MongoDB.",
    description:
      "Platform keuangan digital berbasis PWA yang membantu pengguna mencatat pemasukan, mengalokasikan anggaran kategori, dan memindai struk fisik belanjaan secara otomatis untuk monitoring finansial harian yang disiplin.",
    longDescription:
      "SakuIn lahir untuk mentransformasikan pencatatan keuangan manual menjadi lebih cerdas dan praktis lewat platform Progressive Web App (PWA) yang dapat diinstal langsung di Android, iOS, maupun desktop. Dibangun menggunakan React, Node.js, Express, dan MongoDB, aplikasi ini memadukan kemudahan login sekali klik via Google OAuth dengan teknologi OCR (Optical Character Recognition) untuk mengekstraksi nilai total belanja dari foto struk kertas secara instan. Dilengkapi analitik alokasi anggaran bulanan per kategori, pemantauan batas pengeluaran (spending limits), manajemen target impian (wishlist), serta mode tampilan gelap dan terang yang nyaman.",
    details:
      "Menggabungkan React.js dan Tailwind CSS di sisi frontend dengan Service Workers untuk kapabilitas offline PWA, Node.js dan Express.js untuk RESTful API backend, MongoDB Atlas untuk penyimpanan basis data NoSQL dokumen fleksibel, Tesseract.js / Cloud OCR untuk ekstraksi teks struk belanja otomatis, dan Firebase / Google OAuth untuk otentikasi pengguna yang aman.",
    createdAt: "Maret 2025",
    features: [
      "PWA (Progressive Web App) dengan Dukungan Install di Mobile & Desktop",
      "Fitur Pindai Struk Otomatis Berbasis OCR (Optical Character Recognition)",
      "Manajemen Arus Kas Harian, Alokasi Budget Kategori, & Target Wishlist",
      "Sistem Keamanan Akun Terintegrasi Google OAuth & Cloud MongoDB",
      "Dasbor Analitik Finansial Interaktif dengan Dukungan Dark & Light Mode",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "PWA", "OCR API"],
    githubUrl: "https://github.com/farishilhams/SakuIn-PWA",
    liveDemoUrl: "https://sakuinfree.vercel.app/",
    isPrivateRepo: false,
  },
]
