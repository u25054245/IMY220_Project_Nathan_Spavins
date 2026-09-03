import Header from "../components/Header";
import Nav from "../components/Nav"
import Footnote from "../components/Footnote";
import PostPreview from "../components/PostPreview";

import "./Page.css";
import "./Home.css";

function Home() {
    return (
        <div className="page">
            <Header />
            <Nav />

            <div className="content">
                <div className="homeHeader">
                    <h1>Home Page</h1>
                    <input type="text" placeholder="Search" className="searchBar" />
                </div>


                <div className="posts">
                    <PostPreview />
                    <PostPreview />
                    <PostPreview />
                    <PostPreview />
                    <PostPreview />
                    <PostPreview />
                    <PostPreview />
                </div>

                <Footnote />
            </div>
        </div>
    );
}

export default Home;