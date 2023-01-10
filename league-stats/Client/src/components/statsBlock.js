import StatCategory from './StatCategory';

const StatBlock = ({playerStats, header}) => {
    
    if(playerStats === undefined){
        return;
    }else{
        const sections = []

        for (let prop in playerStats){
            let category = prop;
            let stats = playerStats[prop];
    
            sections.push(
                <StatCategory
                    key = {category}
                    category = {category}
                    stats = {stats}
                />
            )
        }
    
    
    
        
        return (
            <section className='flex flex-col justify-start items-center w-11/12'>
                <h2 className='text-2xl'>
                    {header}
                </h2>
                <div className='flex flex-wrap flex-row justify-center items-start w-11/12'>
                    {sections}
                </div>
            </section>
        )
    }
    

}

export default StatBlock

//Next steps:
// Playerstats is being passed in as a prop to StatBlock. playerstats needs to be the returned json. use state to accept the json into a variable and then pass it into statBlock function?
// Need to update json stats object to organize by category, remove unnecessary values
