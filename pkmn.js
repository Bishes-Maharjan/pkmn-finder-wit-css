const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const pkmnName = document.querySelector("#pokemon-name");
const pkmnId = document.querySelector("#pokemon-id");
const weight = document.querySelector("#weight");
const height = document.querySelector("#height");
const types = document.querySelector("#types");
const hp = document.querySelector("#hp");
const attack = document.querySelector("#attack");
const defense = document.querySelector("#defense");
const specialAttack = document.querySelector("#special-attack");
const specialDefense = document.querySelector("#special-defense");
const speed = document.querySelector("#speed");
const image =  document.querySelector("#forimg");

//links
const initial ="https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const fetchdata = async ()=>{
  try{
    const data =  await fetch(initial);
    const res =  await data.json();
    document.addEventListener('keydown',(e)=>{
        if(e.key == "Enter"){
            getPkmn(res);
        }
    })
searchButton.addEventListener("click",()=>getPkmn(res));
    
    
    //console.log(res);;
  }
  catch(err){
 console.log("there is an error\n"+err);
  }
};
fetchdata();
let chosenurl="";

const getPkmn = (arr) => {
    const array = arr["results"];
    const foundPkmn = array.find(({ id, name }) =>
      searchInput.value.toLowerCase() === name || searchInput.value === String(id)
    );
  
    if (foundPkmn) {
      pkmnName.textContent = `Name: ${foundPkmn.name}`;
      pkmnId.textContent = `ID: ${foundPkmn.id}`;
      chosenurl = foundPkmn.url;
      fetchmore();
    } else {
      alert("Pokémon not found");
    }
  };
  
  const fetchmore = async () => {
    const data = await fetch(chosenurl);
    const res = await data.json();
    const img = res.sprites["front_default"];
    image.innerHTML = `<img src="${img}" id="sprite">`;
    height.textContent = `Height: ${res.height}`;
    weight.textContent = `Weight: ${res.weight}`;
    final(res);
  };
  
  const final = (arr) => {
    const array = arr["stats"];
    const pkmntype = arr["types"];
    types.textContent = "Type(s): ";
    pkmntype.forEach(({ type }) => {
      types.textContent += `${type.name} `;
    });
  
    array.forEach(({ base_stat, stat }) => {
      const { name } = stat;
      if (name === "hp") {
        hp.textContent = `HP: ${base_stat}`;
      }
      if (name === "attack") {
        attack.textContent = `Attack: ${base_stat}`;
      }
      if (name === "defense") {
        defense.textContent = `Defense: ${base_stat}`;
      }
      if (name === "special-attack") {
        specialAttack.textContent = `Special Attack: ${base_stat}`;
      }
      if (name === "special-defense") {
        specialDefense.textContent = `Special Defense: ${base_stat}`;
      }
      if (name === "speed") {
        speed.textContent = `Speed: ${base_stat}`;
      }
    });
  };