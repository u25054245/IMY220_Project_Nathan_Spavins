import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateAlbumn() {
    const [ title, setTitle ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ hashtags, setHashtags ] = useState([])
    const [ error, setError ] = useState("")
    
    const navigate = useNavigate();

    const changeTitle = (value) => {
        if(value.trim().length === 0) {
            return "Title must be filled in";
        } else {
            return "";
        }
    };

    const changeDes = (value) => {
        if(value.trim().length === 0) {
            return "Description must be filled in";
        } else {
            return "";
        }
    };

    const handleTitleChange = (event) => {
        const value = event.target.value;
        setTitle(value);

        setError(changeTitle(value));
    };

    const handleDesChange = (event) => {
        const value = event.target.value;
        setDescription(value);

        setError(changeDes(value));
    };

    const handleCreate = async(event) => {
        event.preventDefault();
        console.log("Running")

        const t = changeTitle(title);
        const d = changeDes(description);

        setError(t);
        setError(d);

        try {
            const user_id = localStorage.getItem("user")
            const request = { user_id, title, description, hashtags }
            
            const res = await fetch(`http://localhost:3000/api/albumns`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request),
            })

            if(!res.ok) {
                throw new Error("Unable to create Albumn.")
            }

            const data = await res.json();
            navigate(`/albumn/${data.albumn_id}`)
            
            console.log(data);
        } catch(error) {
            setError(error.message);
        }
    }
    
    return (
        <div>
            <h1>Create Albumn</h1>

            <form className="CreateAlbumn" onSubmit={handleCreate}>
                <label>Title</label>
                <input type="input" id="title" value={title} onChange={handleTitleChange} />
                <label>Description</label>
                <input type="input" id="description" value={description} onChange={handleDesChange} />
                <label>Hashtags</label>
                <input type="input" id="hashtags" value={hashtags.join(" ")} onChange={e => setHashtags(e.target.value.split(" "))} />

                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateAlbumn;