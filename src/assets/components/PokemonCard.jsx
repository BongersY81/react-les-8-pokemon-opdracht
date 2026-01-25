import {useEffect, useState} from "react";
import axios from "axios";
import './PokemonCard.css';

function PokemonCard({url}) {

    const [pokemon, setPokemon] = useState({});
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);


    async function singlePokemon() {
        toggleLoading(true);
        try {
            const result = await axios.get(url)
            // console.log(result.data);
            setPokemon(result.data);
        } catch (error) {
            console.error('het laden van de Pokemon is niet gelukt');
            toggleError(true);
        } finally {
            toggleLoading(false);
        }

    }

    useEffect(() => {
        void singlePokemon();
    }, []);

    return (
        <>

            {error && <p className="error-message">Sorry er is iets misgegaan. Probeer het nog eens opnieuw.</p>}
            {loading && <p className="loading-pokemoncard">De pokemonkaart wordt opgehaald</p>}

            {Object.keys(pokemon).length > 0 &&
                <article className="pokemon-card">
                    <span>{pokemon.name}</span>
                    <span><img src={pokemon.sprites.front_default} alt={pokemon.name}/></span>
                    <span>Moves: {pokemon.moves.length}</span>
                    <span>Weight: {pokemon.weight}</span>
                    <span>Abilities:</span>

                    <ul>
                        {pokemon.abilities.map((url) => (
                            <li key={url.ability.name} className="pokemon-information">
                                {url.ability.name}
                            </li>

                        ))}
                    </ul>
                </article>


            }
        </>
    )
}


export default PokemonCard
