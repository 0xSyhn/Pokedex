import { useState, useEffect } from 'react';
import useAllPokemon from '../hooks/useAllPokemons';

function Search({ pokemonNumber, setPokemonNumber }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [text, setText] = useState("Search");
    const [suggestions, setSuggestions] = useState([]);
    const { data: allPokemon, isLoading, isError } = useAllPokemon();

    useEffect(() => {
        if (searchQuery && allPokemon) {
            const filteredPokemon = allPokemon.filter(pokemon => 
                pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
            ).slice(0, 5);  // Limit to 5 suggestions
            setSuggestions(filteredPokemon);
        } else {
            setSuggestions([]);
        }
    }, [searchQuery, allPokemon]);

    const handleSearch = async (e) => {
        e.preventDefault();
        await fetchPokemon(searchQuery);
    }

    const fetchPokemon = async (query) => {
        try {
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            response = await response.json();
            let id = response.id;
            setPokemonNumber(id);
        }
        catch (error) {
            console.error('Error fetching data:', error);
            setPokemonNumber(null);
        }
    }

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            await fetchPokemon(searchQuery);
            setSearchQuery('');
            setText("Search");
        }
    };

    const handleSuggestionClick = async (pokemon) => {
        await fetchPokemon(pokemon.name);
        setSearchQuery('');
        setText("Search");
        setSuggestions([]);
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading Pokémon data</div>;

    return (
        <div className="relative z-[1000]">
            <form onSubmit={handleSearch} className='flex'>
                <input
                    type="text"
                    className='bg-transparent text-black placeholder-black border-1 w-80 border border-solid 
                    rounded-3xl border-black p-2 
                    text-center'
                    value={searchQuery}
                    id="pokemonNumber"
                    placeholder={text}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
            </form>
            {suggestions.length > 0 && (
                <ul className="absolute z-10 w-80 backdrop-blur-lg bg-white/5 border shadow-lg border-black rounded-md mt-1 ">
                    {suggestions.map(pokemon => (
                        <li 
                            key={pokemon.id} 
                            className="px-4 py-2 hover:border hover:shadow-md cursor-pointer flex justify-between items-center"
                            onClick={() => handleSuggestionClick(pokemon)}
                        >
                            {pokemon.name}
                            <img className='max-h-[2.5rem]' src={pokemon.image} alt=''/>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Search;