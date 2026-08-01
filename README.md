# Circuit Diagram Generator — Marketing Site

SEO marketing site for [www.circuitdiagramgenerator.ai](https://www.circuitdiagramgenerator.ai).  
Product app: [app.circuitdiagramgenerator.ai](https://app.circuitdiagramgenerator.ai).

**Astro** + **Keystatic CMS** on **Cloudflare Workers** (static pages + SSR `/keystatic`).

> Modern `@astrojs/cloudflare` deploys as a **Worker with assets**, not classic Pages. Same Cloudflare account; custom domain attaches to the Worker.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing |
| `/pricing` | Pricing |
| `/blog` | Blog index |
| `/blog/[slug]` | Article |
| `/privacy` / `/terms` | Legal |
| `/keystatic` | CMS admin |

## Local development

```bash
npm install
npm run dev
```

- Site: http://127.0.0.1:4321/
- CMS: http://127.0.0.1:4321/keystatic (local files, no login)

## CMS on Cloudflare

Production CMS: **https://www.circuitdiagramgenerator.ai/keystatic**

Editors sign in with GitHub. Saves commit to this repo; a rebuild publishes the blog.

### 1. Bind SESSION KV

`wrangler.toml` already points at KV id `f7964c2d3d9a45738a80c30cf93d9043` (`SESSION`).

Confirm in **Workers → circuit-diagram-generator → Settings → Bindings** that `SESSION` is attached.

### 2. Set secrets / vars

In Worker settings (or `wrangler secret put`):

| Name | Notes |
| --- | --- |
| `GITHUB_REPO_OWNER` | `guruscoachteam` |
| `GITHUB_REPO_NAME` | `circuit-diagram-generator-marketing` |
| `KEYSTATIC_GITHUB_CLIENT_ID` | From Keystatic GitHub App |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | From Keystatic GitHub App |
| `KEYSTATIC_SECRET` | Long random string |
| `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | GitHub App slug |

Template: `.env.example`

### 3. First login / GitHub App

1. Deploy the Worker (`npm run deploy`).
2. Open `/keystatic` on the live domain.
3. Complete Keystatic’s **Create GitHub App** flow (repo write access required).
4. Copy generated env values into Cloudflare; redeploy.
5. GitHub App callback URL:
   `https://www.circuitdiagramgenerator.ai/api/keystatic/github/oauth/callback`

### 4. Custom domain

Point `www.circuitdiagramgenerator.ai` (and apex if needed) at this **Worker**, not the old Pages project, once you cut over.

## Build & deploy

```bash
npm run build
npm run deploy
```

Or connect the GitHub repo to **Workers Builds** with:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root | `/` |
| Node | `22` |

## Content model

Posts: `src/content/posts/*.mdoc`  
Use the **Draft** checkbox to keep posts off the public blog until ready.
