const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');


let offset = 0;
const limit = 3;
const maxRecords = 151;

if(!localStorage.getItem('favoritePokemons')){
    localStorage.setItem('favoritePokemons', [])
}


const favoritePokemons = localStorage.getItem('favoritePokemons')


function pokemonDetailEvent(){

    const pokemonsEvent = document.querySelectorAll('.pokemon');

    // console.log(pokemonsEvent)
    pokemonsEvent.forEach(pokemon => {
        pokemon.addEventListener('click', (e) => {
            // console.log(e.currentTarget)
            // console.log(e.target.className)
            if(e.target.className === 'heart-btn'){
                onHeartClick(e)
                return
            }
            const elemento = (e.currentTarget.firstElementChild.innerHTML).split('#')[1];
            window.location.href = `/pokemon.html?${elemento}`;
        })
    });
}

function onHeartClick(e){
    //evento.quem disparou o evento.parente que ele pertençe.primeiro elemento.proximo elemento irmão.proximo elemento irmao.valor em text
    const pokemonName = (e.target.parentNode.firstElementChild.nextSibling.nextSibling.innerHTML)

    // console.log(e.target)
    if(localStorage.getItem('favoritePokemons') !== ''){
        const listaPokemons = JSON.parse(localStorage.getItem('favoritePokemons'));

        if(listaPokemons.includes(pokemonName)){
            removeFavorito(pokemonName, listaPokemons, e)
        }else{
            console.log(listaPokemons)
            listaPokemons.push(pokemonName)
            localStorage.setItem('favoritePokemons', JSON.stringify(listaPokemons))
            e.target.innerHTML = '❤️';
        }
    }
    else{
        localStorage.setItem('favoritePokemons', JSON.stringify([pokemonName]))
        e.target.innerHTML = '❤️';
    }
    
    // window.location.href = window.location.href;
}

function removeFavorito(pokemonName, lista, evento){
    console.log('ja tem')
    const index = lista.indexOf(pokemonName)
    lista.splice(index, 1)
   localStorage.setItem('favoritePokemons', JSON.stringify(lista))
   evento.target.innerHTML = '🖤';
}

function convertPokemonToLi(pokemon){

    const heart = favoritePokemons.includes(pokemon.name) ? '❤️' : '🖤' ;

    return `
    <li class="pokemon ${pokemon.type}">

    <span class="number">#${pokemon.id}</span>
    <span class="name">${pokemon.name}</span>

    <button class="heart-btn" onClick={onHeartClick}>
        ${heart}
    </button>
    
    <div class="detail">
        <ol class="types">
            ${pokemon.types.map((type) => `<li class="${type}">${type}</li>`).join('')}
        </ol>

        <img src="${pokemon.photo}" alt="${pokemon.name}">
    </div>


</li>`
}

function loadPokemonItens(offset , limit){
    pokeApi.getPokemons(offset , limit)
    .then((pokemons = []) => {
        // join - junta todas as li sem separados nenhum 
        pokemonList.innerHTML += pokemons.map((pokemon) => convertPokemonToLi(pokemon)).join('')
        pokemonDetailEvent();
    })

}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdNextPage = offset + limit
    if(qtdNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
        return
    }else{
        loadPokemonItens(offset, limit)

    }

})