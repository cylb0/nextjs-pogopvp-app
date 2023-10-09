const data = require('./../public/resources/pokemon_evolutions.json')
const pokemons = require('./../public/resources/pokemon_stats.json')
const megas = require('./../public/resources/mega_pokemon.json')

export function getEvolutions(pokemon) {

    const pk = pokemon
    if (pk.mega_name) {
        pokemon = pokemons.find((pokemon) => (
            pokemon.pokemon_id === pk.pokemon_id && pokemon.form === 'Normal'
        ))
    }

    const evolutionLine = [pokemon]

    const findPrevolutions = (poke) => {
        data.forEach((pkm) => {
            pkm.evolutions.forEach((evolution) => {
                if (evolution.pokemon_id == poke.pokemon_id && evolution.form == poke.form) {
                    evolutionLine.unshift(pkm)
                    findPrevolutions(pkm)
                }
            })
        })
    }

    const findEvolutions = (poke) => {
        data.forEach((pkm) => {
            if (pkm.pokemon_id == poke.pokemon_id && pkm.form == poke.form) {
                pkm.evolutions.forEach((evolution) => {
                    evolutionLine.push(evolution)
                    findEvolutions(evolution)
                })
            }
        })
    }

    const findMegas = () => {
        evolutionLine.forEach((pokemon) => {
            megas.forEach((mega) => {
                if (!pokemon.mega_name && pokemon.pokemon_id == mega.pokemon_id) {
                    evolutionLine.push(mega)
                }
            })
        })
    }
    
    findEvolutions(pokemon)
    findPrevolutions(pokemon)
    findMegas()

    return evolutionLine
}