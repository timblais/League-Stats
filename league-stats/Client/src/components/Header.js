import Nav from '../components/Nav'
import PlayerSearch from './PlayerSearch'

const Header = ({ page }) => {
  
  if(page === 'Home'){
    return (
      <header>
          <Nav />
          <h1>League of Legends Summoner Stats</h1>
      </header>
    )
  }else{
    return (
      <header>
          <Nav />
          <h1>League of Legends Summoner Stats</h1>
          <PlayerSearch />
      </header>
    )
  }
  

}

export default Header