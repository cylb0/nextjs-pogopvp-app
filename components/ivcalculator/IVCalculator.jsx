import { useEffect, useState } from 'react'
import PokemonInput from './pokemonInput/PokemonInput'
import PokemonForm from './pokemonForm/PokemonForm'
import { useSearchParams } from 'next/navigation'
import LeagueSelect from './leagueSelect/LeagueSelect'
import style from './ivcalculator.module.css'
import Table from './table/Table'
import types from './../../public/resources/pokemon_types.json'
import { comparePokemons } from '../../services/pokemonMiscellaneous'

export default function IVCalculator() {

    const [error, setError] = useState(null)
    const [pokemons, setPokemons] = useState(null)
    const [megas, setMegas] = useState(null)
    const [maxCp, setMaxCp] = useState(null)

    const forms = ['Normal', 'Alola', 'Galarian', 'Hisuian']
    const typeColors = {
        Bug: "#aec92c",
        Dark: "#6e7681",
        Dragon: "#067fc4",
        Electric: "#fedf6b",
        Fairy: "#f6a7e8",
        Fighting: "#e34448",
        Fire: "#feb04b",
        Flying: "#a7c1f2",
        Ghost: "#7571d0",
        Grass: "#59c079",
        Ground: "#d2976b",
        Ice: "#94ddd6",
        Normal: "#a3a49e",
        Poison: "#a662c7",
        Psychic: "#fda194",
        Rock: "#d7cd90",
        Steel: "#5aafb4",
        Water: "#6ac7e9"
    }

    const searchParams = useSearchParams();
    const selectedPokemonName = searchParams.get('pokemon') 
    let selectedPokemon = null

    useEffect(() => {
        if (pokemons === null) {
            fetchPokemons()
            fetchMegas()
        }
    }, [])

    if(selectedPokemonName && pokemons && megas) {
        const selected = selectedPokemonName.split('_')

        if (selected[0] === 'MEGA') {
            if (selected.length === 2) {
                selectedPokemon = megas.find((pokemon) => (
                    pokemon.pokemon_name === selected[1] &&
                    pokemon.form === 'Normal'
                ))
            } else {
                selectedPokemon = megas.find((pokemon) => (
                    pokemon.pokemon_name === selected[1] &&
                    pokemon.form === selected[2]
                ))
            }
        } else {
            if (selected.length === 1) {
                selectedPokemon = pokemons.find((pokemon) => (
                    pokemon.pokemon_name === selected[0] &&
                    pokemon.form === 'Normal'
                ))
            } else {
                selectedPokemon = pokemons.find((pokemon) => (
                    pokemon.pokemon_name === selected[0] &&
                    pokemon.form === selected[1]
                ))
            }
        }
    }
    

    const fetchPokemons = async () => {
        fetch('/resources/pokemon_stats.json')
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network error.')
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

    const fetchMegas = async () => {
        fetch('/resources/mega_pokemon.json')
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network error.')
            }
            return res.json()
        })
        .then((json) => {
            setMegas(json)
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

    const mergeTypes = (pokemon) => {
        if (!pokemon.mega_name) {
            const matchingTypes = types.find((pkm) => comparePokemons(pokemon, pkm))
            return {...pokemon, type: matchingTypes ? matchingTypes.type : []}
        }
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
                                    // pokemons={pokemons.concat(megas)}
                                    pokemons={pokemons.map((pokemon) => {
                                        return mergeTypes(pokemon)
                                    }).concat(megas)}
                                    colors={typeColors}
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
                selectedPokemon && maxCp && (
                    <Table 
                        attack={ selectedPokemon.mega_name ? selectedPokemon.stats.base_attack : selectedPokemon.base_attack }
                        defense={ selectedPokemon.mega_name ? selectedPokemon.stats.base_defense : selectedPokemon.base_defense }
                        stamina={ selectedPokemon.mega_name ? selectedPokemon.stats.base_stamina : selectedPokemon.base_stamina }
                        maxCp={ maxCp } />
                )
            }
        </div>
    )
}