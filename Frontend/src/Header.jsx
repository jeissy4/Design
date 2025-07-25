import { Link } from 'react-router-dom';
import './Css/Header.css';

function Header() {
  return (
    <header>
      <h1>KADONGO DESIGNER</h1>
      <h3>Home of Beauty</h3>
      <nav>
        <ul className='nav-links'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/registration">Registration</Link></li>

          {/* Dropdown starts here */}
          <li className="dropdown">
            <Link to="/visit">Visit</Link>
            <ul className="dropdown-content">
              <li><Link to="/admin">Admin</Link></li>
              <li><Link to = "/search">Search</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
