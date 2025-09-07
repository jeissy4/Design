import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Css/Admin.css'; 


function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  
  const ADMIN_USERNAME = 'Kadongo';
  const ADMIN_PASSWORD = 'Kadongo123';

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  if (!loggedIn) {

    return (
      <div className='main-content'>
      <div className='admin'>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username: </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
      </div>
    );
  }
   
  return (
    <div className='main-content'>
     <div>
       <h2>Admin Page</h2>
       <p>Welcome to master's page 😊</p>
     <nav>
         <ul className="nav-links">
    
           <li>
             <Link to="/registration">REGISTRATION</Link>
             <Link to="/visit">VISIT</Link>
             <Link to="/finance">FINANCE</Link>
           </li>
          
         </ul>
       </nav>
     </div>
     </div>
   );
}

export default Admin;
