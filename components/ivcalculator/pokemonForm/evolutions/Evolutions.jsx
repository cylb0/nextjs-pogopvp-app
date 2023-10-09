import { getEvolutions } from './../../../../services/pokemonLine.js'
import Image from 'next/image'
import Link from 'next/link'
import style from './evolutions.module.css'
import { buildSpriteURL, buildPokemonLinkURL } from '../../../../services/pokemonMiscellaneous.js'

export default function Evolutions({ pokemon }) {

    const evolutions = getEvolutions(pokemon)

    return (
        <div className={style.container}>
            {
                evolutions && evolutions.length > 1 && evolutions.map((evolution, index) => (
                    <Link
                        key={index}
                        href={buildPokemonLinkURL(evolution)}>
                        <div style={{ width: '60px', height: '60px', display: 'inline-block' }}>
                            <Image 
                                src={buildSpriteURL(evolution)}
                                width={60}
                                height={60}
                                alt={`Picture of ${pokemon.pokemon_name}`}
                                unoptimized={true}
                                priority={true}
                                onError={(e) => {
                                    e.target.src = "/images/missingno.png"
                                }}
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}