import { useEffect, useState } from 'react'
import PokemonInput from './pokemonInput/PokemonInput'
import PokemonForm from './pokemonForm/PokemonForm'
import { useSearchParams } from 'next/navigation'
import LeagueSelect from './leagueSelect/LeagueSelect'
import style from './ivcalculator.module.css'
import Table from './table/Table'

export default function IVCalculator() {

    const [error, setError] = useState(null)
    const [pokemons, setPokemons] = useState(null)
    const [maxCp, setMaxCp] = useState(null)

    const searchParams = useSearchParams();
    const selectedPokemonName = searchParams.get('pokemon')
    
    let selectedPokemon = null
    if(selectedPokemonName && pokemons) {
        const [ name, form ] = selectedPokemonName.split('_')
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
            setPokemons(filterPokemons(json))
        })
        .catch((error) => {
            setError(error.message)
        })
    }

    const filterPokemons = (pokemons) => {
        return pokemons.filter((pokemon) => forms.includes(pokemon.form))
    }

    const handleLeagueSelect = (maxCp) => {
        setMaxCp(maxCp)
    }

    return (
        <div className={`${style.container} ${style.theme}`}>
            {
                error ? 
                    (
                        <p>Error : {error}</p>
                    ) : 
                    (
                        pokemons && (
                            <>
                                <h1 className={style.title}>PVP IV ranking</h1>
                                <PokemonInput
                                    pokemons={pokemons.map(({ pokemon_id, pokemon_name, form }) => ({
                                    pokemon_id,
                                    pokemon_name,
                                    form,
                                    }))}
                                />
                            </>
                        )
                    )
            }
            {
                selectedPokemon && (
                <>
                    <PokemonForm pokemon={selectedPokemon} />
                    <LeagueSelect 
                        handleLeagueSelect={handleLeagueSelect}
                        maxCp={maxCp} />
                </>
            )}
            {
                maxCp && (
                    <Table 
                        attack={ selectedPokemon.base_attack }
                        defense={ selectedPokemon.base_defense }
                        stamina={ selectedPokemon.base_stamina }
                        maxCp={ maxCp } />
                )
            }
        </div>
    )
}