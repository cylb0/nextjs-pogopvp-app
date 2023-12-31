import { getEvolutions } from './../../../../services/pokemonLine.js'
import Image from 'next/image'
import Link from 'next/link'
import style from './evolutions.module.css'
import { buildSpriteURL, buildPokemonLinkURL, comparePokemons } from '../../../../services/pokemonMiscellaneous.js'

export default function Evolutions({ pokemon }) {

    const evolutions = getEvolutions(pokemon)

    return (
        <div className={style.container}>

            {
                evolutions && evolutions.length > 1 && 
                    <Image
                    src={'/images/dna.png'}
                    width={40}
                    height={40}
                    alt={'DNA icon'} />
            }

            {
                evolutions && evolutions.length > 1 && 
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {
                            evolutions.map((evolution, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem'}}>
                                    <Link
                                        key={index}
                                        href={buildPokemonLinkURL(evolution)}
                                        style={{ marginLeft: '1rem' }} >
                                        <div className={style.link}>
                                            <Image 
                                                src={buildSpriteURL(evolution)}
                                                width={50}
                                                height={50}
                                                alt={`Picture of ${pokemon.pokemon_name}`}
                                                unoptimized={true}
                                                priority={true}
                                                onError={(e) => {
                                                    e.target.src = "/images/missingno.png"
                                                }}
                                                style={{ 
                                                    width: '50px', 
                                                    height: '50px', 
                                                    objectFit: 'cover',
                                                    filter: comparePokemons(pokemon, evolution) ? 'grayscale(100%)' : 'none', 
                                                }}
                                            />
                                        </div>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
            }
        </div>
    )
}