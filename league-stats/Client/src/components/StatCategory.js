import StatItem from '../components/StatItem';

const StatCategory = ({ category, stats }) => {
    const listItems = []
    for (let prop in stats){
        let statName = prop;
        let val = stats[prop];

        listItems.push(
            <StatItem
                key = {statName}
                statName = {statName}
                value = {val}
            />
        )

    }
    
    return (
        <section>
            <h3>
                {category}
            </h3>
            <ul>
                {listItems}
            </ul>
            
        </section>

    )
}

export default StatCategory