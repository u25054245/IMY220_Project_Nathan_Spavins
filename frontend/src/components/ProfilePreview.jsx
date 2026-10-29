function ProfilePreview(props) {
    return (
        <div className="section">
            <img className="profilePic" src={`http://localhost:3000/users/${props.profile.profile_picture}`} />
            <h1>{props.profile.username}</h1>
        </div>
    );
}

export default ProfilePreview;