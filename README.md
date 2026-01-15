# Cybersecurity Portfolio Website

A production-ready Next.js 15 portfolio website with cyberpunk theme, custom gun cursor, and Supabase backend. Featuring a React Server Components architecture.

![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## ⚡ Features

- **Cyberpunk Design Theme** - Neon colors, matrix rain animation, glowing effects
- **Custom Gun Cursor** - Animated crosshair cursor with click effects
- **Supabase Backend** - PostgreSQL database with Row Level Security
- **Admin Dashboard** - Protected content management for posts, writeups, projects
- **Optimized for EC2 t3.micro** - <500MB memory, standalone Docker build
- **SEO Ready** - Metadata, Open Graph, sitemap support

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm 10+
- Supabase project

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Add your Supabase credentials to .env.local
# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the schema in SQL Editor: `supabase/schema.sql`
3. Run seed data (optional): `supabase/seed.sql`
4. Copy your project URL and keys to `.env.local`

## 🐳 Docker Deployment

```bash
# Build the image
docker build -t portfolio .

# Run with Docker Compose
docker-compose up -d
```

## ☁️ EC2 Deployment

```bash
# SSH into your EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Run the deploy script
curl -sL https://raw.githubusercontent.com/yourusername/portfolio-website/main/scripts/deploy-ec2.sh | sudo bash
```

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Home page
│   ├── projects/         # Projects listing
│   ├── writeups/         # CTF writeups
│   ├── blog/             # Blog posts
│   ├── admin/            # Protected admin dashboard
│   └── api/              # API routes
├── components/
│   ├── GunCursor.tsx     # Custom cursor
│   ├── MatrixRain.tsx    # Background animation
│   ├── Hero.tsx          # Hero section
│   └── ui/               # shadcn/ui components
└── lib/
    ├── supabase.ts       # Database client
    ├── auth.ts           # Authentication
    └── types.ts          # TypeScript types
```

## 🎨 Customization

### Colors
Edit `src/app/globals.css`:
```css
:root {
  --neon-green: #00ff88;
  --neon-magenta: #ff0080;
  --cyber-blue: #00d4ff;
}
```

### Social Links
Edit `src/components/ConnectModal.tsx` to add your social media URLs.

### Content
Use the admin dashboard at `/admin/login` or add directly to Supabase.

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) |

## 🔒 Security Note

This portfolio uses Next.js 15.5.6. For production use, always keep dependencies updated and follow security best practices.

## 📄 License

MIT License - feel free to use this template for your own portfolio!

---

Built with ❤️ by Rishabh Raj Singh
