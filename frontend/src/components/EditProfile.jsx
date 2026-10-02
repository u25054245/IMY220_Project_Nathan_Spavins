import { useState, useEffect } from "react";

function EditProfile() {
    const { username, setUsername } = useState("")
    const { bio, setBio } = useState("")
    const { error, setError } = useState("")

    const handleEdit = async(event) => {
        event.preventDefault();

        try {
            const res = await fetch(`http://localhost:3001/api/users/${localStorage.getItem('user')}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({username, bio}),
            })

            if(!res.ok) {
                throw new Error("Unable to add posts.")
            }
        } catch(error) {
            setError(error.message);
        }
    }

    return (
        <div className="EditProfile">
            <h2>Edit Profile</h2>

            <form onSubmit={handleEdit}>
                <label>Username</label>
                <input type="text" value={username}/>
                <label>bio</label>
                <input type="text" value={bio}/>

                <button type="submit">Edit</button>
            </form>
        </div>
    )
}

export default EditProfile;