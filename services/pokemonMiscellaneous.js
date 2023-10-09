export function buildSpriteURL(pokemon) {
    const base = 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon/Addressable%20Assets/pm';
    const isMega = pokemon.mega_name;
    const form = pokemon.form !== 'Normal' ? (isMega ? `_${pokemon.form}` : `.f${pokemon.form.toUpperCase()}`) : '';
    return `${base}${pokemon.pokemon_id}${isMega ? '.fMEGA' : ''}${form}.icon.png`;
}

export function buildPokemonLinkURL(pokemon) {
    const base = '/?pokemon='
    const isMega = pokemon.mega_name
    const form = pokemon.form !== 'Normal' ? `_${pokemon.form}` : ''
    return `${base}${isMega ? 'MEGA_' : ''}${pokemon.pokemon_name}${form}`
}

export function comparePokemons(pkm1, pkm2) {
    return (
        pkm1.mega_name === pkm2.mega_name &&
        pkm1.pokemon_id === pkm2.pokemon_id &&
        pkm1.form === pkm2.form
    )
}