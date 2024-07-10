
import usePokeData from '../hooks/usePokeData';
import { useState,useEffect } from 'react';
import {elements,progressBar} from './utils';

function CardBack({pokemonNumber}) {
   
    const {id,image, type, stat } = usePokeData(pokemonNumber);
    const [fade, setFade] = useState(false);

   
    const cardColor = type.length>0? elements[type[0].toLowerCase()]:"#A8A77A";

      useEffect(()=>{
        setFade(true);
        const timeout = setTimeout(()=> setFade(false),500)
        return ()=> clearTimeout(timeout);
      },[pokemonNumber]);

    return (
        <div className={`bg-green-300 m-24 max-h-svh w-80 p-7 rounded-3xl 
        transform transition duration-300 hover:scale-105 card cursor-pointer ${fade?'fade':''}`} style={{backgroundColor:cardColor}}>
            {id ? (
                <div>
                    <div className='flex items-center justify-center '>
                        <img src={image} alt={name}/>
                    </div>
                    <div className='p-1 font-sans font-medium text-left'>
                        <p className='font-bold'>Base Stats:</p>
                        <ul>
                        <div className='text-left' >
                            <li className='flex text-sm m-1'>
                                <span className='w-full'>HP:</span> 
                                <div className='w-full ml-3'>
                                   <div style={progressBar(stat.hp)} className='items-center' ></div>
                                </div>
                            </li>
                            <li className='flex text-sm m-1'>
                                <span className='w-full'>Attack:</span>
                                <div className='w-full ml-3'>
                                   <div style={progressBar(stat.attack)} ></div>
                                </div>
                            </li>
                            <li className='flex text-sm m-1'>
                                <span className='w-full'>Defense:</span>
                                <div className='w-full ml-3'>
                                <div style={progressBar(stat.defense)}></div>
                                </div>
                            </li>
                            <li className='flex text-sm m-1'>
                                <span className='w-full'>Special Attack:</span>
                                <div className='w-full ml-3 '> 
                                <div style={progressBar(stat.specialAttack)} ></div>
                                </div>
                            </li>
                            <li className='flex text-sm m-1'>
                            <span className='w-full'>Special Defense:</span>
                                <div className='w-full ml-3'>
                                <div style={progressBar(stat.specialDefense)} ></div>
                                </div>
                            </li>
                            <li className='flex text-sm m-1'>
                            <span className='w-full'>Speed:</span>
                                <div className='w-full ml-3'>
                                <div style={progressBar(stat.speed)} ></div>
                                </div>
                            </li>
                            </div>
                        </ul>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default CardBack;
