import { getEvolutions } from './../../../../services/pokemonLine.js'
import Image from 'next/image'
import Link from 'next/link'
import style from './evolutions.module.css'

export default function Evolutions({ pokemon }) {

    const evolutions = getEvolutions(pokemon)

    const addZeros = (number) => {
        const str = number.toString()
        const zerosCount = Math.max(0, 3 - str.length)
        return '0'.repeat(zerosCount) + str
    }

    return (
        <div className={style.container}>
            {
                evolutions && evolutions.length > 1 && evolutions.map((evolution) => (
                    <Link
                        key={evolution.pokemon_name+evolution.form}
                        href={`/?pokemon=${evolution.pokemon_name}${evolution.form !== 'Normal' ? '_' + evolution.form : ''}`}>
                        <div style={{ width: '60px', height: '60px', display: 'inline-block' }}>
                            <Image 
                                src={`https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon/Addressable%20Assets/pm${evolution.pokemon_id}${evolution.form !== 'Normal' ? '.f' + evolution.form.toUpperCase() : ''}.icon.png`}
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