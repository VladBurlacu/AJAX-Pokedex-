document.querySelector(`#searchBtn`).addEventListener(`click`, getPokemon);

function lowerCaseName(string) {
    return string.toLowerCase();
}

function getPokemon(e) {
    const name = document.querySelector(`#searchQuery`).value;
    const pokemonName = lowerCaseName(name);

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => response.json())
        .then((data) =>{
            document.querySelector(".pokemonCard").innerHTML = `
            <div>
                <img 
                src="${data.sprites.other["official-artwork"].front_default}"
                alt="${data.name}"
                />
            </div>
            <div class="pokemonInfo">
                <h2>Name: ${data.name}</h2>
                <h3>ID: ${data.id}</h3>
                <p>Description: </p>
            </div>
            `;
        })
    e.preventDefault();
}



