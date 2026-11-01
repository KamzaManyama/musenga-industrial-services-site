# Musenga Industrial Services Site

A modern Astro-based marketing website for Musenga Industrial Services, showcasing capabilities, sectors, certifications, project work, and company information.

## Overview

This project is built with:

- Astro
- Tailwind CSS
- TypeScript
- Nodemailer for enquiry form email delivery

The site includes:

- home page with services and sectors highlights
- about page and company story
- certifications and partnership messaging
- careers section with dynamic detail pages
- enquiry and project-work contact forms
- privacy policy and brand information pages

## Problem statement

The existing Musenga website, available at https://www.musenga.co.za/, is dated and no longer reflects the current brand, capability, or professional positioning of the business. The current site does not sufficiently communicate Musenga’s service offering, operational strengths, industry credibility, or the quality of its work. As a result, it underrepresents the company’s value proposition and does not provide an experience that is aligned with modern business expectations for industrial service providers, clients, and partners.

The site also lacks a clear digital structure for presenting key information such as the company’s sectors, capabilities, certifications, project exposure, and engagement pathways. This limits the ability to convert website traffic into enquiries, partnerships, and business opportunities. The outdated presentation creates a gap between the company’s real market presence and the impression conveyed online.

## Project proposal summary

This project proposes the redesign and rebuild of the Musenga website into a modern, credible, and conversion-focused digital platform. The new website is intended to better represent the company’s identity, improve user experience, and create a stronger foundation for lead generation and client engagement.

The updated website provides a clearer narrative around Musenga’s heritage, expertise, service offering, and value to industrial and commercial clients. It is designed to communicate trust, capability, professionalism, and operational depth while improving navigation, accessibility, and responsiveness across devices.

The refreshed website includes improved content structure, modern visual design, stronger calls to action, and clearer pathways for users to request information, discuss projects, or initiate enquiries. The final outcome is a website that is more aligned with Musenga’s business objectives and better suited to attract and convert new business opportunities.

## Client-facing website update brief

Musenga’s current website no longer reflects the standards and professionalism expected of a leading industrial services business. The previous digital presence did not effectively communicate the company’s strengths, industry experience, or service scope, and it limited the business’s ability to present a polished and credible image to customers, partners, and stakeholders.

To address this, we developed a modern website update focused on restoring confidence in the Musenga brand and improving the way information is presented online. The new website has been redesigned to be more professional, visually refined, and user-friendly, while making it easier for visitors to understand Musenga’s offerings, sectors served, certifications, and project work.

The improved site includes:

- a more modern and polished visual identity
- clearer messaging around Musenga’s value proposition
- stronger presentation of key services and capabilities
- improved layout and information hierarchy
- a better mobile and desktop experience
- clearer enquiry and project-work pathways
- a more credible and conversion-oriented experience for new business development

This update ensures that the website better supports Musenga’s commercial objectives by positioning the business as a modern, capable, and trusted industrial service provider in the market.

## Installation

```bash
npm install
```

## Environment setup

Copy the example environment file and fill in the values for your email setup:

```bash
copy .env.example .env
```

Then update `.env` with your SMTP credentials and contact details:

```dotenv
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your.address@gmail.com
SMTP_PASS=your-16-character-app-password
ENQUIRY_TO=your.address@gmail.com
ENQUIRY_FROM_NAME=Musenga Website
SEND_AUTO_REPLY=true
```

Notes:

- Use a Gmail App Password, not your normal Gmail password.
- Keep `.env` out of version control.
- `ENQUIRY_TO` is where website enquiries are sent.

## Local development

Start the dev server:

```bash
npm run dev
```

Then open the local URL shown in the terminal, typically:

```text
http://localhost:4321/
```

## Production build

```bash
npm run build
```

To preview the built site locally:

```bash
npm run preview
```

## Available scripts

```bash
npm run dev          # start Astro dev server
npm run build       # create production build
npm run preview     # preview the production build locally
npm run check:links # validate internal links after build
```

## Email form behaviour

The contact forms call server-side API routes under `src/pages/api/` and send emails using SMTP.

The project currently supports:

- enquiry submission
- project/work inquiry submission
- optional visitor auto-reply email

If SMTP is not configured, the API returns a temporary unavailable message rather than crashing.

## Deployment

This project is configured for Astro's Node adapter with standalone output:

```js
adapter: node({ mode: 'standalone' })
```

That means it can be deployed to a Node-compatible hosting provider with the environment variables configured in the deployment environment.

## Notes

- Business details and legal metadata are stored in `src/data/company.ts`.
- Content such as sectors, services, certifications, and jobs can be updated in the `src/data` folder.
- The `scripts/check-links.mjs` script is useful for validating internal links as part of build checks.

## License

This project is for Musenga Industrial Services and is intended for internal business use and website hosting.

## Contact

For questions about the site or deployment, contact the project maintainer or the business contact shown in the site content.
