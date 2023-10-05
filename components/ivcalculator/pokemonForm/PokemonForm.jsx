import Image from 'next/image'
import style from './pokemonform.module.css'

export default function PokemonForm({ data }) {
    return (
        <div className={style.form}>
            <Image 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.pokemon_id}.png`}
                width={150}
                height={150}
                alt={`Picture of ${data.pokemon_name}`}
                unoptimized={true}
            />
            <div className={style.data}>
                <p>Selected Pokemon</p>
                <h1>
                    { 
                        data.form === 'Alola' ? 
                        'Alolan ' :
                            data.form !== 'Normal' ?
                            data.form + ' ' :
                                ''
                    }
                    { data.pokemon_name } 
                </h1>
                <hr/>
                <p>Base stats: 
                    Attack: <b><span>{ data.base_attack }</span></b> |
                    Defense: <b><span>{ data.base_defense }</span></b> |
                    Stamina: <b><span>{ data.base_stamina }</span></b>
                </p>
            </div>
        </div>
    )
}