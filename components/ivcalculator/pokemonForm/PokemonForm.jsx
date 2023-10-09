import Image from 'next/image'
import style from './pokemonform.module.css'
import Evolutions from './evolutions/Evolutions'
import { buildSpriteURL } from '../../../services/pokemonMiscellaneous'

export default function PokemonForm({ pokemon }) {

    const forms = {
        'Alola': 'Alolan form',
        'Galarian': 'Galarian form',
        'Hisuian': 'Hisuian form',
        'Normal': ''
    }
    
    return (
        <div className={style.form}>
            <div style={{ width: '100px', height: '100px', display: 'flex', justifyContent: 'center' }}>
                <Image 
                    src={buildSpriteURL(pokemon)}
                    width={100}
                    height={100}
                    alt={`Picture of ${pokemon.pokemon_name}`}
                    unoptimized={true}
                    priority={true}
                    onError={(e) => {
                        e.target.src = "/images/missingno.png"
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div className={style.data}>
                <p>Selected Pokemon</p>
                <h1>
                    <span>#{ pokemon.pokemon_id } </span>
                    <span>{ pokemon.mega_name ? pokemon.mega_name : pokemon.pokemon_name }</span>
                </h1>
                <h5>
                    { 
                        forms[pokemon.form]
                    }
                </h5>
                <p>Base stats: 
                    Attack: <b><span>{ pokemon.mega_name ? pokemon.stats.base_attack : pokemon.base_attack }</span></b> |
                    Defense: <b><span>{ pokemon.mega_name ? pokemon.stats.base_defense : pokemon.base_defense }</span></b> |
                    Stamina: <b><span>{ pokemon.mega_name ? pokemon.stats.base_stamina : pokemon.base_stamina }</span></b>
                </p>
                <div>
                    <Evolutions pokemon={ pokemon }/>
                </div>
            </div>
        </div>
    )
}