import Image from 'next/image'
import style from './pokemonform.module.css'
import Evolutions from './evolutions/Evolutions'
import { buildSpriteURL } from '../../../services/pokemonMiscellaneous'
import Link from 'next/link'

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
                <div style={{ display:'flex', justifyContent: 'space-between',alignItems:'center', gap:'1rem' }}>
                    <h1>
                        <span>#{ pokemon.pokemon_id } </span>
                        <span>{ pokemon.mega_name ? pokemon.mega_name : pokemon.pokemon_name }</span>
                    </h1>
                    <Link href={`https://bulbapedia.bulbagarden.net/wiki/${pokemon.pokemon_name}_(Pok%C3%A9mon)`}>
                        <Image
                            src={'/images/pokedex.png'}
                            width={50}
                            height={50}
                            alt={'Pokedex icon'} />
                    </Link>
                </div>
                <h5 className={ style.separation }>
                    { 
                        forms[pokemon.form]
                    }
                </h5>
                <p className={ style.separation }>Base stats: 
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