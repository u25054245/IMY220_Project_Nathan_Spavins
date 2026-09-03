import { Link } from "react-router-dom";

function PostPreview() {
    return (
        <Link to={'/post'}>
            <div className="postPreview">
                <h1>image</h1>
                
                <div className="postPreview-content">
                    <h2>Title</h2>
                    <p>Location</p>
                    <p>Views</p>
                    <p>Author</p>
                </div>
            </div>
        </Link>
    );
}

export default PostPreview;