const siteConfig = require('./site.config')
const env = process.env.NODE_ENV

module.exports = {
  localeDetection: false,
  defaultLocale: 'default',
  locales: Object.keys(siteConfig.locales),
  defaultNS: 'common',
  // Only log to console in dev mode
  logBuild: env === 'development',
  // To allow natural text as keys (including full stops, colons etc) disable the key and namespace separators.
  keySeparator: false,
  nsSeparator: false,
  pages: {
    '*': ['common'],
  },
  loadLocaleFrom: async (locale, ns) => {
    return {}
  },
}
