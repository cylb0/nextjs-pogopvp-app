import { useState } from "react"
import style from './pokemonInput.module.css'

export default function PokemonInput({ names, handleNameUpdate }) {

    const [filteredList, setFilteredList] = useState([])
    const [inputText, setInputText] = useState("")

    const handleChange = (event) => {
        setInputText(event.target.value)
        if (event.target.value.length > 1) {
            const input = event.target.value
            const filteredList = names.filter(name => name.toLowerCase().includes(input.toLowerCase()))
            setFilteredList(filteredList)
        } else {
            setFilteredList([])
        }
    }

    const handleSelect = (name) => {
        handleNameUpdate(name)
        setFilteredList([])
        setInputText('')
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
            />
            <ul 
                role="listbox"
                className={style.list}>
                {
                    filteredList.slice(0, 10).map(name => (
                        <li 
                            key={name}
                            role="option"
                            onClick={() => handleSelect(name)}>
                            {name}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}