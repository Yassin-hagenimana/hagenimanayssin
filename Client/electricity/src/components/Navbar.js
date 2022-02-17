import React from 'react'
import{Link} from 'react-router-dom';
const NavBar = () => {
    return (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home" >Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup" >Signup</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link"  to="/login">Login</Link>
        </li>

        <li className="nav-item">
        <Link className="nav-link"  to="/dashboard">Dashboard</Link>
      </li>
      </ul>
    </div>
  </div>
</nav>

    )
}
export default NavBar
