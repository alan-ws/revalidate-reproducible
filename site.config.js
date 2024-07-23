module.exports = {
  // Array of locales offered by the site. This must be kept in sync with Drupal locales.
  // Intentionally including "default" as a workaround for i18n's prefixing.
  // See https://nextjs.org/docs/pages/building-your-application/routing/internationalization#prefixing-the-default-locale
  locales: {
    default: 'Default',
    en: 'English',
    de: 'German',
  },
  // The locale prefix to redirect to for requests for '/'.
  defaultLocalePrefix: 'en',
}
