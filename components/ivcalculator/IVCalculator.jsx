import { useEffect, useState } from 'react'
import PokemonInput from './pokemonInput/PokemonInput'
import PokemonForm from './pokemonForm/PokemonForm'

export default function IVCalculator() {

    const [pokemons, setPokemons] = useState(null)
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
            setPokemons(filterPokemons(json))
        })
        .catch((error) => {
            console.log('error : ', error)
            setError(error.message)
        })
    }

    const filterPokemons = (pokemons) => {
        return pokemons.filter((pokemon) => forms.includes(pokemon.form))
    }

    const handlePokemonSelect = (selectedPokemon) => {
        const pokemon = pokemons.find((pokemon) => {
            return (
                pokemon.pokemon_name === selectedPokemon.pokemon_name &&
                pokemon.form === selectedPokemon.form
            )
        })
        setSelectedPokemon(pokemon)
        console.log(pokemon)
    }

    return (
        <>
            {
                error ? 
                    (
                        <p>Error : {error}</p>
                    ) : 
                    (
                        pokemons && (
                            <PokemonInput
                                pokemons={pokemons.map(({ pokemon_id, pokemon_name, form }) => ({
                                pokemon_id,
                                pokemon_name,
                                form,
                                }))}
                                handlePokemonSelect={handlePokemonSelect}
                            />
                        )
                    )
            }
            {
                selectedPokemon && 
                (
                    <PokemonForm pokemon={selectedPokemon}/>
                )
            }
        </>
    )
}