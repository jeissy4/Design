import {Link} from 'react-router-dom';
import './Css/Header.css';
function Header(){
    return(
        <header>
            <h1>KADONGO DESIGNER</h1>
            <h3>Home of Beauty</h3>
           <nav>
                <ul className='nav-links'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/registration">Registration</Link></li>
                    <li><Link to="/visit">Visit</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                </ul>
            </nav>
            

        </header>
    )
}
export default Header;