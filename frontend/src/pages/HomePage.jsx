import Header from "../components/Header";
import Nav from "../components/Nav"
import Footnote from "../components/Footnote";
import PostPreview from "../components/PostPreview";

import { useEffect, useState } from "react";

import "./Page.css";
import "./Home.css";

function Home() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [local, setLocal] = useState(true);
    
    async function loadPosts(url) {
        setLoading(true);
        setError("");
        
        try {
            const response = await fetch(url);

            if(!response.ok) {
                throw new Error("Error in fetching posts.");
            }

            const data = await response.json();
            setPosts(data);
        } catch(error) {
            setError(error.message);
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(local) {
            loadPosts(`http://localhost:3000/api/local/${localStorage.getItem("user")}`);
        } else {
            loadPosts("http://localhost:3000/api/exposures");
        }
    }, [local]);

    return (
        <div className="page">
            <Nav />
            <Header />

            <div className="content">
                <div className="homeHeader">
                    <h1>Home Page</h1>
                    <input type="text" placeholder="Search" className="searchBar" />
                    <button onClick={() => setLocal(!local)}>
                        {local ? "Global Feed" : "Local Feed"}
                    </button>
                </div>

                { loading && <p>Loading...</p> }

                { error && !loading && <p>{ error }</p>}

                { !loading &&
                    <div className="posts">
                        {posts.map(post => (
                            <PostPreview key={post._id} exposure={post} />
                        ))}
                    </div>
                }

                <Footnote />
            </div>
        </div>
    );
}

export default Home;