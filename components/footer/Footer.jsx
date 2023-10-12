import style from './footer.module.css'


export default function Footer() {
    return (
        <footer className = { style.footer }>
            <p>PVP IVS - Cylb - 2023</p>
                <div className={ style. mention }>
                    <p>DNA icon made by <a href="https://www.flaticon.com/authors/maan-icons">maan-icons</a> from <a href="www.flaticon.com">www.flaticon.com</a></p>
                    <p>Pokedex icon made by <a href="https://www.flaticon.com/fr/auteurs/roundicons-freebies">Roundicons Freebies</a> from <a href="www.flaticon.com">www.flaticon.com</a></p>
                </div>
            </footer>
    )
}