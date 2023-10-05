import Head from 'next/head'
import Layout, { title } from '../components/layout/Layout'
import IVCalculator from '../components/ivcalculator/IVCalculator'

export default function Ivs() {
    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <IVCalculator />
        </Layout>
    )
}