import Header from '../components/Header';
import PlayerSearch from '../components/PlayerSearch';

function Root() {
    return (
      <div className="App w-full">
        <Header
        page = "Home" 
        />
        <div className='flex flex-col justify-center items-center h-96 max-h-screen w-full'>
          <PlayerSearch />
        </div>

      </div>
    );
  }
  
  export default Root;