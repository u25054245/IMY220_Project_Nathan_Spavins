import { Link } from "react-router-dom";

function Post() {
    return (
        <div className="post">
            <img>image</img>
            
            <div className="post-content">
                <h2>Title</h2>
                <p>Location</p>
                <p>Views</p>
                <p>Author</p>
            </div>

            <div className="post-description">
                <p>Description</p>
                <Link to={'/Home'}><button type="submit">Back</button></Link>
            </div>
        </div>
    );
}

export default Post;