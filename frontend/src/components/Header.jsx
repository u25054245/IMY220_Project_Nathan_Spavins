import Logo from "../assets/logo.png";

import ProfilePreview from "./ProfilePreview"

import { profiles } from "../assets/dummyData";

import "./Header.css";

function header() {
    const profile = profiles.find(profile => profile.id === 1);
    
    return (
        <header className="header">
            <div className="section">
                <img className="logo" src={Logo} />
                <h1>Exposure</h1>
            </div>

            <ProfilePreview className="ProfileHeader" key={profile.key} profile={profile} />
        </header>
    );
}

export default header;