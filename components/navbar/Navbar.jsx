import styles from './navbar.module.css'
import Image from 'next/image'

export default function Navbar() {
    return (
        <nav className = { styles.navbar }>
            <div>
                <Image 
                    src = "/images/logo.png"
                    width = {120}
                    height = {60}
                    alt = "Logo pokemon go"
                />
            </div>
            <ul className = { styles.list }>
                <li>Home</li>
                <li>PVP ivs</li>
                <li>About</li>
            </ul>
        </nav>
    )
}