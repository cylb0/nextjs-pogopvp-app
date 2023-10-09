export function buildSpriteURL(pokemon) {
    let url = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon/Addressable%20Assets/pm'
    url += pokemon.pokemon_id

    if (pokemon.mega_name) {
        url += '.fMEGA'
        url += pokemon.form !== 'Normal' ? '_' + pokemon.form : ''
    } else {
        url += pokemon.form !== 'Normal' ? '.f' + pokemon.form.toUpperCase() : ''
    }
    url += '.icon.png'
    return url
}

export function buildPokemonLinkURL(pokemon) {
    let url =  '/?pokemon=' + (pokemon.mega_name ? 'MEGA_' : '')

    url += pokemon.pokemon_name
    
    url += pokemon.form !== 'Normal' ? '_' + pokemon.form : ''

    return url
}

// href={`?pokemon=${pokemon.pokemon_name}${pokemon.form !== 'Normal' ? `_${pokemon.form}` : ''}`}
