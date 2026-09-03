import Header from "../components/Header";
import Nav from "../components/Nav"
import Footnote from "../components/Footnote";
import PostPreview from "../components/PostPreview";
import { posts } from "../assets/dummyData"

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
                    {posts.map(post => (
                        <PostPreview key={post.id} post={post} />
                    ))}
                </div>

                <Footnote />
            </div>
        </div>
    );
}

export default Home;