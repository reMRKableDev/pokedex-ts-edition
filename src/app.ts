const container: HTMLElement | any = document.getElementById("app")
const pokémons: number = 100;

interface IPokemon {
    id: number;
    name: string;
    image: string;
    type: string;
}

const fetchApiData = (): void => {
    for (let counter = 0; counter < pokémons; counter++) {
        getPokémon(counter)  
    }
}

const getPokémon = async (id: number): Promise<void> => {
    const apiData: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokémon: any = await apiData.json()
    const pokémonType: string = pokémon.types.map((element: any) => element.type.name).join(", ")

    const transformedPokemon = {
        id: pokémon.id,
        name: pokémon.name,
        image: `${pokémon.sprites.front_default}`,
        type: pokémonType
    }

    showPokémon(transformedPokemon)
} 

const showPokémon = (pokémon: IPokemon): void => {
    let pokémonCard: string = `
        <div class="card">
            <span class="card--id">${pokémon.id}</span>
            <img class="card--image" src=${pokémon.image} alt=${pokémon.name} />
            <h2 class="card--name">${pokémon.name}</h2>
            <span class="card--details">${pokémon.type}</span>
        </div>
    `

    container.innerHTML += pokémonCard
}

fetchApiData()

const button: HTMLButtonElement | any = document.getElementById("color-switch");

button.addEventListener("click", () => {
    const body: HTMLBodyElement | any = document.querySelector("body");
    body.classList.toggle("dark")
    if (button) {
        button.innerText = body.classList.contains("dark") ? "🌝" : "🌚";
    }
});