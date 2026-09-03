import { Link, useParams } from "react-router-dom";
import { posts } from "../assets/dummyData"
import Comments from "./Comments"

function Post() {
    const { id } = useParams();
    const post = posts.find(post => post.id === Number(id))

    if(!post) return <p>Post not found</p>

    return (
        <div className="post">
            <img src={post.image}/>
            
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

            <Comments comments={post.comments}/>
        </div>
    );
}

export default Post;