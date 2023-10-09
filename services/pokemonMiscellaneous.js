export function buildSpriteURL(pokemon) {
    let url = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon/Addressable%20Assets/pm'
    url += pokemon.pokemon_id

    if (pokemon.mega_name) {
        url += '.fMEGA'
    } else {
        url += pokemon.form !== 'Normal' ? 'f' + pokemon.form : ''
    }
    url += '.icon.png'
    return url
}
