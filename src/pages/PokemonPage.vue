<template>
    <h1 v-if="!pokemon">Espere por favor...</h1>

    <div v-else>

        <h1>¿Quien es ese pokemon?</h1>
        <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon"/>
        <PokemonOptions :pokemonsArr="pokemonsArr" @selection="checkAnswer"/>

        <template v-if="showAnswer">
            <h2  class="fade-in">
            {{ message }}
        </h2>
        <button @click="newGame"
            style="background-color: #4CAF50; /* Green */
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            border-radius: 12px;
                &:hover {
                    background-color: #45a030;
                }
            "
        >
            Nuevo juego
        </button>
        </template>
    </div>


</template>

<script>
import PokemonPicture from '@/components/PokemonPicture'
import PokemonOptions from '@/components/PokemonOptions'
import getPokemonsOptions from '@/helpers/getPokemonOptions'

// console.log(getPokemonsOptions());


export default {
    components: {
        PokemonPicture,
        PokemonOptions
    },
    data() {
        return {
            pokemonsArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: ''
        }
    },
    methods: {
       async mixPokemonArr() {
            this.pokemonsArr = await getPokemonsOptions()
            const rndInt = Math.floor(Math.random() * 4)
            this.pokemon = this.pokemonsArr[rndInt]

            // console.log(this.pokemon);
        },
        checkAnswer (id) {
            this.showPokemon = true
            this.showAnswer = true
            if (id === this.pokemon.id) {
                this.message = `Correcto, el pokemon es ${this.pokemon.name}
                `
            } else {
                this.message = `Incorrecto, el pokemon es ${this.pokemon.name}
                `
            }
        },
        newGame() {
            this.showPokemon = false
            this.showAnswer = false
            this.pokemonsArr = []
            this.pokemon = null
            this.mixPokemonArr()
        }


    },
    mounted() {
        this.mixPokemonArr()
    }
}
</script>

<style>

</style>