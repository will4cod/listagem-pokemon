const idPokemon = window.location.href.split('?')[1];
const pokemonDetail = document.getElementById('pokeDetail');
const detail = document.querySelector('.detail');
const detailData = document.getElementById('detail-data');

function loadPokemon(id = idPokemon){

    pokeApi.getPokemonDetailID(id)
        // .then((pokemon) => console.log(pokemon))
        .then((pokemon) => {
            detail.classList.add(pokemon.types[0])
            pokemonDetail.innerHTML = convertPokemonToLi(pokemon)
            detailData.innerHTML = convertPokemonDataToLi(pokemon)
        })

}

function convertPokemonToLi(pokemon){
    return `
    <li class="pokemon">
    <div class="pokemon-dados">
        <span class="number">#${pokemon.id}</span>
        <span class="name">${pokemon.name}</span>
    </div>
    
    <div class="detail-types">
        <ol class="types">
            ${pokemon.types.map((type) => `<li class="${type}">${type}</li>`).join('')}
        </ol>

        <img src="${pokemon.photo}" alt="${pokemon.name}"> 
    </div>
    </li>`
}

function convertPokemonDataToLi(pokemon){
    return `
        <li>${(pokemon.height)/10} m</li>
        <li>${pokemon.weight/10} Kg</li>
        <li>${pokemon.abilities.map((poke) => poke.ability.name)} </li>
        
    `
}


loadPokemon()