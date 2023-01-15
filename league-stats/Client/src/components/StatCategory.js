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
        <section className='flex flex-col justify-start items-center w-1/5'>
            <h3 className='text-lg mb-2'>
                {category}
            </h3>
            <ul>
                {listItems}
            </ul>
            
        </section>

    )
}

export default StatCategory