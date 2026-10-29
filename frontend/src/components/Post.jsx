import { Link, useParams } from "react-router-dom";
import EditPost from "../components/EditPost";
import Comments from "./Comments"
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

function Post() {
    const { id } = useParams();
    
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()
    
    async function loadPost(url) {
        setLoading(true);
        setError("");
        
        try {
            const response = await fetch(url);

            if(!response.ok) {
                throw new Error("Error in fetching post.");
            }

            const data = await response.json();
            setPost(data);
        } catch(error) {
            setError(error.message);
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function deletePost() {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`http://localhost:3000/api/exposures/${id}`, {
                method: "DELETE",
            });

            if(!response.ok) {
                throw new Error("Error in deleting post.");
            }

            navigate(`/home`)
        } catch(error) {
            setError(error.message);
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPost(`http://localhost:3000/api/exposures/${id}`)
    }, [id]);

    return (
        <div className="post">
            { loading && <p>Loading...</p> }
            { error && !loading && <p>{ error }</p>}
            
            {!loading && !error && 
                <div>
                    <img src={`http://localhost:3000${post.image}`}/>
            
                    <div className="post-content">
                        <h2>{post.title}</h2>
                        <p>{post.location}</p>
                        <p>{post.views}</p>
                        <p>{post.author}</p>
                    </div>

                    <div className="post-description">
                        <p>{post.description}</p>
                        <Link to={'/Home'}><button type="submit">Back</button></Link>
                    </div>

                    <Comments key={post.id} comments={post.comments}/>
                    <EditPost post={post} setPost={setPost}/>

                    { post.user_id === localStorage.getItem("user") &&
                        <button className="post-delete" onClick={deletePost}>Delete Post</button>
                    }
                </div>
            }
        </div>
    );
}

export default Post;