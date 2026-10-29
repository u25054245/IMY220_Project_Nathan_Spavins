import { useState, useEffect } from "react";

function EditProfile({ setProfile }) {
    const [ username, setUsername ] = useState("")
    const [ bio, setBio ] = useState("")
    const [ error, setError ] = useState("")

    const changeUsername = (value) => {
        if(value.trim().length === 0) {
            return "Username must be filled in";
        } else {
            return "";
        }
    };

    const changeBio = (value) => {
        if(value.trim().length === 0) {
            return "Bio must be filled in";
        } else {
            return "";
        }
    };

    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);

        setError(changeUsername(value));
    };

    const handleBioChange = (event) => {
        const value = event.target.value;
        setBio(value);

        setError(changeBio(value));
    };

    const handleEdit = async(event) => {
        event.preventDefault();

        const u = changeUsername(username);
        const b = changeBio(bio);

        setError(u);
        setError(b);

        try {
            const res = await fetch(`http://localhost:3000/api/users/${localStorage.getItem('user')}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({username, bio}),
            })

            if(!res.ok) {
                throw new Error("Unable to update profile.")
            }

            const resGet = await fetch(`http://localhost:3000/api/users/${localStorage.getItem('user')}`)

            if(!resGet.ok) {
                throw new Error("Unable to get profile");
            }

            const data = await resGet.json();
            console.log(data)
            setProfile(data);
        } catch(error) {
            setError(error.message);
        }
    }

    return (
        <div className="EditProfile">
            <h2>Edit Profile</h2>

            <form onSubmit={handleEdit}>
                <label>Username</label>
                <input type="text" value={username} onChange={handleUsernameChange}/>
                <label>bio</label>
                <input type="text" value={bio} onChange={handleBioChange}/>

                <button type="submit">Edit</button>
            </form>
        </div>
    )
}

export default EditProfile;