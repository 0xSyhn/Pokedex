import { useEffect, useState } from 'react';
import usePokeData from '../hooks/usePokeData';
import { elements } from './utils';
import SkeletonLoader from './SkeletonLoader';
import { PiSpeakerSimpleHighFill } from "react-icons/pi";
import { PiSpeakerSimpleSlashFill } from "react-icons/pi";


function Card({pokemonNumber, setPokemonNumber}) {
    
    const { id, name, type, ability, image,cry, isLoading, isError, loadImage, setLoadImage } = usePokeData(pokemonNumber);
    const [fade, setFade] = useState(false);
    const [speakerIsActive, setSpeakerIsActive] = useState(false)

    const capitalize = (string) =>{
      return string.charAt(0).toUpperCase()+string.slice(1);
    }

    const handleSpeakerClick = (e) => {
        e.stopPropagation();
        if(!speakerIsActive){
            const audio = new Audio(cry);
            audio.onplay = () =>{
                setSpeakerIsActive(true)
            }
            audio.onended = () => {
                setSpeakerIsActive(false)
            }
            audio.play().catch(error => console.error("Error playing the audio: ",error));
            
        }
    }
    
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
        <div className={`m-0 z-0 relative  max-h-svh md:w-80 w-64 p-6 rounded-3xl 
        transform transition duration-300 hover:scale-105 card cursor-pointer ${fade?'fade':''}`} style={{backgroundColor:cardColor}}>
        
            {id ? (
                <div>
                    <div className='absolute right-2'>
                    {speakerIsActive? <PiSpeakerSimpleHighFill 
                    className='w-20'
                    onClick={handleSpeakerClick}
                     /> : <PiSpeakerSimpleSlashFill 
                     className='w-20'
                     onClick={handleSpeakerClick} 
                     />}
                    </div>
                    <div className='flex items-center justify-center h-auto aspect-[1] '>
                    {loadImage && <SkeletonLoader/> }
                        <img
                         src={image}
                          alt={name}
                          style={{display: loadImage? 'none': 'block', height:"15rem" , width:"auto"}}
                          onLoad={() => setLoadImage(false)}
                          />
                    </div>
                    <div className='p-5 font-sans font-medium text-center'>
                        <p className='mt-3 font-bold text-2xl'>{capitalize(name)}</p>
                        <p className='mt-1'>Type: {type.join(', ')}</p>
                        <p>Abilities: {ability.join(', ')}</p>
                    </div>
                </div>
            ) : (
                <div className='spinner '></div>
            )}
        </div>
        
    );
}

export default Card;
