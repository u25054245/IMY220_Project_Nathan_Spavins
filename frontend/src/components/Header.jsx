import Logo from "../assets/logo.png";

import ProfilePreview from "./ProfilePreview"

import "./Header.css";

function header() {
    return (
        <header className="header">
            <div className="section">
                <img className="logo" src={Logo} />
                <h1>Exposure</h1>
            </div>

            <ProfilePreview className="ProfileHeader" />
        </header>
    );
}

export default header;