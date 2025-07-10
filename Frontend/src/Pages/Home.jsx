import React from 'react';
import Dresses from '../Images/dress.jpeg';
import Skirts from '../Images/skirt.jpeg';  
import Suits from '../Images/suit.jpeg';
import Blouses from '../Images/blouse.jpeg';
import Tops from '../Images/tops.jpeg';
import TShirts from '../Images/tShirt.jpeg';
import Shirts from '../Images/shirt.jpeg';
import Coats from '../Images/coat.jpeg';
import Trousers from '../Images/trouser.jpeg';
import KidsWear from '../Images/kids.jpeg';
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/Home.css'; 

function Home() {
    return (
        <div className="main-content">
        <div className="home">
            <p>
                <b>Welcome to Kadongo Designer, your ultimate destination for beauty and style!</b><br /> 
                At Kadongo, we specialize in fashion, design, and tailoring, offering a unique blend of contemporary and traditional styles to suit every occasion. <br />
                Our skilled designers and tailors are dedicated to bringing your vision to life, ensuring that each piece is crafted with precision and care.<br />
                Whether you're looking for a stunning outfit for a special event or a stylish everyday look, Kadongo Designer is here to help you express your individuality and enhance your beauty.<br />
                Visit us today and experience the art of fashion tailored just for you!
            </p>

            <div className="card-container">
                <div className="card">
                    <a href="https://www.pinterest.com/search/pins/?q=Kitenge%20designs%20dresses" target="_blank" rel="noopener noreferrer">
                        <img src={Dresses} alt="Dresses" />
                        <h3>Dresses</h3>
                    </a>
                </div>
                <div className="card">
                    <a href="https://www.pinterest.com/search/pins/?q=kitenge%20skirts%20designs" target="_blank" rel="noopener noreferrer">
                        <img src={Skirts} alt="Skirts" />
                        <h3>Skirts</h3>
                    </a>
                </div>
                <div className="card">
                    <a href="https://www.pinterest.com/search/pins/?q=suits%20for%20both%20men%20and%20women" target="_blank" rel="noopener noreferrer">
                        <img src={Suits} alt="Suits" />
                        <h3>Suits</h3>
                    </a>
                </div>
                <div className="card">
                    <a href="https://www.pinterest.com/search/pins/?q=blouses%20designs%20latest" target="_blank" rel="noopener noreferrer">
                        <img src={Blouses} alt="Blouses" />
                        <h3>Blouses</h3>
                    </a>
                </div>
                <div className="card">
                    <a href="https://www.pinterest.com/search/pins/?q=tops%20designs" target="_blank" rel="noopener noreferrer">
                        <img src={Tops} alt="Tops" />
                        <h3>Tops</h3>
                    </a>
                </div>
                <div className="card">
                    <a href="https://www.pinterest.com/search/pins/?q=tshirt%20design%20ideas%20for%20men" target="_blank" rel="noopener noreferrer">
                        <img src={TShirts} alt="T-Shirts" />
                        <h3>T-Shirts</h3>
                    </a>
                </div>
                <div className="card">
                    <a href="https://www.pinterest.com/search/pins/?q=shirt%20for%20boys%2C%20men%2C%20women%20ladies" target="_blank" rel="noopener noreferrer">
                        <img src={Shirts} alt="Shirts" />
                        <h3>Shirts</h3>
                    </a>
                </div>
                <div className="card">
                    <a href="https://www.pinterest.com/search/pins/?q=coats%20for%20men%20and%20women" target="_blank" rel="noopener noreferrer">
                        <img src={Coats} alt="Coats" />
                        <h3>Coats</h3>
                    </a>
                </div>
                <div className="card">
                    <a href="https://www.pinterest.com/search/pins/?q=trousers%20design" target="_blank" rel="noopener noreferrer">
                        <img src={Trousers} alt="Trousers" />
                        <h3>Trousers</h3>
                    </a>
                </div>
                <div className="card">
                    <a href="https://www.pinterest.com/search/pins/?q=kids%20wear%20kitenge" target="_blank" rel="noopener noreferrer">
                        <img src={KidsWear} alt="Kids Wear" />
                        <h3>Kids Wear</h3>
                    </a>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Home;
