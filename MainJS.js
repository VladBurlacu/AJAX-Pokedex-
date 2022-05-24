document.querySelector(`#searchBtn`).addEventListener(`click`, getPokemon);

function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function getPokemon(e) {
    const name = document.querySelector(`#searchQuery`).value;

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())
        .then((data) => {
            document.querySelector(".pokemonCard").innerHTML = `
            <div>
                <img 
                src="${data.sprites.other["official-artwork"].front_default}"
                alt="${capFirstLetter(data.name)}"
                />
            </div>
            <div class="pokemonInfo">
                <h2>Name: ${capFirstLetter(data.name)}</h2>
                <h3>ID: ${data.id}</h3>
                <p>Weight: ${data.weight}</p>
                <p>Moves: ${data.moves.map(move => move.move.name).slice(0, 4)}</p>
                <p>Evolutions: </p>
            </div>
            `;
        })
    e.preventDefault();
}



