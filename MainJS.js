const getPokemonData = async query => {
    const url = `https://pokeapi.co/api/v2/pokemon/${query}`;
    const response = await fetch(url);
    const pokemon = response.json();

    document.getElementById(`updateImg`).setAttribute(`src`, pokemon.sprites.other.dream_world.front_default);
    document.getElementById(`updateName`).innerHTML = pokemon.name;
}