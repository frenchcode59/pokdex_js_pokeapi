// je cree une fonction pour recuperer la liste des pokemons je la limite a la 1ere generation des pokemons =151
async function getPokemonList() {
  // j'effectue une requete pour recuperer la liste sur l'api
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
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

// Fonction pour récupérer la liste des pokémons (limitée à la première génération, soit 151)
async function getPokemonList() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await response.json();
  const pokemonResults = data.results;

  const pokemonListContainer = document.getElementById("pokemonList");
  pokemonListContainer.innerHTML = "";

  pokemonResults.forEach((pokemon) => {
    const pokemonName = pokemon.name;
    const pokemonNumber = pokemon.url.split("/")[6];
    const pokemonItem = document.createElement("li");

    pokemonItem.textContent = `#${pokemonNumber} - ${pokemonName}`;
    pokemonListContainer.appendChild(pokemonItem);
  });

  addPokemonListeners();
}

// Fonction pour récupérer les détails d'un Pokémon depuis l'API PokeAPI
async function getPokemonDetails(pokemonName) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  const data = await response.json();

  const name = data.name;
  const number = data.id;
  const image = data.sprites.front_default;
  const types = data.types.map((type) => type.type.name);
  const stats = data.stats;

  const pokemonDetailsContainer = document.getElementById("pokemonDetails");
  pokemonDetailsContainer.innerHTML = "";

  const pokemonDetails = document.createElement("div");
  pokemonDetails.innerHTML = `
          <h2>${name}</h2>
          <p>Numéro : ${number}</p>
          <img src="${image}" alt="${name}">
          <p>Type(s) : ${types.join(", ")}</p>
          <h3>Statistiques :</h3>
          <ul>
              ${stats
                .map((stat) => `<li>${stat.stat.name}: ${stat.base_stat}</li>`)
                .join("")}
          </ul>
      `;

  pokemonDetailsContainer.appendChild(pokemonDetails);
}

// Fonction pour gérer la sélection d'un Pokémon dans la liste
function handlePokemonSelection(event) {
  const pokemonName = event.target.textContent.split(" - ")[1];
  getPokemonDetails(pokemonName);
  getPokemonImage(pokemonName);
}

// Fonction pour récupérer l'image d'un Pokémon depuis l'API PokeAPI
async function getPokemonImage(pokemonName) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  const data = await response.json();

  const pokemonImage = data.sprites.front_default;

  const pokemonImageContainer = document.getElementById("pokemonImage");
  pokemonImageContainer.setAttribute("src", pokemonImage);
}

// Fonction pour ajouter des écouteurs d'événements aux éléments de la liste des Pokémon
function addPokemonListeners() {
  const pokemonListItems = document.querySelectorAll("#pokemonList li");
  pokemonListItems.forEach((item) => {
    item.addEventListener("click", handlePokemonSelection);
  });
}

//  je cree une fonction pour filtrer la liste des Pokémon en fonction du texte saisi dans le champ de recherche
function filterPokemonList() {
  const searchInput = document.getElementById("searchInput");
  const filterValue = searchInput.value.toLowerCase();

  const pokemonListItems = document.querySelectorAll("#pokemonList li");

  pokemonListItems.forEach((item) => {
    const pokemonName = item.textContent.split(" - ")[1].toLowerCase();

    if (pokemonName.includes(filterValue)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// je gere les evenement de recherche 
function handleSearchEvents() {
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", filterPokemonList);
}

// j'ajoute la fonction pour rechercher le pokemon par nom ou son id 
async function searchPokemon() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.toLowerCase();

  if (!isNaN(searchTerm) && searchTerm !== "") {
    await getPokemonDetails(searchTerm);
    getPokemonImage(searchTerm);
    return;
  }

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
  );
  if (response.status === 404) {
    alert("Aucun Pokémon correspondant trouvé !");
    return;
  }

  const data = await response.json();
  const pokemonName = data.name;
  await getPokemonDetails(pokemonName);
  getPokemonImage(pokemonName);
}

// Appeler les fonctions d'initialisation
getPokemonList();
handleSearchEvents();
