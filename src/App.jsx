import './App.css';
import axios from 'axios';
import {useEffect, useState} from "react";
import PokemonCard from "./assets/components/PokemonCard.jsx";

function App() {

    const [pokemon, setPokemon] = useState({})
    const [endpoint, setEndpoint] = useState('https://pokeapi.co/api/v2/pokemon/')
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

    async function getPokemonInformation() {
        toggleLoading(true)
        try {
            const result = await
                axios.get(endpoint);
            console.log(result.data);
            setPokemon(result.data);
        } catch (error) {
            toggleError(true)
            console.error('Het laden van de Pokemon is niet gelukt');
        } finally {
            toggleLoading(false)
        }

    }

    useEffect(() => {
        void getPokemonInformation();
        console.log('pokemonkaarten worden opgehaald')
        return function cleanup() {
            console.log("aanvraag wordt verwijderd")
        };
    }, [endpoint]);


    return (
        <>
            <h1>Gotta catch em all!</h1>

            <button type="button" onClick={() => setEndpoint(pokemon.previous)}
                    disabled={pokemon.previous === null}>vorige</button>
            <button type="button" onClick={() => setEndpoint(pokemon.next)}
                    disabled={pokemon.next === null}>volgende</button>

            {error && <p className="error-message">Sorry er is iets misgegaan. Probeer het nog eens opnieuw.</p>}
            {loading && <p className="loading-pokemoncard">De pokemonkaart wordt opgehaald</p>}

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
