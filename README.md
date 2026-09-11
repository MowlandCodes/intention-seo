# Intention — AI SEO Content Planner & SERP Intelligence

> **Intent-driven content strategy engine powered by Real-Time Google SERP RAG and Gemini 3.6 Flash.**

---

## 📌 Executive Overview

**Intention** adalah aplikasi web full-stack yang dirancang untuk membedah _search intent_ dari sebuah keyword dan menghasilkan strategi konten SEO yang siap dieksekusi secara terstruktur.

Berbeda dengan generator teks AI konvensional yang mengandalkan data statis (_hallucination-prone_), Intention menerapkan pendekatan **Retrieval-Augmented Generation (RAG)**. Aplikasi ini melakukan _fetch_ data Google Search Results Page (SERP) secara _real-time_ sebelum diproses oleh LLM untuk mengidentifikasi **Content Gap Analysis** versus kompetitor yang sedang menduduki rangking teratas.

---

## 🚀 Key Features

- 🎯 **Search Intent & Audience Classification**: Menganalisis dan mengategorikan intent (Informational, Commercial, Transactional, Navigational) beserta demografi audiens target.
- 🔍 **Real-Time SERP RAG Integration**: Mengambil data hasil pencarian Google teratas, _People Also Ask_ (PAA), dan _Related Searches_ sebagai _ground truth_.
- 💡 **SERP Content Gap Opportunities**: Mengidentifikasi sudut pandang, subtopik, atau pertanyaan audiens yang terlewatkan oleh artikel kompetitor saat ini.
- 🏷️ **Automated Meta Tags Generator**: Menghasilkan Meta Title (<60 karakter) & Meta Description (<160 karakter) teroptimasi dengan fitur _one-click copy_.
- 📑 **Hierarchical Outline Builder**: Menstrukturkan _outline_ artikel lengkap dengan tingkatan _heading_ (H2/H3) dan _bullet points_ diskusi.
- ⚡ **High-Performance Micro-Interactions**: UI responsif berbasis _Glassmorphism_ yang dipercantik dengan animasi _staggered timeline_ GSAP dan ambient _Aurora background_.

---

## 🏗️ System Architecture & Data Flow

```
[ User Input / Keyword ]
│
▼
[ Next.js Serverless Route Handler (/api/generate) ]
│
├──► 1. Fetch Live SERP Data (Serper.dev API)
│ └── Extract: Top 8 Organic Pages, PAA, & Related Queries
│
├──► 2. Context Enrichment & Prompt Construction
│ └── Inject SERP Ground Truth into System Prompt
│
├──► 3. Structured LLM Generation (Gemini 3.6 Flash)
│ └── Enforce Response Schema via `@google/genai`
│
▼
[ Validated Structured JSON Output ]
│
▼
[ React Component UI / Dashboard Rendering ]
```

---

## 🛠️ Technical Stack

- **Framework**: Next.js 16 (App Router, Serverless Handlers)
- **Language**: TypeScript (Strict Type Safety)
- **AI Engine**: `@google/genai` (Model: `gemini-3.6-flash` dengan `ThinkingLevel.MEDIUM`)
- **SERP Data API**: Serper.dev (Google SERP Engine)
- **Styling & UI**: Tailwind CSS v4, Lucide React, React Icons
- **Animation Engine**: GSAP (`@gsap/react` for lifecycle-safe hooks)
- **Runtime & Package Manager**: Bun

---

## 💻 Technical Decisions & Engineering Highlights

1. **Structured Outputs over Free-Form Text**: Menggunakan fitur `responseSchema` bawaan SDK `@google/genai` untuk mengunci struktur JSON output secara deterministik. Hal ini mencegah _UI rendering crash_ akibat variasi output LLM.
2. **Backend-For-Frontend (BFF) Security Pattern**: Seluruh _panggilan API key_ (Gemini & Serper) diisolasi di tingkat Serverless Route Handler (`/api/generate/route.ts`). Tidak ada ekspos _API Keys_ maupun _tokens_ di _client-side JS bundle_.
3. **Graceful Degradation & Timeout Handling**: Fungsi utilitas SERP dilengkapi dengan `AbortSignal.timeout(10000)`. Jika API SERP mengalami masalah/timeout, sistem secara otomatis memberi sinyal peringatan tanpa menghentikan _core generation pipeline_.
4. **Zero-FOUC Micro-Animations**: Pemanfaatan `useGSAP` hook dengan _scoped contexts_ dan selector `opacity-0` memastikan animasi _hero section_ berjalan mulus di 60 FPS tanpa _Flash of Unstyled Content_ (FOUC).

---

## 📁 Repository Structure

```
intention-seo/
├── public/ # Static assets & SVGs
├── src/
│ ├── app/
│ │ ├── api/
│ │ │ └── generate/
│ │ │ └── route.ts # API Route Handler (SERP Fetch + Gemini RAG)
│ │ ├── layout.tsx # Global Root Layout + Fixed Aurora
│ │ └── page.tsx # Main Dashboard View
│ ├── assets/
│ │ └── styles/
│ │ └── globals.css # Global Tailwind v4 styles & Aurora keyframes
│ ├── components/
│ │ ├── Aurora.tsx # Global Fixed Background Component
│ │ ├── ContentPlanResult.tsx # Dynamic SEO Plan Cards Renderer
│ │ ├── EngineCapabilities.tsx# Interactive Capability Grid
│ │ ├── Footer.tsx # Global Footer
│ │ ├── Hero.tsx # Animated Search Section (GSAP)
│ │ └── Navbar.tsx # Sticky Navigation Header
│ ├── schemas/
│ │ └── ai.ts # Strict Google GenAI JSON Schema Definitions
│ └── utils/
│ └── ai.ts # Serper.dev API Integration & Error Handlers
├── .gitignore
├── package.json
└── tsconfig.json
```

---

## ⚡ Getting Started

### Prerequisites

- Node.js v18+ atau Bun
- API Key Gemini (Google AI Studio)
- API Key Serper.dev

### Installation Steps

1. **Clone Repository**

   ```bash
   git clone https://github.com/MowlandCodes/intention-seo.git
   cd intention-seo
   ```

2. **Install Dependencies**

   ```bash
   bun install

   # atau

   npm install
   ```

3. **Configure Environment Variables**
   Buat file `.env.local` di akar project dan masukkan API Key kamu:

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   SERPER_API_KEY=your_serper_api_key_here
   ```

4. **Run Development Server**
   ```bash
   bun dev
   # atau
   npm run dev
   ```
   Buka http://localhost:3000 di browser kamu.

---

Developed by **M. Faridh Maulana** (Mowland Codes).
