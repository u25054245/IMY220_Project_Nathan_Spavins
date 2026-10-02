import { Link, useParams } from "react-router-dom";
import EditAlbumn from "../components/EditAlbumn";
import PostPreview from "./PostPreview"

import { useState, useEffect } from "react";

function Albumn() {
    const { id } = useParams();
    
    const [albumn, setAlbumn] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
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

    return (
        <div className="albumn">
            { loading && <p>Loading...</p> }
            { error && !loading && <p>{ error }</p>}
            
            {!loading && !error && 
                <div>
                    <h2>{albumn.title}</h2>
            
                    <div className="albumn-content">
                        <p>{albumn.description}</p>
                        <p>{albumn.views}</p>
                        <p>{albumn.author}</p>
                    </div>

                    <div className="albumn-description">
                        <p>{albumn.description}</p>
                        <Link to={'/Home'}><button type="submit">Back</button></Link>
                    </div>

                    <EditAlbumn />
                </div>
            }
        </div>
    );
}

export default Albumn;