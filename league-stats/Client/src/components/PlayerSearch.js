import { useState } from 'react';
import StatsBlock from './StatsBlock';


const PlayerSearch = () => {
    const [playerName, setPlayerName] = useState("");
    const [allStats, setAllStats] = useState(undefined);
    const [winStats, setWinStats] = useState(undefined);
    const [lossStats, setLossStats] = useState(undefined);
    const [wins, setWins] = useState(undefined);
    const [losses, setLosses] = useState(undefined);


    const handleSubmit = async (event) => {
        event.preventDefault(); // prevents refresh of the page with submit of the form
        const response = await fetch(`/api/${playerName}`)
        const json = await response.json()
        setAllStats(json['allAverage'])
        setWinStats(json['winAverage'])
        setLossStats(json['lossAverage'])
        setWins(json['wins'])
        setLosses(json['losses'])
        console.log(json)
      }
    
    return (
      <div>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="find a player" value={playerName} onChange={(e) => setPlayerName(e.target.value)}></input>
            <button type="submit">Search</button>
          </form>

          <StatsBlock 
              key = {`${playerName}All`}
              header = {`${wins + losses} Game Average`}
              playerStats = {allStats} 
          />
          <StatsBlock 
              key = {`${playerName}Wins`}
              header = {`${wins} Win Average`}
              playerStats = {winStats} 
          />
          <StatsBlock 
              key = {`${playerName}Losses`}
              header = {`${losses} Loss Average`}
              playerStats = {lossStats} 
          />
      </div>


    )
  }
  
  export default PlayerSearch