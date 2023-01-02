import { useState } from 'react';


const PlayerSearch = () => {
    const [playerName, setPlayerName] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault(); // prevents refresh of the page with submit of the form
        const response = await fetch(`/api/${playerName}`)
        const json = await response.json()
        console.log(json)
      }
    
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="find a player" value={playerName} onChange={(e) => setPlayerName(e.target.value)}></input>
        <button type="submit">Search</button>
      </form>
    )
  }
  
  export default PlayerSearch