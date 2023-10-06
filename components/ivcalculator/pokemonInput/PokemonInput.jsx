import { useState } from "react"
import Link from 'next/link'
import style from './pokemonInput.module.css'

export default function PokemonInput({ pokemons }) {

    const [filteredList, setFilteredList] = useState(pokemons)
    const [inputText, setInputText] = useState("")

    const handleChange = (event) => {
        console.log(filteredList)
        setInputText(event.target.value)
        if (event.target.value.length > 2) {
            const input = event.target.value
            const matchingPokemons = filteredList.filter(pokemon => (
                pokemon.pokemon_name.toLowerCase().includes(input.toLowerCase())
            ))
            setFilteredList(matchingPokemons)
        } else {
            setFilteredList(pokemons)
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
                            className={style.result}
                            href={`?pokemon=${pokemon.pokemon_name}${pokemon.form !== 'Normal' ? `_${pokemon.form}` : ''}`}
                            onClick={() => {
                                setFilteredList(pokemons)
                                setInputText('')
                            }}
                            >
                            <span>{pokemon.pokemon_name}</span>
                            <span>{pokemon.form !== "Normal" && ' ' + pokemon.form}</span>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}