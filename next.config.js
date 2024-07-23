const nextTranslate = require('next-translate-plugin')

module.exports = nextTranslate({
  // https://nextjs.org/docs/app/api-reference/next-config-js/reactStrictMode
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
})
