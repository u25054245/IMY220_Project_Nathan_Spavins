import { useState } from "react";

function EditPost({ post, setPost }) {
    const [ hashtag, setHashtag ] = useState("")
    const [ hashtags, setHashtags ] = useState(post.hashtags)
    const [ description, setDescription ] = useState("")
    const [ error, setError ] = useState("")

    const changeDes = (value) => {
        if(value.trim().length === 0) {
            return "Description must be filled in";
        } else {
            return "";
        }
    };

    const changeHash = (value) => {
        if(value.trim().length === 0) {
            return "Hashtag must be filled in";
        } else {
            return "";
        }
    };

    const handleDesChange = (event) => {
        const value = event.target.value;
        setDescription(value);

        setError(changeDes(value));
    };

    const handleHashChange = (event) => {
        const value = event.target.value;
        setHashtag(value);

        setError(changeHash(value));
    };

    const handleEdit = async(event) => {
        event.preventDefault();

        const d = changeDes(description);
        const h = changeHash(hashtag);

        setError(d);
        setError(h);

        const updateHash = [hashtag, ...hashtags];

        try {
            const res = await fetch(`http://localhost:3000/api/exposures/${post._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({description, updateHash}),
            })

            if(!res.ok) {
                throw new Error("Unable to update post.")
            }

            const resGet = await fetch(`http://localhost:3000/api/exposures/${post._id}`)

            if(!resGet.ok) {
                throw new Error("Unable to get post");
            }

            const data = await resGet.json();
            console.log(data)
            setPost(data);
        } catch(error) {
            setError(error.message);
        }
    }
    
    return(
        <div className="EditPost">
            <h2>Edit Post</h2>

            <form onSubmit={handleEdit}>
                <label>Description</label>
                <input type="text" value={description} onChange={handleDesChange}/>
                <label>Hashtag</label>
                <input type="text" value={hashtag} onChange={handleHashChange}/>

                <button type="submit">Edit</button>
            </form>
        </div>
    )
}

export default EditPost;