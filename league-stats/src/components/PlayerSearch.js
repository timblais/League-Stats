import { useState } from 'react';


const PlayerSearch = () => {
    const [playerName, setPlayerName] = useState("");
    const lolAPIKey = process.env.REACT_APP_LOL_API

    const handleSubmit = async (event) => {
        event.preventDefault(); // prevents refresh of the page with submit of the form
        const response = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${playerName}?${process.env.REACT_APP_LOL_API}`)
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