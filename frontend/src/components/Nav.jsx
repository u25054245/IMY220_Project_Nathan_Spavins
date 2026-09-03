import { Link } from "react-router-dom";

import './Nav.css'

function Nav() {
    return (
        <nav className="nav">
            <Link to="/home" className="link">Home</Link>
            <Link to="/profile/1" className="link">Profile</Link>
        </nav>
    );
}

export default Nav;