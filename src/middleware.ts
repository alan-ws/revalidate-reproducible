import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/
const siteConfig = require('../site.config')

const pathsTo404 = ['/themes/custom', '/sites/default/files']

// Automatically prefix the path with the default locale prefix when making
// a request without a specified locale in the URL.
export default async function middleware(req: NextRequest) {
  // Redirect assets paths to 404 page
  const shouldRedirectTo404 = pathsTo404.some((segment) =>
    req.nextUrl.pathname.includes(segment),
  )
  if (shouldRedirectTo404) {
    // Rewrite URL to avoid multiple hits
    const url = req.nextUrl.clone()

    url.pathname = `/404`
    return NextResponse.rewrite(url)
  }

  // Exclude system paths and requests for file assets.
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return NextResponse.next()
  }

  if (req.nextUrl.locale === 'default') {
    const locale =
      req.cookies.get('NEXT_LOCALE')?.value || siteConfig.defaultLocalePrefix

    // eslint-disable-next-line consistent-return
    return NextResponse.redirect(
      new URL(
        `/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`,
        req.url,
      ),
    )
  }

  return NextResponse.next()
}
