import pokemonApi from "@/api/pokemonApi";
import axios from "axios";

const getPokemons = () => {
  const pokemonsArr = Array.from(Array(649));
  //   console.log(pokemonsArr);
  return pokemonsArr.map((_, index) => ({
    value: index + 1,
    // label: `#${index + 1}`,
  }));
};

const getPokemonsOptions = async () => {
  //   console.log(getPokemons());
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);

  const pokemons = await getPokemonName(mixedPokemons.slice(0, 4));

  //   console.log(pokemons);
  return pokemons;
};

const getPokemonName = async ([a, b, c, d] = []) => {
  const pokemonArr = [
    pokemonApi.get(`/${a.value}`),
    pokemonApi.get(`/${b.value}`),
    pokemonApi.get(`/${c.value}`),
    pokemonApi.get(`/${d.value}`),
  ];

  const [p1, p2, p3, p4] = await Promise.all(pokemonArr);

  return [
    { name: p1.data.name, id: p1.data.id },
    { name: p2.data.name, id: p2.data.id },
    { name: p3.data.name, id: p3.data.id },
    { name: p4.data.name, id: p4.data.id },
  ];
};

export default getPokemonsOptions;
