# Prismatica Labs Website

Next.js 16 application for Prismatica Labs strategic consulting firm, featuring AI-generated dynamic content and integrated AI chat assistant (Athena).

## Quick Start

```bash
npm run dev          # Development server at http://localhost:3000
npm run build        # Production build
npm run start        # Production server
npm run lint         # Run linter
npm run generate-content  # Manually generate dynamic content
```

## Project Documentation

For comprehensive documentation about this project's architecture, dynamic content system, Athena chat integration, and development guidelines, see:

**[CLAUDE.md](./CLAUDE.md)** - Complete project overview and technical documentation

## Key Features

- **Dynamic Content System**: AI-generated content that updates every 6 hours based on current news
- **Athena Chat**: AI strategic advisor integrated across all pages with awareness of site content
- **BentoBox Architecture**: Content-driven component system for services and products
- **Mobile-First Design**: Optimized mobile experience with custom bottom sheet UI

## Tech Stack

- Next.js 16.0.1 (App Router)
- React 19.2.0
- TypeScript 5
- Tailwind CSS v4
- Anthropic Claude API (Opus 4 for content generation, Sonnet 4.5 for chat)

## Environment Setup

Create `.env.local` with:

```bash
ANTHROPIC_API_KEY_CONTENT=  # For content generation
ANTHROPIC_API_KEY_CHAT=     # For Athena chat
RESEND_API_KEY=             # Email notifications
```

## Project Structure

```
prismatica-app/
├── app/                    # Next.js app router pages
├── components/             # React components
│   └── BentoBox/          # Content-driven card system
├── athena/                # Athena AI configuration
│   ├── prompts/           # System prompts
│   └── knowledge/         # Page-specific knowledge
├── scripts/               # Content generation scripts
├── data/                  # Generated content cache
└── CLAUDE.md             # Full project documentation
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [Project Architecture](./CLAUDE.md)
- [Athena Documentation](./athena/README.md)

## Deployment

Deployed on Vercel with automated content generation via GitHub Actions every 6 hours.
