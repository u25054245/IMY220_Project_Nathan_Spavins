import { Link } from "react-router-dom"

import "./AlbumnPreview.css";

function AlbumnPreview(props) {
    return (
        <div className="albumnPreview">
            <Link to={`/albumn/${props.albumn._id}`}>
                <h2>{props.albumn.title}</h2>
                <div className="albumnPreview-content">
                    <h2>{props.albumn.description}</h2>
                    {props.albumn.hashtags.map((hashtag) => {
                        return <p key={hashtag}>#{hashtag}</p>
                    })}
                    <p>{props.albumn.created}</p>
                </div>
            </Link>
        </div>
    );
}

export default AlbumnPreview;