import Image from 'next/image'
import style from './pokemonform.module.css'

export default function PokemonForm({ pokemon }) {
    
    return (
        <div className={style.form}>
            <Image 
                src={`https://projectpokemon.org/images/sprites-models/pgo-sprites/pm${pokemon.pokemon_id}.${pokemon.form !== 'Normal' ? 'f'+ pokemon.form.toUpperCase() +'.' : ''}icon.png`}
                width={150}
                height={150}
                alt={`Picture of ${pokemon.pokemon_name}`}
                unoptimized={true}
            />
            <div className={style.data}>
                <p>Selected Pokemon</p>
                <h1><span>#{pokemon.pokemon_id} </span>
                    { 
                        pokemon.form === 'Alola' ? 
                        'Alolan ' :
                            pokemon.form !== 'Normal' ?
                            pokemon.form + ' ' :
                                ''
                    }
                    { pokemon.pokemon_name } 
                </h1>
                <hr/>
                <p>Base stats: 
                    Attack: <b><span>{ pokemon.base_attack }</span></b> |
                    Defense: <b><span>{ pokemon.base_defense }</span></b> |
                    Stamina: <b><span>{ pokemon.base_stamina }</span></b>
                </p>
            </div>
        </div>
    )
}