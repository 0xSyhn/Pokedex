import { useEffect, useState } from 'react'

function usePokeData(number) {
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [type, setType] = useState([])
    const [ability, setAbility] = useState([])
    const [image, setImage] = useState();
    const [stat, setStat] = useState({
        hp: 0,
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0
    });
    const [color, setColor] = useState("")
    

   

    useEffect(()=>{
        const fetchAPI = async () =>{
            try{
                let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                response = await response.json();
                setId(response.id)
                setName(response.name)
                setType(response.types.map(t => t.type.name))
                setAbility(response.abilities.map(a => a.ability.name))
                setImage(response.sprites.other.dream_world.front_default)
                
                const baseStats = {};
                response.stats.forEach(stat =>{
                    baseStats[stat.stat.name] = stat.base_stat;
                })

                setStat({
                    hp : baseStats['hp'],
                    attack: baseStats['attack'],
                    defense: baseStats['defense'],
                    specialAttack: baseStats['special-attack'],
                    specialDefense: baseStats['special-defense'],
                    speed: baseStats['speed']

                })
                setColor(response.types[0].type.name)
                
            }
            catch(error){
                console.error('Error fetching data:', error);
                setId(null);
                setName("Error");
                setType([]);
                setAbility([]);
                setImage('');
                setStat({
                    hp: 0,
                    attack: 0,
                    defense: 0,
                    specialAttack: 0,
                    specialDefense: 0,
                    speed: 0
                });
                setColor('')
            }
        }   
        if (number) {
            fetchAPI();
        }
     
    },[number])

    return { id, name, type, ability,image, stat,color };
 
}

export default usePokeData