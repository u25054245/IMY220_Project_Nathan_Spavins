import {useState} from "react";
import splashImg from "../assets/SplashImg.png";

import Login from "../components/Login";
import Signup from "../components/Signup";

import "./Splash.css";

function Splash() {
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);
    
    return (
        <div className="splash relative isolate flex min-h-screen flex-col items-center justify-center gap-8 px-5 py-12 text-centre">
            <img className="backgroundImg fixed inset-0 -z-10 size-full object-cover" src={splashImg}/>

            <div className="splashContent flex flex-col items-center gap-3">
                <h1>EXPOSURE</h1>
                <h2 className="mt-2 mb-7 text-center">Give your friends some exposure<br/>Share your photos today</h2>

                <div className="flex justify-center gap-3">
                    <button className="Sign-up px-8 py-3" onClick={() => {setSignup(true); setLogin(false);}}>Sign Up</button>
                    <button className="Log-in btn-light px-8 py-3" onClick={() => {setLogin(true); setSignup(false);}}>Log in</button>
                </div>
            </div>

            {login && <Login />}
            {signup && <Signup />}
        </div>
    );
}

export default Splash;