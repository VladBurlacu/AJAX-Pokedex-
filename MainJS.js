document.querySelector(`#searchBtn`).addEventListener(`click`, getPokemon);

function getPokemon(e) {
    const name = document.querySelector(`#searchQuery`).value;

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())
        .then((data) =>{
            document.querySelector(".pokemonCard").innerHTML = `
            <div>
                <img 
                src="${data.sprites.other["official-artwork"].front_default}
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



