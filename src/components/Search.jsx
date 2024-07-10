import {useState} from 'react'

function Search({pokemonNumber,setPokemonNumber}) {
    const [searchQuery, setSearchQuery] = useState("")
    const [text,setText] = useState("Search")

    const handleSearch = async (e) => {
        e.preventDefault();
        const query = isNaN(searchQuery)? `${searchQuery.toLowerCase()}`:`${searchQuery}`;
        await fetchPokemon(query);
    }

    const fetchPokemon = async(query) => {
        try{
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
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
      setSearchQuery(e.target.value)
      

    }

    const handleKeyPress = async (e) => {
      if (e.key === 'Enter') {
        const query = isNaN(searchQuery)? `${searchQuery.toLowerCase()}`:`${searchQuery}`;
        await fetchPokemon(query);
        setSearchQuery('');
        setText("Search");
      }
    };
  


  return (
    <>
    <form onSubmit={handleSearch} className='flex'>
         <input
                type="text"
                className='bg-transparent text-black placeholder-black border-1 w-80 border border-solid 
                rounded-3xl border-black p-2 
                text-center'
                value={searchQuery}
                id="pokemonNumber"
                placeholder={text}
                onChange= {handleChange}
                onKeyPress={handleKeyPress}
            />
           
            </form>
    </>
  )
}

export default Search