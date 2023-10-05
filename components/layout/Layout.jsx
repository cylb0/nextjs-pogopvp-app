import Head from 'next/head'
import styles from './layout.module.css'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

export const title = 'PVP IVs'

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header>
                <Navbar />
            </header>
            <main className={styles.container}>
                { children }
            </main>
            <Footer />
        </>
    )
}