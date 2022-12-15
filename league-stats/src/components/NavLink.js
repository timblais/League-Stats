const NavLink = ({ text }) => {
    const link = `/${text}`
    
    return (
      <a href={link}>
          {text}
      </a>
    )
  }
  
  export default NavLink