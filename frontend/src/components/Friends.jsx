import ProfilePreview from "./ProfilePreview";

import { useState, useEffect } from "react";

function Friends(props) {
    console.log(props.friends)
    const [ friends, setFriends ] = useState([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    async function load(url) {
        const response = await fetch(url)

        if(!response.ok) throw new Error("Error loading profile's friends")

        return response.json()
    }

    useEffect(() => {
        async function loadAllContent() {
            setLoading(true);
            setError("");

            try {
                const data = await load(`http://localhost:3000/api/users`)
                const userData = await load(`http://localhost:3000/api/users/${localStorage.getItem("user")}`)
                
                const tempFriends = data.filter(user => {
                    return data.find(u => u.friends.includes(userData._id))
                })
                setFriends(tempFriends);
            } catch(error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        loadAllContent()
    }, [localStorage.getItem("user")])
    
    return (
        <div className="friends">
            <h2>Friends</h2>

            {friends.map(friend => {
                return <ProfilePreview key={friend._id} profile={friend} />
            })}
        </div>
    )
}

export default Friends;