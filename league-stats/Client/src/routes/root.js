import Header from '../components/Header';
import PlayerSearch from '../components/PlayerSearch';

function Root() {
    return (
      <div className="App w-full">
        <Header
        page = "Home" 
        />
        <PlayerSearch />
      </div>
    );
  }
  
  export default Root;