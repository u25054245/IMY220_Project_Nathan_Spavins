import Header from "../components/Header";
import Nav from "../components/Nav"
import Footnote from "../components/Footnote";
import Profile from "../components/Profile";
import CreatePost from "../components/CreatePost";
import Friends from "../components/Friends";
import EditProfile from "../components/EditProfile";
import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";

import "./Page.css";

function ProfilePage() {
    const { id } = useParams()

    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const ownProfile = id === localStorage.getItem("user");
        
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

    useEffect(() => {
        loadUser(`http://localhost:3000/api/users/${id}`);
    }, [id]);

    return (
        <div className="page">
            <Header />
            <Nav />

            { loading && <p>Loading...</p> }

            { error && !loading && <p>{ error }</p>}

            { !loading && !error && profile &&
                <div className="content">
                    <Profile profile={profile} id={id}/>
                    { ownProfile && <CreatePost /> }
                    <Friends friends={profile.friends || []}/>
                    { ownProfile && <EditProfile /> }
                </div>
            }

            <Footnote />
        </div>
    );
}

export default ProfilePage;