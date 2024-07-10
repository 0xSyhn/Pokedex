import React, { useEffect, useState } from 'react';
import usePokeData from '../hooks/usePokeData';
import { elements } from './utils';

function Card({pokemonNumber, setPokemonNumber}) {
    
    const { id, name, type, ability, image } = usePokeData(pokemonNumber);
    const [fade, setFade] = useState(false);

    const capitalize = (string) =>{
      return string.charAt(0).toUpperCase()+string.slice(1);
    }
    
    const cardColor = type.length>0? elements[type[0].toLowerCase()]:"#A8A77A";

      
    useEffect(()=>{
        setFade(true);
        const timeout = setTimeout(()=> setFade(false),500)
        return ()=> clearTimeout(timeout);
      },[pokemonNumber]);

    return (
        <div className={`bg-green-300 m-24 max-h-svh w-80 p-6 rounded-3xl 
        transform transition duration-300 hover:scale-105 card cursor-pointer ${fade?'fade':''}`} style={{backgroundColor:cardColor}}>

            {id ? (
                <div>
                    <div className='flex items-center justify-center '>
                        <img src={image} alt={name}/>
                    </div>
                    <div className='p-5 font-sans font-medium text-center'>
                        <p className='mt-3 font-bold text-2xl'>{capitalize(name)}</p>
                        <p className='mt-1'>Type: {type.join(', ')}</p>
                        <p>Abilities: {ability.join(', ')}</p>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
        
    );
}

export default Card;
