# Lutfur Rahman Kajal - Official Portfolio & Political Profile

![Preview](public/preview.jpg)

Official website and political profile of **Lutfur Rahman Kajal**, Member of Parliament (Cox's Bazar-3) and Central Fisheries Affairs Secretary of the Bangladesh Nationalist Party (BNP).

## 🚀 Features

- **Modern Tech Stack**: Built with React 18, Vite, TypeScript, and Tailwind CSS.
- **Clean URL Routing**: Uses `BrowserRouter` for hash-free, professional URLs (e.g., `/vision`, `/biography`).
- **SEO Optimized**:
  - Dynamic meta tags and titles using `react-helmet-async`.
  - Structured data (JSON-LD) for Person, WebSite, and Organization schemas.
  - Comprehensive keyword integration in both English and Bengali.
- **Responsive Design**: Fully mobile-responsive layout with a "Desktop-First Precision, Mobile-First Code" approach.
- **Smooth Animations**: Interactive UI elements powered by `framer-motion`.
- **Full-Stack Capabilities**:
  - Express.js backend for API proxying (e.g., Voter Search) to handle CORS.
  - Vite middleware integration for a seamless development experience.
- **Vercel Ready**: Pre-configured `vercel.json` for easy deployment with proper route rewrites.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: Node.js, Express.js (for API proxy and static serving).
- **SEO**: React Helmet Async, JSON-LD.
- **Deployment**: Vercel (recommended).

## 📂 Project Structure

```text
├── components/         # Reusable UI components (Navbar, Footer, SEO, etc.)
├── pages/              # Individual page components (Home, Vision, Biography, etc.)
├── lib/                # Utility functions (cn helper)
├── constants.ts        # Global constants (Navigation links, SEO keywords)
├── App.tsx             # Main application entry and routing
├── server.ts           # Express server with Vite middleware and API proxy
├── index.html          # Main HTML template with initial SEO and JSON-LD
├── vercel.json         # Vercel deployment configuration
└── package.json        # Dependencies and scripts
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd lutfur-rahman-kajal-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server (Express + Vite):
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

### Build

Build the production-ready static files:
```bash
npm run build
```
The output will be in the `dist/` directory.

### Production Start

Start the production server:
```bash
npm start
```

## 🌐 Deployment (Vercel)

This project is optimized for Vercel. The `vercel.json` file handles the necessary rewrites for client-side routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Simply connect your repository to Vercel, and it will automatically detect the Vite build settings.

## 🔍 SEO & Structured Data

The project uses a dedicated `SEO` component (`/components/SEO.tsx`) that manages:
- **Meta Tags**: Title, Description, Keywords, Robots, Author.
- **Social Media**: Open Graph (Facebook/LinkedIn) and Twitter Card tags.
- **Structured Data**: Injects a JSON-LD script for search engine knowledge graphs.

Global SEO settings can be found in `constants.ts` under `COMMON_KEYWORDS`.

## 📄 License

This project is for official use. All rights reserved.

---
*Developed with ❤️ by [Mojib Rsm](https://www.mojib.me)*
