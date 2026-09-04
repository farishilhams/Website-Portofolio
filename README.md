# 🌐 Rishy Portfolio

A modern, interactive, and responsive personal portfolio website built with **Next.js 16 (App Router)**, **Turbopack**, **Tailwind CSS**, and **TypeScript**.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI Integration**: [OpenAI SDK](https://github.com/openai/openai-node) (compatible with Groq / OpenAI / NVIDIA NIM)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### 1. Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (v18.17.0 or higher recommended)
- [npm](https://www.npmjs.com/) (or yarn / pnpm)
- [Git](https://git-scm.com/)

### 2. Clone the Repository
```bash
git clone https://github.com/farishilhams/Website-Portofolio.git
cd Website-Portofolio
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Setup Environment Variables (Optional)
Copy the example environment file:
```bash
cp .env.example .env.local
```

Inside `.env.local`, you can configure an AI provider API key if you want live LLM responses for the AI assistant chatbot:
```env
# AI Assistant Provider (Choose one - optional)
# Groq (Recommended - Fast & Free tier): https://console.groq.com
GROQ_API_KEY=
GROQ_MODEL=llama-3.3-70b-versatile

# OpenAI: https://platform.openai.com
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini

# NVIDIA NIM: https://build.nvidia.com
NVIDIA_APIKEY=
NVIDIA_MODEL=meta/llama-3.1-70b-instruct

# Email Contact Form (Optional)
EMAIL_USER=
EMAIL_PASS=
```
> **Note:** If no API keys are provided, the chatbot will run in local knowledge-base fallback mode without throwing any errors.

### 5. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

### 6. Build for Production
To test the production build locally:
```bash
npm run build
npm run start
```

---

## ☁️ Deployment

### Deploy to Vercel
The easiest way to deploy this Next.js app is with [Vercel](https://vercel.com):

1. Push your repository to GitHub.
2. Log in to [Vercel](https://vercel.com) and click **Add New... > Project**.
3. Import your repository (`Website-Portofolio`).
4. (Optional) Add your Environment Variables (`GROQ_API_KEY`, etc.) in the Project Settings.
5. Click **Deploy**.

---

## 📁 Project Structure

```text
Website-Portofolio/
├── app/
│   ├── api/
│   │   ├── chat/route.ts        # AI Chatbot route handler
│   │   └── send-email/route.ts  # Contact email route handler
│   ├── about.tsx                # About section
│   ├── contact.tsx              # Contact section & AI chatbot modal
│   ├── experience.tsx           # Experience section
│   ├── hero.tsx                 # Hero section
│   ├── layout.tsx               # Root layout & SEO metadata
│   ├── page.tsx                 # Main page entry
│   ├── project.tsx              # Projects showcase section
│   ├── robots.ts                # Robots.txt configuration
│   ├── sitemap.ts               # Sitemap generator
│   └── tech-stack.tsx           # Skills & tech stack section
├── components/                  # Reusable UI components and animations
├── public/                      # Static assets (images, icons, documents)
├── styles/                      # Global styles and Tailwind configuration
├── .env.example                 # Example environment variables
├── .gitignore                   # Git ignore rules
└── package.json                 # Project dependencies & scripts
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
