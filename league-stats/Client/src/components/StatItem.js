

const StatItem = ({ statName, value }) => {
    return (
        <li>
            <span className='p-1 text-sm'>
                {statName}
            </span>
            <span className='p-1 text-sm'>
                {value}
            </span>
        </li>
    )
}

export default StatItem