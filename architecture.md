# CellcoLabs Next-Gen Architecture Guide

## Objectives
- Assemble the entire public experience (marketing + main flows) in HubSpot using a shared component library.
- Serve cellcolabs.com and cellcolabsclinical.com from a single design system with domain-based themes.
- Deliver fast global performance via Google Cloud Storage + Cloud CDN, with minimal backend footprint.
- Maintain theme tokens and component manifests centrally so React previews and HubSpot pages stay in sync while letting HubSpot own day-to-day content updates.

## High-Level System
- **Component Factory**: React (Next.js/Vite) used for component development, QA, and authenticated preview (not for public runtime rendering).
- **HubSpot CMS**: Hosts all production pages (marketing surfaces, main flows, blog) via custom modules that hydrate with CDN-hosted fragments and HubSpot-managed content.
- **Component Publishing**: Every React block exports both a runtime preview component and a static HTML/CSS snapshot stored on Cloud Storage/CDN for HubSpot to consume.
- **Hosting**: Google Cloud Storage bucket(s) fronted by Cloud CDN using HTTPS load balancer per domain for fragments, assets, and preview app builds.
- **Assets**: Brand-specific media and generated component fragments stored in Cloud Storage with CDN caching.
- **(Optional) Serverless Functions**: Only if future workflows need protected APIs or dynamic content.

## Frontend & Component Architecture
- Monorepo (e.g., Turborepo) with `apps/preview` for the React QA site and `packages/design-system` for shared primitives.
- Theme tokens stored in JSON (colors, typography, spacing) and mapped to CSS variables; build emits one bundle per domain.
- Components defined via JSON schema so the same contract powers React preview usage and HubSpot modules.
- Domain-aware logic selects the correct theme bundle (host-based check in preview app; HubSpot theme setting for production).
- React fragments ship layout, styling, and placeholders; HubSpot fills dynamic fields (text, menus, imagery) at render time.

## Component Publishing Pipeline
1. Design system exports tokens and shared assets during the build.
2. Each React block renders to static HTML/CSS (and optional JS) using representative JSON data; artifacts written to `dist/components/<component>/<version>`.
3. A manifest (`components-manifest.json`) maps component IDs to fragment URLs, required assets, and schema metadata, including placeholder IDs for HubSpot field injection.
4. CI uploads the manifest, fragments, and theme bundles to Cloud Storage/CDN and purges relevant cache keys.
5. HubSpot modules fetch the manifest to locate the latest fragment and merge marketing-provided content before rendering.

## HubSpot Integration & Custom Theme
- Maintain a lightweight custom HubSpot theme that loads the shared base CSS plus the brand-specific bundle for the current domain.
- Use HubSpot CLI to version-control theme files and custom modules alongside this repo (deploy via CI when fragments change).
- Custom modules expose fields mapped to the component schema (text, imagery, toggles) and hydrate placeholders inside the fragment.
- Forms, CRM submissions, and marketing analytics continue to run natively inside HubSpot to reduce backend complexity.

## Shared Navigation, Footer & Structured Content
- Header/footer layout and styling ship as fragments from the React build; menu, utility links, and legal copy are sourced from HubSpot Menu Builder, HubDB, or module fields.
- Document placeholder IDs for nav/footer fragments so HubSpot modules can inject menu structures server-side with HubL.
- Keep any shared system copy (e.g., legal disclaimers used across channels) in repo-managed JSON; allow marketers to override brand-specific items inside HubSpot.
- Provide a staging fixture so the React preview app mimics HubSpot menu data for QA.

## Theme & Domain Strategy
- Keep brand token files in the repo (e.g., `config/themes/cellcolabs.json`, `config/themes/cellcolabsclinical.json`).
- Build step emits `theme-cellcolabs.css` and `theme-cellcolabsclinical.css`; both published to the CDN.
- React preview selects the bundle based on the request host or environment toggle; HubSpot theme loads the appropriate bundle via domain check or theme setting.
- Future-friendly: tokens can later move into HubSpot (HubDB/theme settings) with a sync script that writes out JSON before builds.

## Asset & Fragment Strategy
- Organize Cloud Storage buckets or prefixes by domain and artifact type (e.g., `gs://cellcolabs-web-assets/components/...`).
- Version fragments by hash or semantic version to leverage immutable caching while allowing rollbacks.
- Serve all assets and fragments via CDN URLs referenced by React manifests and HubSpot modules.

