    import { useEffect, useState } from 'react'
    import PokemonInput from './pokemonInput/PokemonInput'
    import PokemonForm from './pokemonForm/PokemonForm'

    export default function IVCalculator() {

        const [pokemons, setPokemons] = useState(null)
        const [names, setNames] = useState([])
        const [selectedPokemon, setSelectedPokemon] = useState(null)
        
        const forms = ['Normal', 'Alola', 'Galarian', 'Hisuian']

        const [error, setError] = useState(null)

        useEffect(() => {
            if (pokemons === null) {
                fetchPokemons()
            }
        }, [])

        useEffect(() => {
            console.log(selectedPokemon)
        },[selectedPokemon])

        const fetchPokemons = async () => {
            fetch('/resources/pokemon_stats.json')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network error.');
                }
                return res.json()
            })
            .then((json) => {
                console.log('pokemons', json)
                setPokemons(json)
                
                if (Array.isArray(json) && json.length > 0) {
                    const names = filterPokemons(json).map((pokemon) => {
                        if (pokemon.form == "Normal") {
                            return pokemon.pokemon_name
                        } else {
                            return pokemon.form + '_' + pokemon.pokemon_name
                        }
                    })
                    console.log('names', names)
                    setNames(names)
                }
            })
            .catch((error) => {
                console.log('error : ', error)
                setError(error.message)
            })
        }

        const filterPokemons = (pokemons) => {
            return pokemons.filter((pokemon) => forms.includes(pokemon.form))
        }

        const handleNameUpdate = (name) => {
            const values = name.split('_')
            if (values.length === 2) {
                const [form, name] = values
                setSelectedPokemon(pokemons.filter((pokemon) => pokemon.pokemon_name === name && pokemon.form === form)[0])
            } else {
                setSelectedPokemon(pokemons.filter((pokemon) => pokemon.pokemon_name === name && pokemon.form === 'Normal')[0])
            }
        }

        return (
            <>
                { error ? (
                    <p>Error : { error }</p>
                ) : (
                    <PokemonInput names={names} handleNameUpdate={handleNameUpdate}/>
                )}
                {
                    selectedPokemon && <PokemonForm data={selectedPokemon} />
                }
            </>
        )
    }