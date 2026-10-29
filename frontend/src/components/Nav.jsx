import { Link } from "react-router-dom";

import './Nav.css'

function Nav() {
    return (
        <nav className="nav fixed top-header bottom-0 left-0 z-40 flex w-nav flex-col py-6">
            <Link to="/home" className="link px-6 py-3">Home</Link>
            <Link to={`/profile/${localStorage.getItem("user")}`} className="link px-6 py-3">Profile</Link>
        </nav>
    );
}

export default Nav;