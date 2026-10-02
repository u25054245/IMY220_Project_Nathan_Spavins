import Albumn from "../components/Albumn";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footnote from "../components/Footnote";

function AlbumnPage() {
    return (
        <div className="page">
            <Header />
            <Nav />

            <div className="content">
                <Albumn />
            </div>

            <Footnote />
        </div>
    )
}

export default AlbumnPage;