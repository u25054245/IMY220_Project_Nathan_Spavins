import { useState } from "react";
 
import Login from "../components/Login";
 
import "./Splash.css";
 
function Splash() {
    const [login, setLogin] = useState(false);
 
    return (
        <div className="splash">
            <div className="splashContent">
                <h1>EXPOSURE</h1>
 
                <div className="splashFoot">
                    <h2>Give your friends some exposure. Share your photos today.</h2>
 
                    <div className="splashActions">
                        <button className="splashBtn splashBtn--primary">Sign up</button>
                        <button className="splashBtn splashBtn--ghost" onClick={() => setLogin(true)}> Log in </button>
                    </div>
                </div>
            </div>
 
            {login && (
                <div className="splashModal" onClick={() => setLogin(false)}>
                    <div className="splashPanel" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="splashClose"
                            aria-label="Close log in"
                            onClick={() => setLogin(false)}
                        >
                            &times;
                        </button>
 
                        <Login />
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default Splash;