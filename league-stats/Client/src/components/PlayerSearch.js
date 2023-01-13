import { useState } from 'react';
import StatsBlock from './StatsBlock';


const PlayerSearch = () => {
    const [findPlayer, setFindPlayer] = useState('')
    const [playerName, setPlayerName] = useState(undefined);
    const [allStats, setAllStats] = useState(undefined);
    const [winStats, setWinStats] = useState(undefined);
    const [lossStats, setLossStats] = useState(undefined);
    const [wins, setWins] = useState(undefined);
    const [losses, setLosses] = useState(undefined);




    const handleSubmit = async (event) => {
        event.preventDefault(); // prevents refresh of the page with submit of the form
        const response = await fetch(`/api/${findPlayer}`)
        const json = await response.json()
        setPlayerName(json['playerName'])
        setAllStats(json['allAverage'])
        setWinStats(json['winAverage'])
        setLossStats(json['lossAverage'])
        setWins(json['wins'])
        setLosses(json['losses'])
        console.log(json)
        event.target.reset()
      }
    
    return (
      <div className='flex flex-col justify-start items-center w-full h-full'>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Find a player' onChange={(e) => setFindPlayer(e.target.value)}></input>
            <button type="submit">Search</button>
          </form>

          <h1>
            {playerName}
          </h1>

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