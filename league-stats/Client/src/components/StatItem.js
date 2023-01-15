

const StatItem = ({ statName, value }) => {
    return (
        <li className="grid grid-cols-4">
            <span className='p-1 text-xs col-span-3'>
                {statName}
            </span>
            <span className='p-1 text-xs col-span-1'>
                {value}
            </span>
        </li>
    )
}

export default StatItem