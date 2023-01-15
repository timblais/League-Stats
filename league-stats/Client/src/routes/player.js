import { useState } from 'react';
import { useParams } from 'react-router-dom';
import StatsBlock from '../components/StatsBlock';
import Header from '../components/Header';


const Player = () => {
    
    const { playerSearched } =  useParams()

    console.log(playerSearched)
    
    const [playerName, setPlayerName] = useState(null);
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
            setPlayerName(json['playerName'])
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

    
    return (
      <div>
        <Header />
        <div className='flex flex-col justify-start items-center w-full'>

                <h1 className='text-2xl font-bold mt-5'>
                    {playerName}
                </h1>

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
      </div>
      



    )
  }
  
  export default Player