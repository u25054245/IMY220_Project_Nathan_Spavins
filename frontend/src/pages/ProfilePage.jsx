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

    const [image, setImage] = useState("");

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

    const handleImgChange = (event) => {
        const value = event.target.files[0];
        setImage(value);
    };

    const handleUpdate = async(event) => {
        event.preventDefault();

        try {
            const formData = new FormData();

            formData.append("file", image)
            
            const res = await fetch(`http://localhost:3000/api/usersPic/${localStorage.getItem("user")}`, {
                method: "PATCH",
                body: formData,
            })

            if(!res.ok) {
                throw new Error("Unable to Update Profile Picture.")
            }

            const data = await res.json();
            console.log(data);

            loadUser(`http://localhost:3000/api/users/${id}`)

        } catch(error) {
            setError(error.message);
        }
    }

    return (
        <div className="page">
            <Header Tprofile={profile}/>
            <Nav />

            { loading && <p>Loading...</p> }

            { error && !loading && <p>{ error }</p>}

            { !loading && !error && profile &&
                <div className="content mt-header ml-nav min-h-screen p-8">
                    <Profile profile={profile} id={id}/>

                    <hr className="mb-8 mt-8"/>

                    { ownProfile && <div><CreatePost /><hr className="mb-8 mt-8"/></div> }
                    <Friends friends={profile.friends || []}/>
                    <hr className="mb-8 mt-8"/>
                    { ownProfile && <EditProfile setProfile={setProfile} /> }
                    <br />
                    { ownProfile && 
                        <form className="UpdateProfilePic" onSubmit={handleUpdate}>
                            <label>Image:</label>
                            <input type="file" id="imageUpload" accept="image/*" onChange={handleImgChange} />

                            <button type="submit">Change Profile Picture</button>
                        </form>
                    }
                </div>
            }

            <Footnote />
        </div>
    );
}

export default ProfilePage;