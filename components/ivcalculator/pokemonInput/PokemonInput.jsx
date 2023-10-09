import { useState } from "react"
import Link from 'next/link'
import style from './pokemonInput.module.css'
import { buildPokemonLinkURL } from "../../../services/pokemonMiscellaneous"

export default function PokemonInput({ pokemons, colors }) {
    
    console.log(colors)
    console.log(pokemons)

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
                    (inputText.length > 2) && filteredList.slice(0,10).map((pokemon, index) => {

                        let bgStyle
                        if (pokemon.type.length === 1) {
                            const bgColor = colors[pokemon.type[0]]
                            bgStyle = {
                                backgroundColor: bgColor
                            }
                        } else if (pokemon.type.length === 2) {
                            const bgColor1 = colors[pokemon.type[0]]
                            const bgColor2 = colors[pokemon.type[1]]
                            bgStyle = {
                                backgroundImage: `linear-gradient(90deg, ${bgColor1}, ${bgColor2})`
                            }
                        }

                        return <Link 
                            key={index}
                            className={style.result}
                            href={buildPokemonLinkURL(pokemon)}
                            onClick={() => {
                                setFilteredList(pokemons)
                                setInputText('')
                            }}
                            style={ bgStyle }
                            >
                            <span className={ style.name }>{pokemon.mega_name ? pokemon.mega_name : pokemon.pokemon_name}</span>
                            <span className={ style.form }>
                                {
                                    pokemon.mega_name ? 
                                    '' :
                                        pokemon.form !== 'Normal' && ' ' + forms[pokemon.form]
                                }
                            </span>
                        </Link>
                    })
                }
            </div>
        </div>
    )
}