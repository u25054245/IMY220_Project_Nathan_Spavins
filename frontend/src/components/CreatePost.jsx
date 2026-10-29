import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
    const [ image, setImage ] = useState("")
    const [ title, setTitle ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ hashtags, setHashtags ] = useState([])
    const [ error, setError ] = useState("")

    const navigate = useNavigate()
    

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

    const handleImgChange = (event) => {
        const value = event.target.files[0];
        setImage(value);
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
            const formData = new FormData();

            formData.append("file", image)
            formData.append("user_id", localStorage.getItem("user"))
            formData.append("title", title)
            formData.append("description", description)
            formData.append("hashtags", JSON.stringify(hashtags.filter(tag => tag != "")))
            
            const res = await fetch(`http://localhost:3000/api/exposures`, {
                method: "POST",
                body: formData,
            })

            if(!res.ok) {
                throw new Error("Unable to create Post.")
            }

            const data = await res.json();
            console.log(data);

            navigate(`/post/${data.exposure_id}`)

        } catch(error) {
            setError(error.message);
        }
    }
    
    return (
        <div>
            <h1>Create Post</h1>

            <form className="CreatePost" onSubmit={handleCreate}>
                <label>Image:</label>
                <input type="file" id="imageUpload" accept="image/*" onChange={handleImgChange} />
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

export default CreatePost;