# Elixir — Modern Portfolio + Blog Site

Elixir is a sleek, responsive, and performant personal portfolio and blog built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Motion**, featuring a rich developer experience and fast-loading static content powered by **Sanity CMS**.

🔗 **Live Preview**: [https://elixir-umber.vercel.app](https://elixir-umber.vercel.app)

---

##  Features

-  Lightning-fast portfolio site built with Next.js App Router
-  Smooth animations and transitions using Framer Motion
-  Blog integration powered by Sanity.io headless CMS
-  Dark/light theme toggle
-  Fully responsive design for all devices
-  Reusable and modular components

---

## Tech Stack

| Tech          | Purpose                               |
|---------------|----------------------------------------|
| Next.js 15    | React framework with App Router        |
| TypeScript    | Type-safe development                  |
| Tailwind CSS  | Utility-first CSS                      |
| Motion        | Animations and transitions             |
| Sanity.io     | Headless CMS for blog content          |
| Vercel        | Deployment and hosting                 |

---

## Project Structure

```txt
elixir/
├── app/                   # App directory (App Router)
│   ├── layout.tsx         # Global layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
├── lib/                   # Utility functions (Sanity config, queries)
├── sanity/                # Sanity CMS schemas & config
├── public/                # Static assets
├── styles/                # Global styles
└── .env.local             # Environment variables
```

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/EpicAryan/elixir.git
cd elixir
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-07-08
```
You can get these values from your Sanity.io dashboard.

## Sanity CMS Setup
To manage blog content, this project uses Sanity.io:

#### Setup Instructions

### 1. Install the Sanity CLI:

```bash
npm install -g sanity
```

### 2. Navigate to the sanity/ directory and initialize the CMS:

```bash
cd sanity
sanity init
sanity dev
```

### 3. Use the Sanity Studio to create and manage blog posts.

## Running the Project

### 1. Development

```bash
npm run dev
# or
yarn dev
```

Visit: http://localhost:3000

### 2.Production Build

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Blog Management
- Blog content is managed via Sanity Studio.
- Posts are fetched using GROQ queries.
- Markdown and portable text supported.
- Auto preview available during development.

## Customization
- Update metadata in app/layout.tsx
- Add your own sections to the homepage in app/page.tsx


Built with ❤️ by **Aryan Kumar**
