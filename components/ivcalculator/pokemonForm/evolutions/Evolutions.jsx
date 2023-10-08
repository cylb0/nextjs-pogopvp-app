import { getEvolutions } from './../../../../services/pokemonLine.js'
import Image from 'next/image'
import Link from 'next/link'
import style from './evolutions.module.css'

export default function Evolutions({ pokemon }) {

    const evolutions = getEvolutions(pokemon)
    console.log('evolutions: ',evolutions)

    return (
        <div className={style.container}>
            {
                evolutions && evolutions.map((evolution) => (
                    <Link
                        href={`/?pokemon=${evolution.pokemon_name}${evolution.form !== 'Normal' ? '_' + evolution.form : ''}`}>
                        <Image 
                            src={`https://projectpokemon.org/images/sprites-models/pgo-sprites/pm${evolution.pokemon_id}.${evolution.form !== 'Normal' ? 'f'+ pokemon.form.toUpperCase() +'.' : ''}icon.png`}
                            width={75}
                            height={75}
                            alt={`Picture of ${pokemon.pokemon_name}`}
                            unoptimized={true}
                            onError={(e) => {
                                e.target.src = "/images/missingno.png"
                            }}
                        />
                    </Link>
                ))
            }
        </div>
    )
}