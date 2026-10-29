import ProfilePreview from "./ProfilePreview";
import PostPreview from "./PostPreview";
import AlbumnPreview from "./AlbumnPreview"
import CreateAlbumn from "./CreateAlbumn"

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
            <div className="mb-8 grid grid-cols-2 items-center gap-6">
                <ProfilePreview key={id} profile={profile} />

                <div>
                    <p>{ profile.bio }</p>
                    <p>Exposures {exposures.length}</p>
                    <p>Albumns {albumns.length}</p>
                    <p>Friends {(profile.friends || []).length}</p>
                </div>
            </div>

            <hr className="mb-8"/>

            { loading && <p>Loading...</p> }
            { error && !loading && <p>{ error }</p>}

            { !loading && !error && 
                <div>
                    <h1>Albumns</h1>
                    <div className="albumns mb-10 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {albumns.map(albumn => {
                            return <AlbumnPreview key={albumn._id} albumn={albumn} />
                        })}
                    </div>

                    <hr className="mb-8"/>

                    <CreateAlbumn />

                    <hr className="mb-8 mt-8"/>

                    <h1>Exposures</h1>
                    <div className="posts mb-10 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
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