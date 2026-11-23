import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { z } from "zod"

// Validasi skema ketat menggunakan Zod untuk mencegah payload abuse
const SendEmailSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Nama tidak boleh kosong.")
    .max(100, "Nama maksimal 100 karakter."),
  email: z
    .string()
    .trim()
    .email("Format email tidak valid.")
    .max(150, "Email maksimal 150 karakter."),
  message: z
    .string()
    .trim()
    .min(1, "Pesan tidak boleh kosong.")
    .max(3000, "Pesan maksimal 3000 karakter."),
  timestamp: z.any().optional(),
})

// In-Memory Rate Limiter sederhana per IP (5 request per 10 menit)
const emailRateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkEmailRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now()
  const windowMs = 10 * 60 * 1000 // 10 menit
  const maxRequests = 5

  const record = emailRateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    emailRateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return { allowed: true }
  }

  if (record.count >= maxRequests) {
    const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000)
    return { allowed: false, retryAfterSeconds }
  }

  record.count += 1
  return { allowed: true }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Ekstraksi IP Client untuk perlindungan Rate Limiting
    const forwarded = req.headers.get("x-forwarded-for")
    const clientIp = forwarded ? forwarded.split(",")[0].trim() : req.headers.get("x-real-ip") || "unknown-ip"

    const rateLimit = checkEmailRateLimit(clientIp)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Terlalu banyak permintaan pengiriman pesan. Silakan coba kembali dalam ${rateLimit.retryAfterSeconds} detik.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds || 60),
          },
        }
      )
    }

    // 2. Parse & Validasi Request Body
    const rawBody = await req.json().catch(() => null)
    if (!rawBody) {
      return NextResponse.json(
        { success: false, message: "Format request tidak valid (wajib JSON)." },
        { status: 400 }
      )
    }

    const parseResult = SendEmailSchema.safeParse(rawBody)
    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || "Validasi data gagal."
      return NextResponse.json(
        { success: false, message: firstError },
        { status: 400 }
      )
    }

    const { name, email, message, timestamp } = parseResult.data

    // 3. Verifikasi ketersediaan kredensial pengiriman email
    const emailUser = process.env.EMAIL_USER
    const emailPass = process.env.EMAIL_PASS

    if (!emailUser || !emailPass) {
      console.warn("[Send Email API] Kredensial EMAIL_USER atau EMAIL_PASS belum diatur di environment.")
      return NextResponse.json(
        {
          success: false,
          message: "Layanan pengiriman email sedang dalam pemeliharaan. Silakan hubungi langsung melalui WhatsApp atau LinkedIn.",
        },
        { status: 503 }
      )
    }

    // 4. Inisialisasi Transporter Nodemailer yang Aman
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    })

    const formattedTime = timestamp ? new Date(timestamp).toLocaleString("id-ID") : new Date().toLocaleString("id-ID")

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${emailUser}>`,
      to: emailUser,
      replyTo: email,
      subject: `[Portfolio Inquiry] Pesan dari ${name}`,
      text: `Nama Pengirim: ${name}\nEmail: ${email}\nWaktu: ${formattedTime}\n\nPesan:\n${message}`,
    })

    return NextResponse.json(
      { success: true, message: "Pesan Anda berhasil terkirim. Terima kasih!" },
      { status: 200 }
    )
  } catch (error: unknown) {
    // Sanitasi error: Jangan pernah melempar stack trace atau error mentah ke client
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error("[Send Email API Error]:", errorMessage)
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi gangguan teknis saat mengirimkan email. Silakan coba sesaat lagi.",
      },
      { status: 500 }
    )
  }
}
