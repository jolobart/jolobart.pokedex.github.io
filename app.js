//DOM Objects
const pokeRow = document.querySelector(".poke-container")
const pokeModal = document.querySelector(".modal-content")
const pokeTable = document.querySelector("#poke-cards")

const fetchPokemon = () => {
    const pokemonPromises = [];

    for (let index = 1; index <= 150; index++) {
        pokemonPromises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
            .then((res) => res.json())
            .catch((err) => console.log(err)));
    }

    let pokemonsData = [];
    Promise.all(pokemonPromises)
        .then(pokemons => {
            pokemonsData = pokemons;
            pokemons.forEach((el) => {

                const card = `<div class="col-sm-12 col-md-4 col-lg-3 mb-4">
                                 <div data-id="${el.id}" class="card grass justify-content-center align-items-center shadow">
                                    <div class="card-header"><h4>#${el.id.toString().padStart(3, '0')}</h4></div> 
                                    <div class="image">
                                        <img src="img/pokeball.png" class="pokeball-container" class="img-container" alt="...">
                                        <a href="#" type="button" data-toggle="modal" data-target="#staticBackdrop">
                                            <img src="https://pokeres.bastionbot.org/images/pokemon/${el.id}.png" class="pokemon card-img-top" alt="...">
                                        </a>
                                    </div>
                                    <div class="card-body">
                                        <h3 class="card-title">${el.name.charAt(0).toUpperCase() + el.name.slice(1)}</h3>
                                     </div>
                                </div>
                            </div>`

                pokeRow.innerHTML += card;
            });

            pokeTable.addEventListener('click', e => {
                let userId = e.target.parentNode.parentNode.parentNode;
                userId = userId.dataset.id;
                let pokeName = e.target.parentNode.parentNode.parentNode.children[2].innerText;
                let getPokemon = pokemonsData[userId - 1]
                let type = getPokemon.types.map((type) => type.type.name).join(', ');
                let abilites = getPokemon.abilities.map((type) => type.ability.name).join(', ');

                function titleCase(str) {
                    var splitStr = str.toLowerCase().split(' ');
                    for (var i = 0; i < splitStr.length; i++) {
                        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
                    }

                    return splitStr.join(' ');
                }

                let modalRow = `<div class="modal-header bg-dark">
                <h2 class="modal-title" id="staticBackdropLabel">#${userId.toString().padStart(3, '0')}</h2>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body grass">
                <div class="row mb-2">
                    <div class="col d-flex justify-content-center align-items-center">
                        <img src="https://pokeres.bastionbot.org/images/pokemon/${userId}.png"
                            class="img-fluid modal-poke-image" alt="...">
                    </div>
                </div>
                <div class="row ">
                    <div class="col d-flex justify-content-center align-items-center">
                        <h2>${pokeName}</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <h3>Profile</h3>
                    </div>
                </div>
                
                <div class="row ">
                    <div class="col-sm-12 col-md-6">
                        <h5>Weight: ${getPokemon.weight} kg</h5>
                    </div>
                    <div class="col-sm-12 col-md-6">
                        <h5>Height: ${getPokemon.height} m</h5>
                    </div>
                    <div class="col-sm-12 col-md-6">
                        <h5>Type: ${titleCase(type)}</h5>
                    </div>
                     <div class="col-sm-12 col-md-6">
                        <h5>Base Experience: ${getPokemon.base_experience}</h5>
                    </div>
                    <div class="col-sm-12 col-md-6">
                        <h5>Abilites: ${titleCase(abilites.replace('-',' '))}</h5>
                    </div>                
                </div>
        
            </div>
            <div class="modal-footer bg-dark">
            </div>`

                pokeModal.innerHTML = modalRow;

            })
        });

    // function isPokemon(pokemon) {
    //     return pokemon.name === 'bulbasaur';
    // }
    // console.log(pokemon.find(isPokemon));


}

fetchPokemon();