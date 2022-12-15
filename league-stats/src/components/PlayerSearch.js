import { useState } from 'react';

const PlayerSearch = () => {
    const [playerName, setPlayerName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`The name you entered was: ${playerName}`)
      }
    
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="find a player" value={playerName} onChange={(e) => setPlayerName(e.target.value)}></input>
        <button type="submit">Search</button>
      </form>
    )
  }
  
  export default PlayerSearch