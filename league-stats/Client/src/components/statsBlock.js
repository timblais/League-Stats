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
            <section>
                <h2>
                    {header}
                </h2>
                {sections}
            </section>
        )
    }
    

}

export default StatBlock

//Next steps:
// Playerstats is being passed in as a prop to StatBlock. playerstats needs to be the returned json. use state to accept the json into a variable and then pass it into statBlock function?
// Need to update json stats object to organize by category, remove unnecessary values
