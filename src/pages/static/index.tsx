import {
    GetStaticPathsResult,
    GetStaticProps,
    GetStaticPropsResult,
} from 'next'


import { PropsWithChildren } from "react";
import Link from "next/link";

interface PageProps extends PropsWithChildren {
    slug: string
    time: string
}

export default function Page({ slug, time }: PageProps) {
    const now = (new Date()).getTime() / 1000
    const generated = (new Date(time)).getTime() / 1000

    const age = Math.round(now - generated)
    const expected = Math.round(generated + 30 - now)

    return (
        <main className="flex h-screen">
            <div className="m-auto">
                <p className="text-2xl">Slug: {slug}</p>
                <p className="text-xl">Built at: {time}</p>
                <p className="text-l" suppressHydrationWarning>Age at hydration: {age} seconds</p>
                <p className="text-l" suppressHydrationWarning>Next expected revalidation: {expected} seconds</p>
                <Link href="/" className="text-sky-400 underline">Front</Link>
            </div>
        </main>
    )
}

export const getStaticProps: GetStaticProps = async (
    context,
): Promise<GetStaticPropsResult<PageProps>> => {
    const slug = Array.isArray(context.params?.slug)
        ? context.params.slug.map((s) => encodeURIComponent(s)).join("/")
        : context.params?.slug ?? 'static'

    await fetch(`https://fake-cms.vercel.app/api/getdata?reason=${context.revalidateReason}&route=${slug}`)
    const datetime = (new Date()).toISOString()

    return {
        props: {
            slug: slug,
            time: datetime,
        },
        revalidate: 30
    }
}