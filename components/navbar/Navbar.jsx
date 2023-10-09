import styles from './navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className = { styles.navbar }>
            <Link href="/">
                <Image 
                    src = "/images/logo.png"
                    width = {120}
                    height = {60}
                    alt = "Logo pokemon go"
                    priority = {true}
                />
            </Link>
            <ul className = { styles.list }>
                <li><Link href="/">PVP ivs</Link></li>
                <li>About</li>
            </ul>
        </nav>
    )
}