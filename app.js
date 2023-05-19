// je cree une fonction pour recuperer la liste des pokemons je la limite a la 1ere generation des pokemons =151
async function getPokemonList() {
// j'effectue une requete pour recuperer la liste sur l'api 
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");  
        // je le convertis en gichier .json 
  const data = await response.json();
//   je recupere les resultats
const pokemonResults = data.results;
// je recupere l'element html pokemon list

  const pokemonListContainer = document.getElementById("pokemonList");
  pokemonListContainer.innerHTML = "";
// je parcours chaque resultat de pokemon avec une boucle 
  pokemonResults.forEach((pokemon) => {
    // je recupere son nom et son identifiants
    const pokemonName = pokemon.name;
    const pokemonNumber = pokemon.url.split("/")[6];
// je cree des li pour afficher mes pokemons en liste 
    const pokemonItem = document.createElement("li");
    // je definis que je veux recuperer le numero du pokemon et son nom 

    pokemonItem.textContent = `#${pokemonNumber} - ${pokemonName}`;
    // j'ajoute l'element a pokemon list 

    pokemonListContainer.appendChild(pokemonItem);
  });
}
// j'appel la fonction afin de recuperer tout les elements de la liste 
getPokemonList();
