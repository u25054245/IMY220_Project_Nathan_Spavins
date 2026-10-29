import Post from "../components/Post";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footnote from "../components/Footnote";

function PostPage() {
    
    
    return (
        <div className="page">
            <Header />
            <Nav />

            <div className="content mt-header ml-nav min-h-screen p-8">
                <Post />
            </div>

            <Footnote />
        </div>
    )
}

export default PostPage;