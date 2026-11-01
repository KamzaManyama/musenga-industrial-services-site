// Friendly redirects for addresses people commonly mistype or trim, so they reach a real page
// instead of the 404 page. Anything else that doesn't exist still gets the custom 404 page.
import { defineMiddleware } from 'astro:middleware';

// Parent paths that have no page of their own -> where to send visitors.
const REDIRECTS: Record<string, string> = {
  '/services': '/#services',
  '/home': '/',
  '/index.html': '/',
  '/contact': '/#contact',
  '/certification': '/certifications/',
  '/jobs': '/careers/',
  '/vacancies': '/careers/',
  '/career': '/careers/',
};

export const onRequest = defineMiddleware((context, next) => {
  const { pathname, search } = context.url;
  const isFile = /\.[a-z0-9]+$/i.test(pathname) && pathname !== '/index.html';

  // Known shortcuts (with or without a trailing slash, any letter case).
  const key = pathname.toLowerCase().replace(/\/+$/, '') || '/';
  if (REDIRECTS[key]) return context.redirect(REDIRECTS[key] + (REDIRECTS[key].includes('#') ? '' : search), 301);

  // Page addresses are lowercase; send /About/ or /ABOUT to /about/. (Files such as images keep their case.)
  if (!isFile && pathname !== pathname.toLowerCase()) {
    return context.redirect(pathname.toLowerCase() + search, 301);
  }

  return next();
});
