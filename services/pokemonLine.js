const evolutions = require('./../public/resources/pokemon_evolutions.json')

export function getEvolutions(pokemon) {

    let evolutionLine = []

    evolutions.map((pkm) => {
        if (pkm.pokemon_id == pokemon.pokemon_id && pkm.form == pokemon.form) {
            console.log('function evolutions :',pkm.evolutions)
            evolutionLine = pkm.evolutions
        }
    })

    return evolutionLine
}