
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
                <ul className="flex flex-row gap-x-4 py-4">
                    <li><Link href="/" className="text-sky-400 underline">Front</Link></li>
                    <li><Link href="/test-1" className="text-sky-400 underline">Test 1</Link></li>
                    <li><Link href="/test-2" className="text-sky-400 underline">Test 2</Link></li>
                    <li><Link href="/test-3" className="text-sky-400 underline">Test 3</Link></li>
                    <li><Link href="/static" className="text-sky-400 underline">Static</Link></li>
                </ul>
            </div>
        </main>
    )
}

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
    return {
        // paths: [{ params: { slug: ['test-1', 'test-2', 'test-3'] } }],
        paths: [''],
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async (
    context,
): Promise<GetStaticPropsResult<PageProps>> => {
    const slug = Array.isArray(context.params?.slug)
        ? context.params.slug.map((s) => encodeURIComponent(s)).join("/")
        : context.params?.slug ?? '<front>'

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