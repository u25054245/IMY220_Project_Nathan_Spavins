import Header from "../components/Header";
import Nav from "../components/Nav"
import Footnote from "../components/Footnote";
import Profile from "../components/Profile";
import CreatePost from "../components/CreatePost";
import Friends from "../components/Friends";
import EditProfile from "../components/EditProfile";
import { useParams } from "react-router-dom";

import { profiles } from "../assets/dummyData";

import "./Page.css";

function ProfilePage() {

    const { id } = useParams();
    const profile = profiles.find(profile => profile.id === Number(id));

    if(!profile) {
        return (
        <div className="page">
            <Header />
            <Nav />

            <div className="content">
                <p>Profile not found</p>
            </div>
        </div>
    );
    }

    return (
        <div className="page">
            <Header />
            <Nav />

            <div className="content">
                <Profile profile={profile}/>
                <CreatePost />
                <Friends friends={profile.friends}/>
                <EditProfile />

                <Footnote />
            </div>
        </div>
    );
}

export default ProfilePage;