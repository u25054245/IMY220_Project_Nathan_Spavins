import Header from "../components/Header";
import Nav from "../components/Nav"
import Footnote from "../components/Footnote";

import "./Page.css";

function Profile() {
    return (
        <div className="page">
            <Header />
            <Nav />

            <div className="content">
                <h1>Profile Page</h1>

                <Footnote />
            </div>
        </div>
    );
}

export default Profile;