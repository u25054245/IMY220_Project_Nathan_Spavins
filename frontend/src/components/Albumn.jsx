import { Link, useParams } from "react-router-dom";
import EditAlbumn from "../components/EditAlbumn";
import PostPreview from "./PostPreview"
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

function Albumn() {
    const { id } = useParams();
    
    const [albumn, setAlbumn] = useState(null);
    const [exposures, setExposures] = useState([]);
    const [add, setAdd] = useState("");
    const [userExpo, setUserExpo] = useState([]);
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

            await loadPosts(data.exposures);
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

        console.log(a);
        
        try {
            const response = await fetch('http://localhost:3000/api/exposures');

            if(!response.ok) {
                throw new Error("Error in fetching exposures.");
            }

            const data = await response.json();

            const albumnExposures = data.filter(exposure => a.includes(exposure._id))
            setExposures(albumnExposures);

            const temp = data.filter(exposure => exposure.user_id === localStorage.getItem("user"))
            const userExposures = temp.filter(exposure => !albumnExposures.includes(exposure))
            setUserExpo(userExposures)

            console.log(albumnExposures)
            console.log(userExpo)
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

        const filteredExpo = exposures.filter(exposure => exposure._id != e)

        const filteredExp = albumn.exposures.filter(exposure => exposure != e)
        const updateAlbumn = { ...albumn, exposures: filteredExp };
        
        try {
            const response = await fetch(`http://localhost:3000/api/albumns/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateAlbumn)
            });

            if(!response.ok) {
                throw new Error("Error in removing post.");
            }

            setAlbumn(updateAlbumn);
            setExposures(filteredExpo)

        } catch(error) {
            setError(error.message);
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const changeAdd = (event) => {
        const value = event.target.value;
        setAdd(value);
    };

    async function handleAdd(event) {
        event.preventDefault();

        setLoading(true);
        setError("");

        const exp = userExpo.find(exposure => exposure._id === add)
        const filteredExpo = [ ...exposures, exp ]

        const filteredExp = [ ...albumn.exposures, add ]
        const updateAlbumn = { ...albumn, exposures: filteredExp };
        
        try {
            const response = await fetch(`http://localhost:3000/api/albumns/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateAlbumn)
            });

            if(!response.ok) {
                throw new Error("Error in adding post.");
            }

            setAlbumn(updateAlbumn);
            setExposures(filteredExpo)

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
                    <div className="posts mb-10 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {exposures.map(exposure => {
                            return <div key={exposure._id} className="albumnExposure">
                                <PostPreview exposure={exposure} />
                                { albumn.user_id === localStorage.getItem("user") && <button onClick={() => removePost(exposure._id)}>Remove Post</button> }
                            </div>
                        })}
                    </div>

                    { albumn.user_id === localStorage.getItem("user") && 
                        <form onSubmit={handleAdd}>
                            <select value={add} onChange={changeAdd}>
                                { 
                                    userExpo.map(exposure => {
                                        return <option key={exposure._id} value={exposure._id}>{exposure.title}</option>
                                    })
                                }
                            </select>

                            <button type="submit">Add Post</button>
                        </form>
                    }
                </div>
            }
        </div>
    );
}

export default Albumn;