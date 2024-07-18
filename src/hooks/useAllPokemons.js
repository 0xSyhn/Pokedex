import { useQuery } from '@tanstack/react-query';

function useAllPokemon() {
    const fetchAllPokemon = async () => {
        let allPokemon = [];
        let url = "https://pokeapi.co/api/v2/pokemon"; 

        while (url) {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch Pokemon data");
            }
            const data = await response.json();
            allPokemon = [...allPokemon, ...data.results];
            url = data.next; 
        }

     
        return allPokemon.map(pokemon => {
            const id = pokemon.url.split('/').filter(Boolean).pop();
            return { id, 
                name: pokemon.name, 
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,};
        });
    };

    return useQuery({
        queryKey: ['allPokemon'],
        queryFn: fetchAllPokemon,
        staleTime: 5 * 60 * 1000,
        cacheTime: 60 * 60 * 1000, 
    });
}

export default useAllPokemon;