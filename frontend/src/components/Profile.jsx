import ProfilePreview from "./ProfilePreview";
import { posts } from "../assets/dummyData";
import PostPreview from "./PostPreview";
import { profiles } from "../assets/dummyData";

function Profile(props)
{
    const profile = profiles.find(profile => profile.id === props.profile.id);

    return (
        <div className="Profile">
            <ProfilePreview key={profile.id} profile={profile} />
            <p>Exposures {props.profile.posts.length}</p>
            <p>Friends {props.profile.friends.length}</p>

            {props.profile.posts.map((id) => {
                const post = posts.find(post => post.id === id);
                return <PostPreview key={id} post={post} />
            })}
        </div>
    )
}

export default Profile;