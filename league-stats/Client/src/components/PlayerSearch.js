import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const PlayerSearch = () => {
    const [findPlayer, setFindPlayer] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault(); // prevents refresh of the page with submit of the form
        navigate(`/player/${findPlayer}`)
 
      }
    
    return (
      <div className='flex flex-col justify-start items-center w-full h-full'>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Find a player' onChange={(e) => setFindPlayer(e.target.value)}></input>
            <button type="submit">Search</button>
          </form>
      </div>
    )
  }
  
export default PlayerSearch