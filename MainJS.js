document.querySelector(`#searchBtn`).addEventListener(`click`, async function getPokemon() {
    const name = document.querySelector(`#searchQuery`).value;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`); //fetching pokemons from the api
    let data = await response.json();
    document.querySelector('.pokemonCard').innerHTML = `
    <div>
                <img 
                src="${data.sprites.other["official-artwork"].front_default}"
                alt="${(data.name)}"
                />
            </div>
            <div class="pokemonInfo">
                <h2>Name: ${(data.name)}</h2>
                <h3>ID: ${data.id}</h3>
                <p>Weight: ${data.weight}</p>
                <p>Moves: ${data.moves.map(move => move.move.name).slice(0, 4)}</p>
            </div>
    `;

    const fetchSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.name}`); //fetching the pokemon species
    let speciesData = await fetchSpecies.json();

    const evoFetchChainUrl = speciesData.evolution_chain.url;
    const evoFetchChain = await fetch(evoFetchChainUrl);
    let evoChainData = await evoFetchChain.json();

    let evoName = evoChainData.chain.evolves_to[0].species.name;
    const evoFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoName}`);
    let evoData = await evoFetch.json();
    let preEvoName = speciesData.evolves_from_species.name;
    document.querySelector(`.pokemonEvos`).innerHTML = `
                <div>
                <img 
                src=""
                alt=""
                />
                <table class="pokemonEvo">
                <tr>Evolutions:
                    <td></td>
                </tr>
                <tr>
                    <td>Next Evolution: ${evoName}</td>
                </tr>
                <tr> 
                    <td>Previous Evolution: ${preEvoName}</td>
                </tr>
                </table>
                `;
    console.log(evoData)
    console.log(preEvoName)
})


/*
function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function getPokemon(e) {
    const name = document.querySelector(`#searchQuery`).value;

    //fetching pokemon
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
            </div>
            `;


            //fetching evolutions
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.name}`)
                .then((res) => res.json())
                .then((evoData) => {
                    fetch(`https://pokeapi.co/api/v2/evolution-chain/${evoData.name}`)
                        .then((res) => res.json())
                        .then((evoChain) => {
                    document.querySelector(`.pokemonEvos`).innerHTML = `
                <div>
                <img 
                src=""
                alt=""
                />
                <div class="pokemonEvo">
                <h2>Evolutions:</h2>
                <h2>Name: ${evoChain.chain.species.name}</h2>
                </div>
                `
                            console.log(evoChain)
                        })
                })

        })

    e.preventDefault();
}

*/

