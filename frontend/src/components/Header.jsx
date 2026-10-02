import Logo from "../assets/logo.png";

import ProfilePreview from "./ProfilePreview"

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Header.css";

function header() {
    const id = localStorage.getItem("user")
    const navigate = useNavigate()

    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
        
    async function loadUser(url) {
        setLoading(true);
        setError("");
        
        try {
            const response = await fetch(url);

            if(!response.ok) {
                throw new Error("Error in fetching user.");
            }

            const data = await response.json();
            setProfile(data);
        } catch(error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function logout() {
        setError("")
        
        try {
            const response = await fetch("http://localhost:3000/api/logout");

            if(!response.ok) {
                throw new Error("Error in logging out.");
            }

            localStorage.removeItem("user");
            console.log("test");
            navigate("/")
        } catch(error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        loadUser(`http://localhost:3000/api/users/${id}`);
    }, [id]);
    
    return (
        <header className="header">
            { loading && <p>Loading...</p> }
            { error && !loading && <p>{ error }</p>}

            { !loading && !error && profile &&
                <div>
                    <div className="section">
                        <img className="logo" src={Logo} />
                        <h1>Exposure</h1>
                    </div>

                    <ProfilePreview className="ProfileHeader" key={profile.key} profile={profile} />
                    <button onClick={() => logout()}>Log-out</button>
                </div>
            }
        </header>
    );
}

export default header;