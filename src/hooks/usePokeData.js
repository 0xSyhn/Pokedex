import {useQuery} from '@tanstack/react-query'
import { useState } from 'react';

function usePokeData(number) {
    const [loadImage, setLoadImage] = useState(true)

    const fetchAPI = async (pokemonNumber) => {
         const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
         if(!response.ok){
            throw new Error("Failed to fetch data");
         }
         return response.json();
    };

    const{data, error, isLoading, isError} = useQuery({
        queryKey: ['pokemon', number],
        queryFn: () => fetchAPI(number),
        enabled: !!number,
        staleTime:5*60*1000,
        cacheTime:60*60*1000
    })

    const fetchedData = data ? {
        id: data.id,
        name: data.name,
        type: data.types.map(t => t.type.name),
        ability: data.abilities.map(a => a.ability.name),
        image: data.sprites?.other?.dream_world?.front_default,
        stat:{
            hp: data.stats.find(s => s.stat.name === 'hp')?.base_stat || 0,
            attack: data.stats.find(s => s.stat.name === 'attack')?.base_stat || 0,
            defense: data.stats.find(s => s.stat.name === 'defense')?.base_stat || 0,
            specialAttack: data.stats.find(s => s.stat.name === 'special-attack')?.base_stat || 0,
            specialDefense: data.stats.find(s => s.stat.name === 'special-defense')?.base_stat || 0,
            speed: data.stats.find(s => s.stat.name === 'speed')?.base_stat || 0,
        },
        color: data.types[0].type.name,
        cry: data.cries.latest,
    } : null
    
    return{ ...fetchedData, isLoading, isError, error, loadImage, setLoadImage}
} 

export default usePokeData