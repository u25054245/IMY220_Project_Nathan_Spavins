import Header from "../components/Header";
import Nav from "../components/Nav"
import Footnote from "../components/Footnote";
import Profile from "../components/Profile";
import CreatePost from "../components/CreatePost";
import Friends from "../components/Friends";
import EditPost from "../components/EditPost";

import "./Page.css";

function ProfilePage() {
    return (
        <div className="page">
            <Header />
            <Nav />

            <div className="content">
                <Profile />
                <CreatePost />
                <Friends />
                <EditPost />

                <Footnote />
            </div>
        </div>
    );
}

export default ProfilePage;