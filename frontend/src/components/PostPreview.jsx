import { Link } from "react-router-dom"

import "./PostPreview.css";

function PostPreview(props) {
    return (
        <div className="postPreview">
            <Link to={`/post/${props.exposure._id}`}>
                <img alt="post-image" src={`http://localhost:3000${props.exposure.image}`} />
                
                <div className="postPreview-content">
                    <h2>{props.exposure.description}</h2>
                    {props.exposure.hashtags.map((hashtag) => {
                        return <p key={hashtag}>#{hashtag}</p>
                    })}
                    <p>{props.exposure.created}</p>
                </div>
            </Link>
        </div>
    );
}

export default PostPreview;