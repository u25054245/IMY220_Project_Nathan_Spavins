import ProfilePic from "../assets/profilePic.png";

function ProfilePreview(props) {
    return (
        <div className="section">
            <img className="profilePic" src={ProfilePic} />
            <h1>{props.profile.username}</h1>
        </div>
    );
}

export default ProfilePreview;