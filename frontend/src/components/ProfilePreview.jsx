function ProfilePreview(props) {
    const picSize = props.picSize || "size-30";
    
    return (
        <div className="flex items-center gap-3">
            <img className={`profilePic shrink-0 ${picSize}`} src={`http://localhost:3000/users/${props.profile.profile_picture}`} />
            <h1>{props.profile.username}</h1>
        </div>
    );
}

export default ProfilePreview;