import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const PlayerSearch = () => {
    const [findPlayer, setFindPlayer] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault(); // prevents refresh of the page with submit of the form
        navigate(`/player/${findPlayer}`)
        event.target.reset()
 
      }
    
    return (
      <div className='flex flex-col justify-center items-center w-1/3 h-full'>
          <form onSubmit={handleSubmit} className='w-full flex flex-row justify-start items-center'>
            <input className='ml-4 mr-2 block w-4/6 h-8 p-2 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 ' type="text" placeholder='Find a player' onChange={(e) => setFindPlayer(e.target.value)}></input>
            <button type="submit" className='w-1/3 border-transparent rounded-full bg-sky-400 h-8 hover:bg-sky-300 flex flex-row justify-center items-center text-md mr-2'>Search</button>
          </form>
      </div>
    )
  }
  
export default PlayerSearch