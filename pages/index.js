import Head from 'next/head'
import Layout, { title } from '../components/layout/Layout'

export default function Home() {
    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <h1>Home</h1>
        </Layout>
    )
}