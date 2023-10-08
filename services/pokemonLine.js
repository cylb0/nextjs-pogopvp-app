const data = require('./../public/resources/pokemon_evolutions.json')

export function getEvolutions(pokemon) {

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
    
    findEvolutions(pokemon)
    findPrevolutions(pokemon)

    return evolutionLine
}