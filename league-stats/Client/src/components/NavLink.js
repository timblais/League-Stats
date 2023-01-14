import { Link } from "react-router-dom"

const NavLink = ({ text, link }) => {
    const url = `/${link}`
    
    return (
      <span>
        <Link to={url}>
          {text}
        </Link>
      </span>
    )
  }
  
  export default NavLink