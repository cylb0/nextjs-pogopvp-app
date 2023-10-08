import { useState } from "react"
import Link from 'next/link'
import style from './pokemonInput.module.css'

export default function PokemonInput({ pokemons }) {

    const [filteredList, setFilteredList] = useState(pokemons)
    const [inputText, setInputText] = useState("")

    const forms = {
        'Alola': 'Alolan form',
        'Galarian': 'Galarian form',
        'Hisuian': 'Hisuian form',
        'Normal': ''
    }

    const handleChange = (event) => {
        setInputText(event.target.value)

        if (event.target.value.length > 2) {
            const input = event.target.value.toLowerCase()
            const matchingPokemons = pokemons.filter(pokemon => (
                pokemon.pokemon_name.toLowerCase().includes(input) ||
                pokemon.form.toLowerCase().includes(input)
            ))
            setFilteredList(matchingPokemons)
        } else {
            setFilteredList([])
        }
    }

    return (
        <div className={style.container}>
            <input
                type="text"
                id="name-input"
                className={style.input}
                name="name-input"
                placeholder="Choose a Pokemon"
                required
                minLength="2"
                value={inputText}
                onChange={handleChange}
                autoComplete="off"
            />
            <div className={style.results}>
                {
                    (inputText.length > 2) && filteredList.slice(0,10).map(pokemon => (
                        <Link 
                            key={pokemon.pokemon_id + '_' + pokemon.form}
                            className={style.result}
                            href={`?pokemon=${pokemon.pokemon_name}${pokemon.form !== 'Normal' ? `_${pokemon.form}` : ''}`}
                            onClick={() => {
                                setFilteredList(pokemons)
                                setInputText('')
                            }}
                            >
                            <span className={ style.name }>{pokemon.pokemon_name}</span>
                            <span className={ style.form }>{pokemon.form !== "Normal" && ' ' + forms[pokemon.form]}</span>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}