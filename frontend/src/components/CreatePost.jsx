import { Link } from "react-router-dom";

function CreatePost() {
    return (
        <div>
            <h1>Create Post</h1>

            <form className="CreatePost">
                <label>Image:</label>
                <input type="file" id="imageUpload" accept="image/*" />
                <label>Title</label>
                <input type="input" id="description" />
                <label>Description</label>
                <input type="input" id="description" />

                <Link to={'/post'}><button type="submit">Create</button></Link>
            </form>
        </div>
    );
}

export default CreatePost;