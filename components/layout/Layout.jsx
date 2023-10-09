import Head from 'next/head'
import style from './layout.module.css'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

export const title = 'PVP IVs'

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main className={style.container}>
                { children }
            </main>
            <Footer />
        </>
    )
}