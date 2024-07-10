import Card from "./components/Card";
import CardBack from "./components/CardBack";
import Logo from "./components/Logo";
import Search from "./components/Search";
import usePokeData from "./hooks/usePokeData";
import { useState } from 'react'
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";




const App = () => {

  const [pokemonNumber, setPokemonNumber] = useState(1);
  const [isFlipped, setIsFlipped] = useState(false);

  const{type} = usePokeData(pokemonNumber)

  const toggleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const prev = () =>{
    setPokemonNumber(pokemonNumber-1)
  }

  const next = ()=>{
    setPokemonNumber(pokemonNumber+1)
  }
  
  const getLinearGradient = (types) => {
    const elements = {
        normal: "#A8A77A",
        fire: "#EE8130",
        water: "#6390F0",
        electric: "#F7D02C",
        grass: "#7AC74C",
        ice: "#96D9D6",
        fighting: "#C22E28",
        poison: "#A33EA1",
        ground: "#E2BF65",
        flying: "#A98FF3",
        psychic: "#F95587",
        bug: "#A6B91A",
        rock: "#B6A136",
        ghost: "#735797",
        dragon: "#6F35FC",
        dark: "#705746",
        steel: "#B7B7CE",
        fairy: "#D685AD"
    };

    if (types.length === 1) {
        return`linear-gradient(80deg, ${elements[types[0].toLowerCase()]}, #fff)`
    } else if (types.length > 1) {
        const color1 = elements[types[0].toLowerCase()];
        const color2 = elements[types[1].toLowerCase()];
        return `linear-gradient(80deg, ${color1}, ${color2})`;
    }
    return "#A8A77A"; 
};

const background = getLinearGradient(type)
 
  return (
    <>  
    <div className=" relative flex justify-center items-center h-screen" style={{background: background}}>
    <div className="absolute top-4 left-32 w-20">
      <Logo/>
    </div>
    <div className="absolute top-4 right-56 w-20">
    <Search pokemonNumber={pokemonNumber} setPokemonNumber={setPokemonNumber} />
    </div>
    <div className="mr-20">
    {pokemonNumber == 1 ? "":<button onClick={prev}><MdKeyboardDoubleArrowLeft className="size-14"/></button>}
    </div>
      <div className="card-container" onClick={toggleFlip}>
        <div className={`card-custom ${isFlipped ? 'flipped' : ''}`}>
          {isFlipped ? (
            <div className="card-custom card-back">
              <CardBack pokemonNumber={pokemonNumber} setPokemonNumber={setPokemonNumber} />
            </div>
          ) : (
            <div className="card-custom">
              <Card pokemonNumber={pokemonNumber} setPokemonNumber={setPokemonNumber} />
            </div>
          )}
        </div>
      </div>
      <div className="ml-20">
      <button onClick={next}><MdKeyboardDoubleArrowRight className="size-14"/></button>
    </div>
    </div>
    </>
  );
}

export default App;