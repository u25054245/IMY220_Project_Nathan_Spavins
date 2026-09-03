import { profiles } from "../assets/dummyData";
import ProfilePreview from "./ProfilePreview";

function Friends(props) {
    return (
        <div className="friends">
            <h2>Friends</h2>

            {props.friends.map((id) => {
                const friend = profiles.find(profile => profile.id === id);
                return <ProfilePreview key={id} profile={friend} />
            })}
        </div>
    )
}

export default Friends;