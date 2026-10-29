import { Link, useParams } from "react-router-dom";
import EditAlbumn from "../components/EditAlbumn";
import PostPreview from "./PostPreview"
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

function Albumn() {
    const { id } = useParams();
    
    const [albumn, setAlbumn] = useState(null);
    const [exposures, setExposures] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()
    
    async function loadAlbumn(url) {
        setLoading(true);
        setError("");
        
        try {
            const response = await fetch(url);

            if(!response.ok) {
                throw new Error("Error in fetching albumn.");
            }

            const data = await response.json();
            setAlbumn(data);

            await loadPosts(data);
        } catch(error) {
            setError(error.message);
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function loadPosts(a) {
        setLoading(true);
        setError("");
        
        try {
            const response = await fetch('http://localhost:3000/api/exposures');

            if(!response.ok) {
                throw new Error("Error in fetching exposures.");
            }

            const data = await response.json();
            const albumnExposures = data.filter(exposure => a.includes(exposure))

            setExposures(albumnExposures);
            console.log("yooo")
            console.log(albumnExposures)
        } catch(error) {
            setError(error.message);
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadAlbumn(`http://localhost:3000/api/albumns/${id}`)
    }, [id]);

    async function deleteAlbumn() {
        setLoading(true);
        setError("");
        
        try {
            const response = await fetch(`http://localhost:3000/api/albumns/${id}`, {
                method: "DELETE"
            });

            if(!response.ok) {
                throw new Error("Error in fetching albumn.");
            }

            navigate(`/home`)
        } catch(error) {
            setError(error.message);
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function removePost(e) {
        setLoading(true);
        setError("");
        
        try {
            const response = await fetch(`http://localhost:3000/api/albumns/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: albumnExposures.filter(exosure != e._id)
            });

            if(!response.ok) {
                throw new Error("Error in fetching albumn.");
            }

            navigate(`/home`)
        } catch(error) {
            setError(error.message);
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="albumn">
            { loading && <p>Loading...</p> }
            { error && !loading && <p>{ error }</p>}
            
            {!loading && !error && 
                <div>
                    <h2>{albumn.title}</h2>
            
                    <div className="albumn-content">
                        <p>{albumn.views}</p>
                        <p>{albumn.author}</p>
                    </div>

                    <div className="albumn-description">
                        <p>{albumn.description}</p>
                        <Link to={'/Home'}><button type="submit">Back</button></Link>
                    </div>

                    <EditAlbumn albumn={albumn} setAlbumn={setAlbumn} />

                    { albumn.user_id === localStorage.getItem("user") &&
                        <button onClick={deleteAlbumn}>Delete Albumn</button>
                    }

                    <h2>Exposures</h2>
                    <div className="posts">
                        {exposures.map(exposure => {
                            return <div key={exposure._id} className="albumnExposure">
                                <PostPreview exposure={exposure} />
                                { albumn.user_id === localStorage.getItem("user") && <button onSubmit={removePost}>Remove Post</button> }
                            </div>
                        })}
                    </div>
                </div>
            }
        </div>
    );
}

export default Albumn;