import ProfilePreview from "./ProfilePreview";
import PostPreview from "./PostPreview";
import AlbumnPreview from "./AlbumnPreview"

import { useState, useEffect } from "react";

function Profile({ profile, id })
{
    const [exposures, setExposures] = useState([]);
    const [albumns, setAlbumns] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    async function load(url) {
        const response = await fetch(url)

        if(!response.ok) throw new Error("Error loading profile content")

        return response.json()
    }

    useEffect(() => {
        async function loadAllContent() {
            setLoading(true);
            setError("");

            try {
                const exposures = await load(`http://localhost:3000/api/users/${id}/exposure`)
                const albumns = await load(`http://localhost:3000/api/users/${id}/albumns`)

                setExposures(exposures);
                setAlbumns(albumns);
            } catch(error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        loadAllContent()
    }, [id])

    return (
        <div className="Profile">
            <ProfilePreview key={id} profile={profile} />

            <p>{ profile.bio }</p>
            <p>Exposures {exposures.length}</p>
            <p>Albumns {albumns.length}</p>
            <p>Friends {(profile.friends || []).length}</p>

            { loading && <p>Loading...</p> }
            { error && !loading && <p>{ error }</p>}

            { !loading && !error && 
                <div>
                    <h2>Albumns</h2>
                    <div className="albumns">
                        {albumns.map(albumn => {
                            return <AlbumnPreview key={albumn._id} albumn={albumn} />
                        })}
                    </div>

                    <h2>Exposures</h2>
                    <div className="posts">
                        {exposures.map(exposure => {
                            return <PostPreview key={exposure._id} exposure={exposure} />
                        })}
                    </div>
                </div>
            }
        </div>
    )
}

export default Profile;