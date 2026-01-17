import './App.css';
import axios from 'axios';
import {useEffect, useState} from "react";

function App() {
    const [pokemon, setPokemon] = useState(null)
async function getPokemonInformation() {

    try {
        const result = await
            axios.get("https://pokeapi.co/api/v2/pokemon/",)
        console.log(result.data);
        setPokemon(result.data);
    } catch  (error) {
        console.error(error);
    }

}
useEffect(() => {
   void getPokemonInformation();
    }, []);

    return (
    <>

      <h1>Gotta catch em all!</h1>

    </>
  )
}

export default App
