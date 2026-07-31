# Circuit Diagram Generator — Marketing Site

SEO marketing site for [www.circuitdiagramgenerator.ai](https://www.circuitdiagramgenerator.ai).  
Product app lives at [app.circuitdiagramgenerator.ai](https://app.circuitdiagramgenerator.ai).

Built with **Astro** (static) for **Cloudflare Pages**.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Landing |
| `/pricing` | Plans + comparison |
| `/blog` | Blog (coming soon) |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output is in `dist/` — deploy that directory to Cloudflare Pages.

## Cloudflare Pages

**Build settings**

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `22` |

**Custom domain:** point `www.circuitdiagramgenerator.ai` (and apex if desired) to this Pages project.

Or deploy from CLI after `npm install`:

```bash
npx wrangler pages deploy dist --project-name=circuit-diagram-generator
```

## Design

Visual system is ported from the Classical design mockups in `Circuit Diagram Generator Landing Page/`. Image slots use placeholders until product screenshots are provided.
