import Logo from "../assets/logo.png";
import ProfilePic from "../assets/profilePic.png";

import "./Header.css";

function header() {
    return (
        <header className="header">
            <div className="section">
                <img className="logo" src={Logo} />
                <h1>Exposure</h1>
            </div>

            <div className="section">
                <img className="profilePic" src={ProfilePic} />
                <h1>Profile Name</h1>
            </div>
        </header>
    );
}

export default header;