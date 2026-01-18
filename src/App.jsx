import './App.css';
import axios from 'axios';
import {useEffect, useState} from "react";
import PokemonCard from "./assets/components/PokemonCard.jsx";

function App() {

    const [pokemon, setPokemon] = useState({})

async function getPokemonInformation() {

    try {
        const result = await
            axios.get('https://pokeapi.co/api/v2/pokemon/',);
        console.log(result.data);
        setPokemon(result.data);
    } catch  (error) {

        console.error('Het laden van de Pokemon is niet gelukt');
    }

}
useEffect(() => {
   void getPokemonInformation();
    }, []);

    return (
    <>
        <h1>Gotta catch em all!</h1>
        <ul>
            {pokemon?.results?.length > 0 &&
                (pokemon?.results?.map((pokemon) => {
                    return <li key={pokemon.name}>
                        <PokemonCard url={pokemon.url}/>
                    </li>
                }))
            }
        </ul>


             </>
  )
}

export default App