## Authenticated Preview & QA App
- Deploy the React preview app behind basic auth or SSO (e.g., `preview.cellcolabs.com`) to review components before publishing.
- Surface a component gallery/Storybook within the preview app so design, engineering, and marketing stakeholders can validate behavior outside HubSpot.
- Optional visual regression tests run against the preview app to catch layout breaks before fragments are regenerated.
- Preview app consumes the same theme tokens, structured JSON, and sample data used for fragment generation to guarantee parity.

## Environments
- **Development**: Local React dev server; JSON configs stored in repo; optional mock manifest/fragments for HubSpot module testing.
- **Preview/Staging**: Separate GCS bucket + staging domain (e.g., `preview.cellcolabs.com` behind auth). CI publishes draft fragments and redeploys the preview app for QA.
- **Production**: Dedicated buckets/domains with Cloud CDN and managed HTTPS certificates; HubSpot serves all public traffic using CDN-hosted fragments.
- Use Google Cloud Build or GitHub Actions pipelines to build React preview, generate fragments, run tests/linting, and sync artifacts.

## Deployment Flow
1. Developer merges to main/feature branch.
2. CI runs lint/tests, builds the React preview app, and executes the component snapshot generator.
3. Generated `dist/` preview assets, theme bundles, shared JSON, and component fragments upload to environment-specific GCS buckets.
4. HubSpot modules/theme deployed via HubSpot CLI if source changes; CDN caches invalidated (`gcloud compute url-maps invalidate-cdn-cache`).
5. HubSpot pages automatically render new layout/styling because modules pull the latest fragments while preserving editor-entered content; preview app updates simultaneously for QA.

## HubSpot Page Authoring
- Page editors stack custom modules that reference CDN fragments; content fields stay editable inside HubSpot.
- Header/footer modules pull structure from fragments and inject menu data from HubSpot Menu Builder or HubDB tables so marketers manage navigation without code changes.
- Provide preview URLs or Storybook-like gallery so marketing can see the React version of each component before using it in HubSpot.

## Content & Governance
- Version control theme tokens, fragment manifests, and any shared JSON copy in this repo.
- Document a release checklist: update tokens/JSON, regenerate fragments locally, run CI pipeline, verify staging (React preview + HubSpot), invalidate CDN, spot-check production.
- Maintain `/docs/design-system.md` with brand guidelines, component usage, and placeholder IDs to onboard new contributors quickly.

## Optional Future Enhancements
- Introduce serverless Cloud Run endpoints for authenticated experiences (e.g., partner portals) when needed.
- Add automation to sync HubSpot theme settings or HubDB tables back into the repo for audit/versioning.
- Expand the fragment generator to emit web components when interactive modules are required inside HubSpot.
- Move theme tokens into HubSpot-managed data sources with a build-time sync once governance/validation is in place.

## Quick Start Checklist
- [ ] Bootstrap the React preview app with Next.js or Vite + routing.
- [ ] Stand up design tokens and block catalog in `packages/design-system`.
- [ ] Implement fragment generator + manifest writer for React components, including placeholder metadata.
- [ ] Configure GCP project (Storage buckets, Cloud CDN, HTTPS load balancer, DNS).
- [ ] Set up CI/CD pipeline for preview build + fragment publish + cache invalidation + HubSpot CLI deploy.
- [ ] Scaffold HubSpot custom theme and modules wired to the manifest schema and HubSpot data sources (menus, HubDB).
- [ ] Align analytics/tracking IDs and consent tooling across HubSpot and the preview environment.

## Design System & Figma Workflow
- Treat Figma as the single source of truth for shared layouts, theme tokens, and the component catalog across both domains.
- Maintain separate brand pages for exploration, but publish reusable primitives from a shared Figma library so repo tokens stay aligned.
- Capture component variants, responsive states, and content fields inside Figma annotations; mirror naming in React components and module schemas.
- Use Claude (or other tooling) to assist with design-to-code translation, followed by manual review to enforce accessibility, token usage, and data contracts.

### Collaboration Practices
- Keep a changelog of component releases (date, branch, fragment version) in `docs/` so design, engineering, and marketing track what shipped.
- Run a QA pass with design for every major component update; validate both the React preview and the rendered HubSpot fragment.
- When tokens change in Figma, update JSON theme files, regenerate fragments locally, and ensure HubSpot theme loads the refreshed bundle before committing.
- Document expected JSON contracts and HubSpot field mappings in Figma for HubSpot-targeted modules so marketers understand which fields stay synchronized from this repo.
