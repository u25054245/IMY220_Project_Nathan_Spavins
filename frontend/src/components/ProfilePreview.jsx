import ProfilePic from "../assets/profilePic.png";

function ProfilePreview() {
    return (
        <div className="section">
            <img className="profilePic" src={ProfilePic} />
            <h1>Profile Name</h1>
        </div>
    );
}

export default ProfilePreview;