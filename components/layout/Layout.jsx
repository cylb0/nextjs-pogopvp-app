import Head from 'next/head'
import style from './layout.module.css'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

export const title = 'PVP IVs'

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet" />
            </Head>
            <header>
                <Navbar />
            </header>
            <main className={style.container}>
                { children }
            </main>
            <Footer />
        </>
    )
}