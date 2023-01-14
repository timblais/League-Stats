import Nav from '../components/Nav'
import PlayerSearch from './PlayerSearch'

const Header = ({ page }) => {
  
  if(page === 'Home'){
    return (
      <header className='flex flex-row justify-start items-center h-14 border-b-4'>
          <Nav />
          <h1 className='w-2/6 text-center text-2xl'>League of Legends Player Stats</h1>
      </header>
    )
  }else{
    return (
      <header className='flex flex-row justify-start items-center h-14 border-b-4'>
          <Nav />
          <h1 className='w-2/6 text-center text-2xl'>League of Legends Player Stats</h1>
          <PlayerSearch />
      </header>
    )
  }
  

}

export default Header