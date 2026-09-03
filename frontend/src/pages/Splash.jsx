import {useState} from "react";
import splashImg from "../assets/SplashImg.png";

import Login from "../components/Login";
import Signup from "../components/Signup";

import "./Splash.css";

function Splash() {
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);
    
    return (
        <div className="splash">
            <img className="backgroundImg" src={splashImg}/>

            <div className="splashContent">
                <h1>EXPOSURE</h1>
                <h2>Give your friends some exposure<br/>Share your photos today</h2>

                <button className="Sign-up" onClick={() => {setSignup(true); setLogin(false);}}>Sign Up</button>
                <button className="Log-in" onClick={() => {setLogin(true); setSignup(false);}}>Log in</button>
            </div>

            {login && <Login />}
            {signup && <Signup />}
        </div>
    );
}

export default Splash;