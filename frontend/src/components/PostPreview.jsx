import { Link } from "react-router-dom"

import "./PostPreview.css";

function PostPreview(props) {
    return (
        <div className="postPreview">
            <Link to={`/post/${props.post.id}`}>
                <img src={props.post.image} />
                
                <div className="postPreview-content">
                    <h2>{props.post.title}</h2>
                    <p>{props.post.location}</p>
                    <p>{props.post.views}</p>
                    <p>{props.post.author}</p>
                </div>
            </Link>
        </div>
    );
}

export default PostPreview;