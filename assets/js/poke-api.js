
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.id = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    pokemon.type = pokeDetail.types[0].type.name
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    pokemon.abilities = pokeDetail.abilities

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => fetch(pokemon.url)
                                            .then((response) => response.json())
                                            .then(convertPokeApiDetailToPokemon);


                                            
pokeApi.getPokemons = function( offset = 0, limit = 10){
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

   return fetch(url)
        .then((response) => response.json())
        .then((jsonbody) => jsonbody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.log(error))
}

pokeApi.getPokemonDetailID = (id) => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                                            .then((response) => response.json())
                                            .then(convertPokeApiDetailToPokemon);

// Promise.all([
//     fetch('https://pokeapi.co/api/v2/pokemon/1'),
//     fetch('https://pokeapi.co/api/v2/pokemon/2')
// ]).then((results) => console.log(results))