import Post from "../components/Post";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footnote from "../components/Footnote";

function PostPage() {
    return (
        <div className="page">
            <Header />
            <Nav />

            <div className="content">
                <Post />
            </div>

            <Footnote />
        </div>
    )
}

export default PostPage;