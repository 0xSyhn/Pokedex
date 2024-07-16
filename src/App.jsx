import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Card from "./components/Card";
import CardBack from "./components/CardBack";
import Logo from "./components/Logo";
import Search from "./components/Search";
import usePokeData from "./hooks/usePokeData";
import { useCallback, useEffect, useState } from 'react'
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { debounceFunction, elements } from "./components/utils";


const queryClient = new QueryClient()

const AppContent = () => {
 
  const [pokemonNumber, setPokemonNumber] = useState(1);
  const [isFlipped, setIsFlipped] = useState(false);

  const { isLoading, isError ,type} = usePokeData(pokemonNumber);


  const toggleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleNavigation = (newNumber) => {
    setPokemonNumber(newNumber);
  }

  const prev =useCallback(debounceFunction(()=>{
    handleNavigation(pokemonNumber - 1)
  },300),[pokemonNumber]) 

  const next = useCallback(debounceFunction(()=>{
    handleNavigation(pokemonNumber + 1)
  },300),[pokemonNumber])   
  
  
  const getLinearGradient = (types) => {
    if (!types || types.length === 0) return "#A8A77A";
    if (types.length === 1) {
      return `linear-gradient(80deg, ${elements[types[0].toLowerCase()]}, #fff)`
    } else if (types.length > 1) {
      const color1 = elements[types[0].toLowerCase()];
      const color2 = elements[types[1].toLowerCase()];
      return `linear-gradient(80deg, ${color1}, ${color2})`;
    }
    return "#A8A77A"; 
  };

  const background = getLinearGradient(type)


  useEffect(() => {
    setIsFlipped(false);
  }, [pokemonNumber]);
 
  return (
    <div className="relative flex justify-center items-center h-screen w-screen flex-col" style={{background: background}}>
      <div className="absolute top-4 md:left-32 md:right-auto right-1/2 translate-x-1/2">
        <Logo/>
      </div>
      <div className="absolute md:top-4 top-16 right-1/2 md:right-56 translate-x-1/2">
        <Search pokemonNumber={pokemonNumber} setPokemonNumber={setPokemonNumber} />
      </div>
      <div className={`flex ${pokemonNumber == 1? "justify-end" : "justify-between"} md:w-[50%] w-screen absolute p-3`}>
        {pokemonNumber == 1 ? "" : <button onClick={prev}><MdKeyboardDoubleArrowLeft className="md:size-14 size-7"/></button>}
        <button onClick={next}><MdKeyboardDoubleArrowRight className="md:size-14 size-7"/></button>
      </div>
      {isLoading ? (
        <div className='spinner translate-x-1/2'></div>
      ) : isError ? (
        <div>Error loading Pokemon data</div>
      ) : (
        <div className="card-container" onClick={toggleFlip}>
          <div className={`card-custom ${isFlipped ? 'flipped' : ''}`}>
            {isFlipped ? (
              <div className="card-custom card-back">
                <CardBack pokemonNumber={pokemonNumber} />
              </div>
            ) : (
              <div className="card-custom">
                <Card pokemonNumber={pokemonNumber} />
              </div>
            )}
          </div>
        </div>
      )}
      <div className="absolute bottom-14">
        <h1 className="text-gray-700 font-medium">Tap to flip</h1>
      </div>
    </div>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  )
}

export default App;