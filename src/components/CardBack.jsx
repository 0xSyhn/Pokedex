
import usePokeData from '../hooks/usePokeData';
import { useState,useEffect } from 'react';
import {elements,progressBar} from './utils';
import SkeletonLoader from './SkeletonLoader';

function CardBack({pokemonNumber}) {
   
    const {id,image, type, stat, isLoading, isError, loadImage, setLoadImage } = usePokeData(pokemonNumber);
    const [fade, setFade] = useState(false);

   
    const cardColor = type.length>0? elements[type[0].toLowerCase()]:"#A8A77A";

      useEffect(()=>{
        setFade(true);
        const timeout = setTimeout(()=> setFade(false),500)
        return ()=> clearTimeout(timeout);
      },[pokemonNumber]);

      if (isLoading) {
        return (
            <div className="bg-green-300 m-0 max-h-svh md:w-80 w-64 p-7 rounded-3xl transform transition duration-300 hover:scale-105 card cursor-pointer" style={{ backgroundColor: cardColor }}>
                <div className='spinner'></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-red-300 m-0 max-h-svh md:w-80 w-64 p-7 rounded-3xl transform transition duration-300 hover:scale-105 card cursor-pointer">
                Error loading Pokemon data
            </div>
        );
    }

    return (
        <div className={` m-0 max-h-svh md:w-80 w-64   p-7 rounded-3xl 
        transform transition duration-300 hover:scale-105 card cursor-pointer ${fade?'fade':''}`} style={{backgroundColor:cardColor}}>
            {id ? (
                <div>
                    <div className='flex items-center justify-center h-auto aspect-[1] '>
                    {loadImage && <SkeletonLoader/> }
                        <img
                         src={image}
                          alt={name}
                          style={{display: loadImage? 'none': 'block', height:"15rem" , width:"auto"}}
                          onLoad={() => setLoadImage(false)}
                          />
                    </div>
                    <div className='p-1 font-sans font-medium text-left '>
                        <p className='font-bold'>Base Stats:</p>
                        <ul>
                        <div className=' grid grid-cols-2 text-[0.7rem] md:text-[0.9rem]'>
                            <p className='whitespace-nowrap'>Hp:</p>
                            <div className='place-self-start justify-center '  style={progressBar(stat.hp)}/>
                        
                            <p className='whitespace-nowrap'>Attack:</p>
                            <div className='place-self-start justify-center'  style={progressBar(stat.attack)}/>
                        
                            <p className='whitespace-nowrap '>Defence:</p>
                            <div className='place-self-start justify-center '  style={progressBar(stat.defense)}/>
                        
                            <p className='whitespace-nowrap'>Special Attack:</p>
                            <div className='place-self-start justify-center'  style={progressBar(stat.specialAttack)}/>
                        
                            <p className='whitespace-nowrap'>Special Defence:</p>
                            <div className='place-self-start justify-center'  style={progressBar(stat.specialDefense)}/>
                        
                            <p className='whitespace-nowrap'>Speed:</p>
                            <div className='place-self-start justify-center'  style={progressBar(stat.speed)}/>
                        </div>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className='spinner translate-x-1/2'></div>
            )}
        </div>
    );
}

export default CardBack;
