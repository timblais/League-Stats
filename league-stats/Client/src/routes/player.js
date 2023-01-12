import { useState } from 'react';
import { useParams } from 'react-router-dom';
import StatsBlock from '../components/StatsBlock';


const Player = () => {
    
    const { playerSearched } =  useParams()

    console.log(playerSearched)
    
    // const [playerName, setPlayerName] = useState("");
    const [allStats, setAllStats] = useState(undefined);
    const [winStats, setWinStats] = useState(undefined);
    const [lossStats, setLossStats] = useState(undefined);
    const [wins, setWins] = useState(undefined);
    const [losses, setLosses] = useState(undefined);


    const getPlayer = async (player) => {
        try {
            console.log('getplayer started')
            console.log(`I have ${player}`)
            const response = await fetch(`/api/${player}`)
            const json = await response.json()
            setAllStats(json['allAverage'])
            setWinStats(json['winAverage'])
            setLossStats(json['lossAverage'])
            setWins(json['wins'])
            setLosses(json['losses'])
            console.log(json)
        } catch (error) {
            console.log(error)
        }
    }

    getPlayer(playerSearched)

    // const handleSubmit = async (event) => {
    //     event.preventDefault(); // prevents refresh of the page with submit of the form
    //     const response = await fetch(`/api/${playerName}`)
    //     const json = await response.json()
    //     setAllStats(json['allAverage'])
    //     setWinStats(json['winAverage'])
    //     setLossStats(json['lossAverage'])
    //     setWins(json['wins'])
    //     setLosses(json['losses'])
    //     console.log(json)
    //   }
    
    return (
      <div className='flex flex-col justify-start items-center w-full'>

          <StatsBlock 
              key = {`${playerSearched}All`}
              header = {`${wins + losses} Game Average`}
              playerStats = {allStats} 
          />
          <StatsBlock 
              key = {`${playerSearched}Wins`}
              header = {`${wins} Win Average`}
              playerStats = {winStats} 
          />
          <StatsBlock 
              key = {`${playerSearched}Losses`}
              header = {`${losses} Loss Average`}
              playerStats = {lossStats} 
          />
      </div>


    )
  }
  
  export default Player