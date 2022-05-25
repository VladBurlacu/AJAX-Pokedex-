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

    const fetchSpecies = await fetch(data.species.url); //fetching the pokemon species
    let speciesData = await fetchSpecies.json();

    const evoFetchChainUrl = speciesData.evolution_chain.url;
    const evoFetchChain = await fetch(evoFetchChainUrl);
    let evoChainData = await evoFetchChain.json();

    let baseForm = evoChainData.chain.species.name;
    let evoName = evoChainData.chain.evolves_to[0].species.name;
    let evoName2 = evoChainData.chain.evolves_to[0].evolves_to[0].species.name;

    const baseFormFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${baseForm}`)
    let baseFormData = await baseFormFetch.json();

    const evoFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoName}`);
    let evoNameData = await evoFetch.json();

    const secondEvoFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoName2}`)
    let secondEvoData = await secondEvoFetch.json();


    document.querySelector(`.pokemonEvos`).innerHTML = `
                
               
                <div class="pokemonEvo">
                
                    <div>
                    Base Form: ${baseForm}
                    <img 
                    src="${baseFormData.sprites.other["official-artwork"].front_default}"
                    alt=""
                    />
                    </div>
                
                    <div>
                    Second Evolution: ${evoName}
                    <img 
                    src="${evoNameData.sprites.other["official-artwork"].front_default}"
                    alt=""
                    />
                    </div>
                
                    <div>
                    Third Evolution: ${evoName2}
                    <img 
                    src="${secondEvoData.sprites.other["official-artwork"].front_default}"
                    alt=""
                    />
                    </div>
                
                </div>
                `;
})

