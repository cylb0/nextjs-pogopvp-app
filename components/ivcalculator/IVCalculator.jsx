import { useEffect, useState } from 'react'
import PokemonInput from './pokemonInput/PokemonInput'
import PokemonForm from './pokemonForm/PokemonForm'
import { useSearchParams } from 'next/navigation'

export default function IVCalculator() {

    const [pokemons, setPokemons] = useState(null)

    const searchParams = useSearchParams();
    const selectedPokemonName = searchParams.get('pokemon')
    
    let selectedPokemon = null
    if(selectedPokemonName && pokemons) {
        const [ name, form ] = selectedPokemonName.split('_')
        console.log('name ',name ,'form ', form)
        if (form === undefined) {
            selectedPokemon = pokemons.find((pokemon) => (
                pokemon.pokemon_name === name &&
                pokemon.form === 'Normal'
            ))
        } else {
            selectedPokemon = pokemons.find((pokemon) => (
                pokemon.pokemon_name === name &&
                pokemon.form === form
            ))
        }
    }
    
    const forms = ['Normal', 'Alola', 'Galarian', 'Hisuian']

    const [error, setError] = useState(null)

    useEffect(() => {
        if (pokemons === null) {
            fetchPokemons()
        }
    }, [])

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
                            />
                        )
                    )
            }
            {
                selectedPokemon && (
                <>
                    <PokemonForm pokemon={selectedPokemon}/>
                    <div>OK</div>
                </>
            )}
        </>
    )
}