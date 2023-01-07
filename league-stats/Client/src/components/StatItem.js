

const StatItem = ({ statName, value }) => {
    return (
        <li>
            <span>
                {statName}
            </span>
            <span>
                {value}
            </span>
        </li>
    )
}

export default StatItem