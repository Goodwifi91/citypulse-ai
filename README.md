# CityPulse AI 🏙️⚡

**Turn any topic into local-SEO gold.** CityPulse AI transforms articles and topics into hyper-local, SEO-optimized content kits — blog posts, Google Business Profile updates, and social media captions — all geo-targeted to your city.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)

---

## Features

- 📝 **SEO Blog Posts** — City-specific long-tail keywords, landmarks, and local context
- 🏢 **Google Business Profile Updates** — Emoji-rich, hashtag-optimized GBP posts
- 📱 **Social Media Captions** — 3 platform-ready captions with local hashtags
- 🤖 **Modular AI Backend** — Swap OpenAI, Anthropic, or any LLM provider via env vars
- 🎨 **Modern UI** — Dark glassmorphism design with Tailwind CSS & Lucide icons
- 🏙️ **City Targeting** — Default cities: Charlotte, NC & Lake Wylie, SC

---

## Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd citypulse-ai
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your OpenAI API key:

```env
OPENAI_API_KEY=sk-your-real-key-here
OPENAI_MODEL=gpt-4o-mini
OPENAI_BASE_URL=https://api.openai.com/v1
```

> **Note:** The app works with **mock data** when using the placeholder key, so you can test the full UI without an API key.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Swapping AI Providers

The AI logic lives in `src/lib/ai-service.ts`. To use a different provider:

1. Update `OPENAI_BASE_URL` to your provider's endpoint
2. Update `OPENAI_API_KEY` with the correct key
3. Adjust the `callLLM()` function if the request/response format differs

**Examples:**
- **Anthropic**: Change the `callLLM` function to use the Messages API
- **Local LLM (Ollama)**: Set `OPENAI_BASE_URL=http://localhost:11434/v1`
- **Azure OpenAI**: Use the Azure-specific endpoint and headers

---

## Project Structure

```
citypulse-ai/
├── src/
│   ├── app/
│   │   ├── api/optimize/route.ts   # POST endpoint — calls AI & returns results
│   │   ├── globals.css              # Tailwind + custom utilities
│   │   ├── layout.tsx               # Root layout with metadata
│   │   └── page.tsx                 # Landing page (SSR shell)
│   ├── components/
│   │   ├── Header.tsx               # Sticky nav bar
│   │   ├── Hero.tsx                 # Hero section with CTA
│   │   ├── Features.tsx             # Feature cards grid
│   │   ├── Optimizer.tsx            # Main "Try It" interactive section
│   │   └── Footer.tsx               # Footer
│   └── lib/
│       ├── ai-service.ts            # LLM adapter (OpenAI-compatible)
│       └── cities.ts                # City list config
├── .env.example
├── .env.local
├── README.md
├── package.json
└── tsconfig.json
```

---

## Deploy to Vercel

### Option A: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/citypulse-ai)

### Option B: CLI Deploy

1. **Install the Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Log in:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Set environment variables** in the Vercel dashboard:
   - Go to **Project → Settings → Environment Variables**
   - Add `OPENAI_API_KEY`, `OPENAI_MODEL`, and `OPENAI_BASE_URL`

5. **Redeploy** to pick up the new env vars:
   ```bash
   vercel --prod
   ```

### Option C: Git Integration

1. Push your code to GitHub/GitLab/Bitbucket
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add your environment variables during setup
4. Vercel auto-deploys on every push to `main`

---

## Adding More Cities

Edit `src/lib/cities.ts`:

```typescript
export const DEFAULT_CITIES: City[] = [
  { label: "Charlotte, NC", value: "Charlotte, NC" },
  { label: "Lake Wylie, SC", value: "Lake Wylie, SC" },
  { label: "Rock Hill, SC", value: "Rock Hill, SC" },     // add new
  { label: "Fort Mill, SC", value: "Fort Mill, SC" },     // add new
];
```

---

## Tech Stack

| Layer     | Technology                    |
|-----------|-------------------------------|
| Framework | Next.js 15 (App Router)       |
| Styling   | Tailwind CSS 4                |
| Icons     | Lucide React                  |
| Language  | TypeScript 5                  |
| AI        | OpenAI-compatible API         |
| Deploy    | Vercel (recommended)          |

---

## License

MIT — build whatever you want with it.
