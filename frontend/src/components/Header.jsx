import Logo from "../assets/logo.png";

import ProfilePreview from "./ProfilePreview"

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Header.css";

function header({ Tprofile, setTProfile }) {
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

    async function deleteUser() {
        setError("")

        try {
            const response = await fetch(`http://localhost:3000/api/users/${localStorage.getItem("user")}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if(!response.ok) {
                throw new Error("Error in deleting.");
            }

            logout()
        } catch(error) {
            setError(error.message)
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
            navigate("/")
        } catch(error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        loadUser(`http://localhost:3000/api/users/${id}`);
    }, [id]);

    const TempProfile = Tprofile || profile
    
    return (
        <header>
            { loading && <p>Loading...</p> }
            { error && !loading && <p>{ error }</p>}

            { !loading && !error && TempProfile &&
                <div className="header fixed inset-x-0 top-0 z-50 flex h-header items-center gap-4 px-6">
                    <div className="mr-auto flex items-center gap-4" onClick={() => navigate("/home")}>
                        <img className="logo h-25 w-37.5 object-contain" src={Logo} />
                        <h1>Exposure</h1>
                    </div>

                    <ProfilePreview key={TempProfile.key} profile={TempProfile} picSize="size-18" />
                    <button onClick={() => logout()}>Log-out</button>
                    <button onClick={() => deleteUser()}>Delete Profile</button>
                </div>
            }
        </header>
    );
}

export default header;