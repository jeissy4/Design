import { Link } from 'react-router-dom';
import './Css/Header.css';

function Header() {
  return (
    <header>
      <h1>KADONGO DESIGNER</h1>
      <h3>Home of Beauty</h3>
      <nav>
        <ul className='nav-links'>
          <li><Link to="/">HOME</Link></li>
          

          {/* Dropdown starts here */}
          <li className="dropdown">
            <Link to="/admin">ADMIN</Link>
            <ul className="dropdown-content">
              <li><Link to = "/search">Search</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
