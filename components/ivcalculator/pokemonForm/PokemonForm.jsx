import Image from 'next/image'
import style from './pokemonform.module.css'
import Evolutions from './evolutions/Evolutions'

export default function PokemonForm({ pokemon }) {

    const forms = {
        'Alola': 'Alolan form',
        'Galarian': 'Galarian form',
        'Hisuian': 'Hisuian form',
        'Normal': ''
    }

    const addZeros = (number) => {
        const str = number.toString()
        const zerosCount = Math.max(0, 3 - str.length)
        return '0'.repeat(zerosCount) + str
    }
    
    return (
        <div className={style.form}>
            <div style={{ width: '100px', height: '100px', display: 'inline-block' }}>
                <Image 
                    src={`https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon/Addressable%20Assets/pm${pokemon.pokemon_id}${pokemon.form !== 'Normal' ? '.f' + pokemon.form.toUpperCase() : ''}.icon.png`}
                    width={100}
                    height={100}
                    alt={`Picture of ${pokemon.pokemon_name}`}
                    unoptimized={true}
                    priority={true}
                    onError={(e) => {
                        e.target.src = "/images/missingno.png"
                    }}

                />
            </div>
            <div className={style.data}>
                <p>Selected Pokemon</p>
                <h1>
                    <span>#{ pokemon.pokemon_id } </span>
                    <span>{ pokemon.pokemon_name }</span>
                </h1>
                <h5>
                    { 
                        forms[pokemon.form]
                    }
                </h5>
                <p>Base stats: 
                    Attack: <b><span>{ pokemon.base_attack }</span></b> |
                    Defense: <b><span>{ pokemon.base_defense }</span></b> |
                    Stamina: <b><span>{ pokemon.base_stamina }</span></b>
                </p>
                <Evolutions pokemon={ pokemon }/>
            </div>
        </div>
    )
}